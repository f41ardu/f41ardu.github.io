(function(ext) {
	
   var alarm_went_off = false; // This becomes true after the alarm goes off
    
   

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.set_alarm = function(time) {
       window.setTimeout(function() {
           alarm_went_off = true;
       }, time*1000);
    };

    ext.when_alarm = function() {
       // Reset alarm_went_off if it is true, and return true
       // otherwise, return false.
       if (alarm_went_off === true) {
           alarm_went_off = false;
           return true;
       }

       return false;
    };

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

    // Register the extension
    ScratchExtensions.register('Tello extension', descriptor, ext {type:'network'});
})({});
