// 特写 首页列表 上标题 下面三本书
// type 是否显示音频按钮
// changeAble 是否显示换一换按钮
// target 跳转的目标路径
<template>
     <div class="list-wrapper">
         <div class="title" @click="goMore">
             <text class="title-left">{{title}}</text>
             <div class="more-box">
                <!-- <text class="more-text">更多</text> -->
                <image class="more-icon" :src="getLocalImgUrl('feature_listmore.png')"></image>
            </div>
         </div>
         <image class="title-bottom" :src="getLocalImgUrl('feature_listborder.png')"></image>
         <div class="book-box" v-if="!ifSlider">
             <div class="book-item" v-for="(item,index) in showList" :key="index" @click="goDetail(item)">
                 <image :src="item.indexpic.host + item.indexpic.dir + '170x250/' + item.indexpic.filepath + item.indexpic.filename " class="book-img">
                 </image>
                 <text class="book-title">{{item.title}}</text>
                 <text class="book-author" v-if="!hideAuthor">{{item.keywords}}</text>
                <!-- 音频有播放按钮 -->
                <image v-if="type === 'audio'" class="audio-icon" :src="getLocalImgUrl('feature_audio.png')"></image>
             </div>
         </div>
         <!-- 轮播展示 -->
         <div class="book-box" v-else>
            <slider v-if="showList.length" class="slider" interval="5000" auto-play="true">
                <div class="slider-item" v-for="(item,index) in sliderList" :key="index">
                    <div class="book-item" v-for="(data,idx) in item" :key="idx" :class="[idx<2?'mr70':'']" @click="goDetail(data)">
                      <image :src="data.indexpic.host + data.indexpic.dir + '170x250/' + data.indexpic.filepath + data.indexpic.filename " class="book-img">
                      </image>
                      <text class="book-title">{{data.title}}</text>
                      <text class="book-author" v-if="!hideAuthor">{{data.keywords}}</text>
                      <!-- 音频有播放按钮 -->
                      <image v-if="type === 'audio'" class="audio-icon" :src="getLocalImgUrl('feature_audio.png')"></image>
                    </div>
                </div>
            </slider>
         </div>
         <text class="change-text" v-if="changeAble" @click="change">换一换</text>
    </div>
</template>

<script>
export default {
  props: ['data', 'title', 'id', 'type', 'changeAble', 'target', 'hideAuthor', 'ifSlider'],
  name: 'Home',
  data () {
    return {
      showList: [],
      sliderList: [],
      index: 0
    }
  },
  created () {
    this.showList = this.data.slice(0, 3)
    this.sliderList = this.chunk(this.data, 3)
  },
  methods: {
    goMore () {
      switch (this.target) {
        case 'look':
          this.jumpWithParams('ModWeexStyle6FeatureHomeLook', {})
          break
        case 'listen':
          this.jumpWithParams('ModWeexStyle6FeatureHomeListen', {})
          break
        case 'book':
          this.jumpWithParams('ModWeexStyle7FeatureHotBookList', {id: this.id, title: this.title})
          break
        case 'hotPeople':
          this.jumpWithParams('ModWeexStyle7FeatureHotBookList2', {id: this.id, title: this.title, type: 'people'})
          break
        case 'mylook':
          this.jumpWithParams('ModWeexStyle6FeatureHomeListenList', {id: this.id, title: this.title, main_title: '我看', type: 'book'})
          break
        case 'special':
          this.jumpWithParams('ModWeexStyle6FeatureHomeListenList', {id: this.id, title: this.title, main_title: '我听', style: 'special'})
          break
        case 'special2':
          this.jumpWithParams('ModWeexStyle6FeatureHomeListenList', {id: this.id, title: this.title, main_title: '我看', style: 'special', type: 'book'})
          break
        default:
          if (!this.id) return
          this.jumpWithParams('ModWeexStyle6FeatureHomeListenList', {id: this.id, title: this.title})
      }
    },
    // 换一换
    change () {
      if (this.showList.length < 3 || this.index + 3 === this.data.length) {
        this.index = 0
      } else {
        this.index += 3
      }
      this.showList = this.data.slice(this.index, this.index + 3)
    },
    goDetail (item) {
      switch (this.type) {
        case 'audio':
          this.jumpWithParams('ModWeexStyle6FeatureHomeListenDetail', {id: item.content_fromid, type: 'audio'})
          break
        case 'people':
          this.jumpWithParams('ModWeexStyle7FeatureHotPeopleList', {id: item.content_fromid})
          break
        default:
          // const idx = item.outlink.indexOf('=')
          // const id = item.outlink.slice(idx + 1, item.outlink.length)
          this.jumpWithParams('ModWeexStyle6FeatureHomeListenDetail', {id: item.content_fromid})
      }
    }
  }
}
</script>

<style scoped lang="scss">
.list-wrapper{
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 32px;
    padding-bottom: 30px;
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
.book-box{
    flex: 1;
    flex-direction: row;
    padding-top: 30px;
    padding-left: 27px;
    padding-right: 27px;
    justify-content: space-between;
}
.book-img{
    width: 170px;
    height: 250px;
    position: relative;
}
.book-title{
    font-family:PingFang SC;
    width: 160px;
    lines:1;
    text-overflow:ellipsis;
    padding-top: 20px;
    font-size: 32px;
    color: #6a6a6a;
}
.book-author{
    // margin-top: 10px;
    font-size: 28px;
    color: #9C9C9C;
}
.change-text{
    font-size: 28px;
    padding-top: 40px;
    text-align: center;
    color: #6aaf93;
}
.audio-icon{
    width: 43px;
    height: 43px;
    position: absolute;
    left: 107px;
    top: 187px;
}
.slider{
  width: 650px;
  min-height: 320px;
}
.slider-item{
  width: 650px;
  min-height: 320px;
  flex-direction: row;
  // justify-content: space-between;
}
.mr70{
  margin-right: 70px;
}
</style>
