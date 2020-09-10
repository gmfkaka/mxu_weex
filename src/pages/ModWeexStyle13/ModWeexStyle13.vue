<template>
     <div class="wrapper pos-full bg-fff" :class="[this.isIphoneX() ? 'x-top':'']">
         <div class="head flex-row-center">
             <image class="back-icon" :src="getLocalImgUrl('pay_back.png')" @click="goBack"></image>
             <text class="title fz34 flex1 pingfang cl-333">金币提现</text>
             <text class="sub-title fz30 cl-333"  @click="jumpWithParams('ModWeexStyle13TixianHistory')">提现记录</text>
         </div>
         <div class="main">
             <div class="top-box">
                 <image class="top-bg pos-full" :src="getLocalImgUrl('pay_bg.png')"></image>
                 <text class="top-title fz26 cl-fff">当前金币余额</text>
                 <div class="top-money flex-row-center">
                     <text class="money-text cl-fff">{{remain}}</text>
                     <image class="money-icon" :src="getLocalImgUrl('pay_money_icon.png')"></image>
                 </div>
             </div>
             <!-- 支付宝 -->
             <div class="list-container">
                 <div class="list-title flex-row-center">
                     <image class="list-title-icon" :src="getLocalImgUrl('pay_alipay.png')"></image>
                     <text class="list-title-text fz28 cl-333">支付宝现金红包</text>
                 </div>
                 <div class="list-box flex-wrap flex-row">
                     <div class="list-item border1" :class="[index % 3 !== 0 ? 'ml20' :'',index > 2 ? 'mt20':'']" v-for="(item,index) in alipayList" :key="index" @click="openMask(item)">
                        <text class="list-item-title fz36 cl-333">{{item.cash}}元</text>
                        <text class="list-item-sub-title flex1 pingfang fz24">{{item.credit}}金币</text>
                        <div class="remain-box flex-row">
                            <text class="remain-text fz24" v-if="item.limit === '1'">个人剩余：</text>
                            <text class="remain-text fz24" v-if="item.limit === '2'">今日剩余：</text>
                            <text class="remain-text fz24" v-if="item.limit === '3'">本月剩余：</text>
                            <text class="remain-text fz24" v-if="item.limit === '0'">库存充足</text>
                            <text class="remain-text fz28" v-else :class="[item.left_number < 4 ? 'remain-sp' :'']">{{item.left_number}}</text>
                        </div>
                         <!-- <image v-if="item.limit === '3'" class="list-item-icon" :src="getLocalImgUrl('pay_month.png')"></image>
                         <image v-if="item.limit === '1'" class="list-item-icon" :src="getLocalImgUrl('pay_self.png')"></image> -->
                     </div>
                 </div>
             </div>
             <!-- 话费 -->
             <!-- <div class="list-container" style="margin-top:60px;">
                 <div class="list-title">
                     <image class="list-title-icon" :src="getLocalImgUrl('pay_huafei.png')"></image>
                     <text class="list-title-text">话费充值</text>
                 </div>
             </div>
             <text class="bottom-text-one pingfang fz24 text-center">想要快速提现红包</text>
             <text class="bottom-text-two pingfang fz26 text-center">邀请好友获取个人专享红包兑换机会</text> -->
         </div>
         <div class="mask pos-full flex-align" v-if="showMask">
             <div class="mask-box flex-align bg-fff">
                 <text class="mask-title pingfang text-center fz36 cl-333">绑定提现账号</text>
                 <text class="mask-notice pingfang fz28">需要提现的支付宝账号</text>
                 <input type="text" class="input" v-model="alipayAcount">
                 <text class="text-button cl-fff pingfang fz32 text-center" @click="submit">立即提现</text>
             </div>
             <image class="close-icon" :src="getLocalImgUrl('pay_close.png')" @click="closeMask"></image>
         </div>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
