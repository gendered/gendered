<template>
  <ul
    v-if="options && options.length"
    class="filter-list"
  >
    <li
      v-for="option in options"
      :key="option.type"
      class="filter"
    >
      <input
        :class="{ active: option.active }"
        type="submit"
        :value="option.type"
        @click="clicked(option)"
      >
    </li>
  </ul>
</template>

<script>
export default {
	name: 'FilterPanel',
	props: {
		options: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			filterOn: true,
		}
	},
	methods: {
		clicked(option) {
			if (this.filterOn) {
				this.$emit('filter', option, this.options);
			}
		}
	},
};
</script>

<style lang="scss">
	.filter-list {
		padding: 0;
		margin: 0;
		display: inline-flex;
	}
</style>
