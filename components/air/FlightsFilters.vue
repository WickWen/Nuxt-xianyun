<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{flightsData.info.departCity}} - {{flightsData.info.destCity}} 
                / 
                {{flightsData.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option
                    v-for="(item, index) of flightsData.options.airport"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option
                    v-for="(item, index) of flightsData.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    v-for="(item, index) of flightsData.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                    <!-- <el-option
                    label="厦门航空"
                    value="厦门航空">
                    </el-option> -->
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                    v-for="(item ,index) of sizeOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       >
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props:[
        // 1.航班列表总数据
        'flightsData'
    ],
    data(){
        return {
            sizeOptions: [
                {name: "大", size: "L"},
                {name: "中", size: "M"},
                {name: "小", size: "S"},
            ],
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小
        }
    },
    methods: {
        // 航空公司
        handleCompany(){
            // 2.使用数组 filter 方法过滤选项数据
            const newFlightsList = this.flightsData.flights.filter(flight=>{
                // if (flights.airline_name == this.company) {
                //     return true   
                // }else{
                //     return false
                // }
                return flight.airline_name == this.company
            })
            // 3.子组件将过滤后的数据传递回父组件
            this.$emit('setFlightsList',newFlightsList)

        },
        // 出发机场
        handleAirport(){
            const newFlightsList = this.flightsData.flights.filter(flight=>{
                return flight.org_airport_name == this.airport
            })
            this.$emit('setFlightsList',newFlightsList)
        },
        // 起飞时间
        handleFlightTimes(){
            const [from, to] = this.flightTimes.split(',')
            // 结构出from == 6,to == 12
            const newFlightsList = this.flightsData.flights.filter(flight=>{
                const start =flight.dep_time.split(':')[0]
                return start >= from && start < to;
            })
            this.$emit('setFlightsList',newFlightsList)

        },
        // 机型
        handleAirSize(){
            const newFlightsList = this.flightsData.flights.filter(flight=>{
                return flight.plane_size == this.airSize
            })
            this.$emit('setFlightsList',newFlightsList)
        }

    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>

