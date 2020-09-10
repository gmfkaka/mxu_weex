<template>
     <div class="home-wrapper">
        <div class="top" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStylePaddingTop">
            <text class="title-txte">违章查询</text>
             <div class="back-icon-box" @click="goback">
                <image :src="getLocalImgUrl('ask_back.png')" class="back-icon"></image>
            </div>
        </div>
        <div class="mian-input">
            <div class="odd-num odd" @click="selectType">
                <text class="odd-title">号牌种类</text>
                <input type="text" class="odd-input" v-model='typeCar' placeholder-color="#CCCCCC" placeholder="请选择车型">
            </div>
            <div class="odd-company odd">
                <text class="odd-title">车牌号</text>
                <input type="text" class="odd-input province"  v-model='province' @click="selectProvince">
                <div class="xiala-icon-box" @click="selectProvince">
                    <image :src="getLocalImgUrl('11xiala.png')" class="xiala-icon" ></image>
                </div>
                <input type="text" class="odd-input" style="text-transform:uppercase" v-model='plateNum'  placeholder-color="#CCCCCC" placeholder="请输入">
            </div>
            <div class="odd-tel odd">
                <text class="odd-title">发动机号</text>
                <input type="text" class="odd-input" v-model='engine'  placeholder-color="#CCCCCC" placeholder="请输入发动机号后6位">
            </div>
            <div class="odd-tel odd">
                <text class="odd-title">车架号</text>
                <input type="text" class="odd-input" v-model='vin'  placeholder-color="#CCCCCC" placeholder="请输入完整发车架号">
            </div>
        </div>
        <text v-if='!id'  :class="[isSearch ? 'searchActive':'noActive']" class="search-box" @click="search">查询</text>
        <text v-if='id' class="del-box" @click="delCra">删除车辆</text>
        <text v-if='id' class="search-box conserve" @click="conserve">保存</text>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
const picker = weex.requireModule('picker')
export default {
  name: 'ModWeexStyle12AddCar',
  data () {
    return {
      isSearch: false,
      plateNum: '',
      plate: '',
      typeCar: '',
      type: '',
      engine: '',
      vin: '',
      province: '',
      id: '',
      access_token: '',
      provinceList: ['京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '桂', '琼', '渝', '川', '黔', '滇', '藏', '陕', '甘', '青', '宁', '新'],
      carTypeList: ['大型车', '小型车'],
      custom_appid: '',
      custom_appkey: ''
    }
  },
  methods: {
    goback () {
      this.goBack()
    },
    selectType () {
      picker.pick({
        items: this.carTypeList,
        confirmTitle: '确认',
        cancelTitle: '取消'
      }, event => {
        if (event.result === 'success') {
          this.typeCar = this.carTypeList[event.data]
        }
      })
    },
    selectProvince () {
      picker.pick({
        items: this.provinceList,
        confirmTitle: '确认',
        cancelTitle: '取消'
      }, event => {
        if (event.result === 'success') {
          this.province = this.provinceList[event.data]
        }
      })
    },
    search () {
      if (!this.isSearch) return
      this.type = this.typeCar === '大型车' ? '01' : '02'
      this.plate = `${this.province}${this.plateNum}`
      const param = {
        m: 'Apiconvenience',
        c: 'services',
        a: 'getViolation',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        plate: this.plate,
        type: this.type,
        engine: this.engine,
        vin: this.vin
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (!res.ErrorCode) {
          // 添加绑定车辆
          const caeatParam = {
            m: 'Apiconvenience',
            c: 'car',
            a: 'create',
            access_token: this.access_token,
            custom_appid: this.custom_appid,
            custom_appkey: this.custom_appkey,
            plate: this.plate,
            engine: this.engine,
            vin: this.vin
          }
          this.$httpRequest(this.api.home_list, caeatParam, 'post').then(res => {
            if (!res.ErrorCode) {

            } else {
              nativeUtil.alert(res.ErrorText)
            }
          })
          this.jumpWithParams('ModWeexStyle12Result', {plate: this.plate, type: this.type, engine: this.engine, vin: this.vin, typeCar: this.typeCar, province: this.province, plateNum: this.plateNum})
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
      })
    },
    conserve () {
      this.type = this.typeCar === '大型车' ? '01' : '02'
      const caeatParam = {
        m: 'Apiconvenience',
        c: 'car',
        a: 'update',
        access_token: this.access_token,
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        id: this.id,
        plate: this.plate,
        engine: this.engine,
        vin: this.vin,
        type: this.type
      }
      this.$httpRequest(this.api.home_list, caeatParam, 'get').then(res => {
        if (!res.ErrorCode) {
          nativeUtil.alert('保存成功')
          this.jumpWithParams('ModWeexStyle12', {})
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      })
    },
    delCra () {
      const param = {
        m: 'Apiconvenience',
        c: 'car',
        a: 'delete',
        access_token: this.access_token,
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        id: this.id
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (!res.ErrorCode) {
          nativeUtil.alert('删除成功')
          this.jumpWithParams('ModWeexStyle12', {})
        } else {
          nativeUtil.alert(res.ErrorText)
        }
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
        this.id = this.getQuery().id
        this.plate = this.getQuery().plate
        this.type = this.getQuery().type
        this.engine = this.getQuery().engine
        this.vin = this.getQuery().vin
        this.typeCar = this.type === '01' ? '大型车' : '小型车'
        if (this.plate) {
          this.province = this.plate.substring(0, 1)
          this.plateNum = this.plate.substring(1)
        }
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
        const resUser = await nativeUtil.getUserInfo()
        if (resUser) {
          this.access_token = resUser.userTokenKey
        }

        this.id = this.getQuery().id
        this.plate = this.getQuery().plate
        this.type = this.getQuery().type
        this.engine = this.getQuery().engine
        this.vin = this.getQuery().vin
        this.typeCar = this.type === '01' ? '大型车' : '小型车'
        if (this.plate) {
          this.province = this.plate.substring(0, 1)
          this.plateNum = this.plate.substring(1)
        }
      }
    }
  },
  computed: {
    searchflag () {
      const { typeCar,
        engine,
        vin,
        plateNum,
        province} = this
      return {
        typeCar,
        engine,
        vin,
        plateNum,
        province
      }
    }
  },
  watch: {
    searchflag: {
      handler: function (val) {
        if (val.typeCar && val.engine && val.vin && val.plateNum && val.province) {
          this.isSearch = true
        } else {
          this.isSearch = false
        }
      }
    }
  },
  created () {
    this.getConfig()
  },
  mounted () {

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
    width: 128px;
    color: #666666;
    font-size: 32px;
    margin-left: 15px;
    margin-right: 60px;
}
.odd-input{
    width: 400px;
    height: 50px;
    color: #333333;
}
.search-box{
    margin-top: 60px;
    margin-bottom: 50px;
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
.conserve{
    background-color: #388CFF;
}
.searchActive{
    background-color: #388CFF;
}
.noActive{
    background-color: #CCCCCC;
}
.del-box{
    margin-bottom: 60px;
    margin-left: 30px;
    margin-right: 30px;
    width: 690px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-size: 32px;
    color:#FF3F3F;
}
.xiala-icon-box{
    width: 40px;
    height: 30px;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
}
.xiala-icon{
    width: 16px;
    height: 12px;
}
.province{
    width: 40px;
}
</style>
