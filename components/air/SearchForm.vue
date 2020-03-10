<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px">
            <el-form-item label="出发城市">
                <el-autocomplete
                placeholder="请搜索出发城市"
                class="el-autocomplete"
                v-model="form.departCity"
                :fetch-suggestions="queryDepartSearch"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="到达城市">
                <el-autocomplete
                placeholder="请搜索到达城市"
                class="el-autocomplete"
                v-model="form.destCity"
                :fetch-suggestions="queryDestSearch"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="出发时间">
                <el-autocomplete
                placeholder="请输入出发时间" 
                style="width: 100%;"
                v-model="form.departDate">
                </el-autocomplete>
            </el-form-item>
                      
            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>

        </el-form>  
      </div>
</template>

<script>
export default {
    data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,
            form:{
              departCity:'',
              destCity:'',
              departDate:''
            }
        }
    },
    methods: {
        // 触发 Tab栏 切换
        handleSearchTab(item, index){
            
        },
        // 提交表单触发
        handleSubmit(){
          console.log(this.form);         
        },
        // 激活即列出输入建议
        queryDepartSearch(searchValue,showList){
          if (!searchValue) {
            return;
          }
          this.$axios({
            url:'/airs/city',
            method:'get',
            params:{
              name:searchValue
            }
          }).then(res=>{
            const {data} = res.data;
            const cityList = data.map(city=>{
              return {
                ...city,
                value:city.name
              }
            })
            showList(cityList)
          })

        },
        queryDestSearch(searchValue,showList){
          if (!searchValue) {
            return;
          }
          this.$axios({
            url:'/airs/city',
            method:'get',
            params:{
              name:searchValue
            }
          }).then(res=>{
            console.log(res.data);
            const {data} = res.data;
            // data解构出来是城市对象 , 只需要拿到对象中 name属性显示城市名即可
            // 使用map方法遍历出含有name属性的新数组
            const cityList = data.map(city=>{
              return {
                ...city,   /* 展开运算符 city ES6 */
                value:city.name   /* 修改组件要求数据格式 */
              }
            })
            showList(cityList)
          })

        },


    }

}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>