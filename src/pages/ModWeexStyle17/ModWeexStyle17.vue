<template>
     <div class="home-wrapper pos-full" @viewappear="onappear">
        <div class="top" :class="[this.isIphoneX() ? 'x-top':'']" :style="androidStylePaddingTop">
            <text class="title-txt flex1 fz34">社区</text>
            <image v-if="userAvatar" class="avatar-img" :src="userAvatar" @click="goDetail('my')"></image>
            <image v-else class="avatar-img" @click="goDetail('my')" :src="getLocalImgUrl('xiamen_my.png')"></image>
        </div>
        <scroller class="flex1" style="background-color:#fff;" :style="tabbarStyle" show-scrollbar=false>
          <!-- 轮播 -->
          <slider v-if="sliderList.length" class="slider" interval="5000" auto-play="true">
              <div class="slider-item" v-for="(item,idx) in sliderList" :key="idx" @click="goPostDetail(item.is_activity,item.id)">
                  <image class="slider-img" :src="cutImg(item.indexpic,750,352)"></image>
                  <text class="slider-text fz36">{{item.title}}</text>
              </div>
          </slider>
          <!-- 服务列表 -->
          <scroller class="img-box flex-row-center bg-fff" show-scrollbar=false scroll-direction="horizontal" v-if="serviceList.length">
              <div class="img-box-content flex-col-center" v-for="(item,index) in serviceList" :key="index" @click="goDetail(item.link)">
                  <image :src="item.index_pic" class="service-icon"></image>
                  <text class="img-text fz28">{{item.title}}</text>
              </div>
          </scroller>
          <!-- 社区列表 -->
          <text class="main-title fz34" v-if="actList.length">社区</text>
          <div class="act-item" v-for="(item,index) in actList" :key="index" @click="goPostDetail(item.is_activity,item.id)">
            <!-- 用户信息 -->
            <div class="info flex-row-between flex-align">
              <image v-if="item.user_info.avatar.host" class="avatar" :src="item.user_info.avatar.host+item.user_info.avatar.dir+item.user_info.avatar.filepath+item.user_info.avatar.filename"></image>
              <image v-else class="avatar" :src="getLocalImgUrl('pic_user_default3x.png')"></image>
              <div class="user-info flex1" style="justify-content: center;">
                <text class="user-name fz30">{{item.user_info.user_name}}</text>
                <text class="user-time fz24">{{item.create_time_format.substring(0,10)}}</text>
              </div>
              <!-- 状态 -->
              <text v-if="item.time_status === 1" class="tag-item fz24 tag-not-start">{{item.time_status_text}}</text>
              <text v-if="item.time_status === 2" class="tag-item fz24 tag-ing">{{item.time_status_text}}</text>
              <text v-if="item.time_status === 3" class="tag-item fz24 tag-end">{{item.time_status_text}}</text>
              <!-- 标签 -->
              <text v-for="(tag,idx) in item.tag" :key="idx" class="tag-item fz24 border1" v-if="tag.name !== '置顶'">{{tag.name}}</text>
            </div>
            <!-- is_activity 0普通 1活动 2投票 -->
            <text class="brief fz36" v-if="item.is_activity === '0'">{{item.brief}}</text>
            <text class="brief fz36" v-else>{{item.act_title}}{{item.brief}}</text>
            <!-- 普通 -->
            <div class="post-img-box flex-row bg-fff" v-if="item.is_activity === '0'">
              <image v-for="(img,idx) in item.pics.slice(0.3)" :key="idx" class="post-img" :class="[idx > 0 ? 'ml20':'']" :src="cutImg(img,221,221)"></image>
            </div>
            <!-- 活动 -->
            <div class="act-box flex-row" v-if="item.is_activity === '1'">
              <image v-if="item.indexpic.host" class="post-img" :src="cutImg(item.indexpic,221,221)"></image>
              <div class="flex1 act-brief flex-between">
                <text class="act-type-text fz30">{{item.create_time_format.substring(0,16)}}</text>
                <text class="act-type-text fz30" v-if="item.charge_type === '1'">免费</text>
                <text class="act-type-text fz30" v-if="item.charge_type === '2'">现场付款 活动费用：{{item.per_capita}}元</text>
                <text class="act-type-text fz30" v-if="item.charge_type === '3'">活动后AA</text>
              </div>
            </div>
            <!-- 投票 -->
            <div class="vote-box" v-if="item.is_activity === '2'">
              <text class="vote-item fz30" :class="[idx > 0 ? 'bt1':'']" v-for="(option,idx) in item.vote_info.option" :key="idx">{{idx+1}}、{{option.title}}</text>
            </div>
            <!-- 点击评论数 -->
            <div class="num-box flex-row-center">
                <image class="view-icon" :src="getLocalImgUrl('xiamen_view.png')"></image>
                <text class="num-text fz24">{{item.click_num}}</text>
                <image class="comment-icon" :src="getLocalImgUrl('xiamen_comment.png')"></image>
                <text class="num-text fz24">{{item.comment_num}}</text>
            </div>
          </div>
          <loading v-if="hasMore" class="loading-box" @loading="onloading" :display="loading ? 'show' : 'hide'">
              <loading-indicator class="indicator"></loading-indicator>
              <text class="loading-text">加载中</text>
          </loading>
          <!-- <cell v-if="!hasMore">
              <text class="no-more-data">没有更多了</text>
          </cell> -->
        </scroller>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
