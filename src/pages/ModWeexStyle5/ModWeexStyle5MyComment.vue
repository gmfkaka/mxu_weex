<template>
    <div class="comment-wrapper">
       <div class="main">
           <div class="nav">
               <text class="nav-text" :class="[nowIndex === index ? 'nav-active':'']" v-for="(item,index) in navList" :key="index" @click="changeIndex(index)">{{item}}</text>
           </div>
           <slider forbid-slide-animation="false" bubble="false"
          auto-play="false" infinite="false" @change="slideChange" :index="nowIndex" style="flex:1;">
                <list class="list-box">
                    <refresh @refresh="refresh"  :display="refreshing ? 'show' : 'hide'">
                        <refresh-style></refresh-style>
                    </refresh>
                    <cell class="list-item" v-for="(data,index) in sendList" :key="index">
                        <list4 :data="data" :type="1"></list4>
                    </cell>
                    <loading class="loading-box" @loading="loading" :display="loadinging ? 'show' : 'hide'">
                        <text v-if="loadinging" class="loading-text">加载中...</text>
                    </loading>
                </list>
                <list class="list-box">
                    <refresh @refresh="refresh"  :display="refreshing ? 'show' : 'hide'">
                        <refresh-style></refresh-style>
                    </refresh>
                    <cell class="list-item" v-for="(data,index) in replyList" :key="index">
                        <list4 :data="data" :type="2"></list4>
                    </cell>
                    <loading class="loading-box" @loading="loading" :display="loadinging ? 'show' : 'hide'">
                        <text v-if="loadinging" class="loading-text">加载中...</text>
                    </loading>
                </list>
           </slider>
       </div>
       <div class="head">
            <text class="head-title">我的评论</text>
            <image :src="getLocalImgUrl('ask_back.png')" class="back-icon" @click="goback"></image>
       </div>
    </div>
</template>
<script>
import { nativeUtil } from '../../lib/nativeUtils'
import List4 from '../../components/wenda/List4'
import RefreshStyle from '../../components/common/RefreshStyle'
// let storage = weex.requireModule('storage')
export default {
  name: 'MyComment',
  components: {
    List4,
    RefreshStyle
  },
  data () {
    return {
      refreshing: false,
      loadinging: false,
      nowIndex: 0,
      offset: 0,
      navList: ['发出的评论', '收到的评论'],
      sendList: [],
      replyList: []
    }
  },
  methods: {
    goback () {
      this.goBack()
    },
    changeIndex (index) {
      this.nowIndex = index
      if (!this.nowIndex) {
        this.getSendList(0)
      } else {
        this.getReplyList(0)
      }
    },
    slideChange (event) {
      this.nowIndex = event.index
      if (!this.nowIndex) {
        this.getSendList(0)
      } else {
        this.getReplyList(0)
      }
    },
    refresh () {
      this.offset = 0
      this.refreshing = true
      if (!this.nowIndex) {
        this.getSendList(this.offset)
      } else {
        this.getReplyList(this.offset)
      }
    },
    loading () {
      this.offset += 10
      this.loadinging = true
      if (!this.nowIndex) {
        this.getSendList(this.offset)
      } else {
        this.getReplyList(this.offset)
      }
    },
    getSendList (offset) {
      const param = {
        m: 'Apibbs',
        c: 'comment',
        a: 'index',
        custom_appid: '269',
        custom_appkey: 'VOCFYCkRGhwrM9ZD14OoRx2ZWlsDB7zn',
        access_token: this.access_token,
        count: 10,
        offset: offset
      }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        if (!res.ErrorCode) {
          if (!offset) {
            this.sendList = res
          } else {
            if (res.length) {
              this.sendList = this.sendList.concat(res)
            } else {
              nativeUtil.alert('没有更多了')
            }
          }
          this.refreshing = false
          this.loadinging = false
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
      })
    },
    getReplyList (offset) {
      const param = {
        m: 'Apibbs',
        c: 'comment',
        a: 'getMyPostComment',
        custom_appid: '269',
        custom_appkey: 'VOCFYCkRGhwrM9ZD14OoRx2ZWlsDB7zn',
        access_token: this.access_token,
        count: 10,
        offset: offset
      }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        if (!res.ErrorCode) {
          if (!offset) {
            this.replyList = res
          } else {
            if (res.length) {
              this.replyList = this.replyList.concat(res)
            } else {
              nativeUtil.alert('没有更多了')
            }
          }
          this.refreshing = false
          this.loadinging = false
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 获取配置文件
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'id': '10044',
          'uniqueid': 'help2',
          'type': '1',
          'name': '问答',
          'ename': 'help2',
          'custom_name': '问答',
          'normal_pic': '',
          'press_pic': '',
          'url': '',
          'is_master': '0',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '0',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle5',
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
            'home_list': 'http://bbssc.cloud.hoge.cn',
            'home_list_mine': 'home_list_mine',
            'send_content': 'send_content'
          }
        }
        this.api = this.config.api
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'help2'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        // 获取登录状态
        const loginStatus = await nativeUtil.getLoginStatus()
        if (loginStatus === '0') {
          nativeUtil.goLogin()
        } else {
          const result = await nativeUtil.getUserInfo()
          if (result) {
            this.access_token = result.userTokenKey
            this.getSendList(0)
          }
        }
      }
    }
  },
  created () {
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">
.comment-wrapper{
    width: 750px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}
.head{
    height: 127px;
    padding-bottom: 25px;
    flex-direction: row;
    padding-top: 58px;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
}
.head-title{
    font-size: 36px;
    width: 750px;
    text-align: center;
}
.back-icon{
    width: 20px;
    height: 38px;
    position: absolute;
    left: 24px;
    top: 64px;
}
.main{
    width: 750px;
    margin-top: 127px;
    flex: 1;
    background-color: rgba(249,249,249,1);
    padding-left: 24px;
    padding-right: 24px;
}
.nav{
    flex-direction: row;
    height: 81px;
}
.nav-text{
    width: 351px;
    height: 81px;
    line-height: 81px;
    text-align: center;
    font-weight:500;
    color:rgba(51,51,51,1);
    font-size: 30px;
}
.nav-active{
    font-weight:600;
    color:rgba(247,64,46,1);
}
.list-box{
    flex: 1;
    width: 702px;
    padding-bottom: 100px;
}
</style>
