// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//var octngapp = angular.module('octngapp', ['ionic','ui.router','ngCordova']);

var octngapp = angular.module('octngapp', ['octngapp.services','octngapp.paybillsctrl','octngapp.logincontroller','octngapp.ftcontroller','octngapp.mobilecontroller','ionic','ui.router','ionic.native','pageslide-directive','720kb.datepicker','mdo-angular-cryptography','credit-cards'])

octngapp.run(function($ionicPlatform,$log,$cordovaNetwork,$cordovaDevice,$cordovaContacts,$rootScope,$cordovaDialogs) {
  $ionicPlatform.ready(function() {
	$log.info("=================== 3D check Actions =====================");
	  	//quickactionService.configure();
	  	$log.info("================== Contacts Info ======================");
	  	//$log.info(JSON.stringify(navigator));
		//$log.info("Connection Status " + navigator.network.connection.type);
		//$log.info("Contact "+ JSON.stringify(navigator.contacts.fieldType));
	  
	  	console.log("================= Ionic platform Info ================");
		console.log("Ionic instance info");
		console.log($ionicPlatform);
	  
	  
	  	console.log("================ Device Info ========================");
	  	console.log('Device model is: ' + $cordovaDevice.device.model);
	  	console.log('Device UUID is: ' + $cordovaDevice.device.uuid);
	 
	  
		console.log("================ Network information ===============");
	  	var netinfo = $cordovaNetwork;
	 	console.log("Net Info");
	 	console.log(netinfo);
	  
	  
	 	console.log("================ Network Object =======================");
	  	console.log($cordovaNetwork.Network);
	  	console.log("================ Network connection status =======================");
 
	  
	  var disconnectSubscription = $cordovaNetwork.onDisconnect().subscribe(() => {
		  localStorage.setItem("networkstatus","disconnected");
  			console.log('network was disconnected :-(');
	  	});

	var connectSubscription = $cordovaNetwork.onConnect().subscribe(() => {
  			console.log('network connected!');
	});
  

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		
		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
    	cordova.plugins.Keyboard.disableScroll(true);

		
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    if(window.FirebasePlugin){
         window.FirebasePlugin.getToken(function(token) {
          // save this server-side and use it to push notifications to this device
          console.log(token);
            $log.info("firebase token "+token)

    }, function(error) {
        console.error(error);
        $log.info("firebase token "+token)
      });
    }

   
  });

});

//state navigation
octngapp.config(function($stateProvider,$cryptoProvider,$urlRouterProvider) {
	$stateProvider
  .state('home', {
    name: 'home',
    url: '/home',
    templateUrl: 'main.html',
    controller: 'homeController'
  })
  .state('mybench',{
    name: 'mybench',
    url: '/mybench',
    templateUrl: 'bench_home.html',
    controller:'mybenchController'
  })  
  .state('mobiletopup',{
    name: 'mobiletopup',
    url:'/mobiletopup',
    templateUrl:'mobile_topup-form.html',
    controller:'mobileTopupController'
  })
   .state('mobileconfirm',{
    name: 'mobileconfirm',
  url:'/mobileconfirm/:sendAmount/:sendBankName/:sendBankCode/:sendBeneficiaryName/:sendAccount/:sourceAccount/:sourceBankCode/:sourceBankName/:isuservalid/:userfirstname/:txauthstat/:pin/:isinboxtxn',
    templateUrl:'mobile-topup.html',
    controller:'mobileConfirmController'
  })
  .state('mobiletopupsucess',{
	   name: 'mobiletopupsucess',
	   url:'/mobiletopupsuccess',
	   templateUrl:'mobile-success.html',
	   controller:'mobiletopupSucess'
   })
   .state('accountmanager',{
	   name: 'accountmanager',
	   url:'/accountmanager/:userphone/:isuservalid/:pin/:txauthstat/:method',
	   templateUrl:'all_account_balance.html',
	   controller:'accountmanagerController'
   })
   .state('mobiletopupfailure',{
	   name: 'mobiletopupfailure',
	   url:'/mobiletopupfailure',
	   templateUrl:'mobile-failure.html',
	   controller:'mobiletopupFailure'
   })
   .state('login',{
    name: 'login',
    url:'/login/:userphone/:previouspage/:infoobj/:previousstate',
    templateUrl:'login.html',
    controller:'loginController'
  })

  .state('transfer',{
    name: 'transfer',
    templateUrl:'send_request_money.html',
    url:'/transfer',
    controller:'sendMoneyController'
  })
 .state('transferconfirm',{
    name: 'transferconfirm',
  url:'/transferconfirm/:sendAmount/:sendBankName/:sendBankCode/:sendBeneficiaryName/:sendAccount/:sourceAccount/:sourceBankCode/:sourceBankName/:isuservalid/:userfirstname/:txauthstat/:pin/:isinboxtxn',
    templateUrl:'funds_transfer.html',
	controller:'sendMoneyConfirmController'
  })
   .state('paybills',{
    name: 'paybills',
    templateUrl:'pay_bills_form.html',
    url:'/paybills',
    controller:'payBillsController'
  })
    .state('paybillsconfirm',{
    name: 'paybillsconfirm',
    templateUrl:'pay_bills.html',
  	url:'/paybillsconfirm/:sendAmount/:sendBankName/:sendBankCode/:sendBeneficiaryName/:sendAccount/:sourceAccount/:sourceBankCode/:sourceBankName/:isuservalid/:userfirstname/:txauthstat/:pin/:isinboxtxn',
    controller:'payBillsConfirmController'
  })
	.state('addaccount',{
		name: 'addaccount',
		templateUrl:'add_bank.html',
		url:'add_bank/:isuservalid/:userfirstname/:txauthstat/:pin/:previousstate',
		controller:'addAccountController'
		
	})
	.state('adddebitcard',{
		name: 'adddebitcard',
		templateUrl:'add_card.html',
		url:'add_card/:isuservalid/:userfirstname/:txauthstat/:pin/:infoobj/:previousstate',
		controller:'addcardController'
	})
		
	.state('inbox',{
		name: 'inbox',
		templateUrl:'pay_bills_form_edit.html',
		url:'inbox/:isuservalid/:userfirstname/:txauthstat',
		controller:'inboxController'
	})
	.state('savetransaction',{ 
		name:'savetransaction',
		templateUrl:'save_request_form.html',
		url:'/savetransaction/:phone/:network/:amount/:account/:narration/:txauthstat',
		controller:'saveController'
		
	})
	
	
	$urlRouterProvider.otherwise("/home");
	
	
	$cryptoProvider.setCryptographyKey('password');
	
});
//end state navigation

