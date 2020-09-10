 <!-- 详情页底部fixed评论  start-->
<template>
  <div class="wrapper">
    <div class="comment-wrapper" :class="[type=='black'?'black':'white']">
      <div class="input-box" :class="[type=='black'?'black-box':'white-box']">
          <image :src="getLocalImgUrl('icon_edit3x.png')" class="comment-icon"></image>
          <input type="text" placeholder="说点什么吧" class="input" v-model="content"
          placeholder-color="#A6A6A6" @focus="openBottomPopup" :class="[type=='black'?'black-input':'white-input']">
      </div>
      <div class="opera-box">
          <div class="comment-icon-box">
            <image  @click="goCommentList" :src="getLocalImgUrl('icon_comment3x.png')" class="comment-img"></image>
            <div class="comment-num-box">
              <text class="comment-num-text">{{data.comment_num}}</text>
            </div>
          </div>
          <div class="comment-boxs">
              <image :src="getLocalImgUrl('icon_collect3x.png')" class="star-img"></image>
          </div>
          <image :src="getLocalImgUrl('icon_share3x.png')" class="forward-img" @click="share()"></image>
      </div>
    </div>
    <wxc-popup popup-color="rgb(255,255,255)"
               :show="isBottomShow"
               @wxcPopupOverlayClicked="popupOverlayBottomClick"
               pos="bottom"
               height="300"
               ref="wxcPopup">
      <div class="comment-container">
        <div class="comment-top">
          <text class="top-title">写评论</text>
          <text class="top-cancel" @click="popupOverlayBottomClick">取消</text>
          <text class="top-publish" :class="[content?'top-active':'']" @click="sendComment">发布</text>
        </div>
        <textarea type="text" class="comment-area" placeholder="请输入评论内容" v-model="content"></textarea>
        </div>
    </wxc-popup>
    <!-- <div class="comment-box" v-if="commentShow" :class="[type=='black'?'black-bg':'white-bg']">
        <div class="all-comment" :class="[type=='black'?'black-border':'white-border']">
          <text class="all-comment-text">全部评论</text>
          <image :src="getLocalImgUrl('icon_close3x.png')"
          @click="showComment" class="all-comment-icon"></image>
        </div>
        <scroller class="comment-list">
            <refresh @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
              <text>Refreshing...</text>
            </refresh>
            <div class="comment-item" v-for="(item,index) in commentList" :key="index"
            :class="[type=='black'?'item-black-border':'item-white-border']">
                <div class="item-top">
                  <div class="img-box">
                      <image v-if="item.member_info.avatar.host" class="image" resize="cover" :src="item.member_info.avatar.host + item.member_info.avatar.dir + item.member_info.avatar.filepath + item.member_info.avatar.filename"></image>
                      <image v-else class="image" resize="cover" :src="getLocalImgUrl('pic_user_default3x.png')"></image>
                      <div class="info-box">
                           <text class="info-name">{{item.member.member_name}}</text>
                           <text class="info-time">{{item.created_at?item.created_at.substring(0,10):''}}</text>
                      </div>
                  </div>
                  <div class="praise-box">
                       <text class="praise-text">{{item.like_num}}</text>
                       <image :src="getLocalImgUrl('icon_dianzan3x.png')" class="praise-icon"></image>
                  </div>
                </div>
                <div class="comment-content">
                    <text class="content-text">{{item.content}}</text>
                </div>
            </div>
            <loading @loading="onloading" :display="loadinging ? 'show' : 'hide'">
              <text>Loading ...</text>
            </loading>
        </scroller>
    </div> -->
  </div>

