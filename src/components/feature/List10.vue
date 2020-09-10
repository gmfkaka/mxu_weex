<!-- 评论列表 -->
<template>
    <div  class="list-two-wrapper" >
        <div class="item-top">
            <div class="img-box">
                <image v-if="data.member_info" class="image" :src="data.member_info.avatar.host + data.member_info.avatar.dir + data.member_info.avatar.filepath + data.member_info.avatar.filename"></image>
                <image v-else class="image" :src="getLocalImgUrl('pic_user_default3x.png')"></image>
            </div>
            <div class="info-box">
                <text class="info-name">{{data.username}}</text>
                <text class="info-time">{{data.pubtime ? transTime(data.pubtime) : ''}}</text>
            </div>
            <div class="praise-box">
                <image v-if="!praiseStatus" @click="checkLogin" :src="getLocalImgUrl('feature_dianzan.png')" class="praise-icon"></image>
                <image v-else :src="getLocalImgUrl('feature_dianzanactive.png')" class="praise-icon"></image>
                <text class="praise-text">{{data.useful}}</text>
            </div>
        </div>
        <div class="comment-content">
            <!-- <text class="replay-text">回复@妈咪妈咪哄：</text> -->
            <text class="content-text">{{data.content}}</text>
        </div>
    </div>

</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
const storage = weex.requireModule('storage')
export default {
  props: ['data'],
  name: 'List10',
  data () {
    return {
      praiseStatus: false,
      userToken: '',
      appid: '',
      appkey: ''
    }
  },
  methods: {
    checkLogin () {
      const _this = this
      nativeUtil.getLoginStatus().then(res => {
        if (res === '0') {
          nativeUtil.goLogin().then(res => {
            if (res === '1') {
              nativeUtil.getUserInfo().then(res => {
                if (res.userTokenKey) { _this.userToken = res.userTokenKey }
              })
            }
          })
        } else {
          nativeUtil.getUserInfo().then(res => {
            if (res.userTokenKey) {
              _this.userToken = res.userTokenKey
              _this.praise()
            }
          })
        }
      })
    },
    // 点赞
    praise () {
      const param = {
        id: this.data.id,
        appid: this.appid,
        appkey: this.appkey,
        access_token: this.userToken
      }
      this.$httpRequest('http://mobile.tjpress.com/tjpress/comment_vote.php', param, 'post').then(res => {
        // if (res.ErrorCode === 'NOLOGIN') {
        //   nativeUtil.goLogin()
        // }
        // 点赞成功 在storage中存储
        if (res[0].status === 1) {
          // nativeUtil.log('success')
          this.praiseStatus = true
          this.data.useful = parseInt(this.data.useful)
          this.data.useful++
          storage.setItem('commentId' + this.data.id, '1')
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 判断storage中此条评论是否已点赞 以评论id为标识
    async ifPraised () {
      const res = await nativeUtil.getConfig({'isMain': '1'})
      if (this.getPlatform() === 'android') {
        this.appid = res.thirdparty.m2oApiKey.android_appid
        this.appkey = res.thirdparty.m2oApiKey.android_appkey
      }
      if (this.getPlatform() === 'ios') {
        this.appid = res.thirdparty.m2oApiKey.ios_appid
        this.appkey = res.thirdparty.m2oApiKey.ios_appkey
      }
      storage.getItem('commentId' + this.data.id, event => {
        // nativeUtil.log(this.data.id + event.data)
        if (event.data === 'undefined') {
          // nativeUtil.log('no-data')
          storage.setItem('commentId' + this.data.id, '0')
          this.praiseStatus = false
        }
        if (event.data === '1') {
          this.praiseStatus = true
        }
      })
    }
  },
  created () {
    this.ifPraised()
  }
}
</script>

<style scoped lang="scss">
.list-two-wrapper{
    background-color: #fff;
    padding-left:32px;
    padding-right:32px;
    padding-top:28px;
    padding-bottom:32px;
}
.item-top{
  width: 686px;
  height:64px;
  flex-direction: row;
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
  width: 520px;
}
.info-name{
  font-size: 28px;
  color: #999999;
  flex:1;
  lines:1;
}
.info-time{
  font-size: 24px;
  color: #777777;
  flex:1;
  lines:1;
}
.praise-box{
  flex-direction: row;
  align-items: center;
}
.praise-text{
  font-size: 28px;
  color: #9B9B9B;
  margin-left: 8px;
  margin-top: -4px;
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
  color: #545454;
}
</style>
