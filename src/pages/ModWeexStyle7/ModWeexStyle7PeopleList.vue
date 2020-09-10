<template>
     <div class="home-wrapper">
         <!-- 搜索 -->
        <head :title="'热门人物'"></head>
        <scroller class="scroller" show-scrollbar="false">
            <div class="list-wrapper">
            <text class="title">{{detail.name}}</text>
            <image class="title-bottom" :src="getLocalImgUrl('feature_listborder.png')"></image>
            <div class="img-box">
              <image :src="detail.indexpic.host + detail.indexpic.dir + '180x220/' + detail.indexpic.filepath + detail.indexpic.filename" class="top-img"></image>
              <div class="brief-box">
                <text class="brief">{{detail.brief}}</text>
              </div>
            </div>
            <div class="book-list" v-if="rankList.length">
                <div class="book-item" v-for="(item,index) in rankList" :key="index" @click="goDetail(item.content_fromid)">
                    <text class="rank-text" v-if="index<9">0{{index+1}}</text>
                    <text class="rank-text" v-else>{{index+1}}</text>
                    <image :src="item.indexpic.host + item.indexpic.dir + '30x48/' + item.indexpic.filepath + item.indexpic.filename" class="rank-img"></image>
                    <text class="book-text">《{{item.title}}》</text>
                </div>
            </div>
            </div>
        </scroller>
    </div>
</template>

<script>
import Head from '../../components/feature/Head'
import { nativeUtil } from '../../lib/nativeUtils'
export default {
  name: 'PeopleList',
  components: {
    Head
  },
  data () {
    return {
      id: null,
      detail: {},
      rankList: [],
      config: {},
      api: {}
    }
  },
  methods: {
    // 获取首页数据
    getData () {
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        id: this.id
      }
      this.$httpRequest(this.api.content_detail, param, 'get').then(res => {
        this.detail = res[0]
        this.getListData()
      }, (e) => {
        console.log(e)
      })
    },
    // 获取列表数据
    getListData (id) {
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        column_id: this.id,
        new_style: 2
      }
      this.$httpRequest(this.api.detail_comment_list, param, 'get').then(res => {
        this.rankList = res
      }, (e) => {
        console.log(e)
      })
    },
    goDetail (id) {
      // const idx = outlink.indexOf('=')
      // const id = outlink.slice(idx + 1, outlink.length)
      this.jumpWithParams('ModWeexStyle6FeatureHomeListenDetail', {id})
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
        this.id = this.getQuery().id
        this.getData()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'redian2'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        this.id = this.getQuery().id
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
  padding-top: 60px;
  padding-bottom: 40px;
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
}
.list-wrapper{
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 25px;
  padding-bottom: 30px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-bottom: 40px;
}
.title{
  width: 702px;
  text-align: center;
  font-size: 36px;
  color:#6a6a6a;
}
.title-bottom{
    width: 702px;
    height: 13px;
}
.img-box{
  margin-top: 30px;
  height: 278px;
  flex-direction: row;
  padding-left: 26px;
  padding-right: 26px;
}
.top-img{
  width: 226px;
  height: 278px;
}
.brief-box{
  flex:1;
  height: 280px;
  background-color: rgb(216,154,91);
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
}
.brief{
  lines:7;
  font-size: 24px;
  color: #fff;
  text-align: justify;
}
.rank-box{
  flex-direction: row;
  padding-top: 40px;
  margin-bottom: 60px;
}
.rank-item{
  width: 192px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color:#ccc;
  border: 1px solid rgb(108,174,147);
}
.rank-active{
  background-color: rgb(108,174,147);
  color:#fff;
}
.br0{
  border-right-width: 0;
}
.book-list{
    margin-top: 50px;
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: rgb(234,241,250);;
}
.book-item{
    height: 100px;
    flex-direction: row;
    align-items: center;
    padding-left: 70px;
    padding-right: 30px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: rgb(234,241,250);
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
</style>
