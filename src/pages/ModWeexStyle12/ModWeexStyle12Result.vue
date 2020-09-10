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
            <text class="title-txte">{{detail.hphm}}</text>
            <div class="back-icon-box" @click="goback">
                <image :src="getLocalImgUrl('ask_back.png')" class="back-icon"></image>
            </div>
        </div>
        <div class="main-content">
            <div class="content-item"  v-for="(item,idx) in resultList" :key="idx">
                <div class="item-top">
                    <image :src="getLocalImgUrl('timeCar.png')" class="date-icon"></image>
                     <text class="item-date">{{item.date}}</text>
                </div>
                <div class="item-middle">
                    <text class="item-title">{{item.area}}</text>
                    <text class="item-fen">{{item.fen}}分</text>
                    <text class="item-money">{{item.money}}元</text>
                </div>
                <text class="item-num">文书编号:{{item.archiveno}}</text>
                <text class="item-desc">{{item.act}}</text>
            </div>
        </div>
        <div class="meaage-bottom" v-if="total && !isShow">
            <div class="message-tag">
                <text class="message-left-tag">违章</text>
                <text class="tag-left-num">{{total.count}}</text>
            </div>
            <div class="message-tag">
                <text class="right-tag">扣</text>
                <text class="right-tag-num mr50">{{total.fen}}分</text>
                <text class="right-tag">罚</text>
                <text class="right-tag-num">{{total.money}}元</text>
            </div>
        </div>
     </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import ShowLoading from '../../components/common/ShowLoading'
export default {
  name: 'ModWeexStyle12Result',
  components: {
    ShowLoading
  },
  data () {
    return {
      resultList: [],
      total: {},
      detail: {},
      isShow: true,
      custom_appid: '',
      custom_appkey: ''
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
        a: 'getViolation',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        plate: this.getQuery().plate,
        type: this.getQuery().type,
        engine: this.getQuery().engine,
        vin: this.getQuery().vin
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (!res.ErrorCode) {
          this.isShow = false
          this.detail = res.data
          this.resultList = res.data.lists
          this.total = res.data.total
        } else {
          this.jumpWithParams('ModWeexStyle12', {})
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
          'name': '违章查询',
          'ename': 'help2',
          'custom_name': '违章查询',
          'normal_pic': '',
          'press_pic': '',
          'url': '',
          'is_master': '0',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '0',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle12',
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
          'moduleSign': 'weizhang'
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
        this.getList()
      }
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
.content-item{
    width: 750px;
    margin-top: 20px;
    background-color: #fff;
    padding-bottom: 28px;
}
.item-top{
    height: 60px;
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #EBEBEB;
    padding-left: 30px;
    padding-right: 30px;
}
.date-icon{
    width: 24px;
    height: 24px;
    margin-right: 20px;
}
.item-date{
    color: #666666;
    font-size: 24px;
}
.item-middle{
    height: 84px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
}
.item-title{
    flex: 1;
    color: #333333;
    font-size: 32px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}
.item-fen{
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 8px;
    padding-right: 8px;
    background-color: #FFF0E8;
    color: #FF8117;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
    margin-right: 20px;
    font-size: 24px;
}
.item-money{
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 8px;
    padding-right: 8px;
    background-color: #FFF0F0;
    color: #FF3F3F;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
    font-size: 24px;
}
.item-num{
    color: #999999;
    font-size: 28px;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 10px;
}
.item-desc{
    color: #999999;
    font-size: 28px;
    padding-left: 30px;
    padding-right: 30px;
}
.message-bottom{
    width: 750px;
    height: 200px;
    flex-direction: row;
    justify-content: space-between
}
.meaage-bottom{
    width: 750px;
    height: 150px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding-left: 40px;
    padding-right: 40px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
}
.message-left-tag{
    color: #333333;
    font-size: 30px;
    margin-right: 10px;
}
.message-tag{
    flex-direction: row;
}
.tag-left-num{
    color: #FF3F3F;
    font-size: 36px;
}
.right-tag{
    color: #333333;
    font-size: 28px;
    margin-right: 10px;
}
.right-tag-num{
    color: #FF8117;
    font-size: 28px;
}
.mr50{
   margin-right: 50px;
}
</style>
