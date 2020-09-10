
<template>
    <div  class="img-list-wrapper">
        <div class="img-item" v-for="(item,index) in data" :key="index" :class="[index!=0?'mt10':'']">
            <!-- 老数据imgwidth为0 is_old为1-->
            <image v-if="item.hasOwnProperty('imgwidth') && !item.is_old" :style="{height:getHeight(item,item.imgwidth)+'px'}" :src="cutDetailImg(item,item.imgwidth)" class="img-image" @click="showImg(data,index)"></image>
            <image v-if="item.hasOwnProperty('imgwidth') && item.is_old ==1" :style="{height:'395px'}" :src="cutOldImg(item)" class="img-image" @click="showImg(data,index)"></image>
              <!-- 视频 -->
            <div class="video" v-if="!item.hasOwnProperty('imgwidth') && item.host">
                <image v-if="pasued && item.img" class="poster img" resize="cover" :src="item.img.host + item.img.dir +  '702x395/' +item.img.filepath + item.img.filename"></image>
                <image v-if="pasued" class="play-icon" :src="getLocalImgUrl('icon_radioplayer3x.png')" @click="playVideo"></image>
                <video-player @functionListener="functionListener" v-if="!pasued" :src='item.host + "/" + item.dir + item.filename+"."+item.mtype' :options='videoPlayerOptions'></video-player>
            </div>
        </div>

    </div>

</template>

<script>

import VideoPlayer from '../../components/weexstyle16/video'
import { nativeUtil } from '../../lib/nativeUtils'
export default {
  props: ['data'],
  name: 'list1',
  components: {
    VideoPlayer
  },
  data () {
    return {
      pasued: true,
      videoPlayerOptions: {width: 702, height: 395}
    }
  },
  methods: {
    // 播放视频
    playVideo () {
      this.pasued = false
    },
    functionListener () {
      this.pasued = true
    },
    // 图片裁剪
    getImage  (obj, width, height) {
      const imgwidth = width || obj.imgwidth
      const imgheight = height || obj.imgheight
      let url = obj.host + obj.dir + obj.filepath + obj.filename
      url = url.replace('{&#036;hgPicSizeStart}', '').replace('{&#036;hgPicSizeWidth}', imgwidth).replace('{&#036;hgPicSizeHeight}', imgheight).replace('{&#036;hgPicSizeEnd}', '')
      return url
    },
    cutOldImg (obj, width) {
      // const height = parseInt(this.getHeight(obj, width), 10)
      return obj.host + obj.dir + 702 + 'x' + 395 + '/' + obj.filepath + obj.filename
    },
    cutDetailImg (obj, width) {
      const height = parseInt(this.getHeight(obj, width), 10)
      return this.getImage(obj, 702, height)
    },

    getHeight (obj, width) {
      const height = 702 / width * obj.imgheight
      return height
    },
    // 展示图片
    showImg (data, index) {
      let pics = []
      if (data.length) {
        data.forEach((v, k) => {
          if (v.hasOwnProperty('imgwidth')) {
            if (v.is_old === 1) {
              pics.push(v.host + v.dir + v.filepath + v.filename)
              return
            }
            pics.push(this.getImage(v))
          }
        })
      }
      const param = {
        index: index + '',
        imgs: pics
      }
      nativeUtil.viewPictures(param)
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.img-list-wrapper{
    width: 702px;
}
.mt10{
  margin-top:10px;
}
.img-item{
    width: 702px;
    border-bottom-left-radius:4px;
    border-bottom-right-radius:4px;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
    position: relative;
}
.img{
    width: 702px;
    height:395px;
    border-bottom-left-radius:4px;
    border-bottom-right-radius:4px;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
}
.img-image{
    width: 702px;
    border-bottom-left-radius:4px;
    border-bottom-right-radius:4px;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
}
// 视频
.video{
  width: 702px;
  height:395px;
  justify-content: center;
  align-items: center;
  position: relative;
}
.poster{
  width: 702px;
  height:395px;
  position: absolute;
  left: 0;
  top: 0;
}
.play-icon{
  width: 126px;
  height: 126px;
  position: absolute;
  left: 288px;
  top: 134px;
}
</style>
