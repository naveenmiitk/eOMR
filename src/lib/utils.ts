import { customAlphabet } from "nanoid";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { OMRCalculationData, SUBJECTCODES, Test } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");


export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const MultiplyFactor = (testType: string) => {
  if(testType === "General Studies") 
    return {
    positive : 2,
    negative  : Math.round(2/3*100)/100,
  }
  else if(testType === "CSAT") 
    return {
    positive : 2.5,
    negative  : Math.round(2.5/3*100)/100,
  }
  else
    return {
    positive : 2,
    negative  : Math.round(2/3*100)/100,
  }
}

export const checkAnswers = (answer: string[] , correctAnswer: string[], subject: string[], testType: string) => {
  // if(!answer) return;
  // if (answer.length !== correctAnswer.length) {
  //   return;
  // }
  const raw_marks:number[] = new Array(answer.length).fill(0);
  const raw_marks_alpha:number[] = new Array(answer.length).fill(0); //Without Multiply Factor.
  const subject_correct:number[] = new Array(SUBJECTCODES.length).fill(0);
  const subject_wrong:number[] = new Array(SUBJECTCODES.length).fill(0);
  const subject_unattempted:number[] = new Array(SUBJECTCODES.length).fill(0);
  
  const factor = MultiplyFactor(testType);
  const positive = factor.positive;
  const negative = factor.negative;


  for (let i = 0; i < answer.length; i++) {
      if(answer[i] === "0" ) {
        raw_marks[i] = 0;
        raw_marks_alpha[i] = 0;
        SUBJECTCODES.indexOf(subject[i]) > -1 ? subject_unattempted[SUBJECTCODES.indexOf(subject[i])]++ : subject_unattempted[SUBJECTCODES.indexOf(subject[i])]
      }else if(answer[i] !== correctAnswer[i]) {
        raw_marks[i] = -1*negative;
        raw_marks_alpha[i] = -1;
        SUBJECTCODES.indexOf(subject[i]) > -1 ? subject_wrong[SUBJECTCODES.indexOf(subject[i])]++ : subject_wrong[SUBJECTCODES.indexOf(subject[i])]
      }else if(answer[i] === correctAnswer[i]) {
        raw_marks[i] = 1*positive;
        raw_marks_alpha[i] = 1;
        SUBJECTCODES.indexOf(subject[i]) > -1 ? subject_correct[SUBJECTCODES.indexOf(subject[i])]++ : subject_correct[SUBJECTCODES.indexOf(subject[i])];
      } else {
        raw_marks[i] = 0;
        raw_marks_alpha[i] = 0;
        SUBJECTCODES.indexOf(subject[i]) > -1 ? subject_unattempted[SUBJECTCODES.indexOf(subject[i])]++ : subject_unattempted[SUBJECTCODES.indexOf(subject[i])]
      }
  }

  const total_marks = Math.round((raw_marks.reduce((a, b) => a + b, 0))*100)/100;
  const right_questions = raw_marks_alpha.reduce((a, b) => a + (b > 0 ? 1 : 0), 0);
  const wrong_questions = raw_marks_alpha.reduce((a, b) => a + (b < 0 ? 1 : 0), 0);
  const unattempted_questions = raw_marks_alpha.reduce((a, b) => a + (b === 0 ? 1 : 0), 0);

  const raw_movingSum_marks:number[] = new Array(raw_marks.length).fill(0);
  for (let i = 0; i < raw_marks.length; i++) {
      raw_movingSum_marks[i] = raw_marks.slice(0, i+1).reduce((a, b) => Math.round((a + b)*100)/100, 0);
  }

  let movingSum_object =[];

 
  for(let i = 0; i < raw_movingSum_marks.length; i++) {
    {
      movingSum_object.push({question: i+1, Marks: raw_movingSum_marks[i]});
    }
  }

  return {raw_marks, raw_marks_alpha, total_marks,right_questions, wrong_questions,unattempted_questions, raw_movingSum_marks, movingSum_object, subject_correct, subject_wrong, subject_unattempted};
}

export function compareCoaching(a:Test, b : Test) {
  if(a.coaching == null || b.coaching == null) return 0
  if (a.coaching < b.coaching) {
    return -1;
  } else if (a.coaching > b.coaching) {
    return 1;
  } else {
    // If coaching keys are equal, sort by id
    return a.createdAt.getTime() - b.createdAt.getTime();
  }
}


export function getTimeDifference(givenTime: string): string {
  // Get the current time
  const currentTime = new Date();

  // Parse the given time string into a Date object
  const givenTimeObject = new Date(givenTime);

  // Get the time difference in milliseconds
  const timeDiff = currentTime.getTime() - givenTimeObject.getTime();

  // Use Intl.RelativeTimeFormat for human-readable output
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  // Handle future and past times
  const isFuture = timeDiff > 0;
  const timeAmount = Math.abs(timeDiff);
  const timeUnit = "seconds"; 

  const formattedTimeUnit = formatter.format(timeAmount, timeUnit);
  const displayedTimeUnit = isFuture
    ? `in ${formattedTimeUnit}`
    : `${formattedTimeUnit} ago`;

 return displayedTimeUnit;
}


