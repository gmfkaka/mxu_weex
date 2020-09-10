<template>
     <div class="wrapper">
        <div class="head">
            <!-- <wxc-searchbar ref="wxc-searchbar"
            placeholder="搜索"
            :bar-style="barStyle"
            always-show-cancel="true"
                     ></wxc-searchbar> -->
            <div class="input-box">
                <image :src="getLocalImgUrl('icon_search3x.png')" class="search-icon"></image>
                <input ref="searchInput" :value="inputValue" @focus="focus" type="text" class="input" autofocus="true"
                @return="handleReturn" placeholder-color="#999999" placeholder="搜索关键词" return-key-type="search">
            </div>
            <text class="cancel-box" @click="goback()">取消</text>
        </div>
        <wxc-loading :show="isShow"></wxc-loading>
        <div class="main" v-if="!isShow&&isFocus">
            <div class="hot" v-if="hotSeach.length">
                <div class="main-title">
                    <text class="title-text">热门搜索</text>
                </div>
                <div class="list-box">
                    <!-- 多种样式 -->
                    <!-- <div class="list-item hot-item">
                        <image :src="getLocalImgUrl('icon_hot3x.png')" class="hot-icon"></image>
                        <text class="hot-text">周排行榜</text>
                    </div>
                     <div class="list-item hot-item">
                        <image :src="getLocalImgUrl('icon_hot3x.png')" class="hot-icon"></image>
                        <text class="hot-text">视觉中国黑洞</text>
                    </div>
                    <div class="list-item yellow-item">
                        <text class="yellow-text">最新资讯</text>
                    </div>
                    <div class="list-item yellow-item">
                        <text class="yellow-text">娱乐</text>
                    </div> -->
                    <div class="list-item grey-item" v-for="(item,index) in hotSeach" :key="index" @click="searchHot(item.name)">
                        <text class="grey-text">{{item.name}}</text>
                    </div>
                </div>

            </div>
            <div class="history" v-if="historySearch.length">
                 <div class="main-title">
                    <text class="title-text">历史搜索</text>
                    <div class="clear-all" @click="clearAllHistory()">
                        <image :src="getLocalImgUrl('icon_del_all3x.png')" class="clear-icon"></image>
                        <text class="title-text">清空全部</text>
                    </div>

                </div>
                <div class="list-box">
                    <div class="list-item grey-item" v-for="(item,index) in historySearch" :key="index">
                        <text class="grey-text">{{item}}</text>
                         <image :src="getLocalImgUrl('icon_close3x.png')"
                         @click="clearItem(item)"
                         class="clear-icon"></image>
                    </div>
                </div>
            </div>
        </div>
        <div class="main" v-if="!isFocus&&!isShow">
            <div v-for="(data,index) in searchList" :key="index"
            @click="jumpDetail(data)">

              <!-- 视频  start-->
              <!-- 视频标题 日期icon -->
              <list21 :data="data" v-if="data.type=='video'"></list21>
              <!-- 视频标题 icon -->
              <list22 :data="data" v-if="data.css_id!=='0'"></list22>
              <!-- 图片标题 icon -->
              <list23 :data="data" v-if="data.css_id!=='0'"></list23>
              <!-- 视频  end-->
              <!-- 上标题 下播放器 下栏目时间阅读数-->
              <list7 :data="data" v-if="data.css_id!=='0'"></list7>
              <!-- 上标题 下播放器 下日期阅读数 -->
              <list13 :data="data" v-if="data.css_id!=='0'"></list13>
              <!-- 专题 start -->
              <!-- 上图 下标题 下专题名 专题（几篇）-->
              <list8 :data="data" v-if="data.css_id!=='0'"></list8>
              <!-- 专题 视频 -->
              <list18 :data="data" v-if="data.css_id!=='0'"></list18>
              <!-- 专题 图集 -->
              <list19 :data="data" v-if="data.type=='gallery'"></list19>
              <!-- 专题 新闻 -->
              <list20 :data="data" v-if="data.css_id!=='0'"></list20>
              <!-- 专题 end -->

              <!-- 上标题 下图广告标签 -->
              <list9 :data="data" v-if="data.css_id!=='0'"></list9>
              <!-- 上文字下三图  start-->
              <list1 :data="data" v-if="data.css_id!=='0'"></list1>
              <!-- 左标题右图  上标题 下栏目阅读数start-->
              <list2 :data="data" v-if="data.css_id!=='0'"></list2>
              <!-- 左标题右图  上标题 下日期阅读数start-->
              <list14 :data="data" v-if="data.css_id!=='0'"></list14>
              <!-- 右标题左图  上标题 下栏目阅读数start-->
              <list11 :data="data" v-if="data.css_id!=='0'"></list11>
              <!-- 右标题左图  上标题 下日期阅读数start-->
              <list15 :data="data" v-if="data.type=='article'"></list15>
              <!-- 上标题 下大图带video 下栏目 start -->
              <list3 :data="data" v-if="data.css_id!=='0'"></list3>
              <!-- 上标题  下栏目 start -->
              <list16 :data="data" v-if="data.css_id!=='0'"></list16>
              <!-- 上标题  下日期阅读数 start -->
              <list17 :data="data" v-if="data.css_id!=='0'"></list17>
                <!-- 上标题 下图 下日期阅读数 -->
              <list4 :data="data" v-if="data.css_id!=='0'"></list4>
              <!-- 上文字 下三图（左大右二小） -->
              <list5 :data="data" v-if="data.css_id!=='0'"></list5>
              <!-- 上标题 下两图 下 阅读数 日期 -->
              <list6 :data="data" v-if="data.css_id!=='0'"></list6>
                <!-- 上标题 中图  下栏目日期阅读数 -->
              <list12 :data="data" v-if="data.css_id!=='0'"></list12>
          </div>
        </div>
    </div>