//loading directive
 octngapp.directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="images/ajax-loader.gif" width="20" height="20" />Please Wait...</div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  });
  //end loading directive

//loading directive
 octngapp.directive('loadingwhite', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="images/ajax-loader.gif" width="20" height="20" />Please Wait...</div>',
        link: function (scope, element, attr) {
              scope.$watch('loadingwhite', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  });
  //end loading directive
//Add a credit card debit card
 octngapp.controller("addcardController",function($scope,$log,$state,$http,utilService,userService,cardService,$crypto,creditcards){
	 
	 $scope.pagetitle = "Add Your Debit Card";
	 
	 //phonenumber,cardno,cardname,cardexpmonth,cardexpyear,cardcvv,cardcurr,cardcountry,cardpin,passcode
	 
	 $scope.carddata = {};
	 
	 $scope.otptokenentry = false;
	 $scope.cardmonths = [{id:"01",value:"01"},{id:"02",value:"02"},{id:"03",value:"03"},{id:"04",value:"04"},
							  {id:"05",value:"05"},{id:"06",value:"06"}, {id:"07",value:"07"}, {id:"08",value:"08"},
							  {id:"09",value:"09"},{id:"10",value:"10"},{id:"11",value:"11"},{id:"12",value:"12"}];
	 
	 var datets = new Date();
	 var curryear = datets.getFullYear().toString();
	 $scope.cardyears = [{id:"01",value:curryear},{id:"02",value:(datets.getFullYear()+1).toString()},
								  {id:"03",value:(datets.getFullYear()+2).toString()},{id:"04",value:(datets.getFullYear()+3).toString()},{id:"05",value:(datets.getFullYear()+4).toString()},{id:"06",value:(datets.getFullYear()+5).toString()}]
	 
	 $scope.usertoken = localStorage.getItem("phonenumber");
	 var phone = localStorage.getItem("phonenumber");
	 $scope.doconfirmcard = function(cardobj){
			$log.info("Card info object properties");
		
		 	cardobj.cardcountry = "NG";
		  	cardobj.cardcurrency = "NGN";
			// $state.params.isuservalid ==='yes' && $state.params.txauthstat === 'yes'
			var referredfrom = "addcard";
			$log.info("--======= card obj data to state object ============--");
			var myobj = cardobj;
			$log.info("--======= value of my var variable object ============--");
			$log.info(myobj);
			myobj.cardno = $crypto.encrypt(myobj.cardno);
			myobj.cardpin  = $crypto.encrypt(myobj.cardpin);
			myobj.cardcvv = $crypto.encrypt(myobj.cardcvv);
		 	//myobj.cardcvv = $crypto.encrypt(myobj.cardcvv);
		 	$log.info("--======= Encypted sensitive data object ============--");
		 	$log.info(myobj.cardpin);
			$log.info(myobj.cardno);
			$log.info(myobj.cardcvv);
		 	localStorage.setItem("cardobject",JSON.stringify(myobj));
		 	$state.go("login",{userphone:phone,previouspage:referredfrom,infoobj:myobj});
	 		
	 }
			if($state.params.txauthstat === 'yes' && $state.params.isuservalid ==='yes'){
						var userpin = $state.params.pin;
						$scope.loading = true;
						myobj = JSON.parse(localStorage.getItem("cardobject"));
						$log.info("Retireved card object with encrytion");
						$log.info(myobj);
						myobj.cardno = $crypto.decrypt(myobj.cardno);
						myobj.cardpin = $crypto.decrypt(myobj.cardpin);
						myobj.cardcvv = $crypto.decrypt(myobj.cardcvv);
						myobj.authtoken = localStorage.getItem("authorization");
						$log.info("Retrieved card object after encryption");
						cardService.addcardservice(phone,myobj,userpin,function(resultdata){
						$log.info(resultdata);
						if(resultdata.responsecode === '00'||resultdata.responsecode === '33'){
								$scope.loading = false;
								$log.info("Add Card Service returned OTP token to be entered");
								localStorage.setItem("cid",resultdata.cid);
								$scope.otptokenentry = true;
								swal({title:"",text:resultdata.responsemessage,type:"info",confirmButtonColor:"#04679B"});
								$log.info("txn processed pls enter otp");
								
								localStorage.setItem("sourcecid",resultdata.cid);
								localStorage.setItem("sourcecardname",resultdata.cardno);
								localStorage.setItem("debitmethod","cardtrue");
						}else{
								$scope.loading = false;
								swal({title:"",text:resultdata.responsemessage,type:"error",confirmButtonColor:"#04679B"});
								$log.info("card addition failed ");
						}
					})
				
				}else if($state.params.txauthstat === 'yes' || $state.params.isuservalid ==='yes'){
					$log.info("--======= card obj data for authenticated user state object ============--");
					$log.info(cardobj);
					$state.go("login",{userphone:phone,previouspage:referredfrom,infoobj:$scope.cardobj});

				}
				 $scope.dovalidatecard = function(otp){
					$scope.loading = true;
					$log.info("Card info object");
					$log.info(otp);
					var resultobj = JSON.parse(localStorage.getItem("cardobject"));
					$log.info(resultobj.cardname);
					var customerid= localStorage.getItem("cid");
					// phone,cardno,custid,passcode,otp,callback
					 
					cardService.addcardvalidateservice(phone,resultobj.cardno,customerid,$state.params.pin,otp,function(resp){
						 $log.info(resp);
						if(resp.responsecode === '00'){
							swal({title:"",text:resp.responsemessage,type:"success",confirmButtonColor:"#04679B"},function(resultflag){
									$scope.loading = false;
									$log.info(resultflag);
									$log.info("Card has been added successfully go to referring state page");
									
									if(localStorage.getItem("previousstate") === 'mobilestate'){
										
//											
//									localStorage.setItem("sourcecid",srcacctno);
//									localStorage.setItem("sourcecardname",srcbankcode);
//									localStorage.setItem("debitmethod",$scope.transactiontype);
										
										$state.go("mobileconfirm",{sendAmount:localStorage.getItem("mtamt"),
																	   sendBankName:localStorage.getItem("mtnetwork"),
																	   sendbankCode:localStorage.getItem("mtnetwork"),
																	   sendBeneficiaryName:localStorage.getItem("mtnetwork"),
																	   sendAccount:localStorage.getItem("mtphonenumber"),
																	   sourceAccount:srcacct,
																	   sourceBankCode:srcbankcode,
																	   sourceBankName:srcbankname,
																	   isuservalid:$scope.isuservalid,txauthstat:"yes",pin:$state.params.pin});
									
									}else if(localStorage.getItem("previousstate")=== 'fundstransferstate'){
										$state.go("transferconfirm",{sendAmount:localStorage.getItem("ftamt"),
																	 sendBankName:localStorage.getItem("ftdestbankname"),
																	 sendbankCode:localStorage.getItem("ftdestbankcode"),
																	 sendBeneficiaryName:localStorage.getItem("ftbeneficiaryname"),
																	 sendAccount:localStorage.getItem("ftdestaccount"),
																	 sourceAccount:srcacct,
																	 sourceBankCode:srcbankcode,
																	 sourceBankName:srcbankname,
																 	 
																	isuservalid:$scope.isuservalid,txauthstat:"yes",pin:$scope.loginpassword});
										
									}else if(localStorage.getItem("previousstate")==='paybillsstate'){
										$state.go("paybillsconfirm",{sendAmount:localStorage.getItem("pbamount"),
																	 sendBankName:localStorage.getItem("pbbillername"),
																	 sendBankCode:localStorage.getItem("pbpaymentcode"),
																	 sendBeneficiaryName:localStorage.getItem("pbpaymentitemname"),
																	 sendAccount:localStorage.getItem("pbcustomerid"),
																	 sourceAccount:srcacct,
																	 sourceBankCode:srcbankcode,
																	 sourceBankName:srcbankname,
																	isuservalid:$scope.isuservalid,txauthstat:"yes",pin:$scope.loginpassword});
										
									}else{
										$state.go("accountmanager",{userphone:localStorage.getItem("userphone"),
																			 isuservalid:$scope.isuservalid,
																			 txauthstat:"yes",
																			 pin:$state.params.pin,method:"viewbalance"});

									}
									
								}
								
									
							)
							
						}else{
							swal({title:"",type:"error",text:resp.responsemessage,confirmButtonColor:"#04679B"},function(res){
								$log.info(res);
							})
						}
					})
						 
					 
				 }
				 
				 
				$scope.formInputPin = function(num){
					if(angular.isDefined($scope.carddata.cardpin)){
						var pword = String($scope.carddata.cardpin);//regpassword
					}else{
						var pword = "";
					}
					if(pword.length < 4){
						pword = pword.concat(num);
						$scope.carddata.cardpin= pword;
						$log.info("--===== length  ====--");
						$log.info(pword.length);
						$log.info("--=====  value ====--");
						$log.info(pword);
						$log.info("--===== scope value  ====--");
						$log.info($scope.carddata.cardpin);
					}
					
					
				}
				
				$scope.formDelPin = function(){
					//$log.info($scope.carddata.cardpin);
					var len = $scope.carddata.cardpin.length;
					//$log.info(len)
					//var prev = $scope.carddata.cardpin;
					$scope.carddata.cardpin = $scope.carddata.cardpin.substring(0,$scope.carddata.cardpin.length-1)
				}
				
				$scope.formClearPin = function(){
					$scope.carddata.cardpin="";
					
				}

	
		 
	 
 }) 
 
 
octngapp.controller("mobileTopupController",function($scope,$ionicLoading){
  $scope.pagetitle = "Mobile Top-Up";
});

octngapp.controller("mybenchController", function($scope,$ionicLoading,$log,inboxService,utilService,userService){
		$scope.pagetitle = "My Bench";
		$log.info("the bench controller is activated");
		$scope.recommendmobiletopup = true;
		$scope.recommendfundstransfer = true;
		$scope.recommendbillspayment = true;
	
	
	var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"
	];

		var d = new Date();

	if(angular.isDefined(localStorage.getItem("phonenumber")) && localStorage.getItem("phonenumber").length>=11){
		 $scope.utken = localStorage.getItem("phonenumber");
		$scope.nextmonth = monthNames[d.getMonth()+1];
	}else{
		$scope.utken = "";
	}
		$log.info($scope.utken)
		inboxService.getpendingtxns($scope.utken,function(datareturned){
			var myres = {};
			myres = datareturned;
			$log.info(myres);
			$scope.inboxitems = localStorage.getItem("pendinginbox");
			$scope.inboxtxns = JSON.parse(localStorage.getItem("pendinginboxitems"));
			
			//pendinginboxitems
		});

});


