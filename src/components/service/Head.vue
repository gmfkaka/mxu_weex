<template>
     <div class="head">
        <image :src="getLocalImgUrl('pic_hoge_logoblack3x.png')" class="head-logo"></image>
    </div>
</template>

<script>
export default {
  name: 'head',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
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
    align-items: center;
    border-bottom-style:solid;
    border-bottom-width:1px;
    border-bottom-color:#E6E6E6;
}
.head-logo{
    width: 180px;
    height:63px;
}
</style>
