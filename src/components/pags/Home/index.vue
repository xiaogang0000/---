<template>
<div>
   <TypeNav/>
   <ListContainer/>
   <!-- <Recommend/> -->
   <!-- <Rank/> -->
   <!-- <Like/> -->
   <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"/>
   <Brand/>
</div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Brand from './Brand/Brand.vue'
import Floor from './Floor/Floor.vue'
import Like from './Like/Like.vue'
import Rank from './Rank/Rank.vue'
import {mapState} from 'vuex' //一定记得引入vuex实例上的方法调佣
export default {
   name:'Home',
   components:{ListContainer,Recommend,Brand,Floor,Like,Rank},
   mounted(){
      this.$store.dispatch('getfloorList')
   },
   computed: {
      ...mapState({
         floorList:state => state.home.floorList
      })
   }
}
</script>

<style lang="less" scoped>

</style>
