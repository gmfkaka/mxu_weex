// 上标题 下图广告标签
<template>
    <div class="adv-wrapper">
        <text class="adv-title">{{data.title}}</text>
        <div class="adv-image-box">
            <image :src="data.index_pic" class="adv-image" resize="cover"></image>
            <div class="tip-box">
                <text class="tip-text">广告</text>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['data'],
  name: 'Adv1',
  data () {
    return {

    }
  },
  methods: {

  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.adv-wrapper{
    background-color: #ffffff;
    padding-left:32px;
    padding-right:32px;
    padding-top:28px;
    padding-bottom:28px;
}
.adv-title{
   font-size: 34px;
   color: #333333;
   width: 668px;
   lines:1;
   text-overflow:ellipsis;
   margin-bottom:20px;
}
.adv-image-box{
    width: 686px;
    height:386px;
    position: relative;
}
.adv-image{
    width: 686px;
    height:386px;
}
.tip-box{
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 76px;
    height:36px;
    border-bottom-left-radius:20px;
    border-bottom-right-radius:20px;
    border-top-left-radius:20px;
    border-top-right-radius:20px;
    background-color: rgba(rgb(0, 0, 0),0.5);

    position: absolute;
    right:12px;
    top:12px;
}
.tip-text{
    color:white;
    font-size: 22px;
}
</style>
