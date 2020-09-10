<template>
     <div class="home-wrapper" :style="{paddingBottom:tabBarHeight +'px'}">
       <!-- 头部 -->
       <nav :is-back="isRoot!='1'"></nav>
       <!-- 轮播图 -->
       <w-slide :slider-list="slideList"></w-slide>
       <!-- 栏目 start-->
       <div class="columns-box">
         <scroller class="column-wrapperr" scroll-direction="horizontal" show-scrollbar=false>
          <div class="column-item" v-for="(item,index) in columnList"
              :key="item.id">
            <text class="column-name"
              :class="[currentIndex === index ? 'column-active':'',index===columnList.length-1?'mr0':'']"
              @click='changeSlide(index)'
              >{{item.title}}
            </text>
          </div>
        </scroller>
       </div>

      <!-- 栏目 end-->

       <!-- 主体部分 start-->
       <div class="slider-list"  v-if="dataList.length"
        auto-play="false" infinite="false">
          <list class="slider-list-box"  show-scrollbar="false">
              <refresh @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'" class="refresh">
                  <refresh-style></refresh-style>
              </refresh>
              <!-- 暂无数据 -->
              <!-- 列表start -->
              <cell class="list-box" v-for="(item,index) in dataList" :key="index">
                  <!-- 头部信息 -->
                  <list-header :item ="item"></list-header>
                  <!-- 列表主体 -->
                  <div class="list-main">
                      <!-- 标题 -->
                      <div class="main-title-box" @click="jump(item)">
                        <!-- 热门暂时注释功能 -->
                        <div class="hot-box" v-if="item.is_hot ==1">
                            <text class="hot-box-text">热</text>
                        </div>
                        <text class="main-title">{{item.brief}}</text>
                      </div>
                      <!-- 图片区域 -->
                      <div class="main-img-box" v-if="item.pics && item.pics.length" @click="jump(item)">
                        <imgList1 :data="item.pics" :num="item.pic_num" v-if="item.pics.length>2"></imgList1>
                        <imgList2 :data="item.pics" :num="item.pic_num"  v-if="item.pics.length==2"></imgList2>
                        <imgList3 :data="item.pics" :num="item.pic_num"  v-if="item.pics.length==1"></imgList3>
                      </div>
                      <!-- 定位区域 -->
                      <div class="address-box" v-if="item.region" @click="jump(item)">
                          <image resize="contain" :src="getLocalImgUrl('adr-fh2x.png')" class="address-img"></image>
                          <text class="address-box-title">{{item.region}}</text>
                      </div>
                  </div>
                  <!-- 报料状态 -->
                  <div class="list-state">
                      <!-- 虚线 -->
                      <div class="list-state-dotted"></div>
                      <div class="list-state-content">
                        <!-- 报料状态 -->
                          <div class="list-state-item">
                              <div class="state-img-box">
                                <image resize="contain" :src="getLocalImgUrl('circle-grey2x.png')" v-if="true" class="state-circle"></image>
                                <!-- <image resize="contain" :src="getLocalImgUrl('circle-blue2x.png')" v-if="item.status==1" class="state-circle-active"></image> -->
                              </div>
                              <!-- 报料肯定会进入分配环节，所以状态报料不存在高亮情况 -->
                              <div class="state-text-box">
                                <text class="state-normal-text">报料</text>
                              </div>
                              <div class="state-time-box">
                                <text class="state-time">{{format(item.create_time*1000,'.')}}</text>
                              </div>

                          </div>
                          <!-- 受理状态 -->
                          <div class="list-state-item">
                              <div class="state-img-box">
                                <image resize="contain" :src="getLocalImgUrl('circle-grey2x.png')" v-if="item.status ==5 || (item.status==4 && item.reply_time)" class="state-circle"></image>
                                <image resize="contain" :src="getLocalImgUrl('circle-blue2x.png')" v-if="item.status==3 || (item.status==4 && !item.reply_time)" class="state-circle-active"></image>
                              </div>

                              <div class="state-text-box">
                                <!-- status为4代表已有单位受理 reply_time判断是否受理单位回复 is_accept为2 有转字-->
                                  <text class="state-active-text" v-if="(item.status==3 ||(item.status==4 && !item.reply_time))&&item.is_accept==2">转{{item.node_name?item.node_name:''}}受理</text>
                                  <text class="state-active-text" v-if="(item.status==3 ||(item.status==4 && !item.reply_time))&&item.is_accept==1">{{item.node_name?item.node_name:''}}受理</text>
                                  <text class="state-normal-text" v-if="(item.status ==5 || (item.status==4 && item.reply_time))&&item.is_accept==2">转{{item.node_name?item.node_name:''}}受理</text>
                                  <text class="state-normal-text" v-if="(item.status ==5 || (item.status==4 && item.reply_time))&&item.is_accept==1">{{item.node_name?item.node_name:''}}受理</text>
                              </div>
                              <div class="state-time-box">
                                <text class="state-time">{{item.assign_time?format(item.assign_time*1000,'.'):''}}</text>
                              </div>

                          </div>
                          <!-- 回复状态 -->
                          <div class="list-state-item">
                              <div class="state-img-box">
                                <image resize="contain" :src="getLocalImgUrl('circle-blue2x.png')" v-if="(item.status==4 && item.reply_time) || item.status==5" class="state-circle-active"></image>
                                <image resize="contain" :src="getLocalImgUrl('circle-grey2x.png')"  v-else class="state-circle"></image>

                              </div>

                              <div class="state-text-box">
                                <text class="state-active-text" v-if="(item.status==4 && item.reply_time) || item.status==5">官方回复</text>
                                <text class="state-normal-text" v-else>官方回复</text>
                              </div>
                              <div class="state-time-box">
                                <text class="state-time">{{item.reply_time?format(item.reply_time*1000,'.'):''}}</text>
                              </div>

                          </div>
                      </div>
                  </div>
                  <!-- 点赞 -->
                  <div class="list-praise">
                    <div class="list-praise-box">
                      <!-- 已点赞 -->
                      <div class="praise-box praise-active-yellow"  v-if="item.is_praise==1" @click="goCancel(item,1)">
                          <image resize="contain" :src="getLocalImgUrl('zan-yellow.png')"
                             class="praise-img"></image>

                          <text class="praise-num praise-active">{{item.praise_num}}</text>

                      </div>
                      <!-- 未点赞 -->
                      <div class="praise-box"  v-if="item.is_praise==2" @click="goPraise(item,1)">
                          <image resize="contain" :src="getLocalImgUrl('zan-grey2x.png')"
                             class="praise-img"></image>

                          <text class="praise-num">{{item.praise_num}}</text>

                      </div>
                      <!-- 已踩 -->
                      <div class="praise-box praise-active-dark" v-if="item.is_review==1" @click="goCancel(item,2)">
                          <image resize="contain" :src="getLocalImgUrl('cai-darkgrey2x.png')"
                             class="praise-img"></image>

                          <text class="praise-num praise-dark-text">{{item.bad_review_num}}</text>

                      </div>
                      <!-- 未踩 -->
                      <div class="praise-box" v-if="item.is_review==2" @click="goPraise(item,2)">
                          <image resize="contain" :src="getLocalImgUrl('cai-grey.png')"
                             class="praise-img"></image>
                          <text class="praise-num">{{item.bad_review_num}}</text>

                      </div>
                    </div>

                  </div>
                  <!-- 底部间隙分割线 -->
                  <div class="bottom-line" v-if="index!==dataList.length-1"></div>
              </cell>
              <!-- 列表end -->
              <!-- 加载更多 start -->
              <loading v-if="hasMore && !dataLoading && dataList.length" class="loading-box" @loading="onloading" :display="loading ? 'show' : 'hide'">
                <loading-indicator class="indicator"></loading-indicator>
                <text class="loading-text">加载中</text>
              </loading>
              <cell v-if="!hasMore && !dataLoading && dataList.length">
                  <text class="no-more-data">没有更多了</text>
              </cell>
          </list>
        </div>
        <no-date1 v-if="!dataList.length && !refreshing && !dataLoading" :height="'400px'"></no-date1>
         <!-- 主体部分 end-->
         <show-loading
              :show="dataLoading"
              type="custom"
              m-url="loading.gif"
              m-width="120"
              m-height="120"
              m-backgroundcolor="#f2f6fa"
          >
          </show-loading>
         <!-- 我要爆料 -->
        <div class="fix-baoliao" @click="jumpnew()" :style="{bottom:33 + tabBarHeight +'px'}">
          <image resize="contain" :src="getLocalImgUrl('fhbaoliao2x.png')" class="fix-baoliao-img"></image>
        </div>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
