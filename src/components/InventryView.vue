<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
        <v-layout row wrap  class="my-5">
          <v-btn  to='/add_manufacturer' color="primary">Add Manufacturer</v-btn>
      <v-flex xs12>
        <v-toolbar flat color="white"><v-toolbar-title>All Inventry Items</v-toolbar-title>
          <v-divider
            class="mx-2"
            inset
            vertical
          ></v-divider>

            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search Inventry"
              single-line
              hide-details
            ></v-text-field>

        </v-toolbar>

    <v-data-table

      :headers="headers"
      :items="inventries"
      :search="search"
      class="elevation-1"
      :loading="tableloading"
    >
      <template   slot="items" slot-scope="props">
      <tr @click="viewitem(props.item.id)">
        <td>{{ props.item.id }}</td>
        <td >{{ props.item.manufacturer.name }}</td>
        <td >{{ props.item.name }}</td>
        <td>{{ props.item.count }}</td>

        <!--<td  class="justify-center layout px-0">
          <v-btn flat @click="viewitem(props.item.id)"><v-icon small class="mr-2">edit</v-icon>View</v-btn>
        </td>-->
        </tr>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
      </v-flex>
      </v-layout>

      <v-dialog
      v-model="dialog"
      max-width="490"
    >
      <v-card>
        <v-card-title class="headline">View Model Details</v-card-title>

        <v-card-text v-if="this.model.sold==0">
        Name - {{model.name}}<br>Manufacturer - {{model.manufacturer.name}}<br>Color - {{model.color}}<br>Year of Manufacture - {{model.year_of_manufacturer}}<br>Registration No  - {{model.registration_number}}<br>Count  - {{model.count}}<br>Note  - {{model.note}}
        </v-card-text>
        <v-card-text v-else>
        Car Sold out
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn v-if="this.model.sold==0"
            color="red darken-1"
            flat="flat"
            @click="deleteitem(model.id)"
          >
            Sold
          </v-btn>

          
        </v-card-actions>
      </v-card>
    </v-dialog>
      </section>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'InventryView',
    data: () => ({
      dialog: false,
      search: '',
      tableloading:false,
      headers: [
        { text: 'Serial No', value: 'id',align: 'left', },
        { text: 'Manufacturer Name', align:'left',value: 'manufacturer.name'},
        { text: 'Model Name', value: 'name',align: 'left', },
        { text: 'Count', value: 'count',align: 'left', },
        //{ text: 'Actions', value: '', sortable: false },

      ],
      inventries: [],
      alert:false,
      sl:1,
      model:[],
    }),

    created () {

      this.initialize()
     
    },

    methods: {
      
      initialize () {
        axios.get('/models')
        .then((response, data) => {
           response.data.forEach(item => {
              this.inventries.push(item)
            });
           
            })
        .catch(error => {
          console.log(error)
        })
        
      },
      viewitem:function(id){
        axios.get('/models/'+id)
        .then((response, data) => {
          
              this.model=response.data[0]
              this.model.sold=0
              this.dialog=true
              
            })
        .catch(error => {
          console.log(error)
          
        })
      },
      deleteitem:function(id){
        axios.delete('/models/'+id)
        .then((response, data) => {
          this.dialog=false
          this.model.sold=1
          this.initialize()
          this.dialog=true
            })
        .catch(error => {
          console.log(error)
          
        })
      }





    }
  }
</script>
