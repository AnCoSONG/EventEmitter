import EE from '../src/index'
// import EE from '../dist/index'

test("EE standard emit test", ()=>{
    let eventEmitter = new EE();
    let callback = jest.fn(); //* 使用Mock Fn
    let callback2 = jest.fn();
    eventEmitter.on('sleep',callback, callback2);
    eventEmitter.emit('sleep');
    expect(callback).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
})

test("EE once test", ()=>{
    let eventEmitter = new EE();
    let callback = jest.fn();
    let callback2 = jest.fn();
    eventEmitter.once('sleep', callback, callback2);
    eventEmitter.emit('sleep');
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
    //! 测试一个已实现的方法是否抛出正确的异常，需要包裹在匿名函数内...
    /**
     ** If you need to test an existing function whether it throws with a set of arguments, 
     ** you have to wrap it inside an anonymous function in expect().
     *@example
     ```js
     *? test("Test description", () => {expect(() => {http.get(yourUrl, yourCallbackFn)}).toThrow(TypeError);});
     ``` 
     */
    expect(()=>eventEmitter.emit('sleep')).toThrowError("No matched event, use on first.");


})

test("EE emit test", ()=>{
    let eventEmitter = new EE();
    let callback = jest.fn();
    let callback2 = jest.fn();
    let callback3 = jest.fn();
    eventEmitter.on("sleep",callback,callback2,callback3);
    eventEmitter.emit('sleep');
    eventEmitter.emit('sleep');
    eventEmitter.emit('sleep');
    eventEmitter.emit('sleep');
    expect(callback).toHaveBeenCalledTimes(4);
    expect(callback2).toHaveBeenCalledTimes(4);
    expect(callback3).toHaveBeenCalledTimes(4);
    expect(()=>eventEmitter.emit("unknown")).toThrowError(/No matched event/);
})

test("EE off test", ()=>{
    let eventEmitter = new EE();
    let callback = jest.fn();
    let callback2 = jest.fn();
    let callback3 = jest.fn();
    eventEmitter.on("sleep",callback,callback2,callback3);
    eventEmitter.emit("sleep");
    expect(callback).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
    expect(callback3).toHaveBeenCalled();
    eventEmitter.off("sleep");
    expect(()=>eventEmitter.emit('sleep')).toThrowError(/No matched event/);
    expect(()=>eventEmitter.off("unknown")).toThrowError(/Unbind Event/);
    
})

test("EE addListeners test", ()=>{
    let eventEmitter = new EE();
    let callback = jest.fn();
    let callback2 = jest.fn();
    eventEmitter.on('sleep', callback);
    eventEmitter.emit('sleep');
    expect(callback).toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
    eventEmitter.addListeners('sleep', callback2);
    eventEmitter.emit('sleep');
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback2).toHaveBeenCalled();
})

test("EE removeAllListeners test", ()=>{
    let eventEmitter = new EE();
    let callback = jest.fn();
    eventEmitter.on('sleep',callback);
    eventEmitter.removeAllListeners();
    expect(()=>eventEmitter.emit('sleep')).toThrowError(/No matched event/);
    expect(callback).not.toHaveBeenCalled();
})