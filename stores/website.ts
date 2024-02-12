import { Difficulty, type CategoryInterface, type QuizInterface, type Result, type CategoryListInterface, type MyQuizSchemaInterface, type singleAnswer, type StoreInterface } from "~/types";

const DEFAULT_SELECTED_CATEGORY : CategoryInterface = {
  id : 9,
  name : "General Knowledge"
}
export const useWebsiteStore = defineStore('websiteStore', {
    state: () : StoreInterface => ({
      status : {
        loading : true,
        message : "",
      },
      selectedOption : {
        difficulty : Difficulty.Easy,
        category : DEFAULT_SELECTED_CATEGORY,
      },
      result : [],
      difficultyList : [Difficulty.Easy,Difficulty.Medium,Difficulty.Hard],
      categoryList : [],
      submittedResult : [],
      
    }),
    persist: {
      storage: persistedState.localStorage,
    },
    getters : {
      getMyRank : (state) : Function => {

        return (index = 0) : {rank : number,percentage : number,success : boolean} => {
          // Sort the submittedResult array
          if (!state.submittedResult[index]) {
            return { rank: -1, percentage: 0, success: false };
          }
          if (state.submittedResult.length === 0) {
            return { rank: -1, percentage: 0, success: false };
          }

          const sortedResults = [...state.submittedResult].sort(
            (a, b) =>  a.score - b.score
          );

          const rank = sortedResults
            .map((result) => result.score)
            .indexOf(
              state.submittedResult[index].score
            );

          let percentage = ((rank + 1) / state.submittedResult.length) * 100;
          percentage = parseFloat(percentage.toFixed(2));

          return { rank, percentage, success: true };
          }
        }
        
    }, 
    actions: {
      selectSignleOption(QuestionIndex : number, answerIndex : number) {
        console.log(QuestionIndex,answerIndex);
        
        this.result[QuestionIndex].answers = this.result[QuestionIndex].answers.map((answer,index) : singleAnswer => {
          return {
            ...answer,
            selected : answerIndex === index 
          }
        })
      },
      selectCategory(category : CategoryInterface) {
        this.selectedOption.category = category ;
      },
      selectDifficulty(difficulty : Difficulty) {
        this.selectedOption.difficulty = difficulty ;
      },
      submitResult(score : number) {
        console.log("yooo",score);
        this.submittedResult = [...this.submittedResult,{score : score,result : [...this.result]}]
      },
      async fetchCategory() {
        // fetch for the list of category
        this.status.loading = true ;
        try {
          const _categoryList : CategoryListInterface = await $fetch<CategoryListInterface>('https://opentdb.com/api_category.php');
          this.categoryList = _categoryList.trivia_categories ;
          this.status.message = "";
        } catch(e) {
          this.status.message = "Unable to load quiz from the api please refrech"
        } finally {
          this.status.loading = false ;
        }
      },

      async fetchQuizs() {
        this.status.loading = true;  
       
        try {
          const response : QuizInterface = await $fetch<QuizInterface>(`https://opentdb.com/api.php?amount=10&type=multiple&category=${this.selectedOption.category.id}&difficulty=${this.selectedOption.difficulty}`);
          this.result = response.results.map((question) : MyQuizSchemaInterface  => {
            return {
              type : question.type,
              question : question.question,
              category : question.category,
              difficulty : question.difficulty,
              answers : shuffle([{
                correct : true,
                option : question.correct_answer,
                selected : false
              },...question.incorrect_answers.map((incorrect_answers) => ({
                correct : false,
                selected : false,
                option : incorrect_answers
              }))])
            }
          }) ;
          
          this.status.message = this.result.length === 0 ? "The current selected settings is unavailable please try again with an other category or difficulty": "" ;
          
        } catch (error : any) {
          this.status.message = "Unable to load quiz from the api please refrech" ;
        } finally {
          this.status.loading = false ;
        }

      }
    }
  })