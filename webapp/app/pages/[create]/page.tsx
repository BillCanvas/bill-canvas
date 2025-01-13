"use client";

import React, { useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";

export default function DragAndDropPage() {
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const handleDragEnd = (event: any) => {
    const { delta } = event;
    setPosition((prev) => ({
      x: prev.x + delta.x,
      y: prev.y + delta.y,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <DndContext onDragEnd={handleDragEnd}>
        {/* Draggable Cube */}
        <DraggableCube position={position} />
      </DndContext>
    </div>
  );
}

function DraggableCube({ position }: { position: { x: number; y: number } }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "cube",
  });

  // Apply transform during the drag
  const dragStyle: React.CSSProperties = {
    transform: transform
      ? `translate(${position.x + transform.x}px, ${position.y + transform.y}px)`
      : `translate(${position.x}px, ${position.y}px)`,
    position: "absolute",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={dragStyle}
      className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center shadow-md cursor-move"
    >
      Drag Me
    </div>
  );
}