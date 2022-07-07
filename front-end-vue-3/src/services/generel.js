const set_page_num_after_deleting_record = (
	response,
	search_value,
	axios_object,
	recent_page_value,
	onShowPostList,
	ids_for_delete,
	all_select
) => {
	if (response.status == 200 && response.statusText == 'OK') {
		let request_link = null;

		if (search_value.value) {
			request_link = `posts/search/${search_value.value}`;
		} else {
			request_link = 'posts';
		}

		axios_object
			.get(request_link)
			.then(function (res) {
				if (res.status == 200 && res.statusText == 'OK') {
					let total_records = res.data.meta.total;

					let records_per_page = res.data.meta.per_page;

					let total_page_num = Math.ceil(total_records / records_per_page);

					let page = null;

					if (recent_page_value.value <= total_page_num) {
						page = recent_page_value.value;
					} else {
						page = total_page_num;
					}

					onShowPostList(page);

					ids_for_delete.value = [];

					all_select.value = false;
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
};
export { set_page_num_after_deleting_record };
