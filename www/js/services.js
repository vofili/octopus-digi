// JavaScript Document
angular.module('octngapp.services',[])
//user session service
octngapp.service("userService", function($http,$log,utilService){
	
		
	 	this.isuservalid  = "no";
		this.firstname = " Guest";
		this.lastname = " Guest";
		this.phonenumber = localStorage.getItem("phonenumber");
		this.authtoken = "";
		this.useraccounts = [];
		var self = this;
		this.customerstatus = function(endpointurl,obj){
				var promise = $http.post(endpointurl,obj);
				return promise;
		}
		
	
		this.checkuser = function(uphone,callback){
		    var datets = new Date();
            var currday = datets.getDate().toString(); var currmonth = (datets.getMonth()+1).toString();
			var curryear = datets.getFullYear().toString();var currhour= datets.getHours().toString();
            var currmin = datets.getMinutes().toString();var currsec = datets.getSeconds().toString();
            var trans = curryear+currmonth+currday+currhour+currmin+currsec;
            var sess = curryear+currmonth+currday+currhour+currmin+currsec;    
            var endpointurl=utilService.customerstatusurl;
			var obj = {source:"MOBILE",transid:trans,sessid:sess,phonenumber:uphone,country:"NG"};
			$log.info(obj);
			$log.info("do a http get for the current user status and display user name");
			 $http.post(endpointurl,obj).then(function successCallback(response){
                    $log.info(response);
				 	
                    if(response.status === 200){
                        var responsedata = response.data;
                        if(responsedata.responsecode ==="00"){
							localStorage.removeItem("accounts");
							localStorage.removeItem("cards");
							self.isuservalid  = "yes";
							self.firstname = String(responsedata.firstname).charAt(0).toUpperCase() + String(responsedata.firstname).substr(1).toLowerCase();
							
							self.lastname = String(responsedata.lastname.substring(0,1).toUpperCase()+responsedata.lastname.substring(1).toLowerCase());
							self.phonenumber = responsedata.phonenumber;
                            self.authtoken = responsedata.authorization
							
                            localStorage.setItem("authtoken",responsedata.authorization);
                            localStorage.setItem("isuservalid","yes");
                            localStorage.setItem("responsedate",responsedata.responsedate);
                            localStorage.setItem("country",responsedata.country);
                            localStorage.setItem("isuserresponsecode",responsedata.responsecode);
                            localStorage.setItem("cardstatus",responsedata.cardstat);
                            localStorage.setItem("responsemessage",responsedata.responsemessage);
                            localStorage.setItem("phonenumber",responsedata.phonenumber);
                            localStorage.setItem("accounts",JSON.stringify(responsedata.accounts));
                            localStorage.setItem("transactionid",responsedata.transactionid);
                          localStorage.setItem("cards",JSON.stringify(responsedata.cards)); localStorage.setItem("firstname",responsedata.firstname.substring(0,1).toUpperCase()+responsedata.firstname.substring(1).toLowerCase());
                           localStorage.setItem("lastname",responsedata.lastname.substring(0,1).toUpperCase()+responsedata.lastname.substring(1).toLowerCase());
                          // self.useraccounts = JSON.parse(localStorage.getItem("accounts"));
							self.useraccounts = localStorage.getItem("accounts");
                           var fn = self.firstname;
						   var uv = self.isuservalid;
						   if(callback){
								callback(fn,uv);
							}
							
							
                        }else{
							
                            self.firstname = " Guest";
							self.isuservalid = "no";
							self.phonenumber = responsedata.uphone;
                            localStorage.setItem("isuservalid","no");
                            localStorage.setItem("firstname",self.firstname);
							localStorage.setItem("phonenumber","");
							var fn = self.firstname;
							var uv = self.isuservalid;
							if(callback){
								callback(fn,uv);
							}
//							$scope.userfirstname = localStorage.getItem("firstname");
//							$scope.isuservalid = localStorage.getItem("isuservalid");
//							$scope.userfirstname = localStorage.getItem("firstname");
//							$scope.isuservalid = localStorage.getItem("isuservalid");
                        }
                    }
            },function errorCallBack(response){
				
				self.firstname = " Guest";
				localStorage.setItem("isuservalid","no");
                localStorage.setItem("firstname",self.firstname);
				self.phonenumber = ""; //uphone
				self.isuservalid = "no";
                $log.info(response);
				 if(callback){
					 callback(self.firstname,self.isuservalid);
				 }
				 
            });
            
		}
		
		
		
		
		this.getcustomerstatus = function(uphone,callback){
		    var datets = new Date();
            var currday = datets.getDate().toString(); var currmonth = (datets.getMonth()+1).toString();
			var curryear = datets.getFullYear().toString();var currhour= datets.getHours().toString();
            var currmin = datets.getMinutes().toString();var currsec = datets.getSeconds().toString();
            var trans = curryear+currmonth+currday+currhour+currmin+currsec;
            var sess = curryear+currmonth+currday+currhour+currmin+currsec;    
            var endpointurl= utilService.customerstatusurl;
			var obj = {source:"MOBILE",transid:trans,sessid:sess,phonenumber:uphone,country:"NG"};
			$log.info(obj);
			$log.info("do a http get for the current user status and display user name");
			 $http.post(endpointurl,obj).then(function successCallback(response){
                    $log.info(response);
				 	
                    if(response.status === 200){
                        var responsedata = response.data;
                        if(responsedata.responsecode ==="00"){
							
						   if(callback){
								callback(responsedata);
							}
							
							
                        }else{
							
							if(callback){
								callback(responsedata);
							}

                        }
                    }
            },function errorCallBack(response){
				
                $log.info(response);
				 if(callback){
					 callback(response);
				 }
				 
            });
            
		}
		
		
		
		this.getaccountbalance = function(uphone,callback){
		    var datets = new Date();
            var currday = datets.getDate().toString(); var currmonth = (datets.getMonth()+1).toString();
			var curryear = datets.getFullYear().toString();var currhour= datets.getHours().toString();
            var currmin = datets.getMinutes().toString();var currsec = datets.getSeconds().toString();
            var trans = curryear+currmonth+currday+currhour+currmin+currsec;
            var sess = curryear+currmonth+currday+currhour+currmin+currsec;    
            var endpointurl=utilService.getaccountbalanceurl;
			var obj = {source:"MOBILE",transid:trans,sessid:sess,phonenumber:uphone,country:"NG"};
			$log.info(obj);
			$log.info("do a http get for the account balances user status and display");
			 $http.post(endpointurl,obj).then(function successCallback(response){
                    $log.info(response);
				 	
                    if(response.status === 200){
                        var responsedata = response.data;
                        if(responsedata.responsecode ==="00"){
							$log.info(responsedata.responsemessage);
						   if(callback){
								callback(responsedata);
							}
							
							
                        }else{
							
							if(callback){
								callback(responsedata);
							}

                        }
                    }
            },function errorCallBack(response){
				
                $log.info(response);
				 if(callback){
					 callback(response);
				 }
				 
            });
            
		}
		
		
			
		//
		
})

