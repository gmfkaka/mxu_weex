 <!-- 上标题 下大图带video 下栏目 start -->
<template>
  <div class="wrapper">
    <text class="list-title">{{data.title}}</text>
      <div class="list-image-box">
          <image :src="data.index_pic" class="list-image" resize="cover"></image>
          <image :src="getLocalImgUrl('icon_radioplayer3x.png')" class="icon"></image>
      </div>
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
   margin-bottom:20px;
}
.list-image-box{
    width: 686px;
    height:386px;
    position: relative;
}
.list-image{
    width: 686px;
    height:386px;
}
.icon{
  width:88px;
  height:88px;
  position: absolute;
  top:148px;
  left:298px;
}
</style>
