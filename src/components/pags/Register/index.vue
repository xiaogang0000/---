<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input v-validate="'required|phone'"  name="手机" type="text" placeholder="请输入你的手机号" v-model="phone" />
        <span class="error-msg">{{errors.first('手机')}}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input  v-validate="'required|code'"  name="验证码" type="text" placeholder="请输入验证码" v-model="code" />
        <button class="getcode" @click="handleGetCode">获取验证码</button>
        <span class="error-msg">{{errors.first('验证码')}}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
        v-validate="'required|pwd'" 
        name="密码"
          type="text"
          placeholder="请输入你的登录密码"
          v-model="password"
        />
        <span class="error-msg">{{errors.first('密码')}}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input  v-validate="'required|ispwd'" name="密码"  type="text" placeholder="请输入确认密码" v-model="re_password" />
        <span class="error-msg">{{errors.first('密码')}}</span>
      </div>
      <div class="controls">
        <input v-validate="'required|isagree'"  name="协议" type="checkbox" v-model="agree" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{errors.first('协议')}}</span>
      </div>
      <div class="btn">
        <button @click="handleRegister" >完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：安徽省蚌埠市龙子湖区高铁桃园新村</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { reqGetCode,reqRegister } from "@/api";
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      password: "",
      code: "",
      re_password: "",
      agree: "flase",
    };
  },
  methods: {
    async handleGetCode() {
      const result = await reqGetCode(this.phone);
      if (result.code === 200) {
        this.$message.success('验证码下发成功，请注意查收');
        console.log(result)
        this.code = result.data
      } else {
        this.$message.warning('手机号输入有误')
        console.log(result)
      }
    },
  async   handleRegister(){
    //获取手机号验证码，密码，验证码
//     const { phone,password,code} = this
//     //发请求注册
//  const result = await reqRegister({phone,password,code});
 let validateResult = await this.$validator.validateAll()
      // if (result.code === 200) {
      //   this.$message.success('注册成功');
      //   this.$router.push('/login')
      //   console.log(result)
      //   this.code = result.data
      // } else {
      //   this.$message.warning('注册失败')
      //   console.log(result)
      // }
    }
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>