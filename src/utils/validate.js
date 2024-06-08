import Vue from 'vue'
import VeeValidate ,{Field, Validator} from 'vee-validate';
//引入语言包
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import { phoneReg,codeReg,pwdReg } from './reg';

Vue.use(VeeValidate);

Validator.localize('zh_CN',zh_CN)
//手机号的验证规则
Validator.extend('phone',{
    validate:value =>  phoneReg.test(value),
        //具体的验证规则，value是？？  用户的输入
    getMessage:field =>  '手机格式不合法'
});

//验证必要性的规则
Validator.extend('required',{
    validate:value =>  value,
        //具体的验证规则，value是？？  用户的输入
    getMessage:field =>  field +'必须输入'
});
Validator.extend('code',{
    validate:value => {
        codeReg.test(value)
    },
    getMessage:field =>'验证码必须为6位数字'
    }, 
);

Validator.extend('pwd',{
    validate:value => {
        pwdReg.test(value)
    },
    getMessage:field =>'密码为6到21位英文、数字、下划线'
    }, 
);

Validator.extend('ispwd',{
   
    getMessage:field =>
        '重复密码必须和登录密码一致',//验证失败
    validate:(value,args) => 
        value === args[0],
      
    
});

Validator.extend('isagree',{
    validate:value => value,
    getMessage:field =>'协议必须同意'
  
   
});

