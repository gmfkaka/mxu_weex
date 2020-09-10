<template>
    <div class="question">
   <!-- 板块版主专家可见 -->
        <div class="question-top" v-for="(item,key) in managerPosts" :key="key"  v-if="login">
            <div class="question-top-left">
                <image v-if='item.indexpic' :src="item.indexpic.host+item.indexpic.dir+item.indexpic.filepath+item.indexpic.filename" class="question-icon"></image>
                <text class="question-top-text">{{item.title}}</text>
            </div>
            <div class="question-top-right" @click="expertDetail(item.indexpic,item.forum_id,item.title)">
                <text class="question-top-text">还有</text><text class="question-num-text">{{item.total}}</text><text class="question-top-text">个问题在等你回答</text>
                <image :src="getLocalImgUrl('ask_godetail.png')" class="question-detail"></image>
            </div>
        </div>
            <!-- 我的问题列表 -->
        <div  class="question-content"  v-if="login==='1'">
            <div class="question-nav">
                <div class="question-nav-text-box question-nav-left" @click='changeSlide(0)'>
                    <text class="question-nav-text" :class="[slideIndex === 0 ? 'question-nav-text-active' : '']">待回答</text>
                </div>
                <div class="question-nav-text-box" @click='changeSlide(1)'>
                    <text class="question-nav-text" :class="[slideIndex === 1 ? 'question-nav-text-active' : '']">已回答</text>
                </div>
            </div>
            <slider forbid-slide-animation="false"  bubble="false"
            auto-play="false" infinite="false" @change="slideChange" :index="slideIndex" class="slide-content">
                <list class="to-answer">
                    <refresh @refresh="toAnswerRefresh" v-if='questionList.length' :display="toAnswerRefreshing ? 'show' : 'hide'">
                        <refresh-style></refresh-style>
                    </refresh>
                    <cell class="question-list" v-if='questionList.length' v-for="(item,idx) in questionList" :key="idx" @click="goDetail(item.id)">
                        <list3 :data='item'></list3>
                    </cell>
                    <cell class="no-date-box" v-if='!questionList.length'>
                        <no-date1></no-date1>
                    </cell>
                    <loading class="loading-box" v-if='questionList.length' @loading="toAnswerLoading" :display="toAnswerLoadinging ? 'show' : 'hide'">
                        <loading-indicator  v-if="toAnswerLoadinging" class="indicator"></loading-indicator>
                        <text v-if="toAnswerLoadinging" class="loading-text">加载中...</text>
                    </loading>
                </list>
                <list class="answered">
                    <refresh @refresh="answeredRefresh" v-if='questionList2.length'  :display="answeredRefreshing ? 'show' : 'hide'">
                        <refresh-style></refresh-style>
                    </refresh>
                    <cell  class="question-list"  v-if='questionList2.length' v-for="(item,idx) in questionList2" :key="idx" @click="goDetail(item.id)">
                        <list3 :data='item'></list3>
                    </cell>
                    <cell class="no-date-box" v-if='!questionList2.length'>
                        <no-date1></no-date1>
                    </cell>
                    <loading class="loading-box" @loading="answeredloading" v-if='questionList2.length'  :display="answeredLoadinging ? 'show' : 'hide'">
                        <loading-indicator v-if="answeredLoadinging" class="indicator"></loading-indicator>
                        <text v-if="answeredLoadinging" class="loading-text">加载中...</text>
                    </loading>
                </list>
            </slider>
        </div>
        <div v-if="login!=='1'" class="gologin">
            <image :src="getLocalImgUrl('ask_gologin.png')" class="go-login-img"></image>
            <text class="go-login-text" @click="goLogin">去登陆</text>
        </div>
    </div>
</template>

