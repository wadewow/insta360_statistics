<template>
<div class="login_div">
  <form class="login">
    <legend>登录</legend>
    <div class="mui-textfield">
      <input type="text" id="username" v-model="username" name="username" placeholder="Username">
    </div>
    <div class="mui-textfield">
      <input type="password" id="password" v-model="password" name="password" placeholder="Password">
    </div>
    <button type="submit" @click="submit" class="mui-btn mui-btn--raised">登录</button>
    <span style="color:red;margin-left:10px"> {{ tip }}</span>
  </form>
</div>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import store from '../_store/store'
import Api from '../_store/_api'
import Serializer from '../_store/_serializer'
Vue.use(Router)
var router = new Router()
export default {
  name: 'Login',
  props: {
  },
  store: store,
  data () {
    return {
      username: '',
      password: '',
      tip: ''
    }
  },
  methods: {
    submit (ev) {
      ev.preventDefault()
      // if (this.username === 'insta360_admin' && this.password === '50lan123') {
      //   this.tip = ''
      //   var lifeTime = new Date()
      //   store.state.isLogin = true
      //   lifeTime.setTime(lifeTime.getTime() + 1000 * 60 * 60 * 2)
      //   document.cookie = 'isLoginBI=' + 'true' + ';expires=' + lifeTime.toUTCString()
      //   document.cookie = 'usernameBI=' + store.state.userInfo.username + ';expires=' + lifeTime.toUTCString()
      //   var powerJson = JSON.stringify(store.state.userInfo.power)
      //   document.cookie = 'powerBI=' + powerJson + ';expires=' + lifeTime.toUTCString()
      //   router.go('/DataEntry')
      //   return
      // }
      const query = {
        username: this.username,
        password: this.password
      }
      var result = false
      Vue.http.get(Api['login'].url, { params: query }).then((res) => {
      // success callback
        const jsonData = JSON.parse(res.body)
        result = jsonData['result']
        var lifeTime = new Date()
        if (result) {
          this.tip = ''
          store.state.isLogin = true
          store.state.userInfo = Serializer[Api['login'].serialize](jsonData)
          lifeTime.setTime(lifeTime.getTime() + 1000 * 60 * 60 * 2)
          document.cookie = 'isLoginBI=' + 'true' + ';expires=' + lifeTime.toUTCString()
          document.cookie = 'usernameBI=' + store.state.userInfo.username + ';expires=' + lifeTime.toUTCString()
          var powerJson = JSON.stringify(store.state.userInfo.power)
          document.cookie = 'powerBI=' + powerJson + ';expires=' + lifeTime.toUTCString()
          router.go('/DataEntry')
          location.reload()
        } else {
          store.state.isLogin = false
          this.tip = '账号或密码错误！'
          lifeTime.setTime(lifeTime.getTime() - 1)
          document.cookie = 'isLoginBI=' + 'true' + ';expires=' + lifeTime.toUTCString()
        }
      }, (res) => {
      // error callback
        console.log(res)
        store.state.isLogin = false
        this.tip = '网络连接失败！'
      })
    }
  }
}

</script>
<style lang='less'>
  @import '../../_less/v2/base';
  @import '../../_less/component/animation';
  .login_div {
    position:absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0.8;
    z-index: 999;
    background: black;
  }
  .login {
    width: 550px;
    height: 320px;
    background: white;
    margin: 200px auto;
    padding: 30px 50px;
    border-radius:10px;
  }
</style>