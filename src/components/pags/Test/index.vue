<template>
  <swiper class="demo" :options="swiperOption">
    <!-- 每一屏 -->
    <swiper-slide><h1>第一屏</h1></swiper-slide>
    <swiper-slide><h1>第二屏</h1></swiper-slide>
    <swiper-slide><h1>第三屏</h1></swiper-slide>
    <swiper-slide><h1>第四屏</h1></swiper-slide>
    <!-- 小圆点 -->
    <div class="swiper-pagination" slot="pagination"></div>
    <!-- 左按钮 -->
    <div class="swiper-button-prev" slot="button-prev"></div>
    <!-- 右按钮 -->
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: 'test',
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
          //同时展示几屏
          slidesPerView: 1,
          //屏与屏之间的距离
          spaceBetween: 30,
          //循环轮播
          loop: true,
          autoplay:{
            delay:1000,  //每一屏要看多久
            speed:3000,  
           
            disableOnInteraction:true,  //操作轮播图后是否禁用自动轮播
          },
        
          pagination: {
            el: '.swiper-pagination',   //指定小圆点呈现位子
            clickable: true  //小圆点是否可以点击
          },
          //左箭头，右箭头
          navigation: {
            nextEl: '.swiper-button-next', 
            prevEl: '.swiper-button-prev'
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.demo {
  height: 300px;
  background-image: linear-gradient(45deg, pink, skyblue ,orange);
}
</style>