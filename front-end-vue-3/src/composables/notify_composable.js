import { useStore } from 'vuex';

export default function useNotifyComposable() {
	const store = useStore();
	function clear_notify_messages() {
		store.commit('notify_module/cheange_error_messages_from_server', []);
		store.commit('notify_module/cheange_response_message', '');
		store.commit('notify_module/cheange_timeout', null);
	}

	return {
		clear_notify_messages
	};
}
