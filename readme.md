# @anco/EventEmitter
![Build Status](https://travis-ci.com/AnCoSONG/EventEmitter.svg?branch=master)
An event emitter implementation based on ts and build into es5.

Use Map to minify get time complexity.

## How

```js
import EventEmitter from '@anco/eventemitter';
// or
const EventEmitter = require('@anco/eventemitter').default;
const ee = new EventEmitter();
ee.on('sleep',function(...args){
    console.log('sleep triggered, args:', ...args);
})  

ee.emit('sleep','hello1','hello2');
ee.off('sleep');

```

## Implements

- [x] on
- [x] off
- [x] emit
- [x] once
- [x] addListeners
- [x] mutiple callbacks
- [x] removeAllListeners

## WIP

- [ ] max listeners limitation
- [ ] some fancy things
