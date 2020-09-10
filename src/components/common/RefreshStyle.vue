<template>
     <div class="wrapper">
       <!-- <image v-if="styleIndex == 3" :src="getLocalImgUrl('refresh_header_gif@3x.gif')" class="style3" :style="defaultStyle"></image> -->
       <image :src="getLocalImgUrl('refresh_header.gif')" class="style3" :style="defaultStyle"></image>
     </div>
</template>

<script>
import { nativeUtil } from '../../../src/lib/nativeUtils'
export default {
  name: 'RefreshStyle',
  props: ['mLeft'],
  data () {
    return {
      styleIndex: null
    }
  },
  computed: {
    defaultStyle () {
      if (this.mLeft) {
        return {
          marginLeft: `${this.mLeft}px`
        }
      } else {
        return {
          marginLeft: `345px`
        }
      }
    }
  },
  methods: {
    // 获取配置文件
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.styleIndex = 3
      } else {
        const param = {
          'isMain': '1'
        }
        const res = await nativeUtil.getConfig(param)
        // nativeUtil.log(res)
        this.styleIndex = res.attrs.HGRefreshStyle
      }
    }
  },
  created () {
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">
  .wrapper{
    width: 750px;
  }
  .style3{
    width: 50px;
    height: 50px;
  }
</style>
