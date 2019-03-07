<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
        <v-layout row wrap  class="my-5" align-center justify-center>
            <v-flex xs12 sm8 md6>
             <v-card class="elevation-6">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Add New Mmodel</v-toolbar-title>
          </v-toolbar>
          <v-card-text >
            <v-form>
            <v-layout row wrap>
                <v-flex xs4 class="mr-2">
                    <manufacturer-list
                      v-model="manufacturer_id"
                      v-validate="'required'"
                      data-vv-name="manufacturer_id"
                      :error="errors.collect('manufacturer_id')"
                    ></manufacturer-list>
                </v-flex>
                <v-flex xs7>
                <v-text-field
                    prepend-icon=""
                    name="model_name"
                    label="Model Name"
                    type="text"
                    v-model="model_name"
                    counter
                    maxlength="50"
                    v-validate="'required'"
                    :error-messages="errors.collect('model_name')"
                    data-vv-name="model_name"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon=""
                    name="model_color"
                    label="Model Color"
                    type="text"
                    v-model="model_color"
                    counter
                    maxlength="50"
                    v-validate="'required'"
                    :error-messages="errors.collect('model_color')"
                    data-vv-name="model_color"
                  ></v-text-field>
                  
                  <v-text-field
                    prepend-icon=""
                    name="model_year"
                    label="Registration Year"
                    type="text"
                    v-model="model_year"
                    counter
                    maxlength="4"
                    v-validate="'required'"
                    :error-messages="errors.collect('model_year')"
                    data-vv-name="model_year"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon=""
                    name="model_registration_no"
                    label="Registration Number"
                    type="text"
                    v-model="model_registration_no"
                    counter
                    maxlength="10"
                    v-validate="'required'"
                    :error-messages="errors.collect('model_registration_no')"
                    data-vv-name="model_registration_no"
                  ></v-text-field>
                  <v-textarea
                    prepend-icon=""
                    name="model_note"
                    label="Note"
                    type="text"
                    v-model="model_note"
                    counter
                    maxlength="50"
                    v-validate="'required'"
                    :error-messages="errors.collect('model_note')"
                    data-vv-name="model_note"
                  ></v-textarea>
                  <v-text-field
                    prepend-icon=""
                    name="model_count"
                    label="Number(Count)"
                    type="text"
                    v-model="model_count"
                    counter
                    maxlength="4"
                    v-validate="'required|numeric'"
                    :error-messages="errors.collect('model_count')"
                    data-vv-name="model_count"
                  ></v-text-field>

                </v-flex>
             </v-layout>

              

            </v-form>
          <v-flex xs12 v-if="this.errorshow!=''">
          
          <ol style="color:red;">
                <li v-for="error in errorshow" :prop="error" :key="error.id">{{error}}</li>
          </ol>
          
          </v-flex>
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
import ManufacturerList from '@/components/ManufactureList'
  export default {
    name: 'ModelAdd',
    components: {
      'manufacturer-list': ManufacturerList,
     
    },
    data: () => ({
      manufacturer_id:'',
      model_name:'',
      model_color:'',
      model_year:'',
      model_registration_no:'',
      model_note:'',
      model_count:'',
      snackbar:false,
      show_message: false,
      message_type: "",
      message_icon: "",
      message_text: "",
      errorshow:[],
      dictionary: {

          custom: {
            model_name: {
              required: 'Model Name can not be empty',
            },
            manufacturer_id:{
              required: 'Please select one Manufacturer',
            },
            model_color: {
              required: 'Model Color can not be empty',
            },
            model_year:{
              required: 'Please provide year of Manufacturer',
              numeric:'Year must be numeric'
            },
            model_registration_no: {
              required: 'Registraion number is required',
            },
            model_note:{
              required: 'Please provide Note',
            },
            model_count:{
              required: 'Please Number(Count) of model',
              numeric:'Number must be numeric'
            },
            
          }
        }
      
    }),
    $_veeValidate: {
      validator: 'new'
    },
    
    created () {

      

    },

    methods: {
      
      validate:function(){
        if(this.manufacturer_id!=''){
          this.$validator.validate()
          .then(result => {
            result ? this.add_model() : this.showError()
            this.disable_save = false
          })
        }else{
          this.show_message = true
          this.message_type = 'error'
          this.message_icon = 'warning'
          this.message_text = 'Please select one Manufacturer'
          this.snackbar =true
        }
      },
      add_model:function(){
          axios.post('/models',{
          name: this.model_name,
          color:this.model_color,
          year_of_manufacturer:this.model_year,
          registration_number:this.model_registration_no,
          note:this.model_note,
          count:this.model_count,
          manufacturer_id:this.manufacturer_id
        })
        .then(response => {
          this.show_message = true
          this.message_type = 'success'
          this.message_icon = 'check_circle'
          this.message_text = response.data
          this.snackbar =true
          this.model_name=''
          this.model_color=''
          this.model_year=''
          this.model_registration_no=''
          this.model_note=''
          this.model_count=''
          this.$validator.reset()
        })
        .catch(error => {
          
          this.show_message = true
          this.message_type = 'error'
          this.message_icon = 'warning'
          this.message_text = 'Server side validation failed, please check all fields again.'
          this.errorshow=error.response.data.errors
          this.snackbar =true
        })
      }
      },
      showError:function(){
        this.show_message = true
        this.message_type = 'error'
        this.message_icon = 'warning'
        this.message_text = 'Please check all required fields again'
        this.snackbar =true
      }





    }
  
</script>
