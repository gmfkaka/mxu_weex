<template>
  <div class="wrapper" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStyleMarginTop">
      <div class="head">
          <image v-if="!showArticleDel && !showMediaDel" :src="getLocalImgUrl('feature_back.png')" class="back-icon" @click="goback"></image>
          <text v-else @click="checkAll">全选</text>
          <text class="title">我的收藏</text>
          <text @click="edit" style="color:#545454;">{{rightText}}</text>
      </div>
      <div class="tab-box">
        <text
          class="tab-item"
          :class="[index === currentIndex ? 'rank-active' :'',index === 0 ? 'br0':'']" v-for="(item,index) in tabList"
          :key="index"
          @click="changeTab(index)">{{item}}</text>
      </div>
      <!-- 文章 -->
      <scroller class="list-box" v-if="currentIndex === 0" show-scrollbar="false">
         <text class="no-data-text" v-if="!articleList.length">这里空空如也~~</text>
         <div class="book-item" :class="[showArticleDel?'pl0':'']" v-for="(item,index) in articleList" :key="index" @click="goDetail(item.extends.outLink)">
            <image v-if="showArticleDel && !item.isChecked" :src="getLocalImgUrl('feature_uncheck.png')" class="check-img" @click="toggleArticleSingleChecked(item,index)"></image>
            <image v-if="showArticleDel && item.isChecked" :src="getLocalImgUrl('feature_check.png')" class="check-img" @click="toggleArticleSingleChecked(item,index)"></image>
            <image :src="item.extends.indexpic" class="book-img"></image>
            <div class="book-box" style="flex:1;">
                <text class="book-title">{{item.extends.title}}</text>
                <text class="book-author">{{item.extends.author}}</text>
                <text class="book-brief" v-if="item.extends.brief === ''">暂无简介</text>
                <text class="book-brief" v-else>{{item.extends.brief}}</text>
            </div>
        </div>
        <text class="del-button" v-if="showArticleDel" @click="delArticle">删除</text>
      </scroller>
      <!-- 视音频 -->
      <scroller class="list-box" v-if="currentIndex === 1" style="padding-top:0;"  show-scrollbar="false">
         <text class="no-data-text" v-if="!audioList.length && !videoList.length">这里空空如也~~</text>
         <!-- 音频 -->
          <div class="audio-item"  :class="[showMediaDel?'pl0':'']" v-for="(item,idx) in audioList" :key="'info'+idx" @click="goDetail(item.extends.outLink)">
            <image v-if="showMediaDel && !item.isChecked" :src="getLocalImgUrl('feature_uncheck.png')" class="check-img" @click="toggleAudioSingleChecked(item,idx)"></image>
            <image v-if="showMediaDel && item.isChecked" :src="getLocalImgUrl('feature_check.png')" class="check-img" @click="toggleAudioSingleChecked(item,idx)"></image>
            <div class="audio-img-box">
              <image :src="item.extends.indexpic" class="audio-img"></image>
              <image class="audio-icon" :src="getLocalImgUrl('feature_audio.png')"></image>
            </div>
            <div class="audio-box">
                <text class="audio-title">{{item.extends.title}}</text>
                <text class="audio-author">{{item.extends.author}}</text>
                <text class="audio-brief" v-if="item.extends.brief">{{item.extends.brief}}</text>
            </div>
          </div>
          <!-- 视频 -->
          <div class="video-container" :class="[showMediaDel?'pl0':'']" v-for="(item,idx2) in videoList" :key="'info1'+idx2" >
            <image v-if="showMediaDel && !item.isChecked" :src="getLocalImgUrl('feature_uncheck.png')" class="check-img" @click="toggleSingleVideoChecked(item,idx2)"></image>
            <image v-if="showMediaDel && item.isChecked" :src="getLocalImgUrl('feature_check.png')" class="check-img" @click="toggleSingleVideoChecked(item,idx2)"></image>
            <div class="video-item" @click="goDetail(item.extends.outLink)">
                <div class="video-img-box">
                    <image :src="item.extends.indexpic" class="video-img"></image>
                    <image class="video-icon" :src="getLocalImgUrl('feature_audio2.png')"></image>
                </div>
                <div class="video-box">
                    <text class="video-title">{{item.extends.title}}</text>
                    <!-- <text class="video-author">{{item.author}}</text> -->
                </div>
                <!-- <text v-if="showBreif" class="brief">{{item.brief}}</text> -->
            </div>
          </div>
          <text class="del-button" v-if="showMediaDel" @click="delMedia">删除</text>
      </scroller>
  </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
