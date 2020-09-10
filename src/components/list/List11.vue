 <!-- 右标题左图  上标题 下栏目阅读数start-->
<template>
    <div  class="list-two-wrapper">
        <!-- 左边 start -->
        <div class="list-two-right" v-if="data.index_pic">
            <image :src="data.index_pic"  resize="cover" class="two-img-style"></image>
        </div>
        <!-- 左边 end -->
        <!-- 右边 -->
        <div class="list-two-left">
            <text class="two-title">{{data.title}}</text>
        <!-- 底部  start-->
            <bottom1 :data="data"></bottom1>
        <!-- 底部  end-->

        </div>
        <!-- 右边 end-->

    </div>

</template>

<script>
import Bottom1 from '../bottom/Bottom1'
export default {
  props: ['data'],
  name: 'List2',
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
.list-two-wrapper{
    background-color: #fff;
    padding-left:32px;
    padding-right:32px;
    padding-top:28px;
    padding-bottom:32px;
    flex-direction: row;
}
.two-title{
    color:#333333;
    font-size: 34px;
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
    height:160px;
}
</style>
