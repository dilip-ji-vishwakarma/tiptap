"use client";

import React from "react";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

StylesManager.applyTheme("defaultV2");

const surveyJson = {
    pages: [
        {
            name: "page1",
            elements: [
                {
                    type: "radiogroup",
                    name: "learning-source",
                    title: "What does HTML stand for?",
                    choices: [
                        "Hot Typing Markup Language",
                        "Home Typing Modern Language",
                        "Hyper Text Markup Language",
                        "Home Testing Mixed Language",
                    ],
                },
            ],
        },
    ],
    showProgressBar: "top",
    progressBarType: "questions",
    widthMode: "static",
    width: "100%",
};

export const Questionnaire = () => {
    const survey = new Model(surveyJson);

    survey.onComplete.add((sender) => {
        console.log("Survey Results:", sender.data);
    });

    return (
        <NodeViewWrapper className="questionnaire-component">
            <div className="relative bg-gray-100">
                <Survey model={survey} />
            </div>
            <NodeViewContent className="content" />
        </NodeViewWrapper>
    );
};

