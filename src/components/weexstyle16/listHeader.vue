<template>
  <div class="list-header">
      <div class="header-left">
        <div v-if="!(item.head_pic && item.head_pic.host)" class="person-avater border-avater">
          <image resize="contain" :src="getLocalImgUrl('icon_username3x.png')" class="person-avater"></image>
        </div>
        <image :src="item.head_pic.host + item.head_pic.dir +  '62x62/' +item.head_pic.filepath + item.head_pic.filename" class="person-avater" v-if="item.head_pic && item.head_pic.host"></image>

        <text class="person-name">{{item.user_name}}</text>
      </div>

      <div class="list-column-name">
        <text class="column-names">{{item.type}}</text>
      </div>
  </div>
</template>

<script>

// import { nativeUtil } from '../../lib/nativeUtils'
export default {
  props: ['item'],
  name: 'nav',
  data () {
    return {
      // statusbar_height: ''
    }
  },
  methods: {
  },
  // 获取系统信息
  created () {
  }
}
</script>

<style scoped lang="scss">
//列表头部
.list-header{
  margin-left:26px;
  margin-right: 26px;
  flex-direction: row;
  width: 698px;
  align-items: center;
  height:110px;
  justify-content: space-between;
  border-bottom-style:solid;
  border-bottom-width:1px;
  border-bottom-color: #EEEEEE;
}
.header-left{
  flex-direction: row;
  align-items: center;
}
.person-avater{
  width: 62px;
  height:62px;
  border-bottom-left-radius:31px;
  border-bottom-right-radius:31px;
  border-top-left-radius:31px;
  border-top-right-radius:31px;
  margin-right:16px;
}
.border-avater{
  border-bottom-style:solid;
  border-bottom-width:1px;
  border-bottom-color: #EEEEEE;
  border-top-style:solid;
  border-top-width:1px;
  border-top-color: #EEEEEE;
  border-right-style:solid;
  border-right-width:1px;
  border-right-color: #EEEEEE;
   border-left-style:solid;
  border-left-width:1px;
  border-left-color: #EEEEEE;
}
.person-name{
  color:#222222;
  font-size: 28px;
}
.list-column-name{
  height:40px;
  background-color:#F5F5F5;
  padding-left:9px;
  padding-right:9px;
  border-bottom-left-radius:4px;
  border-bottom-right-radius:4px;
  border-top-left-radius:4px;
  border-top-right-radius:4px;
}
.column-names{
  color:#999999;
  font-size:22px;
  line-height: 40px;
}
</style>
