<template>
  <div class="nav-wrapper" :class="[this.isIphoneX() ? 'ipx' : '']" :style="androidStylePaddingTop">
    <div class="nav-text-box">
        <div class="back-icon-box" @click="gotoback" v-if="isBack">
            <image :src="getLocalImgUrl('ask_back.png')" class="back-icon"></image>
        </div>
        <text class="nav-text">报料</text>
    </div>
  </div>
</template>

<script>

// import { nativeUtil } from '../../lib/nativeUtils'
export default {
  props: ['isBack'],
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
  // 获取系统信息
  created () {
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
   padding-top: 45px;
}
.ipx{
    padding-top: 100px;
}
.nav-text-box{
  padding-top:24px;
  padding-bottom:24px;
  width: 750px;
  justify-content: center;
  align-items: center;

}
.nav-text{
  color:#333333;
  font-size: 36px;

}
.back-icon-box{
  position: absolute;
  left:24px;
  width: 40px;
  height:34px;
}
.back-icon{
  width: 20px;
  height:34px;
}
</style>