</template>

<script>
import { WxcSearchbar, WxcLoading } from 'weex-ui'
import List2 from '../../components/list/List2'
import List10 from '../../components/list/List10'
import List9 from '../../components/list/list9'
import List3 from '../../components/list/List3'
import List1 from '../../components/list/List1'
// 图说
import List4 from '../../components/list/List4'
import List5 from '../../components/list/List5'
import List6 from '../../components/list/List6'
// 视频
import List7 from '../../components/list/List7'
// 专题
import List8 from '../../components/list/List8'
import List11 from '../../components/list/List11'
import List12 from '../../components/list/List12'
import List13 from '../../components/list/List13'
import List14 from '../../components/list/List14'
import List15 from '../../components/list/List15'
import List16 from '../../components/list/List16'
import List17 from '../../components/list/List17'
import List18 from '../../components/list/List18'
import List19 from '../../components/list/List19'
import List20 from '../../components/list/List20'
import List21 from '../../components/list/List21'
import List22 from '../../components/list/List22'
import List23 from '../../components/list/List23'
const storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')
export default {
  name: 'Search',
  components: {
    WxcSearchbar,
    WxcLoading,
    List1,
    List2,
    List10,
    List9,
    List3,
    List4,
    List5,
    List6,
    List7,
    List8,
    List11,
    List12,
    List13,
    List14,
    List15,
    List16,
    List17,
    List18,
    List19,
    List20,
    List21,
    List22,
    List23
  },
  data () {
    return {
      hotSeach: [],
      isShow: false,
      searchList: [],
      isFocus: false,
      historySearch: [],
      inputValue: ''
    }
  },
  methods: {
    // 获取热门搜索
    getHotSearch () {
      this.isShow = true
      this.$httpRequest(
        this.$getHttpUrl('textsearch'),
        {
          appkey: 'd3bda44d6d4b2bb4e28cf3a90c22dc73',
          appid: 'm2ooytobyhnez19vrv',
          device_token: 'b7bbedeba54fc61194edd730e9394b38&'
        },
        'get'
      ).then((res) => {
        if (!res.error_code) {
          this.isShow = false
          this.hotSeach = res
        } else {
          this.messageTip(res.error_message)
        }
      }, (e) => {
        this.isShow = false
      })
    },
    // 取消
    goback () {
      this.goBack()
    },
    // 点击热门搜索
    searchHot (value) {
      this.inputValue = value
      this.handleReturn({value: value})
    },
    // 搜索
    handleReturn (param) {
      if (param.value === '') {
        this.messageTip('输入不能为空')
        return
      }
      this.setHistoryStorage(param.value)
      this.isShow = true
      this.isFocus = false
      this.$httpRequest(
        this.$getHttpUrl('searchList'),
        {
          appkey: 'd3bda44d6d4b2bb4e28cf3a90c22dc73',
          appid: 'm2ooytobyhnez19vrv',
          device_token: 'b7bbedeba54fc61194edd730e9394b38&',
          count: 10,
          offset: 0,
          search_text: param.value
        },
        'get'
      ).then((res) => {
        if (!res.error_code) {
          this.$refs.searchInput.blur()
          res.forEach((vv) => {
            vv.index_pic = vv.index_pic.host + vv.index_pic.filename
          })
          this.searchList = res
          this.isShow = false
        } else {
          this.messageTip(res.error_message)
        }
      }, (e) => {
        this.isShow = false
      })
    },
    // 获取历史搜索
    getHistoryStorage () {
      storage.getItem('historySearch', event => {
        if (event.data !== 'undefined') {
          // console.log(1)
          this.historySearch = event.data.split(',')
        }
      })
    },
    // 存储历史搜索
    setHistoryStorage (value) {
      if (this.historySearch.includes(value) || value === '') {
        return
      }
      this.historySearch.push(value)
      storage.setItem('historySearch', this.historySearch.join(','))
    },
    // 清空历史记录
    clearAllHistory () {
      modal.confirm({
        message: '确定清空历史记录吗?',
        duration: 0.3,
        okTitle: '确定',
        cancelTitle: '取消'
      }, (value) => {
        storage.removeItem('historySearch', event => {
          this.historySearch = []
        })
      })
    },
    // 删除单个历史记录
    clearItem (item) {
      this.historySearch.splice(this.historySearch.findIndex(obj => obj === item), 1)
      if (this.historySearch.length) {
        storage.setItem('historySearch', this.historySearch.join(','))
      } else {
        this.clearAllHistory()
      }
    },
    // 获取焦点
    focus () {
      this.isFocus = true
    },
    // 跳转详情页
    jumpDetail (item) {
      if (item.type === 'article') {
        this.jumpWithParams('NewsDetail', {id: item.id})
      } else if (item.type === 'gallery') {
        this.jumpWithParams('GalleryDetail', {id: item.id})
      } else if (item.type === 'topic') {
        this.jumpWithParams('TopicDetail', {id: item.id})
      }
    }

  },
  mounted () {
  },
  computed: {
  },
  created () {
    this.getHistoryStorage()
    this.getHotSearch()
  }
}
</script>

