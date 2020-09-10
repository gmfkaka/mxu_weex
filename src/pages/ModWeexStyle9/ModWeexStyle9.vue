<template>
     <div class="home-wrapper" @viewappear="onappear">
         <scroller class="inner">
            <!-- 顶部 -->
            <div class="top" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStylePaddingTop">
                <div class="top-head">
                    <text class="name-text">{{userInfo.username}}</text>
                    <!-- <div class="sign-box" @click="signIn">
                        <image class="sign-img" :src="getLocalImgUrl('feature_mysign.png')"></image>
                        <text class="sign-text" v-if="signAble">签到</text>
                        <text class="sign-text" v-else>已签到</text>
                    </div> -->
                    <image class="set-icon" :src="getLocalImgUrl('feature_myset.png')" @click="goSetting"></image>
                </div>
                <image v-if="userInfo.picurl" class="avatar" :src="userInfo.picurl" @click="editInfo"></image>
                <image v-else class="avatar" :src="getLocalImgUrl('pic_user_default3x.png')" @click="editInfo"></image>
                <image class="arrow-icon" :src="getLocalImgUrl('feature_myarrow.png')" @click="editInfo"></image>
                <text class="edit-text" @click="editInfo" v-if="loginStatus === '1'">编辑个人资料</text>
                <text class="edit-text" @click="goLogin" v-else>登录/注册</text>
            </div>
            <!-- 我的 -->
            <div class="my-box">
                <div class="my-card">
                    <div class="my-item" @click="goComment">
                        <image class="my-icon" :src="getLocalImgUrl('feature_mycomment.png')"></image>
                        <div class="my-content">
                            <text class="my-title">我的评论</text>
                            <image class="go-icon" :src="getLocalImgUrl('feature_myarrow2.png')"></image>
                        </div>
                    </div>
                    <div class="my-item" @click="goMyPublish">
                        <image class="my-icon" :src="getLocalImgUrl('feature_mywrite.png')"></image>
                        <div class="my-content">
                            <text class="my-title">我的作品</text>
                            <image class="go-icon" :src="getLocalImgUrl('feature_myarrow2.png')"></image>
                        </div>
                    </div>
                    <div class="my-item" @click="goCollection">
                        <image class="my-icon" :src="getLocalImgUrl('feature_mycollection.png')"></image>
                        <div class="my-content">
                            <text class="my-title">我的收藏</text>
                            <image class="go-icon" :src="getLocalImgUrl('feature_myarrow2.png')"></image>
                        </div>
                    </div>
                    <div class="my-item" @click="goLink('my/About?id=loginRules')">
                        <image class="my-icon" :src="getLocalImgUrl('feature_yaoqing.png')"></image>
                        <div class="my-content">
                            <text class="my-title">用户协议</text>
                            <image class="go-icon" :src="getLocalImgUrl('feature_myarrow2.png')"></image>
                        </div>
                    </div>
                    <div class="my-item" @click="goLink('my/About?id=privacyProvision')">
                        <image class="my-icon" :src="getLocalImgUrl('feature_xieyi.png')"></image>
                        <div class="my-content">
                            <text class="my-title">隐私政策</text>
                            <image class="go-icon" :src="getLocalImgUrl('feature_myarrow2.png')"></image>
                        </div>
                    </div>
                    <!-- <div class="my-item" @click="goFeedback">
                        <image class="my-icon" :src="getLocalImgUrl('feature_myfeedback.png')"></image>
                        <div class="my-content last-content">
                            <text class="my-title">意见反馈</text>
                            <image class="go-icon" :src="getLocalImgUrl('feature_myarrow2.png')"></image>
                        </div>
                    </div> -->
                </div>
            </div>
         </scroller>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
