// 左右视频列表
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
            <div class="item" v-for="(item,index) in data" :key="index" @click="goDetail(item.content_fromid)">
                <image :src="item.indexpic.host + item.indexpic.dir + '300x300/' + item.indexpic.filepath + item.indexpic.filename" class="book-img">
                    <image :src="getLocalImgUrl('feature_audio.png')" class="play-icon" ></image>
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
  props: ['data', 'title', 'id'],
  name: 'List7',
  methods: {
    goMore () {
      this.jumpWithParams('ModWeexStyle6FeatureHomeSpeakList1', {id: this.id, title: this.title})
    },
    goDetail (id) {
    //   this.jumpWithParams('ModWeexStyle6FeatureHomeListenVideo', {id})
      this.jumpWithParams('ModWeexStyle6FeatureHomeListenDetail', {id, type: 'audio'})
    }
  }
}
</script>

<style scoped lang="scss">
.list-wrapper{
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 25px;
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
.item-box{
    flex-direction: row;
    justify-content: space-between;
    padding-top: 23px;
    padding-left: 24px;
    padding-right: 24px;
}
.item{
    align-items: center;
}
.book-img{
    width: 300px;
    height: 300px;
    margin-bottom: 22px;
    border-top-left-radius: 150px;
    border-top-right-radius: 150px;
    border-bottom-left-radius: 150px;
    border-bottom-right-radius: 150px;
    position: relative;
}
.play-icon{
    position: absolute;
    width: 90px;
    height: 90px;
    left: 105px;
    top: 105px;
}
.book-title{
    font-size: 36px;
    color:#6A6A6B;
    lines:1;
    width: 200px;
    text-overflow:ellipsis;
    text-align: center;
}
.book-author{
    font-size: 28px;
    color:#9C9C9D;
    text-align: center;
}
</style>
