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

   var blocks = [
    ['h', 'when %m.btns button pressed', 'whenButtonPressed', 'A'],
    [' '],
    ['h', 'when moved', 'whenMoved'],
    ['h', 'when shaken', 'whenShaken'],
    ['h', 'when jumped', 'whenJumped'],
    [' '],
    [' ', 'display %s', 'writeText', 'Hello!'],
    [' ', 'display %m.symbols','displaySymbol','❤'],
    [' '],
    [' ', 'set light x:%d.rowcol y:%d.rowcol %m.ledState', 'setMatrixLED', 1, 1, 'on'],
    [' ', 'set all lights off' ,'clearAllMatrixLEDs'],
    [' '],
    ['h', 'when tilted %m.dirs', 'whenTilted', 'any'],
    ['b', 'tilted %m.dirs?', 'isTilted', 'any'],
    ['r', 'tilt angle %m.tiltDirs', 'tiltDirection', 'right'],
    [' '],
    ['h', 'when pin %d.touchPins connected', 'whenPinConnected', '0']
  ];

  var menus = {
    dirs: ['any', 'right', 'left', 'up', 'down'],
    btns: ['A', 'B', 'any'],
    ledState: ['on', 'off'],
    touchPins: [0, 1, 2],
    tiltDirs: ['right', 'left', 'up', 'down'],
    rowcol: [1, 2, 3, 4, 5, 'random'],
    symbols: ['❤', '♫', '☓', '✓', '↑', '↓', '←', '→', '◯', '☀', '☺', '!', '?']
  };

  var descriptor = {
    blocks: blocks,
    menus: menus,
    url: 'https://lancaster-university.github.io/microbit-docs'
  };

   // Register the extension
   ScratchExtensions.register('Tello SDK 0.6.1', descriptor, ext, {info: device_info, type: 'ble'}); );
 })({});
