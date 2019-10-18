<template>
  <div class="app"> 
    {{msg}}
  </div>
</template>
<script>

export default {
  name: 'AppOne',
  data() {
    return {
      msg: 'App One'
    }
  },
}
</script>
<style lang="scss">
  .app {
    font-size: 30px;
  }
</style>