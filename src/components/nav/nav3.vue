<template>
  <div class="nav-wrapper" :class="[this.isIphoneX() ? 'ipx' : '']" :style="androidStylePaddingTop">
    <div class="nav-text-box">
        <div class="back-icon-box" @click="gotoback" v-if="isBack">
            <image :src="getLocalImgUrl('ask-black.png')" class="back-icon"></image>
        </div>
        <text class="nav-text">{{Title}}</text>
    </div>
  </div>
</template>

<script>

// import { nativeUtil } from '../../lib/nativeUtils'
export default {
  props: ['isBack', 'Title'],
  name: 'nav',
  data () {
    return {
      // statusbar_height: ''
    }
  },
  methods: {
    gotoback () {
      this.goBack()
    }
  },
  created () {
    // nativeUtil.getSystemInfo().then((result) => {
    //   if (result && result.statusbar_height) {
    //     this.statusbar_height = result.statusbar_height
    //   }
    // })
  }
}
</script>

<style scoped lang="scss">
.nav-wrapper{
   flex-direction: row;
   align-items: center;
   width: 750px;
   background-color:#ffffff;
   position: relative;
   padding-top:58px;
}
.ipx{
    padding-top: 96px;
}
.nav-text-box{
  padding-bottom:24px;
  width: 750px;
  justify-content: center;
  align-items: center;

}
.nav-text{
    font-size:34px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);

}
.back-icon-box{
    width: 40px;
    height: 40px;
    justify-content: center;
    position: absolute;
    left:34px;
}
.back-icon{
  width: 20px;
  height:34px;
}
</style>
