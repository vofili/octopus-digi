// JavaScript Document
angular.module('octngapp.ftcontroller',[])
//*******************    Funds Transfer ******************************* Controller
octngapp.controller("sendMoneyController",function($scope,$http,$state,$log){
  $scope.pagetitle = "Send/Request Money";
	$scope.transferdata = {};
	$scope.transferdata.destbankname="Select Bank";
	$scope.transferdata.destbankcode="";
	$scope.transferdata.showbanklist = false;
	$scope.beneficiaryvalid = false;
	$scope.transferdata.destbeneficiaryname = "";
	$scope.transferdata.myaccountno = "";
	$scope.transferdata.bankcode = "";
	$scope.transferdata.bankname = "";
	$scope.transferdata.narration = "";
	$scope.accountlist ="";
	$scope.showaccount = false;
	$log.info($scope.transferdata.destaccount);
	
	
		$scope.getNameFromAccount = function(ac,bankname,bankcode){
			$scope.loading = true;
			var obj = {
				 source:"MOBILE",
				 transid:"4110909813345677567587",
				 sessid:"4110909813345677567587",
				 phonenumber:"07038901111",
				 accountno:ac,
				 bankcode:bankcode,
				 bankname:bankname
			};
			
			var endpointurl ="http://35.164.119.185:8080/qucoontm/operations/getnamewithaccount";
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
	
		$scope.showmyAccount = function(){
			$scope.showaccount = !$scope.showaccount ;
			 // self.useraccounts = JSON.parse(localStorage.getItem("accounts"));
				$scope.accountlist = JSON.parse(localStorage.getItem("accounts"));
				$log.log($scope.accountlist);
		}
		
		$scope.accountselected = function(accountno,acctbnkcode,acctbnkname){
			$scope.transferdata.myaccountno = accountno;
			$scope.transferdata.bankcode = acctbnkcode;
			$scope.transferdata.bankname = acctbnkname;
			$scope.showaccount = !$scope.showaccount;
		
		}
		
		$scope.getBankFromAccount = function(useraccount){
					var acct = useraccount
					$scope.loading = false;
					if(useraccount !== ""){
						
							$scope.loading = true;
							var endpointurl = "http://35.164.119.185:8080/qucoontm/operations/getbankwithaccount"
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

