// JavaScript Document
angular.module('octngapp.mobilecontroller',['octngapp.services'])

octngapp.controller("mobileController",function($scope,$http,$log,$state,userService,utilService){
		$log.info("the mobile controller");
		$log.info("hode the keyboard");
		
		$scope.mobiledata={};
		$scope.mobiledata.mobilenetwork = "the Telco";
		$scope.nl_title = "Select Network"
		$scope.showaccount = false;
		$scope.accountselectedflag = false;
		var self = this;
		var phonenumber = localStorage.getItem("phonenumber");
			userService.checkuser(phonenumber,function(fn,vl){
			$scope.isuservalid = vl;
			$scope.userfirstname = fn;
			$log.info("user session valid or not");
			$log.info($scope.isuservalid);
			$log.info($scope.userfirstname);
		});
		$scope.confirmtopup = {};
		$scope.mobiledata.billerid = "";
	 	$scope.mobiledata.paymentcode="";
		$log.info($scope.isuservalid);
		$scope.isforminvalid = true;
	
		$scope.$watch('mobiledata.mobiletopup_phone',function(){
			if(angular.isDefined($scope.mobiledata.mobiletopup_phone) && angular.isDefined($scope.mobiledata.amount) && angular.isDefined($scope.mobiledata.mobilenetwork)){
				$scope.isforminvalid = false;
			}
		})
		$scope.$watch('mobiledata.amount',function(){
			if(angular.isDefined($scope.mobiledata.mobiletopup_phone) && angular.isDefined($scope.mobiledata.amount) && angular.isDefined($scope.mobiledata.mobilenetwork)){
				$scope.isforminvalid = false;
			}
		})
		$scope.$watch('mobiledata.mobilenetwork',function(){
			if(angular.isDefined($scope.mobiledata.mobiletopup_phone) && angular.isDefined($scope.mobiledata.amount) && angular.isDefined($scope.mobiledata.mobilenetwork)){
				$scope.isforminvalid = false;
			}
		})
		
		$scope.formatTwoNumberDecimal = function(x){
			return parseFloat(x).toFixed(2);
		}
	
		$scope.showmyAccount = function(){
				$scope.showaccount = !$scope.showaccount;
			     // self.useraccounts = JSON.parse(localStorage.getItem("accounts"));
				$scope.accountlist = JSON.parse(localStorage.getItem("accounts"));
				$log.log($scope.accountlist);
		}
		
		$scope.accountselected = function(accountno,acctbnkcode,acctbnkname){
			$scope.mobiledata.myaccountno = accountno;
			$scope.mobiledata.bankcode = acctbnkcode;
			$scope.mobiledata.bankname = acctbnkname;
			$scope.showaccount = !$scope.showaccount;
		
		}
		//$scope.accounts = userService.useraccounts;
		$scope.gotohome = function(){
				$log.info("Canceling .. top up transaction..");
				$state.go("mybench");
		}
		
		$scope.returnUserphone = function(){
			$scope.mobiledata.mobiletopup_phone = localStorage.getItem("phonenumber");
		}
		$scope.validatetopup = function(){
		//keep the information from the scope into a bundle and pass to the next screen
			
			self.amt = $scope.mobiledata.amount;
			self.phn = $scope.mobiledata.mobiletopup_phone;
			self.ntwork = $scope.mobiledata.mobilenetwork;
			self.account = $scope.mobiledata.myaccountno;
			self.accountbank = $scope.mobiledata.bankcode;
			self.accountbankname = $scope.mobiledata.bankname;
			self.ntworkpaymentcode = $scope.mobiledata.paymentcode;
			self.ntworkbillerid = $scope.mobiledata.billerid;
			$log.info(self.amt+"/"+self.phn+"/"+self.ntwork+"/"+self.account+"/"+self.accountbank+"/"+self.ntworkbillerid+"/"+self.ntworkpaymentcode+"/"+self.ntwork);

			if(angular.isUndefined($scope.mobiledata.amount) || angular.isUndefined($scope.mobiledata.mobiletopup_phone)|| angular.isUndefined($scope.mobiledata.mobilenetwork)){
				console.log("required field is missing");
				swal({title:"",type:"error",text:"Required field missing"})
			}else{
				$state.go('mobileconfirm',{sendAmount:self.amt,sendBankName:self.ntwork,sendBankCode:self.ntwork,sendBeneficiaryName:self.ntwork,sendAccount:self.phn,sourceBankCode:self.accountbank,sourceAccount:self.account,sourceBankName:"",isuservalid:$scope.isuservalid});

			}
			
			 
	}
		
	 		$scope.checked = false;
			$scope.phonechecked = false;
			$scope.octopussearch = false;
            $scope.size = '100px';
			$scope.telcoarray =[];
		
	$scope.phones = [{number:"07089008121",name:"Balogun Seun"},{number:"09071009232",name:"iShola Babatunde"},{number:"08063119009",name:"David Amin"}];
                $scope.toggleTelco = function() {
                    $scope.checked = !$scope.checked
					
					var endpointurl = utilService.rechargebillersurl
					var obj = {source:"MOBILE",transid:utilService.currts,sessid:utilService.currts,phonenumber:"07038901111"};
					
					$scope.loading = true;
					
					$http.post(endpointurl,obj).then(function success(response){
						$log.info(response);
						if(response.status===200){
							$scope.loading= false;
								var responsedata = response.data;
								if(responsedata.responsecode ==='00'){
									$scope.telcoarray = responsedata.result;
									$log.info(responsedata.result);
								}else{
									$scope.telcoarray = [{billerid:"908",itemfee:"0",amount:"0",paymentitemname:"9Mobile Top up",paymentcode:"90806",paymentitemid:"06",billername:"9mobile Recharge (E-Top Up)",categoryid:"3",isamountfixed:"false"},{billerid:"901",itemfee:"0",amount:"0",paymentitemname:"Airtel Top-up",paymentcode:"90106",paymentitemid:"06",billername:"Airtel Mobile Top-up (Prepaid)",categoryid:"3",isamountfixed:"false"},{billerid:"913",itemfee:"0",amount:"0",paymentitemname:"Top up",paymentcode:"91309",paymentitemid:"09",billername:"GLO QuickCharge (Top-up)",categoryid:"3",isamountfixed:"false"},
									{billerid:"109",itemfee:"0",amount:"0",paymentitemname:"MTN Top up",paymentcode:"10906",paymentitemid:"06",billername:"MTN Direct Top-up (Prepaid)",categoryid:"3",isamountfixed:"false"},{billerid:"2749",itemfee:"10000",amount:"0",paymentitemname:"Smile Airtime",paymentcode:"04274901",paymentitemid:"01",billername:"Smile Communications",categoryid:"3",isamountfixed:"false"},{billerid:"888",itemfee:"10000",amount:"0",paymentitemname:"DexterTech Voucher (N2K or more)",paymentcode:"888888",paymentitemid:"888",billername:"Topup (prepaid)",categoryid:"3",isamountfixed:"false"}];
								}
						}
						
					},function error(response){
						$log.error(response);
						$scope.loading= false;
					});
					
					
                }
			
				$scope.togglePhone = function() {
                    $scope.phonechecked = !$scope.phonechecked
                }
				
				$scope.telcoSelected = function(billername,billerid,paymentitemname,paymentcode){
					$scope.mobiledata.mobilenetwork  = billername;
					$scope.mobiledata.billerid = billerid;
					
					$log.info($scope.mobiledata.billerid);
					localStorage.setItem("mtbillerid",$scope.mobiledata.billerid);
				

								$scope.mobiledata.paymentcode = paymentcode
								$log.info("selected Payment code ");
								$log.info($scope.mobiledata.paymentcode);
								localStorage.setItem("mtpaymentcode",$scope.mobiledata.paymentcode);
						
					 $scope.checked = !$scope.checked
				}
				
				$scope.toggleOctopus = function(){
					$scope.octopussearch = !$scope.octopussearch;
				}
				
				$scope.phoneSelected = function(phn){
					$scope.mobiledata.mobiletopup_phone = phn;
					$scope.togglePhone();
				}
				
				$scope.phoneOctopusSelected = function(phn){
					$scope.mobiledata.mobiletopup_phone = phn;
					$scope.togglePhone();
				}
				
                $scope.mockRouteChange = function () {
                    $scope.$broadcast('$locationChangeStart');
                }

                $scope.onopen = function () {
                   
						swal({title:"",type:"error",text:"Open",confirmButtonColor: "#04679b"});
                    console.log(this, $scope);
                }

                $scope.onclose = function () {
                    
						swal({title:"",type:"error",text:"Close",confirmButtonColor: "#04679b"});
                    console.log($scope);
                }
	
	
});



