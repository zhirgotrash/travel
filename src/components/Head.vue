<template>
<div class="head">
	<div class="head__wrapper">
    <div class="head__date">
      <date-picker v-model="date" @input="now"/>
    </div>
    <div class="head__accomodation">
      <input type="text" class="head__input" v-model="peoples" @keypress="isNumber()"
      @input="peoplesSet"
      />
      <div class="head__accomodation_result">
        <h4>rooms</h4>
        <div class="">
          <div class="head__accomodation_double">double room: {{ROOM_DOUBLE}} <button>+</button><button>-</button></div>
          <div class="head__accomodation_single">single room: {{ROOM_SINGLE}} <button>+</button><button>-</button></div>
        </div>  
      </div>
    </div>       
		<div class="head__cities">
			<v-select :options="CITIES" v-model="startCity" @input="startTravel"></v-select>
		</div>
	</div>
</div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';


export default {
	name: 'Head',
	components: {
		DatePicker
	},
	data () {
		return {
			startCity: null,
      peoples: 1,
      date: null
		}
	},
	mounted () {
		this.SET_CITIES();
    this.SET_SEASONS();
	},
	computed: {
		...mapGetters(['CITIES','ROOM_SINGLE', 'ROOM_DOUBLE'])
	},
	methods: {
		...mapActions(['SET_CITIES', 'START', 'SET_PEOPLES', 'SET_NOW', 'SET_SEASONS']),
		startTravel () {
			this.START(this.startCity);
		},
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        evt.preventDefault();
      } else {

        return true;
      }

    },
    peoplesSet () {
      if (this.peoples == null || this.peoples == '') return;
      if (this.peoples > 6 ) {
        this.peoples = 6;
      }else if (this.peoples < 1 ) {
        this.peoples = 1;
      }
      this.SET_PEOPLES(this.peoples);
    },
    now () {
      this.SET_NOW(new Date(this.date).getTime());
    }
	}

}

</script>

<style>

.head__wrapper{
  display: flex;
  justify-content: space-around;
}

</style>