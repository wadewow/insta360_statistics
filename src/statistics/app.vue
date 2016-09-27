<template>
  <div id="sidedrawer" class="mui--no-user-select {{ sidedrawerStatus }}">
    <div id="sidedrawer-brand" class="mui--appbar-line-height">Statistics</div>
    <div class="mui-divider"></div>
    <ul>
      <li>
        <template v-if="power['nano_sales']">
          <strong @click="toggleCollapse">Nano销售情况</strong>
        </template>
        <template v-else>
          <strong style="cursor: not-allowed;">Nano销售情况</strong>
        </template>
        <ul class="nav" show="{{ nav[0] }}">
          <li>
            <a href="#!/sales_chart/sales_status/1" @click="click">国内销售情况</a>
          </li>
          <li>
            <a href="#!/sales_chart/sales_status/0" @click="click">海外销售情况</a>
          </li>
          <li>
            <a href="#!/electronic_sales/electronic_sales" @click="click">自有电商渠道</a>
          </li>
        </ul>
      </li>
      <li>
        <template v-if="power['nano_activation']">
          <strong @click="toggleCollapse">设备激活情况</strong>
        </template>
        <template v-else>
          <strong style="cursor: not-allowed;">设备激活情况</strong>
        </template>
        <ul class="nav" show="{{ nav[1] }}">
          <li>
            <a href="#!/chart/nano_active" @click="click">激活数量走势</a>
          </li>
          <li>
            <a href="#!/active_map/nano_active_map" @click="click">激活地区分布</a>
          </li>
        </ul>
      </li>
      <li>
        <template v-if="power['nano_share']">
          <strong @click="toggleCollapse">Nano内容分享</strong>
        </template>
        <template v-else>
          <strong style="cursor: not-allowed;">Nano内容分享</strong>
        </template>
        <ul class="nav" show="{{ nav[2] }}">
          <li>
            <a href="#!/table/share_list" @click="click">分享内容列表</a>
          </li>
          <li>
            <a href="#!/chart/month_share_trends" @click="click">内容数量走势</a>
          </li>
          <li>
            <a href="#!/map/location_share" @click="click">内容地区分布</a>
          </li>
          <li>
            <a href="#!/chart/share_visitor_trend" @click="click">浏览量走势</a>
          </li>
          <li>
            <a href="#!/map/share_visitor" @click="click">访客地区分布</a>
          </li>
        </ul>
      </li>
      <li>
        <template v-if="power['nano_link']">
          <strong @click="toggleCollapse">Nano购买链接</strong>
        </template>
        <template v-else>
          <strong style="cursor: not-allowed;">Nano购买链接</strong>
        </template>
        <ul class="nav" show="{{ nav[3] }}">
          <li>
            <a href="#!/chart/nano_store" @click="click">店铺流量分布</a>
          </li>
          <li>
            <a href="#!/chart/buylink_store_trends" @click="click">店铺流量走势</a>
          </li>
          <li>
            <a href="#!/chart/click_buylink" @click="click">点击购买按钮者地区分布</a>
          </li>
          <li>
            <a href="#!/link_query/link_query" @click="click">导流链接查询</a>
          </li>
          <li>
            <a href="#!/landing_page/landing_page" @click="click">新LandingPage点击购买情况</a>
          </li>
        </ul>
      </li>
      <li>
        <template v-if="power['nano_market']">
          <strong @click="toggleCollapse">Nano市场环境</strong>
        </template>
        <template v-else>
          <strong style="cursor: not-allowed;">Nano市场环境</strong>
        </template>
        <ul class="nav" show="{{ nav[4] }}">
          <li>
            <a href="#!/chart/market_environment" @click="click">百度指数</a>
          </li>
          <li>
            <a href="#!/competitor_chart/competitor_data/taobao" @click="click">30天销量/评论</a>
          </li>
        </ul>
      </li>
      <li>
        <template v-if="power['nano_use_condition']">
          <strong @click="toggleCollapse">Nano App使用情况</strong>
        </template>
        <template v-else>
          <strong style="cursor: not-allowed;">Nano App使用情况</strong>
        </template>
        <ul class="nav" show="{{ nav[5] }}">
          <li>
            <a href="#!/chart/use_condition" @click="click">用户概况</a>
          </li>
          <!--<li>
            <a href="#!/chart/content_production" @click="click">内容生产</a>
          </li>-->
          <li>
            <a href="#!/map/user_distribution" @click="click">APP用户区域分布</a>
          </li>
          <li>
            <a href="#!/chart/error_condition" @click="click">错误异常</a>
          </li>
        </ul>
      </li>
      <li>
        <template v-if="power['nano_history']">
          <strong @click="toggleCollapse">历史总数</strong>
        </template>
        <template v-else>
          <strong style="cursor: not-allowed;">历史总数</strong>
        </template>
        <ul class="nav" show="{{ nav[6] }}">
          <li>
            <a href="#!/rest_statistics/rest_statistics" @click="click">历史总数据</a>
          </li>
          <li>
            <a href="#!/knowmore/knowmore" @click="click">Knowmore点击比例</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <header id="header">
    <div class="mui-appbar mui--appbar-line-height">
      <div class="mui-container-fluid">
        <a class="sidedrawer-toggle mui--visible-xs-inline-block mui--visible-sm-inline-block" @click="toggleSidedrawer">☰</a>
        <a class="sidedrawer-toggle mui--hidden-xs mui--hidden-sm" @click="toggleSidedrawer">☰</a>
        <span class="mui--text-title mui--visible-xs-inline-block mui--visible-sm-inline-block">Statistics</span>
        <span class="mui--text-title" id="name">{{ name }}</span>
        <span id="comment" style="margin-left:20px">{{ comment }}</span>
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
</template>

