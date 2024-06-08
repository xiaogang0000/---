<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              $route.query.order_id
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥17,654</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">微信</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
        </ol>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <a class="btn" to="/paysuccess" @click="handlePay">立即支付</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqPayInfo,reqPayStatus } from "@/api";
import QRCode from "qrcode";
export default {
  name: "Pay",
  data() {
    return {
      payInfo: {},
    };
  },
  methods: {
    async getPayInfo() {
      //获取路由传递过来的订单编号
      const { order_id } = this.$route.query;
      const result = await reqPayInfo(order_id);
      if (result.code === 200) {
        console.log(result);
        this.payInfo = result.data;
      } else {
        this.$message.warning(result.message);
      }
    },
    //立即支付函数的回调
    async handlePay() {
      //弹窗的具体配置
      try {
        const url = await QRCode.toDataURL(this.payInfo.codeUrl);
        const htmlStr = `<img src="${url}" style="width:200px" />`
        const options = {
          dangerouslyUseHTMLString: true,
          center: true,
          showClose: false,
          showCancelButton: true,
          cancelButtonText: "支付遇到问题",
          confirmButtonText: "已完成支付",
        }
        this.$alert(htmlStr,'微信扫码支付',{
          ...options,
          callback:async (type)=>{
            if(type === 'confirm'){
               clearInterval(this.timer)
               //再次向服务器发送请求，确认订单状态
                 const result = await reqPayStatus(this.payInfo.orderId)
                 if(result.code === 200){
                  this.$router.push('/paysuccess')
                 }else{
                  //
                  // this.$message.waring('您的订单并为支付成功，请重新支付！')
                 }
              console.log('你点了确定按钮')
            }else{
            clearInterval(this.timer)
            //给一个小提示
            this.$message.warning('支付遇到问题，致电客服解决')
            }
          }
        })
      //发起心跳请求
 this.timer =    setInterval(async()=> {
   const result = await reqPayStatus(this.payInfo.orderId)
if(result.code === 200){
  //关闭定时器
  clearInterval(this.timer)
  //关闭弹窗
this.$msgbox.close()
  //跳转到成功支付路由
this.$router.push('/paysuccess')
}
      },2000)
      } catch (error) {
        this.$message.warning('支付二维码获取失败，请联系管理员')
      }
    },
  },
  mounted() {
    this.getPayInfo();
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>