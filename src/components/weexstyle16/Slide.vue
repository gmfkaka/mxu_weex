<template>
    <slider v-if="sliderList.length" class="slider" interval="5000" auto-play="true">
        <div class="slider-item" v-for="(item,idx) in sliderList" :key="idx" @click="goDetail(item)">
          <!-- <image class="slider-img" resize="cover" :src="item.index_pic"></image> -->
          <image class="slider-img" resize="cover" :src="item.indexpic.host + item.indexpic.dir +  '730x280/' +item.indexpic.filepath + item.indexpic.filename"></image>
          <!-- <image class="slider-img" resize="cover" :src="item.indexpic.host + item.indexpic.dir +  item.indexpic.filepath + item.indexpic.filename"></image> -->
        </div>
        <indicator class="indicator" v-if="sliderList.length>1"></indicator>
    </slider>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
export default {
  props: ['sliderList'],
  name: 'Slide',
  data () {
    return {
    }
  },
  methods: {
    goDetail (item) {
      nativeUtil.linkTo(item.content_url)
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.slider{
  height: 240px;
  background-color: #fff;
}
.slider-item{
  height: 240px;
}
.slider-img{
  width: 750px;
  height: 240px;
}
.indicator {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40px;
  item-color: #ddd;
  item-selected-color: rgb(119, 111, 101);
}
.weex-indicator-item{
  margin-left: 10px;
  margin-right: 10px;
}
</style>
