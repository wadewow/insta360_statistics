<template>
    <div id="block" class="mui-panel mui--text-center" v-for="item in items['total']">
        <span>{{ item.name }}</span><br/>
        <span>{{ item.value }}</span>
    </div>
</template>

<script>
export default {
  name: 'Block',
  props: {
    items: Object
  }
}
</script>
<style lang='less'>
  @import '../../_less/v2/base';
  @import '../../_less/component/animation';
  #block {
    float:left;
    margin-left:50px;
    width:120px;
    height:80px;
    background:#FFD180
  }
</style>