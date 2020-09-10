 <!-- 右标题左图  上标题 下日期阅读数start-->
<template>
    <div  class="list-two-wrapper">
        <!-- 左边 start -->
        <div class="list-two-right" v-if="data.index_pic" resize="cover">
            <image :src="cutCover(data.index_pic,222,145)" class="two-img-style"></image>
        </div>
        <!-- 左边 end -->
        <!-- 右边 -->
        <div class="list-two-left">
            <text class="two-title">{{data.title}}</text>
        <!-- 底部  start-->
            <bottom2 :data="data"></bottom2>
        <!-- 底部  end-->

        </div>
        <!-- 右边 end-->

    </div>

</template>

<script>
import Bottom2 from '../bottom/Bottom2'
export default {
  props: ['data'],
  name: 'List15',
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
.list-two-wrapper{
    background-color: #fff;
    padding-left:32px;
    padding-right:32px;
    padding-top:10px;
    padding-bottom:12px;
    flex-direction: row;
}
.two-title{
    color:#333333;
    font-size: 28px;
    flex:1;
    lines:2;
    text-overflow:ellipsis;
}
//  list底部

.list-two-left{
    flex:1;
}
.list-two-right{
    width: 222px;
    margin-right:18px;
}
.two-img-style{
    width: 222px;
    height:145px;
}
</style>
