 <!-- 上文字下三图  start-->
<template>
    <div  class="list-one-wrapper">
        <text class="one-title">{{data.title}}</text>
        <div class="one-img-box" v-if="data.index_pic.length">
            <div class="one-img-item"
            :class="[idx<2?'one-not-last':'']"
            v-if="idx<3" v-for="(img,idx) in data.index_pics" :key="idx">
                <image :src="img.host+img.filename" class="one-img-style"></image>
                <div class="one-num" v-if="idx==data.index_pics.length-1 && data.type=='gallery'">
                    <text class="one-num-text">{{data.photo_count}}</text>
                </div>
            </div>
        </div>
        <bottom1 :data="data"></bottom1>
    </div>

</template>

<script>
import Bottom1 from '../bottom/Bottom1'
export default {
  props: ['data'],
  name: 'List1',
  components: {
    Bottom1
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
.list-one-wrapper{
    background-color: #fff;
    padding-left:32px;
    padding-right:32px;
    padding-top:28px;
    padding-bottom:32px;
}
.one-title{
    color:#333333;
    font-size: 34px;
    width: 668px;
    lines:2;
    text-overflow:ellipsis;
}
.one-img-box{
    margin-top:20px;
    width: 668px;
    height:160px;
    flex-direction: row;
}
.one-img-item{
   width: 222px;
   height: 160px;
   position: relative;
}
.one-img-style{
   width: 222px;
   height: 160px;
}
.one-not-last{
    margin-right:10px;
}
.one-num{
    position: absolute;
    bottom:12px;
    right:12px;
    width: 72px;
    height:36px;
    background-color: rgba(0,0,0,0.5);
    border-bottom-left-radius:20px;
    border-bottom-right-radius:20px;
    border-top-left-radius:20px;
    border-top-right-radius:20px;
    align-items: center;
    justify-content: center;
}
.one-num-text{
    color:#fff;
    font-size: 22px;
}
//  list底部
.list-bottom-wrapper{
    margin-top:24px;
    flex-direction: row;
}
.list-bottom{
   flex:1;
   flex-direction: row;
   align-items: center;
}
.list-bottom-info{
    flex:1;
    flex-direction: row;
    align-items: center;
}
.list-bottom-red-text{
    color:#E02929;
    font-size:24px;
    margin-right:20px;
}
.list-bottom-grey-text{
    color:#A6A6A6;
    font-size: 24px;
}
.list-bottom-circle{
    width: 8px;
    height:8px;
    background-color: #CACACA;
    margin-left:10px;
    margin-right:10px;
    border-bottom-left-radius:8px;
    border-bottom-right-radius:8px;
    border-top-left-radius:8px;
    border-top-right-radius:8px;
}
</style>
