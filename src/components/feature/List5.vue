// 特写 书籍列表 左图右文字
<template>
     <div class="list-wrapper">
        <div class="title" @click="goMore">
            <text class="title-left">{{title}}</text>
            <div v-if="showMore" class="more-box">
                <text class="more-text"></text>
                <image class="more-icon" :src="getLocalImgUrl('feature_listmore.png')"></image>
            </div>
        </div>
        <image class="title-bottom" :src="getLocalImgUrl('feature_listborder.png')"></image>
        <div class="item" v-for="(item,index) in data" :key="index" @click="goDetail(item)">
            <image :src="item.indexpic.host + item.indexpic.dir + '170x250/' + item.indexpic.filepath + item.indexpic.filename " class="book-img"></image>
            <div class="book-box" style="flex:1;">
                <text class="book-title">{{item.title}}</text>
                <text class="book-author">{{item.keywords}}</text>
                <text class="book-brief" v-if="item.brief === ''">暂无简介</text>
                <text class="book-brief" v-else>{{item.brief}}</text>
            </div>
            <!-- 音频有播放按钮 -->
            <image v-if="type === 'audio' || item.column_type === '2'" class="audio-icon" :src="getLocalImgUrl('feature_audio.png')"></image>
        </div>
    </div>
</template>

<script>
export default {
  props: ['data', 'title', 'type', 'showMore', 'id'],
  name: 'List4',
  methods: {
    goDetail (item) {
      if (this.type === 'special') {
        switch (item.column_type) {
          case '1':
            const idx = item.outlink.indexOf('=')
            const id = item.outlink.slice(idx + 1, item.outlink.length)
            this.jumpWithParams('ModWeexStyle6FeatureHomeListenDetail', {id})
            break
          case '2':
            this.jumpWithParams('ModWeexStyle6FeatureHomeListenDetail', {id: item.content_fromid, type: 'audio'})
            break
        }
      } else {
        switch (this.type) {
          case 'audio':
            this.jumpWithParams('ModWeexStyle6FeatureHomeListenDetail', {id: item.content_fromid, type: 'audio'})
            break
          case 'book':
            this.jumpWithParams('ModWeexStyle6FeatureHomeListenDetail', {id: item.content_fromid})
            break
          case 'people':
            this.jumpWithParams('ModWeexStyle7FeatureHotPeopleList', {id: item.content_fromid})
            break
          default:
            this.jumpWithParams('ModWeexStyle6FeatureHomeArticleDetail', {id: item.id, type: 'article'})
        }
      }
    },
    goMore () {
      if (!this.showMore) return
      this.jumpWithParams('ModWeexStyle7FeatureHotEventList', {id: this.id, title: this.title})
    }
  }
}
</script>

<style scoped lang="scss">
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
    margin-bottom: 30px;
}
.item{
    flex-direction: row;
    padding-left: 26px;
    padding-right: 26px;
    margin-bottom: 50px;
}
.book-img{
    width: 170px;
    height: 250px;
    margin-right: 20px;
    position: relative;
}
.book-title{
    font-family:PingFang SC;
    font-size: 32px;
    color:#6A6A6A;
    lines:1;
}
.book-author{
    font-size: 28px;
    color: #9c9c9c;
    height: 34px;
    margin-bottom: 48px;
}
.book-brief{
    font-size: 32px;
    color:#9c9c9c;
    lines:3;
    width: 458px;
    line-height: 42px;
    text-overflow:ellipsis;
}
.audio-icon{
    width: 44px;
    height: 44px;
    position: absolute;
    top: 187px;
    left: 133px;
}
</style>
