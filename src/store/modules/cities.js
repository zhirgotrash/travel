import axios from 'axios';

const state = {
	cities: []
};

const getters = {
	CITIES : state => {
		return state.cities
	}
};

const mutations = {
	SET_CITIES: (state, payload)=>{
		state.cities = payload;
	}
};

const actions = {
	SET_CITIES: async (context)=> {
		await axios({
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			url: 'https://safaricalc.000webhostapp.com/',
			data: {
				'action': 'get_cities'
			}
		}).then(({data})=>{
			let cities = data;
			cities.forEach((element)=>{
				element['label'] = element['title'];
			})
			context.commit('SET_CITIES', cities);
		})
	}
};

export default {
  state,
  getters,
  mutations,
  actions,
};