 <template>
<div id="app" class="travel">
  <div class="travel__wrapper">
      <Head/>
      <div class="travel__body">
        <div class="travel__menu">
          <transition name="fade" mode="out-in">
            <router-view/>
          </transition>
        </div>
        <div class="travel__calc">
          <Calculator/>   
        </div>           
      </div>
  </div>
</div>
</template>

<script>

 import Head from "./components/Head.vue";
 import Calculator from './components/Calculator.vue'; 

export default {
  name: 'app',
  components: {
    Head,
    Calculator
  },
  data () {
    return {
      
    }
  }
}

</script>

<style lang="scss">

.travel__body{
  display: flex;
  justify-content: space-around;
}

.travel__menu{
  width: 70%;
}

.travel__calc{
  width: 30%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
