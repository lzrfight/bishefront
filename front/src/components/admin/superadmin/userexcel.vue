<template>
<div>
  下载
</div>
</template>

<script>
    export default {
        name: "userexcel",
      mounted() {
        this.download()
      },
      methods:
        {
          download()
          {
            this.$axios.get('/download').then(resp =>
            {
              if(resp && resp.status === 200)
              {
                console.log("aodijhiuasygduwqioedgbsajhdgabsduy")
              }
            })
          }
        }
    }

</script>

<style scoped>

</style>
