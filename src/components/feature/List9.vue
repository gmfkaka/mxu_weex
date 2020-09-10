// 特写 书籍列表 左圆图右文字
<template>
     <div class="list-wrapper">
        <div class="title">
            <text class="title-left">{{title}}</text>
        </div>
        <image class="title-bottom" :src="getLocalImgUrl('feature_listborder.png')"></image>
        <div class="item" v-for="(item,index) in data" :key="index" @click="goDetail(item)">
            <image :src="item.indexpic.host + item.indexpic.dir + '150x150/' + item.indexpic.filepath + item.indexpic.filename " class="book-img">
            </image>
            <div class="book-box">
                <text class="book-title">{{item.title}}</text>
                <text class="book-author">{{item.author}}</text>
                <text class="book-brief" v-if="item.brief">{{item.brief}}</text>
            </div>
            <!-- 音频有播放按钮 -->
            <image v-if="type === 'audio'" class="audio-icon" :src="getLocalImgUrl('feature_audio.png')"></image>
        </div>
    </div>
</template>

<script>
export default {
  props: ['data', 'title', 'type'],
  name: 'List9',
  methods: {
    goDetail (item) {
      if (this.type === 'audio') {
        // this.jumpWithParams('ModWeexStyle6FeatureHomeListenAudio', {id: item.id})
        this.jumpWithParams('ModWeexStyle6FeatureHomeListenDetail', {id: item.content_fromid, type: 'audio'})
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
.more-text{
    font-size: 28px;
    color:rgba(211,211,211,1);
    margin-right: 10px;
    padding-bottom: 5px;
}
.title-bottom{
    width: 702px;
    height: 13px;
}
.item{
    flex-direction: row;
    padding-top: 60px;
    padding-left: 20px;
}
.book-img{
    width: 200px;
    height: 200px;
    margin-right: 20px;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
    position: relative;
}
.book-title{
    padding-top: 20px;
    // padding-bottom: 10px;
    font-size: 36px;
    color: #6a6a6a;
}
.book-author{
    font-size: 28px;
    // margin-bottom: 5px;
    color: #9c9c9d;
}
.book-brief{
    font-size: 32px;
    color:#9c9c9c;
    lines:1;
    width: 420px;
    text-overflow:ellipsis;
    margin-top: 34px;
}
.audio-icon{
    width: 60px;
    height: 60px;
    position: absolute;
    left: 90px;
    top: 130px;
}
</style>
