<template>
     <div class="dongtai-wrapper">
        <div class="fix">
                <div class="dynamic-nav" ref="navFixBox">
                <text class="dynamic-nav-title" v-for="(item,idx) in columnList" :key="idx"
                :class="[activeNav === idx ? 'dynamic-nav-title-active':'']" @click="getHomeList(idx, item.id, order_field, order_type, 0)">{{item.name}}</text>
            </div>
            <div class="dynamic-sort">
                <div class="dynamic-sort-time" @click="changeSortTime()">
                    <text class="dynamic-sort-time-text">时间</text>
                    <image v-if="!sortTime" :src="getLocalImgUrl('ask_shang.png')" class="sort-img"></image>
                    <image v-else :src="getLocalImgUrl('ask_xia_active.png')"  class="sort-img"></image>
                </div>
                <div class="dynamic-sort-reward"  @click="changeSortReward()">
                    <text class="dynamic-sort-time-reward">悬赏额</text>
                    <image v-if="!sortReward" :src="getLocalImgUrl('ask_shang.png')" class="sort-img"></image>
                    <image v-else :src="getLocalImgUrl('ask_xia_active.png')"  class="sort-img"></image>
                </div>
            </div>
        </div>
            <!-- 动态列表 -->
        <list class="dynamic" v-if="homeList.length">
            <refresh  @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <refresh-style></refresh-style>
            </refresh>
            <cell  class="list-content" v-for="(item,idx) in homeList" :key="idx" @click="goDetail(item.id)">
                <list1 :data='item' @praise='praise'></list1>
            </cell>
            <loading class="loading-box" @loading="homeOnloading" :display="homeLoadinging ? 'show' : 'hide'">
                <loading-indicator v-if='homeLoadinging' class="indicator"></loading-indicator>
                <text v-if='homeLoadinging' class="loading-text">加载中...</text>
            </loading>
        </list>
        <no-date1 v-else></no-date1>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import List1 from '../../components/wenda/List1.vue'
import RefreshStyle from '../../components/common/RefreshStyle'
import NoDate1 from '../../components/wenda/NoDate1.vue'
import { WxcLoading } from 'weex-ui'
// let dom = weex.requireModule('dom')
// let storage = weex.requireModule('storage')
export default {
  props: ['access_token', 'login', 'custom_appid', 'custom_appkey', 'is_hot', 'homeList', 'columnList'],
  name: 'DongTai',
  components: {
    List1,
    RefreshStyle,
    NoDate1,
    WxcLoading
  },
  data () {
    return {
      currentIndex: 0,
      refreshing: false,
      homeLoadinging: false,
      navActive: 0,
      sortTime: Boolean,
      sortReward: Boolean,
      slideIndex: 0,
      navId: '',
      order_field: '',
      order_type: '',
      offset: 0,
      count: 20,
      loadingShow: true
    }
  },
  methods: {
    getStateToken () {
      nativeUtil.getLoginStatus().then(res => {
        if (res === '0') {
          nativeUtil.goLogin()
        } else {
          nativeUtil.getUserInfo().then(res => {
            this.access_token = res.userTokenKey
          })
        }
      })
    },
    // 动态下拉刷新
    onrefresh () {
      this.refreshing = true
      this.offset = 0
      this.getHomeList(this.navActive, this.navId, this.order_field, this.order_type, this.offset)
    },
    // 动态上拉加载更多
    homeOnloading () {
      this.offset += 20
      this.homeLoadinging = true
      this.getHomeList(this.navActive, this.navId, this.order_field, this.order_type, this.offset)
    },
    // 动态列表时间排序
    changeSortTime () {
      this.offset = 0
      this.sortTime = !this.sortTime
      this.sortReward ? this.sortReward = !this.sortReward : this.sortReward = this.sortReward
      this.order_field = 'create_time'
      this.order_type === 'DESC' ? this.order_type = 'ASC' : this.order_type = 'DESC'
      this.getHomeList(this.navActive, this.navId, this.order_field, this.order_type, this.offset)
    },
    // 动态列表悬赏额排序
    changeSortReward () {
      this.offset = 0
      this.sortReward = !this.sortReward
      this.sortTime ? this.sortTime = !this.sortTime : this.sortTime = this.sortTime
      this.order_field = 'reward_points'
      this.order_type === 'DESC' ? this.order_type = 'ASC' : this.order_type = 'DESC'
      this.getHomeList(this.navActive, this.navId, this.order_field, this.order_type, this.offset)
    },
    // 动态列表详情
    goDetail (id) {
      this.jumpWithParams('ModWeexStyle5WendaDetail', {id})
    },
    // 热门 动态首页列表
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
      if (this.is_hot === '1') {
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
    // 点赞
    praise (data) {
      nativeUtil.getLoginStatus().then(res => {
        if (res === '0') {
          nativeUtil.goLogin()
        } else {
          nativeUtil.getUserInfo().then(res => {
            this.access_token = res.userTokenKey
            let param = {
              m: 'Apibbs',
              c: 'post',
              a: 'praise',
              custom_appid: this.custom_appid,
              custom_appkey: this.custom_appkey,
              access_token: this.access_token,
              post_id: data.id
            }
            //   取消点赞
            if (data.type === 'delPraise') {
              param.op = 'del'
            }
            this.$httpRequest(this.api.home_column, param, 'post').then(res => {
              if (!res.ErrorCode) {
                if (data.type === 'delPraise') {
                  nativeUtil.alert('取消点赞成功')
                } else {
                  nativeUtil.alert('点赞成功')
                }
                this.getHomeList(0, 0, this.order_field, this.order_type, 0)
              } else {
                nativeUtil.alert(res.ErrorText)
              }
            }, (e) => {
              console.log(e)
            })
          })
        }
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
      this.getColumnList()
      this.order_field = 'create_time'
      this.order_type = 'DESC'
      this.getHomeList(0, 0, this.order_field, this.order_type, 0)
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
.dongtai-wrapper{
    width: 750px;
    position: absolute;
    top:0;
    bottom:0;
    background-color: #F8F8F8;
}
.home-flex{
    flex: 1;
}
.list-wrapper{
    flex: 1;
    width: 750px;
}
.dynamic-nav{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #FFF4ED;
    width: 750px;
}
.list-content{
    width: 750px;
}
.dynamic-nav-title{
    height: 50px;
    font-size: 28px;
    color: #333333;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 30px;
    padding-right: 30px;
}
.dynamic-nav-title-active{
    background-color: #F7402E;
    color: #FFFFFF;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
.dynamic-sort{
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 50px;
    padding-right: 50px;
    border-bottom-width: 1px;
    border-bottom-style:solid;
    border-bottom-color: #DADADA;
    background-color: #FFFFFF;
}
.dynamic-sort-time{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 80px;
}
.dynamic-sort-reward{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.dynamic-sort-time-text{
    color: #333333;
    font-size: 24px;
}
.dynamic-sort-time-reward{
    color: #333333;
    font-size: 24px;
}
.sort-img{
    width: 15px;
    height: 10px;
    margin-left: 15px;
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
</style>
