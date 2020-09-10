<template>
     <div class="home-wrapper" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStylePaddingTop">
         <!-- 搜索 -->
        <div class="top">
          <text class="top-text">出版</text>
          <!-- <image v-if="!flag" :src="getLocalImgUrl('feature_back.png')" class="back-icon" @click="goback"></image> -->
        </div>
        <scroller class="scroller" show-scrollbar="false">
            <image class="top-img" :src="picUrl"></image>
            <div class="list-wrapper">
                <div class="title">
                  <text class="title-text" @click="toggleIntro">出版服务</text>
                  <text class="title-text" @click="changeIndex(2)">按需印刷</text>
                  <div class="nav-border"></div>
                </div>
                <div v-if="flag">
                  <div class="sub-nav">
                      <text class="nav-item" :class="[currentIndex === index ? 'nav-active':'']" v-for="(item,index) in navList" :key="index" @click="changeIndex(index)">{{item}}</text>
                  </div>
                  <slider class="slider" forbid-slide-animation="false" bubble="false"
        auto-play="false" infinite="false" @change="slideChange" :index="currentIndex">
                    <!-- 机构 -->
                    <div class="content">
                        <div class="nav">
                            <text class="input-title">作品名称</text>
                            <input type="text" class="input" v-model="orgInfo.title">
                        </div>
                        <div class="nav" style="border-bottom-width:0;">
                            <text class="input-title">作品描述</text>
                        </div>
                        <textarea class="textarea" v-model="orgInfo.brief"></textarea>
                        <text class="upload-button" @click="uploadFile(0)">文件上传</text>
                        <div class="nav">
                            <text class="input-title">企业名称</text>
                            <input type="text" class="input" v-model="orgInfo.orgName">
                        </div>
                        <div class="nav">
                            <text class="input-title">联系电话</text>
                            <input type="text" class="input" v-model="orgInfo.phone">
                        </div>
                        <div class="nav b0">
                            <text class="input-title">联系邮箱</text>
                            <input type="text" class="input" v-model="orgInfo.email" @keyboard="keyboard">
                        </div>
                        <text class="upload-button" @click="submitOrg">提交</text>
                    </div>
                    <!-- 个人 -->
                    <div class="content">
                      <div class="nav">
                            <text class="input-title">作品名称</text>
                            <input type="text" class="input" v-model="personalInfo.title">
                        </div>
                        <div class="nav" style="border-bottom-width:0;">
                            <text class="input-title">作品描述</text>
                        </div>
                        <textarea class="textarea" v-model="personalInfo.brief"></textarea>
                        <text class="upload-button" @click="uploadFile(1)">文件上传</text>
                        <div class="nav">
                            <text class="input-title">作者姓名</text>
                            <input type="text" class="input" v-model="personalInfo.name">
                        </div>
                        <div class="nav">
                            <text class="input-title">联系电话</text>
                            <input type="text" class="input" v-model="personalInfo.phone">
                        </div>
                        <div class="nav b0">
                            <text class="input-title">联系邮箱</text>
                            <input type="text" class="input" v-model="personalInfo.email">
                        </div>
                        <text class="upload-button" @click="submitPersonal">提交</text>
                    </div>
                  </slider>
                </div>
                <!-- <div v-else class="intro" v-html="intro"></div> -->
                <div v-else class="article-content">
                    <rich-text v-if="richContent" :style="richTextStyle" :content="richContent" @finished="finished"></rich-text>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
