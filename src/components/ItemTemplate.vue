<template>
  <div>
    <span v-if="item.name">{{ item.name }}</span>
    <span v-if="!item.name">{{ item.domain }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true },
  },
};
</script>