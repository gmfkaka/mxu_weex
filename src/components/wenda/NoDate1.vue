<template>
    <div class="no-data">
        <image :src="getLocalImgUrl('applant_no_data3x.png')" class="no-data-img"></image>
        <text class="no-data-text">这里什么都没有</text>
    </div>
</template>

<script>

export default {
  props: ['data'],
  name: 'Title1',
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
.no-data{
  height: 800px;
  width: 750px;
  align-items: center;
  justify-content: center;
}
.no-data-img{
  width: 255px;
  height: 185px;
}
.no-data-text{
  color:#bbb;
  font-size: 24px;
  margin-top: 20px;
}
</style>
