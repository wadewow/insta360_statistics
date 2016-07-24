<template>
  <div class="blog">
    <post v-for="post in list" :post="post"></post>
    <div class="pager">
      
      <a class="mui-btn mui-btn--raised mui-btn--primary prev" @click='prev'>prev</a>
      <span class="current">{{page}}</span>
      <a class="mui-btn mui-btn--raised mui-btn--primary next" @click='next'>next</a>
    </div>
  </div>
</template>

<script>
import store from './_store/store'
import Post from './_component/Post'

import { prevPage, nextPage } from './_store/actions'
import { getPostsPage, getPostsList } from './_store/getters'

export default {
  name: 'PostsView',

  components: {
    Post
  },

  store: store,

  vuex: {
    actions: {
      prev: prevPage,
      next: nextPage
    },
    getters: {
      page: getPostsPage,
      list: getPostsList
    }
  },

  route: {
    data ({ to }) {
    }
  }
}
</script>

<style lang="less">
  @import "../_less/v2/base";
  @import "../_less/component/animation";
  .pager{
    text-align: right;
    .prev,
    .next{
      display: inline-block;
    }
    .current{
      padding:0.2em 1em;
    }
  }
</style>