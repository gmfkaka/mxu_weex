<template>
     <div class="wrapper pos-full bg-fff" :class="[this.isIphoneX() ? 'x-top':'']">
         <div class="head flex-row-center">
             <image class="back-icon" :src="getLocalImgUrl('pay_back.png')" @click="goBack"></image>
             <text class="title pingfang fz34 cl-333 flex1">提现记录</text>
         </div>
         <waterfall class="list flex1" show-scrollbar="false" column-count="1" column-width="auto" v-if="list.length">
             <cell class="cell flex-row-between" v-for="(item,index) in list" :key="index">
                 <div class="cell-left">
                     <text class="cell-text1 pingfang fz32 cl-333">{{item.package}}</text>
                     <text class="cell-text2 pingfang fz24">{{item.create_time.substring(0,16)}}</text>
                 </div>
                 <div class="cell-right">
                     <text class="cell-text3 pingfang fz32">{{item.cash_show}}</text>
                     <text class="cell-text4 pingfang fz24" :class="[item.status === '2' ? 'cell-ing' : '']">{{item.status_show}}</text>
                 </div>
             </cell>
            <loading class="loading-box w100 flex-center" @appear="footerAppear" v-if="hasMore">
              <loading-indicator class="indicator"></loading-indicator>
              <text class="loading-text">加载中</text>
            </loading>
            <!-- <cell class="loading-box">
                <text class="loading-text">没有更多了</text>
            </cell> -->
         </waterfall>
         <div class="no-data w100 flex1 flex-col-center" v-else>
            <text class="no-data-text fz32">暂无记录</text>
         </div>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
export default {
  name: 'pay',
  data () {
    return {
      hasMore: true,
      page: 1,
      count: 10,
      userToken: '',
      appid: '',
      appkey: '',
      api: {},
      list: []
    }
  },
  methods: {
    footerAppear () {
      this.page++
      this.getData()
    },
    getData () {
      const param = {
        page: this.page,
        count: 10,
        m: 'Apipayment',
        c: 'withdraw',
        a: 'log',
        // custom_appid: 319,
        // custom_appkey: '3TSOhXnI7wnZs4eTH5VZubwebxYGN6HH',
        // access_token: 'c2039df5252c99c438a60890256e80bf',
        custom_appid: this.appid,
        custom_appkey: this.appkey,
        access_token: this.userToken
      }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        if (!res.ErrorCode) {
          if (this.page === 1) {
            this.list = res.data.list
          } else {
            if (res.data.list.length) {
              this.list = this.list.concat(res.data.list)
            } else {
              this.hasMore = false
            }
          }
        }
      }, (e) => {
        console.log(e)
      })
    },
    async init () {
      const param = { 'isMain': '0', 'moduleSign': 'pay' }
      const res = await nativeUtil.getConfig(param)
      const appid = await nativeUtil.getStorageItem('appid')
      const appkey = await nativeUtil.getStorageItem('appkey')
      const userToken = await nativeUtil.getStorageItem('userToken')
      this.api = res.api
      this.appid = appid
      this.appkey = appkey
      this.userToken = userToken
      this.getData()
    }
  },
  created () {
    this.init()
    // this.getData()
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
.cell{
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #eee;
    padding-top: 30px;
    padding-bottom: 28px;
    padding-right: 32px;
    padding-left: 30px;
}
.cell-text2{
    color: #A6A6A6;
    padding-top: 16px;
}
.cell-text3{
    color: #FA4C47;
    text-align: right;
}
.cell-text4{
    padding-top: 16px;
    color: #A6A6A6;
}
.cell-ing{
    color: #FFA750;
}
.loading-box{
    height: 120px;
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
.no-data-text{
    color: #9c9c9c;
}
</style>
