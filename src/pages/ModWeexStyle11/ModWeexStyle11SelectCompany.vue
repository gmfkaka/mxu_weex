<template>
    <div class="list-wrapper">
       <div class="head" :class="[this.isIphoneX() ? 'ipx' : '']" :style="androidStyle">
            <text class="head-title">选择快递公司</text>
             <div class="back-icon-box" @click="goback">
                <image :src="getLocalImgUrl('ask_back.png')" class="back-icon"></image>
            </div>
       </div>
       <div class="input-container">
            <div class="input-box">
                <input ref="searchInput" type="text" class="input" placeholder-color="#999999" placeholder="搜索" v-model="keyword" @keyup.enter="getList">
                <image :src="getLocalImgUrl('icon_search3x.png')" class="search-icon"></image>
            </div>
       </div>
       <div class="history-content" v-if="historyList.length">
            <text class="history-name" v-for="(item,idx) in historyList" :key="idx">{{item}}</text>
        </div>
       <list class="list">
           <cell class="list-box" v-for="(value,key,index) in list" :key="key" :ref="'item'+index">
               <text class="list-title">{{key}}</text>
               <div class="list-item" v-for="(item , index2) in value" :key="item.id" @click="selectItem(item)">
                    <text class="list-name">{{item.name}}</text>
                   <div class="bottom-line" v-if="index2 !== value.length-1"></div>
               </div>
           </cell>
       </list>
       <!-- 右侧字母表索引 -->
       <div class="alphabet-box">
           <text class="alphabet-text" v-for="(value,index) in listAlphabet" :key="index" @click="goIndex(index)">{{value}}</text>
       </div>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
let storage = weex.requireModule('storage')
const dom = weex.requireModule('dom')
const Steve = new BroadcastChannel('Avengers')
export default {
  name: 'SelectBox',
  data () {
    return {
      keyword: '',
      list: [],
      listAlphabet: [],
      access_token: '',
      custom_appid: '',
      custom_appkey: '',
      statusbar_height: '',
      historyList: []
    }
  },
  methods: {
    goback () {
      this.goBack()
    },
    goIndex (index) {
      dom.scrollToElement(this.$refs['item' + index][0], {})
    },
    selectItem (item) {
      Steve.postMessage(item)
      this.goback()
    },
    getList () {
      const param = {
        m: 'Apiconvenience',
        c: 'services',
        a: 'getExpressCompany',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        name: this.keyword
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (!res.ErrorCode) {
          this.list = this.sortObject(res.data)
          this.listAlphabet = Object.keys(res.data).sort()
          if (this.keyword && !this.historyList.includes(this.keyword)) {
            this.historyList.push(this.keyword)
            storage.setItem('resultHistory', JSON.stringify(this.historyList))
          }
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
      })
    },
    sortObject (obj) {
      let sorted = {}
      let key
      let arr = []
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          arr.push(key)
        }
      }
      arr.sort()
      for (key = 0; key < arr.length; key++) {
        sorted[arr[key]] = obj[arr[key]]
      }
      return sorted
    },
    // 获取配置文件
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
            this.statusbar_height = result.statusbar_height
          }
          this.getList()
        }
      }
    }
  },
  created () {
    this.getConfig()
    storage.getItem('resultHistory', (e) => {
      if (e.result === 'success') {
        this.historyList = JSON.parse(e.data)
        console.log(this.historyList)
      } else {
        this.historyList = []
      }
    })
  },
  computed: {
    androidStyle () {
      if (this.statusbar_height) {
        return {
          paddingTop: `${this.statusbar_height}px`
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.list-wrapper{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}
.ipx{
    margin-top: 20px
}
.head{
    width: 750px;
    padding-bottom: 10px;
    flex-direction: row;
    padding-top: 58px;
    padding-left: 25px;
    padding-right: 25px;
}
.head-title{
    flex: 1;
    text-align: center;
    font-size: 36px;
}
.back-icon{
    width: 20px;
    height: 38px;
}
.back-icon-box{
    width: 50px;
    height: 50px;
    position: absolute;
    justify-content: center;
    align-items: center;
}
.input-container{
    width: 750px;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color:#F0F0F0;
}
.input-box{
    width: 700px;
    height: 64px;
    border-bottom-left-radius:4px;
    border-bottom-right-radius:4px;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
    align-items: center;
    padding-left:30px;
    padding-right:30px;
    flex-direction: row;
    background-color:#F3F3F3;
}
.search-icon{
    width: 28px;
    height:28px;
    margin-right:12px;
}
.input{
    height:36px;
    flex:1;
    background-color: #F3F3F3;
    font-size: 26px;
}
.list{
    width: 750px;
    flex: 1;
    padding-bottom:100px;
}
.list-title{
    height: 70px;
    line-height: 70px;
    background-color:rgba(245,245,245,1);
    font-size: 26px;
    color:rgba(153,153,153,1);
    padding-left: 34px;
}
.list-item{
    width: 700px;
    height: 114px;
    flex-direction: row;
    align-items: center;
    padding-left: 32px;
    padding-right: 32px;
}
.list-avatar{
    margin-right: 30px;
    width: 74px;
    height: 74px;
    border-bottom-left-radius:37px;
    border-bottom-right-radius:37px;
    border-top-left-radius:37px;
    border-top-right-radius:37px;
}
.list-name{
    font-size: 34px;
    color:#333333;
}
.bottom-line{
    width: 696px;
    height: 1px;
    background-color:#dadada;
    position: absolute;
    bottom: 0;
    left: 32px;
}
.alphabet-box{
    width: 60px;
    position: fixed;
    top: 225px;
    bottom: 0;
    right: 20px;
    justify-content: center;
}
.alphabet-text{
    color:rgba(51,51,51,1);
    font-size: 22px;
    line-height: 30px;
    text-align: right;
}
.history-content{
    margin-top: 20px;
    padding-left: 30px;
    padding-right: 30px;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
}
.history-name{
    height: 48px;
    line-height: 48px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 24px;
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
