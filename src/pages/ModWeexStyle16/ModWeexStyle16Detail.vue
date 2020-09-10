<template>
     <div class="home-wrapper">
       <!-- 头部 -->
       <nav :is-back="true"></nav>
       <!-- <text>{{access_token}}</text> -->
       <!-- 报料主体部分 -->
       <list class="contribute-box" show-scrollbar="false" v-if="detailData.id">
          <refresh @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'" class="refresh">
            <refresh-style></refresh-style>
          </refresh>
           <!-- 报料内容部分 -->
           <cell class="contribute-content" >
              <!-- 头部 -->
             <list-header :item="detailData"></list-header>
              <!-- 列表主体 -->
              <div class="list-main">
                <!-- 标题 -->
                <div class="main-title-box">
                  <!-- 热门暂时注释功能
                  <div class="hot-box">
                      <text class="hot-box-text">热</text>
                  </div> -->
                  <text class="main-title">{{detailData.brief}}</text>
                </div>
                <!-- 图片区域 -->
                <div class="main-img-box" v-if="detailData.file && detailData.file.length">
                  <detail :data="detailData.file"></detail>
                </div>
                <!-- 定位区域 -->
                <div class="address-box" v-if="detailData.region">
                    <image resize="contain" :src="getLocalImgUrl('adr-fh2x.png')" class="address-img"></image>
                    <text class="address-box-title">{{detailData.region}}</text>
                </div>
              </div>
           </cell>
            <!-- 底部间隙分割线 -->
            <cell class="bottom-line"></cell>
            <!-- 处理进度 网友评论，关注此事 -->
            <!-- :class="[currentIdx != 1?'pb100':'']" -->
            <cell class="detail-info" >
                <!-- tab切换 -->
                <div class="tab-box">
                    <div class="tab-item" @click="tabChange(tab)" v-for="(tab,idx) in tabList" :key="idx">
                        <text class="tab-text-active" v-if="currentIdx == tab.id">{{tab.name}}</text>
                        <text class="tab-text" v-if="currentIdx != tab.id">{{tab.name}}</text>
                        <div class="border-line-box">
                          <div class="border-lines" :class="[currentIdx == tab.id ? 'border-act':'']"></div>
                        </div>

                    </div>
                </div>
                <!-- tab内容 -->
                <div class="tab-content" >
                    <process-progress v-if="currentIdx==0" :progress="progress"></process-progress>
                    <netizen-comment v-if="currentIdx==1" :comment="comment"></netizen-comment>
                    <follow-matter v-if="currentIdx==2" :follow="follow"></follow-matter>
                </div>
            </cell>
            <!-- 加载更多 start -->
            <loading v-if="hasMore && currentIdx == 1 && comment.length" class="loading-box" @loading="onloading" :display="loadingmore ? 'show' : 'hide'">
              <loading-indicator class="indicator"></loading-indicator>
              <text class="loading-text">加载中</text>
            </loading>
            <cell v-if="!hasMore && currentIdx == 1 && comment.length">
              <text class="no-more-data">没有更多了</text>
            </cell>
            <!-- 加载更多 end -->
       </list>
        <!-- 底部评论input -->
        <div class="comment-bottom" :class="[this.isIphoneX() ? 'ipx-bottom' : '']">
            <text class="comment-input" @click="openPostArea">有何高见，展开讲讲？</text>
            <!-- 评论总数 -->
            <div class="bottom-comment-box" @click="goCommentPage()">
              <image resize="contain" :src="getLocalImgUrl('comment-fh2x.png')" class="comment-img"></image>
            </div>
            <div class="num-box">
                <text class="num-box-text">{{pageOption.total}}</text>
            </div>
            <!-- 点赞 -->
            <div class="star-img-box" v-if="detailData.is_praise==2" @click="goPraise()">
              <image resize="contain" :src="getLocalImgUrl('icon_collect3x.png')" class="star-img" ></image>
            </div>
            <div class="star-img-box" v-if="detailData.is_praise==1" @click="goCancel()">
              <image resize="contain" :src="getLocalImgUrl('star-fh2x.png')" class="star-img" ></image>
            </div>
               <!-- 点赞 end-->
             <div class="share-img-box" @click="showShareBox">
              <image resize="contain"  :src="getLocalImgUrl('share-fh2x.png')" class="share-img"></image>
            </div>

        </div>
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
                  <text class="cancel-publish"
                  @click="popupOverlayBottomClickArea">取消</text>
                  <text class="top-publish" :class="[commentContent.length?'top-publish-active':'']"
                  @click="goComment">发布</text>
              </div>
          </div>
        </wxc-popup>
        <!-- 弹出分享弹框 -->
        <wxc-popup popup-color="rgb(255,255,255)"
               :show="isBottomShowShare"
               @wxcPopupOverlayClicked="popupOverlayBottomClickShare"
               pos="bottom"
               height="350"
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
                    <div class="share-container-box" @click="goShare('DingTalk')">
                        <image :src="getLocalImgUrl('dingding.png')" class="share-container-icon"></image>
                        <text class="share-container-text">钉钉</text>
                    </div>
                </div>
                <text class="share-container-cancel-text" @click="popupOverlayBottomClickShare">取消</text>
            </div>
        </wxc-popup>
       <show-loading
              :show="loading"
              type="custom"
              m-url="loading.gif"
              m-width="120"
              m-height="120"
              m-backgroundcolor="#f2f6fa"
          >
        </show-loading>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
