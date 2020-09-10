<template>
    <div>
    <div v-if="dataList.length">
        <div v-for="(item,index) in dataList" :key="index" @click="goDetail(item)">
          <div  class="list-wrapper" :style="{'background-color':bgc}">
              <div class="list-head">
                <div class="user-info-box">
                  <image :src="item.avatar.host+item.avatar.filepath+item.avatar.filename" class="user-img" v-if="item.avatar" @click="getLoaction()"></image>
                  <image :src="getLocalImgUrl('pic_user_default3x.png')" v-if="!item.avatar" class="user-img" @click="getLoaction()"></image>
                  <div class="user-info">
                      <text class="user-name">{{item.user_name}}</text>
                      <text class="user-time">{{item.created_at.substring(0,16)}}</text>
                  </div>
                </div>
                <div class="reply-box">
                    <div class="reply-btn" v-if="item.opinion" :style="{'background-color':btnColor}">
                      <text class="reply-btn-text">已回复</text>
                    </div>
                    <div class="replyed" v-else>
                        <text class="replyed-text">未回复</text>
                    </div>
                </div>
              </div>
              <div class="list-content">
                  <text class="list-title">{{item.content}}
                  </text>
                  <!-- 视频 -->
                  <div class="list-video" v-if="item.videolog === 1 && item.video_url.length && item.video_url[0]['is_audio'] === 0">
                      <div class="list-video-box">
                          <image :src="item.indexpic.host+item.indexpic.filepath+item.indexpic.filename" class="list-video-img" ></image>
                          <image :src="getLocalImgUrl('icon_radioplayer3x.png')" class="list-video-play" ></image>
                      </div>
                  </div>
                  <!-- 语音 -->
                  <div class="list-voice" v-if="item.videolog === 0 && item.video_url.length && item.video_url[0]['is_audio'] === 1">
                    <div class="list-voice-box">
                        <image :src="getLocalImgUrl('VoiceMessage3x.png')" class="list-voice-img" ></image>
                        <text class="list-voice-text">3"</text>
                    </div>
                  </div>
                  <!-- 语音 end-->
                  <!-- 图集 -->
                  <div class="list-imgs" v-if="item.videolog === 0 && !item.video_url.length && item.pics.length">
                    <div class="list-imgs-box">
                        <image :src="img.host+img.filepath+img.filename" class="list-imgs-img"
                        :class="[(idx+1)%3==0?'':'mr12',idx>2?'mt12':'',item.pics.length===1?'img-one':'']"
                        v-for="(img,idx) in item.pics" :key="idx"></image>
                    </div>
                  </div>
                  <!-- 图集 end-->
              </div>
              <bottom5 :data="item"></bottom5>
          </div>
          <div class="divider" :class="[index===dataList.length-1 ? 'no-divider' : '']"></div>
        </div>
    </div>
    <div v-else class="no-data">
      <text>暂无数据</text>
    </div>
    </div>
</template>

<script>
import Bottom5 from '../bottom/Bottom5'
const nativeUtilModule = weex.requireModule('nativeUtil')
export default {
  props: ['dataList', 'bgc', 'btnColor'],
  name: 'List1',
  components: {
    Bottom5
  },
  data () {
    return {

    }
  },
  methods: {
    goDetail (item) {
      this.jumpWithParams('ReportDetail', {id: item.id})
    },
    getLoaction () {
      nativeUtilModule.seekLocationInfo(res => {
        this.messageTip(res)
      })
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.list-wrapper{
    background-color: #fff;
    padding-left:32px;
    padding-right:32px;
    padding-top:36px;
    padding-bottom:40px;
}
.list-head{
  flex-direction: row;
  align-items: flex-start;
}
.user-info-box{
  flex:1;
  flex-direction: row;
  align-items: center;
}
.user-img{
  width: 64px;
  height:64px;
  border-bottom-left-radius:32px;
  border-bottom-right-radius:32px;
  border-top-left-radius:32px;
  border-top-right-radius:32px;
  margin-right:10px;
}
.user-name{
  font-size: 28px;
  color: #333333;
  flex:1;
  lines:1;
  text-overflow:ellipsis;
}
.user-time{
  flex:1;
  lines:1;
  font-size: 22px;
  color: #888888;
  text-overflow:ellipsis;
  margin-top:4px;
}
.reply-box{

}
.reply-btn{
  width: 92px;
  height:40px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius:4px;
  border-bottom-right-radius:4px;
  border-top-left-radius:4px;
  border-top-right-radius:4px;
  border-left-color: #DDDDDD;
  border-left-style: solid;
  border-left-width: 1px;
  border-right-color: #DDDDDD;
  border-right-style: solid;
  border-right-width: 1px;
  border-top-color: #DDDDDD;
  border-top-style: solid;
  border-top-width: 1px;
  border-bottom-color: #DDDDDD;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}
.reply-btn-text{
  font-size: 24px;
  color: #888888;
}
.replyed-text{
  font-size: 24px;
  color: #E02929;
}

.list-content{
  margin-top:20px;
  width: 686px;
}
.list-title{
  width: 686px;
  font-size: 34px;
  color: #333333;
  lines:2;
  text-overflow:ellipsis;
  margin-bottom:8px;
}
.list-video{
  width: 686px;
  height:388px;
  margin-bottom:10px;
}
.list-video-box{
  width: 686px;
  height:388px;
  position: relative;
}
.list-video-img{
  width: 686px;
  height:388px;
}
.list-video-play{
  width: 128px;
  height: 128px;
  position: absolute;
  top:130px;
  left:280px;
}
.video_box{
  width: 686px;
  height:388px;
}
// 语音
.list-voice{
  width: 686px;
  height:72px;
  margin-bottom:10px;
}
.list-voice-box{
  position: relative;
  width: 200px;
  height:72px;
  background-color: #EEEEEE;
  border-bottom-left-radius:20px;
  border-bottom-right-radius:20px;
  border-top-right-radius:20px;
  padding-left:20px;
  padding-right:20px;
  flex-direction: row;
  align-items: center;
}
.list-voice-img{
  width: 20px;
  height:26px;
  margin-right:16px;
}
.list-voice-text{
  font-size: 28px;
  color: #666666;
}
// 图集
.list-imgs{
  width: 686px;
  margin-bottom:10px;
}
.list-imgs-box{
  width: 686px;
  flex-direction: row;
  flex-wrap: wrap;
}
.list-imgs-img{
  width: 220px;
  height:220px;
}
.mr12{
  margin-right:12px;
}
.mt12{
   margin-top:12px;
}
.img-one{
   width: 686px;
   height: 383px;
}
.no-data{
  height: 850px;
  align-items: center;
  justify-content: center;
}
.divider{
    height: 20px;
    background-color: #f6f6f6;
}
.no-divider{
    height: 0;
}
</style>
