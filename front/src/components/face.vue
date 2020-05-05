<template>
  <div>
      <div slot="libBox" class="libBox">
        <div class="auto">
          <video id="video" width="480" height="320" autoplay></video>
          <canvas id="canvas" width="480" height="320" style="display: none;"></canvas>
          <img src="/static/images/body_default.png" id="img" width="480" height="320" style="margin-left: 20px;">
          <!-- <img src="" id="img" width="480" height="320" style="margin-left: 20px;"> -->
          <div>
            <button id="capture" title="点击进行拍照" @click="takePhoto">拍照</button>
          </div>
          <div>
            <button id="sure" title="是否用这张图片进行验证" @click="sure">确认</button>
          </div>
        </div>
      </div>
    <loading :loadingStatus="loadingStatus"></loading>

  </div>
</template>

<script>
    export default {
      name: "face",
      mounted: function() {
        this.initCamera();
      },
      methods: {
        //初始化摄像头 获取摄像头权限
        initCamera() {
          let self = this;
          navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
          if (navigator.getUserMedia) {
            //调用用户媒体设备, 访问摄像头
            navigator.getUserMedia({video: {width: 480, height: 320}}, function (stream) {
              var video = document.querySelector('video');
              video.srcObject = stream;
              self.streamPicture = stream; //关闭摄像头需要用
              video.onloadedmetadata = function (e) {
                video.play();
              };
            }, function (err) {
              console.log("访问用户媒体设备失败: " + err.name);
            })
          } else {
            self.$message.error('不支持访问用户媒体');
          }
        },
        //拍照点击
        takePhoto() {
          let canvas = document.getElementById('canvas');
          let context = canvas.getContext('2d');
          context.drawImage(video, 0, 0, 480, 320);
          // 获取图片base64链接
          var image = canvas.toDataURL('image/png');
          // 定义一个img
          var img = document.getElementById("img");
          //设置属性和src
          //img.id = "imgBoxxx";
          img.src = image;
          //将图片添加到页面中
          //document.body.appendChild(img);
          function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type: mime});
          }

          this.File = dataURLtoFile(image, 'aa.png');
          //console.log(dataURLtoFile(image, 'aa.png'));
          return dataURLtoFile(image, 'aa.png');
        },
      }
    }
</script>

<style scoped>

</style>
