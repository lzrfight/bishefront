<template>
  <div>
    <el-dialog title="订单详情" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="foodname" label="菜品" ></el-table-column>
        <el-table-column property="amount" label="数量" ></el-table-column>
      </el-table>
    </el-dialog>

    <h1>本店订单</h1>
    <el-table
      :data="tableData"
      style="width: 100%">
<!--      :summary-method="getSummaries"-->
<!--      show-summary-->
      <el-table-column
        prop="id"
        label="订单 ID">

      </el-table-column>
      <el-table-column
        prop= "username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop= "time"
        label="预约时间">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作">

        <template slot-scope="scope">

          <el-button
            @click.native.prevent="orderdetail(scope.row.id)"
            type="text"
            size="small">
            查看订单详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
    export default {
        name: "shoporder",
      data() {
        return {
          tableData: [],
          orderid:'',
          dialogTableVisible: false,
          gridData:[],
          value2:'',
        }
      },
      mounted() {
          this.loadorder()
      },
      methods:
        {
          loadorder()
          {
            const _this = this;
            this.$axios.post('/shoporder').then(resp =>
            {
              if (resp && resp.status === 200)
              {
                _this.tableData = resp.data
              }

            })
          },
          orderdetail(id) {
            console.log(id)
            const _this = this
            this.dialogTableVisible = true
            this.$axios.post('/orderdetail',
              {
                id:id
              }).then(resp =>
            {
              if (resp && resp.status ===200)
              {
                _this.gridData = resp.data
              }
            })
          }
        }
    }
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
