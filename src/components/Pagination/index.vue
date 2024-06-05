<template>
  <div class="pagination">
    <button  @click="changePageNo(pageNo-1)"  :disabled="pageNo === 1">上一页</button>
    <button  @click="changePageNo(1)"  v-if="startEnd.start!== 1">1</button>
    <span  v-if="startEnd.start > 2 " >.....</span>

    <!-- 中间连续页码的地方:v-for、数组、对象、数字、字符串 -->
    <button 
    v-for="(number,index) in startEnd.end - startEnd.start + 1"
     :key="index"
      :class="{active:pageNo ===  (index + startEnd.start) }"
      @click="changePageNo(index + startEnd.start)"
     >
     {{index + startEnd.start}}
     </button>
   

  <span v-if="startEnd.end < totalPage - 1 " >.....</span>
    <button @click="changePageNo(totalPage)" v-if="startEnd.end !== totalPage ">{{ totalPage }}</button>
    <button  @click="changePageNo(pageNo+1)" :disabled="pageNo === totalPage " >下一页</button>

    <span>共 {{ total }} 条</span> 
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "pageSize", "pageNo", "continues",'changePageNo'],
  computed: {
    totalPage() {
      //分页器一共多少页【总条数/每页展示条数】
      return Math.ceil(this.total / this.pageSize);
    },
    //底下的代码是整个分页器最重要的地方[算出连续五个数字、开头、结尾]
    startEnd() {
      //获取分页器的各种参数
      const { total, pageSize, pageNo, continues, totalPage } = this;
      let start = 0; //连续页的起始位置
      let end = 0; //连续页的结束位置
      //各种计算
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - (continues - 1) / 2;
        end = pageNo + (continues - 1) / 2;
        //判断左边是否“冒了”
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //判断右边是否冒了
        if ( end > totalPage ) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>