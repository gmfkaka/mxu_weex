<template>
    <div class="meida-wrapper" :style="wrapStyle" @click="goDetail()">
        <image v-if="data.snap.filename" :src="data.snap.host+data.snap.filename" class="img" :style="{width:width}"></image>
        <image v-if="!data.snap.filename" :src="getLocalImgUrl('img_cover2x.png')" class="img" :style="{width:width}"></image>
        <div :style="style" class="cover-div"></div>
        <div class="icon-box">
            <image :src="data.logo.square.host+data.logo.square.filename" class="icon-img"></image>
            <text class="icon-title">{{data.name}}</text>
        </div>
        <div class="title-box">
              <text class="title">{{data.cur_program.program}}</text>
              <text class="brief">暂无此字段</text>
        </div>
    </div>
</template>

<script>
export default {
  props: ['width', 'data', 'color'],
  name: 'List1',
  components: {
  },
  data () {
    return {
      wrapStyle: {},
      style: {}
    }
  },
  methods: {
    goDetail () {
      this.jumpWithParams('MediaDetail', {})
    }
  },
  computed: {
  },
  created () {
    this.wrapStyle = {
      width: this.width
    }
    this.style = {
      width: this.width,
      backgroundImage: `linear-gradient(to bottom, ${this.color[0]}, ${this.color[1]})`
    }
  }
}
</script>

<style scoped lang="scss">
.meida-wrapper{
   height:320px;
   border-top-left-radius:16px;
   border-top-right-radius:16px;
   border-bottom-right-radius:16px;
   border-bottom-left-radius:16px;
   position: relative;
}
.img{
  height:320px;
   border-top-left-radius:16px;
   border-top-right-radius:16px;
   border-bottom-right-radius:16px;
  border-bottom-left-radius:16px;
}
.cover-div{
    border-top-left-radius:16px;
    border-top-right-radius:16px;
    border-bottom-right-radius:16px;
    border-bottom-left-radius:16px;
    height:320px;
    position: absolute;
    top:0;
    right:0;
    left:0;
}
.icon-box{
    position: absolute;
    top:12px;
    left:12px;
    flex-direction: row;
    align-items: center;
}
.icon-img{
    width: 32px;
    height:32px;
    margin-right:8px;
    border-bottom-left-radius:16px;
    border-bottom-right-radius:16px;
    border-top-left-radius:16px;
    border-top-right-radius:16px;
}
.icon-title{
    font-size: 20px;
    color: #FFFFFF;
}
.title-box{
    position: absolute;
    left:24px;
    right:24px;
    bottom:12px;
}
.title{
   lines:1;
   text-overflow:ellipsis;
   color:#ffffff;
   font-size: 26px;
}
.brief{
    lines:1;
    text-overflow:ellipsis;
    margin-top:4px;
    font-size: 20px;
    color: #FFFFFF;
}
</style>
