<template>
	<footer>
		<FilterPanel :options="gender" v-on:filter="handleFilter"></FilterPanel>
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
			this.$emit('filter', option);
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
  }
</style>
