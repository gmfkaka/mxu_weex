 <!-- 左标题右图-->
<template>
    <div class="flex-row-between">
        <div class="flex1 flex-col flex-between" style="padding-right:20px;">
            <text class="fz34 cl-333 line2">{{data.title}}</text>
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
        <image class="left-img" v-if="data.index_pic !== ''" :src="data.index_pic+'?imageView/0/h/150/w/240'"></image>
        <image class="left-img" v-else :src="getLocalImgUrl('nytopic_default.png')"></image>
    </div>
</template>

<script>
export default {
  props: ['data'],
  name: 'style2'
}
</script>

<style scoped lang="scss">
@import '../../style/common.scss';
.left-img {
  width: 240px;
  height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.click-icon{
  width: 28px;
  height: 22px;
  margin-right: 12px;
}
</style>
