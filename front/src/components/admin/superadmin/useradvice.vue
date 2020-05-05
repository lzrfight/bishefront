<template>
  <div>
    <h1>用户投诉与建议</h1>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="建议id">
      </el-table-column>
      <el-table-column
        prop= "shopname"
        label="店名">
      </el-table-column>
      <el-table-column
        prop= "rate"
        label="评分">
      </el-table-column>
      <el-table-column
        prop= "comment"
        label="评论">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "useradvice",
      data() {
        return {
          tableData:[],
          options:[],
        }
        },
      mounted() {
        this.findadvice();
      },
      methods:
        {
          findadvice()
          {
            const _this = this
            {
              this.$axios.post('/alladvice').then(resp => {
                if (resp && resp.status === 200) {
                  _this.tableData = resp.data
                }
              })
            }
          },
        }
    }
</script>

<style scoped>

</style>
