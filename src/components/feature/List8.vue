// 4个视频列表
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
         <div class="item-box">
            <div class="item" v-for="(item,index) in data" :key="index" @click="goDetail(item)" :class="[ index < 2 ? 'mb52' : '']">
                <image :src="item.indexpic.host + item.indexpic.dir + '320x160/' + item.indexpic.filepath + item.indexpic.filename" class="book-img">
                    <image v-if="item.bundle_id === 'livmedia'" :src="getLocalImgUrl('feature_audio2.png')" class="play-icon" ></image>
                </image>
                <div class="book-box">
                    <text class="book-title">{{item.title}}</text>
                    <text class="book-author">{{item.author}}</text>
                </div>
            </div>
         </div>
    </div>
</template>

<script>
export default {
  props: ['data', 'title', 'id', 'type', 'target'],
  name: 'List8',
  data () {
    return {
      list: []
    }
  },
  methods: {
    goMore () {
      if (this.type === 'sp') {
        this.jumpWithParams('ModWeexStyle6FeatureHomeLook', {type: 'video'})
      } else {
        if (this.target === 'look') {
          this.jumpWithParams('ModWeexStyle6FeatureHomeSpeakList2', {id: this.id, title: this.title, main_title: '我看'})
        } else {
          this.jumpWithParams('ModWeexStyle6FeatureHomeSpeakList2', {id: this.id, title: this.title})
        }
      }
    },
    goDetail (item) {
      item.bundle_id === 'livmedia' && this.jumpWithParams('ModWeexStyle6FeatureHomeListenVideo', {id: item.id})
      item.bundle_id === 'news' && this.jumpWithParams('ModWeexStyle6FeatureHomeArticleDetail', {id: item.id})
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
    margin-bottom: 30px;
    background-color: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
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
.item-box{
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-top: 28px;
    padding-left: 26px;
    padding-right: 26px;
}
.mb52{
    margin-bottom: 52px;
}
.book-img{
    width: 320px;
    height: 160px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    position: relative;
}
.play-icon{
    position: absolute;
    width: 38px;
    height: 38px;
    left: 136px;
    top: 61px;
}
.book-title{
    padding-top: 16px;
    font-size: 32px;
    color:#6A6A6A;
    lines:1;
    width: 320px;
    text-overflow:ellipsis;
}
.book-author{
    font-size: 28px;
    margin-bottom: 20px;
    color:#6a6a6a;
}
</style>
