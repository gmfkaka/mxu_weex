<template>
    <div class="head" :class="[type=='black'?'black':'']">
      <image :src="getLocalImgUrl('icon_back3x.png')" class="back-img" v-if="type!=='black'" @click="back()"></image>
      <image :src="getLocalImgUrl('icon_back_white3x.png')" class="back-img" v-if="type=='black'" @click="back()"></image>
      <image :src="getLocalImgUrl('icon_more_function3x.png')" class="more-icon" v-if="more"></image>
    </div>
</template>

<script>
export default {
  name: 'error',
  props: ['type', 'more'],
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    back () {
      this.goBack()
    }
  },
  mounted () {
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.head{
    height:128px;
    width: 750px;
    padding-top:40px;
    justify-content: center;
    position: relative;
}
.black{
  background-color: #191818;
}
.back-img{
  width: 44px;
  height:44px;
  margin-left:24px;
}
.more-icon{
  width: 32px;
  height:32px;
  position: absolute;
  right:32px;
}
</style>
