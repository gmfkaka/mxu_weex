<template>
     <div class="ask-wrapper">
       <!-- 头部导航 -->
        <div class="nav-wrapper" :class="[this.isIphoneX() ? 'ipx' : '']" :style="androidStylePaddingTop">
          <div class="nav-text-box">
              <div class="back-icon-box" @click="gotoback">
                  <image :src="getLocalImgUrl('ask_back.png')" class="back-icon"></image>
              </div>
              <text class="nav-text">报料</text>
              <text class="publish-text" :class="[sortId && askBrief ?'publish-active':'']" @click="clickPublish">发布</text>
          </div>
        </div>
         <!-- 头部导航 end-->
        <div class="main">
            <div class="main-head" @click="showsort = !showsort">
                <div class="main-head-title">
                  <text class="main-head-title-text">分类</text>
                </div>
                <div class="main-head-sort">
                  <text class="main-head-sort-text">{{sortName}}</text>
                  <image :src="getLocalImgUrl('ask_drop.png')" v-if="!showsort" class="main-head-sort-icon"></image>
                  <image :src="getLocalImgUrl('ask_autobrief.png')" v-if="showsort" class="main-head-sort-icon"></image>
                </div>
            </div>
            <scroller class="main-sort" v-if="showsort" show-scrollbar="false" scroll-direction="horizontal">
                <div v-for="(sort,index) in colList" :key="index" class="sort-box"
                :class="[sort.id==sortId?'active-sort':'common-sort']" @click="changeSort(sort)">
                  <text class="sort-text" :class="[sort.id==sortId?'active-sort-text':'']">{{sort.title}}</text>
                </div>
            </scroller>
            <!-- 暂时去除事件 @input="getBriefInput" -->
            <div class="main-body">
                <textarea ref="briefInput" class="input-title input-area"  @keyboard="keyboard" v-model="askBrief" placeholder="说些什么..." ></textarea>
            </div>
            <div class="bottom-box" :style="locationDistance">
                <!-- 定位 -->
                <!-- v-if="located" -->
                <div style="flex-direction:row;" v-if="located" >
                    <div class="location">
                        <image :src="getLocalImgUrl('adr-fh2x.png')" class="location-icon"></image>
                        <text class="location-text" ref="locationText" >{{location}}</text>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部选择框 -->
        <div class="select-box">
            <div class="select-top" :class="[!drpdShow && this.isIphoneX() ? 'ipx-bottom' : '']">
                <div class="drop-icon-box" @click="showDrop">
                    <image v-if="drpdShow" class="drop-icon" :src="getLocalImgUrl('ask_drop.png')" ></image>
                    <image v-if="!drpdShow" class="drop-icon" :src="getLocalImgUrl('ask_autobrief.png')"></image>
                </div>
                <div class="drop-box">
                    <image
                    v-for="(item,index) in dropList"
                    :key="index"
                    :src="currentSelectIndex === index ? getLocalImgUrl(item.active_src) : getLocalImgUrl(item.src)"
                    :style="item.style"
                    @click="changeDrop(index)"></image>
                </div>
            </div>
            <div v-if="drpdShow" class="select-body"
            :class="[currentSelectIndex === 0 || currentSelectIndex === 1? 'bgw' :'']"
            :style="bottomDistance">
                <!-- 图片 -->
                <div class="select-content" v-if="currentSelectIndex === 0">
                    <div class="img-box" v-if="imgList.length">
                      <div class="img-inner" v-for="(item,index) in imgList" :key="index">
                          <image :src="item" class="img-item"></image>
                          <div class="img-del" @click="delPic(index)">
                              <image :src="getLocalImgUrl('ask_delete.png')" class="del-icon"></image>
                          </div>
                      </div>
                      <div class="img-inner">
                        <image :src="getLocalImgUrl('ask_add_pic.png')" class="img-item" @click="addPic()"></image>
                      </div>
                    </div>
                    <div class="file-add" v-else>
                      <image :src="getLocalImgUrl('ask_add_pic.png')" class="add-pic" @click="addPic()"></image>
                      <text class="add-text">添加图片</text>
                    </div>
                </div>
                <!-- 视频 -->
                <div class="select-content" v-if="currentSelectIndex === 1">
                    <div class="img-box" v-if="videoShowList.length">
                      <div class="img-inner" v-for="(item,index) in videoShowList" :key="index">
                          <image :src="item" class="img-item"></image>
                          <div class="img-del" @click="delVideo(index)">
                              <image :src="getLocalImgUrl('ask_delete.png')" class="del-icon"></image>
                          </div>
                      </div>
                    </div>
                    <div class="file-add" v-else>
                      <image :src="getLocalImgUrl('ask_add_video.png')" class="add-pic" @click="addVideo()"></image>
                      <text class="add-text">选择视频</text>
                    </div>
                </div>
            </div>
        </div>
        <show-loading
              :show="loadingShow"
              type="custom"
              m-url="loading.gif"
              m-width="120"
              m-height="120"
              m-backgroundcolor="#f2f6fa"
          >
          </show-loading>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import ShowLoading from '../../components/common/ShowLoading'
