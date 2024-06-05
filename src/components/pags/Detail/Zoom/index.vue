<template>
  <div class="spec-preview">
    <vue-photo-zoom-pro
      :out-zoomer="true"
      :width="200"
      :height="200"
      :high-url="givenImgurl || imgUrl"
    >
      <img :src="givenImgurl || imgUrl" />
    </vue-photo-zoom-pro>
  </div>
</template>

<script>
import vuePhotoZoomPro from "vue-photo-zoom-pro";
import "vue-photo-zoom-pro/dist/style/vue-photo-zoom-pro.css";
export default {
  name: "Zoom",
  components: {
    vuePhotoZoomPro,
  },
  props: ["imgUrl",],
  data(){
    return{
      givenImgurl:''
    }
  },
  mounted(){
    this.$bus.$on('get-imgurl',(url)=>{
console.log('zoom',url)
this.givenImgurl = url
    })
  },
  beforeDestroy(){
     this.$bus.$off('get-imgurl')
  }
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;
  img {
    width: 100%;
    height: 100%;
  }
  .zoomer {
    z-index: 5;
    top: 0px !important;
    left: 10px !important;
  }
  .selector {
    background-color: rgba(240, 181, 105, 0.286);
  }
}
</style>