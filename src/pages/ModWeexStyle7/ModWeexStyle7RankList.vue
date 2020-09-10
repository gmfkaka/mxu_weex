<template>
     <div class="home-wrapper" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStyleMarginTop">
        <head :title="'榜单'"></head>
        <scroller class="rank-box" show-scrollbar="false" v-if="rankList.length">
            <div style="height:60px;margin-bottom:40px;">
              <scroller style="flex-direction:row;height:60px;" scroll-direction='horizontal' show-scrollbar="false">
                <text class="rank-item" :class="[index === currentIndex ? 'rank-active' :'',index < rankList.length-1 ? 'br0':'']" v-for="(item,index) in rankList" :key="index" @click="changeList(index)">{{item.title}}</text>
              </scroller>
            </div>
            <div class="list-wrapper">
              <div class="book-list" v-if="showList.length">
                  <div class="book-item" v-for="(item,index) in showList" :key="index" @click="goDetail(item)">
                      <text class="rank-text" v-if="index<9">0{{index+1}}</text>
                      <text class="rank-text" v-else>{{index+1}}</text>
                      <image :src="item.indexpic.host + item.indexpic.dir + '30x48/' + item.indexpic.filepath + item.indexpic.filename " class="rank-img"></image>
                      <text class="book-text">《{{item.title}}》</text>
                  </div>
              </div>
            </div>
        </scroller>
    </div>
</template>

<script>
import Search from '../../components/feature/Search'
import Head from '../../components/feature/Head'
import { nativeUtil } from '../../lib/nativeUtils'
export default {
  name: 'RankList',
  components: {
    Search,
    Head
  },
  data () {
    return {
      rankList: [],
      showList: [],
      currentIndex: 0,
      config: {},
      api: {}
    }
  },
  methods: {
    // 获取首页数据
    goSearch () {
      nativeUtil.linkTo('search')
    },
    goback () {
      this.goBack()
    },
    getData () {
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        column_id: 215
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        this.rankList = res.list
        this.getListData(this.rankList[0].content_fromid)
        // if (this.currentIndex >= 0) {
        //   this.getListData(this.rankList[this.currentIndex].content_fromid)
        // } else {
        //   this.getListData(this.rankList[0].content_fromid)
        // }
      }, (e) => {
        console.log(e)
      })
    },
    // 获取列表数据
    getListData (id) {
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        column_id: id
      }
      this.$httpRequest(this.api.detail_comment_list, param, 'get').then(res => {
        this.showList = res
      }, (e) => {
        nativeUtil.alert(e)
      })
    },
    changeList (index) {
      this.currentIndex = index
      this.getListData(this.rankList[index].content_fromid)
    },
    goDetail (item) {
      switch (item.column_type) {
        case '1':
          // const idx = item.outlink.indexOf('=')
          // const id = item.outlink.slice(idx + 1, item.outlink.length)
          this.jumpWithParams('ModWeexStyle6FeatureHomeListenDetail', {id: item.content_fromid})
          break
        case '2':
          this.jumpWithParams('ModWeexStyle6FeatureHomeListenDetail', {id: item.content_fromid, type: 'audio'})
          break
      }
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
        // this.currentIndex = this.getQuery().index
        this.getData()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'redian2'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        // this.currentIndex = this.getQuery().index
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
  flex:1;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 60px;
  padding-bottom: 40px;
  background-color: #f2f6fa;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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
  height: 80px;
  border-bottom-color: rgb(235,241,250);
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
.title-left{
  font-size: 30px;
  color:#545454;
}
.rank-box{
  width: 730px;
  padding-top: 20px;
  margin-bottom: 40px;
}
.rank-item{
  width: 243px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 30px;
  color:#e0dcdc;
  border-top-style:solid;
  border-top-width:2px;
  border-top-color:  rgb(108,174,147);
  border-bottom-style:solid;
  border-bottom-width:2px;
  border-bottom-color:  rgb(108,174,147);
  border-left-style:solid;
  border-left-width:2px;
  border-left-color:  rgb(108,174,147);
  border-right-style:solid;
  border-right-width:2px;
  border-right-color:  rgb(108,174,147);
}
.rank-center{
  width: 250px;
}
.rank-active{
  background-color: rgb(108,174,147);
  color:#fff;
}
.br0{
  border-right-width: 0;
}
.book-list{
    padding-left: 50px;
    padding-right: 50px;
}
.book-item{
    height: 100px;
    flex-direction: row;
    align-items: center;
    padding-right: 20px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: rgb(235,241,250);
    padding-left: 40px;
}
.rank-text{
    width: 80px;
    color:#6A6A6A;
    font-size: 36px;
}
.rank-img{
    width: 30px;
    height: 48px;
    margin-right: 10px;
}
.book-text{
    color:#6A6A6A;
    font-size: 36px;
    lines:1;
    width: 400px;
}
.x-top{
  margin-top: 90px;
}
.title{
  width: 710px;
  height: 66px;
  line-height: 66px;
  font-size: 36px;
  text-align: center;
}
.back-icon{
  width: 66px;
  height: 66px;
  position: absolute;
  top: 0;
  left: 0;
}
.search-icon{
  width: 66px;
  height: 66px;
  position: absolute;
  right: 0;
  top: 0;
}
.rank-title{
    font-family:PingFang SC;
    font-size: 36px;
    color:#545454;
    text-align: center;
}
</style>
