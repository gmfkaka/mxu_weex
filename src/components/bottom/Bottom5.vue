<template>
    <div class="list-bottom-wrapper">
        <div class="bottom-info">
           <text class="column">{{data.name}}</text>
           <div class="acception-box" v-if="data.is_accept">
              <image :src="getLocalImgUrl('pic_picked3x.png')" class="acception-img-comment"></image>
              <text class="acception-text">已采纳</text>
           </div>

        </div>
        <div class="bottom-num-box">
            <div class="num-box mr32">
                <image :src="getLocalImgUrl('icon_comment3x.png')" class="num-img-comment"></image>
                <text class="num-text">{{data.comm_num}}</text>
            </div>
            <div class="num-box">
                <image :src="getLocalImgUrl('icon_view3x.png')" class="num-img-read"></image>
                <text class="num-text">{{data.clicks}}</text>
            </div>
        </div>

    </div>

</template>

<script>

export default {
  props: ['data'],
  name: 'Bottom5',
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
.list-bottom-wrapper{
  // width: 686px;
  margin-top:16px;
  flex-direction: row;
  align-items: center;
}
.bottom-info{
  flex:1;
  flex-direction: row;
  align-items: center;
}
.grey-text{
    font-size: 22px;
    color: #A6A6A6;
    lines:1;
   text-overflow:ellipsis;
   margin-top:4px;
}
.acception-img-comment{
  width: 22px;
  height:28px;
  margin-right:9px;
}
.title-text{
   font-size: 26px;
  color: #333333;
   lines:1;
   text-overflow:ellipsis;
}
.column{
  font-size: 20px;
  color: #333333;
}
.acception-box{
  flex-direction: row;
  align-items: center;
  margin-left:40px;
}
.acception-img{
  width: 22px;
  height:28px;
  margin-right:10px
}
.acception-text{
  font-size: 20px;
  color: #F5A623;
}
.bottom-num-box{
  flex-direction: row;
  align-items: center;
}
.num-box{
  flex-direction: row;
  align-items: center;
}
.num-img-comment{
  width: 24px;
  height:20px;
  margin-right:9px;
}
.num-text{
  font-size: 22px;
  color: #9B9B9B;
}
.num-img-read{
  width: 28px;
  height:20px;
  margin-right:10px;
}
.mr32{
  margin-right:32px;
}
</style>
