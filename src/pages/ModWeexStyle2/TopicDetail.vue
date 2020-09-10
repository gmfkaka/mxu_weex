<template>
<div class="wrpper-topic">
   <wxc-loading :show="isShow" type="default"></wxc-loading>
   <div class="wrapper-topic">
        <head type="white" more="true"></head>
        <scroller class="main">
          <image :src="data.index_pics" class="topic-img"></image>
          <div class="title-box">
            <text class="title-text">{{data.title}}</text>
            <div class="tag-box">
                <div class="tag-item"
                v-for="(item,index) in titleList" :key="index">
                  <text class="tag-text">{{item}}</text>
                </div>
            </div>
          </div>
          <div class="list-box" v-for="(item,key,index) in content" :key="index">
            <div class="list-head">
                <text class="head-title">{{key}}</text>
                <div class="list-more">
                    <text class="more-title">更多</text>
                    <image :src="getLocalImgUrl('icon_more3x.png')" class="more-img"></image>
                </div>
            </div>
            <div>
              <div  v-for="(datas,index) in content[key]" :key="index"  @click="jumpDetail(datas)">
                <list21 :data="datas" v-if="datas.css_id==1"></list21>
                <!-- 视频标题 icon -->
                 <list22 :data="datas" v-if="datas.css_id!==8"></list22>
                <!-- 图片标题 icon -->
                <list23 :data="datas" v-if="datas.css_id!==8"></list23>
                <!-- 视频  end-->
                <!-- 上标题 下播放器 下栏目时间阅读数-->
                <list7 :data="datas" v-if="datas.css_id!==8"></list7>
                <!-- 上标题 下播放器 下日期阅读数 -->
                <list13 :data="datas" v-if="datas.css_id!==8"></list13>

              <!-- 专题 start -->
                <!-- 上图 下标题 下专题名 专题（几篇）-->
                <list8 :data="datas" v-if="datas.css_id!==8"></list8>
                <!-- 专题 视频 -->
                <list18 :data="datas" v-if="datas.css_id!==8"></list18>
                <!-- 专题 图集 -->
                <list19 :data="datas" v-if="datas.css_id!==8"></list19>
                  <!-- 专题 新闻 -->
                <list20 :data="datas" v-if="datas.css_id!==8"></list20>
              <!-- 专题 end -->
                <!-- 上标题 下图广告标签 -->
                <list9 :data="datas" v-if="datas.css_id!==8"></list9>
                <!-- 上标题 中两图+标题 下头像参与数 -->
                <!-- 暂时无 -->
                <!-- <list10 :data="datas" v-if="datas.css_id!==8"></list10> -->
                  <!-- 上文字下三图  start-->
                <list1 :data="datas" v-if="datas.css_id!==8"></list1>
                <!-- 左标题右图  上标题 下栏目阅读数start-->
                <list2 :data="datas" v-if="datas.css_id!==8"></list2>
                  <!-- 左标题右图  上标题 下日期阅读数start-->
                <list14 :data="datas" v-if="datas.css_id!==8"></list14>
                <!-- 右标题左图  上标题 下栏目阅读数start-->
                <list11 :data="datas" v-if="datas.css_id!==8"></list11>
                  <!-- 右标题左图  上标题 下日期阅读数start-->
                <list15 :data="datas" v-if="datas.css_id!==8"></list15>
                  <!-- 上标题 下大图带video 下栏目 start -->
                <list3 :data="datas" v-if="datas.css_id!==8"></list3>
                  <!-- 上标题  下栏目 start -->
                <list16 :data="datas" v-if="datas.css_id!==8"></list16>
                  <!-- 上标题  下日期阅读数 start -->
                <list17 :data="datas" v-if="datas.css_id!==8"></list17>
                  <!-- 上标题 下图 下日期阅读数 -->
                <list4 :data="datas" v-if="datas.css_id!==8"></list4>
                <!-- 上文字 下三图（左大右二小） -->
                <list5 :data="datas" v-if="datas.css_id!==8"></list5>
                <!-- 上标题 下两图 下 阅读数 日期 -->
                <list6 :data="datas" v-if="datas.css_id!==8"></list6>
                  <!-- 上标题 中图  下栏目日期阅读数 -->
                <list12 :data="datas" v-if="datas.css_id!==8"></list12>
              </div>
            </div>

          </div>
        </scroller>
    </div>
</div>

</template>

