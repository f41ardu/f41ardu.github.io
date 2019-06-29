/* 
  * 
  * MIT License
  * 
  * Copyright (c) 2019 f41_ardu
  * 
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  * 
  * The above copyright notice and this permission notice shall be included in all
  * copies or substantial portions of the Software.
  * 
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  * SOFTWARE.
  * 
  */
 
 (function(ext) {
   // /home/pi/code/TelloforScratch/TelloScratch.js
   // Tello udp port and IP address
   var PORT = 8889 ;
   var HOST = '192.168.10.1'; // Tello IP
   // var HOST = '127.0.0.1'; // Test localhost (debug mode)
   
   // Scratch listener port 
   var listenerPort = 8890;  
   var listenerHOST = '0.0.0.0';

   // udp connector  
   var dgram = require('dgram');
   // client connector (send commands) 
   var client = dgram.createSocket('udp4');
   // server connector (receive Telle response) 
   var server1 = dgram.createSocket('udp4');
   
   
   // initial variables
   var myStatus = 1; // initially set status to yellow
   var connected = false; // initially set connected to false
   var getData = ' '; // initial set blank 
   var dict = {
	'speed?' : 3, // 4, 5 vector length
	'battery?' : 10, // % percentage
	'time?' : 12, // Motors on time
	'height?' : 9, 
	'temp?' : 6, // 7 average
	'attitude?' : 27,
	'baro?' : 11, // baramoter measurement cm
	'acceleration?' : 0, // 1, 2 vector length
	'tof?' : 8, // distance cm
   }; 
   
   // Scratch UDP Listener (experimental) 
   ext.cnct = function() {	
   if (connected == false) {
		server1.on("error", function (err) {
			alert("server error:\n" + err.stack);
			server.close();
		});

		server1.on("message", function (msg, rinfo) {
			//setReceived("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port); 
			getData = ' '+msg+' '; 
			//myStatus = 1;         
			});

		server1.on("listening", function () {
			myStatus = 2; });
	    // listen on all IP adresses
		server1.bind(listenerPort,listenerHOST);
		connected = true; 	
	} else {
		alert ("Scratch already listening on udp ports"); 
	}
   };		    
  
   // end UDP Listener (experimental)
   
   // Cleanup function when the extension is unloaded

   ext._shutdown = function() {
	   server1.close();
   };

   // Status reporting code

   // Use this to report missing hardware, plugin

   // or unsupported browser

   ext._getStatus = function() {
     return {status: myStatus, msg: 'Ready'};
   };
   
   // Functions for block with type 'w' will get a callback function as the 
   // final argument. This should be called to indicate that the block can
   // stop waiting.
   // Send command and set Tello into SDK mode
   ext.sendcommand = function () {
   
   var message = new Buffer('command');
    
     if (connected == false) {
            alert("Tello not Connected! \n \n Establish WIFI connection first.");
		}
	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		if (err) { 
			alert("Command could not send: " + err);
			client.close();
			}
		});
   };
   
   // Send takeoff
   ext.takeoff = function () {
   
   var message = new Buffer('takeoff');
     
	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   };
   
   // Send land
   ext.land = function () {
   
   var message = new Buffer('land');

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});   
   };
   
    // Send set speed
   ext.setspeed = function (val) {
   
   var message = new Buffer('speed ' + val);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});   
   };
 
   // Send set fly direction and distance to fly
   ext.flydir = function (direction, distance) {
   
   var message = new Buffer(direction + ' ' + distance);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   };
   
   // Send rotation direction and rotation angle
   ext.rotation = function (direction, angle) {
   
   var message = new Buffer(direction + ' ' + angle);

	client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
		});
   };

   // Send set flip Direction
   ext.setflipDirection = function (val) {
   
   var message = new Buffer('flip ' + val.charAt(0));

   client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
		//if (err) throw err;
		//client.close();
   });
   
   };
   
   // read Data improved for all Tello return codes, flight and state commands
   ext.readData = function (val) {
     
     var message = new Buffer(val); 		
	 var test = getData.trim();
	 // interpreter for data will be implemented later
     if ( test != '' ) {
        treturn = test; 
		} else {
			treturn = 'empty';
		}; 
	 	 
     return treturn;
   };
   
   // read Data improved for all Tello return codes, flight and state commands
   ext.readValues = function (val) {
     
	 var test = getData.trim();
	 // interpreter for data will be implemented later
     if ( test != '' ) {
        treturn = test;
        var array = test.split(';').map(function (a) { return a.split(':'); });
	    
	 }; 
	 var select = dict[val]; 
	 // return acceleration
	 if ( select == 0 ) {  
		 var x = array[select][1];
		 var y = array[select+1][1];
		 var z = array[select+2][1]; 
	     var wegot = parseFloat(Math.round(Math.sqrt(x*x+y*y+z*z) * 100) / 100).toFixed(2); 
    // parseFloat(Math.round(Math.sqrt(x*x+y*y+z*z) * 100) / 100).toFixed(2);
	 };
	 // return speed
	 if ( select == 3 ) {  
		 var x = array[select][1];
		 var y = array[select+1][1];
		 var z = array[select+2][1]; 
	     var wegot = parseFloat(Math.round(Math.sqrt(x*x+y*y+z*z) * 100) / 100).toFixed(2); 
    // parseFloat(Math.round(Math.sqrt(x*x+y*y+z*z) * 100) / 100).toFixed(2);
	 };
	 if ( select == 6 ) {
		 var x = parseFloat(array[select][1]);
		 var y = parseFloat(array[select+1][1]);
		 var z = (x+y)/2.;
		 var wegot = z;
	 };
	 // tof 
	 if ( select == 8 ) {
		 var x = parseFloat(array[select][1]);
		 var wegot = x;
	 };
	 // height 
	 if ( select == 9 ) {
		 var x = parseFloat(array[select][1]);
		 var wegot = x;
	 };
	  // battery 
	 if ( select == 10 ) {
		 var x = parseFloat(array[select][1]);
		 var wegot = x;
	 };
	  // barometer 
	 if ( select == 11 ) {
		 var x = parseFloat(array[select][1]);
		 var wegot = x;
	 };
	  // motor time 
	 if ( select == 12 ) {
		 var x = array[select][1];
		 var wegot = x;
	 };
	 return wegot;
   };


   // added function to support the Start The Program block
   ext.goGreen = function() {
     myStatus = 2;
     console.log(myStatus);
   };

   // Block and block menu descriptions
   var descriptor = {
    blocks: [
		[' ', 'Receiver', 'cnct'],
		[' ', 'Send command', 'sendcommand'],
		['r', 'Read %m.readcommand', 'readData', 'speed?'],
		['r', 'Values %m.readcommand', 'readValues', 'speed?'],
		[' ', 'take off', 'takeoff'],
		[' ', 'land', 'land'],
		[' ', 'emergency', 'emergency'],
		[' ', 'fly %m.direction with distance %n', 'flydir', 'up', '20'],
		[' ', 'rotate %m.rotation with angle %n', 'rotation', 'cw', '90'],
		[' ', 'flip direction %m.flipDirection', 'setflipDirection', 'forward'],
		[' ', 'set speed %n', 'setspeed', 80]	
 	  ],
 	  'menus': {
        'flipDirection': ['left', 'right', 'forward', 'backward'],
        'direction'    : ['up', 'down', 'forward', 'backward', 'left', 'right'],
        'rotation'     : ['cw', 'ccw'],
        'readcommand'  : ['speed?','battery?','time?','height?','temp?','attitude?','baro?','acceleration?','tof?']
    },
    url: 'https://github.com/f41ardu/TelloforScratch',
    displayName: 'Tello SDK 1.3.0.0'
};

   // Register the extension
   ScratchExtensions.register('Tello SDK 0.6.1', descriptor, ext);
 })({});
