import { reactive, ref, watch, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import useNotifyGetterComposable from './getters/notify_getter_composable';

export default function useValidationComposable() {
	const store = useStore();
	const router = useRouter();
	const { timeout } = useNotifyGetterComposable();

	const error_messages = reactive({
		email: '',
		password: ''
	});

	const inputed_log_in_form_data = reactive({
		email: '',
		password: ''
	});

	const validation_errors = ref(false);
	let from_submmited_with_no_error = false;
	const is_submit_btn_deactive = ref(true);

	function log_in_validation(log_in_inputed_form_data) {
		error_messages.email = '';
		error_messages.password = '';
		validation_errors.value = false;

		if (log_in_inputed_form_data.email == '') {
			error_messages.email = 'Email is Required!';
			validation_errors.value = true;
		}
		if (log_in_inputed_form_data.password == '') {
			error_messages.password = 'Password is Required!';
			validation_errors.value = true;
		}
	}

	watch(inputed_log_in_form_data, new_inputed_log_in_form_data => {
		if (from_submmited_with_no_error == false) {
			log_in_validation(new_inputed_log_in_form_data);
			if (validation_errors.value == false) {
				is_submit_btn_deactive.value = false;
			} else {
				is_submit_btn_deactive.value = true;
			}
		}

		from_submmited_with_no_error = false;
	});

	const setTimeout_ = time => {
		let timeout = setTimeout(() => {
			store.commit('notify_module/cheange_error_messages_from_server', []);
			store.commit('notify_module/cheange_response_message', '');
		}, time);
		store.commit('notify_module/cheange_timeout', timeout);
	};

	const remove_inputed_log_in_form_data = () => {
		inputed_log_in_form_data.email = '';
		inputed_log_in_form_data.password = '';
		from_submmited_with_no_error = true;
	};

	const onLogIn = async payload => {
		if (error_messages.email == '' && error_messages.password == '') {
			is_submit_btn_deactive.value = !is_submit_btn_deactive.value;

			//Storing in database code
			store.commit('notify_module/cheange_error_messages_from_server', '');
			store.commit('notify_module/cheange_response_message', '');
			store.commit('notify_module/cheange_response_message', 'Loading...');

			let all_errors = [];
			let is_server_or_net_on = true;
			try {
				// await sign_up(payload);
				await store.dispatch('authentication_module/log_in', payload);
			} catch (error) {
				if (error.code == 'ERR_BAD_RESPONSE' || error.code == 'ERR_NETWORK') {
					is_server_or_net_on = false;
				} else {
					let error_mes = error.response.data.message;

					all_errors.push(error_mes);
				}
			}
			if (is_server_or_net_on == false) {
				store.commit('notify_module/cheange_response_message', '');

				store.commit('notify_module/cheange_error_messages_from_server', [
					'You Are Not Connected With Internet or Server is Down!'
				]);
				is_submit_btn_deactive.value = !is_submit_btn_deactive.value;
				setTimeout_(5000);
			} else {
				if (all_errors.length > 0) {
					store.commit('notify_module/cheange_response_message', '');
					store.commit(
						'notify_module/cheange_error_messages_from_server',
						all_errors
					);
					is_submit_btn_deactive.value = !is_submit_btn_deactive.value;
					setTimeout_(5000);
				} else {
					remove_inputed_log_in_form_data();

					store.commit(
						'notify_module/cheange_response_message',
						'Your Are Logged In Successfully!'
					);

					setTimeout_(5000);
					router.push({ name: 'home' });
				}
			}
		}
	};

	onUnmounted(() => {
		clearTimeout(timeout.value);
	});

	return {
		error_messages,
		validation_errors,
		onLogIn,
		inputed_log_in_form_data,
		is_submit_btn_deactive
	};
}
