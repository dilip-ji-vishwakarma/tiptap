"use client";
import React, { useEffect, useState } from "react";

interface ToolTipProps {
    title: string;
    children: React.ReactNode;
}

export const ToolTip = ({ title, children }: ToolTipProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleMouseEnter = (e: React.MouseEvent) => {
        setIsHovered(true);
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
            top: rect.top + window.scrollY - 40, // Adjust top position
            left: rect.left + window.scrollX + rect.width / 2, // Centered horizontally
        });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    if (!isMounted) return null;

    return (
        <>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ display: "inline-block" }} // Ensure the element is inline for correct positioning
            >
                {children}
            </div>

            {isHovered && (
                <div
                    style={{
                        position: "absolute",
                        top: position.top,
                        left: position.left,
                        transform: "translateX(-50%)", // Center the tooltip horizontally
                        backgroundColor: "black",
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        whiteSpace: "nowrap",
                        zIndex: 9999, // Ensure the tooltip is on top
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.2s",
                    }}
                >
                    {title}
                </div>
            )}
        </>
    );
};
