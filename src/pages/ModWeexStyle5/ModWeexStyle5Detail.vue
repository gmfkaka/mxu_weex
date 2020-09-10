<template>
    <div class="detail-wrapper" :class="[this.isIphoneX() ? 'ipx' : '']">
        <div class="head" :style="androidStyle">
            <div class="back-icon-box" @click="goback">
                <image :src="getLocalImgUrl('ask_back.png')" class="back-icon"></image>
            </div>
            <text class="head-title">问答详情</text>
            <div class="share-icon-box" @click="showShareBox">
                <image :src="getLocalImgUrl('ask_share.png')" class="share-icon"></image>
            </div>
        </div>
        <!-- 问题详情 -->
        <div class="top-content">
            <title1 :data='titleDate'></title1>
            <text class="detail-brief" :class="[showBrief ? 'auto-hight':'brief-hight']" @click="briefShow">{{detail.content}}</text>
            <div class="video-box">
                <image v-if="detail.videos.length && videopaused && detail.videos[0].img !== null" :src="cutImg(detail.videos[0].img,650,366)" class="detail-img" @click="paused"></image>
                <image v-if="detail.videos.length && videopaused" :src="getLocalImgUrl('playIcon3x.png')" class="play-icon" @click="paused"></image>
            </div>
            <video-player v-if="detail.videos.length && !videopaused" :src='detail.videos[0].host+detail.videos[0].dir+detail.videos[0].filename+"."+detail.videos[0].mtype' :options='videoPlayerOptions'></video-player>
            <image v-if="detail.pics.length && showBrief" :src="cutImg(detail.pics[0],650,300)" class="detail-img" :class="[detail.videos.length ? 'video-margin':'']" @click="showImg(detail.pics)"></image>
        </div>
        <div class="drop-content">
            <div class="drop-content-text">
                <text v-if="best_answer==='0'" class="reward-money">悬赏金额：{{detail.reward_points}}积分</text>
            </div>
            <div class="autobrief-icon-box" v-if="showBrief && detail.content!=''"  @click="briefShow">
                <image :src="getLocalImgUrl('ask_autobrief.png')" class="autobrief-icon"></image>
            </div>
            <div v-if="!showBrief  && detail.content!=''" class="showbrief-icon-box" @click="briefShow">
                <image :src="getLocalImgUrl('ask_showbrief.png')" class="showbrief-icon" ></image>
            </div>
        </div>

        <div class="bgline"></div>
            <!-- 回帖评论列表 -->
        <list class="list-inner" v-if="commentList.length">
            <refresh @refresh="onCommentrefresh"  :display="commentRefreshing ? 'show' : 'hide'">
                <refresh-style></refresh-style>
            </refresh>
            <cell v-for="(item,idx) in commentList" :key="idx">
                <list2 :data='item'  :best_answer='best_answer' :hasSetBestAnswer='hasSetBestAnswer'
                @moreReply="openBottomPopup"
                @commentArea='openCommentArea'
                @postReplyArea='postReplyArea'
                @setBest='setBest'
                @praise='praise'></list2>
            </cell>
            <loading class="loading-box" @loading="commentloading" :display="commentLoadinging ? 'show' : 'hide'">
                <loading-indicator v-if='commentLoadinging' class="indicator"></loading-indicator>
                <text v-if='commentLoadinging' class="loading-text">加载中...</text>
            </loading>
        </list>
        <div class="no-comment" v-else>
            <image :src="getLocalImgUrl('ask_noComment.png')" class="no-comment-img"></image>
        </div>
        <!-- 底部评论input -->
        <div class="comment-bottom" :class="[this.isIphoneX() ? 'ipx-bottom' : '']">
            <text class="comment-input" @click="openPostArea">我来回答：</text>
            <div class="like-box">
                <text class="ask-likenum">{{detail.praise_num}}</text>
                <image v-if='!detail.is_praised' @click='praise({id:detail.id,type:"praise"})' :src="getLocalImgUrl('ask_like.png')" class="emoji-img"></image>
                <image v-else @click='praise({id:detail.id,type:"delPraise"})' :src="getLocalImgUrl('ask_detailParise.png')" class="emoji-img"></image>
            </div>
        </div>
        <!-- 弹出更多评论 -->
        <wxc-popup popup-color="rgb(255,255,255)"
               :show="isBottomShow"
               @wxcPopupOverlayClicked="popupOverlayBottomClick"
               pos="bottom"
               height="1000"
               ref="wxcPopup"
            >
            <list class="more-reply-content">
                <cell class="close-more-box">
                    <image :src="getLocalImgUrl('ask_shouqi.png')" class="close-more-icon"></image>
                    <text class="close-more-reply" @click="popupOverlayBottomClick">收起评论</text>
                </cell>
                <refresh @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                    <refresh-style></refresh-style>
                </refresh>
                <cell class="reply-inner" v-for="(list,index) in moreCommentList" :key="index">
                    <list5 :data='list' :id='moreReplyId' @commentArea='postReplyArea'></list5>
                </cell>
                <loading class="loading-box" @loading="replyOnloading" :display="replyLoadinging ? 'show' : 'hide'">
                    <loading-indicator v-if='commentLoadinging' class="indicator"></loading-indicator>
                    <text v-if='replyLoadinging' class="loading-text">加载中...</text>
                </loading>
            </list>
        </wxc-popup>
        <!-- 弹出评论框 -->
        <wxc-popup popup-color="rgb(255,255,255)"
               :show="isBottomShowArea"
               @wxcPopupOverlayClicked="popupOverlayBottomClickArea"
               pos="bottom"
               height="300"
               ref="wxcPopupArea">
        <div class="comment-container">
            <textarea type="text" class="comment-area" placeholder="请输入评论内容" v-model="commentContent"></textarea>
            <div class="comment-top">
                <text class="top-publish" @click="goComment">发布</text>
            </div>
        </div>
        </wxc-popup>
        <!-- 弹出分享弹框 -->
        <wxc-popup popup-color="rgb(255,255,255)"
               :show="isBottomShowShare"
               @wxcPopupOverlayClicked="popupOverlayBottomClickShare"
               pos="bottom"
               height="570"
               ref="wxcPopupShare">
            <div class="share-container">
                <div class="share-container-top">
                    <div class="share-container-box" @click="goShare('WeiXinFriend')">
                        <image :src="getLocalImgUrl('ask_wechat.png')" class="share-container-icon"></image>
                        <text class="share-container-text">微信</text>
                    </div>
                    <div class="share-container-box" @click="goShare('WeiXinTimeline')">
                        <image :src="getLocalImgUrl('ask_friend.png')" class="share-container-icon"></image>
                        <text class="share-container-text">微信朋友圈</text>
                    </div>
                    <div class="share-container-box" @click="goShare('Sina')">
                        <image :src="getLocalImgUrl('ask_weibo.png')" class="share-container-icon"></image>
                        <text class="share-container-text">微博</text>
                    </div>
                    <div class="share-container-box" @click="goShare('QQFriend')">
                        <image :src="getLocalImgUrl('ask_qq.png')" class="share-container-icon"></image>
                        <text class="share-container-text">QQ好友</text>
                    </div>
                    <div class="share-container-box" @click="goShare('QQZone')">
                        <image :src="getLocalImgUrl('ask_qqArea.png')" class="share-container-icon"></image>
                        <text class="share-container-text">QQ空间</text>
                    </div>
                    <div class="share-container-box">
                        <image v-if='!collectState' :src="getLocalImgUrl('ask_collect.png')" class="share-container-icon" @click="goCollect()"></image>
                        <image v-else :src="getLocalImgUrl('ask_isCollect.png')" class="share-container-icon" @click="delCollect()"></image>
                        <text class="share-container-text">收藏</text>
                    </div>
                    <div class="share-container-box" @click="tousu">
                        <image :src="getLocalImgUrl('ask_tousu.png')" class="share-container-icon"></image>
                        <text class="share-container-text">投诉</text>
                    </div>
                    <div v-if="hasSetBestAnswer" class="share-container-box" @click="delPost">
                        <image :src="getLocalImgUrl('ask_del.png')" class="share-container-icon"></image>
                        <text class="share-container-text">删除</text>
                    </div>
                </div>
                <text class="share-container-cancel-text" @click="popupOverlayBottomClickShare">取消</text>
            </div>
        </wxc-popup>
        <wxc-loading :show="loadingShow"></wxc-loading>
    </div>
