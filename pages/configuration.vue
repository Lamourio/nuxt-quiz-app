<template>
  <main class="grid-header-main">
    <div class="header">
      <v-header></v-header>
    </div>

    <div class="main">
      <div class="container">
      <div class="select-container">
        <label for="category-select">Select Category</label>
        <select v-model="website.selectedOption.category" name="category" id="category-select">
          <option :key="category.id" :value="category" v-for="category in website.categoryList">{{ category.name }}</option>
        </select>
      </div>

      <div class="select-container">
        <label for="difficulty-select">Select Difficulty</label>
        <select v-model="website.selectedOption.difficulty" name="difficulty" id="difficulty-select">
          <option :key="difficulty" :value="difficulty" v-for="difficulty in website.difficultyList">{{ difficulty }}</option>
        </select>
      </div>
      <div class="select-container">
        <v-button additional-class="primary" :onClick="() => navigate('/quiz')">Start Quiz</v-button>
      </div>
    </div>
    
  </div>
  </main>
</template>

<script lang="ts" setup>
  const website = useWebsiteStore();
  await callOnce(website.fetchCategory);
  async function navigate(url : string) {
    await navigateTo(url);
  } 
</script>
