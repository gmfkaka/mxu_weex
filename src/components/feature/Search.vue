<template>
   <div class="head" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStyleMarginTop">
        <image :src="getLocalImgUrl('feature_back.png')" class="back-icon" @click="goback"></image>
        <image :src="getLocalImgUrl('feature_search.png')" class="search-icon" @click="goSearch"></image>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
export default {
  name: 'Search',
  methods: {
    goSearch () {
      nativeUtil.linkTo('search')
    },
    goback () {
      this.goBack()
    }
  }
}
</script>

<style scoped lang="scss">
.x-top{
  margin-top: 90px;
}
.head{
  height: 66px;
  margin-bottom: 30px;
  margin-top: 50px;
  position: relative;
}
.title{
  width: 710px;
  height: 66px;
  line-height: 66px;
  font-size: 36px;
  text-align: center;
}
.back-icon{
  width: 66px;
  height: 66px;
  position: absolute;
  top: 0;
  left: 0;
}
.search-icon{
  width: 66px;
  height: 66px;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
