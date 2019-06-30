/*This program is free software: you can redistribute it and/or modify
 *it under the terms of the GNU General Public License as published by
 *the Free Software Foundation, either version 3 of the License, or
 *(at your option) any later version.
 *
 *This program is distributed in the hope that it will be useful,
 *but WITHOUT ANY WARRANTY; without even the implied warranty of
 *MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *GNU General Public License for more details.
 *
 *You should have received a copy of the GNU General Public License
 *along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function(ext) {
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
			alert("Listeneing\n");
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

 
   // Block and block menu descriptions
    var blocks =  [
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
 	  ]; 
	  
  var menus  =  {
        flipDirection: ['left', 'right', 'forward', 'backward'],
        direction: ['up', 'down', 'forward', 'backward', 'left', 'right'],
        rotation: ['cw', 'ccw'],
        readcommand: ['speed?','battery?','time?','height?','temp?','attitude?','baro?','acceleration?','tof?']
    }; 
	
    var descriptor = {
		blocks: blocks,
		menus: menus,
		url: 'https://github.com/f41ardu/TelloforScratch'
    };


  ScratchExtensions.register('tello:scratch', descriptor, ext);
})({});
