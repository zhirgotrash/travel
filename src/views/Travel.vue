<template>
<div class="point" v-if="STARTED">
	<div class="point__wrapper">
		<div class="point__accomodation">
			<h2 class="point__cap">Select type of accomodation in {{CURRENT}}</h2>
			<div class="point__accomodation_header">
				<span class="point__accomodation_link"
				v-for="(hotel, index) in accomodation"
				:key="index"
				@click="accomodationChange(index)"
				>{{hotel.title}}</span>
			</div>
			<div class="point__accomodation_content">
				<div v-html="currentAccomodation.description_before"
				class="point__desc">	
				</div>
				<div v-if="vifSlider"
				class="point__slider">
					<hooper>
						<slide v-for="(img, index) in currentAccomodation.img"
						:key="index"
						><div class="slide"><img :src="img.url" alt=""></div></slide>
						<hooper-pagination slot="hooper-addons"></hooper-pagination>
            <hooper-navigation slot="hooper-addons"></hooper-navigation>
					</hooper>
				</div>
				<div v-if="!vifSlider"
				class="point__singel_img">
					<img :src="oneImg" alt="">
				</div>
				<div v-html="currentAccomodation.description_after"
				class="point__desc"></div>
        <div class="point__accomodation_adds">
          <label
          v-for="(add, ind) in currentAccomodation.adds"
          :key="ind"
          ><input
          type="checkbox"
          :value="add.title"
          v-model="currentAccomodation.selectedAdds"
          >{{add.title}}</label>
        </div>
			</div>
			<div
			v-if="currentAccomodation.title"
			class="point__accomodation_tools">
				<button @click="SET_ACCOMODATION(toAccomodation)">confirm accomodation</button>
			</div>
		</div>
		<div class="point__activites">
			<h2 class="point__cap">Activites in {{CURRENT}}</h2>
			<div class="point__services">
				<h3 class="point__serv_cap">services</h3>
				<div class="point__serv_content">
					<div v-for="(service, index) in services"
					:key="index"
					class="point__service">
						<div class="point__serv_wrapper">
							<div class="point__serv_title">{{service.title}}</div>
							<div v-html="service.description_before" class="point__serv_desc"></div>	
						</div>
						<button @click="addService(service)" class="point__btn">Add</button>
					</div>
				</div>
			</div>
			<div class="point__services">
				<h3 class="point__serv_cap">goup services</h3>
				<div class="point__serv_content">
					<div v-for="(service, index) in services_group"
					:key="index"
					class="point__service">
						<div class="point__serv_wrapper">
							<div class="point__serv_title">{{service.title}}</div>
							<div v-html="service.description_before" class="point__serv_desc"></div>	
						</div>
						<button @click="addServiceGroup(service)" class="point__btn">Add</button>
					</div>
				</div>
			</div>
		</div>
		<div class="point__transfers">
			<h2 class="point__cap">Followed by</h2>
			<div class="point__transfers_content">
				<div v-for="(transfer, index) in transfers"
				:key ="index"
				class="point__transfer"
        :class="{point__transfer_active: currentTransfer == transfer}"
        @click="transferSet(transfer)"
        >
					{{toTransfer(transfer.city_to)}}
          <div class="point__transfer_services"
          v-if="currentTransfer == transfer && transfer.adds">
            <div class="point__transfer_single"
            v-if="transfer.adds.service"
            >
              <h3>services</h3>
              <div class="point__transfer_service">
                <label v-for="(service, ind) in transfer.adds.service" :key="ind ">
                  <input type="checkbox" :value="ind" v-model="transfer_services.service">
                  {{service.title}}
                </label>
              </div>
            </div>
            <div class="point__transfer__group"
            v-if="transfer.adds.service_group"
            >
              <h3>group services</h3>
              <div class="point__transfer_service">
                <label v-for="(service, ind) in transfer.adds.service_group" :key="ind ">
                  <input type="checkbox" :value="ind" v-model="transfer_services.service_group">
                  {{service.title}}
                </label>
              </div>
            </div>
          </div>
				</div>
			</div>
      
			<div class="point__transfer_acception">
				<button @click="acceptTransfer">accept transfer</button>
			</div>
		</div>
	</div>
