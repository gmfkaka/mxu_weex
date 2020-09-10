// 特写 书籍列表 左文字右图
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
        <div class="item" v-for="(item,index) in data" :key="index" @click="goDetail(item.id)">
            <div class="book-box">
                <text class="book-title">{{item.title}}</text>
                <!-- <text class="book-author" v-if="item.author">{{item.author}}</text> -->
                <text class="book-brief" v-if="item.brief">{{item.brief}}</text>
            </div>
            <image :src="item.indexpic.host + item.indexpic.dir + '170x170/' + item.indexpic.filepath + item.indexpic.filename " class="book-img"></image>
        </div>
    </div>
</template>

<script>
export default {
  props: ['data', 'title', 'id', 'target'],
  name: 'List4',
  methods: {
    goDetail (id) {
      this.jumpWithParams('ModWeexStyle6FeatureHomeArticleDetail', {id, type: 'article'})
    },
    goMore () {
      if (this.target === 'hot') {
        this.jumpWithParams('ModWeexStyle7FeatureHotEventList', {id: this.id, title: this.title})
      } else {
        this.jumpWithParams('ModWeexStyle6FeatureHomeListenList', {id: this.id, title: this.title, main_title: '首页', type: '1'})
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
    flex-direction: row;
    justify-content: space-between;
    padding-top: 30px;
    padding-left: 20px;
    padding-right: 20px;
}
.book-img{
    width: 169px;
    height: 169px;
    position: relative;
    margin-left: 30px;
}
.book-title{
    font-size: 32px;
    color: #6a6a6a;
    font-family:PingFang SC;
    margin-bottom: 44px;
    width: 460px;
    text-overflow:ellipsis;
    lines:1;
}
.book-author{
    font-family:PingFang SC;
    font-size: 28px;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #6a6a6a;
}
.book-brief{
    font-family:PingFang SC;
    font-size: 32px;
    color:#9c9c9c;
    lines:2;
    width: 460px;
    text-overflow:ellipsis;
}
</style>
