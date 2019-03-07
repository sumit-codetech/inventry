<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
        <v-layout row wrap  class="my-5" align-center justify-center>
            <v-flex xs12 sm8 md4>
             <v-card class="elevation-6">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Add New Manufacturer</v-toolbar-title>
          </v-toolbar>
          <v-card-text >
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="manufacturer_name"
                label="Manufacturer Name"
                type="text"
                v-model="manufacturer_name"
                v-validate="'required|alpha_spaces'"
                counter
                maxlength="50"
                :error-messages="errors.collect('manufacturer_name')"
                data-vv-name="manufacturer_name"
              ></v-text-field>

              

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-snackbar v-model="snackbar" :multi-line="false" :timeout=0 :value=show_message :color=message_type :bottom=true>{{ message_text }}<v-btn dark flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="validate">Save</v-btn>
          </v-card-actions>
        </v-card>
            </v-flex>
        </v-layout>
      </section>
    </v-container>
  </div>
</template>

<script>

  export default {
    name: 'ManufacturerAdd',
    data: () => ({
      manufacturer_name:'',
      snackbar:false,
      show_message: false,
      message_type: "",
      message_icon: "",
      message_text: "",
      dictionary: {

          custom: {
            manufacturer_name: {
              required: 'Manufacturer Name can not be empty.',
              alpha_spaces: 'Manufacturer Name may only contain alphabetic characters as well as spaces.',
            },
            
          }
        }
      
    }),
    $_veeValidate: {
      validator: 'new'
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)
    },
    created () {

      

    },

    methods: {
      
      validate:function(){
          this.$validator.validate()
          .then(result => {
            result ? this.add_manufacturer() : this.showError()
            this.disable_save = false
          })
      },
      add_manufacturer:function(){
          axios.post('/manufacturers',{
          name: this.manufacturer_name,
        })
        .then(response => {
          this.show_message = true
          this.message_type = 'success'
          this.message_icon = 'check_circle'
          this.message_text = response.data
          this.snackbar =true
          this.manufacturer_name=''
          this.$validator.reset()
        })
        .catch(error => {
          this.show_message = true
          this.message_type = 'error'
          this.message_icon = 'warning'
          this.message_text = error.response.data.errors.name
          this.snackbar =true
        })
      }
      },
      showError:function(){
        this.show_message = true
        this.message_type = 'error'
        this.message_icon = 'warning'
        this.message_text = 'Manufactuere name required!!!'
        this.snackbar =true
      }





    }
  
</script>