//mobile topup confirm controller with registration routine   ****************************
octngapp.controller("mobileConfirmController",function($scope,$log,userService,$http,$state,utilService){
	
				$log.info("Mobile Confirm controller ... check the state object");
				if($state.params.txauthstat){
					$scope.topupaction = "DO IT"
				}else{
					$scope.topupaction = "CONFIRM"
				}
				$scope.confirmtopup = {};
				$scope.showpassword = false;
				$scope.confirmtopup.amount = $state.params.sendAmount; 
				$scope.confirmtopup.mobiletopup_phone = $state.params.sendAccount;
				$scope.confirmtopup.mobilenetwork = $state.params.sendBankName;
				$scope.confirmtopup.myaccountno = $state.params.sourceAccount;
				$log.info("check user validity in mobile controller");
				$log.info("check user validity in mobile controler - state params");
				//isuservalid
				$log.info($state.params.isuservalid);
				$log.info($scope.confirmtopup.myaccountno);
				$log.info($state);
				$scope.isuservalid = $state.params.isuservalid;
				$log.info("check user validity in mobile controlerr - scope params");
				$log.info($scope.isuservalid);
				//update the greeting message in the global scope
				$log.info("State Params defined... ");
				$log.info($state.params.userfirstname);
	
				$scope.gotoform = function(){
					$log.info("Cancelling .. top up transaction..  Goto Previous.. ");
					$state.go("mobiletopup");
				}
		
				$scope.doit = function(){
					if($scope.isuservalid === "no"){
						var phone = localStorage.getItem("phonenumber");
						var referredfrom = "mobiletopup";
						
						localStorage.setItem("mtamt",$state.params.sendAmount);
						localStorage.setItem("mtnetwork",$state.params.sendBankName);
						localStorage.setItem("mtnetwork",$state.params.sendBankName);
						localStorage.setItem("mtnetwork",$state.params.sendBankName);
						localStorage.setItem("mtphonenumber",$state.params.sendAccount);
						localStorage.setItem("previousstate","mobilestate");//previousstate
						$log.info({userphone:phone,previouspage:referredfrom});
						$state.go("login",{userphone:phone,previouspage:referredfrom});
						
						
					}else{
						
						if($state.params.txauthstat === 'yes' && localStorage.getItem("debitmethod") !== 'none'){
							//go to the debit -credit service
							
							$log.info("go to the debit credit function");
							
							var userphone = localStorage.getItem("phonenumber");
							var paymentcode = localStorage.getItem("mtpaymentcode");
							var custid = localStorage.getItem("mtphonenumber");
							var srcacct = localStorage.getItem("sourceaccount");
							var srcbnkcode = localStorage.getItem("sourcebankcode");
							var narr = localStorage.getItem("mtnetwork");
							var amt = localStorage.getItem("mtamt");
							var cid = localStorage.getItem("sourcecid");
							var cardname = localStorage.getItem("sourcecardname")
							var epurl=utilService.sendbilladviceurl;
							
							if(localStorage.getItem("debitmethod") === 'accounttrue'){
								var obj = {
 source:"MOBILE", transid:utilService.currts, sessid:utilService.currts, phonenumber:userphone, accountstat:"true",
 debitaccount:srcacct, debitbank:srcbnkcode, customerid:custid, paymentcode:paymentcode,  cardstat:"false",  cid:"",
  amount:amt, narration:narr, passcode:$state.params.pin,authorization:localStorage.getItem('authorization')};
								
						$log.info(" request Object for mob topup");
						$log.info(obj);
						$scope.loading = true;
						$http.post(epurl,obj).then(function success(response){
							$log.info(response);
							if(response.status === 200){
								$scope.loading = false;
								var responsedata = response.data;
								
								if(responsedata.responsecode ==="00"){
									$log.info(responsedata.responsemessage);
									utilService.savebeneficiary(userphone,custid,paymentcode,paymentcode,narr,custid,"MOBILE TOPUP");
									$state.go("mobiletopupsucess");
								}else if (responsedata.responsecode ==="33"){
									swal({title:"",type:"info",text:responsedata.responsemessage},function(){
											$state.go("mobiletopupsucess");
									});
								
								}else{
									$log.info(responsedata);
										swal({title:"",type:"error",text:responsedata.responsemessage,confirmButtonColor: "#04679b"},function(){
											$state.go("mobiletopupfailure");
										});
									
									
								}
							}
							var responsedata
						},function error(response){
							$log.error(response);
							
						});	
							
								
								
							}else if (localStorage.getItem("debitmethod") === 'cardtrue'){
								var trnobj = {
 source:"MOBILE", transid:utilService.currts, sessid:utilService.currts, phonenumber:userphone, accountstat:"false",
 debitaccount:"", debitbank:"", customerid:custid, paymentcode:paymentcode,  cardstat:"true",  cid:cid,
 amount:amt, narration:narr, passcode:$state.params.pin,authorization:localStorage.getItem('authorization')};
							
								
								
						$log.info(" request Object for mobile topup");
						$log.info(obj);
						$scope.loading = true;
						$http.post(epurl,trnobj).then(function success(response){
							$log.info(response);
							if(response.status === 200){
								$scope.loading = false;
								var responsedata = response.data;
								
								if(responsedata.responsecode ==="00" || responsedata.responsecode ==="33"){
									
									swal({title:"",type:"input",text:responsedata.responsemessage,confirmButtonColor: "#04679b"},function(inputvalue){
										if(inputvalue === false){
											return false;
										}
										
										if(inputvalue === ""){
											swal({text:"Please enter a valid Token",type:"error",title:""});
										}
										
										$log.info(" show token has been set to true ... please show token input");
										$log.info(inputvalue);
										var validurl = utilService.transactionvalidateurl;
										var obj = {
 source:"MOBILE", transid:utilService.currts, sessid:utilService.currts, phonenumber:userphone,customerid:custid, paymentcode:paymentcode,  cardstat:"true",  cid:cid,amount:amt, narration:narr,paymentid:responsedata.paymentid, passcode:$state.params.pin,otp:inputvalue,cardname:cardname,transtype:"bp",transref:responsedata.transref,creditaccount:"",creditbank:"",authorization:localStorage.getItem('authorization')};
										$log.info("request object to validate token for mobile topup");
										$log.info(obj);
										$http.post(validurl,obj).then(function success(result){
											$log.info("Success handler result from OTP validation");
											$log.info(result);
											var resultdata = result.data;
											if(resultdata.responsecode === '00'){
												$log.info("Success response to OTP validation go to success");
												
												swal({title:"",type:"success",text:resultdata.responsemessage,confirmButtonColor:"#04679b"},function(){
													$state.go("mobiletopupsucess");
												})
											}else{
												$log.info("Error response to OTP validation go to error");
												swal({title:"",type:"error",text:resultdata.responsemessage,confirmButtonColor:"#04679b"},function(){
													$state.go("mobiletopupfailure");
												})
												
											}
											
										},function error(result){
											$log.info("Error handler  result from OTP validation");
											$log.info(result);
										})
									});
								}else{
									$log.info(responsedata);
									swal({title:"",
										  type:"error",
										  text:responsedata.responsemessage,
										  confirmButtonColor: "#04679b",
										 inputPlaceHolder:"Enter OTP",
										  showCancelButton:true},function(){
										$state.go("mobiletopupfailure");
									});
									
								}
							}
							var responsedata
						},function error(response){
							$log.error(response);
							
						});	
							
								
							}

							//re direct to the job successful or Job failure page
						}else{
							//re
							$log.info( "proceed to process this transaction.... user is valid");
							//show the login password form
							$scope.topupaction = "CONFIRM";
							var phone = localStorage.getItem("phonenumber");
							var referredfrom = "mobiletopup";

							localStorage.setItem("mtamt",$state.params.sendAmount);
							localStorage.setItem("mtnetwork",$state.params.sendBankName);
							localStorage.setItem("mtnetwork",$state.params.sendBankName);
							localStorage.setItem("mtnetwork",$state.params.sendBankName);
							localStorage.setItem("mtphonenumber",$state.params.sendAccount);
							localStorage.setItem("sourceaccount",$state.params.sourceAccount);
							localStorage.setItem("sourcebankcode",$state.params.sourceBankCode);
							localStorage.setItem("sourcebankname",$state.params.sourceBankName);
							localStorage.setItem("previousstate","mobilestate");
							$log.info({userphone:phone,previouspage:referredfrom});
							$state.go("login",{userphone:phone,previouspage:referredfrom});
							//$scope.showpassword = true;
							//$state.go("mobiletopupsucess");
						}
						
						
					}
				}
				
				
				$scope.saveit = function(obj){
					obj.narrative = "Mobile Recharge ";
				//confirmtopup.mobiletopup_phone,confirmtopup.mobilenetwork,confirmtopup.amount,confirmtopup.myaccountno
					$state.go("savetransaction",{phone:obj.mobiletopup_phone,network:obj.mobilenetwork,amount:obj.amount,accountno:obj.accountno,narration:obj.narrative});
//					var saveobj = {
//					source:"MOBILE",accountno:"",sessid:utilService.currts,
//					transid:utilService.currts,
//					receiverid:"08116814059",
//					receivername:"Tayo Babalola",
//					receiveraccount:"0025562151",
//					receiverbank:"GTB",
//					receiverbankcode:"090",
//					customerid:"",
//					paymentcode:"",
//					billername:"",
//					billerid:"",
//					categoryname:"",
//					categoryid:"",
//					senderid:"07038901111",
//					sendername:"",
//					senderaccount:"",
//					senderbank:"",
//					senderbankcode:"",
//					amount:"2000",
//					transtype:"ft",
//					transcategory:"fundsrequest",
//					narration:"please send me 2k"};
//					
//					$http.post(utilService.fundsrequesturl,saveobj).then();
				}
				
				
	
});

