
<template>
    <div  class="img-list-wrapper">
        <div class="img-item" v-for="(item,index) in data" :key="index" v-if="index<3">
            <!-- 图片新数据 -->
            <image resize="cover" :src="getImage(item,228,228)" class="img" v-if="item.hasOwnProperty('imgwidth') && !item.is_old"></image>
            <!-- 图片老数据 -->
            <image resize="cover" :src="item.host + item.dir +  '228x228/' +item.filepath + item.filename" class="img" v-if="item.hasOwnProperty('imgwidth') && item.is_old ==1"></image>
            <!-- 视频数据 -->
            <image resize="cover" :src="item.img.host + item.img.dir +  '228x228/' +item.img.filepath + item.img.filename" class="img" v-if="item.img"></image>
            <div class="cover-box" v-if="index==2&& data.length>3">
                <div>
                    <div class="cover-num-box">
                     <text class="cover-num">{{num}}</text>
                    </div>

                     <text class="cover-name">全部图片</text>
                </div>

            </div>
        </div>

    </div>

</template>

<script>
export default {
  props: ['data', 'num'],
  name: 'list1',
  components: {
  },
  data () {
    return {

    }
  },
  methods: {
    // 图片裁剪
    getImage  (obj, width, height) {
      const imgwidth = width || obj.imgwidth
      const imgheight = height || obj.imgheight
      let url = obj.host + obj.dir + obj.filepath + obj.filename
      url = url.replace('{&#036;hgPicSizeStart}', '').replace('{&#036;hgPicSizeWidth}', imgwidth).replace('{&#036;hgPicSizeHeight}', imgheight).replace('{&#036;hgPicSizeEnd}', '')
      return url
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.img-list-wrapper{
    width: 702px;
    flex-direction: row;
    justify-content: space-between;
}
.img-item{
    width: 228px;
    height:228px;
    border-bottom-left-radius:4px;
    border-bottom-right-radius:4px;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
    position: relative;
}
.img{
    width: 228px;
    height:228px;
    border-bottom-left-radius:4px;
    border-bottom-right-radius:4px;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
}
.cover-box{
    position: absolute;
    top:0;
    left:0;
    width: 228px;
    height:228px;
    border-bottom-left-radius:4px;
    border-bottom-right-radius:4px;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
    background-color: rgba(rgb(0, 0, 0),0.5);
    align-items: center;
    justify-content: center;
}
.cover-num-box{
    margin-bottom:8px;
}
.cover-num{
    text-align: center;
    font-size: 36px;
    color:#ffffff;

}
.cover-name{
    font-size:24px;
    color:#ffffff;
}
</style>
