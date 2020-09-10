<!-- 评论列表 -->
<template>
    <div  class="list-two-wrapper" >
        <div class="item-top">
            <div class="img-box">
                <image v-if="data.member_info.avatar.host" class="image" resize="cover" :src="data.member_info.avatar.host + data.member_info.avatar.dir + data.member_info.avatar.filepath + data.member_info.avatar.filename"></image>
                <image v-else class="image" resize="cover" :src="getLocalImgUrl('pic_user_default3x.png')"></image>
            </div>
            <div class="info-box">
                <text class="info-name">{{data.member.member_name}}</text>
                <text class="info-time">{{data.created_at?data.created_at.substring(0,10):''}}</text>
            </div>
            <div class="praise-box">
                <text class="praise-text">{{data.like_num}}</text>
                <image @click="praise" :src="getLocalImgUrl('icon_dianzan3x.png')" class="praise-icon"></image>
                <!-- <image v-if="data.useful" :src="getLocalImgUrl('icon_dianzan_commentpre3x.png')" class="praise-icon"></image> -->
            </div>
        </div>
        <div class="comment-content">
            <!-- <text class="replay-text">回复@妈咪妈咪哄：</text> -->
            <text class="content-text">{{data.content}}</text>
        </div>
    </div>

</template>

<script>
// import { nativeUtil } from '../../lib/nativeUtils'
export default {
  props: ['data'],
  name: 'List25',
  components: {
  },
  data () {
    return {
      dianzanState: false
    }
  },
  methods: {
    // 点赞 暂不支持
    praise () {
      // this.$httpRequest(
      //   'http://mapi-test.plus.hoge.cn/api/v1/comment_vote.php',
      //   {
      //     appid: 'm2ooytobyhnez19vrv',
      //     appkey: 'd3bda44d6d4b2bb4e28cf3a90c22dc73',
      //     id: this.data.id
      //   },
      //   'get'
      // ).then(res => {
      //   if (!res.ErrorCode) {
      //     nativeUtil.alert(res)
      //   }
      // }, (e) => {
      //   nativeUtil.alert(e)
      // })
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.list-two-wrapper{
    background-color: #fff;
    padding-left:32px;
    padding-right:32px;
    padding-top:28px;
    padding-bottom:32px;
}
.item-top{
  width: 686px;
  height:64px;
  flex-direction: row;
  // justify-content:space-between;
}
.img-box{
  flex-direction: row;
  align-items: center;
  border-bottom-left-radius:32px;
  border-bottom-right-radius:32px;
  border-top-left-radius:32px;
  border-top-right-radius:32px;
  border-top-style:solid;
  border-top-width:1px;
  border-top-color:  #EEEEEE;
  border-bottom-style:solid;
  border-bottom-width:1px;
  border-bottom-color:  #EEEEEE;
  border-left-style:solid;
  border-left-width:1px;
  border-left-color:  #EEEEEE;
  border-right-style:solid;
  border-right-width:1px;
  border-right-color:  #EEEEEE;
  width: 64px;
  height:64px;
  margin-right: 12px;
}
.image{
  border-bottom-left-radius:30px;
  border-bottom-right-radius:30px;
  border-top-left-radius:30px;
  border-top-right-radius:30px;
  width: 60px;
  height:60px;
}
.info-box{
  width: 550px;
}
.info-name{
  font-size: 28px;
  color: #999999;
  flex:1;
  lines:1;
}
.info-time{
  font-size: 24px;
  color: #777777;
  flex:1;
  lines:1;
}
.praise-box{
  flex-direction: row;
  align-items: center;
}
.praise-text{
  font-size: 28px;
  color: #9B9B9B;
}
.praise-icon{
  width: 28px;
  height:28px;
  margin-left:12px;
  position: relative;
  top:-2px;
}
.comment-content{
  width: 610px;
  margin-left:76px;
  margin-top:20px;
  flex-direction: row;
}
.replay-text{
  font-size: 32px;
  color: #4D96FF;
}
.content-text{
  font-size: 32px;
  color: #999999;
}
</style>
