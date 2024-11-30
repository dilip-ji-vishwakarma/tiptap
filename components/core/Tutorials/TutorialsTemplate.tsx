import React from 'react';
import { Tab } from '../Tab';
import { Video } from '../Video';



type TutorialsTemplateProps = {
    data: any
};

export const TutorialsTemplate = ({ data}: TutorialsTemplateProps) => {
    return (
        <div className='bg-white w-full rounded-lg p-5 space-y-6' id='#reactjs'>
            <Video
                url={data.video.href}
                start={data.video.start}
                end={data.video.end}
                heading={data.video.heading} 
            />
            <Tab 
                data={data.tabs}
                activetab={data.activetab}
            />
        </div>
    );
};
