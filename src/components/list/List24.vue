<!-- 左标题右图 相关推荐start-->
<template>
    <div  class="list-two-wrapper" @click="jumpDetail(data)">
        <!-- 左边 -->
        <div class="list-two-left">
            <text class="two-title">{{data.title}}</text>
        </div>
        <!-- 左边 end-->

        <!-- 右边 start -->
        <div class="list-two-right" v-if="data.index_pic">
            <image :src="data.index_pic" class="two-img-style"></image>
        </div>
        <!-- 右边 end -->

    </div>

</template>

<script>
export default {
  props: ['data'],
  name: 'List24',
  components: {
  },
  data () {
    return {

    }
  },
  methods: {
    // 跳转详情页
    jumpDetail (item) {
      console.log(item)
      if (item.bundle_id === 'news') {
        this.jumpWithParams('NewsDetail', {id: item.id})
      } else if (item.type === 'gallery') {
        this.jumpWithParams('GalleryDetail', {id: item.id})
      } else if (item.type === 'topic') {
        this.jumpWithParams('TopicDetail', {id: item.id})
      }
    }
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
    lines:3;
    text-overflow:ellipsis;
}
//  list底部

.list-two-left{
    flex:1;
}
.list-two-right{
    width: 200px;
    margin-left:40px;
}
.two-img-style{
    width: 200px;
    height:144px;
}
</style>
