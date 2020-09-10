<template>
     <div class="home-wrapper">
        <div class="top" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStylePaddingTop">
            <text class="title-txte">快递查询</text>
            <div class="back-icon-box" @click="goback">
                <image :src="getLocalImgUrl('ask_back.png')" class="back-icon"></image>
            </div>
        </div>
        <div class="mian-input">
             <div class="odd-company odd" @click="selectCompany">
                <text class="odd-title">快递公司</text>
                <input type="text" class="odd-input" v-model="companyName" >
            </div>
            <div class="odd-num odd">
                <text class="odd-title">快递单号</text>
                <input type="number" class="odd-input"   v-model="oddNumber">
            </div>
            <div class="odd-tel odd" v-if="companyId ==='sf'">
                <text class="odd-title">手机号</text>
                <input type="tel" class="odd-input" v-model="telphone" >
            </div>
        </div>
        <text class="search-box" :class="[isSearch ? 'searchActive':'noActive']" @click="search">查快递</text>
        <div v-if="historyList.length">
            <div class="history-box">
                <div class="history-title">历史查询</div>
                <image :src="getLocalImgUrl('icon_del_all3x.png')" @click="clearHistory" class="del-icon"></image>
            </div>
            <div class="history-content">
                <text class="history-name"  v-for="(item,idx) in historyList" :key="idx" @click="clickHistory(item)">{{item}}</text>
            </div>
        </div>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
let storage = weex.requireModule('storage')
export default {
  name: 'ModWeexStyle11',
  data () {
    return {
      access_token: '',
      isSearch: false,
      companyName: '',
      companyId: '',
      oddNumber: '',
      telphone: '',
      historyList: [],
      custom_appid: '',
      custom_appkey: ''
    }
  },
  methods: {
    goback () {
      this.goBack()
    },
    selectCompany () {
      this.jumpWithParams('ModWeexStyle11SelectCompany', {})
    },
    clickHistory (item) {
      this.oddNumber = item
    },
    search () {
      if (!this.isSearch) return
      const param = {
        m: 'Apiconvenience',
        c: 'services',
        a: 'getExpress',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        com: this.companyId,
        no: this.oddNumber
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (!res.ErrorCode) {
          this.jumpWithParams('ModWeexStyle11Result', {com: this.companyId, no: this.oddNumber})
          if (!this.historyList.includes(this.oddNumber)) {
            this.historyList.push(this.oddNumber)
            storage.setItem('history', JSON.stringify(this.historyList))
          }
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
      })
    },
    clearHistory () {
      this.historyList = []
      storage.removeItem('history', (e) => {
        if (e.result === 'success') {
          nativeUtil.alert('清除成功')
        }
      })
    },
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'id': '10044',
          'uniqueid': 'help2',
          'type': '1',
          'name': '快递查询',
          'ename': 'help2',
          'custom_name': '快递查询',
          'normal_pic': '',
          'press_pic': '',
          'url': '',
          'is_master': '0',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '0',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle11',
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
            'home_list': 'http://conveniencesc.cloud.hoge.cn/index.php',
            'home_list_mine': 'home_list_mine',
            'send_content': 'send_content'
          }
        }
        this.api = this.config.api
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'express'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api

        const result = await nativeUtil.getSystemInfo()
        if (result) {
          this.custom_appid = result.custom_appid
          this.custom_appkey = result.custom_appkey
          if (result.statusbar_height) {
            this.statusbar_height = result.statusbar_height
          }
        }
      }
    }
  },
  computed: {
    searchflag () {
      const {oddNumber, companyName, telphone} = this
      return {
        oddNumber,
        companyName,
        telphone
      }
    }
  },
  watch: {
    searchflag: {
      handler: function (val) {
        if (this.companyId === 'sf') {
          if (val.oddNumber && val.companyName && val.telphone) {
            this.isSearch = true
          } else {
            this.isSearch = false
          }
        } else {
          if (val.oddNumber && val.companyName) {
            this.isSearch = true
          } else {
            this.isSearch = false
          }
        }
      },
      deep: true
    }
  },
  created () {
    nativeUtil.getUserInfo().then(res => {
      if (res) {
        this.getConfig()
        this.access_token = res.userTokenKey
        storage.getItem('history', (e) => {
          if (e.result === 'success') {
            this.historyList = JSON.parse(e.data)
          } else {
            this.historyList = []
          }
        })
      }
    })
  },
  mounted () {
    const that = this
    const Stark = new BroadcastChannel('Avengers')
    Stark.onmessage = function (event) {
      that.companyName = `${event.data.name}`
      that.companyId = `${event.data.com}`
    }
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
    background-color: #f2f6fa;
}
.x-top{
    padding-top: 96px;
}
.top{
    flex-direction: row;
    align-items: center;
    width: 750px;
    padding-top: 58px;
    padding-bottom: 10px;
    background-color: #ffffff
}
.back-icon-box{
    width: 40px;
    height: 40px;
    position: absolute;
    left: 30px;
    justify-content: center;
}
.back-icon{
    width: 16px;
    height: 32px;
}
.title-txte{
    color: #333333;
    font-size: 34px;
    flex: 1;
    text-align: center;
}
.mian-input{
    margin-top: 20px;
    padding-left: 30px;
    padding-right: 30px;
    background-color: #ffffff
}
.odd{
    height: 120px;
    flex-direction: row;
    align-items: center;
    border-top-width: 1px;
    border-top-style: solid ;
    border-top-color: #EBEBEB;
}
.odd-title{
    color: #666666;
    font-size: 32px;
    margin-left: 15px;
    margin-right: 60px;
}
.odd-input{
    flex: 1;
    height: 50px;
    color: #333333;
}
.search-box{
    margin-top: 60px;
    margin-bottom: 60px;
    margin-left: 30px;
    margin-right: 30px;
    width: 690px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-size: 32px;
    color:#FFFFFF;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
}
.searchActive{
    background-color: #388CFF;
}
.noActive{
    background-color: #CCCCCC;
}
.history-box{
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.history-title{
    font-size: 30px;
    color: #333333;
}
.del-icon{
    width: 32px;
    height: 32px;
}
.history-content{
    padding-left: 30px;
    padding-right: 30px;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
}
.history-name{
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 26px;
    color: #666666;
    background-color: #F3F3F3;
    border-top-right-radius: 32px;
    border-top-left-radius: 32px;
    border-bottom-right-radius: 32px;
    border-bottom-left-radius: 32px;
    margin-right: 20px;
    margin-bottom: 20px;
}
</style>
