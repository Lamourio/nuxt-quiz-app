<template>
  <main class="grid-header-main">
    <div class="header">
      <v-header></v-header>
    </div>
    <div class="main">
        <v-user-score :index="$route.params.id"></v-user-score>

        <v-quiz-result :index="$route.params.id"></v-quiz-result>
      </div>
  </main>
</template>

<script setup>
const website = useWebsiteStore();
const getRank = (index) => website.getMyRank(index);
</script>

<style scoped>

.main {
  gap: 1em;
}
</style>
