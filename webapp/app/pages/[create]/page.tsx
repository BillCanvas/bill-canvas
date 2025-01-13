"use client";

import React, { useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";

// Define Cube Type
interface Cube {
  id: number;
  x: number;
  y: number;
  color: string;
  content: string;
  css: Record<string, any>;
}

export default function CreatePage() {
  const [cubes, setCubes] = useState<Cube[]>([]);
  const [selectedCube, setSelectedCube] = useState<Cube | null>(null);

  const addCube = () => {
    const id = Date.now();
    setCubes((prevCubes) => [
      ...prevCubes,
      { id, x: 0, y: 0, color: "#FFD1DC", content: "", css: {} },
    ]);
  };

  const updateCube = (id: number, changes: Partial<Cube>) => {
    setCubes((prevCubes) =>
      prevCubes.map((cube) => (cube.id === id ? { ...cube, ...changes } : cube))
    );
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 p-4 bg-gray-800 text-white border-r border-gray-600">
        <h2 className="text-xl font-bold mb-4">Toolbox</h2>
        <button
          onClick={addCube}
          className="w-full px-4 py-2 mb-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Add Cube
        </button>

        {selectedCube && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Edit Cube</h3>
            <div>
              <label className="block text-sm font-medium">Color</label>
              <input
                type="color"
                value={selectedCube.color}
                onChange={(e) =>
                  updateCube(selectedCube.id, { color: e.target.value })
                }
                className="w-full mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Content</label>
              <input
                type="text"
                value={selectedCube.content}
                onChange={(e) =>
                  updateCube(selectedCube.id, { content: e.target.value })
                }
                className="w-full mt-1 px-2 py-1 border rounded text-gray-800"
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Canvas */}
      <div className="flex-grow relative bg-gray-100">
        <div className="absolute inset-0 grid grid-cols-12 gap-1 bg-gray-300">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 border border-gray-400"></div>
          ))}
        </div>

        <DndContext
          onDragEnd={(event) => {
            const { id, delta } = event.active.data.current || {};
            if (id !== undefined && delta) {
              setCubes((prevCubes) =>
                prevCubes.map((cube) =>
                  cube.id === id
                    ? {
                        ...cube,
                        x: Math.round((cube.x + delta.x) / 32) * 32,
                        y: Math.round((cube.y + delta.y) / 32) * 32,
                      }
                    : cube
                )
              );
            }
          }}
        >
          {cubes.map((cube) => (
            <DraggableCube
              key={cube.id}
              cube={cube}
              onSelect={() => setSelectedCube(cube)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}

// Draggable Cube Component
interface DraggableCubeProps {
  cube: Cube;
  onSelect: () => void;
}

function DraggableCube({ cube, onSelect }: DraggableCubeProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform: draggableTransform,
  } = useDraggable({
    id: cube.id,
  });

  const transform = draggableTransform ?? { x: 0, y: 0 };

  const style = {
    transform: `translate3d(${cube.x + transform.x}px, ${cube.y + transform.y}px, 0)`,
    backgroundColor: cube.color,
    color: "#000", // Ensure text in cubes is visible
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="absolute w-16 h-16 border border-gray-400 flex items-center justify-center cursor-move text-black"
      onClick={onSelect}
    >
      {cube.content}
    </div>
  );
}