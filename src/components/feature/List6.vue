// 特写 上标题 中图 下描述
<template>
     <div class="list-wrapper">
         <div class="title" @click="goMore">
             <text class="title-left">{{title}}</text>
             <div v-if="showMore" class="more-box">
                <!-- <text class="more-text">更多</text> -->
                <image class="more-icon" :src="getLocalImgUrl('feature_listmore.png')"></image>
            </div>
         </div>
         <image class="title-bottom" :src="getLocalImgUrl('feature_listborder.png')"></image>
        <div class="item" v-for="(item,index) in data" :key="index" @click="goDetail(item)" :class="[index>0?'pt50':'']">
            <div class="book-box">
                <text class="book-title">{{item.title}}</text>
                <text class="book-author">{{item.author}}</text>
            </div>
            <image :src="item.indexpic.host + item.indexpic.dir + '651x291/' + item.indexpic.filepath + item.indexpic.filename" class="book-img"></image>
            <text class="brief">{{item.brief}}</text>
        </div>
    </div>
</template>

<script>
export default {
  props: ['data', 'title', 'id', 'showMore', 'type'],
  name: 'List6',
  methods: {
    goMore () {
      this.jumpWithParams('ModWeexStyle6FeatureHomeWriteList', {id: this.id, title: this.title})
    },
    goDetail (item) {
      if (this.type === 'book') {
        const idx = item.outlink.indexOf('=')
        const id = item.outlink.slice(idx + 1, item.outlink.length)
        this.jumpWithParams('ModWeexStyle6FeatureHomeListenDetail', {id})
      } else if (this.type === 'people') {
        this.jumpWithParams('ModWeexStyle7FeatureHotPeopleList', {id: item.content_fromid})
      } else {
        this.jumpWithParams('ModWeexStyle6FeatureHomeArticleDetail', {id: item.id, type: 'article'})
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
.more-icon{
    width: 10px;
    height: 14px;
}
.title-bottom{
    width: 702px;
    height: 13px;
}
.item{
    padding-top: 33px;
    padding-left: 26px;
    padding-right: 26px;
}
.pt50{
    padding-top: 50px;
}
.book-img{
    width: 651px;
    height: 291px;
    position: relative;
    margin-bottom: 20px;
    margin-top: 9px;
}
.book-title{
    font-size: 32px;
    color:#6A6A6A;
}
.book-author{
    font-size: 28px;
    color:#9C9C9C;
}
.brief{
    font-size: 32px;
    line-height: 42px;
    color:#9C9C9C;
    lines:3;
    width: 651px;
    text-overflow:ellipsis;
}
</style>
