"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  id?: string;
  isBody?: boolean;
}

export const Portal: React.FC<PortalProps> = ({ children, id, isBody }) => {
  const [currentElement, setCurrentElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (id) {
      const el = document?.getElementById(id);
      setCurrentElement(el);
    }
    if (isBody) {
      const el = document?.body;
      setCurrentElement(el);
    }
  }, []);

  if (!id && !isBody) {
    return children;
  }

  if (!currentElement) {
    return children;
  }

  return ReactDOM.createPortal(children, currentElement);
};
