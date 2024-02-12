<template>
    <main class="grid-header-main">
      <div class="header">
        <v-header></v-header>
      </div>
      <div class="main">
        <div id="quizContainer" class="container">
          <h1 v-if="hasSubmittedResults">All Submitted Answers</h1>
  
          <table v-if="hasSubmittedResults" class="answer-table">
            <thead>
              <tr>
                <th>Attempt</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(submitted, submittedIndex) in website.submittedResult" :key="submittedIndex">
                <td>{{ submittedIndex + 1 }}</td>
                <td>{{ submitted.score }}</td>
                <td><v-button :onClick="() => navigate(`/score/${submittedIndex}`)" :isDisabled="false" >Consult</v-button> </td>
              </tr>
            </tbody>
          </table>
  
          <v-not-available-quiz v-else></v-not-available-quiz>
        </div>
      </div>
    </main>
  </template>
  
  <script lang="ts" setup>
  
  const website = useWebsiteStore();
  const hasSubmittedResults = website.submittedResult.length > 0;
  async function navigate(url : string) {
    await navigateTo(url)
  }
  </script>
  