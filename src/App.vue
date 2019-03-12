<template>
  <div id="app">
    <component :is="setLayout">
      <router-view/>
    </component>
  </div>
</template>

<script>
const defaultLayout = 'default'
export default {
  computed: {
    setLayout () {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
