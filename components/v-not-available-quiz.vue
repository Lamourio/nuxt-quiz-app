<template>
      <div class="not-available">
          <h1>Quiz score not available</h1>
          <h2>looks like you didn't take any quiz yet</h2>
          <div>
            <v-button class="btn" @click="navigate('/quiz')">Take Quiz</v-button>
            <v-button class="btn" @click="navigate('/configuration')">settings</v-button>
          </div>
      </div>
</template>

<script lang="ts" setup>
  async function navigate(url : string) {
    await navigateTo(url)
  }
</script>

<style scoped>
  .not-available {
    text-align: center;
  }
</style>