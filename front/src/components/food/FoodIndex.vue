<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <SideMenu @indexSelect="listByCategory" ref="sideMenu"></SideMenu>
    </el-aside>
    <el-container>
    <el-main>
      <food @shopping="findcart" class="food-area" ref="foodArea"></food>
    </el-main>
      <el-footer>
        <shopping ref="shopping">
        </shopping>
        <el-row>
          <el-button v-on:click="yes">
            结算
          </el-button>
        </el-row>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
  import SideMenu from "./SideMenu";
  import Food from "./Food";
  import Shopping from "./Shopping";
    export default {
      name: "FoodIndex",
      components: {Shopping, Food, SideMenu},
      methods:
        {
          listByCategory() {
            const _this = this
            const cid = this.$refs.sideMenu.cid
            const url = 'categories/' + cid + '/food'
            this.$axios.get(url).then(resp => {
              if (resp && resp.status === 200) {
                _this.$refs.foodArea.food = resp.data
              }
            })
          },
          findcart()
          {
            this.$refs.shopping.loadShopping()
          },
          yes() {
            const _this = this
            {
              this.$router.replace('/order')
              // this.$confirm('确定结算吗', '提示', {
              //   confirmButtonText: '确定',
              //   cancelButtonText: '取消',
              //   type: 'warning'
              // }).then(() => {
              //   this.$message({
              //     type: 'success',
              //
              //   });
              // }).catch(() => {
              //   this.$message({
              //     type: 'info',
              //     message: '已取消删除'
              //   });
              // });
            }
          },
        }
    }
</script>

<style scoped>
  .food-area {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  .el-footer
  {
    text-align: center;
  }
</style>
