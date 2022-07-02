import mutations from './mutations';

export default {
	namespaced: true,
	state() {
		return {
			search_value: ''
		};
	},
	mutations
};
