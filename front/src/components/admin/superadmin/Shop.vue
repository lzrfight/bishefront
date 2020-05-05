<template>
  <div>
    <h1>连锁店       <el-button type="primary"size="small"round @click="addnewshop">新建连锁店</el-button></h1>
    <el-dialog title="新增/修改连锁店" :visible.sync="dialogTableVisible"  @close="clear" >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="连锁店店名"label-width="auto">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="连锁店地址"label-width="auto">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="连锁店负责人"label-width="auto">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
          <el-form-item label="连锁店账号密码"label-width="auto">
            <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="连锁店电话"label-width="auto">
          <el-input v-model="form.phone"></el-input>
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
        label="连锁店id">
      </el-table-column>
      <el-table-column
        prop="name"
        label="连锁店店名">
      </el-table-column>
      <el-table-column
        prop= "address"
        label="连锁店地址">
      </el-table-column>
      <el-table-column
        prop= "username"
        label="连锁店负责人">
      </el-table-column>
      <el-table-column
        prop= "password"
        label="连锁店账号密码">
      </el-table-column>
      <el-table-column
        prop= "phone"
        label="连锁店电话">
      </el-table-column>
      <el-table-column
        prop= "enabled"
        label="开/关店铺">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="openshop($event,scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      width="200px">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editshop(scope.row)"
            type="warning"
            size="small" round>
            编辑
          </el-button>
          <el-button
            @click.native.prevent="deleteshop(scope.row.id)"
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
    export default {
        name: "Shop",
      data() {
        return {
          tableData:[],
          dialogTableVisible: false,
          form: {
            id:'',
            name:'' ,
            address:'',
            username:'',
            password:'',
            phone:'',
            enabled:''
          },
        }
      },
      mounted: function () {
        this.loadShop()
      },
      methods:
        {
          loadShop()
          {
            const _this = this
            this.$axios.get('/shop').then(resp =>
            {
              if (resp && resp.status === 200)
              {
                _this.tableData = resp.data
              }
            })
          },
          deleteshop(id)
          {
            const _this = this
            this.$confirm('此操作将永久关闭该连锁店, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$axios.post('/deleteshop', {
                id: id
              }).then(resp => {
                if (resp && resp.status === 200) {
                  this.loadShop();
                }
              })
            })
          },
          editshop(item)
          {
            this.dialogTableVisible = true
            this.form = {
              id:item.id,
              name:item.name,
              address: item.address,
              username: item.username,
              password: item.password,
              phone: item.phone,
              enabled: item.enabled,
            }
          },
          addnewshop()
          {
            this.dialogTableVisible = true
          },
          onSubmit()
          {
            const _this = this
            this.$axios.post('/addshop',
              {
                id:this.form.id,
                name: this.form.name,
                username: this.form.username,
                address:this.form.address,
                password: this.form.password,
                phone: this.form.phone,
                enabled: this.form.enabled
            }).then(resp =>
            {
              if (resp && resp.status === 200)
              {
                // this.$alert('创建成功', '提示', {
                //   confirmButtonText: '确定'
                // })
                this.dialogTableVisible = false
                this.loadShop()
              }else {
                this.$alert(resp.data.message, '失败', {
                  confirmButtonText: '确定'
                })
              }
            })
          },
          clear()
          {
            this.form = {
              name:'' ,
              address:'',
              username:'',
              password:'',
              phone:''
            }
          },
          changecolor(enabled)
          {
            if (enabled === 1)
            {

            }
          },
          openshop(status,item)
          {
            console.log("66666"+status)
            console.log(item)
            const _this = this
            this.$axios.post('/addshop',
              {
                id:item.id,
                name:item.name,
                address: item.address,
                username: item.username,
                password: item.password,
                phone: item.phone,
                enabled: status,
              }).then(resp =>
            {
              if (resp && resp.status === 200)
              {
                console.log("成功芜湖芜湖")
              }
            })
          }
        }
    }
</script>

<style scoped>

</style>
