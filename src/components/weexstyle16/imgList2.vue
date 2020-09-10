
<template>
    <div  class="img-list-wrapper">
        <div class="img-item" v-for="(item,index) in data" :key="index" v-if="index<2">
            <!-- 图片新数据 -->
            <image resize="cover" :src="getImage(item,340,192)"  class="img" v-if="item.hasOwnProperty('imgwidth') && !item.is_old"></image>
            <!-- 图片老数据 -->
            <image resize="cover" :src="item.host + item.dir +  '340x192/' +item.filepath + item.filename" class="img" v-if="item.hasOwnProperty('imgwidth') && item.is_old ==1"></image>
            <!-- 视频数据 -->
            <image resize="cover" :src="item.img.host + item.img.dir +  '340x192/' +item.img.filepath + item.img.filename" class="img" v-if="item.img"></image>
        </div>

    </div>

</template>

<script>
export default {
  props: ['data'],
  name: 'list2',
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
    width: 339px;
    height:192px;
    border-bottom-left-radius:4px;
    border-bottom-right-radius:4px;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
}
.img{
    width: 339px;
    height:192px;
    border-bottom-left-radius:4px;
    border-bottom-right-radius:4px;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
}
</style>
