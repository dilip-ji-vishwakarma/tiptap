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

export const DynamicQuestionnaire = ({ node, updateAttributes }: any) => {
  const [surveyModel, setSurveyModel] = useState<Model | null>(null);
  const [jsonInput, setJsonInput] = useState<string>('');
  const [parseError, setParseError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Get the questionnaire data from node attributes
  const questionnaireData: QuestionnaireData | null = node.attrs.questionnaire;

  useEffect(() => {
    if (questionnaireData) {
      createSurveyModel(questionnaireData);
    }
  }, [questionnaireData]);

  const createSurveyModel = (data: QuestionnaireData) => {
    try {
      const survey = new Model({
        ...data,
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
      setParseError(null);
    } catch (error) {
      setParseError('Invalid survey JSON');
      setSurveyModel(null);
    }
  };

  const handleJsonSubmit = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);

      // Basic validation
      if (!parsedJson.pages || !Array.isArray(parsedJson.pages)) {
        throw new Error('Invalid JSON structure');
      }

      // Update attributes with new JSON
      updateAttributes({
        questionnaire: parsedJson
      });

      // Create survey model
      createSurveyModel(parsedJson);

      // Exit editing mode
      setIsEditing(false);
    } catch (error) {
      setParseError('Invalid JSON: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  // If no questionnaire data, show a placeholder or input
  if (!questionnaireData || isEditing) {
    return (
      <NodeViewWrapper className="questionnaire-component">
        <div className="p-4 bg-gray-100 border rounded">
          <textarea
            className="w-full p-2 border rounded mb-2"
            rows={10}
            placeholder='Paste your survey JSON here. Example:
{
      "name": "page1",
      "elements": [
        {
          "type": "dropdown",
          "name": "question1",
          "title": "What is Dilip",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Dilip"
            },
            {
              "value": "Item 2",
              "text": "Bablu"
            },
            {
              "value": "Item 3",
              "text": "Rashmi"
            }
          ]
        }
      ]
    }'
            value={jsonInput}
            onChange={(e) => {
              setJsonInput(e.target.value);
              setParseError(null);
            }}
          />
          {parseError && (
            <div className="text-red-500 mb-2">
              {parseError}
            </div>
          )}
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleJsonSubmit}
            >
              Create Survey
            </button>
            {questionnaireData && (
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="questionnaire-component relative">
      <button
        className="absolute top-2 right-2 bg-gray-200 px-2 py-1 rounded text-xs z-10"
        onClick={() => setIsEditing(true)}
      >
        Edit JSON
      </button>
      <div className="relative bg-gray-100 p-4 rounded">
        {surveyModel && <Survey model={surveyModel} />}
      </div>
      <NodeViewContent className="content" />
    </NodeViewWrapper>
  );
};