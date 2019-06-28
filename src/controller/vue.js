import Watch from './watch'

/**
 * 封装 Vue 类库
 * 实现双向绑定，以及函数调用
 * tips:函数调用肯定有坑啊
 */
class Vue {
    constructor(options) {
        this.options = options //实例化的 vue 配置
        this.$data = this.options.data //获取配置中的数据
        this.$el = document.querySelector(this.options.el) //获取指定节点的 Dom 对象
        this._observerable = {} //观察者容器
        this.$command = this.Command() //Vue默认提供的指令集合
        this.$methods = this.options.methods //
        this.Observerable(this.$data) //进行数据劫持处理
        this.Complite(this.$el) //进行指令处理
    }
    /**
     * Vue 进行数据劫持
     * @param {*} data 
     */
    Observerable(data) {
        for (let key in data) {
            this._observerable[key] = [] //指定观察者容器存储的类型为数组，即一个指令(v-text)的所有观察者

            let val = data[key] //获取对象中的值

            const watch = this._observerable[key]//获取观察者对象数组
            /**
             * 双向绑定的原理 , 修改对象上的属性
             * 相当于Java中的 setter getter
             */
            Object.defineProperty(this.$data, key, {
                //取出对象中的值
                get() {
                    return val
                },
                //设置对象里的值，此处实现自定义方法
                //每当设置值时，都会对已存储的 watch 进行遍历，然后调用Watch对象的update方法，从而修改Dom
                set(newVal) {
                    if (newVal !== val) {
                        val = newVal
                        watch.map(item => item.update())
                    }
                }
            })
        }
    }
    Complite(ele) {
        //获取#app下面的子节点
        const nodes = ele.children
        //对子节点进行遍历，找到含有指令的标签
        Array.from(nodes).map(element => {
            //如果当前遍历出的字节点还有子元素。则递归查找
            if (element.children.length > 0) {
                this.Complite(element)
            }

            this.$command.map(item => {
                //获取指令对象
                const val = element.getAttribute(item.command)
                if (element.hasAttribute(item.command)) {
                    if (item.type != 3 && this._observerable[val] === undefined) {
                        console.error("设定的：" + val + " 不存在")
                        return;
                    }
                    switch (item.type) {
                        case 1:
                            this._observerable[val].push(new Watch(this, element, val, item.operating))
                            break
                        case 2:
                            this._observerable[val].push(new Watch(this, element, val, item.operating))
                            //设置input事件，实时更新 vue-data 中指定指令的值
                            element.addEventListener('input', () => {
                                this.$data[val] = element.value
                            })
                            break
                        case 3:
                            //重新绑定 this 对象
                            const fun = this.$methods[val].bind(this.$data)
                            element.addEventListener('click', fun)
                            break
                    }
                }
            })
        })
    }
    //默认的指令集合
    Command() {
        return [
            {
                command: 'v-html',
                operating: 'innerHTML',
                type: 1
            },
            {
                command: 'v-text',
                operating: 'innerText',
                type: 1
            },
            {
                command: 'v-model',
                operating: 'value',
                type: 2
            },
            {
                command: 'v-on:click',
                operating: '',
                type: 3
            },
        ]
    }
}

export default Vue