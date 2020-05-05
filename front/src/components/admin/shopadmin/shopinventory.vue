<template>
  <div>
    库存
    库存预警:红色表示即将用尽，黄色表示需要注意
    <el-card>
      <el-dialog title="库存" :visible.sync="dialogTableVisible" @close="clear">
        <el-form>
        <el-form-item label="上架数量"label-width="auto">
          <el-input v-model="number"></el-input>
        </el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form>
      </el-dialog>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="id">
    </el-table-column>
    <el-table-column
      prop="foodname"
      label="材料">
    </el-table-column>
    <el-table-column
      prop="amount"
      label="数量">
      <template slot-scope="scope">
        <span v-if="scope.row.amount<10" style="color:#F56C6C">{{scope.row.amount}}</span>
        <span v-if="scope.row.amount>=10 && scope.row.amount<50" style="color: #E6A23C">{{scope.row.amount}}</span>
        <span v-if="scope.row.amount>=50" style="color: black">{{scope.row.amount}}</span>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">

      <template slot-scope="scope">

        <el-button
          @click.native.prevent="upfood(scope.row.id)"
          type="text"
          size="small">
          上货
        </el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "shopinventory",
      data() {
        return {
          tableData: [],
          dialogTableVisible:false,
          number:'',
          foodid:'',
        }
      },
      mounted() {
        this.findinventory()
      },
      methods: {
        findinventory()
        {
            const _this = this;
            this.$axios.get('/inventory').then(resp =>
            {
              if (resp && resp.status === 200)
              {
                _this.tableData = resp.data
              }

            })
        },
        upfood(id)
        {
          this.dialogTableVisible = true
          this.foodid = id
        },
        onSubmit()
        {
          this.$axios.post('/upfood',
          {
            id: this.foodid,
            amount: this.number
          }).then(resp =>
          {
            if (resp && resp.status === 200)
            {
              this.$alert('上货成功', '提示', {
                confirmButtonText: '确定'
              })
              this.findinventory()
              this.dialogTableVisible = false
            }
          })
        },
        clear()
        {
          this.number = '';
          this.foodid = ''
        }

      },

    }
</script>

<style>
/*  .el-table .warning-row {*/
/*    background: oldlace;*/
/*  }*/
/*.el-table .dangerous-row*/
/*{*/
/*  background-color: #ED6449;*/
/*}*/
/*  .el-table .success-row {*/
/*    background: #f0f9eb;*/
/*  }*/
</style>
