 <!-- 上标题 下播放器 -->
<template>
  <div class="wrapper">
        <div class="img-box">
           <image :src="data.index_pic" class="img" resize="cover"></image>
        </div>
         <text class="title">{{data.title}}</text>
        <bottom3 :data="data"></bottom3>
    </div>
</template>

<script>
import Bottom3 from '../bottom/Bottom3'
export default {
  props: ['data'],
  name: 'List21',
  components: {
    Bottom3
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
    margin-top:12px;
}
.img{
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
