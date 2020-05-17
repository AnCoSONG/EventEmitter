/**
 * 事件总线
 * @author Justin Song, Aka AnCo
 */
export default class MyEventEmitter {
    /**
     * 事件哈希表
     */
    private et;
    /**
     * 初始化事件总线
     */
    constructor();
    /**
     * 监听事件
     * @param event 事件名
     * @param cbs 回调函数
     */
    on(event: string, ...cbs: Array<Function>): void;
    /**
     * 取消监听
     * @param event 事件名
     */
    off(event: string): void;
    /**
     * 触发事件
     * @param event 事件名
     */
    emit(event: string): void;
    /**
     * 单次监听
     * @param event 事件名
     * @param cbs 回调
     */
    once(event: string, ...cbs: Array<Function>): void;
    /**
     * 对已绑定的事件添加回调
     * @param event 事件名
     * @param cbs 待添加的回调数组
     */
    addListeners(event: string, ...cbs: Function[]): void;
    /**
     * 移除全部绑定
     */
    removeAllListeners(): void;
}
