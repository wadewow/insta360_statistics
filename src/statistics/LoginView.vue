<template>
    <login :name="name"></simpletable>
</template>

<script>
import Login from './_component/Login'
import store from './_store/store'

export default {
  name: 'LoginView',

  components: {
    Login
  },

  store: store,

  vuex: {
    getters: {

    }
  },

  data () {
    return {
    }
  },

  created () {
  },

  methods: {
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