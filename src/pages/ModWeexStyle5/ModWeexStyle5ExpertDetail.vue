<template>
    <div class="expert-warp" :class="[this.isIphoneX() ? 'ipx' : '']">
        <!-- <wxc-loading :show="wxcLoading" type="trip"></wxc-loading> -->
        <div class="head">
            <image :src="indexPic" class="question-icon"></image>
            <text class="question-top-text">{{title}}</text>
            <image :src="getLocalImgUrl('ask_back.png')" class="back-icon" @click="goback"></image>
        </div>
        <div  class="question-content">
            <div class="question-nav">
                <div class="question-nav-text-box question-nav-left" @click='changeSlide(0)'>
                    <text class="question-nav-text" :class="[slideIndex === 0 ? 'question-nav-text-active' : '']">待回答的求助</text>
                </div>
                <div class="question-nav-text-box" @click='changeSlide(1)'>
                    <text class="question-nav-text" :class="[slideIndex === 1 ? 'question-nav-text-active' : '']">已答复的求助</text>
                </div>
            </div>
            <slider forbid-slide-animation="false"  bubble="false" v-if="answerList.length"
            auto-play="false" infinite="false" @change="slideChange" :index="slideIndex" class="slide-content">
                <list class="to-answer">
                    <refresh @refresh="toAnswerRefresh"  :display="toAnswerRefreshing ? 'show' : 'hide'">
                        <refresh-style></refresh-style>
                    </refresh>
                    <cell class="answerlist" v-for="(item,idx) in answerList" :key="idx" @click="goDetail(item.id)">
                        <list3 :data='item'></list3>
                    </cell>
                    <loading class="loading-box" @loading="toAnswerLoading" :display="toAnswerLoadinging ? 'show' : 'hide'">
                        <loading-indicator v-if="toAnswerLoadinging" class="indicator"></loading-indicator>
                        <text v-if="toAnswerLoadinging" class="loading-text">加载中...</text>
                    </loading>
                </list>
                <list class="answered">
                    <refresh @refresh="answeredRefresh"  :display="answeredRefreshing ? 'show' : 'hide'">
                        <refresh-style></refresh-style>
                    </refresh>
                    <cell  class="answerlist" v-for="(item,idx) in answerList2" :key="idx" @click="goDetail(item.id)">
                        <list3 :data='item'></list3>
                    </cell>
                    <loading class="loading-box" @loading="answeredloading" :display="answeredLoadinging ? 'show' : 'hide'">
                        <loading-indicator v-if="answeredLoadinging"  class="indicator"></loading-indicator>
                        <text v-if="answeredLoadinging" class="loading-text">加载中...</text>
                    </loading>
                </list>
            </slider>
            <no-date1 v-else></no-date1>
        </div>
    </div>
