<template>
	<footer>
		<FilterPanel :options="gender" v-on:filter="handleFilter"></FilterPanel>
		<button v-on:click="$emit('scrollToTop')">Scroll to top </button>
	</footer>
</template>
<script>

import FilterPanel from '@/components/FilterPanel'
export default {
	name: 'Footer',
	components: {
		FilterPanel,
	},
	data() {
		return {
		  gender: [
		    {
		      'category': 'gender',
		      'type': 'female',
		      'active': false
		    },
		    {
		      'category': 'gender',
		      'type': 'male',
		      'active': false
		    }
		  ],
		}
	},
	methods: {
		handleFilter(option) {
			let len = this[option.category].length;
			// If there are only two filters, it should be a toggle
			this.$emit('filter', option, len == 2);
		}
	}
}
</script>
<style lang="scss">
  footer {
    position: fixed;
		bottom: 0;
		background: white;
		width: 100%;
		border-top: 1px solid black;
		display: flex;
  }
</style>
