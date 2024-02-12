<template>
  <div id="quizContainer" class="container">
        <ul v-if="website.submittedResult.length > 0 && website.submittedResult[parseInt(index)] !== undefined" class="question-list">
          <li class="question-item" v-for="(question, questionIndex) in website.submittedResult[index].result" :key="questionIndex">
            <p v-html="question.question" class="question-text"></p>
            <ul class="answer-list">
              <li
                :class="{
                  selected: answer.selected,
                  correct :  answer.correct === true,
                  incorrect : answer.correct === false,
                  correctAnswer: answer.selected && answer.correct,
                  incorrectAnswer: answer.selected && !answer.correct,
                }"
                v-for="(answer, answerIndex) in question.answers"
                :key="answerIndex"
                class="answer-item"
                v-html="answer.option"
              ></li>
            </ul>
          </li>
        </ul>
        <v-not-available-quiz v-else></v-not-available-quiz>
      </div>
</template>

<script lang="ts" setup>
  const website = useWebsiteStore();
  const props = defineProps(['index']);
  
</script>