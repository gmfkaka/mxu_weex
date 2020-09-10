<!-- 评论列表 -->
<template>
    <div  class="list-two-wrapper" >
        <!-- 对问题回帖 -->
        <div class="item-top">
            <div class="img-box">
                <image v-if="data.user_info.avatar.host" class="image" resize="cover" :src="data.user_info.avatar.host + data.user_info.avatar.dir + data.user_info.avatar.filepath + data.user_info.avatar.filename"></image>
                <image v-else class="image" resize="cover" :src="getLocalImgUrl('pic_user_default3x.png')"></image>
            </div>
            <div class="info-box">
                <text class="info-name">{{data.user_name}}</text>
                <image v-if='data.is_best==="1"' class="answer-tip" resize="cover" :src="getLocalImgUrl('ask_bestAnswer.png')"></image>
                <text  v-if='best_answer==="0" && hasSetBestAnswer' class="set-bestanswer" @click="setBest(data.id)">设为最佳</text>
            </div>
        </div>
        <!-- 回帖内容 -->
        <div class="comment-content">
            <text class="content-text">{{data.content}}</text>
        </div>
        <div class="praise-box">
            <text class="info-time">{{transTime(data.create_time)}}</text>
            <div class="like-box">
                <text class="praise-text">{{data.praise_num}}</text>
                <image v-if='data.is_praised'  @click="praise(data.id,'delPraise')" :src="getLocalImgUrl('ask_isPrise.png')" class="praise-icon"></image>
                <image v-if='!data.is_praised' @click="praise(data.id,'praise')" :src="getLocalImgUrl('icon_dianzan3x.png')" class="praise-icon"></image>
            </div>
             <div class="comment-box">
                <image @click="commentArea(data.id)" :src="getLocalImgUrl('ask_comment.png')" class="comment-icon"></image>
            </div>
        </div>
        <!-- 对回帖评论 -->
        <div  class="comment-reply" v-if="data.comment_content.length">
            <div class="comment-reply-list" v-for="(item,idx) in data.comment_content" :key='idx'>
                <div class="item-top">
                    <div class="img-box">
                        <image v-if="item.avatar.host" class="image" resize="cover" :src="item.avatar.host + item.avatar.dir + item.avatar.filepath + item.avatar.filename"></image>
                        <image v-else class="image" resize="cover" :src="getLocalImgUrl('pic_user_default3x.png')"></image>
                    </div>
                    <div class="info-box">
                        <text class="comment-info-name">{{item.user_name}}</text>
                        <text  v-if="item.reply_uname != ''" class="comment-info-name-text">回复</text>
                        <text v-if="item.reply_uname != ''" class="comment-info-name">{{item.reply_uname}}</text>
                    </div>
                </div>
                <div class="reply-comment-content">
                    <text class="reply-content-text">{{item.content}}</text>
                </div>
                <div class="reply-praise-box">
                    <text class="info-time">{{transTime(item.create_time)}}</text>
                    <!-- <div class="like-box">
                        <text class="praise-text">{{item.praise_num}}</text>
                        <image @click="praise" :src="getLocalImgUrl('icon_dianzan3x.png')" class="praise-icon"></image>
                    </div> -->
                    <div class="comment-box">
                        <image @click="postReplyArea(item.id,data.id)" :src="getLocalImgUrl('ask_comment.png')" class="comment-icon"></image>
                    </div>
                </div>
            </div>
            <text v-if="data.comment_num > 3" class="more-reply" @click="moreReply(data.id,3)">更多评论</text>
        </div>
        <!-- 设为最佳弹框 -->
         <wxc-mask height="300"
                width="600"
                duration="200"
                mask-bg-color="#FFFFFF"
                opacity="0.65"
                :has-animation="true"
                :has-overlay="true"
                :show-close="false"
                :show="show"
                :overlay-can-close="false"
            >
            <div class="mask-content">
                <text class="publish-title">设为最佳回答后，您的赏金将到达 回答者账户。</text>
                <div class="mask-button">
                   <text class="mask-button-cancel" @click="maskCancel">取消</text>
                   <text class="mask-button-define"  @click="maskDefine(data.id)">确定</text>
                </div>
            </div>
        </wxc-mask>
    </div>
</template>

