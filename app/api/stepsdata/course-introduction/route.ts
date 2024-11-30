import { wait } from '@/lib/wait';
import { NextResponse } from 'next/server';


const stepData = {
    video: {
        href: "https://www.youtube.com/embed/SqcY0GlETPk?si=-OHCyzVVo4sxSZVE",
        start: 0,
        end: 115,
        heading: "Course Introduction"
    },
    activetab: "Description",
    tabs: [
        {
            template: "paragraph",
            name: "Description",
            data: "Welcome to the React tutorial! This comprehensive course is tailored for beginners and will take you through the fundamentals of React, a widely-used JavaScript library for building user interfaces. You will learn about components, props, state management, hooks, context API, and routing. Each lesson is filled with practical examples, hands-on projects, and clear explanations to help you understand the core concepts of React development. By the end of this course, you will have the skills and confidence to create your own dynamic web applications using React. Whether you're starting from scratch or looking to refresh your knowledge, this tutorial is the perfect starting point for your React journey!",
        },
        {
            template: "form-render",
            name: "Questianaire",
            data: [
                {
                    label: "What is the primary purpose of React?",
                    input: [
                        { index: "A)", name: "radio1", value: "To manage server-side data" },
                        { index: "B)", name: "radio1", value: "To build user interfaces" },
                        { index: "C)", name: "radio1", value: "To connect databases" },
                        { index: "D)", name: "radio1", value: "To write CSS" },
                    ]
                },
                {
                    label: "How Does ReactJS work?",
                    input: [
                        { index: "A)", name: "radio2", value: "Its One page web" },
                        { index: "B)", name: "radio2", value: "To build other pages" },
                        { index: "C)", name: "radio2", value: "To continue dom" },
                        { index: "D)", name: "radio2", value: "On server manage" },
                    ]
                },
                {
                    label: "How to Create a YouTube Clone Using React?",
                    input: [
                        { index: "A)", name: "radio3", value: "programming language" },
                        { index: "B)", name: "radio3", value: "React" },
                        { index: "C)", name: "radio3", value: "JavaScript" },
                        { index: "D)", name: "radio3", value: "web development" },
                    ]
                },
                {
                    label: "A Beginners Guide To React Props?",
                    input: [
                        { index: "A)", name: "radio4", value: "JavaScript library" },
                        { index: "B)", name: "radio4", value: "React's components" },
                        { index: "C)", name: "radio4", value: "understand its concepts" },
                        { index: "D)", name: "radio4", value: "mobile applications" },
                    ]
                }
            ],
        },
        {
            template: "notes",
            name: "Notes",
            data: [
                {
                    questions: "# Need to Read Paragraph",
                    answer: "Creating your first screen in React.js involves building a new component that represents a full page or view in your application. Start by creating a new file for the screen, typically inside a src/components or src/screens folder for better organization. For example, you can create a file named HomeScreen.js. Inside this file, define a functional component using React’s useState or useEffect hooks if needed. The component will return JSX that represents the UI for that screen. Once your screen component is created, import it into your main App.js file and include it in the JSX structure to display the screen. As your application grows, you can manage navigation between multiple screens using a router library like react-router-dom. This modular approach allows you to manage and render different screens dynamically as part of a larger React application.",

                },
                {
                    questions: "# Need to Read Paragraph",
                    answer: "Creating your first screen in React.js involves building a new component that represents a full page or view in your application. Start by creating a new file for the screen, typically inside a src/components or src/screens folder for better organization. For example, you can create a file named HomeScreen.js. Inside this file, define a functional component using React’s useState or useEffect hooks if needed. The component will return JSX that represents the UI for that screen. Once your screen component is created, import it into your main App.js file and include it in the JSX structure to display the screen. As your application grows, you can manage navigation between multiple screens using a router library like react-router-dom. This modular approach allows you to manage and render different screens dynamically as part of a larger React application.",

                }
            ]
        },
        {
            template: "formrender",
            name: "Games",
            data: [
                {
                    template: "dragable",
                    data: [
                        {
                            question: "What are the main phases of a React component's lifecycle?",
                            input: [
                                {
                                    id: 1,
                                    text: "componentDidMount"
                                },
                                {
                                    id: 2,
                                    text: "componentWillUnmount"
                                },
                                {
                                    id: 3,
                                    text: "componentDidUpdate"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};


export async function GET() {
    await wait(500);
    return NextResponse.json(stepData);
}
