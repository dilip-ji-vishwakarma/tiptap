import { wait } from '@/lib/wait';
import { NextResponse } from 'next/server';

const steps = [
    {
        step: "1",
        label: "Course Introduction",
        duration: "00:00:00",
        entity: "/api/stepsdata/course-introduction",
        template: "tutorial-template",
        method: "GET",
        start: true
    },
    {
        step: "2",
        label: "Prerequisites",
        duration: "00:01:55",
        entity: "/api/stepsdata/prerequisites",
        method: "GET",
        template: "tutorial-template"
    },
    {
        step: "3",
        label: "What is React?",
        duration: "00:02:43",
        entity: "/api/stepsdata/what-is-react",
        method: "GET",
        template: "tutorial-template"
    },
    {
        step: "4",
        label: "Development Environment",
        duration: "00:04:57",
        entity: "/api/stepsdata/development-environment",
        method: "GET",
        template: "tutorial-template"
    },
    {
        step: "5",
        label: "Creating a React App",
        duration: "00:06:24",
        entity: "/api/stepsdata/creating-react-app",
        method: "GET",
        template: "tutorial-template"
    },
    {
        step: "6",
        label: "Project Structure",
        duration: "00:09:17",
        entity: "/api/stepsdata/project-structure",
        method: "GET",
        template: "tutorial-template"
    },
    {
        step: "7",
        label: "Creating a React Component",
        duration: "00:11:20",
        entity: "/api/stepsdata/creating-react-component",
        method: "GET",
        template: "tutorial-template"
    },
    {
        step: "8",
        label: "How React Works",
        duration: "00:16:41",
        entity: "/api/stepsdata/how-react-works",
        method: "GET",
        template: "tutorial-template",
        end: true
    }
]

export async function GET() {
    await wait(500);
    return NextResponse.json(steps);
}