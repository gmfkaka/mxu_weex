// 特写 视频列表
<template>
     <div class="list-wrapper">
        <div class="title" @click="goMore">
             <text class="title-left">{{title}}</text>
             <div v-if="showMore" class="more-box">
                <text class="more-text">更多</text>
                <image class="more-icon" :src="getLocalImgUrl('feature_listmore.png')"></image>
            </div>
        </div>
        <image class="title-bottom" :src="getLocalImgUrl('feature_listborder.png')"></image>
        <div class="item" v-for="(item,index) in data" :key="index" @click="goDetail(item)">
            <image :src="item.indexpic.host + item.indexpic.dir + '650x290/' + item.indexpic.filepath + item.indexpic.filename" class="book-img"></image>
            <div class="book-box">
                <text class="book-title">{{item.title}}</text>
                <text class="book-author">{{item.author}}</text>
            </div>
            <text v-if="showBreif" class="brief">{{item.brief}}</text>
            <!-- 视频有播放按钮 -->
            <image v-if="item.bundle_id === 'livmedia'" class="video-icon" :src="getLocalImgUrl('feature_audio2.png')"></image>
        </div>
    </div>
</template>

<script>
export default {
  props: ['data', 'title', 'showBreif', 'showMore', 'id'],
  name: 'List3',
  methods: {
    goDetail (item) {
      item.bundle_id === 'livmedia' && this.jumpWithParams('ModWeexStyle6FeatureHomeListenVideo', {id: item.id})
      item.bundle_id === 'news' && this.jumpWithParams('ModWeexStyle6FeatureHomeArticleDetail', {id: item.id})
    },
    goMore () {
      this.jumpWithParams('ModWeexStyle6FeatureHomeVideoList', {id: this.id, title: this.title})
    }
  }
}
</script>

<style scoped lang="scss">
.list-wrapper{
    padding-left: 10px;
    padding-right: 10px;
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
.item{
    padding-top: 30px;
    padding-left: 26px;
    padding-right: 26px;
}
.book-img{
    width: 650px;
    height: 290px;
    position: relative;
}
.book-title{
    padding-top: 15px;
    font-size: 32px;
    color:#6a6a6a;
    lines:1;
}
.book-author{
    font-size: 28px;
}
.video-icon{
    width: 60px;
    height: 60px;
    position: absolute;
    left: 321px;
    top: 143px;
}
.brief{
    width: 650px;
    font-size: 32px;
    color:#9c9c9c;
    lines:3;
    text-overflow:ellipsis;
}
</style>
