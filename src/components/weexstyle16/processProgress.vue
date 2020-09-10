
<template>
    <div  class="process-box" :class="[this.isIphoneX() ? 'ipx-margin-bottom' : '']">
        <!-- 官方回复 -->
        <div v-for="(rep,idx) in progress.reply"  :key="rep.create_time" class="process-item">
            <!-- 头部 -->
            <div class="long-process-head">
                 <image resize="contain" :src="getLocalImgUrl('circle-blue2x.png')" v-if="idx==0" class="state-circle"></image>
                 <image resize="contain" :src="getLocalImgUrl('circle-grey2x.png')"  v-if="idx!=0" class="state-circle"></image>
                <text class="process-text long-process-text"
                :class="[idx==0?'active-text':'']">{{rep.reply_unit}}</text>
                <text class="process-time">
                    {{format(rep.create_time*1000,'.')}}
                </text>
            </div>
            <div class="rep-process-box">
                <text class="rep-text">{{rep.content}}</text>
                <div class="img-boxs" v-if="rep.pic.length">
                    <!-- 写一起无法换行，时间紧迫暂时这么写 后续改 -->
                    <div class="img-box-content">
                        <image resize="cover"  v-if="index<3" v-for="(item,index) in rep.pic" :key="index" @click="showImg(rep.pic,index)"
                        :src="getImage(item,114,114)" class="imgs" :class="[(index +1)%3 !==0?'mr8':'']"></image>
                    </div>
                    <div class="img-box-content mr12">
                        <image resize="cover"  v-if="index>=3 && index<6" v-for="(item,index) in rep.pic" :key="index" @click="showImg(rep.pic,index)"
                        :src="getImage(item,114,114)" class="imgs" :class="[(index +1)%3 !==0?'mr8':'']"></image>
                    </div>
                    <div class="img-box-content mr12">
                        <image resize="cover"  v-if="index>=6" v-for="(item,index) in rep.pic" :key="index" @click="showImg(rep.pic,index)"
                        :src="getImage(item,114,114)" class="imgs" :class="[(index +1)%3 !==0?'mr8':'']"></image>
                    </div>
                </div>
            </div>
        </div>
        <!-- 流转 -->
        <div v-for="(rep,index) in progress.assign" :key="rep.create_time" class="process-item">
            <!-- 头部 -->
            <div class="long-process-head">
                 <image resize="contain" :src="getLocalImgUrl('circle-blue2x.png')" v-if="index==0 && !progress.reply.length" class="state-circle"></image>
                 <image resize="contain" :src="getLocalImgUrl('circle-grey2x.png')"  v-else class="state-circle"></image>
                <!-- 受理单位start -->
                <text class="process-text long-process-text"
                :class="[index==0 && !progress.reply.length?'active-text':'']"
                v-if="rep.is_accept==2">{{rep.from_name}} 转 {{rep.to_name}}受理</text>
                 <text class="process-text long-process-text" v-if="rep.is_accept!=2"
                :class="[index==0 && !progress.reply.length?'active-text':'']"
                >{{rep.to_name}}受理</text>
                <!-- 受理单位start -->
                <text class="process-time">
                    {{format(rep.create_time*1000,'.')}}
                </text>
            </div>
            <div class="rep-process-box">
                <text class="rep-text">{{rep.content}}</text>
            </div>
        </div>
        <div class="process-item">
             <div class="long-process-head">
                 <image resize="contain" :src="getLocalImgUrl('circle-blue2x.png')" v-if="!progress.load &&!progress.reply.length && !progress.assign.length" class="state-circle"></image>
                 <image resize="contain" :src="getLocalImgUrl('circle-grey2x.png')"  v-else class="state-circle"></image>
                <!-- 受理单位start -->
                <text class="process-text long-process-text"
                :class="[!progress.load&&!progress.reply.length && !progress.assign.length?'active-text':'']">报料</text>
                <text class="process-time">
                    {{progress.fact_create_time?format(progress.fact_create_time*1000,'.'):""}}
                </text>
            </div>
        </div>

    </div>

</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
export default {
  props: ['progress', 'loading'],
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
    },
    // 展示图片
    showImg (data, index) {
      let pics = []
      if (data.length) {
        data.forEach((v, k) => {
          pics.push(this.getImage(v))
        })
      }
      const param = {
        index: index + '',
        imgs: pics
      }
      nativeUtil.viewPictures(param)
    }

  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.process-box{
    width: 750px;
    padding-top:40px;
    padding-bottom:40px;
    padding-left:24px;
    padding-right:24px;
}
.ipx-margin-bottom{
  padding-bottom:60px;
}
.process-item{
    width: 702px;
}
// 头部信息
.process-head{
    width: 702px;
    height:24px;
    flex-direction: row;
    align-items: center;
    position: relative;
}
.long-process-head{
    width: 702px;
    flex-direction: row;
    align-items: center;
    position: relative;
}
// 圆点
.state-circle{
    width: 16px;
    height:16px;
    margin-right:15px;
}
.process-text{
    color:#666666;
    font-size: 24px;
}
.long-process-text{
    width: 400px;
}
.active-text{
    color:#00AFFE;
    font-size: 24px;
}
.process-time{
    color:#BABABA;
    font-size: 20px;
    // margin-left:30px;
    position: absolute;
    right:0px;
    top:-15px;
}
.rep-process-box{
    margin-left:7px;
    width: 694px;
    padding-top:20px;
    padding-bottom:24px;
    margin-top:8px;
    margin-bottom:8px;
    padding-left:20px;
    border-left-style:dashed;
    border-left-width:1px;
    border-left-color:#D9D9D9;
}
.rep-text{
 color:#333333;
 font-size: 28px;
}
.img-boxs{
    margin-top:8px;
}
.img-box-content{
    flex:1;
    flex-direction: row;
    flex-wrap: wrap;
}
.imgs{
    width: 218px;
    height:218px;
    border-bottom-left-radius:4px;
    border-bottom-right-radius:4px;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
}
.mr8{
    margin-right:8px;
}
.mr12{
    margin-top:12px;
}
</style>