//inbox transactions
octngapp.service("inboxService",function($http,$log,userService,utilService){
	
	var self = this;
	this.pendingtxnscount = "0";
	var userphonenumber = localStorage.getItem("phonenumber");
	this.getpendingtxns = function(uphone,callback){
		
	var reqobj = {
    	source:"MOBILE",sessid:utilService.currts,transid:utilService.currts,phonenumber:uphone,authorization:localStorage.getItem('authorization')
	};
		
		var returnobject = {};
		$log.info("--============ Request Object for Inbox Transactions ===========---");
		$log.info(reqobj);
		var requrl = utilService.getinboxtransactionsurl;
		$log.info(" ===== run the inbox service function ====== ");
		//http config properties
		
		
		$http.post(requrl,reqobj).then(function success(response){
			$log.info("--=========  raw success response  ===========--");
			$log.info(response);
			localStorage.removeItem("pendinginbox");
			localStorage.removeItem("pendinginboxitems");
			if(response.data.responsecode === "00"){
				returnobject.result = response.data.result;
				returnobject.count = response.data.result.length;
				localStorage.setItem("pendinginbox",returnobject.count);
				localStorage.setItem("pendinginboxitems",JSON.stringify(returnobject.result));
			}else{
				returnobject.count = "0";
			returnobject.result = [{billerid:"",sendername:"",amount:"",paymentcode:"",receiveraccount:"00000",transtype:"Empty",senderbank:"",receiverbank:"",
			receivername:"No Inbox Items ",senderid:"",receiverid:"",sno:7,receiverbankcode:"090",senderbankcode:"",narration:"No Pending Inbox Transactions",transcategory:"fundsrequest",customerid:"",senderaccount:"",categoryname:"",billername:"",categoryid:""}];
				localStorage.setItem("pendinginbox",returnobject.count);
				localStorage.setItem("pendinginboxitems",JSON.stringify(returnobject.result));
			}
		},function error(response){
			$log.info("--=========  raw error response  ===========--");
			$log.info(response);
			returnobject.count = "0";
			returnobject.result = [{billerid:"",sendername:"",amount:"",paymentcode:"",receiveraccount:"00000",transtype:"Empty",senderbank:"",receiverbank:"",
			receivername:"No Inbox Items ",senderid:"",receiverid:"",sno:7,receiverbankcode:"090",senderbankcode:"",narration:"No Pending Inbox Transactions",transcategory:"fundsrequest",customerid:"",senderaccount:"",categoryname:"",billername:"",categoryid:""}];
			localStorage.setItem("pendinginbox",returnobject.count);
				localStorage.setItem("pendinginboxitems",JSON.stringify(returnobject.result));
		})
		if(callback){
			callback(returnobject);
		}
	}
	
})

