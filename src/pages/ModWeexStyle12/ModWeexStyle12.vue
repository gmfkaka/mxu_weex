<template>
     <div class="home-wrapper" @viewappear="onappear">
        <div class="top" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStylePaddingTop">
            <text class="title-txte">违章查询</text>
            <div class="back-icon-box" @click="goback">
                <image :src="getLocalImgUrl('ask_back.png')" class="back-icon"></image>
            </div>
        </div>
        <div class="search-message" v-for="(item,idx) in carList" :key="idx" @click="goResult(item)">
            <!-- <div class='swipeBox' ref="itemDev" @swipe="handleSwipe($event,idx)"> -->
                <div class="message-top">
                    <div class="car-box">
                        <text class="car-num">{{item.plate}}</text>
                        <image :src="getLocalImgUrl('editCar.png')" class="editcar-icon" @click="goDetail(item)"></image>
                    </div>
                    <text v-if="item.type=='01'" class="car-type">大型车</text>
                    <text v-if="item.type=='02'" class="car-type">小型车</text>
                    <image v-if="item.type=='01'" :src="getLocalImgUrl('bigCar.png')" class="car-icon"></image>
                    <image v-if="item.type=='02'" :src="getLocalImgUrl('littleCar.png')" class="car-icon"></image>
                </div>
                <!-- <div class="delItem"  @click="removeItem(idx,item)">
                    <image :src="getLocalImgUrl('icon_del_all3x.png')" class="del-icon"></image>
                </div> -->
            <!-- </div> -->
        </div>
        <div class="middle-box">
            <image :src="getLocalImgUrl('addCar.png')" @click="addCar" class="company-icon"></image>
            <text class="odd-num">添加车辆，查询违章</text>
        </div>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
const animation = weex.requireModule('animation')
export default {
  name: 'ModWeexStyle12',
  data () {
    return {
      plateValue: '',
      plate: '',
      type: '',
      engine: '',
      vin: '',
      custom_appid: '',
      custom_appkey: '',
      access_token: '',
      carList: [],
      currentIndex: -1
    }
  },
  watch: {

  },
  methods: {
    handleSwipe (e, index) {
      if (e.direction === 'left') {
        this.goLeft(index)
      } else if (e.direction === 'right') {
        this.goRight(index)
      }
    },
    goLeft (index) {
      let itemEl = this.$refs.itemDev[index]
      if (index === this.currentIndex) {
        return
      }
      if (this.currentIndex !== -1) {
        this.goRight(this.currentIndex)
      }
      if (this.currentIndex !== index) {
        animation.transition(itemEl, {
          styles: {
            transform: 'translate(-160px, 0px)',
            transformOrigin: 'center center'
          },
          duration: 200,
          timingFunction: 'linear',
          delay: 0
        })
        this.currentIndex = index
      }
    },

    goRight (index, time = 200) {
      let itemEl = this.$refs.itemDev[index]
      animation.transition(itemEl, {
        styles: {
          transform: 'translate(0px, 0px)',
          transformOrigin: 'center center'
        },
        duration: time,
        timingFunction: 'linear',
        delay: 0 // ms
      })
      this.currentIndex = -1
    },

    removeItem (index, item) {
      this.goRight(index, 0)
      const param = {
        m: 'Apiconvenience',
        c: 'car',
        a: 'delete',
        access_token: this.access_token,
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        id: item.id
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (!res.ErrorCode) {
          nativeUtil.alert('删除成功')
          this.getCarList()
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      })
    },
    onappear () {
      this.getCarList()
    },
    goback () {
      this.goBack()
    },
    addCar () {
      this.jumpWithParams('ModWeexStyle12AddCar', {})
    },
    goResult (item) {
      this.jumpWithParams('ModWeexStyle12Result', {plate: item.plate, type: item.type, engine: item.engine, vin: item.vin})
    },
    goDetail (item) {
      this.jumpWithParams('ModWeexStyle12AddCar', {id: item.id, plate: item.plate, type: item.type, engine: item.engine, vin: item.vin})
    },
    getCarList () {
      const param = {
        m: 'Apiconvenience',
        c: 'car',
        a: 'show',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        access_token: this.access_token
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (!res.ErrorCode) {
          nativeUtil.log(res)
          this.carList = res.data
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
        this.getCarList()
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
        this.getCarList()
      }
    }
  },
  created () {
    // nativeUtil.allowSlideBack(0)
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
.editcar-icon{
    width: 30px;
    height: 30px;
    margin-left: 30px;
    margin-bottom: 10px;
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
    width: 690px;
    height: 240px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 30px;
    margin-right: 30px;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF
}
.company-icon{
    width: 88px;
    height: 88px;
    margin-bottom: 20px;
}
.odd-num{
    font-size: 28px;
    color:#666666
}
.search-message{
    width: 690px;
    height: 152px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 30px;
    margin-right: 30px;
}
.message-top{
    width: 710px;
    height: 152px;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color:#69A9FF;
}
.car-num{
    font-size: 40px;
    color: #FFFFFF;
    margin-bottom: 10px;
}
.car-type{
    font-size: 24px;
    color: #FFFFFF;
}
.car-icon{
    width: 320px;
    height: 150px;
    position: absolute;
    right: 0;
    bottom: 0;
}
.meaage-bottom{
    height: 88px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding-left: 40px;
    padding-right: 40px;
    background-color: #fff;
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
.car-box{
    flex-direction: row;
    align-items: center;
}
.swipeBox{
    flex-direction: row;
    width: 870px
}
.delItem{
    background-color: #ff0000;
    width: 160px;
    height: 152px;
    justify-content: center;
    align-items: center
}
.del-text{
    font-size: 28px;
    color:#ffffff
}
.del-icon{
    width: 32px;
    height: 32px;
}
</style>
