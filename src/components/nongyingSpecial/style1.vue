 <!-- 无图纯标题样式 -->
<template>
    <div>
        <text class="fz34 cl-333 line2" style="margin-bottom:34px;">{{data.title}}</text>
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
  name: 'style1'
}
</script>

<style scoped lang="scss">
@import '../../style/common.scss';
.click-icon{
  width: 28px;
  height: 22px;
  margin-right: 12px;
}
</style>
