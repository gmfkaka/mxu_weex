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
            <text class="title-txte">火车票代售点</text>
            <div class="back-icon-box" @click="goback">
                <image :src="getLocalImgUrl('ask_back_white.png')" class="back-icon"></image>
            </div>
        </div>
        <div class="scroller-box">
        <scroller class="mian-content" show-scrollbar=false>
            <div class="content-item"  v-for="(item,idx) in resultList" :key="idx">
                <div class="item-title">
                    <text class="title-text">{{item.agency_name}}</text>
                    <div class="detail-icon-box" v-if="!item.show" @click="changeShow(item,idx)">
                        <image :src="getLocalImgUrl('left_noactive.png')" class="detail-icon"></image>
                    </div>
                    <div class="detail-icon-box" v-if="item.show"  @click="changeShow(item,idx)">
                         <image :src="getLocalImgUrl('down_active.png')" class="detail-icon-show"></image>
                    </div>
              </div>
                <div class="item-area item-content">
                    <image :src="getLocalImgUrl('train_area.png')" class="item-icon item-icon-area"></image>
                    <text class="item-text">{{item.address}}</text>
                </div>
                <div class="item-tel item-content" v-if="item.show">
                    <image :src="getLocalImgUrl('train_tel.png')" class="item-icon item-icon-tel"></image>
                    <text class="item-text">{{item.phone_no}}</text>
                </div>
                <div class="item-date item-content" v-if="item.show">
                    <image :src="getLocalImgUrl('train_date.png')" class="item-icon item-icon-date"></image>
                    <text class="item-text">上午：{{item.start_time_am}}~{{item.end_time_am}}下午：{{item.start_time_pm}}~{{item.end_time_pm}}</text>
                </div>
            </div>
            <loading class="loading-box" @loading="loading" :display="isloading ? 'show' : 'hide'">
                <loading-indicator v-if="isloading" class="indicator"></loading-indicator>
                <text v-if="isloading" class="loading-text">加载中...</text>
            </loading>
        </scroller>
        </div>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import ShowLoading from '../../components/common/ShowLoading'
export default {
  name: 'ModWeexStyle15',
  components: {
    ShowLoading
  },
  data () {
    return {
      isShow: true,
      offset: 0,
      isloading: false,
      isSearch: false,
      resultList: [],
      custom_appid: '',
      custom_appkey: ''
    }
  },
  methods: {
    goback () {
      this.goBack()
    },
    loading () {
      this.offset += 10
      this.isloading = true
      this.search(this.offset)
    },
    changeShow (item, idx) {
      this.$set(this.resultList, idx, {show: !item.show, agency_name: item.agency_name, address: item.address, phone_no: item.phone_no})
    },
    search (offset) {
      const param = {
        m: 'Apiconvenience',
        c: 'services',
        a: 'getTrainTicketAgency',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        province_id: this.getQuery().province_id,
        city_id: this.getQuery().city_id,
        area_id: this.getQuery().area_id,
        name: this.getQuery().name,
        count: 10,
        offset: offset
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (!res.ErrorCode) {
          this.isShow = false
          if (!offset) {
            this.resultList = res.data
          } else {
            if (res.data.length) {
              this.resultList = this.resultList.concat(res.data)
            } else {
              nativeUtil.alert('没有更多了')
            }
          }
          this.resultList.forEach(v => {
            v.show = false
          })
          this.resultList[0].show = true
          this.isloading = false
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
        this.search(0)
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
        this.search(0)
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
    background-image:linear-gradient(to bottom,rgba(56,140,255,1),rgba(54,163,255,1));
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
    color: #ffffff;
}
.scroller-box{
    flex: 1;
    background-color: #F9F9F9;
    border-top-right-radius: 24px;
    border-top-left-radius: 24px;
    margin-top: 15px;
    padding-top: 22px;
    padding-left: 20px;
    padding-right: 20px;
}
.mian-content{
    flex: 1;
}
.content-item{
    width: 710px;
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 40px;
    padding-bottom: 30px;
    margin-top: 20px;
    background-color: #FFFFFF;
    border-top-right-radius: 24px;
    border-top-left-radius: 24px;
    border-bottom-right-radius: 24px;
    border-bottom-left-radius: 24px;
    box-shadow: 0px 0px 12px 0px rgba(18,91,165,0.06);
}
.title-text{
    width: 600px;
    font-size:32px;
    font-weight:500;
    color:rgba(51,51,51,1);
    lines:1;
    text-overflow:ellipsis;
}
.item-text{
    font-size:26px;
    font-weight:400;
    color:rgba(102,102,102,1);

}
.item-icon{
    margin-right: 20px;
}
.item-icon-area{
    width: 22px;
    height: 26px;
}
.item-icon-tel{
    width: 22px;
    height: 28px;
}
.item-icon-date{
    width: 24px;
    height: 24px;
}
.item-content{
    margin-top: 20px;
    flex-direction: row;
    align-items: center
}
.detail-icon-box{
    width: 40px;
    height: 40px;
}
.detail-icon{
    width: 20px;
    height: 24px;
}
.detail-icon-show{
    width: 26px;
    height: 20px;
}
.item-title{
    flex-direction: row;
    align-items: center;
    justify-content: space-between
}
.loading-box{
  width: 750px;
  height: 180px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.indicator {
  height: 40px;
  width: 40px;
  margin-right: 15px;
  color: skyblue;
}
.loading-text{
  text-align: center;
}
</style>
