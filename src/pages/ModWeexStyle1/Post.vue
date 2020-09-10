<template>
     <div class="post-wrapper">
         <div class="head">
             <text class="head-text" :style="{'color':formatColor(config.attrs.navBarTitleColor)}">报料</text>
             <text class="click-button" :class="[ifContent ? 'click-button-active' : '']" @click="post()">发布</text>
             <image :src="getLocalImgUrl('icon_back3x.png')" class="back-icon" @click="goback()"></image>
         </div>
         <div class="divider"></div>
         <div class="select">
             <image :src="getLocalImgUrl('icon_programa3x.png')" class="select-img"></image>
             <text class="select-title">报料栏目</text>
             <div class="pick-box" @click="pick">
                <text class="select-sub-title">{{pickedItem}}</text>
                <image :src="getLocalImgUrl('icon_pull_down3x.png')" class="drop-img"></image>
             </div>
         </div>
         <div class="divider"></div>
         <textarea class="input-box" placeholder="与千万网友分享你的大料（必填）" v-model="content"></textarea>
         <!-- 图片附件 -->
         <div class="img-box" v-if="imgList.length">
           <div class="img-inner" v-for="(item,index) in imgList" :key="index">
              <image :src="item" class="img-item"></image>
              <div class="img-del" @click="delPic(index)">
                <image :src="getLocalImgUrl('icon_close3x.png')" class="del-icon"></image>
              </div>
           </div>
         </div>
         <!-- 视频附件 -->
         <div class="img-box" v-if="videoShowList.length">
           <div class="img-inner" v-for="(item,index) in videoShowList" :key="index">
              <image :src="item" class="img-item"></image>
              <div class="img-del" @click="delVideo(index)">
                <image :src="getLocalImgUrl('icon_close3x.png')" class="del-icon"></image>
              </div>
              <!-- <div class="progress" v-if="uploading">
                <div class="progress-percent" :style="progressWidth"></div>
              </div> -->
              <text class="video-progress" v-if="uploading">{{`${videoProgress}%`}}</text>
           </div>
         </div>
         <!-- 定位 -->
         <div style="flex-direction:row;position: absolute;left: 32px;bottom: 120px;">
            <div class="location">
                <image :src="getLocalImgUrl('icon_location3x.png')" class="location-img" v-if="!located"></image>
                <image :src="getLocalImgUrl('icon_location_pre3x.png')" class="location-img" v-else></image>
                <text class="location-text" ref="locationText" @click="getLoction">{{location}}</text>
            </div>
         </div>
         <!-- 底部上传附件栏 -->
         <div class="bottom">
             <div class="bottom-item" @click="addPic()">
                 <image :src="getLocalImgUrl('icon_pic_add3x.png')" class="bottom-img"></image>
             </div>
            <div class="bottom-item">
                 <image :src="getLocalImgUrl('icon_voice_add3x.png')" class="bottom-img"></image>
             </div>
            <div class="bottom-item" @click="addVideo()">
                 <image :src="getLocalImgUrl('icon_video_add3x.png')" class="bottom-img"></image>
             </div>
         </div>
         <!-- 联系方式弹框 -->
         <wxc-mask height="720"
                width="600"
                border-radius="16"
                duration="200"
                mask-bg-color="#FFFFFF"
                :has-animation="hasAnimation"
                :has-overlay="true"
                :show-close="false"
                :show="show"
                @wxcMaskSetHidden="wxcMaskSetHidden"
            >
            <div class="mask-content">
                <image :src="getLocalImgUrl('icon_close3x.png')" class="mask-close" @click="wxcMaskSetHidden"></image>
                <image :src="getLocalImgUrl('pic_fillform3x.png')" class="mask-img"></image>
                <text class="mask-title">还差一步啦~</text>
                <div class="mask-input-box">
                    <div class="mask-input-item input-top">
                        <image :src="getLocalImgUrl('icon_username3x.png')" class="input-img"></image>
                        <input class="mask-input" type="text" v-model="username" placeholder="用户名">
                    </div>
                    <div class="mask-input-item">
                        <image :src="getLocalImgUrl('icon_tel3x.png')" class="input-img"></image>
                        <input class="mask-input" type="text" v-model="phone" placeholder="联系电话">
                    </div>
                </div>
                <text class="mask-info">请留下有效联系方式便于我们核实和跟进，但您的姓名和联系方式不会被公开。</text>
                <text class="mask-button" @click="confirm()">确认发布</text>
            </div>
        </wxc-mask>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import { WxcMask } from 'weex-ui'
