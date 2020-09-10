
 <!-- 新闻评论 -->
<template>
    <div  class="related-wrapper">
        <div class="related-title">
            <text class="related-text">热门评论</text>
        </div>
        <div v-if="data.length">
          <div v-for="(item,index) in data" :key="index">
              <list25 :data="item"></list25>
              <div class="border-line" v-if="index !== data.length-1"></div>
          </div>
        </div>
        <div class="related-bottom" @click="goCommentList()" v-if="data.length">
            <text class="related-text" style="width:644px;text-align:center;">查看更多</text>
        </div>
        <text v-else class="no-data">暂无评论</text>
    </div>

</template>

<script>
import List25 from '../../components/list/List25.vue'
export default {
  props: ['data', 'id', 'fromid'],
  name: 'NewsComment',
  components: {
    List25
  },
  data () {
    return {
    }
  },
  methods: {
    // 去评论列表页
    goCommentList () {
      this.jumpWithParams('CommentList', {id: this.id, content_fromid: this.fromid})
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
 @import "../../style/common.scss";
.related-wrapper{
    width: 750px;
}
.related-title{
    justify-content: center;
    padding-left:32px;
    width: 750px;
    height:90px;
    border-bottom-style:solid;
    border-bottom-width:1px;
    border-bottom-color:  #EEEEEE;
}
.related-text{
    font-size: 28px;
    color: #4F4F4F;
}
.related-bottom{
    justify-content: center;
    width: 750px;
    height:90px;
    border-top-style:solid;
    border-top-width:1px;
    border-top-color:  #EEEEEE;
    text-align: center;
}
.no-data{
    font-size: 28px;
    width: 750px;
    text-align: center;
    height: 120px;
    line-height: 120px;
}
</style>
