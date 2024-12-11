"use client"
import React, { useState, useEffect } from "react";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

StylesManager.applyTheme("defaultV2");

interface QuestionnaireData {
  title?: string;
  pages: {
    name: string;
    elements: Array<{
      type: string;
      name: string;
      title: string;
      choices?: string[];
      isRequired?: boolean;
    }>;
  }[];
}

export const DynamicQuestionnaire = ({ node, updateAttributes }:any) => {
  const [surveyModel, setSurveyModel] = useState<Model | null>(null);
  
  // Get the questionnaire data from node attributes
  const questionnaireData: QuestionnaireData | null = node.attrs.questionnaire;

  useEffect(() => {
    if (questionnaireData) {
      // Create survey model dynamically
      const survey = new Model({
        ...questionnaireData,
        showProgressBar: "top",
        progressBarType: "questions",
        widthMode: "static",
        width: "100%",
      });

      survey.onComplete.add((sender) => {
        console.log("Survey Results:", sender.data);
        // You can add additional logic here, like sending results to a backend
      });

      setSurveyModel(survey);
    }
  }, [questionnaireData]);

  // If no questionnaire data, show a placeholder
  if (!questionnaireData) {
    return (
      <NodeViewWrapper className="questionnaire-component">
        <div className="p-4 bg-yellow-100 text-yellow-800">
          No questionnaire data provided
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="questionnaire-component">
      <div className="relative bg-gray-100 p-4">
        {surveyModel && <Survey model={surveyModel} />}
      </div>
      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};