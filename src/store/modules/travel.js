import router from "../../router/index.js"

const state = {
	travel: [],
	currentCity: ''
};

const getters = {
	CURRENT: state => {
		let city = '';
		state.travel.forEach((element) => {
			if (element.id == state.currentCity) {
				city = element.city.title;
			} 
		});
		return city;
	},
	STARTED: state => {
		return state.travel.length > 0 ? true : false;
	},
	TRAVEL: state => {
		return state.travel;
	}
};

const mutations = {
	START: (state, payload) => {
		let startPoint = {
			city: payload,
			id: Date.now(),
			services: [],
			accomodation: {},
			transfer: []
		};

		state.travel = [startPoint];
		state.currentCity = startPoint.id;
		router.push({name: 'Travel', params: {Pid: startPoint.id, cityId: startPoint.city.id}});
	},
	SET_ACCOMODATION: (state, payload) => {
		state.travel.forEach( (element) => {
			if (element.id == payload.id) {
				element['accomodation'] = payload['accomodation'];
			}
		});
	},
	ADD_SERV: (state, payload) => {
		state.travel.forEach( (element) => {
			if (element.id == payload.id) {
				element['services'].push(payload.service);
			}
		});
	},
	ACCEPT_TRANSFER: (state, payload) => {
		state.travel.forEach( (element) => {
			if (element.id == payload.id) {
				element['transfer'] = payload['transfer'];
			}
		});

		let nextPoint = {
			city: payload['city'],
			id: Date.now(),
			services: [],
			accomodation: [],
			transfer: []
		}
		state.travel.push(nextPoint);
		router.push({name: 'Travel', params: {Pid: nextPoint.id,
                                          cityId: nextPoint.city.id}})
	},
  REMOVE_SERVICE: (state, payload) => {
    state.travel[payload.index].services.splice(payload.ind, 1);
  }
};

const actions = {
	START: (context, payload) => {
		context.commit('START',  payload);
	},
	SET_ACCOMODATION: (context, payload) => {
		context.commit('SET_ACCOMODATION', payload);
	},
	ADD_SERV: (context, payload) => {
		context.commit('ADD_SERV', payload);
	},
	ACCEPT_TRANSFER: (context, payload) => {
		context.commit('ACCEPT_TRANSFER', payload);
	},
  REMOVE_SERVICE: (context, payload) => {
    context.commit('REMOVE_SERVICE', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};