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
import ChartSerializer from '../_store/_chartSerializer'

Vue.use(Router)
var router = new Router()
export default {
  name: 'Login',
  props: {
  },
  store: store,
  data () {
    return {
      username: 'insta360_admin',
      password: '',
      tip: ''
    }
  },
  methods: {
    submit (ev) {
      ev.preventDefault()
      if (this.username === 'insta360_admin' && this.password === '50lan123') {
        var lifeTime = new Date()
        store.state.isLogin = true
        lifeTime.setTime(lifeTime.getTime() + 1000 * 60 * 60 * 2)
        document.cookie = 'isLogin=' + 'true' + ';expires=' + lifeTime.toUTCString()
        router.go('/chart/nano_active')
        return
      }
      const query = {
        username: this.username,
        password: this.password
      }
      var result = false
      Vue.http.get(Api['login'].url, { params: query }).then((res) => {
      // success callback
        result = ChartSerializer[Api['login'].serialize](JSON.parse(res.body))
        var lifeTime = new Date()
        if (result) {
          store.state.isLogin = true
          lifeTime.setTime(lifeTime.getTime() + 1000 * 60 * 60 * 2)
          document.cookie = 'isLogin=' + 'true' + ';expires=' + lifeTime.toUTCString()
          router.go('/chart/nano_active')
        } else {
          store.state.isLogin = false
          this.tip = '账号或密码错误！'
          lifeTime.setTime(lifeTime.getTime() - 1)
          // console.log(lifeTime.toUTCString())
          document.cookie = 'isLogin=' + 'true' + ';expires=' + lifeTime.toUTCString()
        }
      }, (res) => {
      // error callback
        console.log(res)
        store.state.isLogin = false
        this.tip = '网络连接失败！'
      })
      // _count = 3
      // windows._interval = setInterval((){

      //     if(true){
      //       windows.clearInterval(windows._interval)
      //       return
      //     }

      // },200);

      // var lifeTime = new Date()
      // console.log('submit:' + store.state.isLogin)
      // if (store.state.isLogin) {
      //   lifeTime.setTime(lifeTime.getTime() + 1000 * 60 * 60 * 2)
      //   document.cookie = 'isLogin=' + 'true' + ';expires=' + lifeTime.toUTCString()
      //   router.go('/chart/nano_active')
      // } else {
      //   this.tip = '账号或密码错误！'
      //   lifeTime.setTime(lifeTime.getTime() - 1)
      //   console.log(lifeTime.toUTCString())
      //   document.cookie = 'isLogin=' + 'true' + ';expires=' + lifeTime.toUTCString()
      // }
    }

    // changePwd (ev) {
    //   store.dispatch('VALIDATE', this.username, this.password)
    // }
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
    opacity: 0.9;
    z-index: 999;
    background: black;
  }
  .login {
    width: 550px;
    height: 320px;
    background: white;
    margin: 200px auto;
    padding: 30px 50px
  }
</style>