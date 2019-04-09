<template>
  <div class="sidebar">
    <ul class="sidebar-nav">
      <router-link tag="li" to="/order" exact-active-class="active">
        <a href="#"><i class="fa fa-calendar-o fa-fw"></i> Pesanan</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>
