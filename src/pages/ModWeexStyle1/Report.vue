<template>
     <div class="report-wrapper" :style="{'background-color':formatColor(config.attrs.listBackground)}">
         <div class="head">
              <text class="head-text mr32" :class="[headSlideIndex==0?'head-active':'head-common']" :style="{'color':formatColor(config.attrs.navBarTitleColor)}" @click="toggle(0)">最新</text>
              <text class="head-text" :class="[headSlideIndex==1?'head-active':'head-common']" :style="{'color':formatColor(config.attrs.navBarTitleColor)}" @click="toggle(1)">我的</text>
              <image :src="getLocalImgUrl('icon_add_news3x.png')" class="add-icon" @click="addPost()"></image>
         </div>
          <slider class="slide"
             auto-play="false" @change="headSlideChage" infinite="false" :index="headSlideIndex">
             <div class="box">
                 <scroller class="nav-box" :style="{'border-bottom-color':formatColor(config.attrs.navbarDividerColor),'border-top-color':formatColor(config.attrs.navbarDividerColor)}"
                 scroll-direction="horizontal">
                    <div class="nav-item"
                    :ref="'navitem'+idx"
                    @click="changeSlide(item,idx)"
                     :class="[idx!=navList.length-1?'mr50':'mr32']"
                    v-for="(item,idx) in navList" :key="idx">
                        <text class="nav-text"
                        :class="[slideIndex==idx?'active-text':'common-text']">{{item.name}}</text>
                    </div>
                 </scroller>
                 <slider class="slide-content" @change="slideChage" infinite="false" :index="slideIndex"
                 auto-play="false">
                    <scroller class="slider-item" ref="slideitem0">
                      <refresh @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'" class="refresh">
                        <refresh-style></refresh-style>
                      </refresh>
                        <list1 :data-list="dataList"
                               :bgc="formatColor(config.attrs.listBackground)"
                               :btn-color="formatColor(config.attrs.button_backgroundcolor)"
                        ></list1>
                    </scroller>
                 </slider>
             </div>
             <div class="no-data">
                <image :src="getLocalImgUrl('applant_no_data3x.png')" class="no-data-img"></image>
                <text class="no-data-text">这里什么都没有</text>
              </div>
         </slider>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import List1 from '../../components/report/List1'
import RefreshStyle from '../../components/common/RefreshStyle'
const dom = weex.requireModule('dom')
export default {
  name: 'Report',
  components: {
    List1,
    RefreshStyle
  },
  data () {
    return {
      dataList: [],
      headSlideIndex: 0,
      slideIndex: 0,
      navList: [],
      offset: 0,
      user_id: 123,
      refreshing: false,
      currentId: null,
      config: {}, // 配置项
      api: {} // 接口
    }
  },
  methods: {
    goback () {
      this.goBack()
    },
    // 切换
    toggle (i) {
      this.headSlideIndex = i
    },
    // 下拉刷新
    onrefresh () {
      this.refreshing = true
      this.getShowList(this.currentId)
    },
    headSlideChage (event) {
      this.headSlideIndex = event.index
    },
    // 导航栏的切换
    slideChage (event) {
      this.slideIndex = event.index
      this.getSize('navitem' + this.slideIndex)
    },
    changeSlide (item, index) {
      this.slideIndex = index
      this.getSize('navitem' + this.slideIndex)
      this.currentId = item.id
      this.getShowList(this.currentId)
    },
    // 获取元素宽度 得到偏移量
    getSize (el) {
      const currentBarRef = this.$refs[el][0]
      const firstRef = this.$refs['navitem0'][0]
      dom.getComponentRect(currentBarRef, option => {
        const opt = JSON.parse(JSON.stringify(option))
        const width = opt.size.width
        const scollWidth = (-(375 - width / 2))
        dom.getComponentRect(firstRef, options => {
          const opts = JSON.parse(JSON.stringify(options))
          if (opts.size.left <= 32 && this.slideIndex > 1) {
            this.scrollToEl(currentBarRef, scollWidth)
          } else {
            this.scrollToEl(firstRef, -32)
          }
        })
      })
      // dom.getComponentRect(currentBarRef, option => {
      //   const opt = JSON.parse(JSON.stringify(option))
      //   weex.requireModule('modal').toast({
      //     message: opt.size.left + '嘻嘻'
      //   })
      //   weex.requireModule('modal').toast({
      //     message: (311 - opt.size.width / 2) + 'haha '
      //   })
      //   const width = opt.size.width
      //   const scollWidth = (-(375 - width / 2))
      //   if (opt.size.left > (343 - width / 2)) {
      //     this.scrollToEl(currentBarRef, scollWidth)
      //   } else {
      //     this.scrollToEl(firstRef, -32)
      //   }
      // })
    },
    // 触发导航栏滚动
    scrollToEl (el, num) {
      dom.scrollToElement(el, { offset: num })
    },
    // 获取顶部栏目列表
    getColumnList () {
      this.$httpRequest(this.api.home_column, {}, 'get').then(res => {
        if (res.length) {
          this.navList = res
          this.getShowList(this.navList[0].id)
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 获取当前报料展示列表
    getShowList (id) {
      const param = {
        sort_id: id,
        offset: this.offset,
        count: 20
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        this.refreshing = false
        this.dataList = res
      }, (e) => {
        console.log(e)
        this.refreshing = false
      })
    },
    // 跳转报料发布页
    addPost () {
      this.jumpWithParams('Post', {})
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
            'navBarTitleColor': '#ff000000',
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
        this.getColumnList()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'contribute'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        this.getColumnList()
      }
    }
  },
  created () {
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">
.refresh{
  height:80px;
}
.report-wrapper{
   flex:1;
   width: 750px;
   position: relative;
}
//头部
.head{
    flex-direction: row;
    justify-content: center;
    margin-top:20px;
    align-items: center;
    height:100px;
}
.add-icon{
    width: 48px;
    height: 48px;
    position: absolute;
    right: 32px;
}
.mr32{
    margin-right:32px;
}
.head-text{
    width: 102px;
}
.head-active{
    font-size: 40px;
}
.head-common{
    font-size: 32px;
}
//头部 end
.slide{
    position: absolute;
    top:120px;
    bottom:0;
    width: 750px;
}
.box{
    flex:1;
    width: 750px;
}
// 导航栏
.nav-box{
    width: 750px;
    height:84px;
    padding-left:32px;
    flex-direction: row;
    border-bottom-style:solid;
    border-bottom-width:1px;
    border-top-style:solid;
    border-top-width:1px;
}
.nav-item{
    height:84px;
    justify-content: center;
}
.nav-text{
    font-size: 32px;
}
.active-text{
    color: #E44328;
}
.common-text{
    color: #4F4F4F;
}
.mr50{
    margin-right:50px;
}
// 导航栏 end
.slide-content{
    position: absolute;
    top:84px;
    bottom:0;
    width: 750px;
}
.slider-item{
    position: absolute;
    top:0;
    bottom:0;
    width: 750px;
}
.config{
  position: absolute;
  top: 900px;
}
.no-data{
  margin-top: 80px;
  height: 1000px;
  width: 750px;
  align-items: center;
  justify-content: center;
}
.no-data-img{
  width: 255px;
  height: 185px;
}
.no-data-text{
  color:#bbb;
  font-size: 24px;
  margin-top: 20px;
}
</style>
