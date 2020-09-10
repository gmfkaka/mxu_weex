<template>
     <div class="post-wrapper" :style="{'background-color':formatColor(config.attrs.listBackground)}">
         <scroller class="main">
            <div class="head" :style="{'border-bottom-color':formatColor(config.attrs.navbarDividerColor)}">
                <text class="head-text" :style="{'color':formatColor(config.attrs.navBarTitleColor)}">报料正文</text>
                <image :src="getLocalImgUrl('icon_share3x.png')" class="share-img" @click="share()"></image>
                <image :src="getLocalImgUrl('icon_back3x.png')" class="back-icon" @click="goback()"></image>
            </div>
            <!-- 主体 -->
            <div class="main-content">
                <div class="user-info-box">
                    <image :src="detail.avatar.host+detail.avatar.filepath+detail.avatar.filename" class="main-avatar" v-if="detail.avatar"></image>
                    <image :src="getLocalImgUrl('pic_user_default3x.png')" class="main-avatar" v-else></image>
                    <div class="user-info">
                        <text class="user-info-name">{{detail.user_name}}</text>
                        <text class="user-info-pubtime">{{detail.created_at}}</text>
                    </div>
                </div>
                <text class="main-brief">{{detail.content}}</text>
                <!-- 详情附件 -->
                <div class="material-item" v-for="(item,index) in detail.materials" :key="index">
                    <!-- 图片 -->
                    <div class="material-img-box" v-if="item.type === 'image'">
                        <image class="material-img" :src="item.material_info.url" :style="{height:(item.material_info.height/item.material_info.width)*694+'px'}" @click="viewPictures(item.material_info.url)"></image>
                    </div>
                    <!-- 图集 -->
                    <div class="material-img-box" v-if="false">
                        <div class="img-item" v-for="(item,index) in detail.imgs" :key="index">
                            <image :src="getLocalImgUrl('pic_notice3x.png')" class="main-imgs"></image>
                        </div>
                    </div>
                    <!-- 视频 -->
                    <div class="material-video-box" v-if="item.type === 'video'">
                        <video class="material-video" :src="item.material_info.url" :style="{height:(item.material_info.height/item.material_info.width)*694+'px'}"  controls></video>
                    </div>
                    <!-- 音频 -->
                    <div class="material-audio-box" v-if="item.type === 'audio'">
                        audio
                    </div>
                </div>
                <div class="status-box">
                    <text class="status-title">{{detail.name}}</text>
                    <div class="picked-box" v-if="detail.is_accept === 1">
                        <image :src="getLocalImgUrl('pic_picked3x.png')" class="picked-img"></image>
                        <text class="picked-text">已采纳</text>
                    </div>
                    <div class="position-box" v-if="detail.addr">
                        <image :src="getLocalImgUrl('icon_location_pre3x.png')" class="position-img"></image>
                        <text class="position-text">{{detail.addr}}</text>
                    </div>
                </div>
            </div>
            <!-- 小编回复 -->
            <div class="editor-reply-box" v-if="detail.opinion">
                <image :src="getLocalImgUrl('pic_reply3x.png')" class="editor-img"></image>
                <text class="reply-content">{{detail.opinion}}</text>
            </div>
            <div class="divider"></div>
            <!-- 评论列表 -->
            <div class="comment-box">
                <div class="comment-head">
                    <div class="comment-head-item">
                        <text class="comment-left">评论</text>
                        <text class="comment-right">{{detail.comments}}</text>
                    </div>
                    <div class="comment-head-item">
                        <text class="comment-left">浏览</text>
                        <text class="comment-right">{{detail.clicks}}</text>
                    </div>
                </div>
                <div class="comment-item" v-for="(item,index) in commentList" :key="index">
                    <div class="comment-item-inner" :class="[index ===  commentList.length-1 ? 'b0' : '']">
                        <div class="user-info-box">
                            <image :src="item.member_info.avatar.host + item.member_info.avatar.filepath + item.member_info.avatar.filename" class="main-avatar" v-if="item.member_info.avatar"></image>
                            <image :src="getLocalImgUrl('pic_user_default3x.png')" class="main-avatar" v-else></image>
                            <div class="user-info">
                                <text class="user-info-name">{{item.username}}</text>
                                <text class="user-info-pubtime">{{item.created_at}}</text>
                            </div>
                        </div>
                        <text class="comment-content" v-if="!item.ori_username">{{item.content}}</text>
                        <div class="comment-content-reply" v-else>
                            <div class="reply-top">
                                <text class="reply-uname">回复@{{item.ori_username}}：</text>
                                <text class="reply-brief">{{item.ori_content}}</text>
                            </div>
                            <image :src="getLocalImgUrl('pic_notice3x.png')" class="reply-img"></image>
                        </div>
                        <text class="reply-button" :style="{'background-color':formatColor(config.attrs.button_backgroundcolor)}">回复</text>
                    </div>
                </div>
            </div>
         </scroller>
         <!-- 评论输入框 -->
         <div class="comment-bottom">
             <input type="text" placeholder="回复楼主：" class="comment-input">
             <image :src="getLocalImgUrl('icon_emoji3x.png')" class="emoji-img"></image>
         </div>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
