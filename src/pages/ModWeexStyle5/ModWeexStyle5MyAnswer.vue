<template>
    <div class="answer">
       <list class="list-box" alwaysScrollableVertical='true' v-if="replyList.length && login==='1'">
            <refresh @refresh="myAnsweredRefresh"  :display="myAnsweredRefreshing ? 'show' : 'hide'">
                <refresh-style></refresh-style>
            </refresh>
            <cell class="reply-item" v-for="(item,key) in replyList" :key="key" @click="goDetail(item.post_fid)">
                <text v-if="item.post_fid_info" class="reply-question">问题：{{item.post_fid_info.title}}</text>
                <text class="reply-answer">我的回答：{{item.title}}</text>
                <text class="reply-time">{{transTime(item.create_time)}}</text>
            </cell>
            <loading class="loading-box" @loading="myAnsweredloading" :display="myAnsweredLoadinging ? 'show' : 'hide'">
                <loading-indicator v-if="myAnsweredLoadinging" class="indicator"></loading-indicator>
                <text v-if="myAnsweredLoadinging" class="loading-text">加载中...</text>
            </loading>
        </list>
        <no-date1 v-if="!replyList.length && login==='1'"></no-date1>
        <div v-if="login!=='1'" class="gologin">
            <image :src="getLocalImgUrl('ask_gologin.png')" class="go-login-img"></image>
            <text class="go-login-text" @click="goLogin">去登陆</text>
        </div>
    </div>
</template>
<script>
import { nativeUtil } from '../../lib/nativeUtils'
import RefreshStyle from '../../components/common/RefreshStyle'
import NoDate1 from '../../components/wenda/NoDate1.vue'
export default {
  props: ['access_token', 'login', 'custom_appid', 'custom_appkey', 'replyList'],
  name: 'MyAnswer',
  components: {
    nativeUtil,
    RefreshStyle,
    NoDate1
  },
  data () {
    return {
      myAnsweredLoadinging: false,
      myAnsweredRefreshing: false,
      offset: 0
    }
  },
  methods: {
    // 我的回答下拉刷新
    myAnsweredRefresh () {
      this.myAnsweredRefreshing = true
      this.offset = 0
      this.getMyAnswer(this.offset)
    },
    // 我的回答加载更多
    myAnsweredloading () {
      this.offset += 20
      this.myAnsweredLoadinging = true
      this.getMyAnswer(this.offset)
    },
    goDetail (id) {
      this.jumpWithParams('ModWeexStyle5WendaDetail', {id})
    },
    goLogin () {
      nativeUtil.goLogin().then(res => {
        if (res === '1') {
          nativeUtil.getUserInfo().then(res => {
            this.access_token = res.userTokenKey
            this.login = '1'
            this.getMyAnswer(0)
          })
        }
      })
    },
    // 我的回答
    getMyAnswer (offset) {
      const param = {
        m: 'Apibbs',
        c: 'post',
        a: 'index',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        access_token: this.access_token,
        show_my: 1,
        show_my_reply: 1,
        count: 20,
        offset: offset
      }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        if (!res.ErrorCode) {
          this.myAnsweredRefreshing = false
          this.myAnsweredLoadinging = false
          if (offset === 0) {
            this.replyList = res
          } else {
            if (res.length) {
              this.replyList = this.replyList.concat(res)
            } else {
              nativeUtil.alert('没有更多了')
            }
          }
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
      }
      if (this.login === '1') {
        this.getMyAnswer(0)
      }
    }
  },
  created () {
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">
.answer{
    width: 750px;
    position: absolute;
    top:0;
    bottom:0;
    background-color: #F8F8F8;
}
.list-box{
    flex: 1;
}
.reply-item{
    background-color: #fff;
    padding-top: 40px;
    padding-left: 35px;
    padding-right: 32px;
    padding-bottom: 40px;
    border-bottom-width: 20px;
    border-bottom-style: solid;
    border-bottom-color:#F8F8F8;
}
.reply-question{
    color:rgba(102,102,102,1);
    font-size: 30px;
}
.reply-answer{
    font-size: 30px;
    color:rgba(51,51,51,1);
    padding-top: 11px;
    padding-bottom: 20px;
}
.reply-time{
    font-size: 24px;
    color:rgba(153,153,153,1);
}
.gologin{
    width: 750px;
    height: 900px;
    align-items: center;
    justify-content: center;
}
.go-login-text{
    width: 600px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 30px;
    color: #FFFFFF;
    margin-top: 20px;
    background-color: #f7402e;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
.go-login-img{
    width: 200px;
    height: 185px;
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
