<template>
  <div class="calc">
    <div class="calc__wrapper">
      <h1 class="calc__title">Your</h1>
      <div v-if="STARTED" class="calc__content">
        <div v-for="(point, index) in TRAVEL"
        :key="index"
        class="calc__point">
          <div class="calc__accomodation">
            <div class="calc__acc">
              <h5 class="calc__accomodation_title" @click="showMe(point)">
                Accomodation in {{point.accomodation.title}} in {{point.city.title}}
              </h5>
              <button @click="editPoint(index)">edit</button>
            </div>
            <transition name="fade" mode="out-in">
              <div v-if="show == point" class="calc__desc">
                <div class="calc__description"
                v-html="point.accomodation.description_before"></div>
                <hooper :infiniteScroll="true">
                  <slide v-for="(img, index) in point.accomodation.img"
                  :key="index"
                  ><div class="slide"><img :src="img.url" alt=""></div></slide>
                  <hooper-pagination slot="hooper-addons"></hooper-pagination>
                  <hooper-navigation slot="hooper-addons"></hooper-navigation>
                </hooper>
                <div class="calc__description"
                v-html="point.accomodation.description_after"></div>
              </div>
            </transition>
          </div>

          <div v-for="(act, ind) in point.services"
          :key="ind"
          class="calc__activity">
            <div class="calc__serv">
              <div class="calc__day">
              day {{days(index,ind)}}
              </div>
              <h5 class="calc__serv_title" @click="showMe(act)">{{act.title}}</h5>
              <button @click="removeService(index, ind)">delete</button>
            </div>
            <transition name="fade" mode="out-in">
              <div v-if="show == act" class="calc__desc">
                <div class="calc__description"
                v-html="act.description_before"
                ></div>
              <hooper :infiniteScroll="true">
                <slide v-for="(img, index) in act.img" :key="index">
                  <div class="slide"><img :src="img.url" alt=""></div>
                </slide>
                <hooper-pagination slot="hooper-addons"></hooper-pagination>
                <hooper-navigation slot="hooper-addons"></hooper-navigation>
              </hooper>
              <div class="calc__description"
              v-html="act.description_after"
              ></div>
              </div>
            </transition>
          </div>

          <div class="calc__transfer">
            <div class="calc__trans">
              <div class="calc__day" v-if="point.transfer.title">
                day {{transferDay(index)}}
              </div>
              <h5 class="calc__trans_title" @click="showMe(point.transfer)">
                {{point.transfer.title}}
              </h5>
            </div>
            <div class="calc__trans_serv" v-if="show == point.transfer">
              <div class="calc__trans_service"
              v-for="(add, ind) in transferServices(index)"
              :key="ind"
              @click = "showMeTrans(add)"
              >
              <div class="calc__cap">
                {{add.title}}  
              </div>
              
              <transition name="fade" mode="out-in">
                <div v-if="transDescShow == add"
                class="calc__trans_descirption">
                  <div class="calc__desc" v-html="add.description_before"></div>
                  <hooper :infiniteScroll="true">
                    <slide v-for="(img, i) in add.img" :key="i">
                      <img :src="img.url" alt="">
                    </slide>
                  </hooper>
                  <div class="calc__desc" v-html="add.description_after"></div>
                </div>
              </transition>
            
            </div>
            </div>

          </div>
        </div>
      </div>
      <button @click="toBooking">Go to booking</button>
    </div>
  </div>
</template>

<script>

import { Hooper,
         Slide, 
         Pagination as HooperPagination,
         Navigation as HooperNavigation
          } from 'hooper';
import "hooper/dist/hooper.css";

import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'Calculator',
  components: {
    Hooper,
    Slide,
    HooperPagination,
    HooperNavigation
  },
  data () {
    return {
      show: null,
      transDescShow: null
    }
  },
  mounted () {

  },
  computed: {
    ...mapGetters(['TRAVEL', 'CURRENT', 'STARTED'])
  },
  methods: {
    ...mapActions(['REMOVE_SERVICE']),

    days (index, ind) {
      let before = 0;
      if (index == 0) {
        return ind + 1;
      }

      for (let i=0; i<index; i++) {
        before += this.TRAVEL[index].services.length;
      }
      return before + ind + 1;
    },
    showMe (payload) {
      this.show = payload;
    },
    showMeTrans (payload) {
      this.transDescShow = payload;
    },
    transferDay (index) {
      let day = 1;
      for (let i = 0; i<=index; i++) {
        day += this.TRAVEL[index].services.length;
      }
      return day;
    },
    transferServices (index) {
      let service = [];
      let service_group = [];
      if (this.TRAVEL[index].transfer.adds.service) {
        service = this.TRAVEL[index].transfer.adds.service;
      }

      if ( this.TRAVEL[index].transfer.adds.service_group ) {
        service_group = this.TRAVEL[index].transfer.adds.service_group;
      }
      
      return [...service, ...service_group];
    },
    removeService (index, ind) {
      let payload = {
        'index': index,
        'ind': ind
      }
      this.REMOVE_SERVICE(payload);
    },
    editPoint (index) {
      let point_id = this.TRAVEL[index].id;
      let point_city_id = this.TRAVEL[index].city.id
      this.$router.push({name: 'Travel', params: {Pid: point_id, cityId: point_city_id}});
    },
    toBooking () {
      this.$router.push({path: '/total'})
    }
  },
}

</script>

<style>
  
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}


.calc__serv{
  display: flex;
  -ms-align-items: center;
  align-items: center;
}

.calc__serv_title{
  font-weight: 700;
  font-size: 15px;
  margin: 0 5px;
}

.calc__trans{
  display: flex;
  -ms-align-items: center;
  align-items: center;
}

.calc__trans_title{
  margin: 0 5px;
}

.calc__acc{
  display: flex;
  -ms-align-items: center;
  align-items: center;
}
</style>