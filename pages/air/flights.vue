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
                    <FlightsItem></FlightsItem>
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
  components:{
    FlightsHeader,
    FlightsItem
  },

  mounted() {
    this.getFlightsList();
  },
  methods: {
    getFlightsList() {
      // 能够获取到 url 上面带过来的参数
      console.log(this.$route.query);
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res.data);
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