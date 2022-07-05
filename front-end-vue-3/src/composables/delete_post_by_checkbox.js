import { ref, onUnmounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import useNotifyGetterComposable from './getters/notify_getter_composable';
import useIsAuthenticateComposable from '../composables/getters/is_authenticate_composable';
import axios_object_with_base_url_and_token_and_common_headers from '../services/axios_object_base_url_and_token_and_common_headers';

export default function useDeletePostByCheckboxComposable(
	post_list,
	onShowPostList
) {
	const store = useStore();
	const router = useRouter();
	const { timeout } = useNotifyGetterComposable();

	const { user_data } = useIsAuthenticateComposable();
	const ids_for_delete = ref([]);
	const all_select = ref(false);
	const is_btn_deactive = ref(true);
	let finally_done = false;

	const setTimeout_ = time => {
		let timeout = setTimeout(() => {
			store.commit('notify_module/cheange_error_messages_from_server', []);
			store.commit('notify_module/cheange_response_message', '');
		}, time);
		store.commit('notify_module/cheange_timeout', timeout);
	};

	const delete_selected_posts = async () => {
		is_btn_deactive.value = !is_btn_deactive.value;

		//Storing in database code
		store.commit('notify_module/cheange_error_messages_from_server', '');
		store.commit('notify_module/cheange_response_message', '');
		store.commit('notify_module/cheange_response_message', 'Loading...');

		let all_errors = [];
		let is_server_or_net_on = true;

		let axios_object = axios_object_with_base_url_and_token_and_common_headers(
			user_data.value.token
		);
		let data = { post_ids: ids_for_delete.value };
		await axios_object
			.post('posts/delete-selected', data)
			.then(function (response) {
				if (response.status == 200 && response.statusText == 'OK') {
					onShowPostList();
					ids_for_delete.value = [];

					all_select.value = false;

					finally_done = true;
				}
			})
			.catch(function (error) {
				if (error.code == 'ERR_BAD_REQUEST') {
					if (error.response.data.message == 'Unauthenticated.') {
						localStorage.removeItem('user_data');
						store.commit('authentication_module/set_user_data', {});
						router.push({ name: 'home' });
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
			is_btn_deactive.value = !is_btn_deactive.value;
			setTimeout_(5000);
		} else {
			if (all_errors.length > 0) {
				store.commit('notify_module/cheange_response_message', '');
				store.commit(
					'notify_module/cheange_error_messages_from_server',
					all_errors
				);
				is_btn_deactive.value = !is_btn_deactive.value;
				setTimeout_(5000);
			} else {
				if (finally_done == true) {
					store.commit(
						'notify_module/cheange_response_message',
						'Selected Records are Deleted Successfully!'
					);
				} else {
					store.commit('notify_module/cheange_response_message', '');
					store.commit('notify_module/cheange_error_messages_from_server', [
						'Wrong Occurs in Server!'
					]);
				}

				setTimeout_(5000);
			}
		}
	};

	const select_all_via_check_box = () => {
		if (all_select.value == false) {
			all_select.value = true;
			is_btn_deactive.value = false;
			post_list.value.forEach(post => {
				ids_for_delete.value.push(post.id);
			});
		} else {
			is_btn_deactive.value = true;
			all_select.value = false;
			ids_for_delete.value = [];
		}
	};

	watch(ids_for_delete, new_ids_for_delete_value => {
		if (new_ids_for_delete_value.length > 0) {
			is_btn_deactive.value = false;
		} else {
			is_btn_deactive.value = true;
		}
	});

	onUnmounted(() => {
		clearTimeout(timeout.value);
	});

	return {
		is_checked_delete_btn_deactive: is_btn_deactive,
		delete_selected_posts,
		select_all_via_check_box,
		all_select,
		ids_for_delete
	};
}
