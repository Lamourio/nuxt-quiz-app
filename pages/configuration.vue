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

<style scoped>





  .select-container {
    text-align: center;
    width: 70%;
    margin: 2% auto;
  }
  .select-container > select {
    text-align: center;
    margin-top: 13px;
  }
  #category-select,
  #difficulty-select {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    width: 100%;
    margin-bottom: 15px;
  }

  #category-select:hover,
  #difficulty-select:hover {
    border-color: #333;
  }

  #category-select:focus,
  #difficulty-select:focus {
    border-color: #555;
    box-shadow: 0 0 5px rgba(85, 85, 85, 0.5);
  }
</style>
