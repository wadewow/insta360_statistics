<template>
  <div id="sidedrawer" class="mui--no-user-select {{ sidedrawerStatus }}">
    <div id="sidedrawer-brand" class="mui--appbar-line-height">Statistics</div>
    <div class="mui-divider"></div>
    <ul>
      <!--主菜单-->
      <!--<li>
        <strong @click="toggleCollapse">主页面板</strong>
        <ul>
          <li><a v-link="{ path: '/posts/1' }">Home</a></li>
        </ul>
      </li>-->
      <!--nano激活-->
      <li>
        <strong @click="toggleCollapse">设备激活情况</strong>
        <ul style="display:block">
          <li>
            <a href="#!/chart/nano_active" @click="setComment(0)">激活数量走势</a>
          </li>
          <li>
            <a href="#!/active_map/nano_active_map" @click="setComment(0)">激活地区分布</a>
          </li>
        </ul>
      </li>
      <li>
        <strong @click="toggleCollapse">Nano内容分享</strong>
        <ul style="display:block">
          <li>
            <a href="#!/table/share_list" @click="setComment(1)">分享列表明细</a>
          </li>
          <li>
            <a href="#!/chart/month_share_trends" @click="setComment(1)">分享数量走势</a>
          </li>
          <li>
            <a href="#!/map/location_share" @click="setComment(1)">分享地区分布</a>
          </li>
          <li>
            <a href="#!/chart/share_visitor_trend" @click="setComment(1)">浏览次数走势</a>
          </li>
          <li>
            <a href="#!/map/share_visitor" @click="setComment(1)">浏览地区分布</a>
          </li>
        </ul>
      </li>
      <li>
        <strong @click="toggleCollapse">Nano购买链接</strong>
        <ul style="display:block">
          <li>
            <a href="#!/chart/nano_store" @click="setComment(2)">店铺流量分布</a>
          </li>
          <li>
            <a href="#!/chart/buylink_store_trends" @click="setComment(2)">店铺流量走势</a>
          </li>
          <li>
            <a href="#!/chart/click_buylink" @click="setComment(2)">链接点击地区分布</a>
          </li>
        </ul>
      </li>
      <li>
        <strong @click="toggleCollapse">历史总数</strong>
        <ul style="display:block">
          <li>
            <a href="#!/rest_statistics/rest_statistics" @click="setComment(1)">历史总数据</a>
          </li>
        </ul>
      </li>
      <!--示例内容-->
      <!--<li>
        <strong @click="toggleCollapse">示例内容</strong>
        <ul style="display:block">
          <li class="li-chart" v-for="chart in list">
            <a href="{{'#/chart/' + chart.url}}">{{chart.name}}</a>
          </li>
        </ul>
      </li>-->
    </ul>
  </div>
  <header id="header">
    <div class="mui-appbar mui--appbar-line-height">
      <div class="mui-container-fluid">
        <a class="sidedrawer-toggle mui--visible-xs-inline-block mui--visible-sm-inline-block" @click="toggleSidedrawer">☰</a>
        <a class="sidedrawer-toggle mui--hidden-xs mui--hidden-sm" @click="toggleSidedrawer">☰</a>
        <span class="mui--text-title mui--visible-xs-inline-block mui--visible-sm-inline-block">Statistics</span>
        <span class="mui--text-title" id="name"> {{ name }}</span>
        <span id="comment"> {{ comment }}</span>
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
import { getChartList, getChartName } from './_store/getters'
// import dict_comment from './_store/dict_comment.json'
export default {

  store: store,

  vuex: {
    actions: {
    },
    getters: {
      name: getChartName,
      list: getChartList
    }
  },

  data () {
    return {
      sidedrawerActive: true,
      sidedrawerStatus: 'active',
      year: new Date().getFullYear(),
      comment: ' '
    }
  },
  methods: {
    toggleSidedrawer (ev) {
      this.sidedrawerActive = !this.sidedrawerActive
      this.$el.parentNode.className = this.sidedrawerActive ? '' : 'hide-sidedrawer'

      // this is for overlay
      this.sidedrawerStatus = this.sidedrawerActive ? 'active' : ''
    },

    toggleCollapse (ev) {
      var src = ev.srcElement || ev.target
      var _el = src.nextElementSibling || this.getNextSibling(src)
      if (_el.getAttribute('show') === null) {
        _el.setAttribute('show', 'show')
      }
      _el.setAttribute('style', _el.getAttribute('show') === 'show' ? 'display:block' : 'display:none')
      // _el.style = _el.getAttribute('show') === 'show' ? 'display:block' : 'display:none'
      _el.setAttribute('show', _el.getAttribute('show') === 'hide' ? 'show' : 'hide')
    },

    getNextSibling (node) {
      do { node = node.nextSibling } while (node && node.nodeType !== 1)
      return node
    },

    setComment (val) {
      if (val === 0) {
        this.comment = '6月7日 开始统计'
      } else if (val === 1) {
        this.comment = '6月21日 18:00 开始统计'
      } else if (val === 2) {
        this.comment = '7月29日 开始统计'
      }
      // this.comment = dict_comment[val]
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
              padding-left: 40px;
              display: block;
              width: 100%;
              height: 32px;
              line-height: 32px;
              &:hover {
                text-decoration: none;
              }
              &:active {
                color: #0000FF;
              }
            }
          }
        }
      }
      > li:first-child {
        padding-top: 15px;
      }
    }
    strong {
      display: block;
      padding: 15px 22px;
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