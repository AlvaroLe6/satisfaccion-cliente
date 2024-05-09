<script>
  export default {
    data: () => ({ rating: 3 }),
  }
</script>
<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      active-color="blue"
      color="orange-lighten-1"
    ></v-rating>
  </div>
</template>