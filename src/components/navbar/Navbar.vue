<template>
  <div class="custom-navbar">
    <nav class="navbar navbar-expand fixed-top navbar-light bg-white border-bottom py-1">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <avatar username="Ian Maulana" :customStyle="{display: 'inline-flex', margin: '0 10px'}" :size="30"></avatar>
              <span>Ian Maulana</span>
            </template>
            <div>
              <span class="px-4">Ian Maulana</span>
            </div>
            <div class="dropdown-divider"></div>
            <router-link tag="a" to="/pengaturan" class="dropdown-item">Pengaturan Akun</router-link>
            <b-dropdown-item @click.prevent="onLogout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BNavItemDropdown from 'bootstrap-vue/es/components/nav/nav-item-dropdown'
import BDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item'
import BNavbarNav from 'bootstrap-vue/es/components/navbar/navbar-nav'
import Avatar from 'vue-avatar'

export default {
  name: 'custom-navbar',
  components: {
    BDropdownItem,
    BNavItemDropdown,
    BNavbarNav,
    Avatar
  },
  methods: {
    ...mapActions('auth', [
      'logout'
    ]),

    onLogout: function () {
      this.logout()
    }
  }
}
</script>
