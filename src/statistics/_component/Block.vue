<template>
  <div>
    <div id="block" class="mui-panel mui--text-center" v-for="item in items['total']">
        <template v-for="i in item"><span>{{ i }}</span><br/></template>
        <!--<span>{{ item.value }}</span><br/>
        <span>{{ item.comment }}</span>-->

    </div>
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
    margin-left:30px;
    width:150px;
    height:100px;
    margin-bottom:0px;
    margin-top:5px;
    background:#FFD180;
  }
</style>