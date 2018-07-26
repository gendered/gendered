<template>
  <div class="filter-options">
    <ul v-if="options && options.length">
       <li v-for="option in options">
          <input type="submit" @click="clicked(option)" :value="option.type" />
       </li>
     </ul>
  </div>
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
