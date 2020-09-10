<template>
     <div class="home-wrapper pos-full" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStylePaddingTop" show-scrollbar=false>
        <div class="top flex-align flex-row">
            <image class="back-icon" :src="getLocalImgUrl('nytopic_back.png')" @click="back"></image>
            <text class="flex1 fz36 cl-fff" style="padding-left:260px;">{{title}}</text>
        </div>
        <scroller class="main flex1 w100" show-scrollbar=false>
            <refresh @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'" class="refresh">
              <refresh-style :mLeft="340"></refresh-style>
            </refresh>
            <div class="list-item" :class="[index > 0 ? 'topic-border' : '']" v-for="(item,index) in list" :key="index" @click="goDetail(item.id,item.module_id)">
                <!-- 默认样式 cssid 0 -->
                <div v-if="item.css_id === 0">
                  <!-- 文稿 左图右文字 -->
                  <article-default v-if="item.type === 'article'" :data="item"></article-default>
                  <!-- 图集 -->
                  <gallery-default v-if="item.type === 'gallery'" :data="item"></gallery-default>
                  <!-- 视频 -->
                  <video-default v-if="item.type === 'video'" :data="item"></video-default>
                </div>
                <!-- 无图纯标题样式 cssid 1-->
                <style1 v-if="item.css_id === 1" :data="item"></style1>
                <!-- 左标题右图 cssid 2-->
                <style2 v-if="item.css_id === 2" :data="item"></style2>
                <!-- 三图 cssid 3-->
                <style3 v-if="item.css_id === 3" :data="item"></style3>
                <!-- 上标题下大图 cssid 4-->
                <style4 v-if="item.css_id === 4" :data="item"></style4>
            </div>
        </scroller>
        <!-- 特别推荐 -->
        <!-- <div class="main">
            <div class="list-item" :class="index > 0 ? 'topic-border' : '' " v-for="(item,index) in specialList" :key="index" style="padding-top:0;padding-bottom:0;">
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
            </div>
        </div> -->
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
  name: 'ModWeexStyle18List',
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
      title: '',
      id: null,
      refreshing: false,
      list: []
    }
  },
  methods: {
    getData (id) {
      const param = { special_column_id: id }
      this.$httpRequest(this.api.content_detail, param, 'get').then(res => {
        this.list = res
        this.refreshing = false
      }, (e) => {
        console.log(e)
      })
    },
    back () {
      this.goBack()
    },
    // 下拉刷新
    onrefresh () {
      this.offset = 0
      this.refreshing = true
      this.getData(this.id)
    },
    // 上拉加载
    onloading () {
      this.loading = true
      if (!this.hasMore) {
        this.loading = false
        return
      }
      this.offset += 10
      this.getData()
    },
    goDetail (id, type) {
      nativeUtil.linkTo(`${type}#${id}`)
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
        this.title = this.getQuery().title
        this.id = this.getQuery().id
        this.getData(this.id)
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'special2'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        this.title = this.getQuery().title
        this.id = this.getQuery().id
        this.getData(this.id)
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
.top{
    height: 128px;
    background-color:rgba(247,64,48,1);
    padding-top: 54px;
    padding-left: 28px;
}
.back-icon{
    width: 24px;
    height: 38px;
}
.topic-border{
    border-top-style: solid;
    border-top-color: #eee;
    border-top-width: 1px;
}
.main{
    padding-left: 24px;
    padding-right: 24px;
}
.list-item{
    padding-top: 30px;
    padding-bottom: 30px;
}
.video-title-box{
  position: absolute;
  width: 664px;
  left: 20px;
  bottom: 56px;
}
</style>