</template>

<script>
import List2 from '../../components/wenda/List2.vue'
import List5 from '../../components/wenda/List5.vue'
import Title1 from '../../components/wenda/Title1'
import { WxcPopup, WxcLoading } from 'weex-ui'
import { nativeUtil } from '../../lib/nativeUtils'
import RefreshStyle from '../../components/common/RefreshStyle'
import VideoPlayer from '../../components/common/video'
// let storage = weex.requireModule('storage')
export default {
  name: 'Detail',
  components: {
    List2,
    List5,
    Title1,
    WxcPopup,
    WxcLoading,
    RefreshStyle,
    VideoPlayer
  },
  data () {
    return {
      commentList: [],
      moreCommentList: [],
      titleDate: '',
      showBrief: false,
      isBottomShow: false,
      isBottomShowArea: false,
      isBottomShowShare: false,
      post_id: '',
      detail: '',
      commentContent: '',
      comment_id: '',
      reply_id: '',
      moreReplyId: '',
      replyLoadinging: false,
      offset: 3,
      refreshing: '',
      forum_id: '',
      best_answer: '',
      commentRefreshing: false,
      commentLoadinging: false,
      access_token: '',
      userid: '',
      post_userid: '',
      hasSetBestAnswer: Boolean,
      videoPlayerOptions: {width: 650, height: 366},
      videopaused: true,
      collectState: Boolean,
      custom_appid: '',
      custom_appkey: '',
      statusbar_height: '',
      loadingShow: true
    }
  },
  methods: {
    // 投诉
    tousu () {
      nativeUtil.linkTo('help2/CompReportStyle1')
    },
    // 分享
    goShare (type) {
      const param = {
        title: this.detail.title,
        brief: this.detail.content,
        shareType: type,
        contentUrl: this.detail.content_url
      }
      nativeUtil.shareTo(param)
    },
    // 获取收藏状态
    getCollectState () {
      nativeUtil.getLoginStatus().then(res => {
        if (res === '0') {
          nativeUtil.goLogin()
        } else {
          const param = {
            content_id: this.post_id
          }
          nativeUtil.obtainCollectedState(param).then(res => {
            if (res === '1') {
              this.collectState = true
            } else {
              this.collectState = false
            }
          })
        }
      })
    },
    // 去收藏
    goCollect () {
      nativeUtil.getLoginStatus().then(res => {
        if (res === '0') {
          nativeUtil.goLogin()
        } else {
          let extra = {
            module_id: 'help',
            content_data: this.detail,
            outLink: 'local://weexJs/ModWeexStyle5WendaDetail.js?id=' + this.post_id
          }
          let extraStr = JSON.stringify(extra)
          const param = {
            title: this.detail.title,
            content_id: this.post_id,
            app_uniqueid: 'help',
            mod_uniqueid: 'help',
            extra: extraStr
          }
          nativeUtil.executeCollectOperation(param).then(res => {
            if (res === '1') {
              nativeUtil.alert('收藏成功')
              this.getCollectState()
            }
          })
        }
      })
    },
    // 取消收藏
    delCollect () {
      const param = {
        content_id: this.post_id
      }
      nativeUtil.cancelCollectOperation(param).then(res => {
        if (res === '1') {
          nativeUtil.alert('取消收藏成功')
          this.getCollectState()
        }
      })
    },
    goback () {
      this.goBack()
    },
    // 详情展示
    briefShow () {
      this.showBrief = !this.showBrief
    },
    // 视频播放
    paused () {
      this.videopaused = !this.videopaused
    },
    // 更多评论加载更多
    replyOnloading () {
      this.offset += 10
      this.replyLoadinging = true
      this.openBottomPopup({id: this.moreReplyId, offset: this.offset})
    },
    // 更多评论下拉刷新
    onrefresh () {
      this.refreshing = true
      this.offset = 3
      this.openBottomPopup({id: this.moreReplyId, offset: this.offset})
    },
    // 评论列表下拉刷新
    onCommentrefresh () {
      this.commentRefreshing = true
      this.offset = 0
      this.getComment(this.offset)
    },
    // 评论列表加载更多
    commentloading () {
      this.offset += 10
      this.commentLoadinging = true
      this.getComment(this.offset)
    },
    // 展示图片
    showImg (data) {
      let pics = []
      if (data.length) {
        data.forEach((v, k) => {
          pics.push(this.cutImg(v))
        })
      }
      const param = {
        index: '0',
        imgs: pics
      }
      nativeUtil.viewPictures(param)
    },
    // 对问题回帖
    openPostArea () {
      nativeUtil.getLoginStatus().then(res => {
        if (res === '0') {
          nativeUtil.goLogin()
        } else {
          nativeUtil.getUserInfo().then(res => {
            this.access_token = res.userTokenKey
            this.isBottomShowArea = true
          })
        }
      })
    },
    // 对回帖评论
    openCommentArea (id) {
      nativeUtil.getLoginStatus().then(res => {
        if (res === '0') {
          nativeUtil.goLogin()
        } else {
          nativeUtil.getUserInfo().then(res => {
            this.access_token = res.userTokenKey
            this.comment_id = id
            this.isBottomShowArea = true
          })
        }
      })
    },
    // 对回帖评论回复
    postReplyArea (data) {
      nativeUtil.getLoginStatus().then(res => {
        if (res === '0') {
          nativeUtil.goLogin()
        } else {
          nativeUtil.getUserInfo().then(res => {
            this.access_token = res.userTokenKey
            this.comment_id = data.postId
            this.reply_id = data.replyId
            this.isBottomShowArea = true
          })
        }
      })
    },
    // 关闭更多评论列表
    popupOverlayBottomClick () {
      this.$refs.wxcPopup.hide()
      setTimeout(() => {
        this.isBottomShow = false
      }, 1000)
    },
    // 关闭评论框
    popupOverlayBottomClickArea () {
      this.$refs.wxcPopupArea.hide()
      setTimeout(() => {
        this.isBottomShowArea = false
      }, 1000)
    },
    // 关闭分享框
    popupOverlayBottomClickShare () {
      this.$refs.wxcPopupShare.hide()
      setTimeout(() => {
        this.isBottomShowShare = false
      }, 1000)
    },
    // 点赞
    praise (data) {
      nativeUtil.getLoginStatus().then(res => {
        if (res === '0') {
          nativeUtil.goLogin()
        } else {
          nativeUtil.getUserInfo().then(res => {
            this.access_token = res.userTokenKey
            let param = {
              m: 'Apibbs',
              c: 'post',
              a: 'praise',
              custom_appid: this.custom_appid,
              custom_appkey: this.custom_appkey,
              access_token: this.access_token,
              post_id: data.id
            }
            //   取消点赞
            if (data.type === 'delPraise') {
              param.op = 'del'
            }
            this.$httpRequest(this.api.home_column, param, 'post').then(res => {
              if (!res.ErrorCode) {
                if (data.type === 'delPraise') {
                  nativeUtil.alert('取消点赞成功')
                } else {
                  nativeUtil.alert('点赞成功')
                }
                this.getDetail()
                this.getComment(0)
              } else {
                nativeUtil.alert(res.ErrorText)
              }
            }, (e) => {
              console.log(e)
            })
          })
        }
      })
    },
    // 获取问题详情
    async getDetail () {
      this.loadingShow = true
      let param = {
        m: 'Apibbs',
        c: 'post',
        a: 'detail',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        post_id: this.post_id
      }
      const result = await nativeUtil.getUserInfo()
      if (result) {
        param.access_token = result.userTokenKey
        this.access_token = result.userTokenKey
        this.userid = result.userid
      }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        if (!res.ErrorCode) {
          this.loadingShow = false
          this.detail = res
          this.titleDate = this.detail
          this.forum_id = res.forum_id
          this.post_userid = res.user_id
          if (this.userid && this.post_userid === this.userid) {
            this.hasSetBestAnswer = true
          } else {
            this.hasSetBestAnswer = false
          }
          this.best_answer = res.best_answer
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 获取问题回帖列表
    async getComment (offset) {
      this.loadingShow = true
      let param = {
        m: 'Apibbs',
        c: 'post',
        a: 'index',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        post_fid: this.post_id,
        count: 10,
        offset: offset
      }
      const result = await nativeUtil.getUserInfo()
      if (result) {
        param.access_token = result.userTokenKey
      }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        if (!res.ErrorCode) {
          this.loadingShow = false
          if (offset === 0) {
            this.commentList = res
          } else {
            if (res.length) {
              this.commentList = this.commentList.concat(res)
            } else {
              nativeUtil.alert('没有更多了')
            }
          }
          this.commentLoadinging = false
          this.commentRefreshing = false
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 展示更多评论框
    openBottomPopup (data) {
      this.moreReplyId = data.id
      let offset = data.offset
      this.isBottomShow = true
      const param = {
        m: 'Apibbs',
        c: 'comment',
        a: 'index',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        post_id: this.moreReplyId,
        count: 10,
        offset: offset
      }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        if (!res.ErrorCode) {
          if (offset === 3) {
            this.moreCommentList = res
          } else {
            if (res.length) {
              this.moreCommentList = this.moreCommentList.concat(res)
            } else {
              nativeUtil.alert('没有更多了')
            }
          }
          this.refreshing = false
          this.replyLoadinging = false
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 发布评论
    goComment () {
      let param = {
        m: 'Apibbs',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        access_token: this.access_token,
        content: this.commentContent,
        forum_id: this.forum_id,
        complete_status: 1
      }
      if (!this.comment_id && !this.reply_id) { // 对问题回帖
        param.c = 'post'
        param.a = 'create'
        param.post_fid = this.post_id
      } else if (this.comment_id && !this.reply_id) { // 对回帖评论
        param.c = 'post'
        param.a = 'comment'
        param.post_id = this.comment_id
      } else if (this.reply_id) { // 对回帖的评论回复
        param.c = 'post'
        param.a = 'comment'
        param.post_id = this.comment_id
        param.reply_id = this.reply_id
      }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        if (!res.ErrorCode) {
          nativeUtil.alert('评论成功')
          this.isBottomShowArea = false
          this.commentContent = ''
          this.getComment(0)
          this.popupOverlayBottomClick()
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 设置最佳答案
    setBest (id) {
      const param = {
        m: 'Apibbs',
        c: 'post',
        a: 'setBestAnswer',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        access_token: this.access_token,
        post_id: id
      }
      this.$httpRequest(this.api.home_column, param, 'post').then(res => {
        if (!res.ErrorCode) {
          nativeUtil.alert('设置成功')
          this.getDetail()
          this.getComment(0)
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 展示底部分享 收藏 投诉 删除框
    showShareBox () {
      nativeUtil.getLoginStatus().then(res => {
        if (res === '0') {
          nativeUtil.goLogin()
        } else {
          this.isBottomShowShare = true
          this.getCollectState()
        }
      })
    },
    // 删除问题
    delPost () {
      const param = {
        m: 'Apibbs',
        c: 'post',
        a: 'delete',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        post_id: this.post_id,
        access_token: this.access_token
      }
      this.$httpRequest(this.api.home_column, param, 'post').then(res => {
        if (!res.error) {
          nativeUtil.alert('删除成功')
          this.goBack()
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 获取配置文件
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'id': '10044',
          'uniqueid': 'help2',
          'type': '1',
          'name': '问答',
          'ename': 'help2',
          'custom_name': '问答',
          'normal_pic': '',
          'press_pic': '',
          'url': '',
          'is_master': '0',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '0',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle5',
          'android_min': null,
          'android_max': null,
          'ios_min': null,
          'ios_max': null,
          'attrs': {
            'navBarTitle': '',
            'button_backgroundcolor': '#fff7402f',
            'navBarTitleColor': '#ffffffff',
            'navbarDividerColor': '#ffcacaca',
            'listBackground': '#fff9f9f9',
            'moduleBatteryBar': '1'
          },
          'api': {
            'content_detail': 'content_detail',
            'dept_list': 'dept_list',
            'detail_comment_list': 'detail_comment_list',
            'home_column': 'http://bbssc.cloud.hoge.cn',
            'home_list': 'http://bbssc.cloud.hoge.cn',
            'home_list_mine': 'home_list_mine',
            'send_content': 'send_content'
          }
        }
        this.api = this.config.api
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'help2'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
      }
      const result = await nativeUtil.getSystemInfo()
      if (result) {
        this.custom_appid = result.custom_appid
        this.custom_appkey = result.custom_appkey
        if (result.statusbar_height) {
          this.statusbar_height = result.statusbar_height
        }
        this.post_id = this.getQuery().id
        this.getDetail()
        this.getComment(0)
      }
    }
  },
  computed: {
    androidStyle () {
      if (this.statusbar_height) {
        return {
          paddingTop: `${this.statusbar_height}px`
        }
      }
    }
  },
  created () {
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">
.detail-wrapper{
    width: 750px;
    flex: 1;
}
.ipx{
    margin-top: 40px;
}
.ipx-bottom{
    margin-bottom: 20px
}
.head{
    width: 750px;
    padding-bottom: 25px;
    flex-direction: row;
    padding-top: 58px;
    padding-left: 50px;
    padding-right: 50px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color:#F0F0F0;
}
.head-title{
    flex: 1;
    text-align: center;
    font-size: 36px;
}
.list-inner{
    width: 750px;
    flex: 1;
    margin-bottom:100px
}
.back-icon{
    width: 20px;
    height: 38px;
}
.back-icon-box{
    width: 50px;
    height: 50px;
}
.share-icon-box{
    width: 50px;
    height: 50px;
    justify-content: center;
}
.share-icon{
    width: 32px;
    height: 10px;
}
.top-content{
    padding-top: 20px;
    padding-left: 50px;
    padding-right: 50px;
}
.detail-brief{
    width: 660px;
    margin-top: 10px;
    font-size: 28px;
    color: #666666;
}
.reward-money{
    // width: 750px;
    height: 40px;
    color: #FBAC04;
    font-size:28px;
    padding-right: 50px;
    margin-bottom: 10px;
    margin-top: 10px;
}
.auto-hight{
    height: auto;
}
.brief-hight{
    lines: 2;
    text-overflow: ellipsis
}
.drop-content{
    width: 750px;
    height: 70px;
    padding-left: 50px;
    padding-right: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between
}
.drop-content-text{
     width: 625px;
}
.showbrief-icon-box{
    width: 35px;
    height: 25px;
}
.autobrief-icon-box{
     width: 35px;
    height: 25px;
}
.showbrief-icon{
    width: 25px;
    height: 15px;
}
.autobrief-icon{
     width: 25px;
    height: 15px;
}
.comment-bottom{
    position: fixed;
    bottom: 0;
    width: 750px;
    height: 100px;
    border-top-style: solid;
    border-top-width: 2px;
    border-top-color: #eee;
    flex-direction: row;
    align-items: center;
    padding-left: 32px;
    background-color: #fff;
}
.comment-input{
    width: 588px;
    height: 64px;
    line-height: 64px;
    font-size: 28px;
    border-bottom-left-radius:32px;
    border-bottom-right-radius:32px;
    border-top-left-radius:32px;
    border-top-right-radius:32px;
    background-color: #F2F2F2;
    padding-left: 32px;
    margin-right: 30px;
    color:#cccccc;
}
.detail-img{
    width: 650px;
    height: 300px;
}
.emoji-img{
    width: 48px;
    height: 48px;
}
.like-box{
    align-items: center
}
.ask-likenum{
    font-size: 20px;
    color:#666666;
}
.bgline{
    width: 750px;
    height: 20px;
    background-color: #F8F8F8;
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
  color: #F7402E
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
.mask-content{
    width: 600px;
    height: 550px;
    align-items: center;
}
.publish-img{
    width: 600px;
    height: 237px;
}
.publish-title{
    padding-top: 62px;
    font-size: 34px;
}
.publish-button{
    width: 420px;
    height: 80px;
    margin-top: 80px;
    line-height: 80px;
    text-align: center;
    color:#fff;
    font-size: 34px;
    background-color: #f7402e;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
}
.loading-box{
  width: 750px;
  height: 150px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.indicator {
  height: 40px;
  width: 40px;
  margin-right: 15px;
  color: skyblue;
}
.loading-text{
  text-align: center;
}
.share-container{
  position: absolute;
  bottom: 0;
  width: 750px;
  height: 570px;
  background-color: #fff;
}
.share-container-top{
    width: 750px;
    height: 470px;
    background-color: #F0F0F0;
    padding-top: 50px;
    padding-bottom: 50px;
    padding-right: 30px;
    padding-left: 30px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
.share-container-box{
    width: 145px;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px
}
.share-container-icon{
    width: 115px;
    height: 115px;
    margin-bottom: 20px;
}
.share-container-text{
    color: #333333;
    font-size: 24px;
}
.share-container-cancel-text{
    width: 750px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #333333;
    font-size: 34px;
}
.no-comment{
    width: 750px;
    height: 800px;
    align-items: center;
    justify-content: center;
}
.no-comment-img{
    width: 300px;
    height: 200px;
}
.play-icon{
  width: 88px;
  height:88px;
  position: absolute;
  top:100px;
  left:300px;
}
.video-margin{
    margin-top: 20px;
}
</style>