const picker = weex.requireModule('picker')
const fileManage = weex.requireModule('fileManage')
export default {
  name: 'Post',
  components: {
    WxcMask
  },
  data () {
    return {
      show: false,
      hasAnimation: true,
      located: false,
      ifContent: false,
      maskable: false,
      sortList: [],
      pickedItem: '',
      location: '你在哪里',
      username: '',
      phone: '',
      content: '',
      pickedId: '',
      word_num: 10,
      config: {},
      api: {},
      imgList: [],
      videoShowList: [],
      videoList: [],
      uploading: false,
      videoProgress: 0
    }
  },
  methods: {
    goback () {
      this.goBack()
    },
    // 发布报料
    post () {
      if (!this.ifContent) return
      if (!this.phone) {
        this.openMask()
      } else {
        if (this.content.length < this.word_num) {
          nativeUtil.alert(`该栏目所发布的最少字数为${this.word_num}`)
          return
        }
        const param = {
          addr: this.addr,
          content: this.content,
          sort_id: this.pickedId,
          tel: this.phone
        }
        if (this.imgList.length || this.videoList.length) {
          // 有附件
          const params = {
            url: this.api.send_content,
            parameters: param,
            imageUrl: this.imgList.length ? this.imgList : '',
            videoUrl: this.videoList.length ? this.videoList : ''
          }
          fileManage.uploadFile(params, res => {
            this.uploading = true
            if (res.progress) {
              this.videoProgress = res.progress
            }
            nativeUtil.log(this.videoProgress)
          })
        } else {
          // 没有附件
          this.$httpRequest(this.api.send_content, param, 'post').then(res => {
            nativeUtil.alert('发布成功')
            setTimeout(() => {
              this.goBack()
            }, 2000)
          }, (e) => {
            console.log(e)
          })
        }
      }
    },
    // 显示弹框
    openMask (e) {
      this.show = true
      this.hasAnimation = true
    },
    // 隐藏弹框
    wxcMaskSetHidden () {
      this.show = false
    },
    // 选择报料栏目
    pick () {
      picker.pick({
        items: this.sortList
      }, event => {
        if (event.result === 'success') {
          this.pickedItem = this.sortList[event.data]
          this.pickedId = this.sordIds[event.data].id
          this.word_num = this.sordIds[event.data].word_num
        }
      })
    },
    // 获取报料栏目列表
    getSortList () {
      this.$httpRequest(this.api.dept_list, {}, 'get').then(res => {
        let arr = []
        res.forEach(element => {
          arr.push(element.name)
        })
        this.sortIds = res
        this.sortList = arr
        this.pickedItem = this.sortList[0]
        this.pickedId = this.sortIds[0].id
        this.word_num = this.sortIds[0].word_num
      }, (e) => {
        console.log(e)
      })
    },
    // 确认联系方式
    confirm () {
      if (!this.username) {
        nativeUtil.alert('用户名不能为空！')
        return
      }
      if (!this.phone) {
        nativeUtil.alert('手机号不能为空！')
        return
      }
      if (!(/^[1]([3-9])[0-9]{9}$/.test(this.phone))) {
        nativeUtil.alert('手机号码有误，请重填！')
        return
      }
      this.wxcMaskSetHidden()
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
            'navBarTitleColor': '#ffcccccc',
            'navbarDividerColor': '#ffcccccc',
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
        this.getSortList()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'contribute'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        this.getSortList()
      }
    },
    // 获取定位
    async getLoaction () {
      const res = await nativeUtil.getLocation()
      if (res) {
        this.located = true
        this.location = res.address
      }
    },
    // 添加图片
    addPic () {
      this.imgList = []
      const param = {
        'type': 1,
        'count': 9
      }
      fileManage.chooseFile(param, res => {
        // nativeUtil.log(res)
        this.imgList = res.imageUrl
      })
    },
    // 删除图片
    delPic (index) {
      this.imgList.splice(index, 1)
    },
    // 添加视频
    addVideo () {
      const param = {
        'type': 2,
        'count': 9
      }
      fileManage.chooseFile(param, res => {
        this.videoShowList = res.videoImageUrl
        this.videoList = res.videoUrl
      })
    },
    // 删除视频
    delVideo (index) {
      this.videoShowList.splice(index, 1)
      this.videoList.splice(index, 1)
    },
    test () {
      if (this.videoProgress === 100) return
      this.videoProgress += 20
    }
  },
  watch: {
    content (val) {
      val ? this.ifContent = true : this.ifContent = false
    }
  },
  computed: {
    progressWidth: function () {
      return {width: (this.videoProgress / 100 * 150) + 'px'}
    }
  },
  created () {
    this.getConfig()
    this.getLoaction()
    // setInterval(this.test, 1000)
  }
}
</script>

