<template>
  <div>
    <el-row style="height: 840px;">
      <el-tooltip effect="dark" placement="right"
                  v-for="item in food.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  :key="item.id">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.name}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>
        <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="book"
                 bodyStyle="padding:10px" shadow="hover">
          <div class="cover" @click="editBook(item)">
            <img :src="item.pic" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a href="">{{item.name}}</a>
            </div>
<!--            <el-input-number size="mini" v-model=""></el-input-number>-->

            <i class="el-icon-plus" @click="shopping(item.id,item.name,item.money)"></i>
          </div>
          <div class="author">{{item.money}}元</div>
        </el-card>
      </el-tooltip>
<!--      <edit-form @onSubmit="loadFood()" ref="edit"></edit-form>-->
    </el-row>
    <el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="food.length">
      </el-pagination>
    </el-row>
  </div>
</template>
<script>
    export default {
      name: "Food",
      data() {
        return {
          food:[],
          currentPage: 1,
          pagesize: 17,

        }
      },
      mounted: function () {
        this.loadFood()
        // this.findcart()
      },
      methods: {
        loadFood() {
          const _this = this
          this.$axios.get('/food').then(resp => {
            if (resp && resp.status === 200) {
              _this.food = resp.data
            }
          })
        },
        handleCurrentChange: function (currentPage) {
          this.currentPage = currentPage
        },
        shopping(id,name,money) {
          const _this = this
          this.$axios.post('/addshopping', {
            name:name,
            money:money,
            amount:1,
          }).then(successResponse => {
            if (successResponse.data.code === 200) {
              _this.$emit('shopping')
            }
          })
        },
        // findcart()
        // {
        //   this.$emit('findcart')
        // }
      }
    }
</script>

<style scoped>
  .cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  .el-icon-plus {
    cursor: pointer;
    float: right;
  }

  .switch {
    display: flex;
    position: absolute;
    left: 780px;
    top: 25px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }

</style>
