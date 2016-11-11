<template>
  <div class="mui-container">
    <ul class="mui-tabs__bar">
      <template v-if="(power['native_sales'])">
        <li class="tab mui--is-active"><a data-mui-toggle="tab" @click="change('pane1',$event)">国内销售情况录入</a></li>
      </template>
      <template v-else>
        <li class="tab"><a style="cursor: not-allowed;" data-mui-toggle="tab">国内销售情况录入</a></li>
      </template>
      <template v-if="(!power['native_sales'] && power['abroad_sales'])">
        <li class="tab mui--is-active"><a data-mui-toggle="tab" @click="change('pane2',$event)">国外销售情况录入</a></li>
      </template>
      <template v-if="(!power['abroad_sales'])">
        <li class="tab"><a style="cursor: not-allowed;" data-mui-toggle="tab">国外销售情况录入</a></li>
      </template>
      <template v-if="(power['native_sales'] && power['abroad_sales'])">
        <li class="tab"><a data-mui-toggle="tab" @click="change('pane2',$event)">国外销售情况录入</a></li>
      </template>
      <template v-if="(!power['native_sales'] && !power['abroad_sales'] && power['electronic_sales'])">
        <li class="tab mui--is-active"><a data-mui-toggle="tab" @click="change('pane3',$event)">电商销售情况录入</a></li>
      </template>
      <template v-if="((power['native_sales']||power['abroad_sales']) && power['electronic_sales'])">
        <li class="tab"><a data-mui-toggle="tab" @click="change('pane3',$event)">电商销售情况录入</a></li>
      </template>
      <template v-if="(!power['electronic_sales'])">
        <li class="tab"><a style="cursor: not-allowed;" data-mui-toggle="tab">电商销售情况录入</a></li>
      </template>
    </ul>

    <template v-if="(power['native_sales'])">
      <div class="mui-tabs__pane mui--is-active" id="pane1">
        <Salesnative></Salesnative>
      </div>
    </template>
    
    <template v-if="(!power['native_sales'] && power['abroad_sales'])">
      <div class="mui-tabs__pane mui--is-active" id="pane2">
        <Salesabroad></Salesabroad>
      </div>
    </template>
    
    <template v-if="(power['native_sales'] && power['abroad_sales'])">
      <div class="mui-tabs__pane" id="pane2">
        <Salesabroad></Salesabroad>
      </div>
    </template>
    
    <template v-if="((!power['native_sales']) && (!power['abroad_sales']) && power['electronic_sales'])">
      <div class="mui-tabs__pane mui--is-active" id="pane3">
        <Electronicsales></Electronicsales>
      </div>
    </template>
    <template v-if="((power['native_sales']||power['abroad_sales']) && power['electronic_sales'])">
      <div class="mui-tabs__pane" id="pane3">
        <Electronicsales></Electronicsales>
      </div>
    </template>

    <template v-if="((!power['native_sales']) && (!power['abroad_sales']) && (!power['electronic_sales']))">
      <div class="mui-tabs__pane mui--is-active" id="pane4">
        <div class="mui-container-fluid">
          <div class="mui-row">
            <div class="mui-col-md-3"></div>
            <div class="mui-col-md-3">
              <h1>无权限</h1>
            </div>
            <div class="mui-col-md-6"></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import store from './_store/store'
import Salesnative from './_component/SalesNative'
import Salesabroad from './_component/SalesAbroad'
import Electronicsales from './_component/ElectronicSales'
import { getPower } from './_store/getters.js'
export default {
  name: 'DataEntry',

  components: {
    Salesnative,
    Salesabroad,
    Electronicsales
  },

  store: store,

  vuex: {
    getters: {
      power: getPower
    }
  },

  data () {
    return {
    }
  },

  created () {
  },

  methods: {
    change (val, ev) {
      var tabs = document.getElementsByClassName('tab')
      for (var i = 0; i < tabs.length; i++) {
        tabs[i].setAttribute('class', 'tab')
      }
      var src = ev.srcElement || ev.target
      var li = src.parentNode
      li.setAttribute('class', 'tab mui--is-active')

      var panels = document.getElementsByClassName('mui-tabs__pane')
      for (i = 0; i < panels.length; i++) {
        panels[i].setAttribute('class', 'mui-tabs__pane')
      }
      var panel = document.getElementById(val)
      panel.setAttribute('class', 'mui-tabs__pane mui--is-active')
    }
  },

  route: {
    data ({ to }) {
    }
  },

  events: {
  }

}
</script>

<style lang="less">
  @import "../_less/v2/base";
  @import "../_less/component/animation";
</style>