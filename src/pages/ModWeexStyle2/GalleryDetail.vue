<template>
      <div class="wrapper">
            <wxc-loading :show="isShow" type="default"></wxc-loading>
            <div class="wrapper" v-if="!isShow">
              <head type="black"></head>
              <div class="main">
                  <slider  @change="imgSlideChage" class="slider" interval="5000" auto-play="true" :index="imgslideIndex">
                    <div class="img-box" v-for="(img,index) in data.tuji_pics" :key="index">
                      <image class="image" resize="cover" :src="img.pic.host+img.pic.filename"></image>
                    </div>
                  </slider>
                  <div class="img-info">
                    <div class="img-index">
                      <text class="index-text">{{imgslideIndex+1}}</text>
                      <text class="total-text">/{{data.tuji_pics.length}}</text>
                    </div>
                    <text class="img-brief">{{data.tuji_pics[imgslideIndex].brief}}
                    </text>

                  </div>
              </div>
              <!-- 底部评论 -->
              <comment type="black" :data="data"></comment>
          </div>
      </div>

</template>

<script>
import { WxcLoading } from 'weex-ui'
import relatedRead from '../../components/detail/RelatedRead.vue'
import comment from '../../components/detail/Comment.vue'
import head from '../../components/detail/Head.vue'
export default {
  name: 'NewsDetail',
  components: {
    relatedRead,
    comment,
    head,
    WxcLoading
  },
  data () {
    return {
      id: '',
      data: [],
      imgslideIndex: 0,
      isShow: false
    }
  },
  methods: {
    // 图片轮播切换
    imgSlideChage (event) {
      this.imgslideIndex = event.index
    }
  },
  mounted () {
  },
  created () {
    this.isShow = true
    this.id = this.getQuery().id
    this.$httpRequest(
      this.$getHttpUrl('newsDatail'),
      {
        id: this.getQuery().id
      },
      'get'
    ).then((res) => {
      if (!res.error_code) {
        this.data = res
        this.isShow = false
      } else {
        this.messageTip(res.error_message)
      }
    }, (e) => {
      this.isShow = false
    })
  }
}
</script>

<style scoped lang="scss">
 @import "../../style/common.scss";
.wrapper{
  width: 750px;
  flex:1;
}
.main{
  width: 750px;
  flex:1;
  padding-bottom:100px;
  background-color: #191818
}
.slider{
  margin-top:188px;
  margin-bottom:154px;
  width: 750px;
  height:500px;
}
.img-box{
  width: 750px;
  height:500px;
}
.image{
  width: 750px;
  height:500px;
}
.img-info{
  width: 750px;
  padding-left:32px;
  padding-right:32px;
}
.img-index{
  flex-direction: row;
  align-items: center;
}
.index-text{
  font-size: 36px;
  color: #F74141;
}
.total-text{
  font-size: 36px;
  color: #FFFFFF;
}
.img-brief{
  margin-top:20px;
  width: 686px;
  font-size: 32px;
  color:#cccccc;
  lines:3;
  text-overflow:ellipsis;
  line-height: 52px;
}
</style>