<script>
import store from './_store/store'
import { getChartList, getChartName, getChartComment, getPower, getNav, getUsername } from './_store/getters'
export default {

  store: store,

  vuex: {
    actions: {
    },
    getters: {
      name: getChartName,
      list: getChartList,
      comment: getChartComment,
      power: getPower,
      nav: getNav,
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
  created () {
    var nav = this.getCookie('nav')
    if (nav !== '') {
      store.state.userInfo.nav = JSON.parse(this.getCookie('nav'))
    }
  },
  ready () {
    var els = document.getElementsByClassName('nav')
    for (var i = 0; i < els.length; i++) {
      els[i].setAttribute('style', els[i].getAttribute('show') === 'show' ? 'display:block' : 'display:none')
    }
  },
  methods: {
    toggleSidedrawer (ev) {
      this.sidedrawerActive = !this.sidedrawerActive
      this.$el.parentNode.className = this.sidedrawerActive ? '' : 'hide-sidedrawer'

      // this is for overlay
      this.sidedrawerStatus = this.sidedrawerActive ? 'active' : ''
    },
    getCookie (c_name) {
      if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + '=')
        if (c_start !== -1) {
          c_start = c_start + c_name.length + 1
          var c_end = document.cookie.indexOf(';', c_start)
          if (c_end === -1) {
            c_end = document.cookie.length
          }
          return unescape(document.cookie.substring(c_start, c_end))
        }
      }
      return ''
    },
    toggleCollapse (ev) {
      var src = ev.srcElement || ev.target
      var _el = src.nextElementSibling || this.getNextSibling(src)
      if (_el.getAttribute('show') === null) {
        _el.setAttribute('show', 'hide')
      }
      _el.setAttribute('style', _el.getAttribute('show') === 'hide' ? 'display:block' : 'display:none')
      // _el.style = _el.getAttribute('show') === 'show' ? 'display:block' : 'display:none'
      _el.setAttribute('show', _el.getAttribute('show') === 'hide' ? 'show' : 'hide')

      var els = document.getElementsByClassName('nav')
      for (var i = 0; i < els.length; i++) {
        store.state.userInfo.nav[i] = els[i].getAttribute('show')
      }

      // 记录菜单展开状态的cookie
      var lifeTime = new Date()
      lifeTime.setTime(lifeTime.getTime() + 1000 * 60 * 60 * 2)
      var navJson = JSON.stringify(store.state.userInfo.nav)
      document.cookie = 'nav=' + navJson + ';expires=' + lifeTime.toUTCString()
    },

    getNextSibling (node) {
      do { node = node.nextSibling } while (node && node.nodeType !== 1)
      return node
    },

    click (ev) {
      var s = document.getElementsByClassName('selected')
      for (var i = 0; i < s.length; i++) {
        s[i].setAttribute('class', '')
      }
      var src = ev.srcElement || ev.target
      var li = src.parentNode
      li.setAttribute('class', 'selected')
    },
    logout () {
      var lifeTime = new Date()
      lifeTime.setTime(lifeTime.getTime() - 1)
      document.cookie = 'isLogin=' + 'true' + ';expires=' + lifeTime.toUTCString()
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
      left: 200px;
    }
    #sidedrawer {
      transform: translate(200px);
    }
    #content-wrapper {
      margin-left: 200px;
    }
    #footer {
      margin-left: 200px;
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
  * Sidedrawer CSS
  */
  
  #sidedrawer-brand {
    padding-left: 20px;
    font-size: 20px;
    font-weight: 400;
  }
  
  #sidedrawer {
    /**
    * Toggle Sidedrawer
    */
    &.active {
      transform: translate(200px);
    }
    ul {
      list-style: none;
    }
    > ul {
      padding-left: 0px;
      li {
        > ul {
          padding-left: 0px;
          display: none;
          li {
            
            display: block;
            cursor: pointer;
            &:hover {
              background-color: #E0E0E0;
            }
            > a {
              padding-left: 25px;
              display: block;
              width: 100%;
              min-height: 32px;
              line-height: 32px;
              &:hover {
                text-decoration: none;
              }
              &:active {
                color: #0000FF;
              }
            }
          }
          .selected {
            background-color: #E0E0E0;
          }
        }
      }
      > li:first-child {
        padding-top: 15px;
      }
    }
    strong {
      display: block;
      padding: 15px 15px;
      cursor: pointer;
      &:hover {
        background-color: #E0E0E0;
      }
  
    }
    strong + ul > li {
      padding: 0px 0px;
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