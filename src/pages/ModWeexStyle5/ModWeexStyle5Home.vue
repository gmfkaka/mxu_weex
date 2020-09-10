<template>
     <div class="home-wrapper">
        <nav2 ref="nav2" @changeIndex="changeIndex" ></nav2>
         <!-- 热门 -->
        <div  v-if="currentIndex === 0"  class="home-flex">
            <dong-tai :homeList='homeList' is_hot='1' :columnList='columnList' :access_token='access_token'
                    :login='login' :custom_appid='custom_appid' :custom_appkey='custom_appkey'>
            </dong-tai>
        </div>
        <!-- 动态 -->
        <div  v-if="currentIndex === 1" class="home-flex">
           <dong-tai :homeList='homeList' is_hot='0' :columnList='columnList' :access_token='access_token'
                    :login='login' :custom_appid='custom_appid' :custom_appkey='custom_appkey'>
            </dong-tai>
        </div>
        <!-- 我的问题 -->
        <div v-if="currentIndex === 2" class="home-flex">
            <my-question :questionList='questionList' :managerPosts='managerPosts'
                          :access_token='access_token' :login='login'
                          :custom_appid='custom_appid' :custom_appkey='custom_appkey'>
            </my-question>
        </div>
        <!-- 我的回答 -->
        <div v-if="currentIndex === 3" class="home-flex">
            <my-answer  :replyList='replyList' :access_token='access_token'  :login='login'
                        :custom_appid='custom_appid' :custom_appkey='custom_appkey'>
            </my-answer>
        </div>
        <wxc-loading :show="loadingShow"></wxc-loading>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import nav2 from '../../components/nav/Nav2'
