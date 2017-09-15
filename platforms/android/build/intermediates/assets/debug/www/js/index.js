/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    confirmDialog: function(optionSelected){
            console.log("you selected "+optionSelected);
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        console.log("Device ready event ");
       
        //get contacts on user's device
//		navigator.contacts.find(
//		[navigator.contacts.fieldType.displayName],
//		gotContacts,
//		errorHandler);
//	  
//	  function gotContacts(c) {
//		console.log("gotContacts, number of results "+c.length);
//	
//		for(var i=0, len=c.length; i<len; i++) {
//			console.dir(c[i]);
//		}
//	  }
//		function errorHandler(e) {
//		console.log("error " + e);
//	
//		
//	  }
       

       //console.log(navigator.notification);
       //navigator.notification("Device is Ready",app.confirmDialog);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var cachephone = localStorage.getItem("cachephone");
       
    },

    checkNetwork: function(){
        // var connstate = navigator.connection.type;
        // console.log(connstate);
    }

  
};


app.initialize();




var doSessionCheck = {
    
    checkUserNew: function(usertoken){
        
        
        // if(localStorage.getItem("isuservalid")=="yes"){
        //     return true;
        // }
        if(!usertoken){
            localStorage.setItem("isuservalid","no");
            localStorage.setItem("firstname","Guest");
            return false;
        }
            var datets = new Date();
            var currday = datets.getDate().toString(); 
            var currmonth = (datets.getMonth()+1).toString();
            var curryear = datets.getFullYear().toString();
            var currhour= datets.getHours().toString();
            var currmin = datets.getMinutes().toString();
            var currsec = datets.getSeconds().toString();
            var trans = curryear+currmonth+currday+currhour+currmin+currsec;
            var sess = curryear+currmonth+currday+currhour+currmin+currsec;    
            var endpointurl='http://35.164.119.185:8080/qucoontm/operations/customerstatus';
            var obj = {source:"MOBILE",transid:trans,sessid:sess,phonenumber:usertoken,country:"NG"};
        
        //console.log("Request with Json String:"+ JSON.stringify(obj));
        $.ajax({
          type: "POST",
          url: endpointurl,
          contentType:"application/json",
          dataType:"json",
          data: JSON.stringify(obj),
          success: function(data,status,xHRQ){
            console.log(data);
            var resp = JSON.stringify(data);
            if(data.responsecode ==='00'){
                    console.log('the returned response ' + data.responsecode);
                            localStorage.setItem("authtoken",data.authorization);
                            localStorage.setItem("isuservalid","yes");
                            localStorage.setItem("responsedate",data.responsedate);
                            localStorage.setItem("country",data.country);
                            localStorage.setItem("isuserresponsecode",data.responsecode);
                            localStorage.setItem("cardstatus",data.cardstatus);
                            localStorage.setItem("responsemessage",data.responsemessage);
                            localStorage.setItem("phonenumber",data.phonenumber);
                            localStorage.setItem("responsetime",data.cardstatus);
                            localStorage.setItem("sessionid",data.responsemessage);
                            localStorage.setItem("accounts",JSON.stringify(data.accounts));
                            localStorage.setItem("transactionid",data.transactionid);
                            localStorage.setItem("firstname",data.firstname.substring(0,1).toUpperCase()+data.firstname.substring(1).toLowerCase());
                            localStorage.setItem("lastname",data.lastname.substring(0,1).toUpperCase()+data.lastname.substring(1).toLowerCase());
                            //$("#welcomeuserid").text("Hello " + localStorage.getItem('username'));
                            var ac = eval(localStorage.getItem("accounts"));
                            console.log(ac);
                            //localStorage.setItem("accountsname",data.customername);
                            return true;
                  
            }else{
                            console.log('the failure returned response ' + data.responsecode);
                            localStorage.setItem("authtoken",data.authorization);
                            localStorage.setItem("isuservalid","no");
                            localStorage.setItem("firstname","Guest");
                            localStorage.setItem("isuserresponsecode",data.responsecode);
                            localStorage.setItem("responsemessage",data.responsemessage);
                            console.log("user status is invalid returned");
                            console.log(localStorage.getItem("firstname"));
                            return false;
                }
            },
            complete: function(){
                console.log("Request user validaton status has completed");
            }
        
        });
    }

   
};


