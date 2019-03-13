<template>
  <div class="admin">
    <navbar></navbar>
    <sidebar></sidebar>
    <main class="main">
      <slot/>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/navbar/Navbar'
import Sidebar from '@/components/sidebar/Sidebar'

export default {
  components: {
    Navbar,
    Sidebar
  }
}
</script>
