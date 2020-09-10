// 上文字 下三图（左大右二小）
<template>
  <div class="wrapper">
      <text class="title">{{data.title}}</text>
      <div class="img-box">
          <image v-if="data.index_pics[0]" :src="data.index_pics[0].host + data.index_pics[0].filename" resize="cover" class="big-img"></image>
          <div class="right-img-box">
              <image v-if="data.index_pics[1]" resize="cover" :src="data.index_pics[1].host + data.index_pics[1].filename" class="small-img"></image>
              <div class="img-num-box">
                <image v-if="data.index_pics[2]" resize="cover" :src="data.index_pics[2].host + data.index_pics[2].filename" class="small-img"></image>
                <div class="num-box" v-if="data.type=='gallery'">
                  <text class="num-text">+{{data.photo_count}}</text>
                </div>
              </div>
          </div>
      </div>
      <bottom2 :data="data"></bottom2>
  </div>
</template>

<script>
import Bottom2 from '../bottom/Bottom2'
export default {
  props: ['data'],
  name: 'List5',
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
  width: 686px;
  height:382px;
  flex-direction: row;
  margin-bottom:32px;
}
.big-img{
   height:382px;
   width: 490px;
}
.right-img-box{
  margin-left:8px;
  height:382px;
  width: 188px;
  justify-content: space-between;
}
.small-img{
  width: 188px;
  height:188px;
}
.img-num-box{
  width: 188px;
  height:188px;
  position: relative;

}
.num-box{
  position: absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background-color: rgba(0,0,0,0.50);
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.num-text{
  font-size: 60px;
  color: #FFFFFF;
}
</style>
