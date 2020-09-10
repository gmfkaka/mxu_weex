<!-- 评论列表 -->
<template>
    <div  class="list-two-wrapper" >
        <div class="item-top">
            <div class="img-box">
               <image v-if="data.avatar.host" class="image" resize="cover" :src="data.avatar.host + data.avatar.dir + data.avatar.filepath + data.avatar.filename"></image>
                <image v-else class="image" resize="cover" :src="getLocalImgUrl('pic_user_default3x.png')"></image>
            </div>
            <div class="info-box">
                <text class="info-name">{{data.user_name}}</text>
                <text  v-if="data.reply_uname != ''" class="info-name-text">回复</text>
                <text v-if="data.reply_uname != ''" class="info-name">{{data.reply_uname}}</text>
            </div>
        </div>
        <div class="comment-content">
            <text class="content-text">{{data.content}}</text>
        </div>
        <div class="praise-box">
            <text class="info-time">{{transTime(data.create_time)}}</text>
             <div class="comment-box">
                <image @click="commentArea(data.id,id)" :src="getLocalImgUrl('ask_comment.png')" class="comment-icon"></image>
            </div>
        </div>
    </div>
</template>

<script>
// import { nativeUtil } from '../../lib/nativeUtils'
export default {
  props: ['data', 'id'],
  name: 'List5',
  components: {
  },
  data () {
    return {
      dianzanState: false
    }
  },
  methods: {
    // 点赞 暂不支持
    praise () {
      // this.$httpRequest(
      //   'http://mapi-test.plus.hoge.cn/api/v1/comment_vote.php',
      //   {
      //     appid: 'm2ooytobyhnez19vrv',
      //     appkey: 'd3bda44d6d4b2bb4e28cf3a90c22dc73',
      //     id: this.data.id
      //   },
      //   'get'
      // ).then(res => {
      //   if (!res.ErrorCode) {
      //     nativeUtil.alert(res)
      //   }
      // }, (e) => {
      //   nativeUtil.alert(e)
      // })
    },
    commentArea (replyId, postId) {
      this.$emit('commentArea', {replyId, postId})
    }
  },
  computed: {
  },
  created () {
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
  lines:1;
}
.info-name-text{
  margin-left: 10px;
  margin-right:10px;
  font-size: 28px;
  color: #999999;
  lines:1;
}
.comment-info-name{
  font-size: 28px;
  color: #333333;
  flex:1;
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
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #F8F8F8;
}
.more-reply{
    width: 550px;
    font-size:24px;
    color: #999999;
    text-align: center;
    margin-top: 10px;
}
</style>
