<template>
     <div class="card-box">
        <div class="card-item" :class="[index==cardList.length-1?'':'not-last-style']"
        v-for="(item,index) in cardList" :key="index">
            <image class="card-icon" :src="getLocalImgUrl(item.icon)"></image>
            <text class="card-title">{{item.title}}</text>
        </div>
    </div>

</template>

<script>

export default {
  name: 'TabCard',
  props: ['cardList'],
  components: {

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
.card-box{
    width: 750px;
    height:100px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding:30px;
    background-color: #ffffff;
}
.card-item{
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height:32px;
    padding-right:27px;
}
.card-icon{
   width: 36px;
   height:36px;
   margin-right:12px;
}
.card-title{
    color:#333333;
    font-size: 28px;
}
.not-last-style{
  border-right-style:solid;
  border-right-width:1px;
  border-right-color:  #EEEEEE;
}
</style>
