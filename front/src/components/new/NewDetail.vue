<template>
  <div class="articles-area">
    <el-card style="text-align: left;width: 990px;margin: 35px auto 0 auto">
      <div>
        <span style="font-size: 20px"><strong>{{article.articleTitle}}</strong></span>
        <el-divider content-position="left">{{article.articleDate}}</el-divider>
        <div class="markdown-body">
          <div v-html="article.articleContentHtml"></div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
    export default {
        name: "NewDetail",
      data () {
        return {
          article: []
        }
      },
      mounted () {
        this.loadArticle()
      },
      methods: {
        loadArticle () {
          var _this = this
          this.$axios.get('/article/' + this.$route.query.id).then(resp => {
            if (resp && resp.status === 200) {
              console.log("奥里给")
              _this.article = resp.data.result
            }
          })
        }
      }
    }
</script>

<style scoped>
  @import "../../styles/markdown.css";
</style>
