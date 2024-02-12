export interface StoreInterface {
  status: {
    loading: boolean;
    message: string;
  };
  result: MyQuizSchemaInterface[];

  selectedOption: {
    difficulty: Difficulty;
    category: CategoryInterface;
  };
  difficultyList: Difficulty[];
  categoryList: CategoryInterface[];
  submittedResult: score[] | [];
}

export interface MyQuizSchemaInterface {
  type: Type;
  difficulty: Difficulty;
  category: string;
  question: string;
  answers: singleAnswer[];
}

export interface singleAnswer {
  option: string;
  correct: boolean;
  selected: boolean;
}

export interface QuizInterface {
  response_code: number;
  results: Result[];
}

export interface score {
  score: number;
  result: MyQuizSchemaInterface[];
}
export interface Result {
  type: Type;
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export enum Difficulty {
  Easy = "easy",
  Hard = "hard",
  Medium = "medium",
}

export enum Type {
  Multiple = "multiple",
}

export interface CategoryListInterface {
  trivia_categories: CategoryInterface[];
}

export interface CategoryInterface {
  id: number;
  name: string;
}
