<template>
<div class="video-wrap" :style="defaultStyle" @viewdisappear="onviewdisappear">
    <videoplayer v-if="src" ref="videoPlayer" :url="src" :showRemoveFunction="1"
    :style="videoFullStyle"></videoplayer>
</div>
</template>

<script>

// import { nativeUtil } from '../../lib/nativeUtils'
export default {
  name: 'video',
  props: [ 'height', 'width', 'src', 'options' ],
  data () {
    return {
      isVideoFull: false,
      deviceInfo: {}
    }
  },
  created () {
    this.initVideo()
  },
  computed: {
    defaultStyle () {
      let { width, height } = this.options
      return {
        width: `${width}px`,
        height: `${height}px`
      }
    },
    videoFullStyle () {
      let temp = { position: 'absolute', left: 0, top: 0 }
      let options = this.options
      let deviceInfo = this.deviceInfo
      // 去除IOS的样式更改 它们可以直接调用WINDOW层
      temp.width = `${options.width}px`
      temp.height = `${options.height}px`
      if (this.getPlatform() === 'android' && this.isVideoFull) {
        temp.width = `${deviceInfo.height}px`
        temp.height = `${deviceInfo.width}px`
      }
      // 这边兼容下iphonex的状态栏
      // temp.top += this.fixIphoneTop
      return temp
    }
  },
  watch: {
    src (val) {
      if (val) {
        let videoComponent = this.$refs['videoPlayer']
        videoComponent.play(val)
      }
    }
  },
  methods: {
    onviewdisappear () {
      let videoComponent = this.$refs['videoPlayer']
      videoComponent.destory()
    },
    initVideo () {
      if (this.getPlatform !== 'web') {
        this.$nextTick(() => {
          let videoComponent = this.$refs['videoPlayer']
          let options = this.options
          // IOS的时候不需要初始化和设置大小
          if (this.getPlatform() !== 'ios') {
            videoComponent.setVideoSize(options.width / 2, options.height / 2) // 初始化视频大小
            // 监听当前视频初始化
            videoComponent.initVideoPlayer((res) => {
              this.deviceInfo = JSON.parse(res)
            })
            videoComponent.play(this.src)
          } else {
            videoComponent.play()
          }
          videoComponent.setConfigureChangeListener((state) => {
            this.isVideoFull = state
          })
          videoComponent.setRemoveFunctionListener((state) => {
            this.$emit('functionListener')
          })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
