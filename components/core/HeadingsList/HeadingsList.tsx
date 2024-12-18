import React from "react";

interface HeadingsListProps {
  toc: { text: string; level: number }[];
}

const HeadingsList: React.FC<HeadingsListProps> = ({ toc }) => {
  return (
    <div>
      <h2>Table of Contents</h2>
      <ul>
        {toc.map((heading, index) => (
          <li key={index} style={{ marginLeft: `${heading.level * 10}px` }}>
            {heading.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeadingsList;
