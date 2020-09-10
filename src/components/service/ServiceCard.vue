<template>
     <div class="service-card">
        <text class="service-title">{{title}}</text>
        <div class="card-wrapper" >
            <div class="card-item"  :class="[(index+1)%3===0?'':'mr21',index>2?'mt20':'']" v-for="(item,index) in list" :key="index" @click="goDetail(item.url)">
                 <image :src="item.icon.host + item.icon.dir + item.icon.filepath + item.icon.filename" class="card-logo"></image>
                 <text class="card-name">{{item.name}}</text>
                 <text class="card-brief">{{item.sort_name}}</text>
            </div>
        </div>
    </div>
</template>

<script>
import { nativeUtil } from '../../../src/lib/nativeUtils'
export default {
  props: ['title', 'list'],
  name: 'Service',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    goDetail (url) {
      if (url.indexOf('http') !== -1) {
        nativeUtil.linkTo(url)
      }
    }
  },
  mounted () {
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
  .service-card{
      flex-direction: row;
      // flex:1;
      flex-wrap: wrap;
      width: 690px;
  }
  .service-title{
    font-size: 32px;
    color: #333333;
    flex-direction: row;
    width: 750px;
    lines:1;
    text-overflow:ellipsis;
  }
  .card-wrapper{
      margin-top: 30px;
      flex-direction: row;
      flex-wrap: wrap;
      flex:1;
      width: 690px;
  }
  .card-item{
      width: 214px;
      height: 214px;
      background-color: #FAFAFA;
      padding-top:20px;
      padding-bottom:24px;
      align-items: center;
  }
  .card-logo{
      width: 80px;
      height:80px;
      margin-bottom:12px;
  }
  .card-name{
      font-size: 28px;
      color: #333333;
  }
  .card-brief{
    font-size: 24px;
    color: #999999;
    margin-top:6px;
  }
  .mr21{
      margin-right:21px;
  }
  .mt20{
      margin-top:20px;
  }

</style>
