<template>
  <div class="type-nav">
            <div class="container"  @mouseleave="excuteHidden" >
                <h2 class="all" @mouseenter="isShowSort=true" >全部商品分类</h2>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
               <transition 
               enter-active-class="animate__fadeIn"
               leave-active-class="animate__fadeOut"
               >
                 <div  class="sort animate__animated"  v-show="isShowSort">
                    <div class="all-sort-list2" @click="toSearch">
                        <!-- 一级分类 -->
                        <div class="item bo" v-for="c1 in categoryList" :key="c1.categoryId">
                            <h3>
                                <a data-level="1" :data-id="c1.categoryId">{{c1.categoryName}}</a>
                            </h3>
                            <div class="item-list clearfix" >
                                <!-- 二级分类 -->
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId" >
                                    <dl class="fore">
                                        <dt>
                                            <a data-level="2" :data-id="c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <!-- 三级分类 -->
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryChild">
                                                <a data-level="3" :data-id="c3.categoryId">{{c3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               </transition>
            </div>
        </div>

</template>

<script>
import { mapState } from 'vuex';
import 'animate.css';
export default {
   name:'TypeNav',
   data(){
        return {
            isShowSort:this.$route.path ==='/home' ? true : false
        }
    },
computed:{
    ...mapState({
       categoryList:state =>  state.home.categoryList 
    }), 
},
 methods:{
    //用于跳转到/search
        toSearch(e){
            // this.$router.push('/search')
      const {level,id} = e.target.dataset
      const {innerText} = e.target
      const {keyword} = this.$route.query
            if(level){
        this.$router.push({
            path:'/search',
            query:{
               keyword,
                [ `category${level}Id`]:id,
                     categoryName:innerText}
                         })
               }  
        },
        //鼠标移除导航区的回调
        excuteHidden(){
     if(this.$route.path !=='/home'){
         this.isShowSort = false
     }
        },
         
      } , 
         mounted(){
       this.$store.dispatch('getCategoryList')
}, 
 };
  
</script>

<style lang='less' scoped>
.type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;
                            &:hover{
                                background-color: #e1251b;
                                a{
                                    color:white
                                }
                            }

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                        a {
                                            &:hover{
                                            color: #e1251b !important;
                                         font-weight: 600;
                                                   }
                                          }
                                        }

                                    dd {
                                        float: left;
                                        width: 520px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                            a {
                                            &:hover{
                                            color: #e1251b !important;
                                         font-weight: 500;
                                                   }
                                          }
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
</style>