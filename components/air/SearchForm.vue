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
                @select="handleDepartSelect"
                :highlight-first-item ="true"
                :trigger-on-focus="false"     
                :fetch-suggestions="getCityList"
                ></el-autocomplete>
            </el-form-item>
            <!-- 优化 :自动高亮第一个选项
                输入后再激活输入建议 -->

            <el-form-item label="到达城市">
                <el-autocomplete
                placeholder="请搜索到达城市"
                class="el-autocomplete"
                v-model="form.destCity"
                @select="handleDestSelect"
                :highlight-first-item ="true"
                :trigger-on-focus="false"
                :fetch-suggestions="getCityList"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="出发时间">
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate"
                v-model="form.departDate">
                </el-date-picker>
            </el-form-item>
                      
            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>

            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>

        </el-form>  
      </div>
</template>

<script>
import moment from "moment";
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
              departCode:'',
              destCity:'',
              destCode:'',
              departDate:''
            }
        }
    },
    methods: {
        // 触发 Tab栏 切换
        handleSearchTab(item, index){
          if (index === 1) {
            this.$confirm('目前暂不支持往返,请使用单程选票！','提示',{
              confirmButtonText:'确定',
              showCancelButton: false,
              type:'warning'
            })            
          }
            
        },
        // 提交表单触发
        handleSubmit(){
          console.log(this.form);         
        },
        // 封装获取建议列表
        getCityList(searchValue,showList){
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
            let cityList = data.map(city=>{
              return {
                ...city,
                // value:city.name.replace('市','')
                value: city.name.replace(/市$/,'')
              }
            })
            // 过滤掉没有 sort 数据的城市
            cityList = cityList.filter(city=>{
              // if (city.sort) {
              //   return true
              // } else {
              //   return false
              // }
              return city.sort
            })
            showList(cityList)
          })

        },

        // 出发城市 点击选中建议项时触发
        handleDepartSelect(item){
          console.log(item);
          this.form.departCode = item.sort
        },
        handleDestSelect(item){
          this.form.destCode = item.sort
        },
        // 用户确认选定日期时触发
        handleDate(dataSelected){
          console.log(dataSelected);
          this.form.departDate = moment(dataSelected).format("YYYY-MM-DD");
        },
        // 目标城市切换时触发
        handleReverse(){
          const { departCity, departCode, destCity, destCode} = this.form

          this.form.departCity = destCity;
          this.form.departCode = destCode;
          this.form.destCity = departCity;
          this.form.destCode = departCode;          

        }


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