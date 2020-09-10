<template>
     <div class="wrapper" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStylePaddingTop">
        <show-loading
            :show="isShow"
            type="custom"
            m-url="loading.gif"
            m-width="120"
            m-height="120"
            m-backgroundcolor="#fff"
        >
        </show-loading>
       <div class="head">
            <text class="head-text">评论</text>
            <image :src="getLocalImgUrl('icon_back3x.png')" class="back-icon" @click="goback()"></image>
       </div>
        <!-- 有评论 -->
        <scroller v-if="(updatedList.length || hotList.length) && !isShow" class="main-scroller"  :class="[this.isIphoneX() ? 'scroller-top':'']" show-scrollbar="false">
          <!-- 热门评论 -->
          <div class="comment-box" v-if="hotList.length">
              <div class="title-box">
                  <div class="title-line"></div>
                  <text class="title">热门评论</text>
              </div>
              <div v-for="(item,index) in hotList" :key="index">
                  <list10 :data="item"></list10>
                  <div class="border-line" v-if="index !== hotList.length-1"></div>
              </div>
          </div>
          <div class="dividing-line" v-if="hotList.length && updatedList.length"></div>
          <!-- 最新评论 -->
          <div class="comment-box" v-if="updatedList.length">
              <div class="title-box">
                <div class="title-line"></div>
                  <text class="title">最新评论</text>
              </div>
              <div v-for="(item,index) in updatedList" :key="index">
                  <list10 :data="item"></list10>
                  <div class="border-line" v-if="index !== updatedList.length-1"></div>
              </div>
          </div>
        </scroller>
        <!-- 无评论 -->
        <div v-if="!updatedList.length && !hotList.length && !isShow" class="main-scroller"  :class="[this.isIphoneX() ? 'scroller-top':'']" style="align-items:center;justify-content:center;">
          <image :src="getLocalImgUrl('feature_nocomment.png')" class="no-data-icon"></image>
        </div>
        <!-- 评论框 -->
        <div class="comment-wrapper" :class="[this.isIphoneX() ? 'x-height':'']">
            <div class="input-box" @click="openBottomPopup">
                <image :src="getLocalImgUrl('icon_edit3x.png')" class="comment-icon"></image>
                <text style="color:#A6A6A6;font-size:24px;">说点什么吧</text>
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
            <textarea type="text" class="comment-area" placeholder="请输入评论内容" v-model="content" ref="inputarea"></textarea>
            </div>
        </wxc-popup>
    </div>
</template>

<script>
import List10 from '../../components/feature/List10.vue'
import ShowLoading from '../../components/common/ShowLoading'
import { nativeUtil } from '../../lib/nativeUtils'
import { WxcPopup, WxcLoading } from 'weex-ui'
const requestModule = weex.requireModule('request')
export default {
  name: 'CommentList',
  components: {
    List10,
    ShowLoading,
    WxcPopup,
    WxcLoading
  },
  data () {
    return {
      isShow: true,
      commentShow: false,
      updatedList: [],
      hotList: [],
      content: '',
      isBottomShow: false,
      access_token: ''
    }
  },
  methods: {
    goback () {
      this.goBack()
    },
    // 获取热门评论列表
    getHotCommentList () {
      this.$httpRequest(
        'http://mobile.tjpress.com/tjpress/comment.php',
        {
          appid: '3',
          appkey: 'mqvpIfSvCblvUFQ1lXdtkv6LoRi0JSYV',
          cmid: this.getQuery().id,
          cid: this.getQuery().content_fromid,
          hot_comment: 2, // 热门评论
          mod_uniqueid: this.getQuery().mod,
          app_uniqueid: this.getQuery().app
        },
        'get'
      ).then((res) => {
        if (!res.error_code) {
          this.hotList = res
          this.getUpdatedCommentList()
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 获取最新评论列表
    getUpdatedCommentList () {
      this.$httpRequest(
        'http://mobile.tjpress.com/tjpress/comment.php',
        {
          appid: '3',
          appkey: 'mqvpIfSvCblvUFQ1lXdtkv6LoRi0JSYV',
          cmid: this.getQuery().id,
          cid: this.getQuery().content_fromid,
          mod_uniqueid: this.getQuery().mod,
          app_uniqueid: this.getQuery().app
        },
        'get'
      ).then(res => {
        if (!res.error_code) {
          this.updatedList = res
          this.isShow = false
        }
      }, (e) => {
        console.log(e)
      })
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
    },
    // 发布评论
    sendComment () {
      const _this = this
      if (!this.content) return
      if (this.getPlatform() === 'ios') {
        const param = {
          appid: '3',
          appkey: 'mqvpIfSvCblvUFQ1lXdtkv6LoRi0JSYV',
          cmid: _this.getQuery().id,
          content: _this.content,
          mod_uniqueid: _this.getQuery().mod,
          app_uniqueid: _this.getQuery().app
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
            cmid: _this.getQuery().id,
            content: _this.content,
            mod_uniqueid: _this.getQuery().mod,
            app_uniqueid: _this.getQuery().app,
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
    }
  },
  created () {
    this.getHotCommentList()
  }
}
</script>

<style scoped lang="scss">
 @import "../../style/common.scss";
.wrapper{
    width: 750px;
    flex:1;
}
.x-top{
  padding-top: 30px;
}
.mask{
  top: 0;
  height: 1334px;
  background-color: rgba(0,0,0,.1);
}
.head{
    width: 750px;
    height: 100px;
    margin-top:30px;
    justify-content: center;
    border-bottom-style: solid;
    border-bottom-color: #ccc;
    border-bottom-width: 1px;
}
.head-text{
    text-align: center;
    font-size: 34px;
    color: #545454;
}
.back-icon{
    width: 44px;
    height: 44px;
    position: absolute;
    left: 40px;
}
.comment-box{
    padding-top: 15px;
    padding-left: 10px;
}
.title-box{
    flex-direction: row;
    align-items: center;
    padding-left: 5px;
}
.title-line{
  width: 6px;
  height: 30px;
  background-color: #000;
}
.title{
    font-size: 30px;
    color:#aaa;
    margin-left: 8px;
}
.comment-wrapper{
    flex-direction: row;
    position: absolute;
    bottom:0;
    width: 750px;
    height:100px;
    align-items: center;
    padding-left:10px;
    padding-right:10px;
    position: fixed;
    bottom: 0;
    background-color: #f9f9f9;
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: #E6E6E6;
}
.x-height{
  height: 150px;
}
.comment-container{
  position: absolute;
  bottom: 0;
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
.input-box{
    flex:1;
    height:60px;
    border-bottom-left-radius:16px;
    border-bottom-right-radius:16px;
    border-top-left-radius:16px;
    border-top-right-radius:16px;
    align-items: center;
    padding-left:24px;
    padding-right:24px;
    flex-direction: row;
    background-color: #FFF;
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
.no-data{
    font-size: 28px;
    width: 750px;
    text-align: center;
    height: 300px;
    line-height: 300px;
}
.main-scroller{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100px;
  top: 120px;
}
.scroller-top{
  top: 150px;
}
.no-data-icon{
  width: 368px;
  height: 240px;
}
</style>
