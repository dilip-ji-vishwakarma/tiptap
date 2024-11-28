// components/SurveyComponent.tsx
"use client";

import React from "react";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

// Apply SurveyJS modern theme
StylesManager.applyTheme("defaultV2");

const surveyJson = {
    pages: [
        {
            name: "page1",
            elements: [
                {
                    type: "text",
                    name: "name",
                    title: "What's your name?",
                    isRequired: true,
                    maxLength: 100,
                },
                {
                    type: "dropdown",
                    name: "experience",
                    title: "How many years of experience do you have with React.js?",
                    isRequired: true,
                    choices: [
                        { value: "0-1", text: "0-1 years" },
                        { value: "1-3", text: "1-3 years" },
                        { value: "3-5", text: "3-5 years" },
                        { value: "5+", text: "5+ years" },
                    ],
                },
                {
                    type: "radiogroup",
                    name: "learning-source",
                    title: "How did you learn React.js?",
                    choices: [
                        "Online tutorials (YouTube, blogs, etc.)",
                        "Bootcamp",
                        "Self-taught via documentation",
                        "Formal education (college/university)",
                    ],
                    showOtherItem: true,
                    otherText: "Other",
                },
            ],
        },
        {
            name: "page2",
            elements: [
                {
                    type: "matrix",
                    name: "react-usage",
                    title: "How frequently do you use the following React.js features?",
                    columns: [
                        "Never",
                        "Rarely",
                        "Sometimes",
                        "Often",
                        "Always",
                    ],
                    rows: [
                        { text: "Hooks (e.g., useState, useEffect)", value: "hooks" },
                        { text: "Context API", value: "context-api" },
                        { text: "React Router", value: "react-router" },
                        { text: "Redux or other state libraries", value: "state-libraries" },
                        { text: "Custom Hooks", value: "custom-hooks" },
                    ],
                },
                {
                    type: "boolean",
                    name: "use-typescript",
                    title: "Do you use TypeScript with React?",
                },
                {
                    type: "comment",
                    name: "typescript-advantage",
                    visibleIf: "{use-typescript} = true",
                    title: "What do you think is the biggest advantage of using TypeScript with React?",
                },
            ],
        },
        {
            name: "page3",
            elements: [
                {
                    type: "rating",
                    name: "react-satisfaction",
                    title: "How satisfied are you with React.js as a front-end library?",
                    minRateDescription: "Not satisfied",
                    maxRateDescription: "Very satisfied",
                },
                {
                    type: "comment",
                    name: "improvements",
                    title: "What improvements would you like to see in React.js?",
                    maxLength: 300,
                },
                {
                    type: "radiogroup",
                    name: "component-type",
                    title: "Which do you prefer to use in React?",
                    choices: [
                        "Functional components",
                        "Class components",
                        "Both equally",
                    ],
                },
            ],
        },
        {
            name: "page4",
            elements: [
                {
                    type: "ranking",
                    name: "react-priorities",
                    title: "Rank the following React.js priorities for your projects.",
                    description: "Drag and drop to reorder.",
                    choices: [
                        "Performance optimization",
                        "Code reusability",
                        "Scalability",
                        "Developer experience",
                        "Integration with other tools",
                    ],
                },
                {
                    type: "text",
                    name: "favorite-library",
                    title: "What is your favorite third-party library to use with React.js?",
                },
            ],
        },
        {
            name: "page5",
            elements: [
                {
                    type: "radiogroup",
                    name: "state-management",
                    title: "What is your preferred state management solution?",
                    choices: [
                        "Redux",
                        "Context API",
                        "MobX",
                        "Recoil",
                        "Zustand",
                    ],
                    showOtherItem: true,
                    otherText: "Other",
                },
                {
                    type: "boolean",
                    name: "server-side-rendering",
                    title: "Have you used server-side rendering (SSR) with React?",
                },
                {
                    type: "text",
                    name: "ssr-tool",
                    visibleIf: "{server-side-rendering} = true",
                    title: "Which SSR tool do you prefer? (e.g., Next.js, Remix, etc.)",
                },
            ],
        },
    ],
    showProgressBar: "top",
    progressBarType: "questions",
    widthMode: "static",
    width: "864px",
};

export const Questionnaire = () => {
    const survey = new Model(surveyJson);

    survey.onComplete.add((sender) => {
        console.log("Survey Results:", sender.data);
    });

    return (
        <NodeViewWrapper className="questionnaire-component">
            <div className="relative h-screen bg-gray-100">
                <Survey model={survey} />
            </div>
            <NodeViewContent className="content" />
        </NodeViewWrapper>
    );
};

