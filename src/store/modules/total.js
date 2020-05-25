import axios from 'axios';

const state = {
  now: null,
	seasons: [],
  peoples: 1,
  roomSingle: 1,
  roomDouble: 0
}

const getters = {

  ROOM_SINGLE: state => {
    return state.roomSingle;
  },
  ROOM_DOUBLE: state => {
    return state.roomDouble;
  },

  /* eslint-disable no-unused-vars */

  RESULT: (state, getters, rootState, rootGetters) => {
    
    function dayOfSeason(seasons, now, ind) {
      let season = 'season1';
      seasons.forEach( function(element) {
        let start = new Date(element.start).getTime();
        let stop = new Date(element.stop).getTime();
        let time = now + 1000*60*60*24*ind;
        if ( now >= start && now <= stop) {
          season = element.name;
        }
      });
      return season;
    }

    let result = 0;
    let time = state.now;
    let seasons = state.seasons
    let travel = rootGetters['TRAVEL'];
    travel.forEach((element, ind) => {
      result += element.accomodation[dayOfSeason(seasons, time, ind)]
    })

    return result;
  }

  /* eslint-enable no-unused-vars */
  
};

const mutations = {
	SET_SEASONS: (state, payload) => {
    state.seasons = payload;
	},
  SET_PEOPLES: (state, payload) => {
    state.peoples = payload;
  },
  SET_NOW: (state, payload) => {
    state.now = payload;
  }
};

const actions = {
	SET_SEASONS: async (context) => {
		await axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: 'https://safaricalc.000webhostapp.com/',
			data: {
				'action': 'get_season'
			}
		}).then(({data}) => {
			context.commit('SET_SEASONS', data);
		})
	},
  SET_PEOPLES: (context, payload) => {
    context.commit('SET_PEOPLES', payload);
  },
  SET_NOW: (context, payload) => {
    context.commit('SET_NOW', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};