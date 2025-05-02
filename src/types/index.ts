export interface QuestionInput {
    role: string;
    experience: "junior" | "mid" | "senior";
  }
  
  export interface GeneratedQuestion {
    question: string;
    difficulty: string;
    evaluationCriteria: string;
  }
  