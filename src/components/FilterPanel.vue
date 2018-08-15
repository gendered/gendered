<template>
  <ul class="filter-list" v-if="options && options.length">
     <li class="filter" v-for="option in options">
        <input v-bind:class="{ active: option.active }" type="submit" @click="clicked(option)" :value="option.type" />
     </li>
   </ul>
</template>

<script>
export default {
  name: 'FilterPanel',
  props: ['options'],
  data() {
    return {
      filterOn: true,
    }
  },
  methods: {
    clicked(option) {
      if (this.filterOn) {
        this.$emit('filter', option);
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

  .filter {
    margin: 0;
    padding: 1rem; 
  }
</style>
