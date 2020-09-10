 <!-- 上标题 下播放器 下日期阅读数 -->
<template>
  <div class="wrapper">
        <text class="title">{{data.title}}</text>
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
             <video class="video" :src="data.video.host+data.video.filepath+data.video.filename" autoplay controls
      :play-status="playState"></video>
         </div>

        <bottom2 :data="data"></bottom2>
    </div>
</template>

<script>
import Bottom2 from '../bottom/Bottom2'
export default {
  props: ['data'],
  name: 'List13',
  components: {
    Bottom2
  },
  data () {
    return {
      paly: false,
      playState: 'pause'
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
    padding-top:28px;
    padding-bottom:32px;
}
.title{
    font-size: 34px;
    color: #333333;
    lines:2;
    text-overflow:ellipsis;
    width: 686px;
    margin-bottom:16px;
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
  margin-bottom: 24px;
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
  border-bottom-left-radius:4px;
  border-bottom-right-radius:4px;
  border-top-left-radius:4px;
  border-top-right-radius:4px;
}
.video{
  border-bottom-left-radius:4px;
  border-bottom-right-radius:4px;
  border-top-left-radius:4px;
  border-top-right-radius:4px;
  width: 686px;
  height:386px;

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