export default {
  name: 'ModWeexStyle17',
  data () {
    return {
      appid: 'm2ohvecbng7leb8ixo',
      appkey: '45920796f66247395069ee6f45d99c5e',
      api: {},
      config: {},
      serviceList: [],
      sliderList: [],
      actList: [],
      sign: {},
      offset: 0,
      count: 10,
      hasMore: true,
      loading: false,
      userAvatar: '',
      tabbarStyle: {}
    }
  },
  methods: {
    // 获取轮播图和服务列表
    getData () {
      const param = {
        appid: this.appid,
        appkey: this.appkey
      }
      this.$httpRequest(this.api.home_column, param, 'get').then(res => {
        this.serviceList = res.services
        this.sliderList = res.slide
        this.getActData()
      }, (e) => {
        console.log(e)
      })
    },
    // 获取活动信息
    getActData () {
      const param = {
        appid: this.appid,
        appkey: this.appkey,
        count: this.count,
        offset: this.offset
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (this.offset === 0) {
          this.actList = res.data
          // console.log(this.actList)
        } else {
          if (res.data.length) {
            this.actList = this.actList.concat(res.data.list)
          } else {
            this.hasMore = false
          }
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 加载更多
    onloading () {
      this.loading = true
      if (!this.hasMore) {
        this.loading = false
        return
      }
      this.offset += 10
      this.getActData()
    },
    // 跳转内链
    goDetail (link) {
      nativeUtil.getLoginStatus().then(res => {
        if (res === '0') {
          nativeUtil.goLogin()
        } else {
          nativeUtil.linkTo(link)
        }
      })
    },
    // 跳转帖子详情
    goPostDetail (type, id) {
      type === '0' && nativeUtil.linkTo(`${this.sign.communityModuleSign}/ModCommunityStyle1NoteDetail1?id=${id}`)
      type === '1' && nativeUtil.linkTo(`${this.sign.communityActivityModuleSign}/ModEventStyle1Detail1?id=${id}`)
      type === '2' && nativeUtil.linkTo(`${this.sign.communityVottingModuleSign}/ModEventVotingStyle1Detail1?id=${id}`)
    },
    // 获取用户头像
    getAvatar () {
      nativeUtil.getUserInfo().then(res => {
        if (res.picurl) {
          this.userAvatar = res.picurl
        }
      })
    },
    onappear () {
      this.getAvatar()
    },
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'attrs': {
            'communityModuleSign': 'bbs',
            'communityVottingModuleSign': 'eventVotting',
            'communityActivityModuleSign': ''
          },
          'api': {
            'content_detail': 'content_detail',
            'dept_list': 'dept_list',
            'detail_comment_list': 'detail_comment_list',
            'home_column': 'http://mapi.kxm.xmtv.cn/api/open/xiamen/community_index.php',
            'home_list': 'http://mapi.kxm.xmtv.cn/api/open/xiamen/activity_vote_list',
            'home_list_mine': 'home_list_mine',
            'send_content': 'send_content'
          }
        }
        this.api = this.config.api
        this.sign = this.config.attrs
        this.getData()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'shequ'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        this.sign = this.config.attrs
        const result = await nativeUtil.getConfig({'isMain': '1'})
        if (result) {
          this.appid = result.thirdparty.m2oApiKey.ios_appid
          this.appkey = result.thirdparty.m2oApiKey.ios_appkey
          if (result.statusbar_height) {
            this.statusbar_height = result.statusbar_height
          }
          this.getData()
          this.getAvatar()
        }
      }
    }
  },
  created () {
    this.getConfig()
  },
  beforeCreate () {
    const dom = weex.requireModule('dom')
    const platform = weex.config.env.platform.toLowerCase()
    let url
    if (platform === 'android') {
      url = "url('/src/assets/fonts/hogefont.ttf')"
    } else if (platform === 'ios') {
      url = "url('local:///Font/Regular.ttf')"
    }
    dom.addRule('fontFace', {
      'fontFamily': 'w7',
      'src': url
    })
    // 获取tabbar高度
    if (platform !== 'web') {
      nativeUtil.getSystemInfo().then(res => {
        if (res.isRoot === '1') {
          const height = (750 / parseInt(res.screenWidth, 10)) * parseInt(res.tabBarHeight, 10)
          this.tabbarStyle = { paddingBottom: `${height}px` }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../style/common.scss';
.home-wrapper{
    background-color: #f2f6fa;
}
.x-top{
    padding-top: 96px;
}
.top{
    flex-direction: row;
    align-items: center;
    width: 750px;
    padding-top: 58px;
    padding-bottom: 25px;
    background-color: #ffffff;
    position: relative;
    padding-right: 20px;
}
.avatar-img{
    width: 60px;
    height: 60px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
}
.title-txt{
  color: #000000;
  font-family: w7;
  padding-left: 340px;
}
.slider{
  height: 372px;
}
.slider-item{
  height: 372px;
  position: relative;
}
.slider-img{
  width: 750px;
  height: 372px;
}
.slider-text{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color:#fff;
  padding: 24px;
  font-family:STSongti-SC-Regular,STSongti-SC;
  background-color: rgba(0,0,0,0.2);
}
.img-box{
    width: 750px;
    height: 200px;
}
.img-box-content{
    width: 250px;
}
.service-icon{
  width: 100px;
  height: 100px;
}
.img-text{
    color:rgba(51,51,51,1);
    margin-top: 25px;
}
.main-title{
    width: 750px;
    height: 82px;
    line-height: 82px;
    padding-left: 22px;
    font-family:DFPSongW7;
    color:rgba(51,51,51,1);
    background-color:#F6F6F6 ;
}
.act-item{
    padding: 20px;
    border-bottom-width: 1px;
    border-bottom-color: #EEEEEE;
    border-bottom-style: solid;
    background-color: #fff;
    position: relative;
}
.avatar{
    width: 70px;
    height: 70px;
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
    border-bottom-left-radius: 35px;
    border-bottom-right-radius: 35px;
    margin-right: 20px;
}
.user-name{
    font-family:STSongti-SC-Regular,STSongti-SC;
    color:#222222;
}
.user-time{
    font-family:STSongti-SC-Regular,STSongti-SC;
    color: #999999;
}
.tag-item{
    color: #FF7E0E;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 10px;
    padding-right: 10px;
    border-left-color: #FF7E0E;
    border-top-color: #FF7E0E;
    border-right-color: #FF7E0E;
    border-bottom-color: #FF7E0E;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-left: 10px;
}
.tag-not-start{
  color: #fff;
  background-color: rgba(50,197,255,1);
}
.tag-ing{
  color: #fff;
  background-color: rgba(255,126,14,1);
}
.tag-end{
  color: #fff;
  background-color: rgba(192,192,192,1);
}
.brief{
    margin-top: 25px;
    margin-bottom: 20px;
    font-family:STSongti-SC-Regular,STSongti-SC;
    color:rgba(34,34,34,1);
}
.post-img{
    width: 221px;
    height: 221px;
}
.ml20{
  margin-left: 20px;
}
.act-box{
  height: 221px;
  background-color: rgba(246,246,246,1);;
}
.act-brief{
  padding: 24px;
}
.act-type-text{
  color: #999999;
}
.vote-box{
  background-color: rgba(246,246,246,1);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding-left: 30px;
  padding-right: 30px;
}
.vote-item{
  height: 90px;
  line-height: 90px;
  color:#333333;
}
.bt1{
  border-top-color:rgba(231,231,231,1);
  border-top-style: solid;
  border-top-width: 1px;
}
.num-box{
  margin-top: 30px;
  justify-content: flex-end;
}
.view-icon{
  width: 37px;
  height: 24px;
}
.num-text{
  color: #999999;
  margin-left: 10px;
}
.comment-icon{
  width: 27px;
  height: 26px;
  margin-left: 30px;
}
.loading-box{
  width: 750px;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
.loading-text{
  color: #9c9c9c;
}
.indicator {
  height: 40px;
  width: 40px;
  margin-right: 15px;
  color: skyblue;
}
.no-more-data{
  color:#9c9c9c;
  width: 750px;
  text-align: center;
  background-color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
