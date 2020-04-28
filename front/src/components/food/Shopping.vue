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
    label="食品"
    width="300">

  </el-table-column>
  <el-table-column
    prop= "amount"
    label="数量"
    width="300">
  </el-table-column>
  <el-table-column
    prop= "money"
    label="金额"
    width="300">
  </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="120">

        <template slot-scope="scope">

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
          tableData:[]
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
                sums[index] = 'N/A';
              }
            });

            return sums;
          }
        }
    }
</script>

<style scoped>

</style>
