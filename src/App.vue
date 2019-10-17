<template>
  <div class="app"> 
    App {{msg}}
    <div>
      <img src="./assets/344.jpeg" alt="img">
    </div>
    <div>
      <img :src="testImg" alt="img">
    </div>
  </div>
</template>
<script>
import testImg from './assets/344.jpeg'

export default {
  name: 'App',
  data() {
    return {
      msg: 'test',
      testImg: testImg
    }
  },
}
</script>
<style>
  .app {
    font-size: 30px;
  }
  img {
    width: 200px;
    height: auto;
  }
</style>