/**
 * 观察者，
 * 通过数据变更，更新页面对象
 */
class Watch {
    /**
     * 
     * @param {*} vm vue实例对象 
     * @param {*} el 标签元素
     * @param {*} exp 指令
     * @param {*} val 指定对应的操作
     */
    constructor(vm, el, exp, val) {
        this.vm = vm
        this.el = el
        this.exp = exp
        this.val = val
        this.update()
    }
    update() {
        //Dom操作 input[value] = 'hello world'
        this.el[this.val] = this.vm.$data[this.exp]
    }
}

export default Watch