
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>

    <div class="upload-page">
      <div class="upload-container">
        <h3>Upload your flower image</h3>
        <div class="drag-area">
          <div class="icon">
            <i class="fas"></i>
          </div>
          <span class="header">Drag & Drop</span>
          <span class="header">or <span class="browse-button">browse</span></span>
          <input type="file" hidden />
          <span class="tip-support">PNG, JPG, JPEG</span>
        </div>
      </div>
      <div class="buttons-container">
        <button class="btn upload" hidden>Upload</button>
        <button class="btn cancle" hidden>Cancle</button>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
}

import "../data/uploadTemp.js"
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
.upload-page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #e0eafc;
}
.upload-container {
  max-width: 650px;
  width: 100%;
  padding: 30px;
  background: #fff;
  border-radius: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.drag-area {
  height: 400px;
  border: 3px dashed #e0eafc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px auto;
}
.drag-area.active {
  border: 2px solid #1683ff;
}
.upload-container h3 {
  margin-bottom: 20px;
  font-weight: 500;
}
.drag-area .header {
  font-size: 20px;
  font-weight: 500;
  color: #34495e;
}
.drag-area .tip-support{
  font-size: 12px;
  color: gray;
  margin: 10px 0 15px 0;
}
.drag-area .browse-button {
  font-size: 20px;
  font-weight: 1000;
  color: #1683ff;
  cursor: pointer;
  text-decoration: underline;
}
.drag-area img {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.buttons-container {
  max-width: 650px;
  width: 100%;
  padding: 30px;
  display: flex;
  gap: 1em;
  justify-content: center;
}
.btn {
  border: 1px solid transparent;
  border-radius: .5em;
  cursor: pointer;
  font-family: sans-serif;
  font-size: 15px;
  font-weight: bold;
  padding: 1em 2em;
  transition: .3s;
}
.btn.upload {
  background-color: #1683ff;
  border-color: #0a95ff;
  color: #e0eafc;
}
.btn.upload:hover {
  background-color: #3aa7f9;
  border-color: #7dc7ff;
}
.btn.cancle {
  background-color: #f3f3f3;
  border-color: #d6d6d6;
  color: #080808;
}
.btn.cancle:hover {
  background-color: #ececec;
}

</style>