const fileManage = weex.requireModule('fileManage')
const requestModule = weex.requireModule('request')
export default {
  name: 'PublishHome',
  data () {
    return {
      richTextStyle: {},
      navList: ['自助出版.机构', '自助出版.个人'],
      currentIndex: 0,
      picUrl: '',
      flag: true,
      intro: '',
      orgInfo: {
        title: '',
        brief: '',
        orgName: '',
        phone: '',
        email: ''
      },
      orgImgList: [],
      orgVideoList: [],
      personalInfo: {
        title: '',
        brief: '',
        name: '',
        phone: '',
        email: ''
      },
      personalImgList: [],
      personalVideoList: [],
      demandInfo: {
        name: '',
        phone: '',
        letterCount: '',
        imgCount: '',
        paperCount: '',
        ceCount: '',
        cover: '',
        zhuangzhen: '',
        keyboardSize: 0
      }
    }
  },
  methods: {
    keyboard (event) {
      if (event.isShow) {
        this.keyboardSize = event.keyboardSize
      } else {
        this.keyboardSize = 0
      }
    },
    goback () {
      this.flag = true
    },
    changeIndex (index) {
      if (index === 2) {
        nativeUtil.linkTo('http://feedback.tjpress.com/15725777265/5.html')
      } else {
        this.currentIndex = index
      }
    },
    slideChange (event) {
      this.currentIndex = event.index
    },
    uploadFile (flag) {
      if (flag === 0) {
        this.orgImgList = []
        this.orgVideoList = []
        const param = {'type': 0, 'count': 9}
        nativeUtil.chooseFile(param).then(res => {
          // nativeUtil.log(res)
          this.orgImgList = res.imageUrl || []
          this.orgVideoList = res.videoUrl || []
        })
      }
      if (flag === 1) {
        this.personalImgList = []
        this.personalVideoList = []
        const param = {'type': 0, 'count': 9}
        nativeUtil.chooseFile(param).then(res => {
          this.personalImgList = res.imageUrl || []
          this.personalVideoList = res.videoUrl || []
        })
      }
    },
    toggleIntro () {
      this.flag = !this.flag
      if (!this.flag) {
        this.getIntro()
      }
      // this.intro === '' && this.getIntro()
      // this.flag = false
    },
    getData () {
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        offset: this.offset,
        count: 10
      }
      this.$httpRequest('http://mobile.tjpress.com/tjpress/cb_get_content_info.php', param, 'get').then(res => {
        const indexpic = res[0].data[0].data[0].indexpic
        this.picUrl = indexpic.host + indexpic.dir + indexpic.filepath + indexpic.filename
      }, (e) => {
        console.log(e)
      })
    },
    getIntro () {
      if (this.intro) return
      const param = {
        appid: 4,
        appkey: 'dUvig6qoMrrz0Hi2vkLmtaiR2JbSgpTj',
        id: 3059
      }
      this.$httpRequest('http://mobile.tjpress.com/tjpress/item.php', param, 'get').then(res => {
        this.intro = res[0].content
      }, (e) => {
        console.log(e)
      })
    },
    // 机构提交
    submitOrg () {
      if (!this.orgInfo.title) {
        nativeUtil.alert('作品名称不能为空!')
        return
      }
      const param = {
        appid: 3,
        appkey: 'mqvpIfSvCblvUFQ1lXdtkv6LoRi0JSYV',
        return: 1,
        id: 3,
        a: 'create',
        func: 'create',
        'form[fixed_8]': this.orgInfo.title,
        'form[standard_6]': this.orgInfo.brief,
        'form[standard_21]': this.orgInfo.orgName,
        'form[fixed_10]': this.orgInfo.phone,
        'form[fixed_14]': this.orgInfo.email
      }
      // 有文件
      if (this.orgImgList.length || this.orgVideoList.length) {
        let params = {
          url: 'http://feedback.tjpress.com/feedback.php',
          parameters: param,
          imageUrl: this.orgImgList,
          videoUrl: this.orgVideoList,
          photoPostFile: [],
          videoPostFile: []
        }
        for (let i = 0; i < this.orgImgList.length; i++) {
          params.photoPostFile.push('file_5[]')
        }
        for (let i = 0; i < this.orgVideoList.length; i++) {
          params.videoPostFile.push('file_5[]')
        }
        fileManage.uploadFile(params, res => {
          res = JSON.parse(res)
          nativeUtil.log(res)
          if (res.ErrorCode) {
            nativeUtil.alert(res.ErrorText)
          }
          if (res.data.length && res.status === '1') {
            nativeUtil.alert('发布成功，等待审核')
          }
        })
      } else {
        if (this.getPlatform() === 'ios') {
          requestModule.POST('http://feedback.tjpress.com/feedback.php', param, function (res) {
            nativeUtil.log(res)
            if (res.ErrorCode) {
              nativeUtil.alert(res.ErrorText)
            }
            if (res.length) {
              nativeUtil.alert('发布成功，等待审核')
            }
          })
        } else {
          this.$httpRequest('http://feedback.tjpress.com/feedback.php', param, 'post').then(res => {
            if (res.ErrorCode) {
              nativeUtil.alert(res.ErrorText)
            }
            if (res.length) {
              nativeUtil.alert('发布成功，等待审核')
            }
          }, (e) => {
            console.log(e)
          })
        }
      }
    },
    // 个人提交
    submitPersonal () {
      if (!this.personalInfo.title) {
        nativeUtil.alert('作品名称不能为空!')
        return
      }
      const param = {
        return: 1,
        id: 2,
        a: 'create',
        func: 'create',
        'form[fixed_5]': this.personalInfo.title,
        'form[standard_3]': this.personalInfo.brief,
        'form[fixed_16]': this.personalInfo.name,
        'form[fixed_7]': this.personalInfo.phone,
        'form[fixed_15]': this.personalInfo.email
      }
      // 有文件
      if (this.personalImgList.length || this.personalVideoList.length) {
        let params = {
          url: 'http://feedback.tjpress.com/feedback.php',
          parameters: param,
          imageUrl: this.personalImgList,
          videoUrl: this.personalVideoList,
          photoPostFile: [],
          videoPostFile: []
        }
        for (let i = 0; i < this.personalImgList.length; i++) {
          params.photoPostFile.push('file_2[]')
        }
        for (let i = 0; i < this.personalVideoList.length; i++) {
          params.videoPostFile.push('file_2[]')
        }
        fileManage.uploadFile(params, res => {
          res = JSON.parse(res)
          nativeUtil.log(res)
          if (res.ErrorCode) {
            nativeUtil.alert(res.ErrorText)
          }
          if (res.data.length && res.status === '1') {
            nativeUtil.alert('发布成功，等待审核')
          }
        })
      } else {
        if (this.getPlatform() === 'ios') {
          requestModule.POST('http://feedback.tjpress.com/feedback.php', param, function (res) {
            nativeUtil.log(res)
            if (res.ErrorCode) {
              nativeUtil.alert(res.ErrorText)
            }
            if (res.length) {
              nativeUtil.alert('发布成功，等待审核')
            }
          })
        } else {
          this.$httpRequest('http://feedback.tjpress.com/feedback.php', param, 'post').then(res => {
            if (res.ErrorCode) {
              nativeUtil.alert(res.ErrorText)
            }
            if (res.length) {
              nativeUtil.alert('发布成功，等待审核')
            }
          }, (e) => {
            console.log(e)
          })
        }
      }
    },
    // 按需提交
    submitDemand () {
      // console.log(this.demandInfo)
      if (!this.demandInfo.name) {
        nativeUtil.alert('姓名不能为空!')
        return
      }
      if (!this.demandInfo.phone) {
        nativeUtil.alert('联系方式不能为空!')
        return
      }
      if (!this.demandInfo.letterCount) {
        nativeUtil.alert('字数不能为空!')
        return
      }
      if (!this.demandInfo.imgCount) {
        nativeUtil.alert('图片数不能为空!')
        return
      }
      if (!this.demandInfo.paperCount) {
        nativeUtil.alert('纸数不能为空!')
        return
      }
      if (!this.demandInfo.ceCount) {
        nativeUtil.alert('册数不能为空!')
        return
      }
      if (!this.demandInfo.cover) {
        nativeUtil.alert('封面用纸不能为空!')
        return
      }
      if (!this.demandInfo.zhuangzhen) {
        nativeUtil.alert('装帧方式不能为空!')
        return
      }
      const param = {
        return: 1,
        id: 4,
        a: 'create',
        func: 'create',
        'form[fixed_11]': this.demandInfo.name,
        'form[fixed_12]': this.demandInfo.phone,
        'form[standard_12]': this.demandInfo.letterCount,
        'form[standard_13]': this.demandInfo.imgCount,
        'form[standard_15]': this.demandInfo.paperCount,
        'form[standard_16]': this.demandInfo.ceCount,
        'form[standard_17]': this.demandInfo.cover,
        'form[standard_18]': this.demandInfo.zhuangzhen
      }
      requestModule.POST('http://feedback.tjpress.com/feedback.php', param, function (res) {
        nativeUtil.log(res)
        if (res.ErrorCode) {
          nativeUtil.alert(res.ErrorCode)
        }
        if (res.length) {
          nativeUtil.alert('发布成功，等待审核')
        }
      })
      // this.$httpRequest('http://feedback.tjpress.com/feedback.php', param, 'post').then(res => {
      //   if (res.ErrorCode) {
      //     nativeUtil.alert(res.ErrorCode)
      //   }
      //   if (res.length) {
      //     nativeUtil.alert('发布成功，等待审核')
      //   }
      // }, (e) => {
      //   console.log(e)
      // })
    },
    // 富文本加载完成
    finished (e) {
      this.setRichTextStyle(e)
    },
    // 设置富文本高度
    setRichTextStyle (res) {
      let { width, height } = res
      let scale = 670 / width
      height = height * scale
      this.richTextStyle = { height: `${height}px`, width: '670px' }
    }
  },
  computed: {
    bottomDistance () {
      return {paddingBottom: (this.keyboardSize + 100) + 'px'}
    },
    richContent () {
      if (this.intro) {
        // let content = this.intro + '<style>p{color:#6A6A6A !important;font-size:32px !important;}</style>' || '暂无信息'
        // return content
        if (this.getPlatform() === 'ios') {
          let content = `
                <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
                    </head>
                    <style>p{color:#6A6A6A !important;font-size:32px !important;line-height:36px !important;margin:0;}</style>
                    ${this.intro}
                </html>`
          return content
        } else {
          let content = `${this.intro}<style>p{color:#6A6A6A !important;font-size:32px !important;line-height:36px !important;margin:0;}</style>`
          return content
        }
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped lang="scss">
.home-wrapper{
  width: 750px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 60px;
  // padding-bottom: 40px;
  background-color: #f2f6fa;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.x-top{
  padding-top: 90px;
}
.top{
  height: 66px;
  margin-bottom: 20px;
}
.top-text{
  width: 750px;
  text-align: center;
  height: 66px;
  line-height: 66px;
  font-size: 36px;
  color: #545454;
}
.back-icon{
  width: 55px;
  height: 55px;
  position: absolute;
  left: 0;
  top: 5px;
}
.scroller{
  width: 730px;
  flex:1;
  padding-bottom: 100px;
}
.top-img{
  width: 730px;
  height: 370px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-bottom: 20px;
}
.list-wrapper{
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-bottom: 40px;
}
.title{
  width: 670px;
  height: 80px;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 60px;
  padding-right: 60px;
  border-bottom-color: rgb(235,241,250);
  border-bottom-width: 1px;
  border-bottom-style: solid;
  position: relative;
}
.title-text{
  text-align: center;
  height: 80px;
  line-height: 80px;
  font-size: 32px;
  color:#545454;
}
.nav-border{
  width: 250px;
  height: 4px;
  background-color: #000;
  position: absolute;
  bottom: 0;
  right: 0;
}
.nav{
  width: 670px;
  height: 80px;
  flex-direction: row;
  align-items: center;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: rgb(235,241,250);
  padding-left: 24px;
  padding-right: 24px;
}
.sub-nav{
    width: 670px;
    height: 80px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: rgb(235,241,250);
    padding-left: 110px;
    padding-right: 110px;
}
.b0{
  border-bottom-width: 0;
}
.nav-item{
    font-size: 24px;
    color:#D3D3D3;
}
.nav-active{
    color:#6AAF93;
    font-size: 28px;
}
.input-title{
    font-size: 28px;
    width: 120px;
    color:#9c9c9c;
    margin-right: 20px;
}
.input{
    width: 360px;
    font-size: 32px;
    height: 60px;
    placeholder-color:#D3D3D3;
}
.textarea{
    font-size: 32px;
    width: 665px;
    height: 307px;
    margin-bottom: 18px;
    border-left-style:solid;
    border-top-style:solid;
    border-right-style:solid;
    border-bottom-style:solid;
    border-left-width:2px;
    border-top-width:2px;
    border-right-width:2px;
    border-bottom-width:2px;
    border-left-color:#ebf1fa;
    border-top-color: #ebf1fa;
    border-right-color: #ebf1fa;
    border-bottom-color: #ebf1fa;
}
.upload-button{
    width: 670;
    height: 84px;
    line-height: 84px;
    text-align: center;
    font-size: 28px;
    letter-spacing: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-left-style:solid;
    border-top-style:solid;
    border-right-style:solid;
    border-bottom-style:solid;
    border-left-width:2px;
    border-top-width:2px;
    border-right-width:2px;
    border-bottom-width:2px;
    border-left-color:#CCC;
    border-top-color: #CCC;
    border-right-color: #CCC;
    border-bottom-color: #CCC;
    border-bottom-left-radius:12px;
    border-bottom-right-radius:12px;
    border-top-left-radius:12px;
    border-top-right-radius:12px;
}
.intro{
  color:#545454;
  font-size: 21px;
  line-height:53px;
}
.slider{
  width: 670px;
  height: 950px;
}
.content{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