octngapp.controller("accountmanagerController",function($scope,$state,$http,$log,utilService,userService){
	
	var datets = new Date();
	$scope.bankname ="";
	$scope.showaccountbal = true;
	$log.info("check if the user is valid in the scope");
	$log.info($scope.isuservalid);
	$log.info("check if the user is valid in the State");
	$log.info($state.params.isuservalid);
	
	var options = {  
    weekday: "long", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  
	};  

  	$scope.datenow = datets.toLocaleTimeString("en-us", options);  
	$scope.accountlist = [];
	
	if($state.params.isuservalid !== "yes"){
						$log.info("user is invalid retrieve referred from and user phone and redirect to login controller")
						var phone = localStorage.getItem("phonenumber");
						var referredfrom = "account balance check";
						$log.info("Check users status returned invalid");
						$log.info({userphone:phone,previouspage:referredfrom});
						$state.go("login",{userphone:phone,previouspage:referredfrom});
		
	}else if ($state.params.isuservalid ==='yes' && $state.params.txauthstat === 'yes'){
		
		if($state.params.txauthstat === 'yes' && $state.params.method === 'viewbalance'){
			$log.info("proceed to call the proceed to fetch bal");
			var userphone = localStorage.getItem("phonenumber");
			var endpointurl = utilService.getaccountbalanceurl;
			var obj={source:"MOBILE",transid:utilService.currts,sessid:utilService.currts,phonenumber:userphone,
						passcode:$state.params.pin};
			//$scope.loading = true;
			$log.info("Request object for view balance");
			$log.info(obj);
			//switch the view accounts div on 
			
//			$http.post(endpointurl,obj).then(function success(response){
//					if(response.status===200){
//						$scope.loading = false;
//						var responsedata = response.data;
//						if(responsedata.responsecode ==='00'){
//							$scope.accountlist = responsedata.result;
//							//alert(responsedata.responsemessage);
//						}else{
//							$scope.loading = false;
//							$scope.accountlist = [{accountno:"",bankcode:"",bankname:responsedata.responsemessage,currency:"",availbalance:"0.00"}];
//							swal({title:"",text:responsedata.responsemessage,confirmButtonColor:"#04679b",type:"info"});
//						}
//					}
//			},function error(response){
//				$scope.loading = false;
//				$scope.accountlist = [{accountno:"",bankcode:"",bankname:"A Network Error Occured, please contact our helpdesk!",currency:"",availbalance:"0.00"}]
//				//alert("A Network Error Occured!");
//				$log.error(response)
//			});

			
		}else if($state.params.txauthstat === 'yes' && $state.params.method === 'addaccount'){
				$log.info("proceed to call the add account web service");
				var userphone = localStorage.getItem("phonenumber");
				var endpointurl = utilService.addaccounturl;
			
				var bvn = localStorage.getItem("addaccount.mybvn"); var acno = localStorage.getItem("addaccount.myaccount");
			var bankname = localStorage.getItem("addaccount.mybankname"); var bankcode = localStorage.getItem("addaccount.mybankcode");
				var obj={source:"MOBILE",transid:utilService.currts,sessid:utilService.currts,phonenumber:userphone,
							passcode:$state.params.pin,bvn:bvn,acno:acno,bank:bankname,bankcode:bankcode};
				$scope.loading = true;
				$log.info("Request object for add account balance");
				$log.info(obj);
				$http.post(endpointurl,obj).then(function success(response){
						if(response.status===200){
							
							var responsedata =response.data;
							if(responsedata.responsecode ==='00'){
								userService.getaccountbalance(userphone,function(userservicedata){
									$scope.loading = false;
									$log.info("user service data returned from function for get customer balances");
									$log.info(userservicedata);
									//$scope.bankimage = "images/heritage.png";
									$scope.accountlist = userservicedata.result;
									//alert(responsedata.responsemessage);
								});
								
							}else{
								$scope.loading = false;
								$scope.accountlist = [{accountno:"",bankcode:"",bankname:responsedata.responsemessage,currency:"",availbalance:"0.00"}];
								
							}
						}
				},function error(response){
					$scope.loading = false;
					$scope.accountlist = [{accountno:"",bankcode:"",bankname:"A Network Error Occured",currency:"",availbalance:"0.00"}];
					$log.error(response)
				});
			
		}else{
						//route back to login controller to validate user with PIN code
						$log.info( "proceed to process this transaction.... user is valid");
							//show the login password form
							var phone = localStorage.getItem("phonenumber");
							var referredfrom = "account balance check";

							$log.info({userphone:phone,previouspage:referredfrom});
							$state.go("login",{userphone:phone,previouspage:referredfrom});
			
		}
		
	}
	
	
	
	//route back with the user status
	
	//use the routed back components to request a valid pin supplying user phone in the scope
})

