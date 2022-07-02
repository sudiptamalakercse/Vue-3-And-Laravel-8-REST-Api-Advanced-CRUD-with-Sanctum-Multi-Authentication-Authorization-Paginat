import { useStore } from 'vuex';
import { computed } from 'vue';

export default function usePostGetterComposable() {
	const store = useStore();

	const search_value = computed(() => {
		return store.state.post_module.search_value;
	});

	return {
		search_value
	};
}
