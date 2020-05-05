<template>
  <div>
    <h1>菜品管理       <el-button type="primary" size="small" round @click="addfood">新建菜品</el-button></h1>
    <el-dialog title="新增/修改连锁店" :visible.sync="dialogFormVisible"   @close="clear">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜名" label-width="auto">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="单价" label-width="auto">
          <el-input v-model="form.money"></el-input>
        </el-form-item>
        <el-form-item label="分类" label-width="formLabelWidth" prop="cid">
          <el-select v-model="form.category.id" placeholder="请选择分类">
            <el-option label="主食" value="1"></el-option>
            <el-option label="配菜" value="2"></el-option>
            <el-option label="饮料" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面"  prop="cover" label-width="auto">
          <el-input v-model="form.cover" autocomplete="off" placeholder="图片 URL"></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="菜品id">
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜品名称">
        </el-table-column>
        <el-table-column
          prop= "money"
          label="单价">
        </el-table-column>
        <el-table-column
          prop= "category.name"
          label="分类">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">

          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editfood(scope.row)"
              type="warning"
              size="small" round>
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deletefood(scope.row.id)"
              type="danger"
              size="small" round>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import ImgUpload from '../../common/ImgUpload'
    export default {
        name: "webfood",
      components: {ImgUpload},
      data() {
        return {
          dialogFormVisible: false,
          tableData:[],
          form: {
            id: '',
            name:'',
            money:'',
            cid: '',
            cover:'',
            category: {
              id: '',
              name: ''
            }
          },
        }
      },
      mounted() {
          this.loadfood()
      },
      methods:
        {
          loadfood() {
            const _this = this
            this.$axios.get('/food').then(resp => {
              if (resp && resp.status === 200) {
                _this.tableData = resp.data
              }

            })
          },
          editfood(item) {
            this.dialogFormVisible = true;
            this.form = {
              id: item.id,
              name: item.name,
              money: item.money,
              cover: item.cover,
              category: {
                id: item.category.id.toString(),
                name: item.category.name
              }
            }
          },
          deletefood(id)
          {
            const _this = this
            this.$confirm('此操作将删除菜品, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$axios.post('/deletemenufood', {
                id: id
              }).then(resp => {
                if (resp && resp.status === 200) {
                  this.loadfood();
                }
              })
            })
          },
          addfood() {
            this.dialogFormVisible = true
          },
          onSubmit() {
            this.$axios.post('/jiafood', {
              id: this.form.id,
              name: this.form.name,
              money: this.form.money,
              category: this.form.category,
              pic: this.form.cover,
            }).then(resp => {
              if (resp && resp.status === 200) {
                this.dialogFormVisible = false;
                this.loadfood()
              }
            })
          },
          clear() {
            this.form = {
              name: '',
              money: '',
              category: {
                id: '',
                name: ''
              }
            }
          },
          uploadImg () {
            this.form.cover = this.$refs.imgUpload.url
          }
        }
    }
</script>

<style scoped>

</style>
