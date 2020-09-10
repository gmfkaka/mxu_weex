<template>
  <div class="wrapper" :class="[this.isIphoneX() ? 'ipx' : '']" :style="androidStyle">
    <image :src="getLocalImgUrl('ask_logo.png')" class="logo"></image>
    <scroller scroll-direction="horizontal" show-scrollbar=false class="nav-list">
      <text
          v-for="(item,index) in list"
          :key="index" class="nav-title-text"
          :class="[index === currentIndex && index !== 4 ? 'nav-active' : '']"
          @click="changeIndex(index)"
        >{{item}}</text>
    </scroller>
    <image :src="getLocalImgUrl('ask_search.png')" class="search" @click="search"></image>
  </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
export default {
  name: 'Nav2',
  data () {
    return {
      currentIndex: 0,
      list: ['热门', '动态', '我的问题', '我的回答', '我要提问'],
      statusbar_height: ''
    }
  },
  methods: {
    changeIndex (index) {
      if (index !== 4) {
        this.currentIndex = index
      }

      this.$emit('changeIndex', index)
    },
    search () {
      nativeUtil.linkTo('search')
    }
  },
  computed: {
    androidStyle () {
      if (this.statusbar_height) {
        return {
          paddingTop: `${this.statusbar_height}px`,
          paddingBottom: '50px'
        }
      }
    }
  },
  created () {
    nativeUtil.getSystemInfo().then((result) => {
      if (result && result.statusbar_height) {
        this.statusbar_height = result.statusbar_height
      }
    })
  }
}
</script>

<style scoped lang="scss">
.wrapper{
   flex-direction: row;
   align-items: center;
   height: 116px;
   width: 750px;
   background-color:rgba(247,64,46,1);
   padding-top: 50px;
   padding-bottom: 23px;
   padding-left: 24px;
}
.ipx{
    padding-top: 100px;
    padding-bottom: 50px;
}
.logo{
  width: 108px;
  height: 42px;
  margin-right: 20px;
}
.nav-list{
  width: 500px;
  height: 50px;
  flex-direction: row;
  align-items: center;
}
.nav-title-text{
  font-size:28px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(255,255,255,0.8);
  margin-right: 24px;
}
.nav-active{
  font-size: 34px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(255,255,255,1);
}
.ask-text{
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(255,255,255,1);
  position: absolute;
  right: 94px;
}
.search{
  position: absolute;
  right: 24px;
  width: 36px;
  height: 36px;
}
</style>
