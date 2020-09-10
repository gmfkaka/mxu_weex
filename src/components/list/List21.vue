 <!-- 上标题 下播放器 -->
<template>
  <div class="wrapper">
        <div class="img-box" v-if="!paly" @click="playVideo()">
           <image :src="data.index_pic" class="img" resize="cover"></image>
           <div class="play-box">
              <image :src="getLocalImgUrl('icon_noplay3x.png')" class="play-icon"></image>
           </div>
           <div class="paly-time-box">
             <text class="paly-time-text">{{data.duration_format}}</text>
           </div>
        </div>
         <div class="video-box" v-if="paly">
             <!-- <video class="video" :src="data.video.host+data.video.filepath+data.video.filename" autoplay controls
      :play-status="playState"></video> -->
            <video-player v-if="src" class="video" :src='src' :options='videoPlayerOptions'></video-player>
         </div>
         <text class="title">{{data.title}}</text>
        <bottom3 :data="data"></bottom3>
    </div>
</template>

<script>
import Bottom3 from '../bottom/Bottom3'
import VideoPlayer from '../common/video'
export default {
  props: ['data'],
  name: 'List21',
  components: {
    Bottom3,
    VideoPlayer
  },
  data () {
    return {
      paly: false,
      playState: 'pause',
      videoPlayerOptions: {width: 686, height: 386},
      src: ''
    }
  },
  methods: {
    onstart (event) {
      this.state = 'onstart'
    },
    onpause (event) {
      this.state = 'onpause'
    },
    onfinish (event) {
      this.state = 'onfinish'
    },
    onfail (event) {
      this.state = 'onfinish'
    },
    playVideo () {
      // this.src = this.data.video.host + this.data.video.dir + this.data.video.filepath + this.data.video.filename
      this.src = 'http://stream.ihytv.com/xwpd/playlist.m3u8?_upt=d00950061561120106'
      // console.log(this.src)
      this.playState = 'play'
      this.paly = true
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.wrapper {
    background-color: #ffffff;
    padding-left:32px;
    padding-right:32px;
    padding-top:12px;
    padding-bottom:14px;
}
.title{
    font-size: 34px;
    color: #333333;
    lines:2;
    text-overflow:ellipsis;
    width: 686px;
    margin-top:12px;
}
.img{
  width: 686px;
  height:386px;
  border-bottom-left-radius:4px;
  border-bottom-right-radius:4px;
  border-top-left-radius:4px;
  border-top-right-radius:4px;
}
.img-box{
  width: 686px;
  height:386px;
  position: relative;
}
.play-box{
  border-bottom-left-radius:4px;
  border-bottom-right-radius:4px;
  border-top-left-radius:4px;
  border-top-right-radius:4px;
  width: 686px;
  height:386px;
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.50), rgba(0,0,0,0.00));
}
.play-icon{
  width: 128px;
  height:128px;
  top:120px;
  left:280px;
}
.video-box{
  width: 686px;
  height:386px;
  position: relative;
  border-bottom-left-radius:4px;
  border-bottom-right-radius:4px;
  border-top-left-radius:4px;
  border-top-right-radius:4px;
}
.video{
  // border-bottom-left-radius:4px;
  // border-bottom-right-radius:4px;
  // border-top-left-radius:4px;
  // border-top-right-radius:4px;
  // width: 686px;
  // height:386px;
  position: absolute;
  left: 0;
  top: 0;

}
.paly-time-box{
  position: absolute;
  bottom:12px;
  right:24px;
}
.paly-time-text{
  color:#ffffff;
  font-size: 24px;
}
</style>
