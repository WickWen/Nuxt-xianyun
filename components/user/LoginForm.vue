<template>
    <el-form 
        :model="form" 
        ref="form"
        :rules="rules" 
        class="form">
        <!-- :model  绑定数据模型  :rules 校验规则 -->
        <!-- ref 被用来给元素或子组件注册引用信息。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素 -->

        <el-form-item class="form-item" prop='username'>
         <!-- prop需校验的字段名 -->
            <el-input 
            placeholder="用户名/手机"
            v-model="form.username">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop='password'>
            <el-input 
            placeholder="密码" 
            type="password"
            v-model="form.password">
            </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button 
        class="submit"
        type="primary"
        @click="handleLoginSubmit">
            登录
        </el-button>
    </el-form>

</template>

<script>
export default {
    data(){
        return {
            // 表单数据
            form: {
                username:'',
                password:''
            },
            // 表单规则
            rules: {
                username:[
                    {required: true,
                    message:'请输入正确的用户名/手机',
                    trigger:'blur'}
                    // required 是否必填输入框数据 如不设置，则会根据校验规则自动生成
                    // trigger 触发方式  blur  使input失去焦点
                ],
                password:[
                    {required: true,
                    message:'请输入正确的密码',
                    trigger:'blur'}
                ]
            },
        }
    },
    methods: {
        // 提交登录
        handleLoginSubmit(){
            // 发送前保底验证一次,使用饿了么封装的方法
            // this.$refs.form.validate((isValid, invalidField)=>{
            // 1.回调的用法 第一个参数 是否校验成功的布尔值 第二个参数 是未通过校验的字段名 
            //     if (isValid) {
            //        console.log(this.form)
            //     }
            // });

            // 2.promise 用法, 若不传入回调函数，则会返回一个 promise
            this.$refs.form.validate().then(res=>{
                if (res) {
                    console.log(this.form)
                }
            }).catch(err=>{
                console.log('校验失败');
                console.log(err);
            })

        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>
