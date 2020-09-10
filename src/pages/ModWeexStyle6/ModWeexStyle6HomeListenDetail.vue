<template>
     <div class="detail-wrapper">
       <search></search>
       <!-- <head :title="'我听'"></head> -->
       <image class="top-img" resize="cover" :src="top_pic"></image>
       <text class="title-text">{{detail.name}}</text>
       <text class="author-text">{{detail.keywords}}</text>
       <div class="card">
         <div class="nav">
            <image class="title-bottom" :src="getLocalImgUrl('feature_listborder.png')"></image>
            <text class="nav-item"
                :class="[currentIndex === index ? 'nav-active':'']"
                v-for="(item,index) in navList"
                :key="index"
                @click='changeSlide(index)'
                >{{item}}
                <div class="nav-border" v-if="currentIndex === index"></div>
            </text>
         </div>
         <slider class="slider" forbid-slide-animation="false"  bubble="false"
          auto-play="false" infinite="false" @change="slideChange" :index="currentIndex" >
           <scroller class="slider-box" show-scrollbar="false">
             <text class="brief-text" v-if="detail.brief !== ''">{{detail.brief}}</text>
             <text class="brief-text no-brief" v-else>暂无简介</text>
           </scroller>
           <scroller class="slider-box" show-scrollbar="false">
             <div class="audio-item" v-for="(item,index) in audioList" :key="index" @click="goDetail(item.id,index)">
               <image v-if="type === 'audio' && playingIndex === index" class="audio-icon" :src="getLocalImgUrl('feature_playing.png')"></image>
               <image v-if="type === 'audio' && playingIndex !== index" class="audio-icon" :src="getLocalImgUrl('feature_notplay.png')"></image>
               <image v-if="type !== 'audio' && bookPlayingIndex === index" class="audio-icon" :src="getLocalImgUrl('feature_readed.png')"></image>
               <image v-if="type !== 'audio' && bookPlayingIndex !== index" class="audio-icon" :src="getLocalImgUrl('feature_read.png')"></image>
               <text class="audio-text">{{item.title}}</text>
             </div>
           </scroller>
         </slider>
         <!-- <div class="playing-box" v-if="playingPic !== ''" @click="backToDetail(playingId)">
            <image class="playing-img" :src="playingPic"></image>
            <image class="playing-icon" :src="getLocalImgUrl('feature_playingicon.png')"></image>
         </div> -->
       </div>
       <image class="playing-icon-pic" v-if="type === 'audio'" :src="getLocalImgUrl('feature_playingicon.png')"></image>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import Search from '../../components/feature/Search'
