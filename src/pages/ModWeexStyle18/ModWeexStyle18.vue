<template>
    <div class="pos-full" :class="[this.isIphoneX() ? 'x-top':'',styleType === 0 ? 'bg' : '']" :style="androidStylePaddingTop">
      <scroller class="flex1 w100" show-scrollbar=false>
        <refresh @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'" class="refresh" style="height:120px;">
          <refresh-style :mLeft="340"></refresh-style>
        </refresh>
        <div class="top">
          <image class="w100 cover-img" v-if="detail.indexpic && detail.indexpic.host" :src="detail.indexpic.host+detail.indexpic.dir+detail.indexpic.filepath+detail.indexpic.filename+'?imageView/0/w/750'"></image>
          <image class="w100 cover-img" v-else :src="getLocalImgUrl('nytopic_bg.png')"></image>
          <div class="top-bar flex-row-between flex-align">
            <image class="back-icon" :src="getLocalImgUrl('nytopic_back.png')" @click="back"></image>
            <image class="set-icon" :src="getLocalImgUrl('nytopic_dot.png')" @click="share"></image>
          </div>
        </div>
        <!-- 通用样式 -->
        <div v-if="styleType === 0 && commonList.length">
            <div class="brief-box bg-fff">
                <text class="brief-title fz34" v-if="detail.title">{{detail.title}}</text>
                <text class="brief-content fz24" v-if="detail.brief">{{detail.brief}}</text>
            </div>
            <scroller class="nav-list flex-row" scroll-direction="horizontal">
                <text v-for="(item,index) in commonList" :key="index" class="nav-item" @click="goColumn(item.name,item.list[0].special_content_column)">{{item.list[0].special_content_column}}</text>
            </scroller>
            <div class="topic-box" v-for="(item,index) in commonList" :key="index">
              <div class="topic-top flex-row-between flex-align">
                <image class="topic-icon" :src="getLocalImgUrl('nytopic_icon.png')"></image>
                <text class="topic-title fz32 flex1">{{item.list[0].special_content_column}}</text>
                <div class="more-box flex-row-center" @click="goColumn(item.name,item.list[0].special_content_column)">
                  <text class="more-text fz22">更多</text>
                  <image class="more-icon" :src="getLocalImgUrl('nytopic_more.png')"></image>
                </div>
              </div>
              <div v-if="item.list.length">
                <div class="topic-item" :class="[i > 0 ? 'topic-border' : '']" v-for="(data,i) in item.list" :key="i" @click="goDetail(data.module_id,data.id)">
                  <!-- 默认样式 cssid 0 -->
                  <div v-if="data.css_id === 0">
                    <!-- 文稿 左图右文字 -->
                    <article-default v-if="data.type === 'article'" :data="data"></article-default>
                    <!-- 图集 -->
                    <gallery-default v-if="data.type === 'gallery'" :data="data"></gallery-default>
                    <!-- 视频 -->
                    <video-default v-if="data.type === 'video'" :data="data"></video-default>
                  </div>
                  <!-- 无图纯标题样式 cssid 1-->
                  <style1 v-if="data.css_id === 1" :data="data"></style1>
                  <!-- 左标题右图 cssid 2-->
                  <style2 v-if="data.css_id === 2" :data="data"></style2>
                  <!-- 三图 cssid 3-->
                  <style3 v-if="data.css_id === 3" :data="data"></style3>
                  <!-- 上标题下大图 cssid 4-->
                  <style4 v-if="data.css_id === 4" :data="data"></style4>
                </div>
              </div>
              <!-- 视频 -->
              <!-- <div>
                <div class="video-top-box flex-row-between flex-wrap mt30">
                  <div class="video-top-item" v-for="(video,i) in item.childs.slice(0,4)" :key="i">
                    <div class="mb30" style="position:relative;">
                      <image class="video-top-cover" :src="video.indexpic"></image>
                      <image class="video-top-icon" :src="getLocalImgUrl('nytopic_videoicon.png')"></image>
                    </div>
                    <text class="line2 fz28 cl-333">{{video.title}}</text>
                  </div>
                </div>
                <div class="video-full-box">
                  <div style="position:relative;">
                      <image class="video-full-cover" :src="item.childs[item.childs.length-1].indexpic"></image>
                      <image class="video-full-icon" :src="getLocalImgUrl('nytopic_videoicon.png')"></image>
                      <div class="flex-row-between flex-align video-info-box">
                        <text class="cl-fff fz20">{{item.childs[item.childs.length-1].click_num}}万播放</text>
                        <div class="video-line"></div>
                        <text class="cl-fff fz20">{{item.childs[item.childs.length-1].duration}}</text>
                      </div>
                  </div>
                  <text class="line2 fz34 cl-333 mb30" style="margin-top:20px;">{{item.childs[item.childs.length-1].title}}</text>
                </div>
              </div> -->
              <!-- 推荐 -->
              <!-- <div>
                <div class="video-full-box mt30" style="padding-bottom:32px;">
                  <div style="position:relative;">
                      <image class="video-full-cover" :src="item.childs[0].indexpic"></image>
                      <image class="video-full-icon" :src="getLocalImgUrl('nytopic_videoicon.png')"></image>
                      <text class="video-title-box line1 fz34 cl-fff">{{item.childs[0].title}}</text>
                      <div class="flex-row-between flex-align video-info-box">
                        <text class="cl-fff fz20">{{item.childs[0].click_num}}万播放</text>
                        <div class="video-line"></div>
                        <text class="cl-fff fz20">{{item.childs[0].duration}}</text>
                      </div>
                  </div>
                </div>
                <div class="mb30 speical-box">
                    <text class="fz34 cl-333 line1">{{item.childs[1].title}}</text>
                    <text class="fz24 cl-b6 mt20">{{item.childs[1].brief}}</text>
                    <div class="flex-row-between" style="margin-bottom:24px;margin-top:24px;">
                      <image class="three-two-item" :src="img" v-for="(img,idx) in item.childs[1].imgs" :key="idx"></image>
                    </div>
                    <div class="flex-row-between">
                        <div class="flex-row-center">
                          <text class="fz22 cl-b6" style="margin-right:10px;">{{item.childs[1].source}}</text>
                          <text class="fz22 cl-b6">{{item.childs[1].time}}</text>
                        </div>
                        <div class="flex-row-center">
                          <image class="click-icon" :src="getLocalImgUrl('nytopic_icon.png')"></image>
                          <text class="fz22 cl-b6">{{item.childs[1].click_num}}人</text>
                        </div>
                      </div>
                  </div>
              </div> -->
            </div>
        </div>
        <!-- 朋友圈样式 -->
        <div v-if="styleType === 1 && timeLineList.length">
          <div class="timeline-box">
            <div class="timeline-item flex-row" :class="[index > 0 ? 'topic-border' : '']" v-for="(item,index) in timeLineList" :key="index" @click="goDetail(item.module_id,item.id)">
              <image class="avatar-img" :src="item.column_info.indexpic.host+item.column_info.indexpic.dir+item.column_info.indexpic.filepath+item.column_info.indexpic.filename"></image>
              <div class="timeline-content flex1">
                <text class="fz32 cl-333 mb10 timeline-user">{{item.column_name}}</text>
                <text class="fz28 cl-333 mb20">{{item.title}}</text>
                <!-- 视频 -->
                <div v-if="item.type === 'video'" class="timeline-video-box">
                    <image class="timeline-onepic img-radius" :src="item.index_pic"></image>
                    <image class="timeline-video-icon" :src="getLocalImgUrl('nytopic_videoicon.png')"></image>
                    <div class="flex-row-between flex-align video-info-box">
                      <text class="cl-fff fz20">{{(item.click_num/10000)}}万播放</text>
                      <div class="video-line"></div>
                      <text class="cl-fff fz20">{{item.duration_format}}</text>
                    </div>
                </div>
                <div v-else>
                  <!-- 一图 二图 三图 -->
                  <div class="flex-row-between flex-wrap" :class="[item.attachments.length === 4  || item.attachments.length > 6 ? 'pic-height1' : '',item.attachments.length === 5 || item.attachments.length === 6 ? 'pic-height2' : '']" v-if="item.attachments.length && item.attachments.length < 5">
                    <image
                      v-for="(img,i) in item.attachments"
                      :key="i"
                      :src="formatTimelinePic(item.indexpic,img.photo_key,item.attachments.length)"
                      class="img-radius"
                      :class="[item.attachments.length === 1 ? 'timeline-onepic' : '',item.attachments.length === 2 || item.attachments.length === 4? 'timeline-twopic' : '',item.attachments.length === 3 ? 'timeline-threepic' : '',item.attachments.length === 4 && i > 1 ? 'mt10' :'']"></image>
                  </div>
                  <!-- 四图以上 -->
                  <div class="flex-row flex-wrap" v-if="item.attachments.length && item.attachments.length > 4">
                    <image
                      v-for="(img,i) in item.attachments"
                      :key="i"
                      :src="item.indexpic.host+img.photo_key+'?imageView/0/h/194/w/194'"
                      class="img-radius timeline-threepic"
                      :class="[ i > 2 ? 'mt10' : '' , i % 3 !== 0 ? 'ml10' : '']"></image>
                  </div>
                </div>
                <!-- info -->
                <div class="timeline-info-box flex-row-between flex-align">
                    <text class="fz22 cl-b6 flex1">{{transTime(item.publish_time_stamp)}}</text>
                    <div class="flex-row-center" style="padding-left:60px;">
                      <image class="timeline-info-icon" :src="getLocalImgUrl('nytopic_icon1.png')"></image>
                      <text class="fz22 cl-b6">{{item.praises ? item.praises : '点赞'}}</text>
                    </div>
                    <div class="flex-row-center" style="padding-left:60px;">
                      <image class="timeline-info-icon" :src="getLocalImgUrl('nytopic_icon2.png')"></image>
                      <text class="fz22 cl-b6">{{item.comments ? item.comments : '评论'}}</text>
                    </div>
                    <div class="flex-row-center" style="padding-left:60px;">
                      <image class="timeline-info-icon" :src="getLocalImgUrl('nytopic_icon3.png')"></image>
                      <text class="fz22 cl-b6">分享</text>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import RefreshStyle from '../../components/common/RefreshStyle'