const storage = weex.requireModule('storage')
export default {
  name: 'pay',
  data () {
    return {
      currentId: null,
      currentCredit: 0,
      canSubmit: true,
      userToken: '',
      showMask: false,
      remain: '',
      alipayAcount: '',
      alipayList: [],
      userInfo: {},
      appid: '',
      appkey: '',
      api: {},
      globalApi: {}
    }
  },
  methods: {
    openMask (item) {
      this.currentId = item.id
      this.currentCredit = item.credit
      this.showMask = true
    },
    closeMask () {
      this.showMask = false
      this.alipayAcount = ''
    },
    // 获取套餐列表
    getListData () {
      const param = {
        m: 'Apipayment',
        c: 'withdrawPackage',
        a: 'show',
        // custom_appid: 137,
        // custom_appkey: 'A3O8gmwJURFi8d74nuKxRpczjoAydHSE',
        // access_token: '7d42184d3e384267b359f461495aa0ce'
        custom_appid: this.appid,
        custom_appkey: this.appkey,
        access_token: this.userToken,
        page: 1,
        count: 6
      }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        if (!res.ErrorCode) {
          this.alipayList = res.data
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 获取用户积分
    getUserInfo () {
      this.$httpRequest(this.globalApi.userInfo.m_member, { access_token: this.userToken }, 'get').then(res => {
        this.remain = res[0].exp_points || 0
      }, (e) => {
        console.log(e)
      })
    },
    // 提现申请
    submit () {
      if (!this.alipayAcount) {
        nativeUtil.alert('请输入支付宝账号')
        return
      }
      if (this.remain < Number(this.currentCredit)) {
        nativeUtil.alert('金币不足')
        return
      }
      if (!this.canSubmit) return
      this.canSubmit = false
      const param = {
        m: 'Apipayment',
        c: 'withdraw',
        a: 'create',
        // custom_appid: 137,
        // custom_appkey: 'A3O8gmwJURFi8d74nuKxRpczjoAydHSE',
        // access_token: '7d42184d3e384267b359f461495aa0ce',
        custom_appid: this.appid,
        custom_appkey: this.appkey,
        access_token: this.userToken,
        package_id: this.currentId,
        device: '',
        account: this.alipayAcount
      }
      this.$httpRequest(this.api.home_column, param, 'post').then(res => {
        if (res.ErrorCode && res.ErrorText) {
          nativeUtil.alert(res.ErrorText)
          setTimeout(() => {
            this.canSubmit = true
          }, 1500)
        }
        if (!res.ErrorCode && res.data) {
          nativeUtil.alert('提交成功')
          setTimeout(() => {
            this.showMask = false
            this.canSubmit = true
            this.alipayAcount = ''
            this.getUserInfo() // 刷新积分余额
            this.getListData() // 刷新套餐余额
          }, 1500)
        }
      }, (e) => {
        console.log(e)
      })
    },
    async init () {
      const res1 = await nativeUtil.getConfig({ 'isMain': '1' })
      const res2 = await nativeUtil.getConfig({ 'isMain': '0', 'moduleSign': 'pay' })
      const res3 = await nativeUtil.getSystemInfo() // appid & appkey
      this.globalApi = res1.api // 全局api
      this.api = res2.api // 模块api
      this.appid = res3.custom_appid
      this.appkey = res3.custom_appkey
      storage.setItem('appid', this.appid)
      storage.setItem('appkey', this.appkey)
      const _this = this
      // 用户登录状态
      const loginStatus = await nativeUtil.getLoginStatus()
      if (loginStatus === '0') {
        nativeUtil.goLogin().then(res => {
          if (res === '1') {
            nativeUtil.getUserInfo().then(res => {
              _this.userToken = res.userTokenKey
              storage.setItem('userToken', _this.userToken)
              _this.getUserInfo()
              _this.getListData()
            })
          }
        })
      } else {
        nativeUtil.getUserInfo().then(res => {
          _this.userToken = res.userTokenKey
          storage.setItem('userToken', _this.userToken)
          _this.getUserInfo()
          _this.getListData()
        })
      }
    }
  },
  created () {
    this.init()
    // this.getUserInfo()
    // this.getListData()
  }
}
</script>

<style scoped lang="scss">
@import '../../style/common.scss';
.x-top{
    padding-top: 30px;
}
.head{
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #ddd;
    padding-top: 60px;
    padding-bottom: 22px;
    padding-left: 24px;
    padding-right: 30px;
}
.back-icon{
    width: 44px;
    height: 44px;
}
.title{
    padding-left: 238px;
}
.main{
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 30px;
    padding-bottom: 52px;
}
.top-box{
    width: 690px;
    height: 188px;
    padding-top: 36px;
    margin-bottom: 48px;
}
.top-bg{
    width: 690px;
    height: 188px;
}
.top-title{
    padding-left: 268px;
}
.top-money{
    margin-top: 20px;
    justify-content: center;
}
.money-text{
    font-family: Arial-BoldMT;
    font-size: 60px;
    margin-right: 12px;
}
.money-icon{
    width: 30px;
    height: 30px;
}
.list-title{
    margin-bottom: 40px;
}
.list-title-icon{
    width: 40px;
    height: 40px;
    margin-right: 16px;
}
.list-item{
    width: 216px;
    height: 180px;
    padding-top: 20px;
    padding-bottom: 18px;
    padding-left: 20px;
    border-top-color:  #ddd;
    border-bottom-color:  #ddd;
    border-left-color:  #ddd;
    border-right-color:  #ddd;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    position: relative;
}
.ml20{
    margin-left: 20px;
}
.mt20{
  margin-top: 20px;
}
.list-item-title{
    font-family: PingFangSC-Medium;
}
.list-item-sub-title{
    color: #FF9500;
    padding-top: 12px;
}
.remain-text{
    color: #A6A6A6;
}
.remain-sp{
    color: #FF5A3F;
}
.list-item-icon{
    width: 100px;
    height: 40px;
    position: absolute;
    right: 0;
    top: 0;
}
.bottom-text-one{
    color: #C4C4C4;
    width: 690px;
    margin-top: 58px;
    margin-bottom: 12px;
}
.bottom-text-two{
    color: #FD7051;;
    width: 690px;
}
.mask{
    background-color: rgba(0,0,0,.6);
    padding-top: 332px;
}
.mask-box{
    width: 590px;
    height: 540px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}
.close-icon{
    width: 72px;
    height: 72px;
    margin-top: 60px;
}
.mask-title{
    width: 590px;
    height: 100px;
    line-height: 100px;
    border-bottom-style: solid;
    border-bottom-color: #eee;
    border-bottom-width: 1px;
}
.mask-notice{
    margin-top: 54px;
    margin-bottom: 40px;
    color: #4F4F4F;
}
.input{
    width: 510px;
    height: 80px;
    background-color: #F6F6F6;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding-left: 30px;
    outline: none;
    margin-bottom: 100px;
}
.text-button{
    background-image: linear-gradient(to top, #FD6A5E, #FC514E);
    width: 510px;
    height: 84px;
    line-height: 84px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}
</style>