var fundsTransfer = {

         doft: function (){

                 var pincode ="";

                bootbox.prompt("Please input your PIN", function(result){
                    localStorage.setItem("userpin",result);
                    pincode = result;
                    console.log("password entered "+ String(pincode));
                        if(!(!pincode || 0 === pincode.length)){
                                $(".loading-content").show();
                                $("#bodysection").load("send_money.html");
                                var datets = new Date();
                                var currday = datets.getDate().toString(); 
                                var currmonth = (datets.getMonth()+1).toString();
                                var curryear = datets.getFullYear().toString();
                                var currhour= datets.getHours().toString();
                                var currmin = datets.getMinutes().toString();
                                var currsec = datets.getSeconds().toString();
                                var trans = curryear+currmonth+currday+currhour+currmin+currsec;
                                var sess = curryear+currmonth+currday+currhour+currmin+currsec;    
                                var debitendpoint='http://35.164.119.185:8080/qucoontm/operations/debitcustomer';
                                var creditendpoint='http://35.164.119.185:8080/qucoontm/operations/creditcustomer';
                                var phonenum = localStorage.getItem("phonenumber");
                                var dracct = localStorage.getItem("ftsourceaccount");
                                var srcbnk = localStorage.getItem("ftsourcebankcode");
                                var craccount = localStorage.getItem("newuserft_destaccount");
                                var destbnk = localStorage.getItem("ftdestbankcode");
                                var amt = localStorage.getItem("newuserft_sendamount");
                                var narr = localStorage.getItem("newuserft_destnarration");
                                var pwd = localStorage.getItem("passcode");
                                var accountstatus = localStorage.getItem("accountstatus");

                                var debitpayload = {source:"MOBILE",transid:trans,sessid:sess,phonenumber:phonenum,accountstat:accountstatus,debitaccount:dracct,sourcebank:srcbnk,creditaccount:craccount,destbank:destbnk,amount:amt,narration:narr,passcode:pincode};

                                //console.log("Request with Json String:"+ JSON.stringify(obj));
                                console.log(JSON.stringify(debitpayload));


                                $.ajax({
                                        type: "POST",
                                        url: debitendpoint,
                                        contentType:"application/json",
                                        dataType:"json",
                                        data: JSON.stringify(debitpayload),
                                        success: function(data,status,xHRQ){
                                        console.log(data);
                                        var resp = JSON.stringify(data);
                                        if(data.responsecode ==='00'){
                                                console.log('the returned response ' + data.responsecode);
                                                // toUpperCase()+data.firstname.substring(1).toLowerCase();
                                                $(document).ajaxComplete(function(){
                                                    $(".loading-content").hide();
                                                    $('#animation').animate({'left' : '80%' },12000);
                                                });
                                                setTimeout(function(){
                                                    $('#first').addClass("complete");
                                                    $('strong#debitmessage').html('Debit <span>successful</span>');
                                                }, 3000);
                                                // setTimeout(function()
                                                // {
                                                //     $('#bodysection').load("fundtransfer_successfully_sent.html");
                                                // }, 12000);
                                                localStorage.setItem("debitstatus","true");
                                                localStorage.setItem("partialtxnref",data.transref);
                                                
                                              
                                        }else{
                                                        console.log('the failure returned response ' + data.responsecode);
                                                        console.log("user status is invalid returned");
                                                        localStorage.setItem("debitstatus","false");
                                                        localStorage.setItem("partialtxnref",data.transref);
                                                        // $("#welcomeuserid").text("Hello Guest");
                                                         $(document).ajaxComplete(function(){
                                                            $(".loading-content").hide();
                                                            //$('#animation').animate({'left' : '80%' },12000);
                                                        });
                                                        setTimeout(function(){
                                                            $('#first').addClass("failed");
                                                            $('strong#debitmessage').html('Sorry! <span>Bank not available </span>');
                                                        }, 3000);
                                                       
                                                        // setTimeout(function()
                                                        // {
                                                        //     $('#bodysection').load("fundtransfer_failed.html");
                                                        // }, 6500);

                                                        return;

                                        }
                                    }
                                });

                                 //End the call to the debit function
                                console.log("end the call to the debit function" + localStorage.getItem("debitstatus"));
                                //start the call to the credit funciton
                                console.log("start the call to the credit function");
                                var creditpayload = {source:"MOBILE",transid:trans,sessid:sess,phonenumber:phonenum,accountstat:accountstatus,debitaccount:dracct,sourcebank:srcbnk,creditaccount:craccount,destbank:destbnk,amount:amt,narration:narr,passcode:pincode}; 
                                console.log(JSON.stringify(creditpayload));
                                var docreditflag = localStorage.getItem("debitstatus");
                                console.log(docreditflag);

                                if(docreditflag === "true"){
                                        $.ajax({
                                        type:"POST",
                                        url:creditendpoint,
                                        contentType:"application/json",
                                        dataType:"json",
                                        data: JSON.stringify(creditpayload),
                                        success: function(data,status,xHRQ){
                                            console.log(data);
                                            var resp = JSON.stringify(data);
                                            if(data.responsecode ==='00'){
                                                    console.log('the returned response ' + data.responsecode);
                                                    // toUpperCase()+data.firstname.substring(1).toLowerCase();
                                                    $(document).ajaxComplete(function(){
                                                        $(".loading-content").hide();
                                                        $('#animation').animate({'left' : '80%' },12000);
                                                    });
                                                    setTimeout(function(){
                                                        $('#second').addClass("complete");
                                                        $('strong#creditmessage').html('Credit <span>successful</span>');
                                                    }, 6000);

                                                    localStorage.setItem("partialtxnref",data.transref);
                                                    
                                            }else{
                                                            console.log('the failure returned response ' + data.responsecode);
                                                            console.log("user status is invalid returned");
                                                            // $("#welcomeuserid").text("Hello Guest");
                                                             $(document).ajaxComplete(function(){
                                                                $(".loading-content").hide();
                                                                //$('#animation').animate({'left' : '80%' },12000);
                                                            });
                                                              setTimeout(function(){
                                                                $('#second').addClass("failed");
                                                                 $('strong#creditmessage').html('Sorry! <span>Bank not available </span>');
                                                            }, 6000);
                                                           
                                                            // setTimeout(function()
                                                            // {
                                                            //   $('#bodysection').load("fundtransfer_failed.html");
                                                            // }, 6500);
                                                            return;

                                            }
                                        }

                                     });
                                }      



                        }  //end if 


                }); // end bootbox



        }



}

