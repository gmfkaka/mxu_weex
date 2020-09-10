<template>
     <div class="wrapper pos-full bg-fff">
         <div class="top flex-between">
             <div class="top-box flex-align">
                 <text class="top-box-title pingfang fz28 cl-fff">可用金币</text>
                 <text class="top-box-sub-title cl-fff">{{creditInfo.credit_now || 0}}</text>
                 <image class="tixian-icon" :src="getLocalImgUrl('pay_tixian.png')" @click="jumpWithParams('ModWeexStyle13')"></image>
             </div>
             <div class="top-list flex-row">
                 <div class="top-item flex-align">
                     <text class="top-item-title fz24 pingfang cl-fff">今日金币</text>
                     <text class="top-item-num fz40 cl-fff">{{creditInfo.credit_today || 0}}</text>
                 </div>
                 <div class="top-item flex-align">
                     <text class="top-item-title fz24 pingfang cl-fff">累计金币</text>
                     <text class="top-item-num fz40 cl-fff">{{creditInfo.credit_total || 0}}</text>
                 </div>
                 <div class="top-item flex-align">
                     <text class="top-item-title fz24 pingfang cl-fff">人民币(元)</text>
                     <text class="top-item-num fz40 cl-fff">{{creditInfo.cash || 0}}</text>
                 </div>
             </div>
             <div class="rank-box flex-row-center" @click="jumpWithParams('ModWeexStyle13RankList')">
                 <image class="rank-icon" :src="getLocalImgUrl('pay_award.png')"></image>
                 <text class="rank-text fz28">排行榜</text>
             </div>
             <image class="back-icon" :class="[this.isIphoneX() ? 'x-back':'']" :src="getLocalImgUrl('pay_back2.png')" @click="goBack"></image>
         </div>
         <text class="notice-text fz24 pingfang">1000金币约等于1元，实际价值以红包提现价格为准</text>
         <list class="list-box flex1 w100" show-scrollbar="false">
             <cell class="list-item flex-row-between flex-align" v-for="(item,index) in list" :key="index">
                 <text class="list-title cl-333 fz32 pingfang line1 flex1">{{item.log_title}}</text>
                 <div class="item-right flex-between">
                     <text class="text-bonus fz36" v-if="item.exp_points >= 0">+{{item.exp_points}}</text>
                     <text class="text-bonus fz36" v-else>{{item.exp_points}}</text>
                     <text class="text-time fz24 pingfang">{{item.operation_time.substring(0,16)}}</text>
                 </div>
             </cell>
         </list>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
const storage = weex.requireModule('storage')
export default {
  name: 'history',
  data () {
    return {
      userToken: '',
      creditInfo: {},
      list: [],
      appid: '',
      appkey: '',
      api: {}
    }
  },
  methods: {
    async init () {
      const res1 = await nativeUtil.getConfig({ 'isMain': '0', 'moduleSign': 'history' })
      const res2 = await nativeUtil.getSystemInfo()
      this.api = res1.api
      this.appid = res2.custom_appid
      this.appkey = res2.custom_appkey
      storage.setItem('appid', this.appid)
      storage.setItem('appkey', this.appkey)
      const _this = this
      const loginStatus = await nativeUtil.getLoginStatus()
      if (loginStatus === '0') {
        nativeUtil.goLogin().then(res => {
          if (res === '1') {
            nativeUtil.getUserInfo().then(res => {
              _this.userToken = res.userTokenKey
              storage.setItem('userToken', _this.userToken)
              _this.getCreditInfo()
            })
          }
        })
      } else {
        nativeUtil.getUserInfo().then(res => {
          _this.userToken = res.userTokenKey
          storage.setItem('userToken', _this.userToken)
          _this.getCreditInfo()
        })
      }
    },
    getCreditInfo () {
      const param = {
        m: 'Apipayment',
        c: 'credit',
        a: 'index',
        // custom_appid: 137,
        // custom_appkey: 'A3O8gmwJURFi8d74nuKxRpczjoAydHSE',
        // access_token: '7d42184d3e384267b359f461495aa0ce'
        custom_appid: this.appid,
        custom_appkey: this.appkey,
        access_token: this.userToken
      }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        this.creditInfo = res.data
        this.list = this.creditInfo.log
      }, (e) => {
        console.log(e)
      })
    }
  },
  created () {
    this.init()
    // this.getCreditInfo()
  }
}
</script>

<style scoped lang="scss">
@import '../../style/common.scss';
.top{
    background-image: linear-gradient(to top, #FD6A5E, #FC514E);
    padding-top: 84px;
    padding-bottom: 36px;
    position: relative;
}
.back-icon{
    width: 44px;
    height: 44px;
    position: absolute;
    top: 62px;
    left: 24px;
}
.x-back{
    top: 92px;
}
.top-box-sub-title{
    font-family: PingFangSC-Medium;
    font-size: 80px;
}
.tixian-icon{
    width: 88px;
    height: 40px;
}
.top-list{
    margin-top: 54px;
}
.top-item{
    width: 250px;
}
.top-item-title{
    opacity: 0.8;
}
.top-item-num{
    font-family: PingFangSC-Medium;
}
.notice-text{
    height: 72px;
    line-height: 72px;
    padding-left: 30px;
    color: #A6A6A6;
    border-bottom-style: solid;
    border-bottom-color:#eee;
    border-bottom-width: 1px;
}
.rank-box{
    position: absolute;
    top: 80px;
    right: 34px;
}
.rank-icon{
    width: 24px;
    height: 24px;
    margin-right: 12px;
}
.rank-text{
    font-family: PingFangSC-Medium;
    color: #FFEBB9;
}
.list-box{
    padding-left: 32px;
}
.list-item{
    padding-right: 32px;
    border-bottom-style: solid;
    border-bottom-color: #eeeeee;
    border-bottom-width: 1px;
    padding-top: 24px;
    padding-bottom: 24px;
}
.text-bonus{
    font-family: PingFangSC-Medium;
    color: #FA4C47;
    text-align: right;
    margin-bottom: 12px;
}
.text-time{
    color: #A6A6A6;
}
</style>
