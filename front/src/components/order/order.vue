<template>
    <div>
      <el-steps :active="active" finish-status="success">
        <el-step title="确认订单"></el-step>
        <el-step title="选择完成方式"></el-step>
        <el-step title="支付"></el-step>
      </el-steps>

      <el-table
        :data="tableData"
        style="width: 40%"
      >
        <el-table-column
          prop="name"
          label="食品"
          width="180">

        </el-table-column>
        <el-table-column
          prop= "amount"
          label="数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop= "money"
          label="金额"
          width="180">
        </el-table-column>
      </el-table>
      <el-button style="margin-top: 12px;" @click="submit">提交</el-button>
    </div>
</template>

<script>
    export default {
        name: "order",
      data(){
          return{
            active: 0,
            tableData:[]
          };

      },
      mounted: function () {
        this.loadShopping()
      },
      methods:{
          next(){
            if (this.active++ >2) this.active = 0;
          },
        loadShopping()
        {
          const _this = this
          this.$axios.get('/shopping').then(resp =>
          {
            if (resp && resp.status === 200)
            {
              _this.tableData = resp.data
            }
          })
        },
        //submit方法可以提交订单，这里订单和订单详情还没有完善
        submit()
        {
          const _this = this
          this.$axios.post('/userorder',{
            caole: "牛逼"
          }).then(resp =>
          {
              if(resp && resp.status === 200)
              {
                this.$alert('操你妈成了', '牛逼成功了', {
                  confirmButtonText: '确定',
                })
              }
          })
        }
      },
    }
</script>

<style scoped>

</style>
