angular.module('octngapp.services')


octngapp.service("cardService",function($http,$log,utilService,userService){

	var self = this;
	
	this.addcardservice = function(phone,carddata,passcode,callback){
		//phonenumber,cardno,cardname,cardexpmonth,cardexpyear,cardcvv,cardcurr,cardcountry,cardpin,passcode
		var cardexp = carddata.selectedyear.substr(-2)+carddata.selectedmonth;
		var epurl = utilService.addcardurl;
		
		var obj = {authorization:carddata.authtoken,
					source:"MOBILE",transid:utilService.currts,sessid:utilService.currts,
					phonenumber:phone,passcode:passcode,cardno:carddata.cardno,cardexpiry:cardexp,
					cardcvv:carddata.cardcvv,cardname:carddata.cardname,cardcurrency:carddata.cardcurrency,cardcountry:carddata.cardcountry,cardpin:carddata.cardpin};
		
		$log.info("--=============  check card add request object ==================--");
		$log.info(obj);
		
		
		$http.post(epurl,obj).then(function success(response){
			
			if(callback){
				callback(response.data);
			}
		},function error(response){
			if(callback){
				callback(response);
			}
		});
		
	}
	
	this.addcardvalidateservice  = function(phone,cardno,custid,passcode,otp,callback){
		var epurl = utilService.addcardvalidateurl;
	//"phonenumber":"07038901111",
	//"passcode":"1111","cardno":"5061040000000000181","cid":"1353fffb-66e5-484a-b55d-1dd5a7506ecc","otp":""
	//		
		var obj =  {source:"MOBILE",sessid:utilService.currts,transid:utilService.currts,cardno:cardno,
					cid:custid,otp:otp,passcode:passcode,phonenumber:phone,authorization:localStorage.getItem('authorization')};
		
		$http.post(epurl,obj).then(function success(resultdata){
			var response = resultdata.data;
			$log.info("The otp validtion result: "+ response.responsemessage);
			
			if(callback){
				callback(response)
			}
			
		},function(resultdata){
			$log.info(resultdata);
			
			if(callback){
				callback(resultdata);
			}
		});
		
	}

})