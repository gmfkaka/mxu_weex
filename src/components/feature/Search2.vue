<template>
     <div class="search-wrapper" :class="[this.isIphoneX() ? 'x-top':'']" @click="goSearch" :style="androidStyleMarginTop">
        <image :src="getLocalImgUrl('feature_search.png')" class="icon" ></image>
        <text class="title">搜索</text>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
export default {
  name: 'Search',
  methods: {
    goSearch () {
      nativeUtil.linkTo('search')
    }
  }
}
</script>

<style scoped lang="scss">
.search-wrapper{
  height: 66px;
  background-color: #fff;
  padding-left: 10px;
  margin-bottom: 30px;
  margin-top: 60px;
  border-top-left-radius:33px;
  border-top-right-radius:33px;
  border-bottom-left-radius:33px;
  border-bottom-right-radius:33px;
  flex-direction: row;
  align-items: center;
}
.x-top{
  margin-top: 90px;
}
.icon{
  width: 70px;
  height: 70px;
}
.title{
  color:#D3D3D3;
  font-size: 28px;
}
</style>
