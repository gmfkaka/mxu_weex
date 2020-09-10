 <!-- 三图 -->
<template>
    <div>
        <text class="fz34 cl-333 line1">{{data.title}}</text>
        <div class="flex-row pic-box">
            <image class="three-pic-item" :class="[idx > 0 ? 'ml9' : '']" v-for="(img,idx) in data.attachments.slice(0,3)" :src="data.indexpic.host+img.photo_key+'?imageView/0/h/150/w/228'" :key="idx"></image>
        </div>
        <div class="flex-row-between">
            <div class="flex-row-center">
                <text v-if="data.source" class="fz22 cl-b6" style="margin-right:10px;">{{data.source}}</text>
                <text class="fz22 cl-b6">{{transTime(data.publish_time_stamp)}}</text>
            </div>
            <div class="flex-row-center">
                <image class="click-icon" :src="getLocalImgUrl('nytopic_view.png')"></image>
                <text class="fz22 cl-b6">{{data.click_num}}人</text>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['data'],
  name: 'style3'
}
</script>

<style scoped lang="scss">
@import '../../style/common.scss';
.pic-box{
    margin: 24px 0;
}
.three-pic-item{
  width: 228px;
  height: 150px;
}
.ml9{
    margin-left: 9px;
}
.click-icon{
  width: 28px;
  height: 22px;
  margin-right: 12px;
}
</style>
