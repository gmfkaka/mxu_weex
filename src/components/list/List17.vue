<!-- 上标题  下日期阅读数 start -->
<template>
  <div class="wrapper">
    <text class="list-title">{{data.title}}</text>
      <bottom2 :data="data"></bottom2>
  </div>
</template>

<script>
import Bottom2 from '../bottom/Bottom2'
export default {
  props: ['data'],
  name: 'List17',
  components: {
    Bottom2
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
   margin-bottom:24px;
}

</style>