</template>
<script>
import { nativeUtil } from '../../lib/nativeUtils'
import RefreshStyle from '../../components/common/RefreshStyle'
import List3 from '../../components/wenda/List3.vue'
import NoDate1 from '../../components/wenda/NoDate1.vue'
import { WxcLoading } from 'weex-ui'
export default {
  props: ['data'],
  name: 'Edetail',
  components: {
    RefreshStyle,
    List3,
    NoDate1,
    WxcLoading
  },
  data () {
    return {
      expertDetail: {},
      slideIndex: 0,
      toAnswerRefreshing: false,
      answeredRefreshing: false,
      answeredLoadinging: false,
      toAnswerLoadinging: false,
      forum_id: '',
      answerList: [],
      answerList2: [],
      indexPic: '',
      title: '',
      access_token: '',
      wxcLoading: false,
      custom_appid: '',
      custom_appkey: '',
      statusbar_height: ''
    }
  },
  methods: {
    goback () {
      this.goBack()
    },
    goDetail (id) {
      this.jumpWithParams('ModWeexStyle5WendaDetail', {id})
    },
    // 待回答下拉刷新
    toAnswerRefresh () {
      this.toAnswerRefreshing = true
      this.offset = 0
      this.getMyAnswerList(0, this.offset)
    },
    // 已回答下拉刷新
    answeredRefresh () {
      this.answeredRefreshing = true
      this.offset = 0
      this.getMyAnswerList(1, this.offset)
    },
    // 待回答加载更多
    toAnswerLoading () {
      this.offset += 20
      this.toAnswerLoadinging = true
      this.getMyAnswerList(0, this.offset)
    },
    // 已回答加载更多
    answeredloading () {
      this.offset += 20
      this.answeredLoadinging = true
      this.getMyAnswerList(1, this.offset)
    },
    // 列表切换
    changeSlide (index) {
      this.slideIndex = index
      this.getMyAnswerList(this.slideIndex, 0)
    },
    slideChange (event) {
      this.slideIndex = event.index
      this.getMyAnswerList(this.slideIndex, 0)
    },
    // 待回答 已回答列表
    getMyAnswerList (type, offset) {
      this.wxcLoading = true
      const param = {
        m: 'Apibbs',
        c: 'post',
        a: 'index',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey,
        access_token: this.access_token,
        post_fid: 0,
        forum_id: this.forum_id,
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
        if (!res.ErrorCode && param.post_num === 0) {
          this.wxcLoading = false
          if (!offset) {
            this.answerList = res
          } else {
            if (res.length) {
              this.answerList = this.answerList.concat(res)
            } else {
              nativeUtil.alert('没有更多了')
            }
          }
          this.toAnswerRefreshing = false
          this.answeredRefreshing = false
          this.toAnswerLoadinging = false
          this.answeredLoadinging = false
        } else if (!res.ErrorCode && param.post_num === -99) {
          this.wxcLoading = false
          if (!offset) {
            this.answerList2 = res
          } else {
            if (res.length) {
              this.answerList2 = this.answerList2.concat(res)
            } else {
              nativeUtil.alert('没有更多了')
            }
          }
          this.toAnswerRefreshing = false
          this.answeredRefreshing = false
          this.toAnswerLoadinging = false
          this.answeredLoadinging = false
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
      }
      // 获取用户信息
      const res = await nativeUtil.getUserInfo()
      if (res) {
        this.access_token = res.userTokenKey
        const result = await nativeUtil.getSystemInfo()
        if (result) {
          this.custom_appid = result.custom_appid
          this.custom_appkey = result.custom_appkey
          if (result.statusbar_height) {
            this.statusbar_height = result.statusbar_height
          }
          this.getMyAnswerList(0, 0)
        }
      }
    }
  },
  computed: {
  },
  created () {
    this.getConfig()
  },
  mounted () {
    this.indexPic = this.getQuery().indexPicSrc
    this.forum_id = this.getQuery().forum_id
    this.title = this.getQuery().title
  }
}
</script>

<style scoped lang="scss">
.expert-warp{
    width: 750px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.ipx{
    margin-top: 40px;
}
.head{
    height: 110px;
    padding-bottom: 25px;
    flex-direction: row;
    padding-top: 40px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color:#F0F0F0;
    justify-content: center;
}
.question-icon{
    width: 50px;
    height: 50px;
    margin-right: 10px;
}
.head-title{
    width: 750px;
    text-align: center;
    font-size: 36px;
}
.list-inner{
    width: 750px;
    flex: 1;
}
.back-icon{
    width: 20px;
    height: 38px;
    position: absolute;
    left: 24px;
    top: 48px;
}
.share-icon{
    width: 20px;
    height: 5px;
    position: absolute;
    right: 24px;
    top: 80px;
}
.loading-box{
  width: 750px;
  height: 150px;
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
.question-content{
    flex: 1;
    margin-top: 10px;
    background-color: #FFFFFF;
}

.question-nav{
    flex-direction: row;
    height: 88px;
    border-bottom-width: 1px;
    border-bottom-style: solod;
    border-bottom-color: #F2F2F2;
}
.question-nav-text-box{
    width: 375px;
    height: 88px;
    position: relative;
}
.question-nav-left{
    border-right-width: 1px;
    border-right-style: solod;
    border-right-color: #F2F2F2;
}
.question-nav-text{
    font-size: 28px;
    color:#333333;
    height: 88px;
    line-height: 88px;
    text-align: center;
}
.question-nav-text-active{
    font-size: 30px;
    color: #E02929;
}
.question-nav-bottom{
    background-color: #E44328;
    width: 40px;
    height: 4px;
    position: absolute;
    left: 168px;
    bottom: 4px;
}
.to-answer{
    width: 750px;
    flex:1;
}
.answered{
    width: 750px;
    flex:1;
}
.slide-content{
    flex: 1;
}
.answerlist{
    width: 750px;
    height: 150px;
}
</style>
