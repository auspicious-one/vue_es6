import Vue from './controller/vue'
import "./assets/style/main.css"

new Vue({
    el: "#app",
    data: {
        username: "",
        password: "",
        input_tips: ""
    },
    methods: {
        check() {
            this.input_tips = ''
            if (this.username == '' || this.username.length < 6) {
                this.input_tips = "<p style='color:red;'>账户名输入不规范</p>"
                return
            }
            if (this.password == '' || this.password.length < 6) {
                this.input_tips += "<p style='color:blue;'>密码输入不规范</p>"
                return
            }
        }
    }
})