const navigator = weex.requireModule('navigator')
export default {
  name: '',
  data () {
    return {
      memberId: '',
      tabList: ['文章收藏', '视音频收藏'],
      currentIndex: 0,
      articleList: [],
      articleListCheckedList: [],
      audioList: [],
      videoList: [],
      mediaCheckedList: [],
      isArticleCheckedAll: false,
      isMediaCheckedAll: false,
      showArticleDel: false, // 是否显示删除按钮
      showMediaDel: false,
      rightText: '编辑'
    }
  },
  methods: {
    goback () {
      this.goBack()
    },
    changeTab (index) {
      this.showArticleDel = false
      this.showMediaDel = false
      this.rightText = '编辑'
      this.currentIndex = index
      if (this.currentIndex === 0) {
        this.getArticleData()
      }
      if (this.currentIndex === 1) {
        this.getAudioData()
        this.getVideoData()
      }
    },
    getUserId () {
      nativeUtil.getUserInfo().then(res => {
        if (res.userid) {
          this.memberId = res.userid
          this.getArticleData()
        }
      })
    },
    goDetail (url) {
      navigator.push({
        url,
        animated: 'true'
      })
    },
    // 切换文章单个选中
    toggleArticleSingleChecked (item, index) {
      let tmp = item
      tmp.isChecked = !this.articleList[index].isChecked
      this.$set(this.articleList, index, tmp)
      if (this.articleList[index].isChecked) {
        this.articleListCheckedList.push(this.articleList[index].uuid)
      } else {
        const index = this.articleListCheckedList.findIndex(ele => ele === item.uuid)
        this.articleListCheckedList.splice(index, 1)
      }
    },
    // 切换音频单个选中
    toggleAudioSingleChecked (item, index) {
      let tmp = item
      tmp.isChecked = !this.audioList[index].isChecked
      this.$set(this.audioList, index, tmp)
      if (this.audioList[index].isChecked) {
        this.mediaCheckedList.push(this.audioList[index].uuid)
      } else {
        const index = this.mediaCheckedList.findIndex(ele => ele === item.uuid)
        this.mediaCheckedList.splice(index, 1)
      }
    },
    // 切换视频单个选中
    toggleSingleVideoChecked (item, index) {
      let tmp = item
      tmp.isChecked = !this.videoList[index].isChecked
      this.$set(this.videoList, index, tmp)
      if (this.videoList[index].isChecked) {
        this.mediaCheckedList.push(this.videoList[index].uuid)
      } else {
        const index = this.mediaCheckedList.findIndex(ele => ele === item.uuid)
        this.mediaCheckedList.splice(index, 1)
      }
    },
    // 文章全选反选
    toggleArticleCheckedAll () {
      this.isArticleCheckedAll = !this.isArticleCheckedAll
      // 全选
      if (this.isArticleCheckedAll) {
        this.articleList.forEach((ele, index) => {
          if (!ele.isChecked) {
            let tmp = ele
            tmp.isChecked = true
            this.$set(this.articleList, index, tmp)
            // ele.isChecked = true
            this.articleListCheckedList.push(ele.uuid)
          }
        })
      } else {
        // 反选
        this.articleList.forEach((ele, index) => {
          if (ele.isChecked) {
            let tmp = ele
            tmp.isChecked = false
            this.$set(this.articleList, index, tmp)
            // ele.isChecked = false
          }
        })
        this.articleListCheckedList = []
      }
    },
    // 视音频全选反选
    toggleMediaCheckedAll () {
      this.isMediaCheckedAll = !this.isMediaCheckedAll
      // 全选
      if (this.isMediaCheckedAll) {
        this.audioList.forEach((ele, index) => {
          if (!ele.isChecked) {
            let tmp = ele
            tmp.isChecked = true
            this.$set(this.audioList, index, tmp)
            this.mediaCheckedList.push(ele.uuid)
          }
        })
        this.videoList.forEach((ele, index) => {
          if (!ele.isChecked) {
            let tmp = ele
            tmp.isChecked = true
            this.$set(this.videoList, index, tmp)
            this.mediaCheckedList.push(ele.uuid)
          }
        })
      } else {
        // 反选
        this.audioList.forEach((ele, index) => {
          if (ele.isChecked) {
            let tmp = ele
            tmp.isChecked = false
            this.$set(this.audioList, index, tmp)
          }
        })
        this.videoList.forEach((ele, index) => {
          if (ele.isChecked) {
            let tmp = ele
            tmp.isChecked = false
            this.$set(this.videoList, index, tmp)
          }
        })
        this.mediaCheckedList = []
      }
    },
    checkAll () {
      this.currentIndex === 0 && this.toggleArticleCheckedAll()
      this.currentIndex === 1 && this.toggleMediaCheckedAll()
    },
    // 文章收藏列表
    getArticleData () {
      const param = {
        bucket_name: 'shoucang',
        where: {
          'extends.member_id': this.memberId,
          'extends.type': 'article'
        }
      }
      this.$httpRequest('http://message-team.cloud.hoge.cn/dev/Apimessage/OpenExtension/show', param, 'post').then(res => {
        this.articleList = res.data
        this.articleList.forEach(ele => {
          ele.isChecked = false
        })
      }, (e) => {
        console.log(e)
      })
    },
    // 音频收藏列表
    getAudioData () {
      const param = {
        bucket_name: 'shoucang',
        where: {
          'extends.member_id': this.memberId,
          'extends.type': 'audio'
        }
      }
      this.$httpRequest('http://message-team.cloud.hoge.cn/dev/Apimessage/OpenExtension/show', param, 'post').then(res => {
        this.audioList = res.data
        this.audioList.forEach(ele => {
          ele.isChecked = false
        })
      }, (e) => {
        console.log(e)
      })
    },
    // 视频收藏列表
    getVideoData () {
      const param = {
        bucket_name: 'shoucang',
        where: {
          'extends.member_id': this.memberId,
          'extends.type': 'video'
        }
      }
      this.$httpRequest('http://message-team.cloud.hoge.cn/dev/Apimessage/OpenExtension/show', param, 'post').then(res => {
        this.videoList = res.data
        this.videoList.forEach(ele => {
          ele.isChecked = false
        })
      }, (e) => {
        console.log(e)
      })
    },
    // 删除文章收藏
    delArticle () {
      if (!this.articleListCheckedList.length) {
        nativeUtil.alert('请勾选要删除的内容')
        return
      }
      const param = {
        bucket_name: 'shoucang',
        where: {
          'extends.member_id': this.memberId,
          'uuid': {
            'in': this.articleListCheckedList
          }
        }
      }
      this.$httpRequest('http://message-team.cloud.hoge.cn/dev/Apimessage/OpenExtension/delete', param, 'post').then(res => {
        if (res.msg === '请求成功') {
          nativeUtil.alert('删除成功')
          this.getArticleData()
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 删除视音频收藏
    delMedia () {
      if (!this.mediaCheckedList.length) {
        nativeUtil.alert('请勾选要删除的内容')
        return
      }
      const param = {
        bucket_name: 'shoucang',
        where: {
          'extends.member_id': this.memberId,
          'uuid': {
            'in': this.mediaCheckedList
          }
        }
      }
      this.$httpRequest('http://message-team.cloud.hoge.cn/dev/Apimessage/OpenExtension/delete', param, 'post').then(res => {
        if (res.msg === '请求成功') {
          nativeUtil.alert('删除成功')
          this.getAudioData()
          this.getVideoData()
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 编辑
    edit () {
      if (this.currentIndex === 0) {
        this.showArticleDel = !this.showArticleDel
        if (this.showArticleDel) {
          this.rightText = '完成'
        } else {
          this.rightText = '编辑'
        }
      }
      if (this.currentIndex === 1) {
        this.showMediaDel = !this.showMediaDel
        if (this.showMediaDel) {
          this.rightText = '完成'
        } else {
          this.rightText = '编辑'
        }
      }
    }
  },
  watch: {
    articleListCheckedList (val) {
      if (this.articleListCheckedList.length && this.articleListCheckedList.length === this.articleList.length) {
        this.isArticleCheckedAll = true
      } else {
        this.isArticleCheckedAll = false
      }
      // console.log(val)
    },
    mediaCheckedList (val) {
      if (this.mediaCheckedList.length && this.mediaCheckedList.length === (this.audioList.length + this.videoList.length)) {
        this.isMediaCheckedAll = true
      } else {
        this.isMediaCheckedAll = false
      }
      // console.log(val)
    }
  },
  created () {
    this.getUserId()
  }
}
</script>

<style lang='scss' scoped>
.wrapper{
  width: 750px;
  flex:1;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 60px;
  padding-bottom: 40px;
  background-color: #f2f6fa;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.x-top{
  margin-top: 90px;
}
.head{
  height: 67px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.title{
  color: #545454;
  flex: 1;
  font-size: 36px;
  text-align: center;
}
.back-icon{
  width: 67px;
  height: 67px;
}
.tab-box{
  width: 730px;
  margin-bottom: 30px;
  flex-direction: row;
}
.tab-item{
  width: 365px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 30px;
  color:rgb(108,174,147);
  border-top-style:solid;
  border-top-width:2px;
  border-top-color:  rgb(108,174,147);
  border-bottom-style:solid;
  border-bottom-width:2px;
  border-bottom-color:  rgb(108,174,147);
  border-left-style:solid;
  border-left-width:2px;
  border-left-color:  rgb(108,174,147);
  border-right-style:solid;
  border-right-width:2px;
  border-right-color:  rgb(108,174,147);
}
.rank-active{
  background-color: rgb(108,174,147);
  color:#fff;
}
.br0{
  border-right-width: 0;
}
.list-box{
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 30px;
  padding-bottom: 40px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 730px;
  flex: 1;
}
.book-item{
    flex-direction: row;
    padding-left: 26px;
    padding-right: 26px;
    margin-bottom: 50px;
}
.book-img{
    width: 170px;
    height: 250px;
    margin-right: 20px;
    position: relative;
}
.book-title{
    font-family:PingFang SC;
    font-size: 32px;
    color:#6A6A6A;
    lines:1;
}
.book-author{
    font-size: 28px;
    color: #9c9c9c;
    height: 34px;
    margin-bottom: 48px;
}
.book-brief{
    font-size: 32px;
    color:#9c9c9c;
    lines:3;
    width: 458px;
    line-height: 42px;
    text-overflow:ellipsis;
}
.no-data-text{
  width: 730px;
  text-align: center;
  padding-top: 500px;
  color: #D3D9E4;
  font-size: 32px;
}
.audio-item{
    flex-direction: row;
    padding-top: 60px;
    padding-left: 20px;
}
.audio-img-box{
    width: 200px;
    height: 200px;
    margin-right: 20px;
    position: relative;
}
.audio-img{
    width: 200px;
    height: 200px;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
}
.audio-title{
    padding-top: 20px;
    font-size: 36px;
    color: #6a6a6a;
}
.audio-author{
    font-size: 28px;
    color: #9c9c9d;
}
.audio-brief{
    font-size: 32px;
    color:#9c9c9c;
    lines:1;
    width: 420px;
    text-overflow:ellipsis;
    margin-top: 34px;
}
.audio-icon{
    width: 60px;
    height: 60px;
    position: absolute;
    left: 70px;
    top: 70px;
}
.video-container{
  padding-top: 40px;
  padding-left: 26px;
  padding-right: 26px;
  flex-direction: row;
}
.video-img-box{
    width: 650px;
    height: 290px;
    position: relative;
}
.video-img{
    width: 650px;
    height: 290px;
}
.video-title{
    padding-top: 15px;
    font-size: 32px;
    color:#6a6a6a;
    lines:1;
}
.video-author{
    font-size: 28px;
}
.video-icon{
    width: 60px;
    height: 60px;
    position: absolute;
    left: 321px;
    top: 143px;
}
.item{
    flex-direction: row;
    height: 80px;
    align-items: center;
    margin-left: 20px;
}
.check-icon{
    width: 40px;
    height: 40px;
    border: 1px solid #000;
    margin-right: 10px;
}
.checked{
    background-color: #000;
}
.del-button{
  height: 70px;
  line-height: 70px;
  text-align: center;
  position: fixed;
  bottom: 20px;
  left: 40px;
  right: 40px;
  color: #fff;
  background-color: #6cae93;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.check-img{
  width: 40px;
  height: 40px;
  margin-top: 105px;
  margin-right: 10px;
}
.pl0{
  padding-left: 0;
}
</style>
