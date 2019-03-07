<template>
  <div id="appRoot">

    <template>
      <v-app>
      <Toolbar></Toolbar>
        <transition>
            <router-view></router-view>
        </transition>
        <!-- Public App Footer -->
          <v-footer height="auto" class="white pa-3 app--footer" absolute color="primary lighten-1" dark>
            <span class="caption">Designed & Developped by Sumit Ghosh </span>
            <v-spacer></v-spacer>
            <span class="caption mr-1"> All Rights Reserved &copy; {{ new Date().getFullYear() }} </span>
          </v-footer>
      </v-app>
    </template>

  </div>
</template>

<script>
import Toolbar from './components/layouts/Toolbar.vue' //Public menu

export default {
  data () {
    return {

    }
  },
  name: 'App',
  components: {
    Toolbar,

  },
  methods:{

  },
  beforeUpdate(){

    },
  computed: {

    }
}
</script>