const fileManage = weex.requireModule('fileManage')
var weexmodal = weex.requireModule('modal')
export default {
  name: 'Ask',
  components: {
    ShowLoading
  },
  data () {
    return {
      sortId: '',
      sortName: '',
      askBrief: '',
      located: false,
      location: '',
      currentSelectIndex: 0,
      currentRewardIndex: null,
      imgList: [],
      videoList: [],
      videoShowList: [],
      bottomDistance: {},
      locationDistance: {},
      show: false,
      dropList: [
        {src: 'ask_pic.png', active_src: 'ask_pic.png', style: {width: '36px', height: '34px'}},
        {src: 'ask_video.png', active_src: 'ask_video.png', style: {width: '35px', height: '31px'}}
      ],
      colList: [],
      access_token: '',
      drpdShow: true,
      custom_appid: '',
      custom_appkey: '',
      statusbar_height: '',
      loadingShow: false,
      param: {},
      showsort: false,
      locationInfo: '',
      fileManagefile: [],
      phone: '',
      latitude: '',
      longitude: ''
    }
  },
  created () {
    if (this.getPlatform() === 'web') {
      this.param.custom_appid = '154'
      this.param.custom_appkey = 'ihJhUxistGOuuJMT6dCveUyqupietbsB'
      this.param.access_token = '6fcb8fe9100d45b34fa0ea72767ea740'
      this.getConfig()
      return
    }
    nativeUtil.getLoginStatus().then(res => {
      if (res === '0') {
        nativeUtil.goLogin()
      } else {
        this.getConfig()
      }
    })
  },
  methods: {

    gotoback () {
      this.goBack()
    },
    showDrop () {
      this.drpdShow = !this.drpdShow
    },
    // 更改底部选择框选中项
    changeDrop (index) {
      this.currentSelectIndex = index
    },
    changeReward (index) {
      this.currentRewardIndex = index
    },
    // 获取定位
    getLoaction () {
      if (this.getPlatform() !== 'web') {
        nativeUtil.getLocation().then(res => {
          this.located = true
          this.locationInfo = JSON.stringify(res)
          this.location = res.address
          this.latitude = res.latitude
          this.longitude = res.longitude
        })
      }
    },
    // 发布判断
    clickPublish () {
      if (!this.sortId || !this.askBrief) return
      weexmodal.prompt({
        message: '请留下您的联系方式',
        okTitle: '确定',
        cancelTitle: '取消'
      }, (value) => {
        this.phone = value.data
        // 判断是否有附件
        let hasFile = this.imgList.length || this.videoList.length
        if (!hasFile) {
          this.publishReport()
          return
        }
        this.publish()
      })
    },
    // 发布保存附件
    publish () {
      const param = {
        m: 'Apihelp',
        c: 'fact',
        a: 'factUpload',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey
      }
      const uploadParams = {
        url: this.api.home_list,
        parameters: param,
        imageUrl: this.imgList,
        videoUrl: this.videoList,
        videoImageUrl: this.videoShowList
      }
      this.loadingShow = true
      fileManage.uploadFile(uploadParams, res => {
        if (JSON.parse(res).status === '1') {
          this.fileManagefile = JSON.parse(res).data.data
          this.publishReport()
        } else if (parseInt(JSON.parse(res).status, 10) === 0) {
          this.loadingShow = false
        }
      })
    },
    // 发布
    publishReport () {
      const arr = []
      this.fileManagefile.forEach((vv) => {
        vv.forEach((v) => {
          arr.push(v)
        })
      })
      nativeUtil.getUserInfo().then(res => {
        this.access_token = res.userTokenKey
        const param = {
          type_id: this.sortId,
          brief: this.askBrief,
          file: arr,
          region: this.location,
          latitude: this.latitude,
          longitude: this.longitude,
          access_token: this.access_token,
          custom_appid: this.custom_appid,
          custom_appkey: this.custom_appkey,
          m: 'Apihelp',
          c: 'help',
          a: 'create',
          phone: this.phone
        }
        this.$httpRequest(this.api.home_list, param, 'post').then(res => {
          if (res.code === 0) {
            this.loadingShow = false
            nativeUtil.alert('发布成功')
            this.goBack()
          } else {
            this.loadingShow = false
            nativeUtil.alert(res.message)
          }
        }, (e) => {
          console.log(e)
        })
      })
    },
    // 添加图片
    addPic () {
      const param = {
        'type': 1,
        'count': 9
      }
      fileManage.chooseFile(param, res => {
        if (JSON.parse(res).imageUrl) {
          this.imgList = JSON.parse(res).imageUrl
        }
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
        'count': 1
      }
      fileManage.chooseFile(param, res => {
        this.videoShowList = JSON.parse(res).videoImageUrl
        this.videoList = JSON.parse(res).videoUrl
      })
    },
    // 删除视频
    delVideo (index) {
      this.videoShowList.splice(index, 1)
      this.videoList.splice(index, 1)
    },
    // 输入的字符是@时 调出@列表
    getBriefInput (event) {
      if (event.value.charAt(event.value.length - 1) === '@') {
        this.jumpWithParams('ModWeexStyle5WendaSelect', {})
      }
    },
    // 获取键盘高度 设置底部高度
    keyboard (event) {
      if (event.isShow) {
        this.bottomDistance = {height: `${event.keyboardSize}px`}
        const dis = event.keyboardSize + 140
        this.locationDistance = {bottom: `${dis}px`}
        this.locationDistance = {top: 'unset'}
      }
    },
    // 获取用户信息
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'id': '11984',
          'uniqueid': 'weexreport',
          'type': '1',
          'name': '新时代报料',
          'ename': 'weexreport',
          'custom_name': '新时代报料',
          'normal_pic': '',
          'press_pic': '',
          'url': '',
          'is_master': '0',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '1',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle16',
          'android_min': null,
          'android_max': null,
          'ios_min': null,
          'ios_max': null,
          'ui_android_depends': '',
          'attrs': [ ],
          'api': {
            'content_detail': 'content_detail',
            'dept_list': 'dept_list',
            'detail_comment_list': 'detail_comment_list',
            'ebook_detail': 'ebook_detail',
            'ebook_list': 'ebook_list',
            'home_column': 'http://mobile.fhtv.net.cn/fhtw/news_slide.php',
            'home_list': 'http://help-api.cloud.hoge.cn/index.php',
            // 'home_list': 'http://helpsc.cloud.hoge.cn/index.php',
            'home_list_mine': 'home_list_mine',
            'my_listen': 'my_listen',
            'my_look': 'my_look',
            'my_speak': 'my_speak',
            'my_write': 'my_write',
            'send_content': 'send_content'
          }
        }
        this.api = this.config.api
        this.getData()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'weexreport'
        }
        // 获取api
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        // 获取appid/appkey
        const result = await nativeUtil.getSystemInfo()
        if (result) {
          this.custom_appid = result.custom_appid
          this.custom_appkey = result.custom_appkey
          this.getData()
        }
      }
    },
    // 获取数据
    getData () {
      this.getLoaction()
      this.getColList()
    },
    // 切换分类
    changeSort (item) {
      this.sortId = item.id
      this.sortName = item.title
    },
    // 获取标签
    getColList () {
      let param = {
        m: 'Apihelp',
        c: 'fact',
        a: 'factSort'
      }
      if (this.getPlatform() === 'web') {
        param = Object.assign(param, this.param)
      } else {
        param.custom_appid = this.custom_appid
        param.custom_appkey = this.custom_appkey
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (res.code === 0) {
          this.colList = res.data
          this.sortId = res.data[0].id
          this.sortName = res.data[0].title
        } else {
          nativeUtil.alert(res.message)
        }
      }, (e) => {
        console.log(e)
      })
    }
  }
}
</script>

