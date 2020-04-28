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
        :summary-method="getSummaries"
        show-summary>
        <el-table-column
          prop="name"
          label="食品">

        </el-table-column>/0
        <el-table-column
          prop= "amount"
          label="数量">
        </el-table-column>
        <el-table-column
          prop= "money"
          label="金额">
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration">选择预约时间</span>
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <el-select v-model="value2"placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <el-button style="margin-top: 12px;" @click="submit">提交</el-button>
    </div>

</template>

<script>
    export default {
      name: "order",
      data() {
        return {
          options: [],
          active: 0,
          tableData: [],
          value1: '',
          value2: ''
        };

      },
      mounted: function () {
        this.loadShopping()
        this.selectshop()
      },
      methods: {
        next() {
          if (this.active++ > 2) this.active = 0;
        },
        loadShopping() {
          const _this = this
          this.$axios.post('/shopping').then(resp => {
            if (resp && resp.status === 200) {
              _this.tableData = resp.data
            }
          })
        },
        //submit方法可以提交订单，这里订单和订单详情还没有完善
        submit() {
          const _this = this
          this.$axios.post('/userorder',
            {
              shopname: this.value2,
              time: this.value1,
            }).then(resp => {
            if (resp && resp.data.code === 200) {
              this.$axios.get('/clearshopping')
                .then(resp => {
                  if (resp && resp.status === 200) {
                  }
                })
              this.$alert('提交成功', '提示', {
                confirmButtonText: '确定',
              })
            }else{
              this.$alert(resp.data.message,'提示',
                {
                  confirmButtonText:'确定'
                })
            }
          })
        },
        selectshop() {
          const _this = this
          this.$axios.get('/findshop').then(resp => {
            if (resp && resp.status === 200) {
              _this.options = resp.data;
            }
          })
        },
        getSummaries(param) {
          const {columns, data} = param;
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