</div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex';	

import axios from 'axios';
import { Hooper,
         Slide, 
         Pagination as HooperPagination,
         Navigation as HooperNavigation
          } from 'hooper';
import "hooper/dist/hooper.css";

export default {
	name: "Travel",
	components: {
		Hooper,
    Slide,
    HooperPagination,
    HooperNavigation
	},
	data () {
		return {
			transfers: [],
      transfer_services: {
        service: [],
        service_group: []
      },
			services_group: [],
			services: [],
			accomodation: [],
			currentAccomodation: {},
      currentTransfer: null,
		}
	},
	watch: {
		'$route' () {
			this.setData();
		}
	},
	async mounted () {
		this.setData();
	},
	computed: {
		...mapGetters(['CURRENT', 'STARTED', 'CITIES']),
		point () {
			return this.$route.params.cityId;
		},
		vifSlider () {
			if (this.currentAccomodation.img) {
				return this.currentAccomodation.img.length > 1 ? true : false;
			}

			return false;
		},
		oneImg () {
			if (this.currentAccomodation.img && this.currentAccomodation.img.length == 1) {
				return this.currentAccomodation.img[0].url;
			}
			return false;
		},
		toAccomodation () {
			return {
				id: this.$route.params.Pid,
				accomodation: this.currentAccomodation
			}
		}
	},
	methods: {
		...mapActions(['SET_ACCOMODATION', 'ADD_SERV', 'ACCEPT_TRANSFER']),

		async setData () {
      this.currentAccomodation = {};
      await axios({
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: 'https://safaricalc.000webhostapp.com/point.php',
        data: {
          'action': 'get_data_point',
          'point': {
            id : this.point
          }
        }
      }).then((response)=>{
        console.log(response);
        this.accomodation = response.data['accomodation'];
        this.services = response.data['services'];
        this.services_group = response.data['services_group'];
        this.transfers = response.data['transfer'];
        this.accomodationAdds();
      })
		},
		accomodationAdds () {
      this.accomodation.forEach((element) => {
        element['https://safaricalc.000webhostapp.com/'] = []
      })
		},
		accomodationChange (ind) {
			this.currentAccomodation = this.accomodation[ind];
		},
		toTransfer (ind) {
			let city = '';
			this.CITIES.forEach( function(element) {
				if (element.id == ind) {
					city = element.title;
				}
			});
			return city;
		},
		addService (service) {
			service['type'] = "service_single";
			let serv = {
				id: this.$route.params.Pid,
				'service': service 
			}
			this.ADD_SERV(serv);
		},
		addServiceGroup (service) {
			service['type'] = 'service_group';
			let serv = {
				id: this.$route.params.Pid,
				'service': service
			}
			this.ADD_SERV(serv);
		},
    transferSet (transfer) {
      this.currentTransfer = transfer;
      this.transfer_srvices = {
        service: [],
        service_group: []
      }
    },
    acceptTransfer () {
      let trans = this.currentTransfer;
      let nextCity = null;
      this.CITIES.forEach((element) => {
        if ( element.id == trans.city_to) {
          nextCity = element;
        }
      })
      trans['adds_choosed'] = this.transfer_services;

      this.ACCEPT_TRANSFER({
        id: this.$route.params.Pid,
        'transfer': trans,
        'city': nextCity
      })
    }
	}
}

</script>

<style>

.point{
	width: 50%;
}


.point__accomodation_link{
	display: inline-block;
	border: 1px solid black;
	margin: 0 5px;
	padding: 5px;
	cursor: pointer;
}

.slide{
	display: flex;
	justify-content: center;

}

.point__service{
	display: flex;
	border: 1px solid #ccc;
	border-radius: 5px;
	justify-content: space-between;
}

.point__transfers_content {
	display: flex;
	justify-content: space-around;
}

.point__transfer {
	padding: 5px;
	margin: 0 5px;
	border: 1px solid #ccc;
	border-radius: 5px;
	cursor: pointer;
}

.point__transfer_active {
  border: 1px solid red;
}

</style>