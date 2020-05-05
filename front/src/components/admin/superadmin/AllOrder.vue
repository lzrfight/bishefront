<template>
<div>
      <h1>订单</h1>
  <el-select v-model="value2" placeholder="请选择" @change="orderbyshop">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="订单id">
        </el-table-column>
        <el-table-column
          prop= "shopname"
          label="连锁店名">
        </el-table-column>
        <el-table-column
          prop= "username"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop= "time"
          label="预约时间">
        </el-table-column>

      </el-table>
<!--  <div class="block">-->
<!--    <span class="demonstration">大于 7 页时的效果</span>-->
<!--    <el-pagination-->
<!--      :page.sync="listQuery.page"-->
<!--      :limit.sync="listQuery.limit"-->
<!--      @pagination="loadOrder"-->
<!--      layout="prev, pager, next"-->
<!--      :total=total>-->
<!--    </el-pagination>-->
<!--  </div>-->
    </div>
</template>

<script>
    export default {
        name: "AllOrder",
      data() {
        return {
          options:[],
          tableData:[],
          total: 0,
          listQuery: {
            page: 1,
            limit: 20,
          },
          value2:''
        }
      },
      mounted: function () {
        this.loadOrder();
        this.selectshop()
      },
      methods:
        {
          loadOrder()
          {
            const _this = this
            this.$axios.post('/order').then(resp =>
            {
              if (resp && resp.status === 200)
              {
                _this.tableData = resp.data
              }
            })
          },
          orderbyshop()
          {
            const _this = this
            this.$axios.post('/orderbyshop',
              {
                name: _this.value2
              }).then(resp =>
            {
              if (resp && resp.status === 200)
              {
                _this.tableData = resp.data
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
        },
    }
</script>

<style scoped>

</style>
