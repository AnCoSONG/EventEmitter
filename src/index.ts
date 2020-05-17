/**
 * 事件总线
 * @author Justin Song, Aka AnCo
 */
export default class MyEventEmitter{

    /** 
     * 事件哈希表
     */
    private et:Map<string, Array<Function>>;

    /**
     * 初始化事件总线
     */
    constructor(){
        this.et = new Map<string, Array<Function>>();
    }

    /**
     * 监听事件
     * @param event 事件名
     * @param cbs 回调函数
     */
    public on(event:string, ...cbs:Array<Function>){
        if(!this.et.has(event)){
            this.et.set(event,cbs);
        }else{
            throw new Error("Do not allow multiple on operation，please use `addListener` to push new Callback.");
        }
    }

    /**
     * 取消监听
     * @param event 事件名
     */
    public off(event:string){
        if(this.et.has(event)){
            this.et.delete(event);
        }else{
            throw new Error("Unbind Event, please use on to bind event first.")
        }
    }
    
    /**
     * 触发事件
     * @param event 事件名
     */
    public emit(event:string){
        const self = this;
        let args = Array.prototype.slice.call(arguments);
        args.shift(); //去掉event参数，保留剩余参数
        if(this.et.has(event)){
            this.et.get(event)?.forEach(func => {
                func.call(self, args);
            })
        }else if(this.et.has("--once--" + event + "--once--")){
            let args = Array.prototype.slice.call(arguments);
            args.shift(); //去掉event
            this.et.get("--once--" + event + "--once--")?.forEach(func =>{
                func.call(self, args);
            })
            this.et.delete("--once--" + event + "--once--");
        }else{
            // console.log("ERROR");
            throw new Error("No matched event, use on first.")
        }
    }

    /**
     * 单次监听
     * @param event 事件名
     * @param cbs 回调
     */
    public once(event: string, ...cbs:Array<Function>){
        if(!this.et.has("--once--" + event + "--once--")){
            this.et.set("--once--" + event + "--once--",cbs);
        }else{
            throw new Error("Do not allowed mutilple once");
        }
    }

    /**
     * 对已绑定的事件添加回调
     * @param event 事件名
     * @param cbs 待添加的回调数组
     */
    public addListeners(event:string, ...cbs:Function[]){
        if(this.et.has(event)){
            this.et.get(event)?.push(...cbs);
        }else{
            throw new Error("Unbind event, please use on first.");
        }
    }

    /**
     * 移除全部绑定
     */
    public removeAllListeners(){
        this.et.clear();
    }

}