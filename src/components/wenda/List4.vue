<template>
    <div  class="list-two-wrapper" >
        <div class="item-top">
            <div class="img-box">
                <image v-if="data.avatar" class="image" resize="cover" :src="data.avatar.host+data.avatar.dir+data.avatar.filepath+data.avatar.filename"></image>
                <image v-else class="image" resize="cover" :src="getLocalImgUrl('pic_user_default3x.png')"></image>
            </div>
            <div class="info-box">
                <text class="info-name" v-if="type === 1">{{data.user_name}}</text>
                <text class="info-name" style="color:rgba(102,102,102,1);" v-if="type === 2">{{data.user_name}}回答了你的问题</text>
            </div>
        </div>
        <div class="comment-content">
            <text class="content-text">{{data.content}}</text>
        </div>
        <text class="publish-time">{{data.create_time}}</text>
    </div>
</template>

<script>
export default {
  props: ['data', 'type'],
  name: 'List4',
  data () {
    return {

    }
  },
  methods: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
.list-two-wrapper{
    background-color: #fff;
    padding-left:24px;
    padding-right:30px;
    padding-top:30px;
    padding-bottom:30px;
    margin-bottom: 30px;
}
.item-top{
  width: 686px;
  height:64px;
  flex-direction: row;
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
  flex-direction: row;
  align-items: center;
}
.info-name{
  font-size: 28px;
  color: #000000;
  flex:1;
  lines:1;
}
.comment-info-name{
  font-size: 28px;
  color: #333333;
  flex:1;
  lines:1;
}
.info-time{
  font-size: 24px;
  color: #999999;
  lines:1;
}
.praise-box{
  width: 550px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 76px;
}
.reply-praise-box{
  width: 420px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 76px;
}
.praise-text{
  font-size: 24px;
  color: #999999;
}
.praise-icon{
  width: 28px;
  height:28px;
  margin-left:12px;
  position: relative;
}
.comment-icon{
  width: 30px;
  height:25px;
  margin-left:12px;
  position: relative;
  top:-2px;
}
.comment-content{
  width: 610px;
  flex-direction: row;
  margin-left:76px;
  margin-bottom: 34px;
}
.content-text{
  width: 585px;
  font-size: 28px;
  color: #333333;
}
.publish-time{
   margin-left:76px;
   color: rgba(153,153,153,1);
   font-size: 24px;
}
</style>
