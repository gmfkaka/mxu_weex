<template>
  <div class="wrapper">
    <wxc-loading :show="isShow" type="default"></wxc-loading>
    <div class="wrapper" v-if="!isShow">
          <head type="white"></head>
          <scroller class="main">
              <!-- 详情文章 -->
              <div class="article">
                  <text class="article-title">{{data.title}}</text>
                  <div class="article-info">
                      <text class="info-text mr46" v-if="data.source">来源：{{data.source}} </text>
                      <text class="info-text" v-if="data.created_at">{{data.created_at ? data.created_at.substring(0,16) : ''}}</text>
                  </div>
                  <div class="article-content" style="min-height:900px;">
                    <rich-text v-if="richContent" :style="richTextStyle" :content="richContent" @finished="finished"></rich-text>
                  </div>
                  <div class="praise-btn">
                    <div class="praise-box flex-center">
                      <image :src="getLocalImgUrl('icon_dianzan3x.png')" class="praise-img"></image>
                      <text class="praise-num">{{data.praises}}</text>
                    </div>
                  </div>
              </div>
              <!-- 详情文章  end-->
              <div class="dividing-line" ></div>
              <!-- 相关阅读 -->
              <related-read :data="relationsList" v-if="relationsList.length"></related-read>
              <div class="dividing-line" v-if="relationsList.length"></div>
              <!-- 热门评论 -->
              <news-comment :data="commentList" :id="data.id" :fromid="data.content_fromid"></news-comment>
          </scroller>
          <!-- 底部评论 -->
          <comment :data="data"></comment>
      </div>
  </div>

</template>

<script>
import { WxcLoading } from 'weex-ui'
import relatedRead from '../../components/detail/RelatedRead.vue'
import newsComment from '../../components/detail/NewsComment.vue'
import comment from '../../components/detail/Comment.vue'
import head from '../../components/detail/Head.vue'
import { nativeUtil } from '../../lib/nativeUtils'
export default {
  name: 'NewsDetail',
  components: {
    relatedRead,
    comment,
    head,
    WxcLoading,
    newsComment
  },
  data () {
    return {
      isShow: false,
      id: '',
      relationsList: [],
      richTextStyle: {},
      data: {},
      commentList: []
    }
  },
  methods: {
    // 获取详情
    getDetail () {
      this.isShow = true
      this.id = this.getQuery().id
      this.$httpRequest(this.$getHttpUrl('newsDatail'), {id: this.id}, 'get').then(res => {
        if (!res.error_code) {
          this.data = res
          this.isShow = false
          this.relations(this.id)
          this.getCommentList()
        } else {
          this.messageTip(res.error_message)
        }
      }, (e) => {
        this.isShow = false
      })
    },
    // 获取相关阅读
    relations (id) {
      this.$httpRequest(this.$getHttpUrl('newsRelation'), {id}, 'get').then(res => {
        if (!res.error_code) {
          this.relationsList = res
          this.isShow = false
        } else {
          this.messageTip(res.error_message)
        }
      }, (e) => {
      })
    },
    // 获取评论列表
    getCommentList () {
      this.$httpRequest(
        'http://mapi-test.plus.hoge.cn/api/v1/comment.php',
        {
          appid: 'm2ooytobyhnez19vrv',
          appkey: 'd3bda44d6d4b2bb4e28cf3a90c22dc73',
          cmid: this.data.id,
          cid: this.data.content_fromid,
          hot_comment: 2, // 热门评论
          mod_uniqueid: 'news',
          app_uniqueid: 'news'
        },
        'get'
      ).then((res) => {
        if (!res.error_code) {
          this.commentList = res
        } else {
          nativeUtil.alert(res.error_message)
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 富文本加载完成
    finished (e) {
      this.setRichTextStyle(e)
    },
    // 设置富文本高度
    setRichTextStyle (res) {
      let { height } = JSON.parse(JSON.stringify(res))
      if (height <= 50) height = 50
      this.richTextStyle = { height: `${height}px`, padding: `30px` }
    }
  },
  created () {
    this.getDetail()
  },
  computed: {
    richContent () {
      let content = this.data.content + '<style>img{width:100% !important;}p{padding:0 10px !important;font-size:20px !important;}</style>' || '暂无信息'
      return content
    }
  }
}
</script>

<style scoped lang="scss">
 @import "../../style/common.scss";
.wrapper{
  width: 750px;
  flex:1;
}
.main{
  width: 750px;
  flex:1;
  padding-bottom:100px;
}
.article{
  width: 750px;
  padding-top:24px;
  padding-bottom:62px;
}
.article-title{
  font-size: 46px;
  color: #333333;
  text-align: center;
  padding-left:32px;
  padding-right:32px;
}
.article-info{
  flex-direction: row;
  justify-content: center;
  width: 686px;
  align-items: center;
  margin-top:24px;
  margin-bottom:46px;
}
.info-text{
  font-size: 24px;
  color: #9B9B9B;
}
.mr46{
  margin-right:46px;
}
.article-content{
  width: 750px;
}
.praise-btn{
  margin-top:24px;
  height:76px;
  align-items: center;
  justify-content: center;
}
.praise-box{
  height:76px;
  padding-right:52px;
  padding-left:52px;
  border-bottom-left-radius:38px;
  border-bottom-right-radius:38px;
  border-top-left-radius:38px;
  border-top-right-radius:38px;
  border-bottom-style:solid;
  border-bottom-width:1px;
  border-bottom-color:#eeeeee;
  border-top-style:solid;
  border-top-width:1px;
  border-top-color:#eeeeee;
  border-left-style:solid;
  border-left-width:1px;
  border-left-color:#eeeeee;
  border-right-style:solid;
  border-right-width:1px;
  border-right-color:#eeeeee;
}
.praise-img{
  width: 36px;
  height:36px;
  margin-right:8px;
}
.praise-num{
  font-size: 32px;
  color: #9B9B9B;
}
</style>
