<template>
    <div class="list-bottom-wrapper">
        <div class="text-box">
           <text class="list-bottom-red-text" v-if="parseInt(data.is_top,10)">置顶</text>
           <text class="list-bottom-red-text" v-if="parseInt(data.is_hot,10)">头条推荐</text>
           <text class="grey-text">{{data.created_at}}</text>
        </div>
        <div class="num-box">
            <div class="num-box mr32">
                <image :src="getLocalImgUrl('icon_comment3x.png')" class="num-img-comment"></image>
                <text class="num-text">{{data.comment_num}}</text>
            </div>
            <div class="num-box">
                <image :src="getLocalImgUrl('icon_view3x.png')" class="num-img-read"></image>
                <text class="num-text">{{data.click_num}}</text>
            </div>
        </div>
    </div>

</template>

<script>

export default {
  props: ['data'],
  name: 'Bottom1',
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
    flex:1;
    flex-direction: row;
    justify-content: space-between;
    margin-top:28px;
}
.text-box{
  flex-direction: row;
  align-items: center;
}
.grey-text{
    font-size: 24px;
    color: #A6A6A6;
}
.list-bottom-red-text{
    color:#E02929;
    font-size:24px;
    margin-right:20px;
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
