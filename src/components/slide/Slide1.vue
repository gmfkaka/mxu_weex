<template>
   <div class="img-slide-box">
        <slider class="img-slide"
        @change="imgSlideChage"
        auto-play="true"
        interval="5000"
        :index="imgslideIndex">
            <div class="slide-img-items" v-for="(item,index) in dataList" :key="index">
                <image class="images" resize="cover" :src="item.index_pic" @click="jumpDetail(item)"></image>
                <!-- 标题 -->
                <div class="slide-title-box">
                <text class="slide-text">{{item.title}}</text>
                </div>
            </div>

        </slider>
        <!-- 轮播指示器 -->
        <div class="indicator-box">
            <div class="indicator-item"  v-for="(item,index) in dataList" :key="index"
            :class="[imgslideIndex==index?'active-indicator':'common-indicator']"></div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['dataList'],
  name: 'Slide1',
  data () {
    return {
      imgslideIndex: 0
    }
  },
  methods: {
    // 图片轮播切换
    imgSlideChage (event) {
      this.imgslideIndex = event.index
    },
    // 跳转详情页
    jumpDetail (item) {
      if (item.type === 'article') {
        this.jumpWithParams('NewsDetail', {id: item.id})
      } else if (item.type === 'gallery') {
        this.jumpWithParams('GalleryDetail', {id: item.id})
      } else if (item.type === 'topic') {
        this.jumpWithParams('TopicDetail', {id: item.id})
      }
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.img-slide-box{
    width: 750px;
    height:400px;
    position: relative;
}
.slide-img-items{
    width: 750px;
    height:400px;
    position: relative;
}
.img-slide{
    width: 750px;
    height:400px;
}
.images{
    width: 750px;
    height:400px;
}
.indicator-box{
    position: absolute;
    left:32px;
    bottom:20px;
    flex-direction: row;
}
.indicator-item{
    margin-right:4px;
}
.active-indicator{
    width: 36px;
    height: 4px;
    background-color: #ffffff
}
.common-indicator{
    width: 16px;
    height: 4px;
    background-color: rgba(rgb(255, 255, 255),0.4)
}
.slide-title-box{
    position: absolute;
    bottom:54px;
    height:34px;
    left:32px;
    right:32px;
}
.slide-text{
    color:#ffffff;
    font-size: 28px;
    text-overflow:ellipsis;
    lines:1;
}
</style>