var userFunctions = {

        register: function(phoneno,fname,lname,sex,dateofbirth,emailid,pin,bankvno,acctno,bankid){

              var endpointurl = "http://35.164.119.185:8080/qucoontm/operations/registeroctopus";
             
              var objdata = {source:"MOBILE",transid:"100904072017",sessid:"100904072017",phonenumber:phoneno,firstname:fname,lastname:lname,gender:sex,dob:dateofbirth,emailaddress:emailid,country:"NG",passcode:pin,bvn:bankvno,acno:acctno,bank:bankid};
            
            $.ajax({
                type: "POST",
                url: endpointurl,
                contentType:"application/json",
                dataType:"json",
                data: JSON.stringify(objdata),
                success: function(data,status,xHRQ){
                console.log(data.responsecode);
                }
            });
        },

       
        contactSuccess: function(contacts){
                console.log("found "+contacts.length);
                alert("contacts found "+contacts.lenght);
                console.log("Device contacts ");
                console.log(JSON.stringify(contacts));
        },

        contactError: function(){
            console.log("contacts error");
        },
       
};

var bankCodes = 
{
    "10":"First Bank",
    "19":"Mainstreat",
    "21":"Heritage",
    "23":"Citibank",
    "23":"Stanbic",
    "25":"FCMB",
    "27":"Union",
    "28":"Unity",
    "30":"UBA",
    "33":"Sterling",
    "35":"Ecobank",
    "36":"Wema",
    "49":"Fidelity",
    "51":"Diamond",
    "53":"Oceanic",
    "56":"Zenith",
    "59":"GTB",
    "62":"Keystone",
    "67":"Skye",
    "68":"Enterprise",
    "69":"InterCon",
    "71":"Finbank"
};




