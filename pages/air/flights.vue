<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    <FlightsFilters 
                    v-if="flightsData.options" 
                    :flightsData='cacheData'
                    @setFlightsList='setFlightsList'
                    ></FlightsFilters>
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

                    <div class="tip" v-if="flightsData.flights && flightsData.flights.length == 0">
                      暂无航班数据
                    </div>

                    <el-pagination
                      v-if="flightsData.flights && flightsData.flights.length > 0" 
                      @current-change="handleCurrentChange"
                      @size-change="handleSizeChange"
                      background
                      layout="total, sizes, prev, pager, next, jumper"
                      :page-sizes="[5, 10, 20, 30]"
                      :page-size="pageSize"
                      :total="flightsData.flights.length">
                    </el-pagination>
                    <!-- 因为异步获取，可能导致已进入页面加载不出flightData.flights，加入v-if解决 -->
                    
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
import FlightsFilters from '@/components/air/FlightsFilters'
export default {
  data() {
    return {
      cacheData:{},     //缓存数据
      flightsData:{},  //航班总数据
      // datalist:[],    机票列表数据
      pageIndex: 1,
      pageSize: 10
    }
  },
  computed:{
    datalist(){
      // 不需要再调用函数,因为计算属性会监听数据变化自动 重新计算
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;

      if (this.flightsData.flights) {
        return this.flightsData.flights.slice(start,end)        
      } else {
        return [];
        // 预防异步数据没有获取完毕
      }
    }
  },

  components:{
    FlightsHeader,
    FlightsItem,
    FlightsFilters
  },

  mounted() {
    this.getFlightsData();
  },
  methods: {
    // 切换页数时触发
    handleCurrentChange(current){
      this.pageIndex = current;
    },
    // 切换页数时触发
    handleSizeChange(size){
      this.pageSize = size;
    },

    getFlightsData() {
      // 能够获取到 url 上面带过来的参数
      console.log(this.$route.query);
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res.data);
        this.flightsData = res.data
        // 深拷贝一个缓存数据
        this.cacheData = {
          ...this.flightsData
        }
      });

    },
    // 4.父组件监听渲染过滤好的数据
    setFlightsList(newFlightsList){
      this.flightsData.flights = newFlightsList;
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