// JavaScript Document
angular.module('octngapp.ftcontroller',['octngapp.services'])
//*******************    Funds Transfer ******************************* Controller
octngapp.controller("sendMoneyController",function($scope,$http,$state,$log,userService,utilService){
  $scope.pagetitle = "Send/Request Money";
	$scope.transferdata = {};
	$scope.transferdata.destbankname="Select Bank";
	$scope.transferdata.destbankcode="";
	$scope.transferdata.showbanklist = false;
	$scope.beneficiaryvalid = false;
	$scope.selectbeneficiary = false;
	$scope.disablesend = true;
	$scope.transferdata.destbeneficiaryname = "";
	$scope.transferdata.myaccountno = "";
	$scope.transferdata.bankcode = "";
	$scope.transferdata.bankname = "";
	$scope.transferdata.narration = "";
	$scope.accountlist ="";
	
	$log.info($scope.transferdata.destaccount);
	
		var phonenumber = localStorage.getItem("phonenumber");
			userService.checkuser(phonenumber,function(fn,vl){
			$scope.isuservalid = vl;
			$scope.userfirstname = fn;
			$log.info("user session valid or not");
			$log.info($scope.isuservalid);
			$log.info($scope.userfirstname);
		});
	
		$scope.getNameFromAccount = function(ac,bankname,bankcode){
			$scope.loading = true;
			var obj = {
				 source:"MOBILE",
				 transid:utilService.currts,
				 sessid:utilService.currts,
				 phonenumber:"07038901111",
				 accountno:ac,
				 bankcode:bankcode,
				 bankname:bankname
			};
			
			var endpointurl = utilService.getnamewithaccounturl;
			$log.info("Request to endpoint");
			$log.info(endpointurl);
			$log.info(obj);
			
			$http.post(endpointurl,obj).then(function successCallback(response){
				if(response.status === 200){
							$scope.loading = false;
							var responsedata = response.data
							if(responsedata.responsecode ==="00"){
								$log.info(responsedata);
								$scope.beneficiaryvalid = true;
								$scope.disablesend = false;
								$scope.transferdata.destbeneficiaryname = responsedata.accountname;
							}else{
								$log.info(responsedata);
							}
					
				}
			},function errorCallback(response){
				$log.info(response);
				$scope.loading = false;
			});
		}
	
		$scope.gotohome = function(){
				$log.info("Canceling .. top up transaction..");
				$state.go("mybench");
		}
		
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
								$scope.transferdata.destaccount = obj.accountnumber;
								$scope.transferdata.destbankcode = $scope.banklist.bankcode;
								$scope.transferdata.destbankname = $scope.banklist.bankname;
							}else{
									$scope.loading = false;
									$scope.banklist = [{bankname:"Bank not found",bankcode:"00"}];
								//user status is invalid 
								$log.info($scope.banklist);
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
	
		$scope.showbeneficiary = function(){
				$scope.selectbeneficiary = true;
			$scope.loading = true;
			var usrphn = localStorage.getItem("phonenumber");
				utilService.fetchbeneficiary(usrphn,"FUNDS TRANSFER", function(resp){
					$log.info(resp);
					if(resp.status === 200){
						if(resp.data.responsecode === '00'){
							if(resp.data.result.length > 0){
								$scope.fetchbenelist = resp.data.result;
								$scope.loading = false;
								$scope.beneficiaryvalid = true;//display the beneficiary in the name enquiry field
							}else{
							$scope.fetchbenelist = [{benebankcode:"000",beneaccount:"",benename:"No beneficiaries",benebank:""}]
							$scope.loading = false;
							$scope.beneficiaryvalid = true;
							}
						}else{
							$scope.fetchbenelist = [{benebankcode:"000",beneaccount:"",benename:"An Error Occured",benebank:""}]
						}
						
					}
					
				})
		}
		
		
		$scope.pickbeneficiary = function(acno,acname,bankno,bankname){
			$scope.selectbeneficiary = false;
			$scope.disablesend = false;
			$scope.beneficiaryvalid = true;
			$scope.transferdata.destbeneficiaryname = acname;
			$scope.transferdata.destbankname = bankname;
				
								$scope.transferdata.destbankcode = bankno;
								
			$scope.transferdata.destaccount = acno;
			$scope.transferdata.bankcode = bankno;
			
		}
		
		$scope.gotoFundsTransferConfirm = function(amt,dbnkname,dbnkcode,dbenname,sndacct){
			//:sendAmount/:sendBankName/:sendBankCode/:sendBeneficiaryName/:sourceAccount/:sourceBankCode
			localStorage.setItem("ftnarration",$scope.transferdata.narration);
			$log.info(" log the info passed to Funds Transfer Confirm state State");
			$log.info(
			{sendAmount:amt,sendBankName:dbnkname,sendBankCode:dbnkcode,sendBeneficiaryName:dbenname,sendAccount:sndacct,sourceBankCode:$scope.transferdata.bankcode,sourceAccount:$scope.transferdata.myaccountno,sourceBankName:$scope.transferdata.bankname,isuservalid:$scope.isuservalid});
			$state.go("transferconfirm",{sendAmount:amt,sendBankName:dbnkname,sendBankCode:dbnkcode,sendBeneficiaryName:dbenname,sendAccount:sndacct,sourceBankCode:$scope.transferdata.bankcode,sourceAccount:$scope.transferdata.myaccountno,sourceBankName:$scope.transferdata.bankname,isuservalid:$scope.isuservalid});
			
			/* url:'/transferconfirm/:sendAmount/:sendBankName/:sendBankCode/:sendBeneficiaryName/:sendAccount/:sourceAccount/:sourceBankCode/:sourceBankName/:isuservalid/:userfirstname/:txauthstat',
			$state.go('mobileconfirm',{sendAmount:self.amt,sendBankName:self.ntwork,sendBankCode:self.ntwork,sendBeneficiaryName:self.ntwork,sendAccount:self.phn,sourceBankCode:self.accountbank,sourceAccount:self.account,sourceBankName:"",isuservalid:$scope.isuservalid});
			*/
		}
});