import articleDefault from '../../components/nongyingSpecial/articleDefault'
import galleryDefault from '../../components/nongyingSpecial/galleryDefault'
import videoDefault from '../../components/nongyingSpecial/videoDefault'
import style1 from '../../components/nongyingSpecial/style1'
import style2 from '../../components/nongyingSpecial/style2'
import style3 from '../../components/nongyingSpecial/style3'
import style4 from '../../components/nongyingSpecial/style4'
export default {
  name: 'ModWeexStyle18',
  components: {
    RefreshStyle,
    articleDefault,
    galleryDefault,
    videoDefault,
    style1,
    style2,
    style3,
    style4
  },
  data () {
    return {
      styleType: 0,
      columnId: null,
      refreshing: false,
      loading: false,
      hasMore: true,
      config: {},
      api: {},
      detail: {},
      commonList: [],
      timeLineList: []
    }
  },
  methods: {
    back () {
      this.goBack()
    },
    // 分享
    share () {
      const param = {
        title: this.detail.title,
        brief: this.detail.brief,
        imageLink: this.detail.indexpic.host + this.detail.indexpic.dir + this.detail.indexpic.filepath + this.detail.indexpic.filename,
        contentUrl: this.detail.content_url
      }
      nativeUtil.shareTo(param)
    },
    getList (id) {
      const param = { topic_id: id }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (this.styleType === 0) {
          this.commonList = this.group(res, 'column_id')
          this.refreshing = false
        } else {
          this.timeLineList = res
          this.refreshing = false
        }
      }, (e) => {
        console.log(e)
      })
    },
    getDetail () {
      const param = { id: this.columnId }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        this.detail = res[0]
        this.styleType = this.detail.style_type === 0 ? 0 : 1
        this.getList(this.columnId)
      }, (e) => {
        console.log(e)
      })
    },
    goColumn (id, title) {
      this.jumpWithParams('ModWeexStyle18List', {id, title})
    },
    goDetail (type, id) {
      nativeUtil.linkTo(`${type}#${id}`)
    },
    formatTimelinePic (indexpic, key, length) {
      if (length === 1) { return `${indexpic.host + indexpic.dir + indexpic.filepath + indexpic.filename}?imageView/0/h/300/w/602` }
      if (length === 3) { return `${indexpic.host}${key}?imageView/0/h/194/w/194` }
      if (length === 2 || length === 4) { return `${indexpic.host}${key}?imageView/0/h/296/w/296` }
    },
    // 下拉刷新
    onrefresh () {
      this.refreshing = true
      this.getDetail()
    },
    // 根据某一属性分组
    unique (arr) {
      const res = new Map()
      return arr.filter((a) => !res.has(a) && res.set(a, 1))
    },
    group (arr, k) {
      let allGroupName = arr.map(item => { return item[k] })
      let typeList = this.unique(allGroupName)
      let list = []
      typeList.forEach(ele => {
        let obj = {}
        obj.list = []
        obj.list = arr.filter(sele => ele === sele[k])
        obj.name = ele
        list.push(obj)
      })
      return list
    },
    // 获取配置文件
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'api': {
            'content_detail': 'http://mapi.plus.ntv.cn/api/v1/special_column_content.php',
            'home_column': 'http://mapi.plus.ntv.cn/api/v1/special_detail.php',
            'home_list': 'http://mapi.plus.ntv.cn/api/v1/special_content.php'
          }
        }
        this.api = this.config.api
        this.columnId = 76
        this.getDetail()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'special2'
        }
        this.columnId = weex.config.id
        nativeUtil.log('~~~~~~~~' + this.columnId)
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        nativeUtil.log('~~~~~~~~~' + this.api)
        this.getDetail()
      }
    }
  },
  created () {
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">
@import '../../style/common.scss';
.bg{
    background-color:rgba(246,246,246,1);;
}
.top{
  position: relative;
}
.top-bar{
  position: absolute;
  padding: 0 28px;
  left: 0;
  right: 0;
  top: 70px;
}
.back-icon{
  width: 24px;
  height: 38px;
}
.set-icon{
  width: 40px;
  height: 8px;
}
.cover-img{
    height: 376px;
}
.brief-box{
    padding: 30px 30px 24px 24px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}
.brief-title{
    font-weight:500;
    color:rgba(51,51,51,1);
}
.brief-content{
    color: #B6B6B6;
    padding-top: 24px;
}
.nav-list{
    height: 116px;
    padding: 30px 30px 24px 24px;
}
.nav-item{
    font-size: 24px;
    height: 60px;
    line-height: 60px;
    padding-left: 28px;
    padding-right: 28px;
    background-color: #fff;
    margin-right: 32px;
}
.topic-box{
  background-color: #fff;
  margin-bottom: 16px;
  padding-top: 40px;
  padding-left: 24px;
  padding-right: 24px;
}
.topic-border{
  border-top-style: solid;
  border-top-color: #eee;
  border-top-width: 1px;
}
.topic-icon{
  width: 32px;
  height: 32px;
  margin-right: 12px;
}
.topic-title{
  color: #333;
  font-weight:500;
}
.more-icon{
  width: 16px;
  height: 24px;
}
.more-text{
  color:rgba(182,182,182,1);
  margin-right: 10px;
}
.topic-item{
  padding-top: 30px;
  padding-bottom: 30px;
}
.timeline-box{
  padding-top: 30px;
  padding-left: 24px;
  padding-right: 24px;
}
.timeline-item{
  padding-top: 24px;
  padding-bottom: 24px;
}
.timeline-user{
  font-weight: 500;
}
.timeline-onepic{
  width: 602px;
  height: 300px;
}
.timeline-twopic{
  width: 296px;
  height: 296px;
}
.timeline-threepic{
  width: 194px;
  height: 194px;
}
.pic-height1{
  height: 602px;
}
.pic-height2{
  height: 398px;
}
.timeline-video-box{
  position: relative;
}
.timeline-video-icon{
  width: 50px;
  height: 56px;
  position: absolute;
  left: 276px;
  bottom: 122px;
}
.timeline-info-box{
  margin-top: 26px;
}
.timeline-info-icon{
  width: 26px;
  height: 26px;
  margin-right: 12px;
}
.avatar-img{
  width: 80px;
  height: 80px;
  margin-right: 20px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
}
.video-full-icon {
  width: 50px;
  height: 56px;
  position: absolute;
  left: 326px;
  top: 148px;
}
.video-info-box {
  position: absolute;
  bottom: 16px;
  left: 20px;
}
.video-title-box {
  position: absolute;
  width: 664px;
  left: 20px;
  bottom: 56px;
}
.video-line {
  background-color: rgba(255, 255, 255, 0.4);
  width: 2px;
  height: 16px;
  margin-left: 12px;
  margin-right: 12px;
}
</style>