export default {
  name: 'ModWeexStyle9',
  data () {
    return {
      userInfo: {},
      signAble: true,
      loginStatus: '0',
      refreshing: false
    }
  },
  watch: {
    loginStatus (val) {
      val === '1' && this.getUserInfo()
    }
  },
  methods: {
    onappear () {
      this.getLoginStatus()
    },
    onrefresh () {
      this.refreshing = true
      this.getLoginStatus()
    },
    // 去登录 登录成功后刷新用户信息
    goLogin () {
      nativeUtil.goLogin().then(res => {
        if (res === '1') {
          this.loginStatus = '1'
        }
      })
    },
    // 获取登录状态
    getLoginStatus () {
      nativeUtil.getLoginStatus().then(res => {
        this.loginStatus = res
        if (this.loginStatus === '0') this.userInfo = {}
        this.loginStatus === '1' && this.getUserInfo()
        this.refreshing = false
      })
    },
    // 获取用户信息
    getUserInfo () {
      nativeUtil.getUserInfo().then(res => {
        this.userInfo = res
        // this.getSignInStatus()
      })
    },
    // 获取签到状态 0可签到 1不可签到
    // getSignInStatus () {
    //   nativeUtil.getSignInStatus().then(res => {
    //     if (res === '1') {
    //       this.signAble = false
    //     }
    //   })
    // },
    // 签到 0失败 1成功
    signIn () {
      if (this.loginStatus === '0') {
        this.goLogin()
      } else {
        if (!this.signAble) return
        nativeUtil.signIn().then(res => {
          if (res.success === '0') {
            nativeUtil.alert(res.msg)
          }
          if (res.success === '1') {
            this.signAble = false
          }
        })
      }
    },
    goCollection () {
      // this.loginStatus === '1' ? nativeUtil.linkTo('goToLogin/my/ModUserCenterDefaultFavorite') : this.goLogin()
      this.loginStatus === '1' ? this.jumpWithParams('ModWeexStyle9MyCollection', {}) : this.goLogin()
    },
    goComment () {
      this.loginStatus === '1' ? nativeUtil.linkTo('goToLogin/my/ModUserCenterDefaultMyComment') : this.goLogin()
    },
    goFeedback () {
      this.loginStatus === '1' ? nativeUtil.linkTo('http://feedbacksc.cloud.hoge.cn/views/feedback_mobile/views/index.html') : this.goLogin()
    },
    goMyPublish () {
      this.loginStatus === '1' ? nativeUtil.linkTo('contribute/ModContributeStyle8Mine?title=我的发表') : this.goLogin()
    },
    goLink (link) {
      console.log(link)
      nativeUtil.linkTo(link)
    },
    editInfo () {
      const _this = this
      if (_this.getPlatform() === 'ios') {
        if (_this.loginStatus === '1') {
          nativeUtil.goSetting('my/ModUserCenterStyle16UpdateInfo').then(res => {
            _this.getLoginStatus()
          })
        } else {
          _this.goLogin()
        }
      } else if (_this.getPlatform() === 'android') {
        _this.loginStatus === '1' ? nativeUtil.linkTo('my/ModUserCenterStyle16UpdateInfo') : _this.goLogin()
      }
      // this.loginStatus === '1' ? nativeUtil.linkTo('my/ModUserCenterStyle16UpdateInfo') : this.goLogin()
    },
    goSetting () {
      if (this.getPlatform() === 'ios') {
        nativeUtil.goSetting('my/ModUserCenterStyle16Setting').then(res => {
          this.getLoginStatus()
        })
      } else if (this.getPlatform() === 'android') {
        nativeUtil.linkTo('my/ModUserCenterStyle16Setting')
      }
    }
  },
  created () {
    this.getLoginStatus()
  }
}
</script>

<style scoped lang="scss">
.home-wrapper{
    width: 750px;
    flex:1;
    background-color: #f2f6fa;
}
.inner{
  width: 750px;
  flex: 1;
}
.top{
    background-color: #fff;
    padding-top: 66px;
    padding-bottom: 60px;
}
.x-top{
    padding-top: 96px;
}
.top-head{
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 55px;
}
.name-text{
    font-size: 36px;
    color:#545454;
}
.sign-box{
    flex-direction: row;
    align-items: center;
    position: absolute;
    left: 53px;
}
.sign-img{
    width: 41px;
    height: 41px;
    margin-right: 10px;
}
.sign-text{
    font-size: 21px;
    color:rgba(84,84,84,1);
}
.set-icon{
    width: 35px;
    height: 29px;
    position: absolute;
    right: 30px;
}
.avatar{
    width: 130px;
    height: 130px;
    margin-left: 314px;
    margin-bottom: 18px;
    border-top-left-radius: 65px;
    border-top-right-radius: 65px;
    border-bottom-left-radius: 65px;
    border-bottom-right-radius: 65px;
}
.arrow-icon{
    width: 11px;
    height: 17px;
    position: absolute;
    right: 100px;
    bottom: 150px;
}
.edit-text{
    color: #D3D3D3;
    width: 750px;
    font-size: 21px;
    text-align: center;
}
.my-box{
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
    flex: 1;
}
.my-card{
    background-color: #fff;
    padding-left: 39px;
}
.my-item{
    height: 116px;
    flex-direction: row;
    align-items: center;
}
.my-icon{
    width: 35px;
    height: 35px;
    margin-right: 12px;
}
.my-content{
    height: 116px;
    flex: 1;
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: rgb(244,247,250);
    border-bottom-style: solid;
}
.last-content{
    border-bottom-width: 0;
}
.my-title{
    height: 116px;
    line-height: 116px;
    font-size: 28px;
    color:#545454;
}
.go-icon{
    width: 12px;
    height: 19px;
    position: absolute;
    top: 50px;
    right: 20px;
}
</style>
