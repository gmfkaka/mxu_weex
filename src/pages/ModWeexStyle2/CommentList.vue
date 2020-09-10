<template>
     <div class="wrapper">
       <div class="head">
            <text class="head-text">评论</text>
            <image :src="getLocalImgUrl('icon_back3x.png')" class="back-icon" @click="goback()"></image>
       </div>
        <!-- 有评论 -->
        <div v-if="updatedList.length || hotList.length">
          <!-- 最新评论 -->
          <div class="comment-box" v-if="updatedList.length">
              <div class="title-box">
                  <text class="title">最新评论</text>
              </div>
              <div v-for="(item,index) in updatedList" :key="index">
                  <list25 :data="item"></list25>
                  <div class="border-line" v-if="index !== updatedList.length-1"></div>
              </div>
          </div>
          <div class="dividing-line" v-if="updatedList.length"></div>
          <!-- 热门评论 -->
          <div class="comment-box" v-if="hotList.length">
              <div class="title-box">
                  <text class="title">热门评论</text>
              </div>
              <div v-for="(item,index) in hotList" :key="index">
                  <list25 :data="item"></list25>
                  <div class="border-line" v-if="index !== hotList.length-1"></div>
              </div>
          </div>
        </div>
        <!-- 无评论 -->
        <text v-else class="no-data">暂无评论</text>
        <!-- 评论框 -->
        <div class="comment-wrapper">
            <div class="input-box">
                <image :src="getLocalImgUrl('icon_edit3x.png')" class="comment-icon"></image>
                <input type="text" @focus="openBottomPopup" placeholder="说点什么吧" class="input"
                placeholder-color="#A6A6A6">
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
    </div>
</template>

<script>
import List25 from '../../components/list/List25.vue'
import { nativeUtil } from '../../lib/nativeUtils'
import { WxcPopup } from 'weex-ui'
export default {
  name: 'CommentList',
  components: {
    List25,
    WxcPopup
  },
  data () {
    return {
      commentShow: false,
      updatedList: [],
      hotList: [],
      content: '',
      isBottomShow: false
    }
  },
  methods: {
    goback () {
      this.goBack()
    },
    // 获取热门评论列表
    getHotCommentList () {
      this.$httpRequest(
        'http://mapi-test.plus.hoge.cn/api/v1/comment.php',
        {
          appid: 'm2ooytobyhnez19vrv',
          appkey: 'd3bda44d6d4b2bb4e28cf3a90c22dc73',
          cmid: this.getQuery().id,
          cid: this.getQuery().content_fromid,
          hot_comment: 2, // 热门评论
          mod_uniqueid: 'news',
          app_uniqueid: 'news'
        },
        'get'
      ).then((res) => {
        if (!res.error_code) {
          this.hotList = res
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 获取最新评论列表
    getUpdatedCommentList () {
      this.$httpRequest(
        'http://mapi-test.plus.hoge.cn/api/v1/comment.php',
        {
          appid: 'm2ooytobyhnez19vrv',
          appkey: 'd3bda44d6d4b2bb4e28cf3a90c22dc73',
          cmid: this.getQuery().id,
          cid: this.getQuery().content_fromid,
          // hot_comment: 2,
          mod_uniqueid: 'news',
          app_uniqueid: 'news'
        },
        'get'
      ).then((res) => {
        if (!res.error_code) {
          this.updatedList = res
        }
      }, (e) => {
        console.log(e)
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
    },
    // 发布评论
    sendComment () {
      if (!this.content) return
      this.$httpRequest(
        'http://mapi-test.plus.hoge.cn/api/v1/comment_create.php',
        {
          appid: 'm2ooytobyhnez19vrv',
          appkey: 'd3bda44d6d4b2bb4e28cf3a90c22dc73',
          cmid: this.getQuery().id,
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
    }
  },
  created () {
    this.getHotCommentList()
    this.getUpdatedCommentList()
  }
}
</script>

<style scoped lang="scss">
 @import "../../style/common.scss";
.wrapper{
    width: 750px;
    flex:1;
}
.mask{
  top: 0;
  height: 1334px;
  background-color: rgba(0,0,0,.1);
}
.head{
    width: 750px;
    height: 100px;
    margin-top:20px;
    justify-content: center;
    border-bottom-style: solid;
    border-bottom-color: #ccc;
    border-bottom-width: 1px;
}
.head-text{
    text-align: center;
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
}
.title{
    font-size: 30px;
    color:#aaa;
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
  color:red;
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
</style>
