// JavaScript Document
angular.module('octngapp.logincontroller',[])

octngapp.controller("loginController",function($scope,$log,$state,$http,userService,$ionicPopup,$timeout,utilService,userService){
	$log.info("*********************    Login Controller    *********************");
	$log.info($state.params.userphone);  //parameters recieved from calling section
	$log.info($state.params.previouspage); //paramteers recieved from calling page
	$log.info("--=============  value of my var recieved ===================--");
	var infobj = JSON.parse(localStorage.getItem("cardobject"));
	//$log.info(infobj.cardname);
	$scope.loginphonenumber = $state.params.userphone;
	$scope.previoussection = $state.params.previouspage;
	$log.info("previous section: "+$scope.previoussection);
	//paramter to show passcode field
	$scope.customerexists = false;
	$scope.customerpassword = false;
	$scope.customershouldregister = false;
	$scope.passcodewrong = false;
	//choosen bank during registration
	
	$scope.bankchoosen="Select Bank";
	$scope.bankchoosencode = "";
	$scope.useracct = "";
	$scope.acctflag = false;
	$scope.cardflag = false;
	
	$scope.bvnvalid = false;
	$scope.forgotbvn = false;
	$scope.manualcustdetail = false;
	$scope.custfirstname="";
	$scope.custfname="";
	$scope.custlastname="";
	$scope.custlname="";
	$scope.custemail="";
	$scope.dateofbirth=""; 
	$scope.custgender="female";
	
	$scope.regpassword ="";
	$scope.loginpassword="";
	$scope.userregbvn ="";
	$scope.nextaction="Submit";
	$scope.otptokenentry=false;
	$scope.otptokeninvalid = false;
	$scope.otptokenvalid = false;
	
	$scope.selectaccount = false;
	$scope.otpmessage="";
	//retrieve user phone number for local storage or state params or call this with the params specifying the user phone
	$log.info(" the value of login phone number ");
	$log.info($scope.loginphonenumber);
		 //the user phone number is checked against the customer status
		 var ep = utilService.customerstatusurl;
		 var obj = {source:"MOBILE",transid:utilService.currts,sessid:utilService.currts,phonenumber:$scope.loginphonenumber,country:"NG"};
		 userService.customerstatus(ep,obj).then(function success(response){
			 var responsedata = response.data;
			 $log.info(responsedata);
			 if(responsedata.responsecode ==="00"){
				 $log.info("customer exists so switch the login userid form off and switch the password form on");
				 $scope.customerexists = false;
				 $scope.customerpassword = true;
				 
			 }else{
				 $log.info("customer doesnt exist so switch the login userid form on and switch the password form off");
				 $scope.customerexists = true;
				 $scope.customerpassword = false;
				 
				 //set the error message informing that this is thier first time to octopus and display an alert
				 
				 $scope.registermessage = "Oops! You're not registered on Octopus. Enter your registered telephone number"
				 $scope.nextaction = "Validate";
				 //show a tool tip explaining that customer should enter their number in 11 digit format
			 }
		 },function error(response){
			 $log.error(response);
			 	$scope.customerexists = true;
				$scope.customerpassword = false;
		 });
		 $scope.validatemobilenumber ="";
		 $scope.validatepasscode="";
		
		$scope.validateuser = function(custphone){
			$log.info(custphone);
			//call the customer status again and if it fails then redirect to the registration screens
			var ep = utilService.customerstatusurl;
		 	var obj = {source:"MOBILE",transid:utilService.currts,sessid:utilService.currts,phonenumber:custphone,country:"NG"};
			$scope.loading = true;
			userService.customerstatus(ep,obj).then(function success(response){
			 var responsedata = response.data;
			 $log.info(responsedata);
			 if(responsedata.responsecode ==="00"){
				 $scope.loading = false;
				 localStorage.setItem("phonenumber",custphone);
				 //customer exists so switch the login form off and switch the password form on
				 $scope.customerexists = false;
				 $scope.customerpassword = true;
				 
			 }else{
				 $scope.loading = false;
				 localStorage.setItem("phonenumber",custphone);
				 //customer doesnt exist so switch the login off and switch the register screen on
				  	$scope.customershouldregister = true;
				 	$scope.customerexists = false;
					$scope.customerpassword = false;
					
			 }
		 },function error(response){
			 $log.error(response);
			 	$scope.customerexists = true;
				$scope.customerpassword = false;
		 });
		}
		
		//otp validation function
		$scope.sendotptoken = function(otp){
			
					var prev = $scope.previoussection
					var bankcode = $scope.bankchoosencode;
					var bankname = $scope.bankchoosen;
					var acctnumber = $scope.useracct;
					var userphone = $scope.loginphonenumber;
					var datets = new Date();
					var currday = datets.getDate().toString(); 
					var currmonth = (datets.getMonth()+1).toString();
					var curryear = datets.getFullYear().toString();
					var currhour= datets.getHours().toString();
					var currmin = datets.getMinutes().toString();
					var currsec = datets.getSeconds().toString();
					var ep = utilService.registeroctopusvalidateurl;
		 			var obj = {source:"MOBILE",transid:utilService.currts,sessid:utilService.currts,phonenumber:userphone,token:otp}
					
				$http.post(ep,obj).then(function success(response){
			 	var responsedata = response.data;
			 	$log.info(responsedata);
			 	if(responsedata.responsecode ==="00"){
					$log.info("Response from OTP validation");
					$log.info(responsedata);
				 	//customer exists so switch the login form off and switch the password form on
					//otp is valid redirect to appropriate success handler
					$log.info("update user valid status")
				 					$scope.isuservalid = "yes";
					$log.info("record previous section referencing token entry");
									$scope.tokenmessage = responsedata.responsemessage;
									//registration successful redirect to the appropriate previouspage to complete transaciton
									swal({title:"",text:$scope.tokenmessage,type:"success",confirmColorButton:"#04679b"},function(){
										$log.info(prev);
										$scope.successHandle(prev,acctnumber,bankcode,bankname);
									});
								
			 	}else{
					 //otp is invalid customer is not created
				 		$scope.tokenmessage = responsedata.responsemessage;
						swal({title:"",type:"error",text:$scope.tokenmessage,confirmColorButton:"#04679b"},function(){
							null;
						});
					
			 	}
		 	},function error(response){
			 		$log.info(response);
					swal({title:"",type:"warning",text:response,confirmColorButton:"#04679b"},function(){
						null;
					});
		 	});
			
		}
		
		//function to check user account number and display accounts in a list
				$scope.checkuseracct = function(useraccount){
						
						$scope.loading = true;
						var endpointurl = utilService.getbankwithaccounturl;
						var obj = {source:"MOBILE",accountnumber:useraccount};
						
						$http.post(endpointurl,obj).then(function successCallback(response){
						console.log(response);
						if(response.status === 200){
							$scope.loading = false;
							
							var responsedata = response.data;
							if(responsedata.responsecode ==="00"){
									
								$scope.banklist = responsedata.result;
								if( responsedata.result.length ===0){
									$scope.banklist = [{bankname:"Bank not found",bankcode:"00"}];
								}
									$log.info("the returned banks");
									$log.info($scope.banklist);
									$scope.acctflag = true;
									$scope.useracct = obj.accountnumber;
									$log.info($scope.banklist);
								}else{
									$scope.banklist = [{bankname:"Bank not found",bankcode:"00"}];
									//user status is invalid 
									$log.info($scope.banklist);
								}
						}
						},function errorCallBack(response){
								$scope.loading = false;
							
								$log.error(response);
								$scope.banklist = [{bankname:"Bank not found",bankcode:"00"}];
								//user status is invalid 
								$log.error($scope.banklist);
						});
				}
				
				$scope.showforgotbvnalert = function(){
					swal({title:"",text:"Dial *565*0# from the mobile number you registered to your BVN to obtain your BVN.",type:"info"});
				}
				
				$scope.checkUserBvn = function(userbvn){
					$log.info(userbvn);
					$scope.userregbvn = userbvn; //replace this when BVN service is online to be only when BVN is valid
					if(userbvn.length === 11){
							$scope.loadingwhite = true;
					
							$scope.loading = true;
							var endpointurl =  utilService.getnamewithaccounturl;
							//replace with phone number user supplied
							var obj = 
							{source:"MOBILE",transid:utilService.currts,sessid:utilService.currts,phonenumber:$scope.loginphonenumber,
 							accountno:userbvn,bvn:userbvn,bankcode:"051",bankname:"heritage"};
							$log.info(obj);
							$http.post(endpointurl,obj).then(function successCallback(response){
								$scope.loadingwhite=false;
								$log.info(response);
								var responsedata =response.data;
								if(responsedata.responsecode === "00"){
									//assign the returned bvn variables (fn,ln,mn,em,gender,phone) to scope vars
									//set flag for skip manual entry field str8 to password
									$scope.bvnvalid = true;
									$scope.forgotbvn = false;
									$scope.custfname = "Olaolu"
									$scope.custlname ="Adejide";
									$scope.custemail="Olaolu.Adejide@hbng.com";
									$scope.dateofbirth="01-jan-2012"; 
									$scope.custgender="male";
									//alert(responsedata.responsemessage);
								}else{
									swal({title:"",type:"warning",text:responsedata.responsemessage,confirmColorButton:"#04679b"});
//									$log.info(response);
									$scope.forgotbvn = true;
									$scope.bvnvalid = false;
									
								}
							},function errorCallback(response){
								$scope.loadingwhite=false;
								$log.error(response);
									$scope.forgotbvn = true;
									$scope.bvnvalid = false;
							});
					}
				}
				
				//update the bank choosen in the drop down to reflect the clicked one
				$scope.updateBankChoosen = function(bname,bcode){
					$scope.bankchoosen = bname;
					$scope.bankchoosencode = bcode;
				}
				
				
				
				$scope.formRegPassword = function(num){
					var pword = String($scope.loginpassword);//regpassword
					pword = pword.concat(num);
					$scope.loginpassword = pword;
					$log.info("--===== length  ====--");
					$log.info(pword.length);
					$log.info("--=====  value ====--");
					$log.info(pword);
					$log.info("--===== scope value  ====--");
					$log.info($scope.loginpassword);
					if(pword.length == 4){
						$log.info("the len is 4 call register end point");
						$log.info("Sending Reg info to endpoint");
						$scope.doRegistration();
					}
				}
				
				$scope.formDelRegPassword = function(){
					var prev = String($scope.loginpassword);
					$scope.loginpassword = prev.substring(0,prev.length-1)
				}
				
				$scope.formLoginPassword = function(num){
					var pword = String($scope.loginpassword);//loginpassword
					pword = pword.concat(num);
					$scope.loginpassword= pword;
					$log.info(pword.length);
					$log.info(pword);
					if(pword.length == 4){
						$log.info("the len is 4 call proceed to : login end point");
						$log.info("Sending login info to endpoint");
						$scope.doLogin($scope.loginphonenumber,pword);
					}
				}
				
				$scope.formDelLoginPassword = function(){
					var prev = String($scope.loginpassword);
					$scope.loginpassword = prev.substring(0,prev.length-1)
				}
				
	 			$scope.selectgender = function(usergender){
					$log.info("gender added "+usergender);
					$scope.custgender = usergender;
					
				}
				
				$scope.validateEmail = function(myemail){
					
										var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
										if(myemail.match(mailformat))  
										{  
										 console.log("You have entered a valid email!");
										return true;  
										}  
										else  
										{  
										console.log("You have entered an invalid email address!");  
										
										return false;  
										}  
										
				}
				
				$scope.registerSubmitSetPin = function(accountno,bvnentered){
					//check if bvn number has been entered and then show the details in a bvn form
					//else show the form for user to enter their details (fname, mname,lname)
					$log.info('is bvn valid flag = '+$scope.addbvnlater);
					
					if($scope.addbvnlater === true){
						swal({title:"",text:"If you do not have your BVN. You can still open your Octopus account and supply your BVN later but you will need to enter your info manually to complete registration.",type:"info",confirmButtonColor:"#04639b"},function(){
							
						});
							$scope.addbvnlater = true;
							$scope.customershouldregister = false;
							$scope.manualcustdetail = true;
							$scope.loading = false;
					}else if($scope.addbvnlater === false){
							$scope.enterregisterpassword = true;
							$scope.customershouldregister = false;
							$scope.loading = false;
					}
							
					
				}
				
				$scope.registerUserDetailsSetPin = function(){
					var allvalid = true;
					//check if user details has been entered and then show the password form
					$scope.loading = false;
					//log the items in the customer details array
					$log.info($scope.custfname); $log.info($scope.custlname); $log.info($scope.custemail); $log.info($scope.dateofbirth); $log.info($scope.custgender);
					if(angular.isDefined($scope.custfname)) {
					   
					 }else{
						 $scope.firstnameinvalid = true;
						 allvalid=false;
					 }
					  
					if(angular.isDefined($scope.custlname)){
						
						} else{
							$scope.lastnameinvalid = true
							 allvalid=false;
						}
//email validation
					if(angular.isDefined($scope.custemail)){
							if(!$scope.validateEmail($scope.custemail)){
								$scope.emailinvalid = true;
								allvalid = false;
							}
						
						}else{
							$scope.emailinvalid = true;
						}
					
					if(allvalid){
							$scope.manualcustdetail =  false;
							$scope.enterregisterpassword = true;
						}
					
				}
				
				$scope.isEmpty = function(obj) {
				  for(var prop in obj) {
					  if(obj.hasOwnProperty(prop))
						  return false;
				  }
				  return true;
				};
				
				$scope.showacccountchooser = function(refpage){
					$scope.selectaccount = true;
					
					if(localStorage.getItem("accountstat") === 'true' && localStorage.getItem("cardstat")=== 'true'){
						$scope.mylisttitle = "My Account & Cards List";
						$scope.mylistsubtitle = "Select  from "+$scope.mylisttitle
					}else if (localStorage.getItem("accountstat") === 'true' && localStorage.getItem("cardstat")=== 'false'){
						$scope.mylisttitle = "My Account List";
						$scope.mylistsubtitle = "Select  from "+$scope.mylisttitle
					}else if (localStorage.getItem("accountstat") === 'false' && localStorage.getItem("cardstat")=== 'true'){
						$scope.mylisttitle = "My Card List";
						$scope.mylistsubtitle = "Select  from "+$scope.mylisttitle
					}else{
						$scope.mylisttitle = "My Wallet";
						$scope.mylistsubtitle = "Select  from "+$scope.mylisttitle
					}
					
					if(localStorage.getItem("accounts") === 'undefined'){
						var storedaccounts = [{}];
						$log.info("content of empty accounts object ");
						$log.info(storedaccounts);
					}else{
						var storedaccounts = JSON.parse(localStorage.getItem("accounts"));
						$log.info("content of user stored accounts object ");
						$log.info(storedaccounts);
					}
					
					if(localStorage.getItem("cards") === 'undefined'){
						var storedcards = [{}];
						$log.info("content of empty cards object ");
						$log.info(storedcards);
					}else{
						var storedcards = JSON.parse(localStorage.getItem("cards"));
						$log.info("content of user stored cards object ");
						$log.info(storedcards);
					}
					
					$scope.accounts = storedaccounts;
					$scope.cards = storedcards;
				}
				
				//send the registration data
				$scope.doRegistration = function(){
					$log.info("Inside the Do Registration .. data has been collected");
					var endpointurl = utilService.registeroctopusurl;
					//do a http get for the current user status and display user name
					var datets = new Date();
					var currday = datets.getDate().toString(); 
					var currmonth = (datets.getMonth()+1).toString();
					var curryear = datets.getFullYear().toString();
					var currhour= datets.getHours().toString();
					var currmin = datets.getMinutes().toString();
					var currsec = datets.getSeconds().toString();
					
					var phonnum = $scope.loginphonenumber;
					var passcode= $scope.loginpassword;
					var bankcode = $scope.bankchoosencode;
					var bankname = $scope.bankchoosen;
					var acctnumber = $scope.useracct;
					var bvnnumber = $scope.userregbvn;
					var cardflag = $scope.cardflag;
					//var acctflag = $scope.acctflag;
					var acctflag = false;  // disable acctflag to remove accounts registered on bank IT
					var fname = $scope.custfname;
					var lname = $scope.custlname;
					var gender = $scope.custgender;
					var email = $scope.custemail;
					var dateofbirth = $scope.dateofbirth;
					
					var obj = 
						{source:"MOBILE",transid:utilService.currts,sessid:utilService.currts,phonenumber:phonnum,firstname:fname,
						 lastname:lname,gender:gender,dob:dateofbirth,emailaddress:email,country:"NG",
						passcode:passcode,bvn:bvnnumber,accountstat:acctflag,acno:"",bank:"",
						bankcode:"",cardstat:cardflag,cardno:"",cardpin:"",cardexpiry:"",
						cardcvv:"",cardname:"",cardcurrency:""};
					// remove the previous account registration object
//					var obj = 
//						{source:"MOBILE",transid:utilService.currts,sessid:utilService.currts,phonenumber:phonnum,firstname:fname,
//						 lastname:lname,gender:gender,dob:dateofbirth,emailaddress:email,country:"NG",
//						passcode:passcode,bvn:bvnnumber,accountstat:acctflag,acno:acctnumber,bank:bankname,
//						bankcode:bankcode,cardstat:cardflag,cardno:"",cardpin:"",cardexpiry:"",
//						cardcvv:"",cardname:"",cardcurrency:""};
					console.log("Registration Request object");
					console.log(obj);
					$scope.loading = true;
					$http.post(endpointurl,obj).then(function successCallback(response){
							console.log(response);
						if(response.status === 200){
								var responsedata = response.data;
								$log.info(response.data);
							if(responsedata.responsecode ==="00" || responsedata.responsecode ==="44"|| responsedata.responsecode ==="11"){
									$scope.loading = false;
									localStorage.setItem("phonenumber",$scope.loginphonenumber);
									localStorage.setItem("isuservalid","yes");
									localStorage.setItem("mobiledata.myaccountno",acctnumber);
									localStorage.setItem("sourceaccount",acctnumber);
									localStorage.setItem("sourcebankcode",bankcode);
									localStorage.setItem("sourcebankname",bankname);
									localStorage.setItem("debitmethod",'none');
									localStorage.setItem("usermessage",responsedata.responsemessage);
									localStorage.setItem("firstname",$scope.custfname);
									localStorage.setItem("lastname",$scope.custlname)
									userService.isuservalid = "yes";
//									userService.checkuser($scope.loginphonenumber,function(ufn,uvl){
//										$scope.userfirstname = ufn;
//										$scope.isuservalid = uvl;
//									});
									$scope.isuservalid = "yes";
									//registration successful redirect to the appropriate previouspage to complete transaciton
									var prev = $scope.previoussection
									$scope.otpmessage = responsedata.responsemessage;
									$scope.otptokenentry = true;
									
									
								}
								else if(responsedata.responsecode ==="33" || responsedata.responsecode ==="55" || 				responsedata.responsecode ==="88"){
									$scope.loading = false;
									//phone number or email address already registered
									//set a scope variable to notify the view and enable the save option that registration failed
									localStorage.setItem("usermessage",responsedata.responsemessage);
									$scope.errorHandle(prev,responsedata.responsemessage)
									$scope.manualcustcetail = true;
									swal({title:"",text:responsedata.responsemessage,type:"error",confirmButtonColor: "#04679b"});
								}else{
									$scope.loading = false;
									$scope.errorHandle(prev,responsedata.responsemessage);
									$scope.manualcustcetail = true;
									swal({title:"",text:responsedata.responsemessage,type:"error",confirmButtonColor: "#04679b"});
								}
							}
					},function errorCallBack(response){
						$scope.loading = false;
						$log.info(response);
					});
					
					
				}
				
				$scope.gotoaddaccount = function(){
					$state.go("addaccount");
				}
				
				$scope.gotoaddcard = function(){
					
					$state.go("adddebitcard");
				}
				$scope.doPostLogin = function(srcacctno,srcbankcode,srcbankname,txntype){
					//read the source accounts and redirect
					var prev = $scope.previoussection
					$log.info("the initial referrer ");
					$log.info(prev);
					$scope.transactiontype = txntype;
					if($scope.transactiontype ==='accounttrue'){
						localStorage.setItem("sourceaccount",srcacctno);
						localStorage.setItem("sourcebankcode",srcbankcode);
						localStorage.setItem("sourcebankname",srcbankname);
						localStorage.setItem("debitmethod",$scope.transactiontype);
					}else if($scope.transactiontype === 'cardtrue'){
						
						localStorage.setItem("sourcecid",srcacctno);
						localStorage.setItem("sourcecardname",srcbankcode);
						localStorage.setItem("debitmethod",$scope.transactiontype);
					}
					
					$scope.selectaccount = false;
						
								if(prev==='mobiletopup'){
										$log.info("the  Previous Page referrer " + prev);
										$log.info(prev);
										//read source account /source bank code / source bank name from local storage
										//present a screen to capture source accounts and clicking of these would set the localstorage //source bank, source acocunt and source bank name
										//read source account /source bank code / source bank name from local storage
										$scope.successHandle(prev,srcacctno,srcbankcode,srcbankname);
									}
									if(prev==='savemobiletopup'){
										$log.info("the  Previous Page referrer " + prev);
										$log.info(prev);
										//read source account /source bank code / source bank name from local storage
										//present a screen to capture source accounts and clicking of these would set the localstorage //source bank, source acocunt and source bank name
										//read source account /source bank code / source bank name from local storage
										$scope.successHandle(prev,srcacctno,srcbankcode,srcbankname);
									}
									if(prev==='fundstransfer'){
										$log.info("the referrer " + prev);
										$log.info(prev);
										//read source account /source bank code / source bank name from local storage
										$scope.successHandle(prev,srcacctno,srcbankcode,srcbankname);
									}
									
									if(prev==='paybills'){
										$log.info("the referrer " + prev);
										$log.info(prev);
										//read source account /source bank code / source bank name from local storage
										$scope.successHandle(prev,srcacctno,srcbankcode,srcbankname);
									}
									
									if(prev==='account balance check'){
										$log.info("the referrer " + prev);
										$log.info(prev);
										//read source account /source bank code / source bank name from local storage
										$scope.successHandle(prev,srcacct,srcbankcode,srcbankname);
									}
									if(prev === 'addaccount'){
										$log.info("the referrer page is" + String(prev));
										$log.info(prev)
										$log.info("doLogin - go to success handler " + prev);
										$scope.successHandle(prev,srcacct,srcbankcode,srcbankname);
										
									}
									if(prev === 'addcard'){
										$log.info("the referrer page is" + String(prev));
										$log.info(prev)
										$log.info("doLogin - go to success handler " + prev);
										$scope.successHandle(prev,srcacct,srcbankcode,srcbankname);
										
									}
						//test if the accounts array is populated and supply this else supply card number tag id
						//call the successhandler with the appropriate debit accoutn number
									
								
				}
					
				$scope.doLogin = function(usrphone,pincode){
					$log.info("Inside the Do Login .. data already exists");
					$scope.loading = true;
					
					var datets = new Date();
					var currday = datets.getDate().toString(); 
					var currmonth = (datets.getMonth()+1).toString();
					var curryear = datets.getFullYear().toString();
					var currhour= datets.getHours().toString();
					var currmin = datets.getMinutes().toString();
					var currsec = datets.getSeconds().toString();
					var trans = curryear+currmonth+currday+currhour+currmin+currsec;
					var sess = curryear+currmonth+currday+currhour+currmin+currsec;
					var endpointurl = utilService.loginurl;
					var obj =
					{source:"MOBILE",transid:trans,sessid:sess,phonenumber:usrphone,passcode:pincode};
					$log.info("call the login endpoint ");
					$log.info(obj);
					$http.post(endpointurl,obj).then(function successCallback(response){
							$log.info("Response to login function: ");
							$log.info(response);
							if(response.status === 200){
								var responsedata = response.data;
								$log.info(response.data);
								if(responsedata.responsecode ==="00" ){
//									userService.checkuser(usertoken,function(fn,vl){
//										$scope.userfirstname = localStorage.getItem("firstname");
//										$scope.isuservalid = localStorage.getItem("isuservalid");
//										$scope.useraccounts = userService.useraccounts;
//
//									});
									$scope.loading = false;
									//call the account chooser 
									$log.info("the Do Login ... responded Postive customer is validated and signed in");
									$log.info("Show customer accounts or cards to choose for Debit Transaction");
									$log.info(responsedata);
									localStorage.setItem("phonenumber",usrphone);
									localStorage.setItem("isuservalid","yes");
									localStorage.setItem("firstname",responsedata.firstname);
									localStorage.setItem("cards",JSON.stringify(responsedata.cards));
									localStorage.setItem("accounts",JSON.stringify(responsedata.accounts));
									localStorage.setItem("authorization",responsedata.authorization);
									var srcacct = localStorage.getItem("sourceaccount");
									var srcbankcode = localStorage.getItem("sourcebankcode");
									var srcbankname = localStorage.getItem("sourcebankname");
									// set the local storage
									$scope.isuservalid = "yes"
									$scope.loginpassword = pincode;
									userService.isuservalid = "yes";
									
									var prev = $scope.previoussection
								$log.info("the initial referrer ");
									
									if(prev ==='fundstransfer' || prev === 'mobiletopup' || prev === 'paybills' ||  prev === 'savemobiletopup') {
										//switch between transaction  processing and account management
										$scope.showacccountchooser();
										//
									}else if(prev==="account balance check"){
										$log.info("Redirect to the account manager");
										$log.info(localStorage.getItem("phonenumber"));
										$log.info($scope.isuservalid);
										$state.go("accountmanager",{userphone:localStorage.getItem("userphone"),
																	 isuservalid:$scope.isuservalid,
																	 txauthstat:"yes",
																	 pin:$scope.loginpassword,method:"viewbalance"});
									}else if(prev ==='addaccount'){
										$log.info("Success handler is Redirecting to the add account account manager");
										$log.info(localStorage.getItem("phonenumber"));
										$state.go("accountmanager",{userphone:localStorage.getItem("userphone"),
																	 isuservalid:$scope.isuservalid,
																	 txauthstat:"yes",
																	 pin:$scope.loginpassword,method:"addaccount"});
									}else if(prev === 'addcard'){
										$log.info("Success handler is Redirecting to the add card manager");
										$log.info(localStorage.getItem("phonenumber"));
										$log.info($scope.isuservalid);
										$log.info($scope.loginpassword);
										$log.info(localStorage.getItem("phonenumber"));
										$state.go("adddebitcard",{userphone:localStorage.getItem("userphone"),
																	isuservalid:$scope.isuservalid,
																	txauthstat:"yes",
																	pin:$scope.loginpassword,method:"addcard",infoobj:infobj});
									}
									else{
										//redirect to the bench home
										$log.info("redirect to bench home");
										$state.go("home");
									}
									
									
								}else{
									$scope.loading = false;
									$scope.passcodewrong = true;
									$scope.loginresponsemssage = responsedata.responsemessage;
									$scope.loginpassword="";
									swal({title:"",text:responsedata.responsemessage,type:"error",
										  confirmButtonColor: "#04679b"},function(){});
								}
							}
					},function errorCallBack(response){
						$scope.loading = false;
						$log.info(response);
						$scope.loginpassword="";
						swal({title:"",text:response,type:"error",confirmButtonColor: "#04679b"},function(){});
					});
					
					
				}
	
				$scope.successHandle = function(reffrom,srcacct,srcbankcode,srcbankname){
//					$log.info($scope.loginpassword);
			
				
					if(reffrom==='fundstransfer'){
										
									$state.go("transferconfirm",{sendAmount:localStorage.getItem("ftamt"),
																	 sendBankName:localStorage.getItem("ftdestbankname"),
																	 sendbankCode:localStorage.getItem("ftdestbankcode"),
																	 sendBeneficiaryName:localStorage.getItem("ftbeneficiaryname"),
																	 sendAccount:localStorage.getItem("ftdestaccount"),
																	 sourceAccount:srcacct,
																	 sourceBankCode:srcbankcode,
																	 sourceBankName:srcbankname,
																 	 
																	isuservalid:$scope.isuservalid,txauthstat:"yes",pin:$scope.loginpassword});
									}else if(reffrom==='mobiletopup'){
										
										$state.go("mobileconfirm",{sendAmount:localStorage.getItem("mtamt"),
																   sendBankName:localStorage.getItem("mtnetwork"),
																   sendbankCode:localStorage.getItem("mtnetwork"),
																   sendBeneficiaryName:localStorage.getItem("mtnetwork"),
																   sendAccount:localStorage.getItem("mtphonenumber"),
																   sourceAccount:srcacct,
																   sourceBankCode:srcbankcode,
																   sourceBankName:srcbankname,
																   isuservalid:$scope.isuservalid,txauthstat:"yes",pin:$scope.loginpassword});
									}else if(reffrom==='savemobiletopup'){
										
										$state.go("savetransaction",{sendAmount:localStorage.getItem("mtamt"),
																   sendBankName:localStorage.getItem("mtnetwork"),
																   sendbankCode:localStorage.getItem("mtnetwork"),
																   sendBeneficiaryName:localStorage.getItem("mtnetwork"),
																   sendAccount:localStorage.getItem("mtphonenumber"),
																   sourceAccount:srcacct,
																   sourceBankCode:srcbankcode,
																   sourceBankName:srcbankname,
																   isuservalid:$scope.isuservalid,txauthstat:"yes",pin:$scope.loginpassword});
									}else if (reffrom==='paybills' ){
										
										$state.go("paybillsconfirm",{sendAmount:localStorage.getItem("pbamount"),
																	 sendBankName:localStorage.getItem("pbbillername"),
																	 sendBankCode:localStorage.getItem("pbpaymentcode"),
																	 sendBeneficiaryName:localStorage.getItem("pbpaymentitemname"),
																	 sendAccount:localStorage.getItem("pbcustomerid"),
																	 sourceAccount:srcacct,
																	 sourceBankCode:srcbankcode,
																	 sourceBankName:srcbankname,
																	isuservalid:$scope.isuservalid,txauthstat:"yes",pin:$scope.loginpassword});
									}
				}
				$scope.errorHandle = function(refrom,errmsg){
					swal({title:"",type:"error",text:errmsg,confirmButtonColor:"#04679B"});
				}
				//test this against user status service to retrieve user reg status
			
				//if user is successfully enrolled present the password screen

				//if user isnt successfully enrolled present the registration screen 

				//the arguement to this state will be the userphone and referring section i.e paybills, funds transfer

	
	$scope.toggleLogin= function(){
		$scope.validateuserphone = !$scope.validateuserphone;
	}
	
	
});