<style scoped lang="scss">
.wrapper{
  width: 750px;
  flex:1;
}
.main{
  width: 750px;
  flex:1;
  background-color: #ffffff;
}
.head{
    height:128px;
    width: 750px;
    padding-top:52px;
    flex-direction: row;
    align-items: center;
    position: relative;
    margin-bottom:52px;
}
.input-box{
    width: 600px;
    height:64px;
    border-bottom-left-radius:32px;
    border-bottom-right-radius:32px;
    border-top-left-radius:32px;
    border-top-right-radius:32px;
     align-items: center;
    padding-left:30px;
    padding-right:30px;
    flex-direction: row;
    background-color:#F3F3F3;
    margin-right:30px;
    margin-left:30px;
}
.search-icon{
    width: 30px;
    height:30px;
    margin-right:26px;
}
.input{
    height:36px;
    flex:1;
    background-color: #F3F3F3;
    font-size: 26px;
}
.cancel-box{
   font-size: 28px;
    color: #333333;
}
.hot{
    width: 686px;
    padding-left:32px;
    padding-right:8px;
    width: 750px;
}
.history{
    width: 686px;
    margin-top:60px;
    padding-left:32px;
    padding-right:8px;
    width: 750px;
}
.main-title{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right:20px;
}
.title-text{
    font-size: 28px;
    color: #333333;
}
.clear-all{
    flex-direction: row;
    align-items: center;
}
.clear-icon{
    width: 30px;
    height:30px;
    margin-right:6px;
}
.title-text{
    font-size: 24px;
    color: #999999;
}
.list-box{
    flex-direction: row;
    flex-wrap: wrap;
}
.list-item{
    margin-right:24px;
    flex-direction: row;
    align-items: center;
    padding-left:20px;
    padding-right:20px;
    height: 60px;
    border-bottom-left-radius:8px;
    border-bottom-right-radius:8px;
    border-top-left-radius:8px;
    border-top-right-radius:8px;
    margin-bottom:4px;
    margin-top:20px;
}
.hot-item{
    background-color: #FFE7DD;
}
.hot-icon{
    width: 22px;
    height:26px;
    margin-right:5px;
}
.hot-text{
    font-size: 24px;
    color: #FF623D;
}
.yellow-item{
    background-color: #FFF0D8;
}
.yellow-text{
    font-size: 24px;
   color: #FEAE48;
}
.grey-item{
     background-color: #F6F6F6;;
}
.grey-text{
    font-size: 24px;
   color: #666666;
}
.clear-icon{
    width: 22px;
    height:22px;
    margin-left:26px;
}
</style>