<style scoped lang="scss">

.ask-wrapper{
    width: 750px;
    flex:1;
}
.ask-page{
    width: 750px;
    flex:1;
}
.ipx{
    margin-top: 40px;
}
.ipx-bottom{
    padding-bottom: 100px;
    padding-top: 60px;
}
.head{
    width: 750px;
    padding-bottom: 25px;
    flex-direction: row;
    padding-top: 58px;
    padding-left: 50px;
    padding-right: 50px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color:#F0F0F0;
}
.head-title{
    flex: 1;
    text-align: center;
    font-size: 36px;
}
.back-icon{
    width: 20px;
    height: 38px;
}
.back-icon-box{
    width: 50px;
    height: 50px;
}
.publish-text{
    flex-direction: row;
    width: 80px;
    height: 50px;
    color:rgba(153,153,153,1);
    font-size: 34px;
}
.main{
    flex:1;
    background-color: #F4F4F4;
}
.main-head{
  width: 750px;
  height: 80px;
  flex-direction: row;
  align-items: center;
  padding-left:20px;
  padding-right:20px;
  background-color:#ffffff;
  justify-content: space-between;

}
.main-head-title-text{
  color:#222222;
  font-size: 28px;
}
.main-head-sort{
  flex-direction: row;
  align-items: center;
}
.main-head-sort-text{
  color:#999999;
  font-size: 26px;
}
.main-head-sort-icon{
  width: 33px;
  height:18px;
  margin-left:20px;
}
.input-title{
    padding-left: 24px;
    padding-right: 24px;
    width: 750px;
    background-color: #F4F4F4;
    font-size: 30px;
    line-height: 50px;
    color:rgba(102,102,102,1);
    // placeholder-color:#afafaf;
}
.input-area{
    height: 280px;
    padding-top: 10px;
}
.main-body{
    padding-top: 10px;
}
.bottom-box{
    top:410px;
    position: absolute;
    left: 28px;
}
.location{
    height:52px;
    flex-direction: row;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    border-top-style: solid;
    border-bottom-style: solid;
    border-left-style: solid;
    border-right-style: solid;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-right-width: 1px;
    border-top-color: rgba(218,218,218,1);
    border-bottom-color: rgba(218,218,218,1);
    border-left-color: rgba(218,218,218,1);
    border-right-color: rgba(218,218,218,1);
    border-top-left-radius: 26px;
    border-top-right-radius: 26px;
    border-bottom-left-radius: 26px;
    border-bottom-right-radius: 26px;
}
.location-icon{
    width: 25px;
    height: 30px;
    margin-right: 10px;
}
.location-text{
    font-size: 24px;
    color:rgba(102,102,102,1);
}
.selected-tag-box{
    width: 702px;
    height: 150px;
    padding-top: 20px;
    margin-bottom: 30px;
    flex-direction: row;
    flex-wrap: wrap;
}
.publish-active{
    color: #00AFFE;
}
.select-box{
    width: 750px;
    position: absolute;
    left: 0;
    bottom: 0;
}
.select-top{
    height: 100px;
    width: 750px;
    background-color: #efeff4;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #e1e2e9;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
}
.select-title{
    font-size: 30px;
    height: 42px;
    line-height: 42px;
    color:rgba(51,51,51,1);
}
.select-title-right{
    color:rgba(153,153,153,1);
    font-size: 24px;
}
.drop-icon-box{
    width: 100px;
    height: 50px;
    flex-direction: row;
    align-items: center;
}
.drop-icon{
    width: 33px;
    height: 18px;
}
.drop-box{
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100px;
}
.select-body{
    width: 750px;
    background-color:rgba(240,240,240,1);
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 45px;
}
.select-content{
    width: 710px;
    flex:1;
}
.select-content-top{
    width: 710px;
    height: 42px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.reward-box{
    margin-top: 60px;
    width: 710px;
    height: 80px;
    flex-direction: row;
    justify-content: space-between;
}
.select-item-style{
    font-size: 30px;
    text-align: center;
    background-color: #fff;
    border-top-style: solid;
    border-bottom-style: solid;
    border-left-style: solid;
    border-right-style: solid;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-right-width: 1px;
    border-top-color: rgba(233,233,233,1);
    border-bottom-color: rgba(233,233,233,1);
    border-left-color: rgba(233,233,233,1);
    border-right-color: rgba(233,233,233,1);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}
.reward-item{
    width: 146px;
    height: 80px;
    line-height: 80px;
}
.disable-item {
    background-color:rgba(189,189,189,1);
    color:#fff;
}
.select-item-active{
    color:#fff;
    background-color:#00AFFE;
}
.notice{
    padding-top: 80px;
    font-size: 24px;
    color:rgba(153,153,153,1);
    width: 750px;
    text-align: center;
}
.tag-box{
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 50px;
}
.tag-item{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 30px;
    margin-right: 20px;
}
.img-box{
    width: 750px;
    flex-direction: row;
    flex-wrap: wrap;
}
.img-inner{
    width: 140px;
    height: 140px;
    margin-bottom: 20px;
    margin-right:40px;
    position: relative;
}
.img-item{
    width: 140px;
    height: 140px;
}
.img-del{
    position: absolute;
    right: 9px;
    top: 9px;
    width: 32px;
    height: 32px;
}
.del-icon{
    width: 32px;
    height: 32px;
}
.file-add{
    width: 710px;
    height: 445px;
    padding-top: 90px;
    align-items: center;
}
.bgw{
    background-color: #fff;
    padding-left: 35px;
}
.add-pic{
    width: 154px;
    height: 155px;
}
.add-text{
    margin-top: 13px;
    font-size: 32px;
    color:rgba(51,51,51,1);
}
.selected-name{
    color:#F7402E;
}
.mask-content{
    width: 600px;
    height: 550px;
    align-items: center;
}
.publish-img{
    width: 600px;
    height: 237px;
}
.publish-title{
    padding-top: 62px;
    font-size: 34px;
}
.publish-button{
    width: 420px;
    height: 80px;
    margin-top: 80px;
    line-height: 80px;
    text-align: center;
    color:#fff;
    font-size: 34px;
    background-color: #f7402e;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
}
//导航栏
.nav-wrapper{
   flex-direction: row;
   align-items: center;
   width: 750px;
   padding-top: 45px;
   background-color:#ffffff;
   position: relative;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #EDEDED;
}
.ipx{
    padding-top: 96px;
}
.nav-text-box{
  padding-top:24px;
  padding-bottom:24px;
  width: 750px;
  justify-content: center;
  align-items: center;

}
.nav-text{
  color:#333333;
  font-size: 36px;

}
.back-icon-box{
  position: absolute;
  left:24px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.publish-text{
  position: absolute;
  right:24px;
}
.back-icon{
  width: 20px;
  height:34px;
}
//分类
.main-sort{
  background-color:#ffffff;
  flex-direction: row;
  width: 750px;
  padding-left:24px;
  padding-right:24px;
  height:75px;
}
.sort-box{

  // border-bottom-color:#00AFFE;
  margin-bottom:20px;
  margin-left:20px;
  justify-content: center;
  align-items: center;
  height:40px;
  background-color:#F5F5F5;
  padding-left:9px;
  padding-right:9px;
  border-bottom-left-radius:4px;
  border-bottom-right-radius:4px;
  border-top-left-radius:4px;
  border-top-right-radius:4px;
}
.common-sort{
  border-bottom-style:solid;
  border-bottom-width:1px;
  border-bottom-color:#F5F5F5;
  border-top-style:solid;
  border-top-width:1px;
  border-top-color:#F5F5F5;
  border-left-style:solid;
  border-left-width:1px;
  border-left-color:#F5F5F5;
  border-right-style:solid;
  border-right-width:1px;
  border-right-color:#F5F5F5;
}
.active-sort{
  border-bottom-style:solid;
  border-bottom-width:1px;
  border-bottom-color:#00AFFE;
  border-top-style:solid;
  border-top-width:1px;
  border-top-color:#00AFFE;
  border-left-style:solid;
  border-left-width:1px;
  border-left-color:#00AFFE;
  border-right-style:solid;
  border-right-width:1px;
  border-right-color:#00AFFE;
}
.sort-text{
  color:#999999;
  font-size: 22px;
}
.active-sort-text{
  color:#00AFFE;
}
</style>
