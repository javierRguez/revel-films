"use client";
import { useRef, useState } from "react";

interface DraggableSectionProps {
  children: React.ReactNode;
}
const DraggableSection: React.FC<DraggableSectionProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const mouseCoords = useRef({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const slider: any = containerRef.current.children[0];
    const startX = e.pageX - slider.offsetLeft;
    const startY = e.pageY - slider.offsetTop;
    const scrollLeft = slider.scrollLeft;
    const scrollTop = slider.scrollTop;
    mouseCoords.current = { startX, startY, scrollLeft, scrollTop };
    setIsMouseDown(true);
    document.body.style.cursor = "grabbing";
  };

  const handleDragEnd = () => {
    setIsMouseDown(false);
    if (!containerRef.current) return;
    document.body.style.cursor = "default";
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !containerRef.current) return;
    e.preventDefault();
    const slider: any = containerRef.current.children[0];
    const x = e.pageX - slider.offsetLeft;
    const y = e.pageY - slider.offsetTop;
    const walkX = (x - mouseCoords.current.startX) * 1.5;
    const walkY = (y - mouseCoords.current.startY) * 1.5;
    slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
    slider.scrollTop = mouseCoords.current.scrollTop - walkY;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDrag}
    >
      {children}
    </div>
  );
};

export default DraggableSection;
