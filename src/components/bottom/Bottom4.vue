<template>
    <div class="list-bottom-wrapper">
        <text class="title-text" :style="{width:width}">2019-03-28</text>
        <text class="grey-text" :style="{width:width}">{{data.title}}</text>
    </div>

</template>

<script>

export default {
  props: ['width', 'data'],
  name: 'Bottom4',
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

}
.grey-text{
    font-size: 22px;
    color: #A6A6A6;
    lines:1;
   text-overflow:ellipsis;
   margin-top:4px;
}
.title-text{
   font-size: 26px;
  color: #333333;
   lines:1;
   text-overflow:ellipsis;
}
</style>
