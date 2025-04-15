"use client";
import { motion, useAnimationFrame } from "framer-motion";
import {  useState } from "react";

function generateSquiggle({ phase = 0, amplitude = 1, segments = 24, width = 200, height = 32 }) {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * width;
    const y = height / 2 + Math.sin((i / segments) * Math.PI * 2 + phase) * amplitude;
    points.push({ x, y });
  }
  // Convert points to SVG path
  let d = `M${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev.x + curr.x) / 2;
    d += ` Q ${cx} ${prev.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export default function UnderlineMotion() {
  const [phase, setPhase] = useState(0);
  const [draw, setDraw] = useState(0); // for path drawing animation
  const width = 200;
  const height = 32;
  const amplitude = 8; // increased for more dramatic squiggle
  const segments = 24; // more segments for tighter squiggle

  // Animate the phase for the sin wave
  useAnimationFrame((t) => {
    setPhase((Math.PI * 2 * t) / 4000); // speed: 2 seconds per loop
    // Animate draw-in for first 1s
    if (draw < 1) {
      setDraw(Math.min(1, t / 4000)); // 1 second fade-in
    }
  });

  const d = generateSquiggle({ phase, amplitude, segments, width, height });

  return (
    <motion.svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      className="absolute left-1 right-0 bottom--1"
      preserveAspectRatio="none"
      style={{ display: "block" }}
    >
      <motion.path
  d={d}
  stroke="currentColor"
  strokeWidth="10"
  fill="transparent"
  strokeLinecap="round"
  className="text-primary"
  initial={{ pathLength: 0, opacity: 0 }}
  animate={{ pathLength: 1, opacity: 1 }}
  transition={{ duration: 1, ease: "easeInOut" }}
/>
    </motion.svg>
  );
}