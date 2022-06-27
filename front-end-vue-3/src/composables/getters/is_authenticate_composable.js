import { useStore } from 'vuex';
import { computed } from 'vue';

export default function useIsAuthenticateComposable() {
	const store = useStore();

	const is_admin_authenticate = computed(() => {
		let user_data = store.state.authentication_module.user_data;
		if (user_data.user_type == 'admin' && user_data.token != '') {
			return true;
		} else {
			return false;
		}
	});

	const user_data = computed(() => {
		let user_data = store.state.authentication_module.user_data;
		return user_data;
	});

	const token = computed(() => {
		let user_data = store.state.authentication_module.user_data;
		return user_data.token;
	});

	return {
		is_admin_authenticate,
		user_data,
		token
	};
}
