// JavaScript Document
angular.module('saveController',['octngapp.services'])

octngapp.controller('saveController',function($scope,$state,$log,utilService,$http,userService){
	
	
	$log.info("the data in the state collection");
	$log.info($state);
					if($state.params.txauthstat === 'yes'){
							//go to the debit -credit service
							
							$log.info("proceed to process this transactions by going to the save transaction endpoint");
							
							var userphone = localStorage.getItem("phonenumber");
							var paymentcode = localStorage.getItem("mtpaymentcode");
							var custid = localStorage.getItem("mtphonenumber");
							var srcacct = localStorage.getItem("sourceaccount");
							var srcbnkcode = localStorage.getItem("sourcebankcode");
							var narr = localStorage.getItem("mtnetwork");
							var amt = localStorage.getItem("mtamt");
							var cid = localStorage.getItem("sourcecid");
							var cardname = localStorage.getItem("sourcecardname")
							var fname = localStorage.getItem("firstname");
							var lname = localStorage.getItem("lastname");
							var fullname = fname +" "+lname;
							var epurl=utilService.fundsrequesturl;
							var srcbnkname = localStorage.getItem("sourcebankname");
						
						var obj = {
    								source:"MOBILE",
    								accountno:"",
									sessid:utilService.currts,
									transid:utilService.currts,
									receiverid:userphone,
									receivername:userphone,
									receiveraccount:srcacct,
									receiverbank:"srcbnkcode",
									receiverbankcode:srcbnkcode,
									customerid:custid,
									paymentcode:paymentcode,
									billername:"",
									billerid:"",
									categoryname:"",
									categoryid:"",
									senderid:userphone,
									sendername:fullname,
									senderaccount:srcacct,
									senderbank:srcbnkcode,
									senderbankcode:srcbnkcode,
									amount:amt,
									transtype:"bp",
									transcategory:"savedtransaction",
									narration:narr};
						
						var epurl = utilService.fundsrequesturl;
						$http.post(epurl,obj).then(function successcallback(response){
							if(response.data.responsecode==='00'){
								swal({title:"",type:"success",text:"Transaction saved to Inbox",confirmButtonColor:"#04639b"});
							}else{
								swal({title:"",type:"success",text:response.data.responsemessage,confirmButtonColor:"#04639b"});
							}
							
						},function errorcallback(response){
							swal({title:"",type:"error",text:response,confirmButtonColor:"#04639b"})
						});
							
								
					}
	
	$log.info("starting the save transaction controller");
	
	$scope.payitemtitle = "Save Transaction"
	
	$scope.payitemtitle = "Phone";
	
	$scope.savetopup = {};
	
	$scope.savetopup.amount = $state.params.amount;
	$scope.savetopup.phone = $state.params.phone;
	$scope.savetopup.network = $state.params.network;
	$scope.savetopup.narrative = $state.params.narration+" "+$state.params.phone+" "+$state.params.amount;
	$scope.savetopup.account = $state.params.account;
	
	$scope.dosave = function(saveobj){
		$log.info(saveobj.amount+"/"+saveobj.network+"/"+saveobj.phone+"/"+saveobj.narrative+"/"+saveobj.phone)
		
		
		if($scope.isuservalid === "no"){
						var phone = localStorage.getItem("phonenumber");
						var referredfrom = "savemobiletopup";
						localStorage.setItem("mtamt",saveobj.amount);
						localStorage.setItem("mtnetwork",saveobj.network);
						localStorage.setItem("mtphonenumber",saveobj.phone);
							localStorage.setItem("mtpaymentcode",saveobj.paymentcode);
						$log.info({userphone:phone,previouspage:referredfrom});
						$state.go("login",{userphone:phone,previouspage:referredfrom});
		}else{
							$log.info( "proceed to authenticate this user.... userid is valid");
							//show the login password form
							$scope.topupaction = "CONFIRM";
							var phone = localStorage.getItem("phonenumber");
							var referredfrom = "savemobiletopup";
						
						localStorage.setItem("mtamt",saveobj.amount);
						localStorage.setItem("mtnetwork",saveobj.network);
						localStorage.setItem("mtphonenumber",saveobj.phone);
							localStorage.setItem("mtpaymentcode",saveobj.paymentcode);
							localStorage.setItem("sourceaccount",$state.params.sourceAccount);
							localStorage.setItem("sourcebankcode",$state.params.sourceBankCode);
							localStorage.setItem("sourcebankname",$state.params.sourceBankName);
							
							$log.info({userphone:phone,previouspage:referredfrom});
							$state.go("login",{userphone:phone,previouspage:referredfrom});
							//$scope.showpassword = true;
							//$state.go("mobiletopupsucess");
					
			}
		
		}
		

					
})