// const picker = weex.requireModule('picker')
import nav from '../../components/weexstyle16/nav'
import imgList1 from '../../components/weexstyle16/imgList1'
import imgList2 from '../../components/weexstyle16/imgList2'
import imgList3 from '../../components/weexstyle16/imgList3'
import listHeader from '../../components/weexstyle16/listHeader'
import RefreshStyle from '../../components/common/RefreshStyle'
import wSlide from '../../components/weexstyle16/slide'
import NoDate1 from '../../components/weexstyle16/NoDate1.vue'
import { WxcLoading } from 'weex-ui'
import ShowLoading from '../../components/common/ShowLoading'
const platform = weex.config.env.platform.toLowerCase()
export default {
  name: 'ModWeexStyle16',
  data () {
    return {
      config: {},
      custom_appid: '',
      custom_appkey: '',
      access_token: '',
      slideList: [],
      columnList: [{title: '热点', id: null}],
      dataList: [],
      dataLoading: true,
      slideLoad: true,
      currentIndex: 0,
      listRefresh: false,
      refreshing: false,
      hasMore: true,
      loading: false,
      pageOption: {
        page: 1,
        size: 10
      },
      param: {

      },
      tabBarHeight: 0,
      isRoot: 0, // 是否从主模块进入
      clickChange: 0
    }
  },
  components: {
    nav,
    wSlide,
    WxcLoading,
    RefreshStyle,
    imgList1,
    imgList2,
    imgList3,
    NoDate1,
    listHeader,
    ShowLoading
  },
  methods: {
    // 切换栏目
    changeSlide (index) {
      this.currentIndex = index
      this.clickChange = 1
      this.dataLoading = true
      this.dataList = []
      this.pageOption.page = 1
      this.getListData()
    },
    // 滑动列表，切换栏目
    slideChange (event, xix) {
      this.dataLoading = true
      this.dataList = []
      this.pageOption.page = 1
      this.getListData()
    },
    // 获取数据
    getData () {
      this.getSlideData()
      this.getColData()
    },
    // 获取用户信息
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'id': '11984',
          'uniqueid': 'weexreport',
          'type': '1',
          'name': '新时代报料',
          'ename': 'weexreport',
          'custom_name': '新时代报料',
          'normal_pic': '',
          'press_pic': '',
          'url': '',
          'is_master': '0',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '1',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle16',
          'android_min': null,
          'android_max': null,
          'ios_min': null,
          'ios_max': null,
          'ui_android_depends': '',
          'attrs': [ ],
          'api': {
            'content_detail': 'content_detail',
            'dept_list': 'dept_list',
            'detail_comment_list': 'detail_comment_list',
            'ebook_detail': 'ebook_detail',
            'ebook_list': 'ebook_list',
            'home_column': 'http://mobile.fhtv.net.cn/fhtw/news_slide.php',
            'home_list': 'http://help-api.cloud.hoge.cn/index.php',
            // 'home_list': 'http://helpsc.cloud.hoge.cn/index.php',
            'home_list_mine': 'home_list_mine',
            'my_listen': 'my_listen',
            'my_look': 'my_look',
            'my_speak': 'my_speak',
            'my_write': 'my_write',
            'send_content': 'send_content'
          }
        }
        this.api = this.config.api
        this.getData()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'weexreport'
        }
        // 获取api
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        // 获取appid/appkey
        const result = await nativeUtil.getSystemInfo()
        if (result) {
          this.custom_appid = result.custom_appid
          this.custom_appkey = result.custom_appkey
          this.isRoot = result.isRoot
          if (parseInt(this.isRoot, 10) === 1) {
            this.tabBarHeight = (750 / parseInt(result.screenWidth, 10)) * parseInt(result.tabBarHeight, 10)
          }

          this.getData()
        }
      }
    },
    // 获取轮播图/大图信息
    getSlideData () {
      this.slideLoad = true
      let param = {
        site_id: 1,
        weight: 90,
        client_type: 2,
        count: 20,
        except_weight: 90,
        column_id: 2,
        slide: 1,
        num: 5
      }
      if (this.getPlatform() === 'web') {
        param.appid = 6
        param.appkey = '9VV4DbBUrlPTt2yXb9mPR4OQWRdWAapz'
      } else {
        if (platform === 'android') {
          param.appid = 7
          param.appkey = 'IxFqNeQvNJyoNhsMTm1000FXYddxRBmp'
        } else if (platform === 'ios') {
          param.appid = 6
          param.appkey = '9VV4DbBUrlPTt2yXb9mPR4OQWRdWAapz'
        }
      }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        this.slideList = res
        this.slideLoad = false
      }, (e) => {
        this.slideLoad = false
        console.log(e)
      })
    },
    // 获取栏目数据
    getColData () {
      this.dataLoading = true
      let param = {
        m: 'Apihelp',
        c: 'fact',
        a: 'factSort'
      }
      if (this.getPlatform() === 'web') {
        param = Object.assign(param, this.param)
      } else {
        param.custom_appid = this.custom_appid
        param.custom_appkey = this.custom_appkey
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (res.code === 0) {
          this.columnList = this.columnList.concat(res.data)
          this.getListData()
        } else {
          nativeUtil.alert(res.message)
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 获取列表数据 鉴权获取点赞状态
    getListData () {
      let param = {
        page: this.pageOption.page,
        size: this.pageOption.size,
        m: 'Apihelp',
        c: 'fact',
        a: 'factList',
        sort_id: this.columnList[this.currentIndex].id
      }
      this.hasMore = true
      if (this.getPlatform() === 'web') {
        param = Object.assign(param, this.param)
        this.$httpRequest(this.api.home_list, param, 'get').then(res => {
          if (res.code === 0) {
            const datas = res.data.help_list
            datas.forEach((v) => {
              v.pics = []
              if (v.pic) {
                v.pic.forEach((vv) => {
                  if (vv.hasOwnProperty('imgwidth') || vv.img) {
                    v.pics.push(vv)
                  }
                })
              }
            })
            if (this.pageOption.page === 1) {
              this.dataList = datas
            } else {
              this.dataList = this.dataList.concat(datas)
              if (datas.length && parseInt(this.dataList.length, 10) < parseInt(res.data.total, 10)) {
                this.hasMore = true
              } else {
                this.hasMore = false
              }
            }
            this.dataLoading = false
            this.refreshing = false
            this.loading = false
          } else {
            nativeUtil.alert(res.message)
          }
        }, (e) => {
          console.log(e)
        })
      } else {
        param.custom_appid = this.custom_appid
        param.custom_appid = this.custom_appid
        param.custom_appkey = this.custom_appkey
        nativeUtil.getUserInfo().then(res => {
          if (res && res.userTokenKey) {
            this.access_token = res.userTokenKey
            param.access_token = this.access_token
          }
          this.$httpRequest(this.api.home_list, param, 'get').then(res => {
            if (res.code === 0) {
              const datas = res.data.help_list
              datas.forEach((v) => {
                v.pics = []
                if (v.pic) {
                  v.pic.forEach((vv) => {
                    if (vv.hasOwnProperty('imgwidth') || vv.img) {
                      v.pics.push(vv)
                    }
                  })
                }
              })

              if (this.pageOption.page === 1) {
                this.dataList = datas
              } else {
                this.dataList = this.dataList.concat(datas)
                if (datas.length && parseInt(this.dataList.length, 10) < parseInt(res.data.total, 10)) {
                  this.hasMore = true
                } else {
                  this.hasMore = false
                }
              }
              this.dataLoading = false
              this.refreshing = false
              this.loading = false
            } else {
              nativeUtil.alert(res.message)
            }
          }, (e) => {
            console.log(e)
          })
        })
      }
    },
    // 下拉刷新
    onrefresh () {
      this.pageOption.page = 1
      this.refreshing = true
      this.getListData()
    },
    // 加载更多
    onloading () {
      this.loading = true
      if (!this.hasMore) {
        this.loading = false
        return
      }
      this.pageOption.page += 1
      this.getListData()
    },
    // 点赞踩
    goPraise (item, type) {
      // 踩和赞只能一个
      if (type === 1 && item.is_review === 1) {
        return
      } else if (type === 2 && item.is_praise === 1) {
        return
      }
      // web 不验证登录
      if (this.getPlatform() === 'web') {
        let param = {
          m: 'Apihelp',
          c: 'help',
          a: 'praise',
          help_id: item.id,
          type: type
        }
        param = Object.assign(param, this.param)
        this.$httpRequest(this.api.home_list, param, 'post').then(res => {
          if (res.code === 0) {
            if (type === 1) {
              item.is_praise = 1
              item.praise_num += 1
            } else {
              item.is_review = 1
              item.bad_review_num += 1
            }
          } else {
            nativeUtil.alert('操作失败')
          }
        }, (e) => {
          console.log(e)
        })
        return
      }

      nativeUtil.getLoginStatus().then(res => {
        if (res === '0') {
          nativeUtil.alert('请登录')
          nativeUtil.goLogin()
        } else {
          nativeUtil.getUserInfo().then(res => {
            this.access_token = res.userTokenKey
            let param = {
              m: 'Apihelp',
              c: 'help',
              a: 'praise',
              access_token: this.access_token,
              help_id: item.id,
              type: type,
              custom_appid: this.custom_appid,
              custom_appkey: this.custom_appkey
            }
            this.$httpRequest(this.api.home_list, param, 'post').then(res => {
              if (res.code === 0) {
                if (type === 1) {
                  item.is_praise = 1
                  item.praise_num += 1
                } else {
                  item.is_review = 1
                  item.bad_review_num += 1
                }
              } else {
                nativeUtil.alert(res.message)
              }
            }, (e) => {
              console.log(e)
            })
          })
        }
      })
    },
    // 取消点赞踩
    goCancel (item, type) {
      // web 不验证登录
      if (this.getPlatform() === 'web') {
        let param = {
          m: 'Apihelp',
          c: 'help',
          a: 'cancel',
          help_id: item.id,
          type: type
        }
        param = Object.assign(param, this.param)
        this.$httpRequest(this.api.home_list, param, 'post').then(res => {
          if (res.code === 0) {
            if (type === 1) {
              item.praise_num -= 1
              item.is_praise = 2
            } else {
              item.bad_review_num -= 1
              item.is_review = 2
            }
          } else {
            nativeUtil.alert('操作失败')
          }
        }, (e) => {
          console.log(e)
        })
        return
      }

      nativeUtil.getLoginStatus().then(res => {
        if (res === '0') {
          nativeUtil.alert('请登录')
          nativeUtil.goLogin()
        } else {
          nativeUtil.getUserInfo().then(res => {
            this.access_token = res.userTokenKey
            let param = {
              m: 'Apihelp',
              c: 'help',
              a: 'cancel',
              access_token: this.access_token,
              help_id: item.id,
              type: type,
              custom_appid: this.custom_appid,
              custom_appkey: this.custom_appkey

            }
            this.$httpRequest(this.api.home_list, param, 'post').then(res => {
              if (res.code === 0) {
                if (type === 1) {
                  item.praise_num -= 1
                  item.is_praise = 2
                } else {
                  item.bad_review_num -= 1
                  item.is_review = 2
                }
              } else {
                nativeUtil.alert(res.message)
              }
            }, (e) => {
              console.log(e)
            })
          })
        }
      })
    },
    jump (item) {
      this.jumpWithParams('ModWeexStyle16Detail', {id: item.id})
    },
    // 新增报料
    jumpnew () {
      if (this.getPlatform() === 'web') {
        this.jumpWithParams('ModWeexStyle16New')
      } else {
        nativeUtil.getLoginStatus().then(res => {
          if (res === '0') {
            nativeUtil.alert('请登录')
            setTimeout(() => {
              nativeUtil.goLogin()
            }, 200)
          } else {
            this.jumpWithParams('ModWeexStyle16New')
          }
        })
      }
    }
  },

  created () {
    if (this.getPlatform() === 'web') {
      this.param.custom_appid = '154'
      this.param.custom_appkey = 'ihJhUxistGOuuJMT6dCveUyqupietbsB'
      this.param.access_token = '6fcb8fe9100d45b34fa0ea72767ea740'
    }
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">

.home-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    background-color: #fff;
}
//我要爆料
.fix-baoliao{
  position: fixed;
  right:24px;
}
.fix-baoliao-img{
  width: 143px;
  height:125px;
}
//栏目
.columns-box{
  height:94px;
}
.column-wrapperr{
  margin-top:6px;
  background-color:#ffffff;
  height:94px;
  flex-direction: row;
  padding-right:20px;
  padding-left:20px;

}
.column-item{
  height:94px;
  margin-right:46px;
  flex-direction: row;
  align-items: center;
  border-bottom-style:solid;
  border-bottom-width:5px;
  border-bottom-color:#fff;
}
.column-name{
  height:89px;
  color:#666666;
  font-size: 28px;
  justify-content: center;
  line-height:89px;
}
.mr0{
  margin-right:0 !important;
}
.column-active{
  color:#00AFFE;
  font-size: 34px;
  border-bottom-style:solid;
  border-bottom-width:5px;
  border-bottom-color: #00AFFE;
  font-weight:500;
}
//列表架子
.slider-list{
  width: 750px;
  flex:1;
}
.slider-list-box{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.refresh{
  height:80px;
}
//列表
.list-box{
  border-top-style:solid;
  border-top-width:1px;
  border-top-color:#F0F0F0;
  width: 750px;
}

//列表主体
.list-main{
  padding-left:24px;
  padding-right: 24px;
  width: 750px;
}
.main-title-box{
  padding-top:20px;
  padding-bottom:20px;
  width: 702px;
  flex-direction: row;
  align-items: center;
}
.hot-box{
  margin-right:15px;
  width: 38px;
  height:38px;
  border-bottom-left-radius:5px;
  border-bottom-right-radius:5px;
  border-top-left-radius:5px;
  border-top-right-radius:5px;
  background-color:#FA6400;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.hot-box-text{
  color:white;
  font-size: 24px;
}
.main-title{
  lines:2;
  flex:1;
  text-overflow:ellipsis;
  color:#222222;
  font-size:30px;
}
//封面图
.main-img-box{
  padding-bottom:25px;
}
//点赞
.list-praise{
  width: 750px;
  height:60px;
  padding-left:24px;
  padding-right:24px;
  margin-bottom:30px;
  flex-direction: row;
  justify-content: center;
}
.list-praise-box{
  width: 650px;
  flex-direction: row;
  justify-content: space-between;
}
.praise-box{
  width: 300px;
  height:60px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color:#F5F6F7;
  border-bottom-left-radius:8px;
  border-bottom-right-radius:8px;
  border-top-left-radius:8px;
  border-top-right-radius:8px;

}
.praise-img{
  width: 25px;
  height:25px;
  margin-right:15px;

}
.praise-num{
  font-size:24px;
  color:#999999;
}
//高亮
.praise-active-yellow{
  background-color:#FFEDE1;
}
.praise-active{
  color:#FA6400;
}
.praise-active-dark{
  background-color:#E3E3E3;
}
.praise-dark-text{
  color:#999999;
}
// 地位区域
.address-box{
  align-items: center;
  flex-direction: row;
  padding-bottom:25px;
  border-bottom-width:1px;
  border-bottom-color:#EEEEEE;
  border-bottom-style:solid;
}
.address-img{
  width: 22px;
  height:26px;
  margin-right:14px;
}
.address-box-title{
  font-size:24px;
  color:#999999;
  lines:1;
  width: 645px;
  text-overflow:ellipsis;
}
//受理进度
.list-state{
  width: 702px;
  margin-left:24px;
  margin-right:24px;
  padding-top:20px;
  padding-bottom:30px;
  position: relative;
}
.list-state-dotted{
  position: absolute;
  width: 516px;
  height:2px;
  left: 88px;
  top: 27px;
  border-bottom-style:dotted;
  border-bottom-width:1px;
  border-bottom-color:#D9D9D9;
}
.list-state-content{
  width:698px;
  flex-direction: row;
  justify-content: space-between;
}
.list-state-item{
  width: 176px;
  align-items: center;
}
.state-img-box{
  width: 34px;
  background-color:#ffffff;
  align-items: center;
}
.state-circle{
  width: 16px;
  height:16px;
}
.state-circle-active{
  width: 16px;
  height:16px;
}
.state-text-box{
  padding-top:12px;
  padding-bottom:8px;
}
.state-active-text{
  color:#00AFFE;
  font-size: 24px;

}
.state-normal-text{
  color:#666666;
  font-size: 24px;

}
.state-time-box{
  height:22px;
}
.state-time{
  color:#999999;
  font-size: 18px;
}
//底部间隙
.bottom-line{
  height:14px;
  background-color:#F4F4F4FF;
}
//加载更多
.loading-box{
  width: 730px;
  height: 120px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.loading-text{
  color: #9c9c9c;
}
.indicator {
  height: 40px;
  width: 40px;
  margin-right: 15px;
  color: skyblue;
}
.no-more-data{
  color:#9c9c9c;
  width: 730px;
  text-align: center;
}
.refresh{
  height:80px;
}
</style>
