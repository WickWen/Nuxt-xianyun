<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info">
                <div class="member-info-item" v-for="(user, index) of users" :key="index">

                    <el-form-item label="乘机人类型">
                        <el-input placeholder="姓名" class="input-with-select" v-model="user.username">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input 
                        placeholder="证件号码"  class="input-with-select" v-model="user.id">
                            <el-select 
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <el-checkbox-group v-model="insurances">
                <div class="insurance-item" 
                v-for="(item, index) of infoData.insurances" 
                :key="index">
                    <el-checkbox 
                    :label="item.id" 
                    border>
                        {{`${item.type}: ￥${item.price}/份x1 最高赔付${item.compensation}元`}}
                    </el-checkbox> 
                </div>
                </el-checkbox-group>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容" v-model="contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['infoData'],
    data() {
        return {
            users:[
                // 每个item遍历出一个user对象
                {
                    username:'',
                    id:''
                }
            ],
            insurances:[],
            contactPhone:'',
            contactName:'',
            captcha:''

        }
    },
    methods: {
        // 添加乘机人
        handleAddUsers(){
            this.users.push({
                    username:'',
                    id:''
                })
        },
        // 移除乘机人
        handleDeleteUser(index){
            this.users.splice(index, 1);  //第一个参数是删除用户对象在数组的下标,第二个参数是删除数组中的长度(个数)
        },
        // 发送手机验证码
        handleSendCaptcha(){
            if (!this.contactPhone) {
                this.$message.error('请输入正确的手机号码');
                return            
            }
            this.$axios({
                url:'captchas',
                method:'post',
                data:{
                    tel:this.contactPhone
                }
            }).then(res=>{
                console.log(res.data);
                if (res.data.code) {
                    this.$message({
                        message:'手机验证码为:' + res.data.code,
                        type:'success'
                    });                
                }
                
            })
        },
        // 提交订单
        handleSubmit(){
            const data ={
                users:this.users,
                insurances:this.insurances,
                contactName:this.contactName,
                contactPhone:this.contactPhone,
                invoice:false,
                seat_xid:this.$route.query.seat_xid,
                air:this.$route.query.id,
                captcha:this.captcha               
            }
            console.log(data);

            this.$message({
                message: "正在生成订单！请稍等",
                type: "success"
            })

            this.$axios({
                url:'/airorders',
                method:'post',
                data,
                headers:{
                    Authorization:'Bearer ' + this.$store.state.user.userInfo.token
                    // 无论何时用户想要访问受保护的路由或者资源的时候，浏览器都应该带上JWT，通常放在Authorization header中，用Bearer
                }
            }).then(res=>{
                console.log(res.data);
                
            })    
        }


    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
                // 设定第一个乘机人不显示 - 号
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>