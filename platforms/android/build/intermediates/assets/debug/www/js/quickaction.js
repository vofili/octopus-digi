// JavaScript Document
// JavaScript Document
angular.module('octngapp.services',[])

octngapp.service("quickactionService",function($http,$log,utilService,$rootScope,$q,$state){
	var self = this;
	
	
	
	this.check3DTouchAvaiablility = function(){
		return $q(function(resolve,reject){
			$log.info("--========== Quick Actions Availability ==============--");
			if(window.ThreeDeeTouch){
				window.ThreeDeeTouch.isAvailable(function (available) {
                    resolve(available);
                });
			}else{
				reject();
			}
			
		});
	}
	
	
	this.configure = function(){
						
		self.check3DTouchAvaiablility.then(function(available){
			if(available){
				window.ThreeDeeTouch.configureQuickActions([
					{
						type: 'checkin', // optional, but can be used in the onHomeIconPressed callback
						title: 'Check in', // mandatoryh a phrase', // optional
						iconType: 'Search' // iconType is case insensitive
					},
					{
						type: 'mobiletopup', // optional, but can be used in the onHomeIconPressed callback
						title: 'Mobile Topup', // mandatory
						subtitle: 'Buy airtime on any Telco', // optional
						iconType: 'compose' // optional
					},
					{
						type: 'search',
						title: 'Search',
						subtitle: 'Be magical search with your search'
					}
				]);
				
				window.ThreeDeeTouch.onHomeIconPressed = function(payload) {
                        if (payload.type == 'mobiletopup') {
                            $state.go("mobiletopupsucess");
                        }
                };
			}else{
				$log.info("--===3D touch might not be available ===--");
				$log.error(availability);
			}
		});
		
	}	

		ThreeDeeTouch.onHomeIconPressed = function(payload) {
		  console.log("Icon pressed. Type: " + payload.type + ". Title: " + payload.title + ".");
		  if (payload.type == 'checkin') {
			document.location = 'checkin.html';
		  } else if (payload.type == 'share') {
			document.location = 'share.html';
		  } else {
			// wrapping in a timeout, otherwise it collides with the splashscreen
			setTimeout(function() {
			  alert(JSON.stringify(payload));
			}, 500);
		  }
		}
  
})