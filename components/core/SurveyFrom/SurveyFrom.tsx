"use client"
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";



const creatorOptions = {
  // ...
};

export const SurveyFrom = () => {
  const creator = new SurveyCreator(creatorOptions);
  return <SurveyCreatorComponent creator={creator} />;
}