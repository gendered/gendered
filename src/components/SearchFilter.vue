<template>
	<input
		ref="search"
		aria-label="Search for word"
		type="text"
		name="textfield"
		placeholder="Search for words.."
		@input="updateSearchFilter"
	/>
</template>
<script>
import _ from "lodash";

export default {
	name: "SearchFilter",
	methods: {
		updateSearchFilter: _.debounce(function(e) {
			this.$emit("input", e.target.value);
		}, 500)
	}
};
</script>
