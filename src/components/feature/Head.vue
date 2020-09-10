<template>
     <div class="head">
        <text class="title" v-if="title">{{title}}</text>
        <image :src="getLocalImgUrl('feature_back.png')" class="back-icon" @click="goback"></image>
        <image :src="getLocalImgUrl('feature_search.png')" class="search-icon" @click="goSearch"></image>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
export default {
  props: ['title'],
  name: 'Head',
  methods: {
    goback () {
      this.goBack()
    },
    goSearch () {
      nativeUtil.linkTo('search')
    }
  }
}
</script>

<style scoped lang="scss">
.head{
  height: 67px;
  margin-bottom: 40px;
  position: relative;
}
.title{
  width: 730px;
  height: 67px;
  line-height: 67px;
  color: #545454;
  font-size: 36px;
  text-align: center;
}
.back-icon{
  width: 67px;
  height: 67px;
  position: absolute;
  top: 0;
  left: 0;
}
.search-icon{
  width: 67px;
  height: 67px;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