//fundstransfer
//$state.go("transferconfirm",{sendAmount:amt,sendBankName:dbnkname,sendbankCode:dbnkcode,sendBeneficiaryName:dbenname,sendAccount:sndacct});
octngapp.controller("addAccountController",function($scope,$state,$http,$log,userService,utilService){
	$scope.pagetitle = "Add Account";
	$scope.myaccountadded = false;
	$scope.addaccount={};
	$scope.addaccount.mybankname = "Select bank";
	$scope.addaccount.myaccount = "";
	$scope.addaccount.myaccountname = "";
	$scope.myaccountvalid = false;
	$scope.getBankFromAccount = function(useraccount){
					var acct = useraccount
					$scope.loading = false;
					if(useraccount !== ""){
						
							$scope.loading = true;
							var endpointurl = utilService.getbankwithaccounturl;
							var obj = {source:"MOBILE",accountnumber:acct};
							//do a http get for the bank
							$log.info(obj);
							$http.post(endpointurl,obj).then(function successCallback(response){
							console.log(response);
						if(response.status === 200){
							$scope.loading = false;
							var responsedata = response.data;
							if(responsedata.responsecode ==="00"){
									
									$scope.banklist = responsedata.result;
								
									$log.info("the returned banks");
									$log.info($scope.banklist);
									if($scope.banklist.length === 0){
										$scope.banklist = [{bankname:"Bank not found",bankcode:"00"}];
									}
										$scope.addaccount.myaccount = obj.accountnumber;
										$scope.addaccount.mybankcode = $scope.banklist.bankcode;
										$scope.addaccount.mybankname = $scope.banklist.bankname;
									}else{
											$scope.loading = false;
											$scope.banklist = [{bankname:"Bank not found",bankcode:"00"}];
									}
							}	
						},function errorCallBack(response){
							$scope.loading = false;
							console.log(response);
								$scope.banklist = {bankname:"Bank not found",bankcode:"00"};
								//user status is invalid 
								$log.info($scope.banklist);
						});
					
					}	
		}
	
	$scope.selectBank = function(myac,mybnkcode,mybnkname){
		$scope.addaccount.mybankcode = mybnkcode;
		$scope.addaccount.mybankname = mybnkname;
		$scope.addaccount.myaccount = myac;
		
		$scope.addaccount.myaccountname = "Olajide Asaolu";
		$scope.myaccountvalid = true;
	}
 	
	$scope.doAddAccountConfirm = function(){
			//set the user login credentials
			var referredfrom = "addaccount";
			var uphone = localStorage.getItem("phonenumber");
			
			localStorage.setItem("addaccount.myaccount",$scope.addaccount.myaccount);
			localStorage.setItem("addaccount.mybankcode",$scope.addaccount.mybankcode);
			localStorage.setItem("addaccount.myaccountname",$scope.addaccount.myaccountname);
			localStorage.setItem("addaccount.mybankname",$scope.addaccount.mybankname);
			localStorage.setItem("addaccount.mybvn",$scope.addaccount.mybvn);
			localStorage.setItem("addaccount.myemail",$scope.addaccount.myemail);
			localStorage.setItem("addaccount.myphone",$scope.addaccount.myphone);
			//go to the login 
			//keep the source account in localStorage and set debit method to account method
			localStorage.setItem("sourceaccount",$scope.addaccount.myaccount);
			localStorage.setItem("sourcebankcode",$scope.addaccount.mybankcode);
			localStorage.setItem("sourcebankname",$scope.addaccount.myaccountname);
			localStorage.setItem("debitmethod","accounttrue");
		
			$state.go("login",{userphone:uphone,previouspage:referredfrom});
	
	}
	
	
})

