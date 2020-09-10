<template>
    <div class="list-bottom-wrapper">
      <div class="list-bottom">
        <div class="text-box">
           <text class="grey-text">{{data.created_at?data.created_at.substring(5,10):''}}</text>
           <text class="list-bottom-red-text" v-if="parseInt(data.is_top,10)">置顶</text>
           <!-- <text class="list-bottom-red-text" v-if="parseInt(data.is_hot,10)">头条推荐</text> -->
        </div>
         <text class="grey-text" v-if="data.click_num > 0">{{data.click_num}} 阅读</text>
      </div>

    </div>

</template>

<script>

export default {
  props: ['data'],
  name: 'Bottom2',
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
.list-bottom{
    flex:1;
    flex-direction: row;
    justify-content: space-between;
}
.text-box{
  flex-direction: row;
  align-items: center;
}
.grey-text{
    width: 400px;
    font-size: 24px;
    color: #A6A6A6;
}
.list-bottom-red-text{
    color:#E02929;
    font-size:24px;
    margin-right:20px;
}
</style>