// const picker = weex.requireModule('picker')
import nav from '../../components/weexstyle16/nav'
import listHeader from '../../components/weexstyle16/listHeader'
import RefreshStyle from '../../components/common/RefreshStyle'
import detail from '../../components/weexstyle16/detail'
import processProgress from '../../components/weexstyle16/processProgress'
import netizenComment from '../../components/weexstyle16/netizenComment'
import followMatter from '../../components/weexstyle16/followMatter'
import { WxcPopup, WxcLoading } from 'weex-ui'
import ShowLoading from '../../components/common/ShowLoading'
export default {
  name: 'ModWeexStyle16',
  data () {
    return {
      config: {},
      custom_appid: '',
      custom_appkey: '',
      access_token: '',
      param: {},
      loading: true,
      help_id: '',
      detailData: {},
      progress: {
        reply: [],
        assign: [],
        load: true
      },
      comment: [],
      tabList: [
        {name: '处理进度', id: 0},
        {name: '网友评论', id: 1},
        {name: '关注此事', id: 2}
      ],
      currentIdx: 0,
      hasMore: true,
      loadingmore: false,
      pageOption: {
        page: 1,
        size: 3,
        total: 0
      },
      follow: [],
      isBottomShowArea: false,
      isBottomShowShare: false,
      commentContent: '',
      refreshing: false
    }
  },
  components: {
    nav,
    WxcPopup,
    WxcLoading,
    listHeader,
    detail,
    processProgress,
    netizenComment,
    followMatter,
    ShowLoading,
    RefreshStyle
  },
  methods: {
    // 关闭评论框
    popupOverlayBottomClickArea () {
      this.$refs.wxcPopupArea.hide()
      setTimeout(() => {
        this.isBottomShowArea = false
      }, 1000)
    },
    // 打开评论 鉴权
    openPostArea () {
      if (this.getPlatform() === 'web') {
        this.isBottomShowArea = true
      } else {
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
      }
    },
    // 提交评论
    goComment () {
      if (!this.commentContent.length) {
        return
      }
      // this.dataLoading = true
      let param = {
        m: 'Apihelp',
        c: 'fact',
        a: 'comentCreate',
        help_id: this.help_id,
        content: this.commentContent
      }
      if (this.getPlatform() === 'web') {
        param = Object.assign(param, this.param)
      } else {
        param.custom_appid = this.custom_appid
        param.custom_appkey = this.custom_appkey
        param.access_token = this.access_token
      }
      this.$httpRequest(this.api.home_list, param, 'post').then(res => {
        if (res.code === 0) {
          if (this.getPlatform() === 'web') {
            alert('评论成功')
          } else {
            nativeUtil.alert('评论成功')
          }
          this.isBottomShowArea = false
          this.commentContent = ''
          this.pageOption.page = 1
          this.getComment()
          this.popupOverlayBottomClick()
        } else {
          nativeUtil.alert(res.message)
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 打开分享
    showShareBox () {
      this.isBottomShowShare = true
    },
    // 分享
    goShare (type) {
      const param = {
        title: this.detailData.brief,
        brief: this.detailData.brief,
        shareType: type,
        contentUrl: this.detailData.content_url
      }
      nativeUtil.shareTo(param)
    },
    // 关闭分享框
    popupOverlayBottomClickShare () {
      this.$refs.wxcPopupShare.hide()
      setTimeout(() => {
        this.isBottomShowShare = false
      }, 1000)
    },
    // 点赞踩
    goPraise () {
      if (this.detailData.is_review === 1) {
        nativeUtil.alert('操作失败')
        return
      }
      // web 不验证登录
      if (this.getPlatform() === 'web') {
        let param = {
          m: 'Apihelp',
          c: 'help',
          a: 'praise',
          help_id: this.help_id,
          type: 1
        }
        param = Object.assign(param, this.param)
        this.$httpRequest(this.api.home_list, param, 'post').then(res => {
          if (res.code === 0) {
            this.detailData.is_praise = 1
          } else {
            nativeUtil.alert('操作失败')
          }
        }, (e) => {
          console.log(e)
        })
        return
      }

      nativeUtil.getLoginStatus().then(res => {
        if (res === '0') {
          nativeUtil.goLogin()
        } else {
          nativeUtil.getUserInfo().then(res => {
            this.access_token = res.userTokenKey
            let param = {
              m: 'Apihelp',
              c: 'help',
              a: 'praise',
              access_token: this.access_token,
              help_id: this.help_id,
              type: 1,
              custom_appid: this.custom_appid,
              custom_appkey: this.custom_appkey
            }
            this.$httpRequest(this.api.home_list, param, 'post').then(res => {
              if (res.code === 0) {
                this.detailData.is_praise = 1
              } else {
                nativeUtil.alert(res.message)
              }
            }, (e) => {
              console.log(e)
            })
          })
        }
      })
    },
    // 取消点赞踩
    goCancel () {
      // web 不验证登录
      if (this.getPlatform() === 'web') {
        let param = {
          m: 'Apihelp',
          c: 'help',
          a: 'cancel',
          help_id: this.help_id,
          type: 1
        }
        param = Object.assign(param, this.param)
        this.$httpRequest(this.api.home_list, param, 'post').then(res => {
          if (res.code === 0) {
            this.detailData.is_praise = 2
          } else {
            nativeUtil.alert('操作失败')
          }
        }, (e) => {
          console.log(e)
        })
        return
      }

      nativeUtil.getLoginStatus().then(res => {
        if (res === '0') {
          nativeUtil.goLogin()
        } else {
          nativeUtil.getUserInfo().then(res => {
            this.access_token = res.userTokenKey
            let param = {
              m: 'Apihelp',
              c: 'help',
              a: 'cancel',
              access_token: this.access_token,
              help_id: this.help_id,
              type: 1,
              custom_appid: this.custom_appid,
              custom_appkey: this.custom_appkey

            }
            this.$httpRequest(this.api.home_list, param, 'post').then(res => {
              if (res.code === 0) {
                this.detailData.is_praise = 2
              } else {
                nativeUtil.alert(res.message)
              }
            }, (e) => {
              console.log(e)
            })
          })
        }
      })
    },
    // 加载更多
    onloading () {
      this.loadingmore = true
      if (!this.hasMore) {
        this.loadingmore = false
        return
      }
      this.pageOption.page += 1
      this.getComment()
    },
    // tab切换
    tabChange (tab) {
      this.currentIdx = tab.id
    },
    // 下拉刷新
    onrefresh () {
      this.pageOption.page = 1
      this.refreshing = true
      this.getData()
    },
    // 获取数据
    getData () {
      this.detailList()
      this.getProcess()
      this.getComment()
      this.getFollow()
    },
    // 获取用户信息
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'id': '11984',
          'uniqueid': 'weexreport',
          'type': '1',
          'name': '新时代报料',
          'ename': 'weexreport',
          'custom_name': '新时代报料',
          'normal_pic': '',
          'press_pic': '',
          'url': '',
          'is_master': '0',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '1',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle16',
          'android_min': null,
          'android_max': null,
          'ios_min': null,
          'ios_max': null,
          'ui_android_depends': '',
          'attrs': [ ],
          'api': {
            'content_detail': 'content_detail',
            'dept_list': 'dept_list',
            'detail_comment_list': 'detail_comment_list',
            'ebook_detail': 'ebook_detail',
            'ebook_list': 'ebook_list',
            'home_column': 'http://mobile.fhtv.net.cn/fhtw/news_slide.php',
            'home_list': 'http://help-api.cloud.hoge.cn/index.php',
            // 'home_list': 'http://helpsc.cloud.hoge.cn/index.php',
            'home_list_mine': 'home_list_mine',
            'my_listen': 'my_listen',
            'my_look': 'my_look',
            'my_speak': 'my_speak',
            'my_write': 'my_write',
            'send_content': 'send_content'
          }
        }
        this.api = this.config.api
        this.getData()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'weexreport'
        }
        // 获取api
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        // 获取appid/appkey
        const result = await nativeUtil.getSystemInfo()
        if (result) {
          this.custom_appid = result.custom_appid
          this.custom_appkey = result.custom_appkey
          this.getData()
        }
      }
    },
    // 获取详情数据 鉴权获取点赞状态
    detailList () {
      // this.dataLoading = true
      let param = {
        m: 'Apihelp',
        c: 'fact',
        a: 'detail',
        help_id: this.help_id
      }
      if (this.getPlatform() === 'web') {
        param = Object.assign(param, this.param)
        this.$httpRequest(this.api.home_list, param, 'get').then(res => {
          if (res.code === 0) {
            this.detailData = res.data
            this.loading = false
            this.refreshing = false
          } else {
            nativeUtil.alert(res.message)
            this.refreshing = false
          }
        }, (e) => {
          console.log(e)
        })
      } else {
        param.custom_appid = this.custom_appid
        param.custom_appkey = this.custom_appkey
        nativeUtil.getUserInfo().then(res => {
          if (res && res.userTokenKey) {
            this.access_token = res.userTokenKey
            param.access_token = this.access_token
          }
          this.$httpRequest(this.api.home_list, param, 'get').then(res => {
            if (res.code === 0) {
              this.detailData = res.data
              this.loading = false
              this.refreshing = false
            } else {
              nativeUtil.alert(res.message)
              this.loading = false
              this.refreshing = false
            }
          }, (e) => {
            console.log(e)
          })
        })
      }
    },
    // 获取处理进度
    getProcess () {
      // this.dataLoading = true
      let param = {
        m: 'Apihelp',
        c: 'fact',
        a: 'progress',
        help_id: this.help_id
      }
      if (this.getPlatform() === 'web') {
        param = Object.assign(param, this.param)
      } else {
        param.custom_appid = this.custom_appid
        param.custom_appkey = this.custom_appkey
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (res.code === 0) {
          this.progress = res.data
          this.loading = false
        } else {
          nativeUtil.alert(res.message)
          this.loading = false
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 获取评论
    getComment () {
      let param = {
        page: this.pageOption.page,
        size: this.pageOption.size,
        m: 'Apihelp',
        c: 'fact',
        a: 'comentList',
        help_id: this.help_id
      }
      this.hasMore = true
      if (this.getPlatform() === 'web') {
        param = Object.assign(param, this.param)
      } else {
        param.custom_appid = this.custom_appid
        param.custom_appkey = this.custom_appkey
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (res.code === 0) {
          const comments = res.data.coment_list
          this.pageOption.total = res.data.total
          if (this.pageOption.page === 1) {
            this.comment = comments
          } else {
            this.comment = this.comment.concat(comments)
            if (comments.length && parseInt(comments.length, 10) < parseInt(res.data.total, 10)) {
              this.hasMore = true
            } else {
              this.hasMore = false
            }
          }
          this.loadingmore = false
        } else {
          nativeUtil.alert(res.message)
          this.loadingmore = false
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 关注此事
    getFollow () {
      // this.dataLoading = true
      let param = {
        m: 'Apihelp',
        c: 'fact',
        a: 'focus',
        help_id: this.help_id
      }
      if (this.getPlatform() === 'web') {
        param = Object.assign(param, this.param)
      } else {
        param.custom_appid = this.custom_appid
        param.custom_appkey = this.custom_appkey
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (res.code === 0) {
          this.follow = res.data
          this.loading = false
        } else {
          nativeUtil.alert(res.message)
          this.loading = false
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 去评论页
    goCommentPage () {
      this.jumpWithParams('ModWeexStyle16Comment', {id: this.help_id})
    }
  },

  created () {
    if (this.getPlatform() === 'web') {
      this.param.custom_appid = '154'
      this.param.custom_appkey = 'ihJhUxistGOuuJMT6dCveUyqupietbsB'
      this.param.access_token = '6fcb8fe9100d45b34fa0ea72767ea740'
    }
    this.help_id = this.getQuery().id
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">

.home-wrapper{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
}
.contribute-box{
  border-top-width:1px;
  border-top-color:#EDEDED;
  border-top-style:solid;
  // padding-bottom:150px;
  margin-bottom:100px;
}
//列表主体
.list-main{
  padding-left:24px;
  padding-right: 24px;
  width: 750px;
}
.main-title-box{
  padding-top:20px;
  padding-bottom:20px;
  width: 702px;
  flex-direction: row;
  align-items: center;
}
.hot-box{
  margin-right:15px;
  width: 38px;
  height:38px;
  border-bottom-left-radius:5px;
  border-bottom-right-radius:5px;
  border-top-left-radius:5px;
  border-top-right-radius:5px;
  background-color:#FA6400;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.hot-box-text{
  color:white;
  font-size: 24px;
}
.main-title{
  flex:1;
  color:#222222;
  font-size:30px;
}
//封面图
.main-img-box{
  padding-bottom:25px;
}
// 地位区域
.address-box{
  align-items: center;
  flex-direction: row;
  padding-bottom:25px;
  border-bottom-width:1px;
  border-bottom-color:#EEEEEE;
  border-bottom-style:solid;
}
.address-img{
  width: 22px;
  height:26px;
  margin-right:14px;
}
.address-box-title{
  font-size:24px;
  color:#999999;
  lines:1;
  width: 645px;
  text-overflow:ellipsis;
}
//受理进度
.list-state{
  width: 702px;
  margin-left:24px;
  margin-right:24px;
  padding-top:20px;
  padding-bottom:30px;
  position: relative;
}
.list-state-dotted{
  position: absolute;
  width: 516px;
  height:2px;
  left: 88px;
  top: 27px;
  border-bottom-style:dotted;
  border-bottom-width:1px;
  border-bottom-color:#D9D9D9;
}
.list-state-content{
  width:698px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.list-state-item{
  width: 176px;
  align-items: center;
}
.state-img-box{
  width: 34px;
  background-color:#ffffff;
  align-items: center;
}
.state-circle{
  width: 16px;
  height:16px;
}
.state-circle-active{
  width: 16px;
  height:16px;
}
.state-text-box{
  padding-top:12px;
  padding-bottom:8px;
}
.state-active-text{
  color:#00AFFE;
  font-size: 24px;

}
.state-normal-text{
  color:#666666;
  font-size: 24px;

}
.state-time-box{
  height:22px;
}
.state-time{
  color:#999999;
  font-size: 18px;
}
//底部间隙
.bottom-line{
  height:14px;
  background-color:#F4F4F4FF;
}
// 底部处理进度那块
.detail-info{
  width: 750px;
}
.mb100{
  margin-bottom:100px;
}
.tab-content{
  width: 750px;
}

// tab切换
.tab-box{
  width: 750px;
  height:90px;
  flex-direction: row;
  justify-content: space-between;
  padding-left:51px;
  padding-right:51px;
  border-bottom-width:1px;
  border-bottom-color:#EEEEEE;
  border-bottom-style:solid;
}
.tab-item{
  justify-content: center;
  width: 140px;
  position: relative;
  height:90px;
  align-items: center;
}
.tab-text{
  color:#666666;
  font-size: 30px;
  width: 140px;
  text-align: center;
}
.tab-text-active{
  color:#00AFFE;
  font-size: 30px;
  width: 140px;
  text-align: center;
}
.border-line-box{
  position: absolute;
  width: 140px;
  flex-direction: row;
  justify-content: center;
  bottom:1px;
}
.border-lines{
  width: 40px;
  height:5px;
  background-color:#ffffff;
}
.border-act{
  background-color:#00AFFE;
}
//加载更多
.loading-box{
  width: 730px;
  height: 120px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.loading-text{
  color: #9c9c9c;
}
.indicator {
  height: 40px;
  width: 40px;
  margin-right: 15px;
  color: skyblue;
}
.no-more-data{
  color:#9c9c9c;
  width: 730px;
  text-align: center;
  margin-bottom:20px;
}

//底部fix
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
.ipx-bottom{
    padding-bottom: 30px;
    height: 130px;
}
.comment-input{
    width: 403px;
    height: 56px;
    line-height: 56px;
    font-size: 28px;
    border-bottom-left-radius:28px;
    border-bottom-right-radius:28px;
    border-top-left-radius:28px;
    border-top-right-radius:28px;
    background-color: #F7F7F7;
    padding-left: 20px;
    margin-right: 20px;
    color:#BBBBBB;
}
//评论弹出框
.comment-container{
  position: absolute;
  bottom: 0;
  width: 750px;
  height: 300px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 25px;
  background-color: #fff;
}
.comment-top{
  flex-direction: row;
  height: 50px;
  width: 700px;
  margin-top: 20px;
}
.top-publish{
  position: absolute;
  right: 0;
  color:#ccc;
  font-size: 28px;
  height: 50px;
  line-height: 50px;
}
.top-publish-active{
  color: #00AFFE
}
.cancel-publish{
  position: absolute;
  left: 0;
  color:#BABABA;
  font-size: 28px;
  height: 50px;
  line-height: 50px;
}
.comment-area{
  width: 700px;
  height: 180px;
  background-color: #f2f2f2;
  padding-top: 15px;
  padding-left: 15px;
}
// 底部评论input操作comment
.bottom-comment-box{
  width: 70px;
  margin-left:20px;
  position: relative;
  flex-direction: row;
  justify-content: center;
}
.comment-img{
  width: 32px;
  height:30px;
}
.num-box{
  height:24px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left:10px;
  padding-right:10px;
  border-bottom-left-radius:12px;
  border-bottom-right-radius:12px;
  border-top-left-radius:12px;
  border-top-right-radius:12px;
  background-color: #FA6400;
  position: absolute;
  top:22px;
  left:512px;
}
.num-box-text{
  color:#ffffff;
  font-size:20px;
}
// 底部分享
.share-container{
  position: absolute;
  bottom: 0;
  width: 750px;
  height: 350px;
  background-color: #fff;
}
.share-container-top{
    width: 750px;
    height: 250px;
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
    width: 135px;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px
}
.share-container-icon{
    width: 100px;
    height: 100px;
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

//点赞按钮
.star-img{
  width: 32px;
  height:32px;
}
.star-img-box{
  width: 70px;
  height:32px;
  margin-left:25px;
  flex-direction: row;
  justify-content: center;
}
//分享按钮
.share-img{
  width: 32px;
  height:30px;
}
.share-img-box{
  width: 70px;
  height:30px;
  flex-direction: row;
  justify-content: center;
  margin-left:20px;
}
.refresh{
  height:80px;
}
</style>
