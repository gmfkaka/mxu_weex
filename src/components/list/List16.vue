 <!-- 上标题  下栏目 start -->
<template>
  <div class="wrapper">
    <text class="list-title">{{data.title}}</text>
      <bottom1 :data="data"></bottom1>
  </div>
</template>

<script>
import Bottom1 from '../bottom/Bottom1'
export default {
  props: ['data'],
  name: 'List3',
  components: {
    Bottom1
  },
  data () {
    return {
    }
  },
  methods: {

  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.wrapper {
    background-color: #ffffff;
    padding-left:32px;
    padding-right:32px;
    padding-top:28px;
    padding-bottom:32px;
}
.list-title{
   font-size: 34px;
   color: #333333;
   width: 668px;
   lines:2;
   text-overflow:ellipsis;
}
</style>
