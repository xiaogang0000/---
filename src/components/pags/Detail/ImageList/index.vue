<template>
  <swiper class="swiper" :options="swiperOption">
    <!-- 每一屏 -->
    <swiper-slide v-for="image in imageList" :key="image.id">
      <img :src="image.imgUrl" alt="哈哈哈哈哈"  @click="getImgUrl(image.imgUrl)"/>
    </swiper-slide>
    <!-- 小圆点 -->
    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    <!-- 左按钮 -->
    <div class="swiper-button-prev" slot="button-prev"></div>
    <!-- 右按钮 -->
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "ImageList",
  props: ["imageList"],
  components: {
    Swiper,
    SwiperSlide,
  },
   data() {
    return {
      swiperOption: {
        //同时展示几屏
        slidesPerView: "auto",
        //屏与屏之间的距离
        spaceBetween: 30,
        //循环轮播
        loop: false,
        // autoplay: {
        //   delay: 1000, //每一屏要看多久
        //   speed: 3000,

        //   disableOnInteraction: true, //操作轮播图后是否禁用自动轮播
        // },

        // pagination: {
        //   el: ".swiper-pagination", //指定小圆点呈现位子
        //   clickable: true, //小圆点是否可以点击
        // },
        //左箭头，右箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  methods:{
    getImgUrl(url){
  this.$bus.$emit('get-imgurl',url)
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>