<script>
import List3 from '../../components/wenda/List3.vue'
import { nativeUtil } from '../../lib/nativeUtils'
import RefreshStyle from '../../components/common/RefreshStyle'
import NoDate1 from '../../components/wenda/NoDate1.vue'
export default {
  props: ['access_token', 'login', 'custom_appid', 'custom_appkey', 'questionList', 'managerPosts'],
  name: 'MyQuestion',
  components: {
    List3,
    nativeUtil,
    RefreshStyle,
    NoDate1
  },
  data () {
    return {
      toAnswerRefreshing: false,
      answeredRefreshing: false,
      toAnswerLoadinging: false,
      answeredLoadinging: false,
      slideIndex: 0,
      offset: 0,
      questionList2: []
    }
  },
  methods: {
    goLogin () {
      nativeUtil.goLogin().then(res => {
        if (res === '1') {
          nativeUtil.getUserInfo().then(res => {
            this.access_token = res.userTokenKey
            this.login = '1'
            this.getMyQuestionList(0, 0)
            this.getManagerPosts()
          })
        }
      })
    },
    // 列表切换
    changeSlide (index) {
      this.slideIndex = index
      this.getMyQuestionList(this.slideIndex, 0)
    },
    slideChange (event) {
      this.slideIndex = event.index
      this.getMyQuestionList(this.slideIndex, 0)
    },
    // 我的问题 待回答下拉刷新
    toAnswerRefresh () {
      this.toAnswerRefreshing = true
      this.offset = 0
      this.getMyQuestionList(0, this.offset)
    },
    // 我的问题 已回答下拉刷新
    answeredRefresh () {
      this.answeredRefreshing = true
      this.offset = 0
      this.getMyQuestionList(1, this.offset)
    },
    // 我的问题 待回答加载更多
    toAnswerLoading () {
      this.offset += 20
      this.toAnswerLoadinging = true
      this.getMyQuestionList(0, this.offset)
    },
    // 我的问题 已回答加载更多
    answeredloading () {
      this.offset += 20
      this.answeredLoadinging = true
      this.getMyQuestionList(1, this.offset)
    },
    expertDetail (indexpic, id, title) {
      let indexPicSrc
      if (indexpic) {
        indexPicSrc = `${indexpic.host}${indexpic.dir}${indexpic.filepath}${indexpic.filename}`
      }
      this.jumpWithParams('ModWeexStyle5WendaExpertDetail', {indexPicSrc, id, title})
    },
    goDetail (id) {
      this.jumpWithParams('ModWeexStyle5WendaDetail', {id})
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
        if (!res.ErrorCode && param.post_num === 0) {
          if (!offset) {
            this.questionList = res
          } else {
            if (res.length) {
              this.questionList = this.questionList.concat(res)
            } else {
              nativeUtil.alert('没有更多了')
            }
          }
          this.toAnswerRefreshing = false
          this.answeredRefreshing = false
          this.toAnswerLoadinging = false
          this.answeredLoadinging = false
        } else if (!res.ErrorCode && param.post_num === -99) {
          if (!offset) {
            this.questionList2 = res
          } else {
            if (res.length) {
              this.questionList2 = this.questionList2.concat(res)
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
        this.getMyQuestionList(0, 0)
        this.getManagerPosts()
      }
    }
  },
  computed: {
  },
  created () {
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">
.question{
    flex:1
}
.question-top{
    width: 750px;
    height: 80px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 50px;
    padding-right: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #FFFFFF;
    border-bottom-width: 1px;
    border-bottom-style:solid;
    border-bottom-color: #F8F8F8;
}
.question-top-text{
    font-size: 28px;
    color: #333333;
}
.question-top-left{
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.question-icon{
    width: 50px;
    height: 50px;
    margin-right: 10px;
}
.question-top-right{
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.question-num-text{
    color: #F7402E;
    font-size: 24px;
}
.question-detail{
    width: 15px;
    height: 25px;
    margin-left: 15px;
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
.question-list{
    width: 750px;
    height: 150px;
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
.no-date-box{
    width: 750px;
    flex: 1
}
</style>
