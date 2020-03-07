<template>
  <el-form :model="form" ref="form" status-icon :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    const checkPassword = (rule, value, callback) => {
        if (!value) {
            const err = new Error('请再次输入密码')
            callback(err)
        } else if (value != this.form.password) {
            const err = new Error('两次输入密码必须相同')
            callback(err)
        }
        callback();  
    }
    return {
      form: {
        username: "",  /* tel */
        nickname: "",
        password: "",
        captcha: "",
        checkPassword: ""
      },
      rules: {
        username: {
          required: true,
          message: "请输入用户名",
          trigger: "blur"
        },
        nickname: {
          required: true,
          message: "请输入名字",
          trigger: "blur"
        },
        password: {
          required: true,
          message: "请输入密码",
          trigger: "blur"
        },
        captcha: {
          required: true,
          message: "请输入验证码",
          trigger: "blur"
        },
        checkPassword: {
          trigger: "blur",
        //   自定义校验函数
          validator: checkPassword
        }
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
        if (!this.form.username) {
            this.$message({
                showClose: true,
                message: '手机号码不能为空',
                type: 'error'
            });
            return;
        }

        if(this.form.username.length !== 11){
            this.$confirm('手机号码格式错误', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'warning'
            })
            return;
        }

        this.$axios({
            url:'/captchas',
            method:'post',
            data:{
                tel:this.form.username
            }
        }).then(res => {
            console.log(res.data);
            if (res.data.code) {
                this.$message({
                  message: '获取验证码成功 : 000000',
                  type: 'success'
                });                
                
            }       
        })
    },

    // 注册
    handleRegSubmit() {
        // 扩展运算符, 剩余参数写法 ES6
        const { checkPassword, ...props} = this.form;
        this.$axios({
            url:'/accounts/register',
            method:'post',
            data: props
            // data:{
            //     username:this.form.username,
            //     nickname:this.form.nickname,
            //     captcha:this.form.captcha,
            //     password:this.form.password
            // }
        }).then(res =>{
            console.log(res.data);  
            if (res.data.token) {
                this.$store.commit('user/setUserInfo',res.data)
                
                this.$message({
                    message:'注册成功',
                    type:'success'
                });
                
                setTimeout(() => {
                    this.$router.push('/user/login?current=0')
                }, 888);

                
            }       
        })

    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>