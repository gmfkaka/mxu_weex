 <!-- 详情页底部fixed评论  start-->
<template>
  <div class="main-wrapper" :class="[this.isIphoneX() ? 'x-height':'']">
    <div class="comment-wrapper" :class="[type=='black'?'black':'white',this.isIphoneX() ? 'x-height':'']">
      <div class="input-box" :class="[type=='black'?'black-box':'white-box']" @click="openBottomPopup">
          <image :src="getLocalImgUrl('icon_edit3x.png')" class="comment-icon"></image>
          <text style="color:#A6A6A6;font-size:24px;">说点什么吧</text>
      </div>
      <div class="opera-box">
          <div class="comment-icon-box">
            <image  @click="goCommentList" :src="getLocalImgUrl('icon_comment3x.png')" class="comment-img"></image>
            <div class="comment-num-box">
              <text class="comment-num-text">{{data.comment_num}}</text>
            </div>
          </div>
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
        <textarea type="text" class="comment-area" placeholder="请输入评论内容" v-model="content" ref="inputarea" @keyboard="keyboard"></textarea>
        </div>
    </wxc-popup>
  </div>

</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import { WxcPopup } from 'weex-ui'
const requestModule = weex.requireModule('request')
export default {
  name: 'Comment',
  props: ['type', 'data'],
  components: {
    WxcPopup
  },
  data () {
    return {
      commentList: [],
      content: '',
      isBottomShow: false,
      access_token: '',
      locationDistance: {}
    }
  },
  methods: {
    keyboard (event) {
      if (this.getPlatform() === 'android') {
        if (event.isShow) {
          this.bottomDistance = {height: `${event.keyboardSize}px`}
          const dis = event.keyboardSize + 20
          this.locationDistance = {bottom: `${dis}px`}
        }
      }
    },
    // 去评论列表页
    goCommentList () {
      this.jumpWithParams('ModWeexStyle6FeatureHomeCommentList', {id: this.data.rid, content_fromid: this.data.content_fromid, mod: this.data.module_id, app: this.data.bundle_id})
    },
    // 发布评论
    sendComment () {
      const _this = this
      if (!this.content) return
      if (this.getPlatform() === 'ios') {
        const param = {
          appid: '3',
          appkey: 'mqvpIfSvCblvUFQ1lXdtkv6LoRi0JSYV',
          cmid: _this.data.rid,
          content: _this.content,
          mod_uniqueid: _this.data.module_id,
          app_uniqueid: _this.data.bundle_id
        }
        requestModule.POST('http://mobile.tjpress.com/tjpress/comment_create.php', param, function (res) {
          // nativeUtil.log(res)
          if (res.ErrorCode) {
            nativeUtil.alert(res.ErrorText)
            if (res.ErrorCode === 'USER_NOT_LOGIN') {
              nativeUtil.goLogin()
            }
            _this.popupOverlayBottomClick()
          } else {
            nativeUtil.alert('评论成功，等待审核')
            _this.popupOverlayBottomClick()
          }
          _this.content = ''
        })
      } else if (this.getPlatform() === 'android') {
        nativeUtil.getUserInfo().then(res => {
          if (res.userTokenKey) { _this.access_token = res.userTokenKey }
          const param = {
            appid: '3',
            appkey: 'mqvpIfSvCblvUFQ1lXdtkv6LoRi0JSYV',
            cmid: _this.data.rid,
            content: _this.content,
            mod_uniqueid: _this.data.module_id,
            app_uniqueid: _this.data.bundle_id,
            access_token: _this.access_token
          }
          _this.$httpRequest('http://mobile.tjpress.com/tjpress/comment_create.php', param, 'post').then(res => {
            if (res.ErrorCode) {
              nativeUtil.alert(res.ErrorText)
              if (res.ErrorCode === 'USER_NOT_LOGIN') {
                nativeUtil.goLogin().then(res => {
                  if (res === '1') {
                    nativeUtil.getUserInfo().then(res => {
                      _this.access_token = res.userTokenKey
                    })
                  }
                })
              }
              _this.popupOverlayBottomClick()
            } else {
              nativeUtil.alert('评论成功，等待审核')
              _this.popupOverlayBottomClick()
            }
            _this.content = ''
          }, (e) => {
            console.log(e)
          })
        })
      }
    },
    openBottomPopup () {
      this.isBottomShow = true
      setTimeout(() => {
        this.$refs['inputarea'].focus()
      }, 100)
    },
    // 非状态组件，需要在这里关闭
    popupOverlayBottomClick () {
      this.$refs.wxcPopup.hide()
      setTimeout(() => {
        this.isBottomShow = false
      }, 10)
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
.main-wrapper{
  position: fixed;
  bottom:0;
  left: 0;
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
.x-height{
  height: 150px;
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
  color:#000;
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
.black-input{
  background-color:#2C2A2A;
}
.white-input{
  background-color:#F2F2F2;
}
.opera-box{
  height:60px;
  margin-left:20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
