 <!-- 上标题 中图  下栏目日期阅读数 -->
<template>
  <div class="wrapper">
        <text class="title">{{data.title}}</text>
        <div class="img-box" v-if="data.index_pic" resize="cover">
           <image :src="data.index_pic" class="img"></image>
        </div>

        <bottom1 :data="data"></bottom1>
    </div>
</template>

<script>
import Bottom1 from '../bottom/Bottom1'
export default {
  props: ['data'],
  name: 'List7',
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
.title{
    font-size: 34px;
    color: #333333;
    lines:2;
    text-overflow:ellipsis;
    width: 686px;
}
.img{
  margin-top:16px;
  width: 686px;
  height:386px;
  border-bottom-left-radius:4px;
  border-bottom-right-radius:4px;
  border-top-left-radius:4px;
  border-top-right-radius:4px;
}
.img-box{
  width: 686px;
  height:386px;
  position: relative;
}

</style>
