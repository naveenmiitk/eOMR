import examcongress from "../../public/coachings/examcongress.jpg";
import vision from "../../public/coachings/visionias.jpg";
import forum from "../../public/coachings/forumias.jpeg";
import insight from "../../public/coachings/insightias.jpg";
import understand from "../../public/coachings/understand.png";


export const coachingImageLinks = (coaching :string) => {
  const coachings = ["VisionIAS", "ForumIAS", "InsightIAS", "IASExamCongress", "UnderstandUPSC" ];
  const coachingsImages = [vision, forum, insight, examcongress, understand];
 
  const index = coachings.indexOf(coaching);
  if (index > -1) {
    return coachingsImages[index];
  }
  return vision;
};
