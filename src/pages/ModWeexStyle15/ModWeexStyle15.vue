<template>
     <div class="home-wrapper">
        <div class="top" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStylePaddingTop">
            <text class="title-txte">火车票代售点</text>
            <div class="back-icon-box" @click="goback">
                <image :src="getLocalImgUrl('ask_back.png')" class="back-icon"></image>
            </div>
        </div>
        <div class="mian-input">
            <div class="odd-num odd" @click="selectProvince">
                <text class="odd-title">所在省份</text>
                <input type="text" class="odd-input" v-model="province">
            </div>
            <div class="odd-company odd" @click="selectCity">
                <text class="odd-title">所在城市</text>
                <input type="text" class="odd-input" v-model="city" >
            </div>
            <div class="odd-tel odd" @click="selectArea">
                <text class="odd-title">所在区县</text>
                <input type="text" class="odd-input" v-model="area" >
            </div>
            <div class="odd-tel odd">
                <text class="odd-title">代售点名称</text>
                <input type="text" class="odd-input" v-model="name" >
            </div>
        </div>
        <text class="search-box" :class="[isSearch ? 'searchActive':'noActive']" @click="search">查询</text>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
const picker = weex.requireModule('picker')
export default {
  name: 'ModWeexStyle15',
  data () {
    return {
      isSearch: false,
      city: '',
      province: '',
      area: '',
      name: '',
      city_id: '',
      province_id: '',
      area_id: '',
      provinceList: [],
      provinceIdList: [],
      cityList: [],
      cityIdList: [],
      areaList: [],
      areaIdList: [],
      provinceArr: [],
      cityArr: [],
      areaArr: [],
      custom_appid: '',
      custom_appkey: ''
    }
  },
  methods: {
    selectProvince () {
      this.provinceList = []
      this.provinceIdList = []
      this.city = ''
      this.city_id = ''
      this.area = ''
      this.area_id = ''
      this.provinceArr.forEach(v => {
        this.provinceList.push(v.name)
        this.provinceIdList.push(v.id)
      })
      picker.pick({
        index: 0,
        items: this.provinceList,
        confirmTitle: '确认',
        cancelTitle: '取消'
      }, event => {
        if (event.result === 'success') {
          this.province = this.provinceList[event.data]
          this.province_id = this.provinceIdList[event.data]
          this.getAreaList()
        }
      })
    },
    selectCity () {
      this.area = ''
      this.area_id = ''
      this.cityList = []
      this.cityIdList = []
      this.cityArr.forEach(v => {
        this.cityList.push(v.name)
        this.cityIdList.push(v.id)
      })
      picker.pick({
        items: this.cityList,
        confirmTitle: '确认',
        cancelTitle: '取消'
      }, event => {
        if (event.result === 'success') {
          this.city = this.cityList[event.data]
          this.city_id = this.cityIdList[event.data]
          this.getAreaList()
        }
      })
    },
    selectArea () {
      this.areaList = []
      this.areaIdList = []
      this.areaArr.forEach(v => {
        this.areaList.push(v.name)
        this.areaIdList.push(v.id)
      })
      picker.pick({
        items: this.areaList,
        confirmTitle: '确认',
        cancelTitle: '取消'
      }, event => {
        if (event.result === 'success') {
          this.area = this.areaList[event.data]
          this.area_id = this.areaIdList[event.data]
        }
      })
    },
    goback () {
      this.goBack()
    },
    getAreaList () {
      const param = {
        m: 'Apiconvenience',
        c: 'city',
        a: 'show',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey
      }
      if (this.province_id) {
        param.province_id = this.province_id
      }
      if (this.city_id) {
        param.city_id = this.city_id
      }
      nativeUtil.alert(param)
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        nativeUtil.alert(res)
        if (!res.ErrorCode) {
          this.provinceArr = res.data.province
          this.cityArr = res.data.city
          this.areaArr = res.data.area
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
      })
    },
    search () {
      if (!this.isSearch) return
      const param = {
        m: 'Apiconvenience',
        c: 'services',
        a: 'getTrainTicketAgency',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        province_id: this.province_id,
        city_id: this.city_id,
        area_id: this.area_id,
        name: this.name,
        count: 10,
        offset: 0
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (!res.ErrorCode) {
          this.jumpWithParams('ModWeexStyle15Result', {province_id: this.province_id, city_id: this.city_id, area_id: this.area_id, name: this.name})
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
        this.getAreaList()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'trainTicket'
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
        this.getAreaList()
      }
    }
  },
  computed: {
    searchflag () {
      const {province, area, city, name} = this
      return {
        province,
        area,
        city,
        name
      }
    }
  },
  watch: {
    searchflag: function (val) {
      if (val.province || val.area || val.city || val.name) {
        this.isSearch = true
      } else {
        this.isSearch = false
      }
    }
  },

  created () {
    nativeUtil.getUserInfo().then(res => {
      if (res) {
        this.access_token = res.userTokenKey
        this.getConfig()
      }
    })
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
</style>
