 <!-- 图集默认样式 -->
<template>
    <div>
        <text class="fz34 cl-333">{{data.title}}</text>
        <div class="gallery-box flex-row-between" v-if="data.attachments && data.attachments.length">
            <image class="gallery-left" :src="data.indexpic.host+data.attachments[0].photo_key+'?imageView/0/h/300/w/420'"></image>
            <div class="flex-between">
              <image v-for="(img,i) in data.attachments.slice(1,3)" :key="i" class="gallery-right" :src="data.indexpic.host+img.photo_key+'?imageView/0/h/144/w/272'"></image>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['data'],
  name: 'gallery'
}
</script>

<style scoped lang="scss">
@import '../../style/common.scss';
.gallery-box {
  margin-top: 16px;
}
.gallery-left {
  width: 420px;
  height: 300px;
}
.gallery-right {
  width: 272px;
  height: 144px;
}
</style>