octngapp.controller("sendMoneyConfirmController",function($scope,$http,$log,$state,utilService,userService){
		$log.info("Funds transfer controller... the state object");
		$log.info($state);
			if($state.params.txauthstat){
					$scope.ftaction = "DO IT"
			}else{
					$scope.ftaction = "CONFIRM"
			}
	
		$scope.sendaccount = $state.params.sendAccount;
		$scope.sendamount = $state.params.sendAmount;
		$scope.benename = $state.params.sendBeneficiaryName;
		$scope.benebankname = $state.params.sendBankName;
		$scope.benebankcode = $state.params.sendBankCode;

		$scope.userfirstname = localStorage.getItem("firstname");
		$scope.isuservalid = $state.params.isuservalid;
		var phone = localStorage.getItem("phonenumber");
		var referredfrom = "fundstransfer";
		var debitmethod = localStorage.getItem("debitmethod");
	var sourcecid = localStorage.getItem("sourcecid");
	var sourcecardname = localStorage.getItem("sourcecardname");
	$scope.doFundsTransfer = function(){
		
		if($scope.isuservalid === "no"){
			
				var phone = localStorage.getItem("phonenumber");
				var referredfrom = "fundstransfer";
				
				localStorage.setItem("ftamt",$scope.sendamount);
				localStorage.setItem("ftdestbankname",$scope.benebankname);
				localStorage.setItem("ftbeneficiaryname",$scope.benename);
				localStorage.setItem("ftdestbankcode",$scope.benebankcode);
				localStorage.setItem("ftdestaccount",$scope.sendaccount);

				localStorage.setItem("sourceaccount",$state.params.sourceAccount);
				localStorage.setItem("sourcebankcode",$state.params.sourceBankCode);
				localStorage.setItem("sourcebankname",$state.params.sourceBankName);

			
				$log.info({userphone:phone,previouspage:referredfrom});
				$state.go("login",{userphone:phone,previouspage:referredfrom});
		   
		   }else{
			   
			   if($state.params.txauthstat === "yes"){
				   	$log.info(" transfer has been authorized proceed to transfer");
				   var narr = "FUND TRSF "+localStorage.getItem("ftnarration");
				   
					var endpointurl =utilService.fundstransferurl;
					var obj = {source:"MOBILE",transid:utilService.currts,sessid:utilService.currts,
					  phonenumber:localStorage.getItem("phonenumber"),accountstat:"true",debitaccount:localStorage.getItem("sourceaccount"),
					  debitbank:localStorage.getItem("sourcebankcode"),creditaccount:localStorage.getItem("ftdestaccount"),creditbank:localStorage.getItem("ftdestbankcode"),
					  cardstat:"false",cid:"",amount:localStorage.getItem("ftamt"),narration:narr,passcode:$state.params.pin};
				   
				   if(debitmethod ==='accounttrue'){
					   
					   var obj = {source:"MOBILE",transid:utilService.currts,sessid:utilService.currts,
					  phonenumber:localStorage.getItem("phonenumber"),accountstat:"true",debitaccount:localStorage.getItem("sourceaccount"),
					  debitbank:localStorage.getItem("sourcebankcode"),creditaccount:localStorage.getItem("ftdestaccount"),creditbank:localStorage.getItem("ftdestbankcode"),
					  cardstat:"false",cid:"",amount:localStorage.getItem("ftamt"),narration:narr,passcode:$state.params.pin,authorization:localStorage.getItem('authorization')};
					   
					    $log.info(" the Ft request object");
				   $log.info(obj);
				   $scope.loading = true;
				   $http.post(endpointurl,obj).then(function successCallback(response){
					   $log.info(response);
					   
					   var responsedata = response.data;
					   if(response.status===200){
						   $scope.loading = false;
						   $log.info("Response to FT transfer");
						   $log.info(responsedata.responsecode)
						   if(responsedata.responsecode ==="00"){
							   $log.info("Save beneficiary");
							   utilService.savebeneficiary(localStorage.getItem("phonenumber"),localStorage.getItem("ftdestaccount"),localStorage.getItem("ftdestbankcode"),localStorage.getItem("ftdestbankname"),localStorage.getItem("ftbeneficiaryname"),"","FUNDS TRANSFER");
							   swal({title:"",type:"success",text:responsedata.responsemessage,confirmButtonColor: "#04679b"},function(){
								   $log.info("Navigate to success page");
							   		$state.go("mobiletopupsucess");
							   });
							   
						   }else{
							   $scope.loading = false;
							   swal({title:"",type:"error",text:responsedata.responsemessage,confirmButtonColor: "#04679b"},function(){
								     $state.go("mobiletopupfailure");
							   });
							
							 
						   }
						   
					   }
				   },function errorCallback(response){
					   $log.info(response);
				   });
				}else if(debitmethod === 'cardtrue'){
					$scope.loading = true;
					$log.info("card debit detected perform intitial debit call and await token");
						var endpointurl =utilService.fundstransferurl;
						var obj = {source:"MOBILE",transid:utilService.currts,sessid:utilService.currts,
					  phonenumber:localStorage.getItem("phonenumber"),accountstat:"false",debitaccount:"",
					  debitbank:"",creditaccount:localStorage.getItem("ftdestaccount"),creditbank:localStorage.getItem("ftdestbankcode"),
					  cardstat:"true",cid:sourcecid,amount:localStorage.getItem("ftamt"),narration:narr,passcode:$state.params.pin,authorization:localStorage.getItem('authorization')};
				$log.info("Initial fund transfer request object");
				$log.info(obj);
				$http.post(endpointurl,obj).then(function successhandler(response){
						var resultdata = response.data;
						$scope.loading=false;
						$log.info("the returned result fro initial debit and creditf for FT");
						$log.info(resultdata);
						if(resultdata.responsecode === '00'|| resultdata.responsecode === '33'){
							swal({title:"",text:resultdata.responsemessage,type:"input",confirmButtonColor:"#04679b"},function(flag){
								$log.info(flag);
								if(flag){
									//OTP entered proceed to process transaction
									$scope.loading=true;
										var obj = {source:"MOBILE",transid:utilService.currts,sessid:utilService.currts,
					  phonenumber:localStorage.getItem("phonenumber"),accountstat:"false",customerid:"",
					  debitbank:"",creditaccount:localStorage.getItem("ftdestaccount"),creditbank:localStorage.getItem("ftdestbankcode"),
					transactionref:resultdata.transref,transtype:"ft",paymentcode:localStorage.getItem("ftdestaccount"),
												   transref:resultdata.transref,cardname:sourcecardname,  cardstat:"true",cid:sourcecid,otp:flag,amount:localStorage.getItem("ftamt"),narration:narr,passcode:$state.params.pin,authorization:localStorage.getItem('authorization')};
				   
									var epurl = utilService.transactionvalidateurl;
									$log.info("the token authentication service call - request object");
									$log.info(obj);
									$http.post(epurl,obj).then(function success(res){
										$scope.loading=false;
										$log.info(res)
										var resdata = res.data;
										if(resdata.responsecode==='00')
										{
													swal({title:"",type:"success",text:resdata.responsemessage,confirmButtonColor:"#04679b"},function(flagres){
														$state.go("mobiletopupsuccess");
													})
										}else{
											swal({title:"",type:"error",text:resdata.responsemessage});
										}
										
									},function error(response){
										$log.info(response)
									})
								}
							})
						}else{
							swal({title:"",text:resultdata.responsecode,type:"error",confirmButtonColor:"#04679b"});					
						}
					},function errorhandler(response){
						$log.info("initial card debit failure")
						swal({title:"",text:response,type:"error",confirmButtonColor:"#04679b"});
						
					});
				}
				  
			  }else{
				   		var phone = localStorage.getItem("phonenumber");
						var referredfrom = "fundstransfer";
						localStorage.setItem("ftamt",$scope.sendamount);
						localStorage.setItem("ftdestbankname",$scope.benebankname);
						localStorage.setItem("ftbeneficiaryname",$scope.benename);
						localStorage.setItem("ftdestbankcode",$scope.benebankcode);
						localStorage.setItem("ftdestaccount",$scope.sendaccount);

						localStorage.setItem("sourceaccount",$state.params.sourceAccount);
						localStorage.setItem("sourcebankcode",$state.params.sourceBankCode);
						localStorage.setItem("sourcebankname",$state.params.sourceBankName);

						$log.info({userphone:phone,previouspage:referredfrom});
						$state.go("login",{userphone:phone,previouspage:referredfrom});
				   
			   }
			   
			   
		   }
		
		
		
	}
});


