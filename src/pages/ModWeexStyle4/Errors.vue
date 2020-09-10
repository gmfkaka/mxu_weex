<template>
     <div class="nodata-wrapper">
       <head></head>
       <error class="error-box" :img="'pic_null3x.png'" :text="'系统数据出错啦~'"></error>
    </div>
</template>

<script>
import Head from '../../components/service/Head.vue'
import Error from '../../components/service/Error.vue'
export default {
  name: 'Nodata',
  components: {
    Head,
    Error
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.nodata-wrapper{
  width: 750px;
  flex:1;
}
.error-box{
  flex:1;
}
</style>
