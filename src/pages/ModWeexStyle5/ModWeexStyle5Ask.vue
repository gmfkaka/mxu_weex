<template>
     <div class="ask-wrapper" :class="[this.isIphoneX() ? 'ipx' : '']">
        <div class="head" :style="androidStyle">
            <div class="back-icon-box" @click="goback">
                <image :src="getLocalImgUrl('ask_back.png')" class="back-icon"></image>
            </div>
            <text class="head-title">新建问题</text>
            <text class="publish-text" :class="[publishable ?'publish-active':'']" @click="publish">发布</text>
        </div>
        <div class="main">
            <div class="main-head">
                <input type="text" class="input-title" style="color:rgba(0,0,0,1);" autofocus="true" v-model="askTitle" placeholder="请输入问题并以问号结束" @keyboard="keyboard">
            </div>
            <!-- 暂时去除事件 @input="getBriefInput" -->
            <div class="main-body">
                <textarea type="text" ref="briefInput" class="input-title input-area" v-model="askBrief" placeholder="请输入问题描述" ></textarea>
            </div>
            <div class="bottom-box" :style="locationDistance">
                <!-- 已选标签框 -->
                <div class="selected-tag-box">
                    <div class="selected-tag-item" v-for="(item,index) in tagList.filter(ele=>ele.is_checked)" :key="index">
                    <image :src="getLocalImgUrl('ask_tag_selected.png')" class="selected-tag-icon"></image>
                    <text class="selected-tag-text">{{item.name}}</text>
                    </div>
                </div>
                <!-- 定位 -->
                <div style="flex-direction:row;" v-if="located">
                    <div class="location">
                        <image :src="getLocalImgUrl('ask_location.png')" class="location-icon"></image>
                        <text class="location-text" ref="locationText" >{{location}}</text>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部选择框 -->
        <div class="select-box">
            <div class="select-top" :class="[!drpdShow && this.isIphoneX() ? 'ipx-bottom' : '']">
                <div class="drop-icon-box">
                    <image v-if="drpdShow" class="drop-icon" :src="getLocalImgUrl('ask_drop.png')" @click="showDrop"></image>
                    <image v-if="!drpdShow" class="drop-icon" :src="getLocalImgUrl('ask_autobrief.png')" @click="showDrop"></image>
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
            :class="[currentSelectIndex === 3 || currentSelectIndex === 4? 'bgw' :'']"
            :style="bottomDistance">
                <!-- 标签 -->
                <div class="select-content" v-if="currentSelectIndex === 0">
                    <text class="select-title">为问题添加标签</text>
                    <div class="tag-box">
                        <text
                        class="select-item-style tag-item"
                        :class="[item.is_checked ? 'select-item-active' :'']"
                        v-for="(item,index) in tagList"
                        :key="index"
                        @click="editTag(index)">{{item.name}}</text>
                    </div>
                </div>
                <!-- 悬赏值 -->
                <div class="select-content" v-if="currentSelectIndex === 1">
                    <div class="select-content-top">
                        <text class="select-title">选择悬赏值</text>
                        <text class="select-title-right">可用积分  {{userPoints}}</text>
                    </div>
                    <div class="reward-box" v-if="userPoints > 0">
                        <text
                            class="reward-item select-item-style"
                            :class="[currentRewardIndex === index ? 'select-item-active' : '']" v-for="(item,index) in rewardList"
                            :key="index"
                            @click="changeReward(index)">{{item}}</text>
                    </div>
                    <!-- 积分不足-->
                    <div class="reward-box" v-else>
                        <text
                            class="reward-item select-item-style disable-item"
                            v-for="(item,index) in rewardList"
                            :key="index">{{items}}</text>
                    </div>
                    <text class="notice" v-if="userPoints > 0">高额悬赏更容易吸引高手为您解答哦～</text>
                    <text class="notice" v-else>您的积分不足，暂时无法悬赏</text>
                </div>
                <!-- 图片 -->
                <div class="select-content" v-if="currentSelectIndex === 3">
                    <div class="img-box" v-if="imgList.length">
                    <div class="img-inner" v-for="(item,index) in imgList" :key="index">
                        <image :src="item" class="img-item"></image>
                        <div class="img-del" @click="delPic(index)">
                            <image :src="getLocalImgUrl('ask_delete.png')" class="del-icon"></image>
                        </div>
                    </div>
                    </div>
                    <div class="file-add" v-else>
                    <image :src="getLocalImgUrl('ask_add_pic.png')" class="add-pic" @click="addPic()"></image>
                    <text class="add-text">添加图片</text>
                    </div>
                </div>
                <!-- 视频 -->
                <div class="select-content" v-if="currentSelectIndex === 4">
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
         <!-- 发布成功弹框 -->
         <wxc-mask height="550"
                width="600"
                duration="200"
                mask-bg-color="#FFFFFF"
                opacity="0.65"
                :has-animation="true"
                :has-overlay="true"
                :show-close="false"
                :show="show"
                :overlay-can-close="false"
            >
            <div class="mask-content">
                <image :src="getLocalImgUrl('ask_publish.png')" class="publish-img"></image>
                <text class="publish-title">发布成功！</text>
                <text class="publish-button" @click="goback">我知道了</text>
            </div>
        </wxc-mask>
        <wxc-loading :show="loadingShow"></wxc-loading>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import { WxcMask, WxcLoading } from 'weex-ui'
