<template>
  <div class="wrapper">
      <div class="img-box">
          <image v-if="data.snap.filename" :src="data.snap.host+data.snap.filename" class="img" ></image>
          <image v-if="!data.snap.filename" :src="getLocalImgUrl('3x.png')" class="img" ></image>
          <image :src="getLocalImgUrl('icon_radioplayer3x.png')" class="img-play" ></image>
      </div>
      <div class="info-box">
          <text class="text-title">{{data.cur_program.program}}</text>
          <text class="text-column">{{data.name}}</text>
      </div>
  </div>

</template>

<script>
export default {
  props: ['data'],
  name: 'List2',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.wrapper{
   width: 686px;
   position: relative;
   height:140px;
   flex-direction: row;
   margin-bottom:32px;
}
.img-box{
  width: 144px;
  height:144px;
  align-items: center;
  flex-direction: row;
  position: relative;
  margin-right:32px;
}
.img-play{
  width: 72px;
  height:72px;
  position: absolute;
  top:36px;
  left:36px;

}
.img{
  position: absolute;
  top:0;
  left:0;
  width: 144px;
  height:144px;
   border-top-left-radius:16px;
   border-top-right-radius:16px;
   border-bottom-right-radius:16px;
   border-bottom-left-radius:16px;
}
.info-box{
  height:144px;
  justify-content: center;
}
.text-title{
  font-size: 30px;
  color: #333333;
  lines:1;
  width: 510px;
  text-overflow:ellipsis;
}
.text-column{
  margin-top:12px;
  font-size: 26px;
  color: #A6A6A6;
  lines:1;
  width: 510px;
  text-overflow:ellipsis;
}
</style>
