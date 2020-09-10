 <!-- 相关阅读-->
<template>
    <div  class="releated-wrapper">
        <div class="releated-title">
            <text class="releated-text">相关阅读</text>
        </div>
         <div v-for="(item,index) in data" :key="index">
             <list24 :data="item"></list24>
             <div class="border-line"></div>
         </div>
         <!-- <div v-for="(item,index) in data" :key="index">
             <list24 :data="item"></list24>
             <div class="border-line"></div>
         </div>
         <div v-for="(item,index) in data" :key="index">
             <list24 :data="item"></list24>
             <div class="border-line"></div>
         </div> -->
    </div>

</template>

<script>
import List24 from '../../components/list/List24.vue'
export default {
  props: ['data'],
  name: 'RelatedRead',
  components: {
    List24
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
 @import "../../style/common.scss";
.releated-wrapper{
    width: 750px;
}
.releated-title{
    justify-content: center;
    padding-left:32px;
    width: 750px;
    height:90px;
    border-bottom-style:solid;
    border-bottom-width:1px;
    border-bottom-color:  #EEEEEE;
}
.releated-text{
    font-size: 28px;
    color: #4F4F4F;
    marin-left:32px;
}
</style>
