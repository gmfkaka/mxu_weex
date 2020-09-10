<template>
  <div class="wrapper" :style="{width:width+'px'}">
    <div class="img-box" :style="{width:width+'px',height:height+'px'}">
          <image v-if="data.index_pic" :src="cutCover(data.index_pic,width,height)" class="img" :style="{width:width+'px',height:height+'px'}"></image>
          <div class="cover-box" :style="{width:width+'px',height:height+'px'}"></div>
          <text class="time-text">更新至03-23</text>
    </div>
    <bottom4 :width="width" :data="data"></bottom4>
  </div>

</template>

<script>
import Bottom4 from '../bottom/Bottom4'
export default {
  props: ['data', 'width', 'height'],
  name: 'List3',
  components: {
    Bottom4
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
   position: relative;
  //  margin-bottom:20px;
}
.img{
   border-top-left-radius:16px;
   border-top-right-radius:16px;
   border-bottom-right-radius:16px;
   border-bottom-left-radius:16px;
}
.img-box{
   border-top-left-radius:16px;
   border-top-right-radius:16px;
   border-bottom-right-radius:16px;
   border-bottom-left-radius:16px;
   margin-bottom:8px;
}
.cover-box{
   border-top-left-radius:16px;
   border-top-right-radius:16px;
   border-bottom-right-radius:16px;
   border-bottom-left-radius:16px;
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-image:linear-gradient(to bottom, rgba(0,0,0,0.00) ,  rgba(0,0,0,0.60) )
}
.time-text{
  position: absolute;
  bottom:12px;
  right:12px;
  color: #FFFFFF;
  font-size: 20px;
}

</style>
