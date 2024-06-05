<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类名面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">x</i>
            </li>
            <!-- 展示关键词 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">x</i>
            </li>
            <!-- 展示品牌名 -->
            <li class="with-x" v-show="searchParams.trademark">
              {{ tmdShowName }}<i @click="removeTrademark">x</i>
            </li>
            <!-- 属性面包屑 -->
            <li
              class="with-x"
              v-for="(p, index) in searchParams.props"
              :key="index"
            >
              {{ attrShowName(p) }}<i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--搜索器-->
        <SearchSelector
          @get-trademark="saveTrademark"
          @get-attr="saveAttr"
          v-if="total"
        />
        <!--商品展示区-->
        <div class="details clearfix" v-if="total">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: sortType === 1 }" @click="changeOrder(1)">
                  <a 
                    >综合
                    <span
                      v-show="sortType === 1"
                      class="iconfont"
                      :class="iconName"
                    ></span
                  ></a>
                </li>

                <li :class="{ active: sortType === 2 }" @click="changeOrder(2)" >
                  <a 
                    >价格
                    <span
                      v-show="sortType === 2"
                      class="iconfont"
                      :class="iconName"
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="'/detail/'+good.id" 
                      ><img :src="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>￥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link
                      :to="'/detail/'+good.id" :title="good.title"  v-html="good.title" ></router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <Pagination
              :total="total"
              :pageSize="searchParams.pageSize"
              :pageNo="searchParams.pageNo"
              :continues="5"
              :changePageNo="savePageNO"
            />
          </div>
        </div>
        <!-- 数据为空的展示 -->
        <div class="empty" v-if="!total">
          <img src="" alt="empty" />
          <h1>抱歉啦，搜索结果为空耶</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapState } from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector,
    // Pagination,
    //  mounted() {
    //   //先测试数据接口返回的数据
    //   this.$store.dispatch("getsearchInfo", {});
    // },
    //数据监听：监听组件实例上的属性的属性值的变化
  },
  data() {
    return {
      searchParams: {
        category1Id: "", //一级分类id（可选参数）
        category2Id: "", //二级分类id（可选参数）
        category3Id: "", //三级分类id（可选参数）
        categoruName: " ", //分类名（可选参数）
        keyword: "", //关键词（可选参数）
        props: [], //商品属性（可选参数）
        trademark: "", //品牌（可选参数）
        order: "1:desc", //排序方式（可选参数）
        pageNo: 1, //当前页码，看那页（必须选！！）
        pageSize: 10, //每页展示多少条（必须选！！！）
      },
    };
  },
  computed: {
    //mapGetters里面的写法，传递的是数组，因为getters里面不是组件模块
    ...mapState({
      goodsList:(state) => state.search.getsearchInfo.goodsList,
      // trademarkList: (state) => state.search.getsearchInfo.trademarkList,
      //  attrsList: (state) => state.search.getsearchInfo. attrsList,
      total: (state) => state.search.getsearchInfo.total,
    }),
    tmdShowName() {
      return this.searchParams.trademark.split(":")[1];
    },
    //当前排序类型（type）
    sortType() {
      return this.searchParams.order.split(":")[0] * 1;
    },
    //
    iconName() {
      return this.searchParams.order.split(":")[1] === "asc"
        ? "icon-up"
        : "icon-down";
    },
  },
  watch: {
    //监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route: {
      immediate: true,
      deep: true,
      async handler(value) {
        //   重置合并参数
        //  console.log('路由收到参数了',value.query)
        //Es6中合并对象
        Object.assign(
          this.searchParams,
          {
            category1Id: "", //重置一级分类id
            category2Id: "", //重置二级分类id
            category3Id: "", //重置三级分类id
            categoryName: "", //重置分类名称
            keyword: "", //重置搜索关键词
            pageNo: 1, //重置页码
          },
          value.query
        );
        //     携带着searchParams，去联系对应的服务员
        this.$store.dispatch("getsearchInfo", this.searchParams);
      },
    },
    searchParams: {
      deep: true,
      handler(value) {
        this.$store.dispatch("getsearchInfo", value);
      },
    },
  },
  methods: {
    //移除类别名称
    removeCategoryName() {
      const { keyword } = this.searchParams;
      this.$router.push({
        path: "/search",
        query: { keyword },
        //移除关键词
      });
    },
    //移除关键词
    removeKeyword() {
      //拿到所有的路由参数
      const { query } = this.$route;
      //利用JSON深克隆，深拷贝  vue中怎么删除路由参数
      //  const query2 = JSON.parse(JSON.stringify(query))
      //  delete query.keyword

      //路由跳转，但是就是不带着keyword玩
      this.$router.push({
        path: "/search",
        query: { ...query, keyword: undefined },
      });
      //触发总线的clear-keyword事件，告知Header清空关键词
      this.$bus.$emit("clear-keyword");
    },
    //用于获取子组件SearchSelector传递过来的品牌信息
    saveTrademark(trademark) {
      //将收到的品牌信息，放入SearchParams
      this.searchParams.trademark = trademark.tmId + ":" + trademark.tmName;
      //发送请求获取信息
      // this.$store.dispatch("getsearchInfo", this.searchParams);
      this.searchParams.pageNo = 1;
    },
    //移除品牌名
    removeTrademark() {
      //把searchParams中的trademark置为空
      this.searchParams.trademark = "";
      // 再次发送请求
      // this.$store.dispatch("getsearchInfo", this.searchParams);
      this.searchParams.pageNo = 1;
    },
    //用于获取子组件SearchSelector传递过来的属性信息
    saveAttr(attrs, attrValue) {
      //拼接一个合法的参数
      const str = attrs.attrId + ":" + attrValue + ":" + attrs.attrName;
      //判断属性是否重复
      const result = this.searchParams.props.includes(str);
      //将收到的属性信息，放入到searchParams中
      if (!result) {
        this.searchParams.props.push(str);
        this.searchParams.pageNo = 1;
        //发请求
        // this.$store.dispatch("getsearchInfo", this.searchParams);
      } else {
      }
    },
    //专门用于格式化属性的方法
    attrShowName(p) {
      return p.split(":")[2] + ":" + p.split(":")[1];
    },
    //移除面包屑的属性
    removeAttr(index) {
      //根据索引值移除对应属性
      this.searchParams.props.splice(index, 1);
      this.searchParams.pageNo = 1;
      // this.$store.dispatch("getsearchInfo", this.searchParams);
    },
    //用于接受分页器传过来的页码(pageNo)
    savePageNO(n) {
      this.searchParams.pageNo = n;
      // console.log('我是search组件',n)
    },
   changeOrder(type){
    //获取原来的排序信息
    const [currentType,currentFlag] = this.searchParams.order.split(':')
  //判断用户点击的是否为新的排序分类
  if(currentType == type){
    //排序标识（flag）取反
  const flag = (currentFlag === 'asc')?'desc':'asc' 
  //维护参数
  this.searchParams.order = type + ':' +flag
 
  }else{
     this.searchParams.order = type + ':' +':desc'
    
  }
   this.searchParams.pageNo = 1;

       }
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>