import Head from '../../components/feature/Head'
export default {
  name: 'HomeListenDetail',
  components: {
    Search,
    Head
  },
  data () {
    return {
      type: '',
      id: null,
      detail: {},
      top_pic: '',
      audioList: [],
      navList: ['详情', '目录'],
      currentIndex: 0,
      playingIndex: null, // 音频
      playingId: null,
      playingPic: '',
      bookPlayingIndex: null, // 电子书
      bookPlayingId: null,
      config: {},
      api: {}
    }
  },
  methods: {
    changeSlide (index) {
      this.currentIndex = index
    },
    slideChange (event) {
      this.currentIndex = event.index
    },
    // 纯文本
    getData () {
      // 书籍详情
      // const param1 = {
      //   appid: 4,
      //   appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
      //   column_id: this.id
      // }
      // this.$httpRequest(this.api.ebook_detail, param1, 'get').then(res => {
      //   this.detail = res[0]
      //   this.top_pic = this.detail.indexpic.host + this.detail.indexpic.dir + '730x300/' + this.detail.indexpic.filepath + this.detail.indexpic.filename
      // }, (e) => {
      //   console.log(e)
      // })
      // // 列表
      // const param2 = {
      //   appid: 4,
      //   appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
      //   column_id: this.id,
      //   sort_type: 'ASC'
      // }
      // this.$httpRequest(this.api.ebook_list, param2, 'get').then(res => {
      //   this.audioList = res
      // }, (e) => {
      //   console.log(e)
      // })
      // 书籍详情
      const param1 = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        id: this.id
      }
      this.$httpRequest(this.api.home_list_mine, param1, 'get').then(res => {
        this.detail = res[0]
        this.top_pic = this.detail.top_pic.host + this.detail.top_pic.dir + '644x250/' + this.detail.top_pic.filepath + this.detail.top_pic.filename
      }, (e) => {
        console.log(e)
      })
      // 列表
      const param2 = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        column_id: this.id,
        new_style: 2
      }
      this.$httpRequest(this.api.detail_comment_list, param2, 'get').then(res => {
        this.audioList = res
        if (this.bookPlayingIndex) {
          this.bookPlayingIndex = this.audioList.findIndex(ele => ele.id === this.bookPlayingId)
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 音频
    getAudioData () {
      // 书籍详情
      const param1 = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        id: this.id
      }
      this.$httpRequest(this.api.home_list_mine, param1, 'get').then(res => {
        this.detail = res[0]
        this.top_pic = this.detail.top_pic.host + this.detail.top_pic.dir + '644x250/' + this.detail.top_pic.filepath + this.detail.top_pic.filename
      }, (e) => {
        console.log(e)
      })
      // 音频播放列表
      const param2 = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        column_id: this.id,
        new_style: 2
      }
      this.$httpRequest(this.api.detail_comment_list, param2, 'get').then(res => {
        this.audioList = res
        if (this.playingId) {
          this.playingIndex = this.audioList.findIndex(ele => ele.id === this.playingId)
          // console.log(this.playingIndex)
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 跳转章节详情
    goDetail (id, index, columnId) {
      if (this.type === 'audio') {
        if (index === this.playingIndex) {
          this.jumpWithParams('ModWeexStyle6FeatureHomeListenAudio', {id, flag: 'back', index, columnId: this.id})
        } else {
          this.jumpWithParams('ModWeexStyle6FeatureHomeListenAudio', {id, index, columnId: this.id})
        }
      } else {
        if (index === this.bookPlayingIndex) {
          this.jumpWithParams('ModWeexStyle6FeatureHomeArticleDetail', {id, flag: 'back', columnId: this.id, index, title: this.detail.name, fromSingle: 1})
        } else {
          this.jumpWithParams('ModWeexStyle6FeatureHomeArticleDetail', {id, index, columnId: this.id, title: this.detail.name, fromSingle: 1})
        }
      }
    },
    backToDetail (id) {
      this.jumpWithParams('ModWeexStyle6FeatureHomeListenAudio', {id, flag: 'back'})
    },
    // 获取配置文件
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'id': '10127',
          'uniqueid': 'home2',
          'type': '1',
          'name': '首页',
          'ename': 'home2',
          'custom_name': '首页',
          'normal_pic': '',
          'press_pic': '',
          'url': '',
          'is_master': '0',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '0',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle6',
          'android_min': null,
          'android_max': null,
          'ios_min': null,
          'ios_max': null,
          'attrs': {
            'navBarTitle': '特写',
            'button_backgroundcolor': '#ff000000',
            'navBarTitleColor': '#ffffffff',
            'navbarDividerColor': '#ff333333',
            'listBackground': '#fff9f9f9',
            'moduleBatteryBar': '0'
          },
          'api': {
            'content_detail': 'http://mobile.tjpress.com/tjpress/item.php',
            'dept_list': 'http://mobile.tjpress.com/tjpress/mx_news.php',
            'detail_comment_list': 'http://mobile.tjpress.com/tjpress/special_content.php',
            'ebook_detail': 'http://mobile.tjpress.com/tjpress/ebooks_top_column.php',
            'ebook_list': 'http://mobile.tjpress.com/tjpress/ebooks_list.php',
            'home_column': 'home_column',
            'home_list': 'http://mobile.tjpress.com/tjpress/get_content_info.php',
            'home_list_mine': 'http://mobile.tjpress.com/tjpress/special_detail.php',
            'my_listen': 'http://mobile.tjpress.com/tjpress/wt_get_content_info.php',
            'my_look': 'http://mobile.tjpress.com/tjpress/wd_get_content_info.php',
            'my_speak': 'http://mobile.tjpress.com/tjpress/ws_get_content_info.php',
            'my_write': 'http://mobile.tjpress.com/tjpress/wx_get_content_info.php',
            'send_content': 'send_content'
          }
        }
        this.api = this.config.api
        this.id = this.getQuery().id
        this.type = this.getQuery().type
        this.type === 'audio' ? this.getAudioData() : this.getData()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'home2'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        this.id = this.getQuery().id
        this.type = this.getQuery().type
        this.type === 'audio' ? this.getAudioData() : this.getData()
      }
    }
  },
  created () {
    this.getConfig()
  },
  mounted () {
    const _this = this
    // 音频
    const Stark = new BroadcastChannel('Avengers')
    Stark.onmessage = function (event) {
      if (event.data) {
        _this.playingPic = event.data.indexpic
        _this.playingId = event.data.id
        _this.playingIndex = _this.audioList.findIndex(ele => ele.id === _this.playingId)
      }
    }
    // 电子书
    const EBook = new BroadcastChannel('EBook')
    EBook.onmessage = function (event) {
      if (event.data) {
        _this.bookPlayingId = event.data.id
        _this.bookPlayingIndex = _this.audioList.findIndex(ele => ele.id === _this.bookPlayingId)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.detail-wrapper{
  width: 750px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 40px;
  background-color: #f2f6fa;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.top-img{
  width: 730px;
  height: 300px;
  margin-bottom: 14px;
  border-top-left-radius:16px;
  border-top-right-radius:16px;
  border-bottom-left-radius:16px;
  border-bottom-right-radius:16px;
}
.title-text{
  color: #6a6a6a;
  font-size: 32px;
  padding-left: 23px;
}
.author-text{
  color: #9C9C9C;
  font-size: 28px;
  padding-left: 23px;
}
.card{
  width: 730px;
  height: 730px;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
  border-top-left-radius:16px;
  border-top-right-radius:16px;
  border-bottom-left-radius:16px;
  border-bottom-right-radius:16px;
}
.nav{
  width: 690px;
  height: 100px;
  flex-direction: row;
  // border-bottom-width: 1px;
  // border-bottom-color: #f1efef;
  // border-bottom-style: solid;
}
.nav-item{
  width: 345px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 36px;
  color:#d3d3d3;
  position: relative;
}
.nav-active{
  color:#6a6a6a;
}
.nav-border{
  width: 120px;
  height: 4px;
  background-color: #6a6a6a;
  position: absolute;
  bottom: 4px;
  left: 112px;
}
.title-bottom{
  width: 690px;
  height: 13px;
  position: absolute;
  bottom: 0;
  left: 0;
}
.slider{
  flex:1;
  width: 690px;
  padding-left: 20px;
  padding-right: 20px;
}
.slider-box{
  position: absolute;
  top: 30px;
  left: 10px;
  right: 10px;
  bottom: 40px;
  padding-top: 32px;
}
.brief-text{
  color:#6a6a6a;
  font-size: 32px;
  line-height: 72px;
  text-align: justify;
  padding-left: 20px;
  padding-right: 20px;
}
.no-brief{
  color:#6a6a6a;
  font-size: 32px;
  text-align: center;
  height: 400px;
  line-height: 400px;
}
.audio-item{
  height: 70px;
  flex-direction: row;
  align-items: center;
  padding-left: 35px;
}
.audio-icon{
  width: 22px;
  height: 22px;
  margin-right: 24px;
}
.audio-text{
  lines:1;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 600px;
  font-size: 32px;
  color:#6a6a6a;
}
.playing-box{
  width: 81px;
  height: 81px;
  position: fixed;
  right: 60px;
  bottom: 80px;
}
.playing-img{
  width: 81px;
  height: 81px;
  border-top-left-radius:40px;
  border-top-right-radius:40px;
  border-bottom-left-radius:40px;
  border-bottom-right-radius:40px;
  border-bottom-style:solid;
  border-bottom-width:2px;
  border-bottom-color:#6aaf93;
  border-top-style:solid;
  border-top-width:2px;
  border-top-color:#6aaf93;
  border-left-style:solid;
  border-left-width:2px;
  border-left-color:#6aaf93;
  border-right-style:solid;
  border-right-width:2px;
  border-right-color:#6aaf93;
  position: absolute;
  top: 0;
  left: 0;
}
.playing-icon{
  width: 21px;
  height: 21px;
  position: absolute;
  top: 30px;
  left: 30px;
}
.playing-icon-pic{
  position: absolute;
  width: 33px;
  height: 33px;
  right: 40px;
  top: 380px;
}
</style>
