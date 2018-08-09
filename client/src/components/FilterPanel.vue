<template>
  <ul v-if="options && options.length">
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
<style>
  .filter input.active {
    color: white;
    background-color: black;
  }
</style>
