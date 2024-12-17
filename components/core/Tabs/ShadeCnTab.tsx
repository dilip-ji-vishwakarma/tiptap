import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ShadeCnTab = ({ node, updateAttributes }: any) => {
    // Initialize state to store the tab content
    const [tabContent, setTabContent] = useState({
        description: node.attrs?.tabsContent?.description || "Make changes to your account here.",
        notes: node.attrs?.tabsContent?.notes || "Change your password here.",
        questionnaire: node.attrs?.tabsContent?.questionnaire || "Answer the questions here."
    });

    // Function to handle content change
    const handleContentChange = (tab: string, value: string) => {
        console.log(`Updating ${tab} with value: ${value}`);
        setTabContent(prevContent => ({
            ...prevContent,
            [tab]: value
        }));
    };
    

    useEffect(() => {
        console.log("Tab content updated:", tabContent);
        updateAttributes({
            tabsContent: tabContent // Pass the updated content to the parent
        });
    }, [tabContent, updateAttributes]); // Only run when tabContent changes
    

    return (
        <Tabs defaultValue="description">
            <TabsList className="w-full justify-between">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="questionnaire">Questionnaire</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
                <textarea
                    value={tabContent.description}
                    onChange={(e) => handleContentChange('description', e.target.value)}
                    className="w-full p-2 border"
                    placeholder="Edit Description"
                />
            </TabsContent>

            <TabsContent value="notes">
                <textarea
                    value={tabContent.notes}
                    onChange={(e) => handleContentChange('notes', e.target.value)}
                    className="w-full p-2 border"
                    placeholder="Edit Notes"
                />
            </TabsContent>

            <TabsContent value="questionnaire">
                <textarea
                    value={tabContent.questionnaire}
                    onChange={(e) => handleContentChange('questionnaire', e.target.value)}
                    className="w-full p-2 border"
                    placeholder="Edit Questionnaire"
                />
            </TabsContent>
        </Tabs>
    );
};