octngapp.controller("inboxController", function($scope,$log,$http,$state,utilService,userService){
	$scope.pagetitle = "Request Transaction"
	$scope.forminvalid = true;
	$scope.inboxtxndata = {};
	$scope.inboxtxndata = JSON.parse(localStorage.getItem("inboxObject"));
	$scope.showaccount = false; //show my account slider
	$scope.inboxApprove = function(inboxObj){

		if(inboxObj.transcategory === 'fundsrequest'){
				localStorage.setItem("pbpaymentcode",inboxObj.receiverbankcode );
				localStorage.setItem("pbbillerid",inboxObj.receiverbank);
				localStorage.setItem("pbbillername",inboxObj.receivername);
				localStorage.setItem("pbamount",inboxObj.amount);
				localStorage.setItem("pbpaymentitemname",inboxObj.narration);
				localStorage.setItem("pbcustomerid",inboxObj.receiveraccount);
				localStorage.setItem("pbitemfee","0.00");
		}
	
		var pcode = localStorage.getItem("pbpaymentcode");
		var billerid = localStorage.getItem("pbbillerid");
		var amt = localStorage.getItem("pbamount");
		var svcfee = localStorage.getItem("pbitemfee");
		var pitemname = localStorage.getItem("pbpaymentitemname");
		var billername = localStorage.getItem("pbbillername");
		var custid = localStorage.getItem("pbcustomerid");
		var myac = localStorage.getItem("sourceaccount");
		var isuservalid = localStorage.getItem("isuservalid");
		
		var mybnkcode = localStorage.getItem("sourcebankcode");
		var myac = localStorage.getItem("sourceaccount");
		var mybnkname = localStorage.getItem("sourcebankname");
		
		$state.go("paybillsconfirm",{sendAmount:amt,sendBankName:billername,sendBankCode:pcode,sendBeneficiaryName:pitemname,sendAccount:custid,sourceAccount:myac,sourceBankCode:mybnkcode,sourceBankName:mybnkname,isuservalid:isuservalid});
	}
	
	$scope.showmyAccount = function(){
			$scope.showaccount = !$scope.showaccount ;
			 // self.useraccounts = JSON.parse(localStorage.getItem("accounts"));
				$scope.accountlist = JSON.parse(localStorage.getItem("accounts"));
				$log.log($scope.accountlist);
	}
		
		$scope.accountselected = function(accountno,acctbnkcode,acctbnkname){
			$scope.inboxtxndata.senderaccount = accountno;
			$scope.inboxtxndata.senderbankcode = acctbnkcode;
			$scope.inboxtxndata.senderbank = acctbnkname;
			$scope.showaccount = !$scope.showaccount;
			localStorage.setItem("sourceaccount",$scope.inboxtxndata.senderaccount );
			localStorage.setItem("sourcebankcode",$scope.inboxtxndata.senderbankcode);
			localStorage.setItem("sourcebankname",$scope.inboxtxndata.senderbank);
		}
})


