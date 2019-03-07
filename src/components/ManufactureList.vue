<template>
    <v-select
      :items="manufacturers"
      item-text= "name"
      item-value= "id"
      prepend-icon="list"
      label="Manufacturer List"
      @input="$emit('input',$event)"
    >
    </v-select>
</template>

<script>
export default {
  name: 'ManufacturerList',
  data(){
    return {
      manufacturers: [],
    }
  },

  methods:{

  },

  created(){
    axios.get('/manufacturers')
      .then((response, data) => {
       response.data.forEach(item => {
          this.manufacturers.push(item)
        });
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
