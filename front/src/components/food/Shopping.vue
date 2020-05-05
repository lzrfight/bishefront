<template>
  <div>
    <h1>购物车</h1>
    <el-table
      :data="tableData"
      style="width: 100%"
      :summary-method="getSummaries"
      show-summary
      >
  <el-table-column
    prop="name"
    label="食品">
  </el-table-column>
  <el-table-column
    prop= "amount"
    label="数量">
<!--    <template slot-scope="scope">-->
<!--      <el-input-number :value="scope.row.amount"-->
<!--                       controls-position="right"-->
<!--                       size="small"-->
<!--                       @change="handleChangeLevels(scope.row,$event)"-->
<!--                       :min="0" :max="1000">-->
<!--      </el-input-number>-->
<!--    </template>-->
  </el-table-column>
  <el-table-column
    prop= "money"
    label="金额">
  </el-table-column>

      <el-table-column
        fixed="right"
        label="操作">

        <template slot-scope="scope">

<!--          <el-button-->
<!--            @click.native.prevent="delete1(scope.row.name)"-->
<!--            type="text"-->
<!--            size="small">-->
<!--           修改数量-->
<!--          </el-button>-->
          <el-button
            @click.native.prevent="delete1(scope.row.name)"
            type="text"
            size="small">
            删除
          </el-button>
        </template>


      </el-table-column>
    </el-table>
  </div>
</template>


<script>
    export default {
      name: "Shopping",
      data() {
        return {
          tableData:[],
          num4:''
        }
      },
      mounted: function () {
        this.loadShopping()
      },
      methods:
        {
          loadShopping()
          {
            const _this = this
            this.$axios.post('/shopping').then(resp =>
            {
              if (resp && resp.status === 200)
              {
              _this.tableData = resp.data
              }

            })
          },
            delete1(name)
          {
              const _this = this
            this.$axios.post('/deletef',
              {
                name: name
              }).then(resp => {
              if (resp && resp.status === 200)
              {
                console.log(name)
                this.loadShopping()
              }
            })

          },
          getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
              if (index === 0) {
                sums[index] = '合计';
                return;
              }
              const values = data.map(item => Number(item[column.property]));
              if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index] += ' ';
              } else {
                sums[index] = '';
              }
            });

            return sums;
          },
          // handleChangeLevels (row, val) {
          //   console.log(row)
          //   console.log(val)
          //   this.tableData.map(v => {
          //     console.log(v.id)
          //     if (row.id === v.id) {
          //       this.$set(v, 'amount', val)//通过$set设置数据集合里面的参数进行渲染
          //     }
          //   })
          // },
        }
    }
</script>

<style scoped>

</style>
