<template>
    <div class="list-bottom-wrapper">
        <div class="list-bottom">
            <div class="list-bottom-info">
                <text class="list-bottom-red-text" v-if="parseInt(data.is_top,10)">置顶</text>
                <text class="list-bottom-red-text" v-if="parseInt(data.is_hot,10)">头条推荐</text>
                <text class="list-bottom-grey-text">{{data.column_name}}</text>
                <div class="list-bottom-circle"></div>
                <text class="list-bottom-grey-text">{{data.created_at?data.created_at.substring(0,10):''}}</text>
            </div>
            <div class="list-bottom-right">
                <text class="list-bottom-grey-text">{{data.click_num}} 阅读</text>
            </div>
        </div>
    </div>

</template>

<script>

export default {
  props: ['data'],
  name: 'Bottom1',
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
.list-bottom-wrapper{
    margin-top:24px;
    flex-direction: row;
}
.list-bottom{
   flex:1;
   flex-direction: row;
   align-items: center;
}
.list-bottom-info{
    flex:1;
    flex-direction: row;
    align-items: center;
}
.list-bottom-red-text{
    color:#E02929;
    font-size:24px;
    margin-right:20px;
}
.list-bottom-grey-text{
    color:#A6A6A6;
    font-size: 24px;
}
.list-bottom-circle{
    width: 8px;
    height:8px;
    background-color: #CACACA;
    margin-left:10px;
    margin-right:10px;
    border-bottom-left-radius:8px;
    border-bottom-right-radius:8px;
    border-top-left-radius:8px;
    border-top-right-radius:8px;
}
</style>