octngapp.controller("homeController",function($scope,$state,$log,$http,$cordovaDevice,$ionicPlatform,userService,$cordovaContacts,utilService,inboxService){

//		swal({title:"Success",text:"Login Successfull",type:"info",confirmButtonColor:"#04679B"},function(data){
//			$log.info(data);
//		});
	
		//register all contacts
		$scope.addcardflag = false;
		$scope.getAllContacts = function() {
			var options = {
				filter:'',
				multiple:true,
				fields:['id','name','displayName','phoneNumbers'],
				desiredFields:['id','name','displayName','phoneNumbers']
			}
			var showall = function(){
			console.log("contacts found");
			}
			var showerr = function(){
				console.log("error no contacts");
			}

			$cordovaContacts.find(['id','name','displayName','phoneNumbers']).then(function(foundContacts) 
			{ 
					$scope.contacts = foundContacts;
			})
  		}
		
	$scope.gotodebitcardadd = function(){
			$state.go("adddebitcard");
	}
	$scope.refreshInboxArray = function(){
			$log.info("refresh the inbox array here");
			$scope.inboxitems = localStorage.getItem("pendinginbox");
			$scope.inboxtxns = JSON.parse(localStorage.getItem("pendinginboxitems"));
			
			var utken = localStorage.getItem("phonenumber");
		//$log.info(utken)
		inboxService.getpendingtxns(utken,function(datareturned){
			var myres = {};
			myres = datareturned;
			$log.info(myres);
			$scope.inboxitems = localStorage.getItem("pendinginbox");
			$scope.inboxtxns = JSON.parse(localStorage.getItem("pendinginboxitems"));
			
			//pendinginboxitems
		});
	}
	$scope.gotoaddcard = function(){
			$log.info("Add card link clicked");
			$scope.addcardflag = true;
			//$state.go("addcard");
	}
	$scope.gotopaybills = function(){
		$log.info("clicked for paybills")
		$state.go("paybills");
	}
	$scope.gotoft = function(){
		$log.info("clicked for ft")
		$state.go("transfer");
	}
	$scope.gotomobile = function(){
		$log.info("clicked for mobile")
		$state.go("mobiletopup");
	}
	$scope.gotomybench = function(){
		$log.info("clicked for my bench")
		$state.go("mybench");
	}
	$scope.gotoinbox = function(obj){
		$log.info("view inbox inbox");
		localStorage.setItem("inboxObject",JSON.stringify(obj));
		$state.go("inbox");
	}
	
	$scope.gotoinboxdelete = function(obj){
		$log.info("Inbox transactions to delete");
		$log.info(obj);

		
		swal({title:"Delete!",
			  text:"Are you sure you want to Delete this item?",
			  showCancelButton:true,
			  cancelButtonText: "Cancel!",
			  confirmButtonColor:"#04679B",
		      closeOnConfirm: false,
		      closeOnCancel: false
			 },
			 function(resultflag){
				if(resultflag){
					
						utilService.markinboxdelete(obj.senderid,obj.sno,function(resultdata){
							$log.info(resultdata.responsemessage);
							$log.info(resultdata.responsecode);
							if(resultdata.responsecode==='00'){
								swal({title:"Delete!",text:resultdata.responsemessage,type:"success",confirmButtonColor:"#04679B"});
							}
						})
				}else{
						$log.info(resultflag);
				}
		});
		
		
	}
	
	
	
	$log.info("======================= Fetch Inbox Transactions ===================");
		var utken = localStorage.getItem("phonenumber");
		//$log.info(utken)
		inboxService.getpendingtxns(utken,function(datareturned){
			var myres = {};
			myres = datareturned;
			$log.info(myres);
			$scope.inboxitems = localStorage.getItem("pendinginbox");
			$scope.inboxtxns = JSON.parse(localStorage.getItem("pendinginboxitems"));
			
			//pendinginboxitems
		});

	
	$scope.gotoinboxapprove = function(inboxObj){

		swal({title:"Approve",text:"Are you sure you want to approve this item?",
			 type:"info",
			 showCancelButton:"true", 
			 confirmButtonColor:"#04679B",
			 function(flag){
				if(flag){
						$log.info(" transaction has been queued fro approval");
						if(inboxObj.transcategory === 'fundsrequest'){
							localStorage.setItem("pbpaymentcode",inboxObj.receiverbankcode );
							localStorage.setItem("pbbillerid",inboxObj.receiverbank);
							localStorage.setItem("pbbillername",inboxObj.receivername);
							localStorage.setItem("pbamount",inboxObj.amount);
							localStorage.setItem("pbpaymentitemname",inboxObj.narration);
							localStorage.setItem("pbcustomerid",inboxObj.receiveraccount);
							localStorage.setItem("pbitemfee","0.00");
						}	
			
						var pcode = localStorage.getItem("pbpaymentcode");
						var billerid = localStorage.getItem("pbbillerid");
						var amt = localStorage.getItem("pbamount");
						var svcfee = localStorage.getItem("pbitemfee");
						var pitemname = localStorage.getItem("pbpaymentitemname");
						var billername = localStorage.getItem("pbbillername");
						var custid = localStorage.getItem("pbcustomerid");
						var myac = localStorage.getItem("sourceaccount");
						var isuservalid = localStorage.getItem("isuservalid");

						var mybnkcode = localStorage.getItem("sourcebankcode");
						var myac = localStorage.getItem("sourceaccount");
						var mybnkname = localStorage.getItem("sourcebankname");

					$state.go("paybillsconfirm",{sendAmount:amt,sendBankName:billername,sendBankCode:pcode,sendBeneficiaryName:pitemname,sendAccount:custid,sourceAccount:myac,sourceBankCode:mybnkcode,sourceBankName:mybnkname,isuservalid:isuservalid});

				}else if(!flag){
					$log.info("Transaction not approved");
				}
			}
			 }
	)
}
	
	
	
	
	$log.info("======================= Contact Info =========================")	;	
	$scope.getAllContacts();
	$log.info(JSON.stringify($scope.contacts));

	$log.info("======================  List all Contacts ====================");
	$log.info($cordovaContacts);
	
 	var usertoken = localStorage.getItem("phonenumber");
 	$scope.mobilelinkname = "Mobile Topup";
 	$scope.ftlinkname = "Transfer Money";
 	$scope.paybilllinkname = "Pay Bills";
	userService.checkuser(usertoken,function(fn,vl){
		$scope.userfirstname = localStorage.getItem("firstname");
		$scope.isuservalid = localStorage.getItem("isuservalid");
		$scope.useraccounts = userService.useraccounts;

	});
	
  	$log.log("firstname of signed in user");
	$log.log($scope.userfirstname);
	$log.log("accounts of signed in user");
	$log.log($scope.useraccounts);
	
	$scope.isundefined = function(value){
					return (typeof value === "undefined");
	}
    //do http Post for get customer status
	$scope.gotoAccountListing  = function(){
		$log.info("Accounts Listing Clicked");
		$state.go("accountmanager");
	}
	
	$scope.returnname = function(){
		return  localStorage.getItem("firstname");
	}
	
	$scope.donlpsearch =function(searchterm){
		
		$log.info("doing nlp search");
		$log.info(searchterm);
		$log.info(angular.isUndefined(searchterm));
		var phonenum = localStorage.getItem("phonenumber");
                        //go to the nlp web: service end point and retrieve the next point
        var nlpendpointurl = utilService.langprocessorurl;
        var nlpobject = {source:"MOBILE",inputtext:searchterm,phone:phonenum};
		
		$log.info(nlpendpointurl);
		$log.info(nlpobject);
		
		if(angular.isUndefined(searchterm) || searchterm.length < 5){
			swal({title:"",text:"Please search for valid input!",type:"error",confirmButtonColor:"#04679B"});
		}else{
			$scope.loading = true;
			$http.post(nlpendpointurl,nlpobject).then(function successCallback(response){
                    $log.info(response);
				
                    if(response.status === 200){
						$scope.mobflag = true;
						$scope.loading = false;
                        var responsedata = response.data;
                        $scope.fundstransferscreen = true;
							$log.info(responsedata);
							if(responsedata.response[0].action === 'FundsTransfer'){
								$log.info("Go TO FT");
								var amt = responsedata.response[0].amt;
								var benebank = responsedata.response[0].benebank;
								var benename = responsedata.response[0].benename;
								var beneaccount = responsedata.response[0].beneaccount;
								$state.go("transferconfirm",{sendAmount:amt,sendBankName:benebank,sendBeneficiaryName:benename,sendAccount:beneaccount,isuservalid:$scope.isuservalid});
								
							}else if (responsedata.response[0].action === 'VTU'){
								$log.info("GO TO MOBILE TOPUP");
								var benephone = responsedata.response[0].benephone;
								var amt = responsedata.response[0].amt;
								var benename = responsedata.response[0].benename;
								
								$state.go('mobileconfirm',{sendAmount:amt,sendBankName:benename,sendBankCode:benename,sendBeneficiaryName:benename,sendAccount:benephone,sourceBankCode:"",sourceBankName:"",isuservalid:$scope.isuservalid});
						
							}else{
								$log.info("GO TO BILLS PAYMENT");
								$state.go('paybills');
							}
						
                    }
            },function errorCallBack(response){
				$scope.loadingwhite = false;
				 $log.info(responsedata);
            });
		}
		
		
	}
	
});


octngapp.controller("loadingCtrl",function($scope,$ionicLoading){
	$scope.show = function(){
		$ionicLoading.show({template:'Loading ....',duration:3000}).then(console.log("ionic Loading now shown"));
	}
	
	$scope.hide = function(){
		$ionicLoading.hide().then(console.log("the loading indicator is now hidden"));
	}
});

octngapp.controller("mobiletopupSucess",function($scope,$state,$log){
	$scope.pagetitle = "Transaction processed Successfully!";
	$scope.userfirstname = localStorage.getItem("firstname");
		//= localStorage.getItem("firstname")+ ' ' + localStorage.getItem("lastname");
	
	$scope.gotobench = function(){
				$log.info("redirect .. to bench home transaction..");
				$state.go("mybench");
	}
	$scope.redotransaction = function(){
				$log.info("redirect .. to redo transaction..");
				$state.go("mobiletopup");
	}
	
});


octngapp.controller("mobiletopupFailure", function($scope,$state,$log){
	$scope.pagetitle = "Transaction processing Failed";
	$scope.gotobench = function(){
				$log.info("redirect .. to bench home transaction..");
				$state.go("mybench");
	}
});