<style scoped lang="scss">
.post-wrapper{
    width: 750px;
    flex:1;
}
.head{
    width: 750px;
    height: 100px;
    margin-top:20px;
    justify-content: center;
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
.click-button{
    width: 124px;
    height: 48px;
    line-height: 48px;
    position: absolute;
    right: 28px;
    bottom: 20px;
    background-color: #EEEEEE;
    border-bottom-left-radius:24px;
    border-bottom-right-radius:24px;
    border-top-left-radius:24px;
    border-top-right-radius:24px;
    text-align: center;
    font-size: 28px;
    color: #999999;
}
.click-button-active{
    background-color: #e05555;
    color:#fff;
}
.divider{
    height: 20px;
    background-color: #f6f6f6;
}
.select{
    flex-direction: row;
    align-items: center;
    height: 84px;
    padding-left: 32px;
}
.select-img{
    width: 36px;
    height: 30px;
    margin-right: 8px;
}
.select-title{
    font-size: 32px;
    color: #666666;
    width: 350px;
}
.pick-box{
    flex-direction: row;
    align-items: center;
}
.select-sub-title{
    font-size: 32px;
    color:#999999;
    margin-right: 32px;
    width: 250px;
    text-align: right;
}
.drop-img{
    width: 18px;
    height: 12px;
}
.input-box{
    margin-top: 32px;
    margin-left: 32px;
    width: 686px;
    height: 300px;
    placeholder-color:#cccccc;
}
.location{
    padding-right: 20px;
    min-width: 92px;
    height: 56px;
    background-color: #F6F6F6;
    border-bottom-left-radius:28px;
    border-bottom-right-radius:28px;
    border-top-left-radius:28px;
    border-top-right-radius:28px;
    flex-direction: row;
    align-items: center;
}
.location-img{
    width: 24px;
    height: 24px;
    margin-left: 26px;
}
.location-text{
    font-size: 26px;
    color:#999999;
    padding-left: 5px;
}
.bottom{
    width: 750px;
    height: 88px;
    position: absolute;
    bottom: 0;
    border-top-style: solid;
    border-top-color: #ccc;
    border-top-width: 1px;
    flex-direction: row;
}
.bottom-item{
    width: 250px;
    height: 88px;
    align-items: center;
    justify-content: center;
}
.bottom-img{
    width: 56px;
    height: 56px;
}
.mask-content{
    padding-top: 80px;
}
.mask-img{
    width: 164px;
    height: 164px;
    margin-left: 200px;
    margin-bottom: 40px;
}
.mask-close{
    width: 31px;
    height: 31px;
    position: absolute;
    right: 35px;
    top: 35px;
}
.mask-title{
    color: #AAAAAA;
    font-size: 24px;
    position: absolute;
    top: 182px;
    right: 126px;
}
.mask-input-box{
    margin-left: 60px;
    width: 480px;
    margin-bottom: 40px;
}
.mask-input-item{
    height: 90px;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
    border-bottom-style: solid;
    flex-direction: row;
    align-items: center;
    padding-left: 16px;
}
.input-top{
    margin-bottom: 10px;
}
.input-img{
    width: 36px;
    height: 36px;
}
.mask-input{
    padding-left: 40px;
    outline: none;
    placeholder-color:#CCCCCC;
    width: 450px;
    height: 60px;
}
.mask-info{
    margin-left: 60px;
    width: 520px;
    font-size: 24px;
    color: #B5B5B5;
}
.mask-button{
    margin-left: 140px;
    font-size: 32px;
    margin-top: 20px;
    width: 320px;
    height: 72px;
    line-height: 72px;
    text-align: center;
    color:#fff;
    background-color: #e50000;
    border-bottom-left-radius:45px;
    border-bottom-right-radius:45px;
    border-top-left-radius:45px;
    border-top-right-radius:45px;
}
.img-box{
  width: 750px;
  flex-direction: row;
  flex-wrap: wrap;
}
.img-inner{
  width: 220px;
  height: 180px;
  margin-bottom: 22px;
  margin-left: 22px;
  position: relative;
}
.img-item{
  width: 220px;
  height: 180px;
}
.img-del{
  position: absolute;
  right: 0;
  top: 0;
  background-color: rgba(0,0,0,.1);
  width: 30px;
  height: 30px;
}
.del-icon{
  width: 30px;
  height: 30px;
}
.video-progress{
  position: absolute;
  left: 85px;
  top: 85px;
  font-size: 30px;
  color:red;
}
.progress{
  width: 150px;
  height: 10px;
  background-color: #ccc;
  position: absolute;
  left: 30px;
  top: 80px;
  border-bottom-left-radius:5px;
  border-bottom-right-radius:5px;
  border-top-left-radius:5px;
  border-top-right-radius:5px;
}
.progress-percent{
  height: 10px;
  position: absolute;
  background-color: green;
  left: 0;
  top: 0;
  border-bottom-left-radius:5px;
  border-bottom-right-radius:5px;
  border-top-left-radius:5px;
  border-top-right-radius:5px;
  transition: all linear 1s;
}
</style>
