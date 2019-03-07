<template>
  <v-toolbar color="grey lighten-5">
    <v-toolbar-title>
    <router-link to="/" tag="span" style="cursor: pointer">Inventry</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to='/add_manufacturer' >Add Manufacturer</v-btn>
      <v-btn flat to='/add_model' >Add Model</v-btn>
      <v-btn flat to='/view_inventry'>View Inventry</v-btn>
    </v-toolbar-items>



  </v-toolbar>

</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    methods:{

    }
  }
</script>

