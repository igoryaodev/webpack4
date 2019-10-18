<template>
  <div class="app"> 
    {{msg}}
  </div>
</template>
<script>

export default {
  name: 'AppTwo',
  data() {
    return {
      msg: 'App Two'
    }
  },
}
</script>
<style lang="scss">
  .app {
    font-size: 30px;
  }
</style>