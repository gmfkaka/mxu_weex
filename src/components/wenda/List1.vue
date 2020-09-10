<!-- 上中下列表 -->
<template>
    <div class="dynamic-list-content">
        <!-- 上方标题 -->
        <title1 :data="data"></title1>
          <!-- 用户名 时间 -->
        <div class="dynamic-list-tips">
            <text class="dynamic-list-tips-tel">{{data.user_name}}</text>
            <text class="dynamic-list-tips-time">{{transTime(data.create_time)}}</text>
        </div>
          <!-- 中间描述 -->
        <text class="dynamic-list-inner">{{data.brief}}</text>
        <!-- 视频 -->
        <div class="video-content" v-if='data.video'>
            <image v-if="data.video.img!= null" :src="cutImg(data.video.img,650,300)"  class="one-img"></image>
            <image v-if="data.video.img!= null" :src="getLocalImgUrl('playIcon3x.png')" class="play-icon"></image>
        </div>
        <!-- 图片 -->
        <div class="img-content" v-if='data.pics.length' :class="[data.video ? 'video-margin':'']">
            <image v-if="data.pics.length===1" :src="cutImg(data.pics[0],650,300)"  class="one-img"></image>
            <image v-if="data.pics.length===2" :src="cutImg(data.pics[0],320,300)"  class="two-img img-margin"></image>
            <image v-if="data.pics.length===2" :src="cutImg(data.pics[1],320,300)"  class="two-img"></image>
            <image v-if="data.pics.length > 2" :src="cutImg(data.pics[0],210,300)"  class="three-img img-margin"></image>
            <image v-if="data.pics.length > 2" :src="cutImg(data.pics[1],210,300)"  class="three-img img-margin"></image>
            <image v-if="data.pics.length > 2" :src="cutImg(data.pics[2],210,300)"  class="three-img"></image>
            <image :src="getLocalImgUrl('ask_imgTip.png')"   class="img-tip"></image>
            <text class="img-text">{{data.pics.length}}</text>
        </div>

            <!-- 底部浏览数 点赞数 评论数 -->
        <div class="dynamic-list-bottom">
            <div class="dynamic-list-bottom-content">
                <image :src="getLocalImgUrl('ask_read.png')"  class="dynamic-list-bottom-img"></image>
                <text class="dynamic-list-bottom-num">{{data.click_num}}</text>
            </div>
            <div class="dynamic-list-bottom-content">
                <image v-if='!data.is_praised' @click="praise(data.id,'praise')" :src="getLocalImgUrl('icon_dianzan3x.png')"  class="praise-icon"></image>
                <image v-if='data.is_praised' @click="praise(data.id,'delPraise')" :src="getLocalImgUrl('ask_isPrise.png')"  class="praise-icon"></image>
                <text class="dynamic-list-bottom-num">{{data.praise_num}}</text>
            </div>
            <div class="dynamic-list-bottom-content">
                <image :src="getLocalImgUrl('ask_comment.png')"  class="dynamic-list-bottom-img"></image>
                <text class="dynamic-list-bottom-num">{{data.comment_num}}</text>
            </div>
        </div>
    </div>
</template>

<script>
import Title1 from './Title1'
export default {
  props: ['data'],
  name: 'List1',
  components: {
    Title1
  },
  data () {
    return {

    }
  },
  methods: {
    //   点赞
    praise (id, type) {
      this.$emit('praise', {id, type})
    }
  },
  computed: {
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
.dynamic-list-content{
    width: 750px;
    flex: 1;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 50px;
    padding-right: 50px;
    margin-bottom: 20px;
    background-color: #ffffff;
}
.dynamic-list-tips{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
}
.dynamic-list-tips-tel{
    font-size: 22px;
    color:#999999;
    margin-right: 20px;
}
.dynamic-list-tips-time{
    font-size: 22px;
    color:#999999;
}
.img-content{
    flex-direction: row;
}
.one-img{
    width: 650px;
    height: 300px;
}
.two-img{
    width: 320px;
    height: 300px;
}
.three-img{
    width: 210px;
    height: 200px;
}
.img-margin{
    margin-right: 10px;
}
.img-text{
    color: #ffffff;
    position: absolute;
    right: 10px;
    bottom:10px;
    font-size: 20px;
}
.img-tip{
    width: 20px;
    height: 20px;
    position: absolute;
    right: 28px;
    bottom:13px;
}
.dynamic-list-inner{
    font-size: 28px;
    color:#666666;
    lines:3;
    text-overflow:ellipsis;
}
.dynamic-list-bottom{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
}
.dynamic-list-bottom-num{
    font-size: 24px;
    color:#999999;
}
.dynamic-list-bottom-img{
    width: 32px;
    height: 26px;
    margin-right: 10px;
}
.dynamic-list-bottom-content{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.praise-icon{
  width: 28px;
  height:28px;
  margin-right: 10px;
}
.play-icon{
  width: 88px;
  height:88px;
  position: absolute;
  top:105px;
  left:285px;
}
.video-margin{
    margin-top: 20px;
}
</style>
