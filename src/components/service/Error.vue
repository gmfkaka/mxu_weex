<template>
     <div class="error">
       <image :src="getLocalImgUrl(img)" class="img"></image>
       <text class="text">{{text}}</text>
    </div>
</template>

<script>
export default {
  name: 'error',
  props: ['img', 'text'],
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
.error{
    flex:1;
    width: 750px;
    align-items: center;
}
.img{
  width: 750px;
  height:492px;
  margin-top:253px;
}
.text{
  margin-top:42px;
  font-size: 30px;
  color: #666666;
}
</style>
