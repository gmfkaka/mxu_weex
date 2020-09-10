<template>
  <div class="img-slide-box">
     <slider class="slider" auto-play="true" >
        <div class="slide-img-items" v-for="(img,index) in dataList" :key="index">
          <image class="image" resize="cover" :src="img.src"></image>
        </div>
         <indicator class="indicator"></indicator>
      </slider>
  </div>

</template>

<script>
export default {
  props: ['dataList'],
  name: 'Slide2',
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
.img-slide-box{
  width: 686px;
  height:264px;
}
.slider{
  width: 686px;
  height:264px;
  position: relative;
}
.slide-img-items{
  width: 686px;
  height:240px;
  position: absolute;
  top:0;
}
.image{
  width: 686px;
  height:240px;
  border-bottom-left-radius:8px;
  border-bottom-right-radius:8px;
  border-top-left-radius:8px;
  border-top-right-radius:8px;
}
.indicator{
  item-selected-color:#592FB3;
  item-color: #D8D8D8;
  item-size:8px;
  position: absolute;
  bottom:0;
  width:686px;
  height:8px;
}
</style>
