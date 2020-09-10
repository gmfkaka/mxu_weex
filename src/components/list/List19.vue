 <!-- 专题 图集 -->
<template>
  <div class="wrapper">
      <div class="img-box">
          <image :src="data.index_pic" class="img" resize="cover"></image>
      </div>
      <text class="title">{{data.title}}</text>
      <div class="bottom-box">
            <image :src="getLocalImgUrl('tag_subject3x.png')" class="bottom-icon"></image>
            <text class="grey-text">{{data.column_name}}</text>
      </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  name: 'List8',
  components: {
  },
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
.wrapper {
    width: 686px;
    background-color: #ffffff;
    margin-left:32px;
    margin-right:32px;
    margin-top:20px;
    margin-bottom:12px;
    border-left-style:solid;
    border-top-style:solid;
    border-right-style:solid;
    border-bottom-style:solid;
    border-left-width:2px;
    border-top-width:2px;
    border-right-width:2px;
    border-bottom-width:2px;
    border-left-color:#F5F5F5;
    border-top-color: #F5F5F5;
    border-right-color: #F5F5F5;
    border-bottom-color: #F5F5F5;
    border-bottom-left-radius:12px;
    border-bottom-right-radius:12px;
    border-top-left-radius:12px;
    border-top-right-radius:12px;
    padding-bottom:22px;
}
.img-box{
    width: 686px;
    position: relative;
    height:280px;
    border-top-left-radius:12px;
    border-top-right-radius:12px;
    margin-bottom: 7px;
}
.img{
    width: 686px;
    height:280px;
    border-top-left-radius:12px;
    border-top-right-radius:12px;
}
.title{
  width: 638px;
  lines:2;
  text-overflow:ellipsis;
  font-size: 28px;
  color: #333333;
  margin-left:24px;
  margin-right:24px;
}
.bottom-box{
  flex-direction: row;
  margin-left:24px;
  margin-right:24px;
  align-items: center;
  margin-top:16px;
}
.bottom-icon{
  width: 24px;
  height:24px;
  margin-right:8px;
}
.grey-text{
  font-size: 20px;
  color: #A6A6A6;
}
</style>
