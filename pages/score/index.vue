<template>
  <main class="grid-header-main">
    <div class="header">
      <v-header></v-header>
    </div>
    <div class="main">
        <v-user-score :index="website.submittedResult.length - 1"></v-user-score>
        <v-quiz-result :index="website.submittedResult.length - 1"></v-quiz-result>
      </div>
  </main>
</template>

<script setup>
const website = useWebsiteStore();

</script>

<style scoped>
.main {
  gap: 1em;
}
</style>
