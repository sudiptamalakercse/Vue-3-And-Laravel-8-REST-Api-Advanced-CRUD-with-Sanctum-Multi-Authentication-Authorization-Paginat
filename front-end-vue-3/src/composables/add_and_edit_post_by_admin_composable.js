import { reactive, ref, watch, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import useNotifyGetterComposable from './getters/notify_getter_composable';
import axios_object_with_base_url_and_token_and_common_headers from '../services/axios_object_base_url_and_token_and_common_headers';

export default function useAddAndEditPostByAdminComposable() {
	const store = useStore();
	const router = useRouter();
	const { timeout, error_messages_from_server } = useNotifyGetterComposable();

	const error_messages = reactive({
		name: '',
		city: '',
		fees: ''
	});

	const inputed_add_and_edit_post_form_data = reactive({
		name: '',
		city: '',
		fees: ''
	});

	const validation_errors = ref(false);
	let from_submmited_with_no_error = false;
	const is_submit_btn_deactive = ref(true);
	let finally_done = false;

	function add_and_edit_post_validation(add_and_edit_post_inputed_form_data) {
		error_messages.name = '';
		error_messages.city = '';
		error_messages.fees = '';
		validation_errors.value = false;

		if (add_and_edit_post_inputed_form_data.name == '') {
			error_messages.name = 'Name is Required!';
			validation_errors.value = true;
		}
		if (add_and_edit_post_inputed_form_data.city == '') {
			error_messages.city = 'City is Required!';
			validation_errors.value = true;
		}
		if (add_and_edit_post_inputed_form_data.fees == '') {
			error_messages.fees = 'Fees is Required!';
			validation_errors.value = true;
		}
	}

	watch(
		inputed_add_and_edit_post_form_data,
		new_inputed_add_and_edit_post_form_data => {
			if (from_submmited_with_no_error == false) {
				add_and_edit_post_validation(new_inputed_add_and_edit_post_form_data);
				if (validation_errors.value == false) {
					is_submit_btn_deactive.value = false;
				} else {
					is_submit_btn_deactive.value = true;
				}
			}

			from_submmited_with_no_error = false;
		}
	);

	const setTimeout_ = time => {
		let timeout = setTimeout(() => {
			store.commit('notify_module/cheange_error_messages_from_server', []);
			store.commit('notify_module/cheange_response_message', '');
		}, time);
		store.commit('notify_module/cheange_timeout', timeout);
	};

	const remove_inputed_add_and_edit_post_form_data = () => {
		inputed_add_and_edit_post_form_data.name = '';
		inputed_add_and_edit_post_form_data.city = '';
		inputed_add_and_edit_post_form_data.fees = '';
		from_submmited_with_no_error = true;
	};

	const onAddOrEditPost = async payload => {
		if (
			error_messages.name == '' &&
			error_messages.city == '' &&
			error_messages.fees == ''
		) {
			is_submit_btn_deactive.value = !is_submit_btn_deactive.value;

			//Storing in database code
			store.commit('notify_module/cheange_error_messages_from_server', '');
			store.commit('notify_module/cheange_response_message', '');
			store.commit('notify_module/cheange_response_message', 'Loading...');

			let all_errors = [];
			let is_server_or_net_on = true;

			let axios_object =
				axios_object_with_base_url_and_token_and_common_headers(payload.token);

			let request_type_to_server = null;

			if (payload.action_type == 'add') {
				request_type_to_server = 'post';
			} else if (payload.action_type == 'update') {
				request_type_to_server = 'put';
			}

			await axios_object[request_type_to_server](
				payload.request_link,
				payload.data
			)
				.then(function (response) {
					if (
						(response.status == 201 && response.statusText == 'Created') ||
						(response.status == 200 && response.statusText == 'OK')
					) {
						finally_done = true;
					}
				})
				.catch(function (error) {
					if (error.code == 'ERR_BAD_REQUEST') {
						if (error.response.data.message == 'Unauthenticated.') {
							localStorage.removeItem('user_data');
							store.commit('authentication_module/set_user_data', {});
							router.push({ name: 'home' });
						} else if (error.response.data.message == 'Unauthorized!!') {
							store.commit('notify_module/cheange_response_message', '');
							let mess = error.response.data.message;
							store.commit('notify_module/cheange_error_messages_from_server', [
								mess
							]);
						}
					} else if (
						error.code == 'ERR_BAD_RESPONSE' ||
						error.code == 'ERR_NETWORK'
					) {
						is_server_or_net_on = false;
					} else {
						let errors = error.response.data.errors;
						for (const key in errors) {
							all_errors.push(errors[key][0]);
						}
					}
				});

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
					remove_inputed_add_and_edit_post_form_data();

					if (finally_done == true) {
						if (payload.action_type == 'add') {
							store.commit(
								'notify_module/cheange_response_message',
								'Your Record is Created Successfully!'
							);
						} else if (payload.action_type == 'update') {
							store.commit(
								'notify_module/cheange_response_message',
								'Your Record is Updated Successfully!'
							);
						}
					} else if (error_messages_from_server.value.length == 0) {
						store.commit('notify_module/cheange_response_message', '');
						store.commit('notify_module/cheange_error_messages_from_server', [
							'Wrong Occurs in Server!'
						]);
					}

					setTimeout_(5000);
					router.push({ name: 'show_posts_for_admin_and_user' });
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
		onAddOrEditPost,
		inputed_add_and_edit_post_form_data,
		is_submit_btn_deactive
	};
}