export default {
  name: 'ReportDetail',
  data () {
    return {
      detail: {},
      commentList: [],
      config: {},
      api: {}
    }
  },
  methods: {
    goback () {
      this.goBack()
    },
    // 获取配置文件
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'id': '9642',
          'uniqueid': 'contribute',
          'type': '1',
          'name': '报料',
          'ename': 'contribute',
          'custom_name': 'contribute',
          'normal_pic': {
            'id': '27891',
            'host': 'http://mm.u.hoge.cn/',
            'dir': 'mxu/',
            'filepath': '2019/0611/2d/',
            'filename': '2d742b151ef964dcb4793c5df5b88de83x.png?{$hgPicSizeStart}imageView2/1/w/{$hgPicSizeWidth}/h/{$hgPicSizeHeight}{$hgPicSizeEnd}',
            'imgwidth': '200',
            'imgheight': '200',
            'filesize': '11679'
          },
          'press_pic': {
            'id': '27892',
            'host': 'http://mm.u.hoge.cn/',
            'dir': 'mxu/',
            'filepath': '2019/0611/e3/',
            'filename': 'e33409def7bc5afcb5980fbb1cc1af073x.png?{$hgPicSizeStart}imageView2/1/w/{$hgPicSizeWidth}/h/{$hgPicSizeHeight}{$hgPicSizeEnd}',
            'imgwidth': '200',
            'imgheight': '200',
            'filesize': '11679'
          },
          'url': '',
          'is_master': '1',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '0',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle1',
          'android_min': null,
          'android_max': null,
          'ios_min': null,
          'ios_max': null,
          'attrs': {
            'navBarTitle': '',
            'button_backgroundcolor': '#fff9f9f9',
            'navBarTitleColor': '#000',
            'navbarDividerColor': '#ccc',
            'listBackground': '#ffffffff',
            'moduleBatteryBar': '0'
          },
          'api': {
            'content_detail': 'http://mapi-test.plus.hoge.cn/api/v1/contribute_detail.php',
            'dept_list': 'http://mapi-test.plus.hoge.cn/api/v1/contribute_sort.php',
            'detail_comment_list': 'http://mapi-test.plus.hoge.cn/api/v1/comment.php',
            'home_column': 'http://mapi-test.plus.hoge.cn/api/v1/contribute_column.php',
            'home_list': 'http://mapi-test.plus.hoge.cn/api/v1/contribute_show.php',
            'home_list_mine': 'http://mapi-test.plus.hoge.cn/api/v1/contribute_show_self.php',
            'send_content': 'http://mapi-test.plus.hoge.cn/api/v1/contribute.php'
          }
        }
        this.api = this.config.api
        this.getDetail(this.getQuery().id)
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'contribute'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        this.getDetail(this.getQuery().id)
      }
    },
    // 获取详情信息
    getDetail (id) {
      this.$httpRequest(this.api.content_detail, {id}, 'get').then(res => {
        this.detail = res[0]
        let materials = this.detail.materials
        // 转义附件
        for (let i = 0; i < materials.length; i++) {
          materials[i].material_info = JSON.parse(materials[i].material_info)
        }
        this.getComment(id)
      }, (e) => {
        console.log(e)
      })
    },
    // 获取评论
    getComment (id) {
      this.$httpRequest(this.api.detail_comment_list, {cid: id, count: 20}, 'get').then(res => {
        this.commentList = res
      }, (e) => {
        console.log(e)
      })
    },
    // 分享
    share () {
      const param = {
        'title': this.detail.title,
        'brief': this.detail.brief,
        'imageLink': '分享索引图链接',
        'contentUrl': '分享内容链接'
      }
      nativeUtil.shareTo(param)
    },
    // 查看大图
    viewPictures (item) {
      const param = {
        'imgs': [
          item
        ]
      }
      nativeUtil.viewPictures(param)
    }
  },
  created () {
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">
.post-wrapper{
    width: 750px;
    flex:1;
}
.main{
    position: fixed;
    top: 0;
    bottom: 100px;
    left: 0;
    right: 0;
}
.head{
    width: 750px;
    height: 100px;
    margin-top:20px;
    justify-content: center;
    border-bottom-style:solid;
    border-bottom-width:1px;
}
.head-text{
    text-align: center;
}
.back-icon{
    width: 44px;
    height: 44px;
    position: absolute;
    left: 40px;
}
.share-img{
    width: 36px;
    height: 36px;
    position: absolute;
    top: 26px;
    right: 32px;
}
.main-content{
    padding-top: 40px;
    padding-left: 28px;
    padding-right: 28px;
    padding-bottom: 26px;
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: #eee;
}
.user-info-box{
    flex-direction: row;
    width: 500px;
    margin-bottom: 20px;
}
.main-avatar{
    width: 64px;
    height: 64px;
    border-bottom-left-radius:32px;
    border-bottom-right-radius:32px;
    border-top-left-radius:32px;
    border-top-right-radius:32px;
    margin-right: 10px;
}
.main-avatar-img{
    width: 64px;
    height: 64px;
}
.user-info-name{
    font-size: 26px;
    color: #333333;
}
.user-info-pubtime{
    font-size: 22px;
    color: #888888;
}
.main-brief{
    width: 686px;
    font-size: 34px;
    line-height: 48px;
    color: #333333;
    margin-bottom: 10px;
}
.material-item{
    margin-bottom: 20px;
}
.material-img{
    margin: 0 auto;
    width: 694px;
}
.material-video{
    // height: 300px;
}
.material-img-box{
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 28px;
}
.img-item{
    width: 220px;
    height: 220px;
    margin-right: 12px;
    margin-bottom: 12px;
}
.img-0{
    margin-right: 0;
}
.main-imgs{
    width: 220px;
    height: 220px;
}
.status-box{
    height: 60px;
    flex-direction: row;
    align-items: center;
}
.status-title{
    font-size: 28px;
    color: #333333;
    margin-right: 36px;
}
.picked-box{
    flex-direction: row;
}
.picked-img{
    width: 24px;
    height: 31px;
    margin-right: 5px;
}
.picked-text{
    font-size: 28px;
    color: #F5A623;
}
.position-box{
    flex-direction: row;
    align-items: center;
}
.position-img{
    width: 24px;
    height: 24px;
    margin-right: 8px;
}
.position-text{
    font-size: 28px;
    color: #666666;
}
.editor-reply-box{
    padding-top: 30px;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 28px;
}
.editor-img{
    width: 130px;
    height: 30px;
    margin-bottom: 18px;
}
.reply-content{
    height: 80px;
    padding-left: 68px;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #F6F6F6;
}
.divider{
    height: 20px;
    background-color: #F6F6F6;
}
.comment-head{
    height: 71px;
    flex-direction: row;
    align-items: center;
    padding-left: 32px;
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: #ccc;
}
.comment-box{
    // padding-bottom: 100px;
}
.comment-head-item{
    width: 140px;
    flex-direction: row;
    height: 71px;
    align-items: center;
}
.comment-left{
    font-size: 28px;
    color: #999999;
    margin-right: 10px;
}
.comment-right{
    font-size: 28px;
    color: #666666;
}
.comment-item{
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 36px;
}
.comment-item-inner{
    padding-bottom: 28px;
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: #eee;
}
.comment-content{
    padding-left: 76px;
    font-size: 32px;
}
.reply-button{
    position: absolute;
    right: 0;
    top: 0;
    width: 92px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 24px;
    color: #666666;
    border-bottom-left-radius:4px;
    border-bottom-right-radius:4px;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
    border-left-style:solid;
    border-top-style:solid;
    border-right-style:solid;
    border-bottom-style:solid;
    border-left-width:1px;
    border-top-width:1px;
    border-right-width:1px;
    border-bottom-width:1px;
    border-left-color:#DDDDDD;
    border-top-color:#DDDDDD;
    border-right-color:#DDDDDD;
    border-bottom-color:#DDDDDD;
}
.comment-content-reply{
    padding-left: 76px;
}
.reply-top{
    flex-direction: row;
    margin-bottom: 16px;
}
.reply-uname{
    font-size: 32px;
    color: #1975F0;
}
.reply-img{
    padding-left: 76px;
    width: 200px;
    height: 200px;
}
.comment-bottom{
    position: absolute;
    bottom: 0;
    width: 750px;
    height: 100px;
    border-top-style: solid;
    border-top-width: 2px;
    border-top-color: #eee;
    flex-direction: row;
    align-items: center;
    padding-left: 32px;
}
.comment-input{
    width: 608px;
    height: 64px;
    font-size: 28px;
    border-bottom-left-radius:32px;
    border-bottom-right-radius:32px;
    border-top-left-radius:32px;
    border-top-right-radius:32px;
    background-color: #F2F2F2;
    padding-left: 32px;
    margin-right: 30px;
    placeholder-color:#cccccc;
}
.emoji-img{
    width: 48px;
    height: 48px;
}
.b0{
    border-bottom-width: 0;
}
</style>
