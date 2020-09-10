// 上标题 中两图+标题 下头像参与数
<template>
    <div  class="list-topic-wrapper">
        <text class="topic-title">{{data.title}}</text>
        <!-- 图片 -->
        <div class="topic-images-box">
            <div class="topic-image-box">
              <image :src="data.index_pic" resize="cover" class="topic-image"></image>
              <text class="img-title">{{data.title}}</text>
            </div>
            <div class="topic-image-box">
              <image :src="data.index_pic[1].src" class="topic-image"></image>
              <text class="img-title">{{data.title}}</text>
            </div>
        </div>
        <!-- 底部 -->
        <div class="topic-bottom">
            <div class="topic-left">
              <text class="topic-column">「 专题 」</text>
            </div>
            <div class="topic-right">
                <div class="topic-avatar" v-if="data.index_pic.length" :style="{right:(data.index_pic.length-1)*16+'px'}">
                    <image :src="item.src" v-for="(item,index) in data.index_pic" :key="index"
                    class="avatar-image" :style="{left:-index*32+'px'}"></image>
                </div>
                <text class="grey-text">194 人参与</text>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['data'],
  name: 'List10',
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
.list-topic-wrapper {
    background-color: #fff;
    padding-top: 28px;
    padding-bottom: 18px;
    margin-left: 32px;
    margin-right: 32px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);
}
.topic-title{
  font-size: 34px;
  color: #333333;
  lines:1;
  text-overflow:ellipsis;
  padding-left:28px;
  padding-right:28px;
  width: 686px;
}
.topic-images-box{
  width: 686px;
  justify-content: space-between;
  flex-direction: row;
}
.topic-image-box{
  width:340px;
  height:232px;
  position: relative;
  margin-top:28px;
}
.topic-image{
  width: 340px;
  height:232px;
}
.img-title{
  position: absolute;
  bottom:16px;
  left:16px;
  right:16px;
  color:white;
  lines:2;
  font-size: 26px;
  text-overflow:ellipsis;
}
.topic-bottom{
  justify-content: space-between;
  margin-top:20px;
  width: 626px;
  flex-direction:row;
  margin-left:32px;
  margin-right:28px;
}
.topic-column{
  font-size: 24px;
  color: #D0021B;
}
.topic-right{
  align-items: center;
  flex-direction: row;
  height:48px;
}
.topic-avatar{
  margin-right:16px;
  height:48px;
  right:16px;
  flex-direction: row;
  position: relative;
}
.avatar-image{
  width: 48px;
  height:48px;
  position: absolute;
  border-bottom-left-radius:24px;
  border-bottom-right-radius:24px;
  border-top-left-radius:24px;
  border-top-right-radius:24px;
  border-left-style:solid;
    border-top-style:solid;
    border-right-style:solid;
    border-bottom-style:solid;
    border-left-width:1px;
    border-top-width:1px;
    border-right-width:1px;
    border-bottom-width:1px;
    border-left-color:#ffffff;
    border-top-color:#ffffff;
    border-right-color:#ffffff;
    border-bottom-color:#ffffff;
}
.grey-text{
  color: #9B9B9B;
  font-size: 22px;
}
</style>