//utilities service
octngapp.service("utilService",function($http,$log){
	
	
	var self = this;
	///properties for timestamp
	this.currtstamp = function(){
		 	var datets = new Date();
            var currday = datets.getDate().toString(); 
			var currmonth = (datets.getMonth()+1).toString();
			var curryear = datets.getFullYear().toString();
			var currhour= datets.getHours().toString();
            var currmin = datets.getMinutes().toString();
			var currsec = datets.getSeconds().toString();
            var ts = curryear+currmonth+currday+currhour+currmin+currsec;
			self.currts = ts;
            return ts;
	}
	this.currtstamp();
	
	//properties for web service endpoints
//	this.fetchbeneficiary = "http://35.164.119.185:8080/qucoontm/operations/fetchbeneficiary";
//	this.savebeneficiaryurl = "http://35.164.119.185:8080/qucoontm/operations/savebeneficiary";
//	this.sendbilladviceurl = "http://35.164.119.185:8080/qucoontm/operations/sendbilladvice";
//	this.fundstransferurl = "http://35.164.119.185:8080/qucoontm/operations/fundstransfer";
//	this.getnamewithaccounturl = "http://35.164.119.185:8080/qucoontm/operations/getnamewithaccount";
//	this.getbankwithaccounturl = "http://35.164.119.185:8080/qucoontm/operations/getbankwithaccount";
//	this.billercategorysurl = "http://35.164.119.185:8080/qucoontm/operations/billercategorys";
//	this.billerlistwithcategoryidurl ="http://35.164.119.185:8080/qucoontm/operations/billerlistwithcategoryid";
//	this.paymentitemswithbilleridurl ="http://35.164.119.185:8080/qucoontm/operations/paymentitemswithbillerid";
//	this.fetchbeneficiaryurl = "http://35.164.119.185:8080/qucoontm/operations/fetchbeneficiary";
//	this.getaccountbalanceurl = "http://35.164.119.185:8080/qucoontm/operations/getaccountbalance";
//	this.addaccounturl = "http://35.164.119.185:8080/qucoontm/operations/addaccount";
//	this.getinboxtransactionsurl = "http://35.164.119.185:8080/qucoontm/operations/getinboxtransactions";
//	this.customerstatusurl = "http://35.164.119.185:8080/qucoontm/operations/customerstatus";
//	this.approveinboxtransactionurl = "http://35.164.119.185:8080/qucoontm/operations/approveinboxtransaction";
//	this.deleteinboxtransactionurl = "http://35.164.119.185:8080/qucoontm/operations/deleteinboxtransaction";
//	this.langprocessorurl = "http://35.164.119.185:8080/qucoontm/operations/langprocessor";
//	this.registeroctopusvalidateurl = "http://35.164.119.185:8080/qucoontm/operations/registeroctopusvalidate";
//	this.registeroctopusurl =  "http://35.164.119.185:8080/qucoontm/operations/registeroctopus";
//	this.addcardurl = "http://35.164.119.185:8080/qucoontm/operations/addcard";
//	this.addcardvalidateurl = "http://35.164.119.185:8080/qucoontm/operations/addcardvalidate";
//	this.loginurl = "http://35.164.119.185:8080/qucoontm/operations/login";
//	this.customervalidationurl = "http://35.164.119.185:8080/qucoontm/operations/customervalidation";
//	this.fundsrequesturl = "http://35.164.119.185:8080/qucoontm/operations/fundsrequest"
//	this.transactionvalidateurl = "http://35.164.119.185:8080/qucoontm/operations/transactionvalidate";
	
	
//production
	this.fetchbeneficiary = "https://tm.octopuszone.com/otheroperations/fetchbeneficiary";
	this.savebeneficiaryurl = "https://tm.octopuszone.com/otheroperations/savebeneficiary";
	this.sendbilladviceurl = "https://tm.octopuszone.com/operations/sendbilladvice";
	this.fundstransferurl = "https://tm.octopuszone.com/operations/fundstransfer";
	this.getnamewithaccounturl = "https://tm.octopuszone.com/otheroperations/getnamewithaccount";
	this.getbankwithaccounturl = "https://tm.octopuszone.com/otheroperations/getbankwithaccount";
	this.billercategorysurl = "https://tm.octopuszone.com/operations/billercategorys";
	this.billerlistwithcategoryidurl ="https://tm.octopuszone.com/operations/billerlistwithcategoryid";
	this.paymentitemswithbilleridurl ="https://tm.octopuszone.com/operations/paymentitemswithbillerid";
	this.fetchbeneficiaryurl = "https://tm.octopuszone.com/operations/fetchbeneficiary";
	this.getaccountbalanceurl = "https://tm.octopuszone.com/operations/getaccountbalance";
	this.addaccounturl = "https://tm.octopuszone.com/operations/addaccount";
	this.getinboxtransactionsurl = "https://tm.octopuszone.com/operations/getinboxtransactions";
	this.customerstatusurl = "https://tm.octopuszone.com/otheroperations/customerstatus";
	this.approveinboxtransactionurl = "https://tm.octopuszone.com/operations/approveinboxtransaction";
	this.deleteinboxtransactionurl = "https://tm.octopuszone.com/operations/deleteinboxtransaction";
	this.langprocessorurl = "https://tm.octopuszone.com/otheroperations/langprocessor";
	this.registeroctopusvalidateurl = "https://tm.octopuszone.com/otheroperations/registeroctopusvalidate";
	this.registeroctopusurl =  "https://tm.octopuszone.com/otheroperations/registeroctopus";
	this.addcardurl = "https://tm.octopuszone.com/operations/addcard";
	this.addcardvalidateurl = "https://tm.octopuszone.com/operations/addcardvalidate";
	this.loginurl = "https://tm.octopuszone.com/otheroperations/login";
	this.customervalidationurl = "https://tm.octopuszone.com/otheroperations/customervalidation";
	this.fundsrequesturl = "https://tm.octopuszone.com/operations/fundsrequest";
	this.transactionvalidateurl = "https://tm.octopuszone.com/operations/transactionvalidate";
	this.rechargebillersurl = "https://tm.octopuszone.com/otheroperations/rechargebillers";
	
	this.savebeneficiary = function(userphn,benacct,benbankcode,benbankname,benname,benphn,bentype){
			var tstamp = new Date();
			var obj = {
				source:"MOBILE",transid:self.currts,sessid:self.currts, phonenumber:userphn,
    			benephone:benphn,benebank:benbankname,benebankcode:benbankcode,beneaccount:benacct,benename:benname,benetype:bentype};
			
			var epurl = self.savebeneficiaryurl;
			$log.info("the beneficiary object to be saved = ");
			$log.info(obj);
			$log.info("the ben save end point  = ");
			$log.info(epurl);
			$http.post(epurl,obj).then(function(response){
				$log.info(response.data);
			},function(error){
				$log.error(error);
			});
		}
	
	this.fetchbeneficiary = function(userphone,bentype,callback){
		
		var obj = {source:"MOBILE",transid:self.currts,sessid:self.currts,phonenumber:userphone,benetype:bentype};
		var epurl = self.fetchbeneficiaryurl;
		
		$http.post(epurl,obj).then(function(response){
			if(callback){
				callback(response);
			}
		}, function(response){
			if(callback){
				callback(response);
			}
		});
		
	}
	
	this.markinboxapprove = function(senderid,sn,callback){
		var obj = {source:"MOBILE",transid:this.currts,sessid:this.currts,senderid:senderid,sno:sn};
		var epurl = this.approveinboxtransactionurl;
		
		$http.post(epurl,obj).then(function success(result){
			$log.info(result);
			if(callback){
				callback(result.data);
			}
		},function error(result){
			log.info(result);
			if(callback){
				callback(result.data);
			}
		}) ;
		
	}
	
	
	this.markinboxdelete = function(senderid,sn,callback){
		var obj = {source:"MOBILE",transid:this.currts,sessid:this.currts,senderid:senderid,sno:sn};
		var epurl = this.deleteinboxtransactionurl;
		
		$http.post(epurl,obj).then(function success(result){
			$log.info(result);
			if(callback){
				callback(result.data);
			}
		},function error(result){
			log.info(result);
			if(callback){
				callback(result.data);
			}
		}); 
		
	}
	
	
	
	this.getNameFromAccount = function(ac,bankname,bankcode,callback){
		
		var obj = {source:"MOBILE",transid:self.currts,sessid:self.currts,phonenumber:userphone,benetype:bentype};
		var epurl = self.fetchbeneficiaryurl;
		
		$http.post(epurl,obj).then(function(response){
			if(callback){
				callback(response);
			}
		}, function(response){
			if(callback){
				callback(response);
			}
		});
		
	}
	
	this.customervalidation = function(phone,custid,pcode){
		
		var epurl = utilService.customervalidationurl;
		var obj = {source:"MOBILE",transid:utilService.currts,sessid:utilService.currts,phonenumber:phone,customerid:custid,paymentcode:pcode};
			
		$http.post(epurl,obj).then(function successcallback(response){
			if(response.status === 200){
				var resultdata = response.data;
				$log.info(resultdata);
				if(callback){
					callback(resultdata);
				}
			}
		},function errorcallback (error){
			if(callback){
				callback(error);
			}
		});
	}
	
	
	this.requestfunds = function(){
		
	}
})
	


