// 上标题 下图 下日期阅读数
<template>
  <div class="wrapper">
      <text class="title">{{data.title}}</text>
      <image :src="data.index_pic" class="img" v-if="data.index_pic" resize="cover"></image>
      <bottom2 :data="data"></bottom2>
  </div>
</template>

<script>
import Bottom2 from '../bottom/Bottom2'
export default {
  props: ['data'],
  name: 'List4',
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
.title{
    font-size: 34px;
    color: #333333;
    lines:2;
    text-overflow:ellipsis;
    width: 686px;
    margin-bottom:16px;
}
.img{
    width: 686px;
    height: 386px;
    margin-bottom:28px;
}
</style>
