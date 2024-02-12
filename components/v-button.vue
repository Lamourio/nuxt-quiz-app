<template>
  <button class="btn" :class="additionalClass" @click="onClick" :disabled="isDisabled"><slot /></button>
</template>

<script setup lang="ts">

const props = defineProps(['onClick', 'isDisabled', 'additionalClass']);
</script>