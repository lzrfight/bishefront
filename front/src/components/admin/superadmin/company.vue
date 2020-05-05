<template>
  <div>
    <el-card>
      <ve-pie :data="pieData" ></ve-pie>
    </el-card>
    <el-card>
      <ve-line :data="chartData"></ve-line>
    </el-card>
  </div>
</template>

<script>
    export default {
      name: "company", data() {
        return {
          chartData: {
            columns: ['ordertime', 'offlineorder', 'onlineorder'],
            rows: []
          },
          pieData:{
            columns: ['name', 'number'],
            rows: []
          },
          Datashow:[],
          Datashow1:[]
        }

      },
      mounted() {
        this.statics()
        this.pie()
      },
      methods:
        {
          statics() {
            {
              const _this = this
              this.$axios.get('/orderchart').then(resp => {
                if (resp && resp.status === 200) {
                    _this.Datashow = resp.data
                    for (let i = 0;i<this.Datashow.length;i++)
                    {
                      this.chartData.rows.push(
                        {
                          "ordertime": this.Datashow[i].ordertime,
                          "offlineorder":this.Datashow[i].offlineorder,
                          "onlineorder": this.Datashow[i].onlineorder
                        }
                      )
                    }
                  // this.DataShow = res.data;
                  // //通过遍历DataShow分别给columns 中的维度和指标 赋值；
                  // for (var i = 0; i < this.DataShow.length; i++) {
                  //   this.chartData.rows.push({
                  //     //注意，由于我后端createTime该字段直接返回是一个时间戳，所以此处用到了 一个时间转换插件moment.js
                  //     "dayTime": moment(this.DataShow[i].createTime).format('YYYY-MM-DD HH:mm:ss'),
                  //     "每日调用总数趋势图": this.DataShow[i].numberCalls,
                  //
                }
              })
            }
          },
          pie()
          {
            const _this = this
            this.$axios.get('/orderpie').then(resp => {
              if (resp && resp.status === 200) {
                console.log(resp.data)
                _this.pieData.rows = resp.data
              }
            })
          }
        }
    }
</script>

<style scoped>

</style>