</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import { WxcPopup } from 'weex-ui'
export default {
  name: 'Comment',
  props: ['type', 'data'],
  components: {
    WxcPopup
  },
  data () {
    return {
      commentShow: false,
      refreshing: false,
      loadinging: false,
      commentList: [],
      offset: 0,
      count: 10,
      content: '',
      isBottomShow: false
    }
  },
  methods: {
    // 获取评论
    getComment () {
      this.showComment()
      this.refreshing = true
      this.getCommentList()
    },
    getCommentList () {
      this.$httpRequest(
        'http://mapi-test.plus.hoge.cn/api/v1/comment_hot.php',
        {
          appid: 'm2ooytobyhnez19vrv',
          appkey: 'd3bda44d6d4b2bb4e28cf3a90c22dc73',
          cmid: this.data.id,
          content_id: this.data.content_fromid
        },
        'get'
      ).then((res) => {
        this.refreshing = false
        if (!res.error_code) {
          this.commentList = res
        } else {
          nativeUtil.alert(res)
        }
      }, (e) => {
        console.log(e)
      })
    },
    showComment () {
      this.commentShow = !this.commentShow
    },
    // 刷新
    onrefresh () {
      this.refreshing = true
      this.offset = 0
      this.count = 10
      this.getCommentList()
    },
    // 加载更多
    onloading () {
      this.offset = this.offset + 10
      this.count = 10
      this.loadinging = true
      this.getMoreCommentList()
    },
    // 获取更多评论
    getMoreCommentList () {
      this.$httpRequest(
        this.$getHebeiHttpUrl('commentList'),
        {
          app_uniqueid: 'news',
          content_id: '41683',
          appkey: 'b7269c8f9a318c69a59dc430cef3ab59',
          appid: 'm2ovki73ruqwcwmw8b',
          device_token: '5b65c48b830dbadd595384a7d54e4d61',
          offset: this.offset,
          count: this.count
        },
        'get'
      ).then((res) => {
        this.loadinging = false
        if (!res.error_code) {
          if (!res.length) {
            this.messageTip('已加载全部')
            return
          }
          this.commentList = this.commentList.concat(res)
        } else {
          this.messageTip(res.error_message)
        }
      }, (e) => {
      })
    },
    // 分享
    share () {
      const param = {
        'title': '123',
        'brief': '456',
        'imageLink': '分享索引图链接',
        'contentUrl': '分享内容链接'
      }
      nativeUtil.shareTo(param)
    },
    // 去评论列表页
    goCommentList () {
      this.jumpWithParams('CommentList', {id: this.data.id, content_fromid: this.data.content_fromid})
    },
    // 发布评论
    sendComment () {
      if (!this.content) return
      this.$httpRequest(
        'http://mapi-test.plus.hoge.cn/api/v1/comment_create.php',
        {
          appid: 'm2ooytobyhnez19vrv',
          appkey: 'd3bda44d6d4b2bb4e28cf3a90c22dc73',
          cmid: this.data.id,
          content: this.content,
          app_uniqueid: 'news'
        },
        'post'
      ).then(res => {
        if (res.ErrorCode === 'NO_ACCESS_TOKEN') {
          nativeUtil.alert(res.ErrorText)
          nativeUtil.goLogin()
        }
        if (res.state === 0) {
          nativeUtil.alert('评论成功!')
        }
      }, (e) => {
        nativeUtil.alert(e)
      })
    },
    openBottomPopup () {
      this.isBottomShow = true
    },
    // 非状态组件，需要在这里关闭
    popupOverlayBottomClick () {
      this.$refs.wxcPopup.hide()
      setTimeout(() => {
        this.isBottomShow = false
      }, 1000)
    }
  },
  created () {
    // this.getComment()
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.wrapper{
  position: fixed;
  bottom:0;
  width: 750px;
  height:100px;
}
.comment-wrapper{
  flex-direction: row;
  position: absolute;
  bottom:0;
  width: 750px;
  height:100px;
  align-items: center;
  padding-left:32px;
  padding-right:34px;
}
.comment-container{
  width: 750px;
  height: 300px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 15px;
  background-color: #fff;
}
.comment-top{
  flex-direction: row;
  height: 50px;
  width: 700px;
  margin-bottom: 15px;
}
.top-title{
  width: 700px;
  text-align: center;
  font-size: 32px;
}
.top-cancel{
  position: absolute;
  left: 0;
  font-size: 28px;
  height: 50px;
  line-height: 50px;
}
.top-publish{
  position: absolute;
  right: 0;
  color:#ccc;
  font-size: 28px;
  height: 50px;
  line-height: 50px;
}
.top-active{
  color:red;
}
.comment-area{
  width: 700px;
  height: 180px;
  background-color: #f2f2f2;
  padding-top: 15px;
  padding-left: 15px;
}
.black{
  border-top-style:solid;
  border-top-width:1px;
  border-top-color:#474646;
  background-color: #191818;
}

.white{
   border-top-style:solid;
    border-top-width:1px;
    border-top-color:#E6E6E6;
    background-color: #ffffff;
}
.input-box{
    flex:1;
    height:60px;
    border-bottom-left-radius:32px;
    border-bottom-right-radius:32px;
    border-top-left-radius:32px;
    border-top-right-radius:32px;
   align-items: center;
    padding-left:24px;
    padding-right:24px;
    flex-direction: row;

}
.black-box{
  background-color: #2C2A2A;
}
.white-box{
  background-color:#F2F2F2;
}
.comment-icon{
    width: 24px;
    height:24px;
    margin-right:20px;
}
.input{
   font-size: 28px;
    height:40px;
    flex:1;
}
.black-input{
  background-color:#2C2A2A;
}
.white-input{
  background-color:#F2F2F2;
}
.input:focus{
    border-bottom-style:solid;
    border-bottom-width:1px;
    border-bottom-color:#E6E6E6;
}
.opera-box{
  height:60px;
  margin-left:44px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 166px;
}
.comment-img{
  width: 42px;
  height:40px;
  position: absolute;
  left: 10px;
  top: 7px;
}
.star-img{
  width: 42px;
  height:42px;
}
.comment-boxs{
  position: relative;
}
.emoji-img{
  width: 44px;
  height:44px;
  margin-left:32px;
}
.forward-img{
  width: 36px;
  height:36px;
}
.comment-box{
  width: 750px;
  position: absolute;
  bottom:100px;
  border-top-left-radius:16px;
  border-top-right-radius:16px;
}
.black-bg{
  background-color: #2C2A2A;
}
.white-bg{
  background-color: #ffffff;
}
.all-comment{
  height:78px;
  width: 750px;
  align-items: center;
  justify-content: center;
  position: relative;
  border-bottom-style:solid;
  border-bottom-width:2px;

}
.white-border{
  border-bottom-color:  #eeeeee;
}
.black-border{
  border-bottom-color:  #666666;
}
.all-comment-text{
  font-size: 28px;
  color: #999999;
}
.all-comment-icon{
  position: absolute;
  width: 28px;
  height:28px;
  right:32px;
}
.comment-list{
  width: 750px;
  padding-left:32px;
  padding-right:32px;
}
.comment-item{
  padding-top:26px;
  padding-bottom:26px;
  border-bottom-style:solid;
  border-bottom-width:1px;

}
.item-black-border{
  border-bottom-color:  #444444;
}
.item-white-border{
  border-bottom-color:  #eeeeee;
}
.item-top{
  width: 686px;
  height:64px;
  flex-direction: row;
  justify-content:space-between;
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

}
.image{
  border-bottom-left-radius:30px;
  border-bottom-right-radius:30px;
  border-top-left-radius:30px;
  border-top-right-radius:30px;
  width: 60px;
  height:60px;
  margin-right:12px;

}
.info-box{
  justify-content: space-between;
}
.info-name{
  font-size: 28px;
  color: #999999;
}
.info-time{
  font-size: 24px;
  color: #777777;

}
.praise-box{
  flex-direction: row;
  align-items: center;
}
.praise-text{
  font-size: 28px;
  color: #9B9B9B;
}
.praise-icon{
  width: 28px;
  height:28px;
  margin-left:12px;
  position: relative;
  top:-2px;
}
.comment-content{
  width: 610px;
  margin-left:76px;
  margin-top:20px;
  flex-direction: row;
}
.replay-text{
  font-size: 32px;
  color: #4D96FF;
}
.content-text{
  font-size: 32px;
  color: #999999;
}
.comment-icon-box{
  position: relative;
  width: 56px;
  height: 52px;
}
.comment-num-box{
  position: absolute;
  height:26px;
  width: 26px;
  border-bottom-left-radius:13px;
  border-bottom-right-radius:13px;
  border-top-left-radius:13px;
  border-top-right-radius:13px;
  background-color:#F74141;
  align-items: center;
  justify-content: center;
  top:0;
  right:0;
}
.comment-num-text{
  font-size: 20px;
  color: #FFFFFF;
}
</style>