import List1 from '../../components/wenda/List1.vue'
import List3 from '../../components/wenda/List3.vue'
import RefreshStyle from '../../components/common/RefreshStyle'
import MyQuestion from './ModWeexStyle5MyQuestion.vue'
import MyAnswer from './ModWeexStyle5MyAnswer.vue'
import DongTai from './ModWeexStyle5DongTai.vue'
import NoDate1 from '../../components/wenda/NoDate1.vue'
import { WxcLoading } from 'weex-ui'
// let dom = weex.requireModule('dom')
// let storage = weex.requireModule('storage')
export default {
  name: 'Home',
  components: {
    nav2,
    List1,
    List3,
    RefreshStyle,
    MyQuestion,
    MyAnswer,
    DongTai,
    NoDate1,
    WxcLoading
  },
  data () {
    return {
      access_token: '',
      currentIndex: 0,
      navActive: 0,
      sortTime: Boolean,
      sortReward: Boolean,
      slideIndex: 0,
      homeList: [],
      columnList: [],
      navId: '',
      is_hot: '',
      order_field: '',
      order_type: '',
      offset: 0,
      count: 20,
      login: '',
      custom_appid: '',
      custom_key: '',
      replyList: [],
      questionList: [],
      managerPosts: [],
      loadingShow: true,
      statusbar_height: ''
    }
  },
  //   mounted () {
  //     this.getLoginStatus()
  //   },
  methods: {
    changeIndex (index) {
      if (index !== 4) {
        this.currentIndex = index
        this.getLoginStatus()
      } else {
        this.goAsk()
      }
      //   this.access_token = '376f8e29107f542ce338445439ffbe75'
      //   this.custom_appid = '269'
      //   this.custom_appkey = 'VOCFYCkRGhwrM9ZD14OoRx2ZWlsDB7zn'
      //   this.login = '1'
      //   this.getColumnList()
      //   this.order_field = 'create_time'
      //   this.order_type = 'DESC'
      //   this.getHomeList(0, 0, this.order_field, this.order_type, 0)
    },
    // 获取登录状态
    getLoginStatus () {
      nativeUtil.getLoginStatus().then(res => {
        this.login = res
        if (res === '0' && (this.currentIndex === 2 || this.currentIndex === 3 || this.currentIndex === 4)) {
          nativeUtil.goLogin().then(res => {
            if (res === '1') {
              this.login = '1'
              this.getUserInfo()
            }
          })
        } else {
          this.getUserInfo()
        }
      })
    },
    // 获取用户信息
    getUserInfo () {
      nativeUtil.getUserInfo().then(res => {
        this.access_token = res.userTokenKey
        if (this.currentIndex === 0 || this.currentIndex === 1) { //   热门 动态
          this.getColumnList()
          this.order_field = 'create_time'
          this.order_type = 'DESC'
          this.getHomeList(0, 0, this.order_field, this.order_type, 0)
        } else if (this.currentIndex === 2) { // 我的问题
          this.getMyQuestionList(0, 0)
          this.getManagerPosts()
        } else if (this.currentIndex === 3) { // 我的回答
          this.getMyAnswer(0)
        }
        // else if (this.currentIndex === 4) { //   我要提问
        //   this.goAsk()
        // }
      })
    },
    // 获取分类标签
    getColumnList () {
      const param = {
        m: 'Apibbs',
        c: 'tags',
        a: 'index',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey
      }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        if (!res.ErrorCode) {
          this.columnList = res
          this.columnList.unshift({
            name: '全部',
            id: '0'
          })
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
      })
    },
    async getHomeList (idx, id, field, type, offset) {
      this.navId = id
      this.navActive = idx
      let param = {
        m: 'Apibbs',
        c: 'post',
        a: 'index',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        tag_ids: id,
        post_fid: 0,
        order_field: field,
        order_type: type,
        count: 20,
        offset: offset
      }
      const result = await nativeUtil.getUserInfo()
      if (result) {
        param.access_token = result.userTokenKey
      }
      if (this.currentIndex === 0) {
        param.is_hot = '1'
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (!res.ErrorCode) {
          this.loadingShow = false
          if (!offset) {
            this.homeList = res
          } else {
            if (res.length) {
              this.homeList = this.homeList.concat(res)
            } else {
              nativeUtil.alert('没有更多了')
            }
          }
          this.homeLoadinging = false
          this.refreshing = false
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
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
    // 板块版主专家可见total
    getManagerPosts () {
      const param = {
        m: 'Apibbs',
        c: 'forum',
        a: 'getManagerPosts',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        access_token: this.access_token
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (!res.ErrorCode) {
          this.managerPosts = res
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 我的问题
    getMyQuestionList (type, offset) {
      let param = {
        m: 'Apibbs',
        c: 'post',
        a: 'index',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        access_token: this.access_token,
        post_fid: 0,
        show_my: 1,
        count: 20,
        offset: offset
      }
      if (!type) {
        param.post_num = 0 // 待回答
      } else {
        param.post_num = -99 // 已回答
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (!res.ErrorCode) {
          if (!offset) {
            this.questionList = res
          } else {
            if (res.length) {
              this.questionList = this.questionList.concat(res)
            } else {
              nativeUtil.alert('没有更多了')
            }
          }
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 我要提问
    goAsk () {
      this.jumpWithParams('ModWeexStyle5WendaAsk', {})
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
      }
      const result = await nativeUtil.getSystemInfo()
      if (result) {
        this.custom_appid = result.custom_appid
        this.custom_appkey = result.custom_appkey
        if (result.statusbar_height) {
          this.statusbar_height = result.statusbar_height
        }
        this.getColumnList()
        this.order_field = 'create_time'
        this.order_type = 'DESC'
        this.getHomeList(0, 0, this.order_field, this.order_type, 0)
      }
    }
  },
  computed: {
    activeNav () {
      return this.navActive
    }
  },
  created () {
    this.sortTime = true
    this.sortReward = false
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">
.home-wrapper{
    width: 750px;
    position: absolute;
    top:0;
    bottom:0;
    background-color: #F8F8F8;
}
.home-flex{
    flex: 1;
}
</style>
