<template>
     <div class="service-wrapper">
         <head></head>
         <scroller style="padding-bottom:100px;">
            <refresh @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
              <refresh-style></refresh-style>
            </refresh>
             <div class="card-box" v-for="(item,index) in module" :key="index">
                 <service-card :title="item.name" :list="item.modules"></service-card>
             </div>
         </scroller>
    </div>
</template>

<script>
import { nativeUtil } from '../../lib/nativeUtils'
import ServiceCard from '../../components/service/ServiceCard.vue'
import Head from '../../components/service/Head.vue'
import RefreshStyle from '../../components/common/RefreshStyle'
export default {
  name: 'Service',
  components: {
    ServiceCard,
    Head,
    RefreshStyle,
    config: {},
    api: {}
  },
  data () {
    return {
      refreshing: false,
      module: []
    }
  },
  methods: {
    // 下拉刷新
    onrefresh () {
      this.refreshing = true
      this.getData()
    },
    // 获取数据
    getData () {
      const param = {
        appkey: 'mmv6bfo799vcDHqfZBlqtDp4NHCCb4xn',
        appid: 36
      }
      this.$httpRequest(this.api.home_list, param, 'get').then(res => {
        if (!res.error_code) {
          this.module = res.module
          this.refreshing = false
        } else {
          this.messageTip(res.error_message)
        }
      }, (e) => {
        console.log(e)
      })
    },
    // 获取配置文件
    async getConfig () {
      if (this.getPlatform() === 'web') {
        this.config = {
          'id': '9713',
          'uniqueid': 'apps',
          'type': '1',
          'name': '服务',
          'ename': 'apps',
          'custom_name': 'apps',
          'url': '',
          'is_master': '1',
          'native_uniqueid': 'ModWeex',
          'is_stand_alone': '0',
          'native_depends': '',
          'ios_is_stand_alone': '0',
          'native_ios_depends': '',
          'native_ui': 'ModWeexStyle4',
          'android_min': null,
          'android_max': null,
          'ios_min': null,
          'ios_max': null,
          'attrs': {
            'navBarTitle': '',
            'button_backgroundcolor': '#ff4576e0',
            'navBarTitleColor': '#ffffffff',
            'navbarDividerColor': '#ff333333',
            'listBackground': '#fff9f9f9',
            'moduleBatteryBar': '0'
          },
          'api': {
            'content_detail': 'content_detail',
            'dept_list': 'dept_list',
            'detail_comment_list': 'detail_comment_list',
            'home_column': 'home_column',
            'home_list': 'http://mobile.ihytv.com/nhyapp/mobile_module.php',
            'home_list_mine': 'home_list_mine',
            'send_content': 'send_content'
          }
        }
        this.api = this.config.api
        this.getData()
      } else {
        const param = {
          'isMain': '0',
          'moduleSign': 'apps'
        }
        const res = await nativeUtil.getConfig(param)
        this.config = res
        this.api = this.config.api
        this.getData()
      }
    }
  },
  created () {
    this.getConfig()
  }
}
</script>

<style scoped lang="scss">
.service-wrapper{
  flex:1;
  width: 750px;
  position: relative;
  background-color:#ffffff;
}
.card-box{
  padding-left:30px;
  padding-right:30px;
  padding-top:32px;
  padding-bottom:25px;
}
</style>
