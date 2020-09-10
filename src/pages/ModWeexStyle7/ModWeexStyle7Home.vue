
<template>
     <div class="home-wrapper">
         <!-- 搜索 -->
         <search2></search2>
         <scroller class="scroller" show-scrollbar="false">
           <refresh @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'" class="refresh">
                <refresh-style :mLeft="340"></refresh-style>
            </refresh>
            <!-- 列表 -->
            <list1 v-if="newList.length" :data="newList" :title="newTitle" :target="'book'" :id="newId"></list1>
            <!-- 榜单 -->
            <div class="list-wrapper" v-if="rankList.length">
              <div class="title" @click="goMore">
                  <text class="title-left">榜单</text>
                  <div class="more-box">
                      <text class="more-text"></text>
                      <image class="more-icon" :src="getLocalImgUrl('feature_listmore.png')"></image>
                  </div>
              </div>
              <image class="title-bottom" :src="getLocalImgUrl('feature_listborder.png')"></image>
              <scroller class="rank-box" scroll-direction='horizontal' show-scrollbar="false">
                  <div class="rank-item" v-for="(item,index) in rankList" :key="index" @click="goRankList(index)">
                      <text class="rank-text">{{item.title}}</text>
                      <image class="rank-img" :src="getLocalImgUrl('feature_rank.png')"></image>
                  </div>
              </scroller>
            </div>
            <list1 v-if="HotList.length" :data="HotList" :title="HotTitle" :id="HotId" :type="'people'" :target="'hotPeople'" :ifSlider="true"></list1>
            <!-- <list5 v-if="eventList.length" :data="eventList" :title="eventTitle" :id="eventId" :showMore="true"></list5> -->
            <list4 v-if="eventList.length" :data="eventList" :title="eventTitle" :id="eventId" :showMore="true" :target="'hot'"></list4>
         </scroller>
    </div>
</template>

<script>
import List1 from '../../components/feature/List1'
import List4 from '../../components/feature/List4'
import List5 from '../../components/feature/List5'
import Search2 from '../../components/feature/Search2'
import { nativeUtil } from '../../lib/nativeUtils'
import RefreshStyle from '../../components/common/RefreshStyle'
export default {
  name: 'Hot',
  components: {
    List1,
    List4,
    List5,
    Search2,
    RefreshStyle
  },
  data () {
    return {
      newTitle: '',
      newList: [],
      newId: null,
      HotId: null,
      HotTitle: '',
      HotList: [],
      eventList: [],
      eventTitle: '',
      eventId: null,
      rankList: [],
      config: {},
      api: {},
      refreshing: true
    }
  },
  methods: {
    // 获取首页数据
    getData () {
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        offset: 0,
        count: 20
      }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        res.forEach(element => {
          switch (element.name) {
            case '新书':
              this.newList = element.data[0].data.slice(0, 3)
              this.newTitle = element.name
              this.newId = element.id
              break
            case '榜单':
              this.rankList = element.data[0].data
              break
            case '热门人物':
              this.HotList = element.data[0].data
              this.HotTitle = element.name
              this.HotId = element.id
              break
            case '热门活动':
              this.eventList = element.data[0].data.slice(0, 2)
              this.eventTitle = element.name
              this.eventId = element.id
              break
          }
          this.refreshing = false
        })
      }, (e) => {
        nativeUtil.alert(e)
      })
    },
    // 下拉刷新
    onrefresh () {
      this.refreshing = true
      this.getData()
    },
    // 去排行榜列表
    goMore () {
      this.jumpWithParams('ModWeexStyle7FeatureHotRankList', {})
    },
    // 去排行榜列表
    goRankList (index) {
      this.jumpWithParams('ModWeexStyle7FeatureHotRankList', {index})
    },
    // 获取配置文件
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'id': '10432',
          'uniqueid': 'redian2',
          'type': '1',
          'name': '热点',
          'ename': 'redian2',
          'custom_name': '热点',
          'normal_pic': {
            'id': '29991',
            'host': 'http://mm.u.hoge.cn/',
            'dir': 'mxu/',
            'filepath': '2019/0806/29/',
            'filename': '29945199831279fb35e3ed1455f12ec5.png?{$hgPicSizeStart}imageView2/1/w/{$hgPicSizeWidth}/h/{$hgPicSizeHeight}{$hgPicSizeEnd}',
            'imgwidth': '54',
            'imgheight': '54',
            'filesize': '5084'
          },
          'press_pic': {
            'id': '29992',
            'host': 'http://mm.u.hoge.cn/',
            'dir': 'mxu/',
            'filepath': '2019/0806/67/',
            'filename': '673b77378e90df9081a77f820952a420.png?{$hgPicSizeStart}imageView2/1/w/{$hgPicSizeWidth}/h/{$hgPicSizeHeight}{$hgPicSizeEnd}',
            'imgwidth': '51',
            'imgheight': '51',
            'filesize': '5042'
          },
          'url': '',
          'is_master': '0',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '0',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle7',
          'android_min': null,
          'android_max': null,
          'ios_min': null,
          'ios_max': null,
          'attrs': {
            'navBarTitle': '',
            'button_backgroundcolor': '#ff4576e0',
            'navBarTitleColor': '#ffffffff',
            'navbarDividerColor': '#ff333333',
            'listBackground': '#fff9f9f9',
            'moduleBatteryBar': '0'
          },
          'api': {
            'content_detail': 'http://mobile.tjpress.com/tjpress/special_detail.php',
            'dept_list': 'dept_list',
            'detail_comment_list': 'http://mobile.tjpress.com/tjpress/special_content.php',
            'ebook_detail': 'ebook_detail',
            'ebook_list': 'ebook_list',
            'home_column': 'http://mobile.tjpress.com/tjpress/get_content_info_redian.php',
            'home_list': 'http://mobile.tjpress.com/tjpress/mx_news.php',
            'home_list_mine': 'http://mobile.tjpress.com/tjpress/special_content.php',
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
          'moduleSign': 'redian2'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        this.getData()
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
  width: 750px;
  padding-left: 10px;
  padding-right: 10px;
//   padding-top: 60px;
  // padding-bottom: 40px;
  background-color: #f2f6fa;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.scroller{
  width: 730px;
  flex:1;
  padding-bottom: 60px;
}
.list-wrapper{
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 32px;
    padding-bottom: 40px;
    background-color: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    margin-bottom: 30px;
}
.title{
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 18px;
  padding-right: 25px;
}
.title-left{
    font-family:PingFang SC;
    font-size: 36px;
    color:#545454;
}
.more-box{
    flex-direction: row;
    align-items: center;
}
.more-text{
    font-size: 28px;
    color:rgba(211,211,211,1);
    margin-right: 10px;
    padding-bottom: 5px;
}
.more-icon{
    width: 10px;
    height: 14px;
}
.title-bottom{
    width: 702px;
    height: 13px;
}
.rank-box{
    flex: 1;
    flex-direction: row;
    padding-top: 30px;
    padding-left: 27px;
    padding-right: 27px;
    justify-content: space-between;
}
.rank-item{
  margin-right: 70px;
  width: 170px;
  height: 290px;
  position: relative;
}
.rank-img{
    width: 170px;
    height: 290px;
}
.rank-text{
    font-size: 32px;
    width: 50px;
    text-align: center;
    word-wrap:break-word;
    position: absolute;
    top: 10px;
    left: 60px;
}
.refresh{
  height: 80px;
}
</style>