const fileManage = weex.requireModule('fileManage')
let storage = weex.requireModule('storage')
export default {
  name: 'Ask',
  components: {
    WxcMask,
    WxcLoading
  },
  data () {
    return {
      askTitle: '',
      askBrief: '',
      located: false,
      publishable: false,
      location: '',
      userPoints: 0,
      currentSelectIndex: 0,
      currentRewardIndex: null,
      imgList: [],
      videoList: [],
      videoShowList: [],
      bottomDistance: {},
      locationDistance: {},
      show: false,
      rewardList: [],
      dropList: [
        {src: 'ask_tag.png', active_src: 'ask_tag_active.png', style: {width: '34px', height: '34px'}},
        {src: 'ask_reward.png', active_src: 'ask_reward_active.png', style: {width: '28px', height: '36px'}},
        {src: 'ask_at.png', active_src: 'ask_at.png', style: {width: '34px', height: '35px'}},
        {src: 'ask_pic.png', active_src: 'ask_pic_active.png', style: {width: '36px', height: '34px'}},
        {src: 'ask_video.png', active_src: 'ask_video_active.png', style: {width: '35px', height: '31px'}}
      ],
      tagList: [],
      forum_id: '',
      access_token: '',
      selectTags: [],
      drpdShow: true,
      custom_appid: '',
      custom_appkey: '',
      statusbar_height: '',
      loadingShow: false,
      androidStyle: {}
    }
  },
  computed: {
    publishflag () {
      const {askTitle, askBrief} = this
      return {
        askTitle,
        askBrief
      }
    }
  },
  beforeCreate () {
    nativeUtil.getSystemInfo().then(res => {
      if (res.statusbar_height) {
        this.androidStyle = {
          paddingTop: `${res.statusbar_height}px`
        }
      }
    })
  },
  created () {
    nativeUtil.getLoginStatus().then(res => {
      if (res === '0') {
        nativeUtil.goLogin().then(res => {
          if (res === '1') {
            this.getConfig()
          }
        })
      } else {
        this.getConfig()
      }
    })
  },
  mounted () {
    const _this = this
    const Stark = new BroadcastChannel('Avengers')
    Stark.onmessage = function (event) {
      _this.askBrief += `@${event.data.title}`
      _this.forum_id = event.data.id
    }
  },
  watch: {
    publishflag: {
      handler: function (val) {
        if (val.askTitle && val.askBrief) {
          this.publishable = true
        } else {
          this.publishable = false
        }
      },
      deep: true
    },
    askBrief: {
      handler: function (val) {
        if (val.indexOf('@') === -1) {
          this.forum_id = ''
        }
      }
    }
  },
  methods: {
    goback () {
      this.goBack()
    },
    showDrop () {
      this.drpdShow = !this.drpdShow
    },
    // 更改底部选择框选中项
    changeDrop (index) {
      if (index === 2) {
        if (this.askBrief.indexOf('@') === -1) {
          this.jumpWithParams('ModWeexStyle5WendaSelect', {})
        } else {
          nativeUtil.alert('不能重复@')
        }
      } else {
        this.currentSelectIndex = index
      }
    },
    // 悬赏积分
    getReward () {
      const param = {
        m: 'Apibbs',
        c: 'post',
        a: 'getCreditSet',
        access_token: this.access_token,
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey
      }
      this.$httpRequest(this.api.home_column, param, 'post').then(res => {
        if (!res.ErrorCode) {
          this.rewardList = res.config
          if (res.userinfo && res.userinfo.credit && res.userinfo.credit.credit1) {
            this.userPoints = res.userinfo.credit.credit1
          }
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
      })
    },
    changeReward (index) {
      this.currentRewardIndex = index
    },
    // 修改标签
    editTag (index) {
      this.tagList[index].is_checked = !this.tagList[index].is_checked
      if (this.tagList[index].is_checked) {
        this.selectTags.push(this.tagList[index])
      } else {
        this.selectTags.splice(index, 1)
      }
      storage.setItem('selectTags', JSON.stringify(this.selectTags), event => {
        nativeUtil.log(event)
      })
    },
    // 获取定位
    getLoaction () {
      nativeUtil.getLocation().then(res => {
        this.located = true
        this.location = res.address
      })
    },
    // 发布
    publish () {
      if (!this.publishable) return
      let selectedTags = ''
      this.selectTags.forEach(ele => {
        selectedTags += ele.id + ','
      })
      // 判断是否有附件
      let completeStatus = this.imgList.length || this.videoList.length ? 0 : 1
      let param = {
        title: this.askTitle,
        content: this.askBrief,
        tag_ids: selectedTags,
        reward_points: this.rewardList[this.currentRewardIndex],
        complete_status: completeStatus,
        forum_id: this.forum_id,
        m: 'Apibbs',
        c: 'post',
        a: 'create',
        access_token: this.access_token,
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey
      }
      this.$httpRequest(this.api.home_column, param, 'post').then(res => {
        if (!res.ErrorCode) {
          // 有附件
          if (!completeStatus) {
            this.loadingShow = true
            let updateParam = {
              m: 'Apibbs',
              c: 'post',
              a: 'update',
              access_token: this.access_token,
              custom_appid: this.custom_appid,
              custom_appkey: this.custom_appkey,
              post_id: res.id
            }
            let params = {
              url: this.api.home_column,
              parameters: updateParam,
              imageUrl: this.imgList,
              videoUrl: this.videoList,
              videoImageUrl: this.videoShowList
            }
            fileManage.uploadFile(params, res => {
              if (JSON.parse(res).status === '1') {
                this.loadingShow = false
                this.openMask()
              }
            })
          }
          if (!res.ErrorCode && completeStatus) {
            this.openMask()
          }
          storage.removeItem('selectTags', event => {
          })
        } else {
          nativeUtil.alert(res.ErrorText)
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 显示弹框
    openMask (e) {
      this.show = true
    },
    // 添加图片
    addPic () {
      this.imgList = []
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
        // nativeUtil.log(JSON.stringify(this.videoList))
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
      }
    },
    // 获取配置文件
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'id': '10044',
          'uniqueid': 'help2',
          'type': '1',
          'name': '问答',
          'ename': 'help2',
          'custom_name': '问答',
          'normal_pic': '',
          'press_pic': '',
          'url': '',
          'is_master': '0',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '0',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle5',
          'android_min': null,
          'android_max': null,
          'ios_min': null,
          'ios_max': null,
          'attrs': {
            'navBarTitle': '',
            'button_backgroundcolor': '#fff7402f',
            'navBarTitleColor': '#ffffffff',
            'navbarDividerColor': '#ffcacaca',
            'listBackground': '#fff9f9f9',
            'moduleBatteryBar': '1'
          },
          'api': {
            'content_detail': 'content_detail',
            'dept_list': 'dept_list',
            'detail_comment_list': 'detail_comment_list',
            'home_column': 'http://bbssc.cloud.hoge.cn',
            'home_list': 'http://bbssc.cloud.hoge.cn',
            'home_list_mine': 'home_list_mine',
            'send_content': 'send_content'
          }
        }
        this.api = this.config.api
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'help2'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
      }
      // 获取用户信息
      const res = await nativeUtil.getUserInfo()
      if (res) {
        this.access_token = res.userTokenKey
        const result = await nativeUtil.getSystemInfo()
        if (result) {
          this.custom_appid = result.custom_appid
          this.custom_appkey = result.custom_appkey
          this.getLoaction()
          this.getTagList()
          this.getReward()
        }
      }
    },
    // 获取标签
    getTagList () {
      const param = {
        m: 'Apibbs',
        c: 'tags',
        a: 'index',
        custom_appid: this.custom_appid,
        custom_appkey: this.custom_appkey
      }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        if (!res.ErrorCode) {
          this.tagList = res
          storage.getItem('selectTags', event => {
            if (event.data) {
              let oldTagList = JSON.parse(event.data)
              this.tagList.forEach((v, k) => {
                oldTagList.forEach((v1, k1) => {
                  if (v.id === v1.id && v1.is_checked) {
                    v.is_checked = true
                  }
                })
              })
            }
          })
        } else {
          nativeUtil.alert(res.ErrorText)
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
    background-color: #f9f9f9;
    padding-left: 28px;
    padding-right: 28px;
    padding-top: 20px;
}
.main-head{
    width: 694px;
    height: 60px;
    padding-top: 10px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color:#DADADA;
}
.input-title{
    width: 694px;
    height: 40px;
    background-color: #f9f9f9;
    font-size: 30px;
    line-height: 50px;
    color:rgba(102,102,102,1);
    // placeholder-color:#afafaf;
}
.input-area{
    height: 180px;
    padding-top: 10px;
}
.main-body{
    padding-top: 10px;
}
.bottom-box{
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
    width: 694px;
    height: 150px;
    padding-top: 20px;
    margin-bottom: 30px;
    flex-direction: row;
    flex-wrap: wrap;
}
.selected-tag-item{
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    height: 52px;
    margin-right: 15px;
    margin-bottom: 20px;
    background-color:rgba(237,237,237,1);
    border-top-left-radius: 26px;
    border-top-right-radius: 26px;
    border-bottom-left-radius: 26px;
    border-bottom-right-radius: 26px;
}
.selected-tag-icon{
    width: 27px;
    height: 27px;
    margin-right: 9px;
}
.selected-tag-text{
    font-size: 24px;
    color:rgba(102,102,102,1);
}
.publish-active{
    color: rgba(247,64,46,1);
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
    width: 50px;
    height: 50px;
}
.drop-icon{
    width: 33px;
    height: 18px;
}
.drop-box{
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 250px;
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
    background-color:rgba(247,64,46,1);
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
</style>
