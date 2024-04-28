<template>
  <div class="teat" >
   <TypeNav/>
    <h1 >我是Search</h1>
    <!-- 注意：这里只有点击了选项，才会有路由参数 -->
    <h1>{{$route.query}}</h1>
  </div>
   
</template>

<script>
export default {
   name:'Search',
   
}
</script>

<style lang="less" scoped>
   h1{
      text-align: center;
    }

</style>