angular.module('octngapp.paybillsctrl',['octngapp.services'])

	.controller("payBillsController",function($scope,$state,$log,$http,$ionicPlatform,utilService){
  	$scope.pagetitle = "Pay Bills";
	$scope.paybills={};
	
	$scope.showbillercategory = false;
	$scope.paybills.myaccountno = "";
	$scope.paybills.bankcode = "";
	$scope.paybills.bankname = "";
	$scope.paybills.customerid =  "";
	$scope.paybills.amount = "";
	$scope.billerlist = [];
	$scope.forminvalid = true;
	$scope.showloaderimg = false;
	$scope.billerundercategory  = [];
	$scope.varbillersect="";
	$scope.showbillerservices = false;
	$scope.categorydetail = false;
	
	$scope.paybills.customername = "";
	$scope.beneficiaryvalid = false;
	$scope.gotohome = function(){
			$state.go("mybench");
	}
	$scope.toggleshowbiller = function(){
			var endpointurl = utilService.billercategorysurl;
			var obj = {
			source:"MOBILE",
			transid:utilService.currts,
			sessid:utilService.currts,
			phonenumber:"07038901111"
			};
		$scope.showbillercategory = true;
		$scope.loading = true;
		$http.post(endpointurl,obj).then(function success(response){
			if(response.status === 200){
				$scope.loading = false;
				var responsedata = response.data;
				if(responsedata.responsecode === "00"){
					$log.info(responsedata);
					$scope.billerlist = responsedata.result;
				}else{
					$log.error(responsedata);
					swal({title:"",type:"error",text:responsedata.responsemessage,confirmButtonColor: "#04679b"});
					
				}
			}else{
				$scope.billerlist =[{billerid:"could not retrieve biller"},{billername:"could not retrieve biller"}];
			}
		},function error(response){
			$scope.loading = false;
			log.error("Error occurred while retrieving data from billercategorysurl");
			$log.error(error);
			swal({title:"",type:"error",text:"Could not get biller categories!",confirmButtonColor: "#04679b"});
			
		});
		
			//categorydetail
	}
	
	$scope.billercategoryselect = function(categoryid,catname){
		$scope.showbillercategory = false;
		$scope.categorydetail = true;
		$scope.billercatselected = catname;	
		var obj = {
			source:"MOBILE",
			transid:utilService.currts,
			sessid:utilService.currts,
			phonenumber:"07038901111",
			categoryid:categoryid
			};
		$scope.loading = true;
		var endpointurl = utilService.billerlistwithcategoryidurl;
		$http.post(endpointurl,obj).then(function success(response){
				if(response.status === 200){
					$scope.loading = false;
					var responsedata = response.data;
					if(responsedata.responsecode === '00'){
							$scope.billerundercategory = responsedata.result;
							
					}else{
						$log.info(response.responsemessage);
					}
				}
		},function error(response){
			$scope.loading = false;
			$log.error(response);
		});
	
	}
	
	$scope.selectbillerfromcategory = function(billproviderobject){
		$scope.billername = billproviderobject.billername;
		$scope.categorydetail = false;
		localStorage.setItem("pbbillerid",billproviderobject.billerid);
		localStorage.setItem("pbbillername",billproviderobject.billername);
		$scope.billerprovname = billproviderobject.billername;
		$scope.billcatknown = true;
		$scope.svcfeeflag = false;    //reset the service fee flag if biller is changed
		$scope.customeridlabel = billproviderobject.field1;
		localStorage.setItem("pbcustomeridlabel",$scope.customeridlabel);
	}
	$scope.servicesarray = [];
	$scope.showbillersvc = function(){
		$scope.showbillerservices = true;
		
		var retrievedbillerid = localStorage.getItem("pbbillerid");
		var epurl = utilService.paymentitemswithbilleridurl;
			var obj = {
			source:"MOBILE",
			transid:utilService.currts,
			sessid:utilService.currts,
			phonenumber:"07038901111",
			billerid:retrievedbillerid
			}
		$log.info(epurl);
		$scope.loading =true;
		$http.post(epurl,obj).then(function success(response){
				if(response.status === 200){
					$scope.loading = false;
					var responsedata = response.data;
					if(responsedata.responsecode ==='00'){
						$log.info(responsedata);
						$scope.servicesarray = responsedata.result;
					}else{
						$log.error(responsedata);
					}
				}
		},function error(response){
			$scope.loading = false;
			$log.error(response);
		});
	}
	$scope.prodcode = "";
	$scope.custidchanges = function(modeldata){
		$scope.paybills.custidchanged = modeldata;
		$scope.forminvalid = false;
		$log.info($scope.paybills.customerid);
		
		localStorage.setItem("pbcustomerid",$scope.paybills.customerid);
	}
	$scope.selectbillerservice = function(svcobj){
		$log.info(svcobj);
		$scope.showbillerservices = false;
		$scope.prodcode = svcobj.paymentitemname;
			//..svcobj.billername+' '+svcobj.paymentitemname+' '+svcobj.paymentcode;
	
		
		//set the amount and fee properties
		if(svcobj.isamountfixed === "true"){
			$scope.fixedfeeflag = true;
			var amt = parseFloat(svcobj.amount)/100;
			$scope.paybills.amount = amt;
			$log.info("amount of svc is fixed");
		}else{
			$scope.fixedfeeflag = false;
			$scope.paybills.amount = 0.00;
				$log.info("amount of svc is variable");
		}
		
		if(svcobj.itemfee === "0"){
			$scope.svcfeeflag = false;
		}else{
			//check this snippet can return possible NaN error
			$scope.svcfeeflag = true;
			var fee = parseFloat((parseFloat(svcobj.itemfee)/100)).toFixed(2);
			$scope.svcfee = fee;
		}
		
		localStorage.setItem("pbpaymentcode",svcobj.paymentcode);
		localStorage.setItem("pbbillerid",svcobj.billerid);
		localStorage.setItem("pbamount",$scope.paybills.amount);
		localStorage.setItem("pbitemfee",$scope.svcfee);
		localStorage.setItem("pbpaymentitemname", svcobj.paymentitemname);
		localStorage.setItem("pbbillername",svcobj.billername);
		localStorage.setItem("pbcustomerid",localStorage.getItem("pbcustomerid"));
		
		
		$log.info("Information collected "+ svcobj.paymentcode+"/"+svcobj.paymentitemname+"/"+localStorage.getItem("pbcustomerid")+"/"+svcobj.billername +"/"+$scope.paybills.bankcode+"/"+$scope.paybills.myaccountno+"/"+$scope.paybills.amount);
		
	}
	
	
	$scope.gotopbconfirm = function(){
//		//:sendAmount/:sendBankName/:sendBankCode/:sendBeneficiaryName/:sendAccount/:sourceAccount/:sourceBankCode/:sourceBankName/:isuservalid/:u//serfirstname/:txauthstat/:pin
		
		var pcode = localStorage.getItem("pbpaymentcode");
		var billerid = localStorage.getItem("pbbillerid");
		var amt = localStorage.getItem("pbamount");
		var svcfee = localStorage.getItem("pbitemfee");
		var pitemname = localStorage.getItem("pbpaymentitemname");
		var billername = localStorage.getItem("pbbillername");
		var custid = localStorage.getItem("pbcustomerid");
		var myac = localStorage.getItem("sourceaccount");
		var isuservalid = localStorage.getItem("isuservalid");
		$state.go("paybillsconfirm",{sendAmount:amt,sendBankName:billername,sendBankCode:pcode,sendBeneficiaryName:pitemname,sendAccount:custid,sourceAccount:myac,sourceBankCode:"",sourceBankCode:"",sourceBankName:"",isuservalid:isuservalid});
												   
	}
	
})
.controller("payBillsConfirmController",function($scope,$state,$log,$http,userService,utilService){
			
				if($state.params.txauthstat){
					$scope.pbaction = "DO IT"
				}else{
						$scope.pbaction = "CONFIRM"
				}
	
				$log.info("Paybills Confirm controller ... check the state object");
				$log.info($state);
				$scope.pbconfirm = {};
				$scope.showpassword = false;

				$scope.pbconfirm.amt = localStorage.getItem("pbamount");
				$scope.pbconfirm.billername = localStorage.getItem("pbbillername");
				$scope.pbconfirm.payitemname = localStorage.getItem("pbpaymentitemname");
				$scope.pbconfirm.payitemcode = localStorage.getItem("pbpaymentcode");
				$scope.pbconfirm.customerid = localStorage.getItem("pbcustomerid");
				localStorage.getItem("sourcecardname");
				$log.info("value of my account no ");
				$log.info(localStorage.getItem("sourceaccount"));
			var debitmethod = localStorage.getItem("debitmethod");
	
				$log.info("check user validity in paybills controlerr - state params");
				$log.info($state.params.isuservalid);
				$log.info($scope.pbconfirm.myaccountno);
			
				$scope.isuservalid = $state.params.isuservalid;
				$log.info("check user validity in mobile controlerr - scope params");
				$log.info($scope.isuservalid);
	
				$log.info("State Params defined... ");
				$log.info($state.params.userfirstname);
	
				$scope.doit = function(){
					if($scope.isuservalid === "no"){
						var phone = localStorage.getItem("phonenumber");
						var referredfrom = "paybills";
						
						
						$scope.pbconfirm.amt = localStorage.getItem("pbamount");
						$scope.pbconfirm.billername = localStorage.getItem("pbbillername");
						$scope.pbconfirm.payitemname = localStorage.getItem("pbpaymentitemname");
						$scope.pbconfirm.payitemcode = localStorage.getItem("pbpaymentcode");
						$scope.pbconfirm.customerid = localStorage.getItem("pbcustomerid");
						$scope.pbconfirm.myaccountno = localStorage.getItem("sourceaccount");


						$log.info("Request object from PayBills Form: "+ $state.params.sourceAccount+"/"+$state.params.sendAccount);
						$log.info("check user validity in paybills controlerr - state params");
						$log.info($state.params.isuservalid);
						$log.info($scope.pbconfirm.myaccountno);

						$scope.isuservalid = $state.params.isuservalid;
						$log.info("check user validity in mobile controlerr - scope params");
						$log.info($scope.isuservalid);

						$log.info("State Params defined... ");
						$log.info($state.params.userfirstname);
						
						
						$log.info({userphone:phone,previouspage:referredfrom});
						$state.go("login",{userphone:phone,previouspage:referredfrom});
					
					}else{
							
						if($state.params.txauthstat === 'yes'){
							//retrieve the params for the pending bills payment 
								$log.info("retrieve items for the bill payments");	
								$log.info("user is valid check the txauthstat");
							var userphone = localStorage.getItem("phonenumber");
							var paymentcode = $state.params.sendBankCode;
							var paymentitemname = $state.params.sendBeneficiaryName;
							var billername = $state.params.sendBankName;
							var custid = $state.params.sendAccount;
							var srcacct = localStorage.getItem("sourceaccount");
							var srcbnkcode = localStorage.getItem("sourcebankcode");
							var srccid = localStorage.getItem("sourcecid");
							var srccardname = localStorage.getItem("sourcecardname");
							//var srcacct = $state.params.sourceAccount;
							//var srcbnkcode = $state.params.sourceBankCode;
							var narr = "PAY "+billername+"-"+paymentitemname+" FOR "+ custid
							var amt = $state.params.sendAmount; 
								
							
							//go to the debit -credit service
							$log.info("go to the debit credit function");	
							
							if(debitmethod==='cardtrue'){
								// debit method is card hence call card based Dr Cr function
								var obj = {
							source:"MOBILE", transid:utilService.currts, sessid:utilService.currts, phonenumber:userphone, accountstat:"false",
							debitaccount:srcacct, debitbank:srcbnkcode, customerid:custid, paymentcode:paymentcode,  cardstat:"true",
							cid:srccid,  amount:amt,  narration:narr,  passcode:$state.params.pin};
								var epurl=utilService.sendbilladviceurl;
								$scope.loading = true;
								$log.info(obj);
								$http.post(epurl,obj).then(function success(response){
									$scope.loading = false;
									var responsedata = response.data;
									$log.info("Successfull pay bills proceed to otp validation");
									$log.info(response);
									swal({title:"",text:responsedata.responsemessage,type:"input",confirmButtonColor: "#04679b",inputPlaceholder: "Enter OTP"},
										 function(value){
											$log.info("the otp validation function turned on");
											$log.info(value);
										var txurl = utilService.transactionvalidateurl;
									
										var obj = {
 source:"MOBILE", transid:utilService.currts, sessid:utilService.currts, phonenumber:userphone,customerid:custid, paymentcode:paymentcode,  cardstat:"true",  cid:srccid,amount:amt, narration:narr, passcode:$state.params.pin,otp:value,cardname:srccardname,transtype:"bp",transref:"",creditaccount:"",creditbank:""};
										$log.info("token validation request object");
										$log.info(obj);
											$http.post(txurl,obj).then(function success(response){
												var data = response.data;
												
											if(data.responsecode === '00'){
												swal({title:"",text:data.responsemessage,type:"success",confirmButtonColor:"#04679B"},function(flag){
													$state.go("mobiletopupsucess");

												});
											}else{
												swal({title:"",text:data.responsemessage,type:"error",confirmButtonColor:"#04679B"},
													function(flag){
													$state.go("mobiletopupfailure");
												});
											}	
									},function error(response){
											$scope.loading = false;
											$log.info("error on debit account do not validate otp");
												 $log.info(response);
												swal({title:"",text:response,type:"error",confirmButtonColor:"#04679B"});
											
									});
								
							})
								},function err(err){
									
								})
							}
								else if (debitmethod === 'accounttrue'){
								$scope.loading = true;
								
							var epurl=utilService.sendbilladviceurl;
							var obj = {
							source:"MOBILE", transid:utilService.currts, sessid:utilService.currts, phonenumber:userphone, accountstat:"true",
							debitaccount:srcacct, debitbank:srcbnkcode, customerid:custid, paymentcode:paymentcode,  cardstat:"false",
							cid:"",  amount:amt,  narration:narr,  passcode:$state.params.pin};
							$log.info("Request Object for Bill Payments");
							$log.info(obj);
							$scope.loading = true;
							$http.post(epurl,obj).then(function success(response){
							$log.info(response);
								if(response.status === 200){
									$scope.loading = false;
									var responsedata = response.data;

									if(responsedata.responsecode ==="00"){
										$log.info(responsedata.responsemessage);
										//save beneficiary
										  utilService.savebeneficiary(userphone,custid,paymentcode,paymentitemname,billername,"","BILL PAY");
										swal({title:"",type:"success",text:responsedata.responsemessage,confirmButtonColor: "#04679b"});
										//navigate to success page;
										$state.go("mobiletopupsucess");
									}else{
										$log.info(responsedata);
										swal({title:"",type:"error",text:responsedata.responsemessage,confirmButtonColor: "#04679b"});
										$state.go("mobiletopupfailure");
									}
								}

						},function error(response){
							$log.error(response);
							
						});	
					
					}
						
					}else{
						$log.info( "proceed to process this transaction.... user is valid:  show the login screen");
							//show the login password 
						
							var phone = localStorage.getItem("phonenumber");
							var referredfrom = "paybills";
							$log.info("user should have been authenticated so source account and source bank comes in state params");

							$log.info({userphone:phone,previouspage:referredfrom});
							$state.go("login",{userphone:phone,previouspage:referredfrom});
					}
				
				}
		}//end function
})