<script>
// import { nativeUtil } from '../../lib/nativeUtils'
import List5 from '../../components/wenda/List5.vue'
import { WxcMask, WxcPopup } from 'weex-ui'
export default {
  props: ['data', 'best_answer', 'hasSetBestAnswer'],
  name: 'List25',
  components: {
    WxcMask,
    WxcPopup,
    List5
  },
  data () {
    return {
      dianzanState: false,
      show: false,
      isBottomShow: false,
      isBottomShowArea: false
    }
  },
  methods: {
    // 点赞
    praise (id, type) {
      this.$emit('praise', {id, type})
    },
    // 更多评论
    moreReply (id, offset) {
      this.$emit('moreReply', {id, offset})
    },
    // 对问题回帖
    commentArea (id) {
      this.$emit('commentArea', id)
    },
    // 对回帖评论，回复
    postReplyArea (replyId, postId) {
      this.$emit('postReplyArea', {replyId, postId})
    },
    setBest () {
      this.show = true
    },
    maskCancel () {
      this.show = false
    },
    // 设置最佳回答
    maskDefine (id) {
      this.show = false
      this.$emit('setBest', id)
    },
    openBottomPopupArea (id) {
      this.isBottomShowArea = true
    },
    // 非状态组件，需要在这里关闭
    popupOverlayBottomClick () {
      this.$refs.wxcPopup.hide()
      setTimeout(() => {
        this.isBottomShow = false
      }, 1000)
    },
    popupOverlayBottomClickArea () {
      this.$refs.wxcPopupArea.hide()
      setTimeout(() => {
        this.isBottomShowArea = false
      }, 1000)
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.list-two-wrapper{
    background-color: #fff;
    padding-left:50px;
    padding-right:50px;
    padding-top:28px;
    padding-bottom:32px;
    border-bottom-style:solid;
    border-bottom-width:1px;
    border-bottom-color:  #EEEEEE;
}
.item-top{
  width: 686px;
  height:64px;
  flex-direction: row;
  // justify-content:space-between;
}
.img-box{
  flex-direction: row;
  align-items: center;
  border-bottom-left-radius:32px;
  border-bottom-right-radius:32px;
  border-top-left-radius:32px;
  border-top-right-radius:32px;
  border-top-style:solid;
  border-top-width:1px;
  border-top-color:  #EEEEEE;
  border-bottom-style:solid;
  border-bottom-width:1px;
  border-bottom-color:  #EEEEEE;
  border-left-style:solid;
  border-left-width:1px;
  border-left-color:  #EEEEEE;
  border-right-style:solid;
  border-right-width:1px;
  border-right-color:  #EEEEEE;
  width: 64px;
  height:64px;
  margin-right: 12px;
}
.image{
  border-bottom-left-radius:30px;
  border-bottom-right-radius:30px;
  border-top-left-radius:30px;
  border-top-right-radius:30px;
  width: 60px;
  height:60px;
}
.info-box{
  width: 550px;
  flex-direction: row;
  align-items: center;
}
.answer-tip{
    width: 200px;
    height: 50px;
}
.set-bestanswer{
    width: 150px;
    height: 50px;
    line-height: 50px;
    background-color: #FFF1F0;
    color: #F7402E;
    font-size: 22px;
    text-align: center;
    border-bottom-left-radius:25px;
    border-bottom-right-radius:25px;
    border-top-left-radius:25px;
    border-top-right-radius:25px;
}
.info-name{
  font-size: 28px;
  color: #000000;
  flex:1;
  lines:1;
}
.comment-info-name{
  font-size: 28px;
  color: #333333;
  lines:1;
}
.comment-info-name-text{
  margin-left: 10px;
  margin-right:10px;
  font-size: 28px;
  color: #999999;
  lines:1;
}
.info-time{
  font-size: 24px;
  color: #999999;
  lines:1;
}
.praise-box{
  width: 550px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 76px;
}
.reply-praise-box{
  width: 420px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 76px;
}
.praise-text{
  font-size: 24px;
  color: #999999;
}
.praise-icon{
  width: 28px;
  height:28px;
  margin-left:12px;
  position: relative;
}
.comment-icon{
  width: 30px;
  height: 28px;
  margin-left:12px;
  position: relative;
}
.comment-content{
  width: 610px;
  margin-left:76px;
  flex-direction: row;
  margin-bottom: 10px;
}
.content-text{
  width: 585px;
  font-size: 28px;
  color: #333333;
}
.reply-comment-content{
  width: 450px;
  margin-left:76px;
  flex-direction: row;
  margin-bottom: 10px;
}
.reply-content-text{
  width: 425px;
  font-size: 28px;
  color: #333333;
}
.replay-text{
  font-size: 32px;
  color: #4D96FF;
}

.comment-box{
    flex-direction: row;
}
.like-box{
    flex-direction: row;
}
.comment-reply{
  width: 550px;
  flex: 1;
  margin-left: 76px;
  margin-top: 20px;
}
.comment-reply-list{
  width: 550px;
  flex: 1;
  background-color: #F8F8F8;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
}
.more-reply{
    width: 550px;
    font-size:24px;
    color: #999999;
    text-align: center;
    background-color: #F8F8F8;
    padding-bottom: 20px;
}
.mask-content{
    width: 600px;
    height: 300px;
    align-items: center;
}
.publish-title{
    width: 600px;
    height: 200px;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 50px;
    padding-bottom: 50px;
    align-items: center;
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: #DDDDDD;
    border-bottom-style: solid;
}
.mask-button{
    width: 600px;
    height: 100px;
    flex-direction: row;
    align-items: center;
}
.mask-button-cancel{
    width: 300px;
    height: 100px;
    line-height: 100px;
    font-size:36px;
    color: #999999;
    border-right-width: 1px;
    border-right-color: #DDDDDD;
    border-right-style: solid;
    text-align: center;
}
.mask-button-define{
    width: 300px;
    height: 100px;
    line-height: 100px;
    font-size:36px;
    color: #F7402E;
    text-align: center;
}
.close-more-box{
    width: 750px;
    flex-direction: row;
    justify-content: center;
    text-align: center;
}
.close-more-reply{
    font-size: 24px;
    color: #999999;
    margin-top: 20px;
}
.close-more-icon{
    width: 20px;
    height: 20px;
    margin-top: 25px;
    margin-right: 10px;
}
.comment-list{
    margin-bottom: 100px;
}
.more-reply-content{
    width: 750px;
    height: 1000px;
}
</style>
