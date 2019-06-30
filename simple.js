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
		url: 'https://github.com/f41ardu/TelloforScratch',
    };

   // Register the extension
   ScratchExtensions.register('Tello SDK 0.6.1', descriptor, ext, {info: device_info, type: 'ble'}); );
 })({});
