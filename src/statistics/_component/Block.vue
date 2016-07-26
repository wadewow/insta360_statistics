<template>
    <div class="mui-panel mui--text-center" style="float:left;margin-left:50px;width:120px;height:80px" v-for="item in items['total']">
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