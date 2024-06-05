<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（￥）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（￥）</div>
        <div class="cart-th6">操作</div>
      </div>

      <div class="cart-body" v-show="cartInfoList.length">
        <ul
          class="cart-list"
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @click="hangdleCheckOne(cartInfo)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handleChangeSkuNum('decrement',cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              :value="cartInfo.skuNum"
              class="itxt"
              @change="handleChangeSkuNum('input', cartInfo, $event)"
            />
            <a class="plus" @click="handleChangeSkuNum('increment', cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.cartPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="#none"
              class="sindelet"
              @click="handleDeleteOne(cartInfo.skuId)"
              >删除</a
            >
            <br />
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool" v-show="cartInfoList.length">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAll"
          @click="hangdleCheckAll"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="handleDeleteCheck">删除选中的商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ total }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn"  target="_blank" to="/trade">结算</router-link>
        </div>
      </div>
    </div>

    <div class="empty" v-show="!cartInfoList.length">
      <h1>购物车空空如也!</h1>
      <img src="" alt="" />
    </div>
  </div>
</template>

<script>
import {
  reqCartList,
  reqCheckOneCart,
  reqBatchCheckCart,
  reqDeleteOneCart,
  reqBatchDeleteCart,
  reqAddGoods2Cart,
} from "@/api";
import { goodsNumReg } from "@/utils/reg";
import _ from 'lodash'
export default {
  name: "Cart",
  data() {
    return {
      cartInfoList: [],
    };
  },
  computed: {
    //标识是否全选
    isAll() {
      return this.cartInfoList.every((cartIn) => cartIn.isChecked === 1);
    },
    //意勾选商品的总数
    total() {
      let n = 0;
      this.cartInfoList.forEach((cartInfo) => {
        if (cartInfo.isChecked) {
          n += cartInfo.skuNum;
        }
      });
      return n;
    },
    totalPrice() {
      let n = 0;
      this.cartInfoList.forEach((cartInfo) => {
        if (cartInfo.isChecked) {
          n += cartInfo.skuNum * cartInfo.skuPrice;
        }
      });
      return n;
    },
  },
  methods: {
    async getCartList() {
      const result = await reqCartList();
      if (result.code === 200) {
        if (result.data.length) {
          this.cartInfoList = result.data[0].cartInfoList;
        }
      } else {
        alert(result.message);
      }
    },
    async hangdleCheckOne(cartInfo) {
      const { skuId, isChecked } = cartInfo;
      const newChecked = isChecked === 1 ? 0 : 1;
      const result = await reqCheckOneCart(skuId, isChecked);
      // console.log(result)
      if (result.code === 200) {
        //判断业务逻辑是否成功
        cartInfo.isChecked = newChecked;
      } else {
        alert(result.message);
      }
      // const x =this.cartInfoList.find((cartInfo)=>{
      //   return cartInfo.id === id
      // })
      // cartInfo.isChecked = (cartInfo.isChecked === 1) ? 0 : 1
    },
    async hangdleCheckAll(e) {
      let { checked } = e.target;
      //全选值映射为1或0
      checked = checked ? 1 : 0;
      //获取购物车中所有商品skuId的数组
      const skuIdList = [];
      this.cartInfoList.forEach((cartInfo) => skuIdList.push(cartInfo.skuId));
      const result = await reqBatchCheckCart(skuIdList, checked);

      if (result.code === 200) {
        //维护本地数据
        this.cartInfoList.forEach((cartInfo) => (cartInfo.isChecked = checked));
      } else {
        alert(result.message);
      }
    },
    //删除单个商品的回调
    async handleDeleteOne(id) {
      if (confirm("真的要要要要删除嘛")) {
        const result = await reqDeleteOneCart(id);
        if (result.code === 200) {
          //filter写法
          // this.cartInfoList = this.cartInfoList.filter((cartInfo) => {
          //   return cartInfo.skuId !== id;})

          const index = this.cartInfoList.findIndex((cartInfo) => {
            return cartInfo.skuId === id;
          });
          this.cartInfoList.splice(index, 1);
        } else {
          alert(result.message);
        }
      }
    },
    async handleDeleteCheck() {
      //准备好一个数组，用于准备删除
      if (confirm("确认删除，是嘛")) {
        const idList = [];
        this.cartInfoList.forEach((cartInfo) => {
          if ((cartInfo.isChecked = 1)) {
            idList.push(cartInfo.skuId);
          }
        });
        const result = await reqBatchDeleteCart(idList);
        if (result.code === 200) {
          // this.cartInfoList = this.cartInfoList.filter((cartInfo)=> !idList.includes(cartInfo.skuId))
          this.cartInfoList = this.cartInfoList.filter(
            (cartInfo) => !cartInfo.isChecked
          );
        } else {
          alert(result.message);
        }
      }
    },
    //修改商品数量的回调
    handleChangeSkuNum : _.throttle(async function( type, cartInfo, e) {
      switch (type) {
        case "increment":
          if (cartInfo.skuNum === 200) {
            alert("最大购买数量为200");
          } else {
            const result =await reqAddGoods2Cart(cartInfo.skuId, 1);
            if (result.code === 200) {
              cartInfo.skuNum += 1;
              cartInfo.isChecked = 1;
            } else {
              alert(result.message);
            }
          }
          break;
        case "input":
          //获取当前操作商品的：skuId编号，skuNum数量
          const { skuId, skuNum } = cartInfo;
          //获取用户的输入
          const { value } = e.target;
          //若校验输入，计算差值
          if (goodsNumReg.test(value)) {
            const disNum = value - skuNum;
            //发请求
            const result = await reqAddGoods2Cart(skuId, disNum);
            if (result.code === 200) {
              //维护本地数据
              cartInfo.skuNum = value * 1;
              cartInfo.isChecked = 1;
            } else {
              //提示失败的原因
              alert(result.message);
              //重置DOM，维护数据
              e.target.value = skuNum;
            }
          } else if (value > 200) {
            const disNum = 200 - skuNum;
            const result = await reqAddGoods2Cart(skuId, disNum);
            if (result.code === 200) {
              //修改商品数量的最大值200
              cartInfo.skuNum = e.target.value = 200;
            } else {
              alert(result.message);
              //重置页面DOM，清除页面残留
              e.target.value = skuNum;
            }
          } else {
            cartInfo.skuNum = skuNum;
          }
          break;
        case "decrement":
          if (cartInfo.skuNum === 1) {
            alert("最小购买数量为1");
          } else {
            const result =await reqAddGoods2Cart(cartInfo.skuId, -1);
            if (result.code === 200) {
              cartInfo.skuNum -= 1;
              cartInfo.isChecked = 1;
            } else {
              alert(result.message);
            }
          }
          break;
      }
    },500,{trailing:false})
  },
  mounted() {
    this.getCartList();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
  .empty {
    text-align: center;
  }
  h1 {
    color: orange;
  }
}
</style>
   