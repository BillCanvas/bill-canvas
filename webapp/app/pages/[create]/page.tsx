"use client";

import React, { useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import Link from "next/link";

// Define Cube Type
interface Cube {
  id: number;
  position: { x: number; y: number };
}

export default function DragAndDropPage() {
  const [cubes, setCubes] = useState<Cube[]>([
    { id: 1, position: { x: 100, y: 100 } },
  ]);

  const handleDragEnd = (event: any) => {
    const { delta } = event;

    if (!delta) return; // Ensure delta exists to avoid undefined errors

    setCubes((prev) =>
      prev.map((cube) => {
        // Find the cube being dragged using its id
        if (`cube-${cube.id}` === event.active.id) {
          return {
            ...cube,
            position: {
              x: cube.position.x + delta.x,
              y: cube.position.y + delta.y,
            },
          };
        }
        return cube;
      })
    );
  };

  const addCube = () => {
    const id = Date.now();
    const randomPosition = {
      x: Math.floor(Math.random() * 300) + 50,
      y: Math.floor(Math.random() * 300) + 50,
    };

    setCubes((prev) => [...prev, { id, position: randomPosition }]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 p-4 bg-gray-800 text-white border-r border-gray-600">
        <h2 className="text-xl font-bold mb-4">Toolbox</h2>
        <Link href="/" className="flex p-5 hover:text-blue-500 transition-all duration-300">Home</Link>
        <button
          onClick={addCube}
          className="block w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Cube
        </button>
      </div>

      {/* Main Canvas */}
      <div className="flex-grow relative">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="relative w-full h-full bg-white border border-gray-300">
            {cubes.map((cube) => (
              <DraggableCube key={cube.id} cube={cube} />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}

function DraggableCube({ cube }: { cube: Cube }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `cube-${cube.id}`,
  });

  const dragStyle: React.CSSProperties = {
    transform: transform
      ? `translate(${cube.position.x + transform.x}px, ${
          cube.position.y + transform.y
        }px)`
      : `translate(${cube.position.x}px, ${cube.position.y}px)`,
    position: "absolute",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={dragStyle}
      className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center hover:shadow-md cursor-move"
    >
      Drag Me
    </div>
  );
}
