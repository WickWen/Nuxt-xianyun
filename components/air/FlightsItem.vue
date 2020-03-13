<template>
  <div class="flight-item">
        <div>
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info">
                <el-col :span="6">
                    <span>{{flights.airline_name}} </span> {{flights.flight_no}}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <el-col :span="8" class="flight-airport">
                            <strong>{{flights.dep_time}}</strong>
                            <span>{{flights.org_airport_name}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                            <span>{{duration}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <strong>{{flights.arr_time}}</strong>
                            <span>{{flights.dst_airport_name}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{flights.base_price}}</span>起
                </el-col>
            </el-row>
        </div>

            <!-- 隐藏的座位信息列表 -->
        <div class="flight-recommend">
            <el-row type="flex"  justify="space-between" align="middle">
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                    <el-row 
                        type="flex" 
                        justify="space-between" 
                        align="middle" 
                        class="flight-sell"
                        v-for="(item, index) of flights.seat_infos"
                        :key="index">

                        <el-col :span="16" class="flight-sell-left">
                            <span>{{item.group_name}}</span> | {{item.supplierName}}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{item.settle_price}}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <el-button 
                            type="danger" 
                            size="mini">
                            选定
                            </el-button>
                            <p>剩余：{{item.discount}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    props:['flights'],
    computed: {
        duration(){
            const dep = this.flights.dep_time.split(':');
            const arr = this.flights.arr_time.split(':');
            // 时间转化为分钟
            const depVal = dep[0] * 60 + +dep[1];
            const arrVal = arr[0] * 60 + +arr[1];

            let dis = arrVal - depVal;

            if (dis<0) {
                dis = (arrVal+24*60) - depVal
                // 如果跨过凌晨时间段，需要加24小时
            }
            // 向下取整     
            return Math.floor(dis/60) + '小时' + dis % 60 + '分钟';
        }
    },
}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>