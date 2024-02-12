  <template>
    <main class="grid-quiz-main">
      <header class="header">
        <v-header></v-header>
      </header>

      <div class="main">
        <div v-if="website.status.loading === true" class="container refrech">
          <p>loading...</p>
        </div>
        <div v-else-if="website.status.loading === false && website.status.message !== ''" class="container refrech">
            <p>{{ website.status.message }}</p>
            <v-button :onClick="() => website.fetchQuizs()" :isDisabled="currentQuestionIndex === website.result.length - 1">Refrech</v-button>
        </div>
        <div  v-if="website.status.loading === false && website.status.message === ''" id="quizContainer" class="container">
          <h1>Quiz Questions</h1>
          <p class="question-position">{{ currentQuestionIndex + 1 }} / {{ website.result.length }}</p>
          <ul class="question-list">
            <li v-if="currentQuestionIndex >= 0 && currentQuestionIndex < website.result.length"
                :key="currentQuestionIndex" class="question-item">
              <p v-html="website.result[currentQuestionIndex].question" class="question-text"></p>
              <ul class="answer-list">
                <li
                  @click="website.selectSignleOption(currentQuestionIndex, answerIndex)"
                  :class="{ selected: answer.selected }"
                  v-for="(answer, answerIndex) in website.result[currentQuestionIndex].answers"
                  :key="answerIndex"
                  class="answer-item fade-in"
                  :style="{ animationDuration: '0.3s', animationDelay: `${0.1 * answerIndex}s` }"
                  v-html="answer.option"
                ></li>
              </ul>
            </li>
          </ul>
          <div class="navigation-buttons">
            <v-button :onClick="() => navigate(-1)" :class="{visible : currentQuestionIndex === 0}" :isDisabled="currentQuestionIndex === 0">Previous</v-button>
            <v-button :onClick="() => navigate(1)" :class="{visible : currentQuestionIndex === website.result.length - 1}"  :isDisabled="currentQuestionIndex === website.result.length - 1">Next</v-button>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-info">
            <p>Category&nbsp;: <br /> <span>{{ website.selectedOption.category.name }}</span></p>
            <p>Difficulty&nbsp;:<br /> <span>{{ website.selectedOption.difficulty }}</span></p>
          </div>
          <div class="footer-actions">
            <v-button :onClick="submitQuiz" additionalClass="primary" :isDisabled="( (currentQuestionIndex !== website.result.length - 1) || !checkIfOneSelected())">Submit</v-button>
          </div>
        </div>
      </footer>
    </main>
  </template>

  <script setup lang="ts">
  const website = useWebsiteStore();

  let currentQuestionIndex = ref<number>(0);
  let showResponse = ref<boolean>(false);


  onMounted(() =>{  
    website.fetchQuizs()
  })


  function checkIfOneSelected() {
    const selectedAnswers = website.result[currentQuestionIndex.value].answers.filter((answer) => {
      return answer.selected === true ;
    })

    return selectedAnswers.length !== 0 ;
  }

  function toggleUnselectedAnimtion(time : number) {
    let quizContainer = document.getElementById("quizContainer");
    let containClass = quizContainer?.classList.contains("unselectedOption") ;
    // if contain the class don't need to readd it again 
    if(!containClass) {
      quizContainer?.classList.add("unselectedOption");
      setTimeout(() => {
        quizContainer?.classList.remove("unselectedOption");
      }, time);
    }
  }

  function navigate(offset : number) {
    // if previous 
    if(offset < 0 ) {
      currentQuestionIndex.value += offset ;
    }
    // if next
    else {
      const isSelected = checkIfOneSelected();
      if(isSelected) {
      currentQuestionIndex.value += offset;
      } else {
        
        toggleUnselectedAnimtion(900);
      }
    }

    
  }


  async function submitQuiz() {
    // Logic to handle the submission of the quiz
    // Initialize the score
    const isSelected = checkIfOneSelected();
    if(!isSelected) {
      toggleUnselectedAnimtion(900);
      return ;
    }
      

    let score = 0;

    // Iterate through each question
    for (const question of website.result) {
      // Check if the question has a selected answer
      const selectedAnswer = question.answers.find((answer) => answer.selected);

      // If a selected answer is found, check if it's correct
      if (selectedAnswer) {
        if (selectedAnswer.correct) {
          // Increment the score for correct answers
          score++;
        }
      }
    }


    website.submitResult(score);
    
    await navigateTo("/score");
  }


  </script>


