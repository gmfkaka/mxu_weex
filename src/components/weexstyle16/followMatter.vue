
<template>
    <div  class="followMatter-wrapper" :class="[this.isIphoneX() ? 'ipx-margin-bottom' : '']">
        <no-date1 v-if="!follow.length" :height="'200px'"></no-date1>
        <div class="comment-items" v-for="(item,idx) in follow" :class="[idx!=follow.length-1?'borbottom':'']" :key="idx">
          <!-- 头部 -->
          <div class="comment-list-header">
            <div class="header-left">
              <div v-if="!(item.head_pic && item.head_pic.host)" class="person-avater border-avater">
                <image resize="contain" :src="getLocalImgUrl('icon_username3x.png')" class="person-avater"></image>
              </div>
              <image :src="item.head_pic.host + item.head_pic.dir +  '62x62/' +item.head_pic.filepath + item.head_pic.filename" class="person-avater" v-if="item.head_pic && item.head_pic.host"></image>

              <text class="person-name">{{item.user_name}}</text>
            </div>

            <div class="list-column-name">
              <text class="column-names">{{transTime(item.create_time)}}</text>
            </div>
          </div>
        </div>
    </div>

</template>

<script>
import NoDate1 from '../../components/weexstyle16/NoDate1.vue'
export default {
  props: ['follow'],
  name: 'list1',
  components: {
    NoDate1
  },
  data () {
    return {

    }
  },
  methods: {

  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.followMatter-wrapper{
  width: 750px;
}
.comment-items{
  padding-top:24px;
  padding-bottom:19px;
  margin-left:24px;
  margin-right:24px;
  width: 702px;
}
.borbottom{
  border-bottom-style:dashed;
  border-bottom-width:1px;
  border-bottom-color: #D8D7D7;
}
//列表头部
.comment-list-header{
  flex-direction: row;
  width: 702px;
  align-items: center;
  height:62px;
  justify-content: space-between;
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
  margin-right:20px;
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
  color:#999999;
  font-size: 24px;
}
.column-names{
  color:#BABABA;
  font-size:22px;
  line-height: 40px;
}
.ipx-margin-bottom{
  padding-bottom:20px;
}
</style>
