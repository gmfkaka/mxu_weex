 <!-- 视频默认样式 -->
<template>
    <div class="video-full-box">
        <div style="position:relative;">
            <image class="video-full-cover" :src="data.index_pic"></image>
            <image class="video-full-icon" :src="getLocalImgUrl('nytopic_videoicon.png')"></image>
            <div class="flex-row-between flex-align video-info-box">
              <text class="cl-fff fz20">{{data.click_num}}万播放</text>
              <div class="video-line"></div>
              <text class="cl-fff fz20">{{data.duration_format}}</text>
            </div>
        </div>
        <text class="line2 fz34 cl-333" style="margin-top:20px;">{{data.title}}</text>
    </div>
</template>

<script>
export default {
  props: ['data'],
  name: 'video'
}
</script>

<style scoped lang="scss">
@import '../../style/common.scss';
.video-full-cover {
  width: 702px;
  height: 350px;
}
.video-full-icon {
  width: 50px;
  height: 56px;
  position: absolute;
  left: 326px;
  top: 148px;
}
.video-info-box {
  position: absolute;
  bottom: 16px;
  left: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.video-title-box {
  position: absolute;
  width: 664px;
  left: 20px;
  bottom: 56px;
}
.video-line {
  background-color: rgba(255, 255, 255, 0.4);
  width: 2px;
  height: 16px;
  margin-left: 12px;
  margin-right: 12px;
}
</style>
