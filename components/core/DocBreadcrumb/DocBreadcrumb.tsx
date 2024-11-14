import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Function to generate breadcrumbs from the path
const generateBreadcrumbs = (path: string) => {
    // Check if the path is valid
    if (!path) return []; // Return an empty array if path is not provided

    const paths = path.split("/").filter(Boolean); // Split the path into segments
    return paths.map((segment, index) => {
        const isLast = index === paths.length - 1; // Check if it's the last segment
        const href = "/" + paths.slice(0, index + 1).join("/"); // Construct the href

        return {
            label: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize first letter
            href,
            isLast,
        };
    });
};

// DocBreadcrumb component to render the breadcrumbs dynamically
export const DocBreadcrumb = ({ path }: { path: string }) => {
    const breadcrumbs = generateBreadcrumbs(path);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            {breadcrumb.isLast ? (
                                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={breadcrumb.href}>
                                    {breadcrumb.label}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
