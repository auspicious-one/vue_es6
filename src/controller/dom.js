import bg_img from '../assets/image/bg.jpeg'

class Dom {
    constructor() {
        const app = document.querySelector("#app")
        const ele = document.createElement(this.config().ele)
        ele.innerHTML = this.config().default
        ele.id = this.config().id
        app.appendChild(ele)

        const img = new Image()
        img.src = bg_img
        img.style.width = '50%'
        img.style.margin = '0 auto'

        img.onload = () => {
            console.log('loaded')
        }
        app.appendChild(img)
        this.update()
        this.event()
    }
    update() {
        let i = 0
        let ele = document.querySelector("#" + this.config().id)
        console.log(ele)
        setInterval(() => {
            i++
            ele.innerHTML = this.config().default + `<p>已经累计运行：${i} 秒</p>`
        }, 1000)
    }
    config() {
        return {
            ele: "p",
            id: 'main',
            default: 'Dom.js'
        }
    }
}

export default Dom