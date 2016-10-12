<template>
  <header id="header">
    <div class="mui-appbar mui--appbar-line-height">
      <div class="mui-container-fluid">
        <span class="mui--text-title">Nano内容分享</span>
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
</template>

<script>
import store from './_store/store'
export default {

  store: store,

  vuex: {
    actions: {
    },
    getters: {
    }
  },

  data () {
    return {
      sidedrawerActive: true,
      sidedrawerStatus: 'active',
      year: new Date().getFullYear()
      // comment: ' '
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
    min-width: 850px
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
    min-width: 850px;
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