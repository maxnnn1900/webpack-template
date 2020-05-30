<template>
  <div class="component">
    {{ title }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: null
    }
  },
  created(){
    this.title = this.$store.getters.getMessage
  }
}
</script>

<style lang="scss" scoped>
  .component{
    margin: 2em;
    background-color: green;
    padding: 2em;
    color: white;
    border-radius: 1em;
  }
</style>