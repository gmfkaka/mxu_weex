<template>
    <div class="list-content">
        <text class="list-title">{{data.title}}</text>
        <div class="list-tips">
            <text class="list-tips-tel">{{data.user_name}}</text>
            <text class="list-tips-time">{{transTime(data.create_time)}}</text>
        </div>
    </div>
</template>

<script>
export default {
  props: ['data'],
  name: 'List3',
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
.list-content{
    width: 750px;
    height: 150px;
    padding-top: 30px;
    padding-left: 50px;
    padding-right: 50px;
    background-color: #ffffff;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #F2F2F2;
}
.list-title{
    font-size: 30px;
    color: #333333;
    margin-bottom: 15px;
    lines:1;
    text-overflow: ellipsis;
}
.list-tips{
    flex-direction: row;
    align-items: center;
}
.list-tips-tel{
    font-size: 24px;
    color: #999999;
}
.list-tips-time{
    font-size: 24px;
    color: #999999;
    margin-left: 20px
}
</style>
