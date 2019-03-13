<template>
  <div class="custom-navbar">
    <nav class="navbar navbar-expand fixed-top navbar-light bg-white border-bottom">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <template slot="button-content">
              <i class="fa fa-bell-o fa-lg fa-fw"></i>
            </template>
            <b-dropdown-item href="#"></b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <span>Ian Maulana</span>
            </template>
            <div>
              <span>Ian Maulana</span>
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

export default {
  name: 'custom-navbar',
  components: {
    BDropdownItem,
    BNavItemDropdown,
    BNavbarNav
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
