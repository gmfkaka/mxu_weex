// 上标题 下两图 下 阅读数 日期
<template>
  <div class="wrapper">
      <text class="title">{{data.title}}</text>
      <div class="img-box">
          <image v-if="data.index_pics[0]" resize="cover"
          :src="data.index_pics[0].host + data.index_pics[0].filename" class="img"></image>
          <image v-if="data.index_pics[1]" resize="cover"
          :src="data.index_pics[1].host + data.index_pics[1].filename" class="img"></image>
      </div>
      <bottom2 :data="data"></bottom2>
  </div>
</template>

<script>
import Bottom2 from '../bottom/Bottom2'
export default {
  props: ['data'],
  name: 'List6',
  components: {
    Bottom2
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
.img-box{
  flex-direction: row;
  justify-content: space-between;
  width: 686px;
  height:386px;
  margin-bottom:28px;
}
.img{
    width: 340px;
    height: 386px;

}
</style>