var countryCodes = {
    "Afghanistan":"AF",
"Åland Islands":"AX",
"Albania":"AL",
"Algeria":"DZ",
"American Samoa":"AS",
"Andorra":"AD",
"Angola":"AO",
"Anguilla":"AI",
"Antarctica":"AQ",
"Antigua and Barbuda":"AG",
"Argentina":"AR",
"Armenia":"AM",
"Aruba":"AW",
"Australia":"AU",
"Austria":"AT",
"Azerbaijan":"AZ",
"Bahamas":"BS",
"Bahrain":"BH",
"Bangladesh":"BD",
"Barbados":"BB",
"Belarus":"BY",
"Belgium":"BE",
"Belize":"BZ",
"Benin":"BJ",
"Bermuda":"BM",
"Bhutan":"BT",
"Bolivia, Plurinational State of":"BO",
"Bonaire, Sint Eustatius and Saba":"BQ",
"Bosnia and Herzegovina":"BA",
"Botswana":"BW",
"Bouvet Island":"BV",
"Brazil":"BR",
"British Indian Ocean Territory":"IO",
"Brunei Darussalam":"BN",
"Bulgaria":"BG",
"Burkina Faso":"BF",
"Burundi":"BI",
"Cambodia":"KH",
"Cameroon":"CM",
"Canada":"CA",
"Cape Verde":"CV",
"Cayman Islands":"KY",
"Central African Republic":"CF",
"Chad":"TD",
"Chile":"CL",
"China":"CN",
"Christmas Island":"CX",
"Cocos (Keeling) Islands":"CC",
"Colombia":"CO",
"Comoros":"KM",
"Congo":"CG",
"Congo, the Democratic Republic of the":"CD",
"Cook Islands":"CK",
"Costa Rica":"CR",
"Côte d'Ivoire":"CI",
"Croatia":"HR",
"Cuba":"CU",
"Curaçao":"CW",
"Cyprus":"CY",
"Czech Republic":"CZ",
"Denmark":"DK",
"Djibouti":"DJ",
"Dominica":"DM",
"Dominican Republic":"DO",
"Ecuador":"EC",
"Egypt":"EG",
"El Salvador":"SV",
"Equatorial Guinea":"GQ",
"Eritrea":"ER",
"Estonia":"EE",
"Ethiopia":"ET",
"Falkland Islands (Malvinas)":"FK",
"Faroe Islands":"FO",
"Fiji":"FJ",
"Finland":"FI",
"France":"FR",
"French Guiana":"GF",
"French Polynesia":"PF",
"French Southern Territories":"TF",
"Gabon":"GA",
"Gambia":"GM",
"Georgia":"GE",
"Germany":"DE",
"Ghana":"GH",
"Gibraltar":"GI",
"Greece":"GR",
"Greenland":"GL",
"Grenada":"GD",
"Guadeloupe":"GP",
"Guam":"GU",
"Guatemala":"GT",
"Guernsey":"GG",
"Guinea":"GN",
"Guinea-Bissau":"GW",
"Guyana":"GY",
"Haiti":"HT",
"Heard Island and McDonald Islands":"HM",
"Holy See (Vatican City State)":"VA",
"Honduras":"HN",
"Hong Kong":"HK",
"Hungary":"HU",
"Iceland":"IS",
"India":"IN",
"Indonesia":"ID",
"Iran, Islamic Republic of":"IR",
"Iraq":"IQ",
"Ireland":"IE",
"Isle of Man":"IM",
"Israel":"IL",
"Italy":"IT",
"Jamaica":"JM",
"Japan":"JP",
"Jersey":"JE",
"Jordan":"JO",
"Kazakhstan":"KZ",
"Kenya":"KE",
"Kiribati":"KI",
"Korea, Democratic People's Republic of":"KP",
"Korea, Republic of":"KR",
"Kuwait":"KW",
"Kyrgyzstan":"KG",
"Lao People's Democratic Republic":"LA",
"Latvia":"LV",
"Lebanon":"LB",
"Lesotho":"LS",
"Liberia":"LR",
"Libya":"LY",
"Liechtenstein":"LI",
"Lithuania":"LT",
"Luxembourg":"LU",
"Macao":"MO",
"Macedonia, the former Yugoslav Republic of":"MK",
"Madagascar":"MG",
"Malawi":"MW",
"Malaysia":"MY",
"Maldives":"MV",
"Mali":"ML",
"Malta":"MT",
"Marshall Islands":"MH",
"Martinique":"MQ",
"Mauritania":"MR",
"Mauritius":"MU",
"Mayotte":"YT",
"Mexico":"MX",
"Micronesia, Federated States of":"FM",
"Moldova, Republic of":"MD",
"Monaco":"MC",
"Mongolia":"MN",
"Montenegro":"ME",
"Montserrat":"MS",
"Morocco":"MA",
"Mozambique":"MZ",
"Myanmar":"MM",
"Namibia":"NA",
"Nauru":"NR",
"Nepal":"NP",
"Netherlands":"NL",
"New Caledonia":"NC",
"New Zealand":"NZ",
"Nicaragua":"NI",
"Niger":"NE",
"Nigeria":"NG",
"Niue":"NU",
"Norfolk Island":"NF",
"Northern Mariana Islands":"MP",
"Norway":"NO",
"Oman":"OM",
"Pakistan":"PK",
"Palau":"PW",
"Palestinian Territory, Occupied":"PS",
"Panama":"PA",
"Papua New Guinea":"PG",
"Paraguay":"PY",
"Peru":"PE",
"Philippines":"PH",
"Pitcairn":"PN",
"Poland":"PL",
"Portugal":"PT",
"Puerto Rico":"PR",
"Qatar":"QA",
"Réunion":"RE",
"Romania":"RO",
"Russian Federation":"RU",
"Rwanda":"RW",
"Saint Barthélemy":"BL",
"Saint Helena, Ascension and Tristan da Cunha":"SH",
"Saint Kitts and Nevis":"KN",
"Saint Lucia":"LC",
"Saint Martin (French part)":"MF",
"Saint Pierre and Miquelon":"PM",
"Saint Vincent and the Grenadines":"VC",
"Samoa":"WS",
"San Marino":"SM",
"Sao Tome and Principe":"ST",
"Saudi Arabia":"SA",
"Senegal":"SN",
"Serbia":"RS",
"Seychelles":"SC",
"Sierra Leone":"SL",
"Singapore":"SG",
"Sint Maarten (Dutch part)":"SX",
"Slovakia":"SK",
"Slovenia":"SI",
"Solomon Islands":"SB",
"Somalia":"SO",
"South Africa":"ZA",
"South Georgia and the South Sandwich Islands":"GS",
"South Sudan":"SS",
"Spain":"ES",
"Sri Lanka":"LK",
"Sudan":"SD",
"Suriname":"SR",
"Svalbard and Jan Mayen":"SJ",
"Swaziland":"SZ",
"Sweden":"SE",
"Switzerland":"CH",
"Syrian Arab Republic":"SY",
"Taiwan, Province of China":"TW",
"Tajikistan":"TJ",
"Tanzania, United Republic of":"TZ",
"Thailand":"TH",
"Timor-Leste":"TL",
"Togo":"TG",
"Tokelau":"TK",
"Tonga":"TO",
"Trinidad and Tobago":"TT",
"Tunisia":"TN",
"Turkey":"TR",
"Turkmenistan":"TM",
"Turks and Caicos Islands":"TC",
"Tuvalu":"TV",
"Uganda":"UG",
"Ukraine":"UA",
"United Arab Emirates":"AE",
"United Kingdom":"GB",
"United States":"US",
"United States Minor Outlying Islands":"UM",
"Uruguay":"UY",
"Uzbekistan":"UZ",
"Vanuatu":"VU",
"Venezuela, Bolivarian Republic of":"VE",
"Viet Nam":"VN",
"Virgin Islands, British":"VG",
"Virgin Islands, U.S.":"VI",
"Wallis and Futuna":"WF",
"Western Sahara":"EH",
"Yemen":"YE",
"Zambia":"ZM",
"Zimbabwe":"ZW"
};

