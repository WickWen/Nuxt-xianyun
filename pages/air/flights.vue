<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    过滤条件
                </div>
                
                <!-- 航班头部布局 -->
                <div>
                    <FlightsHeader></FlightsHeader>
                </div>
                
                
                <!-- 航班信息 -->
                <div>
                    <FlightsItem
                      v-for="(item, index) of datalist"
                      :key="index"
                      :flights="item"
                    ></FlightsItem>
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                侧边栏
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsHeader from '@/components/air/FlightsHeader'
import FlightsItem from '@/components/air/FlightsItem'
export default {
  data() {
    return {
      flightsData:{},  //航班总数据
      datalist:[]    // 机票列表数据
    }
  },
  components:{
    FlightsHeader,
    FlightsItem
  },

  mounted() {
    this.getFlightsData();
  },
  methods: {
    getFlightsData() {
      // 能够获取到 url 上面带过来的参数
      console.log(this.$route.query);
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res.data);
        this.flightsData = res.data
        this.datalist = this.flightsData.flights
      });

    }
  }
};
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>