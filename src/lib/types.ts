export interface OMRCalculationData {
        raw_marks: number[];
        raw_marks_alpha: number[];
        total_marks: number;
        right_questions: number;
        wrong_questions: number;
        unattempted_questions: number;
        raw_movingSum_marks: number[];
        movingSum_object: {
          question: number;
          Marks: number;
        }[];

}

export interface Test {
    id: string;
    name: string;
    testType: string;
    coaching: string | null;
    createdAt: Date;
}

export const SUBJECTS = [
  "Polity", 
  "Economy",
  "Ancient India",
  "Medieval India", 
  "Modern India",
  "Art and Culture", 
  "Science & Tech", 
  "Environment", 
  "Geography",
  "Map",
  "IR", 
  "Current Affairs", 
  "Comprehnsions", 
  "Quant", 
  "Reasoning"
]

export const SUBJECTCODES = [
  "P",
  "E", 
  "AI", 
  "MI",
  "MD",
  "AC", 
  "ST",
  "EN", 
  "G", 
  "M", 
  "IR", 
  "CA", 
  "CP", 
  "QU",
  "R" 
]