<script>
import { WxcLoading } from 'weex-ui'
import head from '../../components/detail/Head.vue'
import List2 from '../../components/list/List2'
import List10 from '../../components/list/List10'
import List9 from '../../components/list/list9'
import List3 from '../../components/list/List3'
import List1 from '../../components/list/List1'
// 图说
import List4 from '../../components/list/List4'
import List5 from '../../components/list/List5'
import List6 from '../../components/list/List6'
// 视频
import List7 from '../../components/list/List7'
// 专题
import List8 from '../../components/list/List8'
import List11 from '../../components/list/List11'
import List12 from '../../components/list/List12'
import List13 from '../../components/list/List13'
import List14 from '../../components/list/List14'
import List15 from '../../components/list/List15'
import List16 from '../../components/list/List16'
import List17 from '../../components/list/List17'
import List18 from '../../components/list/List18'
import List19 from '../../components/list/List19'
import List20 from '../../components/list/List20'
import List21 from '../../components/list/List21'
import List22 from '../../components/list/List22'
import List23 from '../../components/list/List23'
export default {
  name: 'TopicDetail',
  components: {
    head,
    List1,
    List2,
    List10,
    List9,
    List3,
    List4,
    List5,
    List6,
    List7,
    List8,
    List11,
    List12,
    List13,
    List14,
    List15,
    List16,
    List17,
    List18,
    List19,
    List20,
    List21,
    List22,
    List23,
    WxcLoading
  },
  data () {
    return {
      isShow: false,
      id: '',
      data: {},
      content: {},
      titleList: []
    }
  },
  methods: {
    // 跳转详情页
    jumpDetail (item) {
      if (item.type === 'article') {
        this.jumpWithParams('NewsDetail', {id: item.id})
      } else if (item.type === 'gallery') {
        this.jumpWithParams('GalleryDetail', {id: item.id})
      } else if (item.type === 'topic') {
        this.jumpWithParams('TopicDetail', {id: item.id})
      }
    },
    // 获取列表信息
    getContent () {
      this.$httpRequest(
        this.$getHebeiHttpUrl('topicContent'),
        {
          appkey: 'b7269c8f9a318c69a59dc430cef3ab59',
          appid: 'm2ovki73ruqwcwmw8b',
          device_token: '5b65c48b830dbadd595384a7d54e4d61',
          // version: '3.0.2',
          // app_version: '3.0.2',
          // avos_device_token: '5b65c48b830dbadd595384a7d54e4d61',
          // client_id_ios: '432e1e92ec44129f9f7e453c5a59baa1',
          // phone_models: 'iPhone XS',
          // location_city: '石家庄',
          // latitude: '31.972478',
          // longitude: '118.759846',
          // locating_city: '南京市',
          // language: 'Chinese',
          // column_id: this.id,//暂时？？
          column_id: 69 // 暂时？？
        },
        'get'
      ).then((res) => {
        if (!res.error_code) {
          res.forEach((item) => {
            if (!this.content[item.special_content_column]) {
              this.content[item.special_content_column] = []
            }
            this.content[item.special_content_column].push(item)
          })
          this.titleList = Object.keys(this.content)
          this.isShow = false
        } else {
          this.messageTip(res.error_message)
        }
      }, (e) => {
      })
    }
  },
  mounted () {
  },
  computed: {
  },
  created () {
    this.isShow = true
    this.id = this.getQuery().id
    this.$httpRequest(
      this.$getHebeiHttpUrl('topicDetail'),
      {
        appkey: 'b7269c8f9a318c69a59dc430cef3ab59',
        appid: 'm2ovki73ruqwcwmw8b',
        device_token: '5b65c48b830dbadd595384a7d54e4d61',
        // id: this.id//暂时
        id: 69// 暂时
      },
      'get'
    ).then((res) => {
      if (!res.error_code) {
        res.forEach((vv) => {
          vv.index_pics = vv.indexpic.host + vv.indexpic.filename
        })
        this.data = res[0]
        this.getContent()
      } else {
        this.messageTip(res.error_message)
      }
    }, (e) => {
      this.isShow = false
    })
  }
}
</script>

<style scoped lang="scss">
 @import "../../style/common.scss";
.wrapper-topic{
  width: 750px;
  flex:1;
}
.main{
  width: 750px;
  flex:1;
  padding-bottom:100px;
}
.topic-img{
  width: 750px;
  height:280px;
}
.title-box{
  padding-top:28px;
  padding-bottom:28px;
  padding-left:32px;
  background-color:#f9f9f9;
}
.title-text{
  font-size: 40px;
  color: #333333;
  lines:2;
  padding-right:32px;
  text-overflow: ellipsis;
}
.tag-box{
  width: 750px;
  flex-direction: row;
  flex-wrap: wrap;

}
.tag-item{
  justify-content: center;
  align-items: center;
  width:156px;
  height:52px;
  margin-top:20px;
  border-bottom-left-radius:8px;
  border-bottom-right-radius:8px;
  border-top-left-radius:8px;
  border-top-right-radius:8px;
  background-color:#ffffff;
  margin-right:20px;
}
.tag-text{
  font-size: 14px;
  color: #333333;
}
.list-box{
  width:750px;
  background-color:#ffffff;

  padding-top:28px;
}
.list-head{
  padding-left:32px;
  padding-right:32px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.head-title{
  font-size: 32px;
  color: #000000;
}
.list-more{
  flex-direction: row;
  align-items: center;
}
.more-title{
  font-size: 24px;
  color: #999999;
}
.more-img{
  width: 22px;
  height:22px;
  margin-left:10px;
}
.list-item{
  width:686px;
  flex-direction: row;
  padding-top:30px;
  padding-bottom:30px;
  align-items: center;
  border-bottom-style:solid;
  border-bottom-width:1px;
  border-bottom-color:  #F5F5F5;
}
.list-img{
  width:260px;
  height:180px;
  border-bottom-left-radius:8px;
  border-bottom-right-radius:8px;
  border-top-left-radius:8px;
  border-top-right-radius:8px;
  margin-right:28px;
}
.list-right{
  width: 396px;
}
.list-title{
  font-size: 34px;
  color: #333333;
  lines:2;
  text-overflow: ellipsis;
  margin-bottom:30px;
  height:96px;
}
.list-bottom-text{
  font-size: 24px;
  color: #A6A6A6;
}
</style>
