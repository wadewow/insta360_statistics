<template>
  <body>
  <header id="header">
    <div class="mui-appbar mui--appbar-line-height">
      <div class="mui-container-fluid ">
        <span class="mui--text-title">销售数据录入系统</span>
        <a href="#/login" @click="logout" class="mui-btn right" style="margin-top:12px">退出</a>
        <span class="right" style="margin-right:10px">欢迎您，{{ username }}</span>
      </div>
    </div>
  </header>
  <div id="content-wrapper">
    <div class="mui--appbar-height"></div>
    <div class="mui-container-fluid">
      <router-view class="view" keep-alive transition transition-mode="out-in">
      </router-view>
    </div>
  </div>
  <footer id="footer">
    <div class="mui-container-fluid">
      <p class="text-right copy-right">Copyright © {{year}} Arashi Vision All Rights Reserved.</p>
    </div>
  </footer>
  </body>
</template>

<script>
import store from './_store/store'
import { getUsername } from './_store/getters.js'
export default {

  store: store,
  vuex: {
    getters: {
      username: getUsername
    }
  },
  data () {
    return {
      sidedrawerActive: true,
      sidedrawerStatus: 'active',
      year: new Date().getFullYear()
      // comment: ' '
    }
  },
  methods: {
    toggleSidedrawer (ev) {
      this.sidedrawerActive = !this.sidedrawerActive
      this.$el.parentNode.className = this.sidedrawerActive ? '' : 'hide-sidedrawer'

      // this is for overlay
      this.sidedrawerStatus = this.sidedrawerActive ? 'active' : ''
    },
    logout () {
      var lifeTime = new Date()
      lifeTime.setTime(lifeTime.getTime() - 1)
      document.cookie = 'isLoginBI=' + 'true' + ';expires=' + lifeTime.toUTCString()
      return true
    }
  }
}
</script>

<style lang="less">
  /**
  * Body CSS
  */
  
  html,
  body {
    height: 100%;
  }
  
  html,
  body,
  input,
  textarea,
  buttons {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
  }
  /**
  * Layout CSS
  */
  
  #header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 2;
    transition: left 0.2s;
  }
  
  #sidedrawer {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 200px;
    left: -200px;
    overflow: auto;
    z-index: 2;
    background-color: #fff;
    transition: transform 0.2s;
    box-shadow: 1px 0 0 rgba(0, 0, 0, 0.1);
  }
  
  #content-wrapper {
    min-height: 100%;
    overflow-x: hidden;
    margin-left: 0px;
    transition: margin-left 0.2s;
    /* sticky bottom */
    margin-bottom: -64px;
    padding-bottom: 64px;
  }
  
  #footer {
    height: 64px;
    margin-left: 0px;
    transition: margin-left 0.2s;
  }
  
  @media (min-width: 768px) {
    #header {
      left: 0px;
    }
    #sidedrawer {
      transform: translate(200px);
    }
    #content-wrapper {
      margin-left: 0px;
    }
    body {
      &.hide-sidedrawer {
        #sidedrawer {
          transform: translate(0px);
        }
        #header {
          left: 0;
        }
        #content-wrapper {
          margin-left: 0;
        }
        #footer {
          margin-left: 0;
        }
      }
    }
  }
  /**
  * Header CSS
  */
  
  .sidedrawer-toggle {
    color: #fff;
    cursor: pointer;
    font-size: 20px;
    line-height: 20px;
    margin-right: 10px;
    &:hover {
      color: #fff;
      text-decoration: none;
    }
  }

  /**
  * Footer CSS
  */
  #footer {
    background-color: #0288D1;
    color: #fff;
    a {
      color: #fff;
      text-decoration: underline;
    }
    .copy-right {
      line-height: 64px;
      margin: 0;
    }
  }
</style>