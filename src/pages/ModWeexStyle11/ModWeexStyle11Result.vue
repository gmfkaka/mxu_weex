<template>
     <div class="home-wrapper">
        <show-loading
            :show="isShow"
            type="custom"
            m-url="loading.gif"
            m-width="120"
            m-height="120"
            m-backgroundcolor="#f2f6fa"
        >
        </show-loading>
        <div class="top" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStylePaddingTop">
            <text class="title-txte">快递查询</text>
            <div class="back-icon-box" @click="goback">
                <image :src="getLocalImgUrl('ask_back.png')" class="back-icon"></image>
            </div>
        </div>
        <div class="middle-box">
            <image v-if='logo' :src="logo" class="company-icon"></image>
            <text class="odd-num">{{result.no}}</text>
            <text v-if='result.status_detail_show != null' class="text-status">{{result.status_detail_show}}</text>
        </div>
        <scroller class="content-bg" show-scrollbar=false >
            <div class="bg-line" v-for="(item,idx) in resultList" :key="idx">
                <div class="logistics-box">
                    <text class="logistics-message">{{item.remark}}</text>
                    <text class="logistics-date">{{item.datetime}}</text>
                </div>
                <div class="dian" :class="[idx===0 ? 'top0' : 'top10']"></div>
            </div>
        </scroller>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import ShowLoading from '../../components/common/ShowLoading'
export default {
  name: 'ModWeexStyle11Result',
  components: {
    ShowLoading
  },
  data () {
    return {
      custom_appid: '',
      custom_appkey: '',
      resultList: [],
      result: {},
      isShow: true,
      logo: ''
    }
  },
  watch: {

  },
  methods: {
    goback () {
      this.goBack()
    },
    getList () {
      const param = {
        m: 'Apiconvenience',
        c: 'services',
        a: 'getExpress',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        com: this.getQuery().com,
        no: this.getQuery().no
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (!res.ErrorCode) {
          this.isShow = false
          this.result = res.data
          this.resultList = res.data.list
          if (res.data.logo !== '') {
            this.logo = `${res.data.logo.host}${res.data.logo.dir}${res.data.logo.filepath}${res.data.logo.filename}`
          }
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
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
        this.getList()
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
            this.custom_appkey = result.custom_appkey
          }
        }
      }
      this.getList()
    }
  },
  created () {
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
.middle-box{
    width: 710px;
    height: 120px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
    flex-direction: row;
    padding-left: 28px;
    padding-top: 34px;
    padding-bottom: 34px;
    align-items: center;
    background-color: #FFFFFF
}
.company-icon{
    width: 144px;
    height: 120px;
    margin-right: 36px;
}
.odd-num{
    font-size: 40px;
}
.logistics-box{
    width: 710px;
    margin-left: 20px;
    margin-right: 20px;
    padding-bottom: 40px;
    padding-left: 40px;
    background-color: #FFFFFF;
    border-left-width: 1px;
    border-left-style: solid;
    border-left-color: #EBEBEB;
}
.logistics-status{
    font-size: 28px;
    font-weight: 500;
    color: #333333
}
.logistics-message{
    width: 600px;
    font-size: 24px;
    font-weight: 400;
    color: #666666;
    // margin-top: 10px;
    margin-bottom: 10px;
}
.logistics-date{
    font-size: 24px;
    font-weight: 400;
    color: #666666
}
.content-bg{
    flex: 1;
    background-color: #FFFFFF;
    padding-top: 30px;
    padding-left: 50px;
    padding-bottom: 40px;
}
.dian{
    width: 12px;
    height: 12px;
    background-color: #CCCCCC;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    position: absolute;
    left: 16px;
}
.top0{
    top:0px
}
.top10{
    top:10px
}
.mt40{
    margin-top: 40px;
}
.text-status{
    color: #388CFF;
    font-size: 24px;
    margin-left: 20px;
}
</style>
