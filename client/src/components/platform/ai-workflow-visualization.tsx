import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AIWorkflowVisualization() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const stages = [
      { duration: 2000, next: 1 },  // Ingestion
      { duration: 2000, next: 2 },  // Extraction
      { duration: 3000, next: 3 },  // Deep Analysis
      { duration: 2000, next: 4 },  // Research
      { duration: 2000, next: 5 },  // Reasoning
      { duration: 2000, next: 0 },  // Generation
    ];

    const timer = setTimeout(() => {
      setStage(stages[stage].next);
    }, stages[stage].duration);

    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-950/40 to-purple-950/40 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 600 500">
        <defs>
          {/* Gradients */}
          <linearGradient id="particleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.8" />
          </linearGradient>
          
          <radialGradient id="glowGrad">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#34D399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Stage 1: Document Ingestion - Documents float in and dissolve */}
        {stage === 0 && (
          <g>
            {[0, 1, 2].map((i) => (
              <motion.g
                key={`doc-${i}`}
                initial={{ opacity: 0, y: 50, x: 150 + i * 100 }}
                animate={{ opacity: [0, 1, 0], y: 200, x: 300 }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                <rect
                  x={-15}
                  y={-20}
                  width="30"
                  height="40"
                  rx="3"
                  fill="url(#particleGrad)"
                  opacity="0.6"
                />
                <line x1="-8" y1="-10" x2="8" y2="-10" stroke="white" strokeWidth="1" opacity="0.4" />
                <line x1="-8" y1="0" x2="8" y2="0" stroke="white" strokeWidth="1" opacity="0.4" />
                <line x1="-8" y1="10" x2="8" y2="10" stroke="white" strokeWidth="1" opacity="0.4" />
              </motion.g>
            ))}
            
            {/* Particles appearing */}
            {[...Array(20)].map((_, i) => (
              <motion.circle
                key={`particle-in-${i}`}
                cx={300 + (Math.random() - 0.5) * 100}
                cy={200 + (Math.random() - 0.5) * 100}
                r={2}
                fill="#60A5FA"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.8, 0.8], scale: [0, 1, 1] }}
                transition={{ duration: 2, delay: 1 + i * 0.05 }}
              />
            ))}
          </g>
        )}

        {/* Stage 2: Extraction - Particles cluster into organized groups */}
        {stage === 1 && (
          <g>
            {/* Text cluster */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const radius = 40;
              return (
                <motion.circle
                  key={`text-${i}`}
                  cx={200}
                  cy={200}
                  r={3}
                  fill="#60A5FA"
                  initial={{ cx: 300, cy: 250 }}
                  animate={{ 
                    cx: 200 + Math.cos(angle) * radius,
                    cy: 200 + Math.sin(angle) * radius,
                    opacity: [0, 1]
                  }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              );
            })}

            {/* Data cluster */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const radius = 40;
              return (
                <motion.rect
                  key={`data-${i}`}
                  x={400 + Math.cos(angle) * radius - 3}
                  y={200 + Math.sin(angle) * radius - 3}
                  width="6"
                  height="6"
                  rx="1"
                  fill="#A78BFA"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                />
              );
            })}

            {/* Images cluster */}
            {[...Array(6)].map((_, i) => {
              const angle = (i / 6) * Math.PI * 2;
              const radius = 35;
              return (
                <motion.circle
                  key={`image-${i}`}
                  cx={300 + Math.cos(angle) * radius}
                  cy={350 + Math.sin(angle) * radius}
                  r={4}
                  fill="#34D399"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 1, delay: 1 + i * 0.1 }}
                />
              );
            })}
          </g>
        )}

        {/* Stage 3: Deep Analysis - Neural network connections form */}
        {stage === 2 && (
          <g>
            {/* Nodes */}
            {[
              { x: 150, y: 150 }, { x: 250, y: 100 }, { x: 350, y: 150 },
              { x: 450, y: 150 }, { x: 200, y: 250 }, { x: 300, y: 250 },
              { x: 400, y: 250 }, { x: 250, y: 350 }, { x: 350, y: 350 }
            ].map((node, i) => (
              <g key={`node-${i}`}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="25"
                  fill="url(#glowGrad)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="8"
                  fill="url(#particleGrad)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0.7, 1],
                    scale: [0, 1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
              </g>
            ))}

            {/* Connections */}
            {[
              [150, 150, 250, 100], [250, 100, 350, 150], [350, 150, 450, 150],
              [150, 150, 200, 250], [250, 100, 300, 250], [350, 150, 400, 250],
              [200, 250, 300, 250], [300, 250, 400, 250],
              [200, 250, 250, 350], [300, 250, 350, 350], [400, 250, 350, 350]
            ].map((line, i) => (
              <motion.line
                key={`conn-${i}`}
                x1={line[0]}
                y1={line[1]}
                x2={line[2]}
                y2={line[3]}
                stroke="url(#connectionGrad)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1],
                  opacity: [0, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 1.5,
                  delay: 0.5 + i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </g>
        )}

        {/* Stage 4: Research Phase - External data flows in */}
        {stage === 3 && (
          <g>
            {/* Central processing hub */}
            <motion.circle
              cx="300"
              cy="250"
              r="40"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.circle
              cx="300"
              cy="250"
              r="15"
              fill="url(#particleGrad)"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />

            {/* Web icon - top */}
            <motion.g
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <circle cx="300" cy="100" r="30" fill="#A78BFA" opacity="0.2" />
              <circle cx="300" cy="100" r="15" fill="#A78BFA" opacity="0.4" />
              <text x="300" y="108" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">🌐</text>
            </motion.g>

            {/* Knowledge base icon - bottom */}
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <circle cx="300" cy="400" r="30" fill="#34D399" opacity="0.2" />
              <circle cx="300" cy="400" r="15" fill="#34D399" opacity="0.4" />
              <text x="300" y="408" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">📚</text>
            </motion.g>

            {/* Data streams from web */}
            {[...Array(5)].map((_, i) => (
              <motion.line
                key={`web-stream-${i}`}
                x1="300"
                y1="130"
                x2="300"
                y2="210"
                stroke="#A78BFA"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1],
                  opacity: [0, 0.6, 0]
                }}
                transition={{ 
                  duration: 1,
                  delay: 0.5 + i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            ))}

            {/* Data streams from knowledge base */}
            {[...Array(5)].map((_, i) => (
              <motion.line
                key={`kb-stream-${i}`}
                x1="300"
                y1="370"
                x2="300"
                y2="290"
                stroke="#34D399"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1],
                  opacity: [0, 0.6, 0]
                }}
                transition={{ 
                  duration: 1,
                  delay: 0.8 + i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            ))}
          </g>
        )}

        {/* Stage 5: Reasoning - Decision tree lights up */}
        {stage === 4 && (
          <g>
            {/* Root decision */}
            <motion.circle
              cx="300"
              cy="100"
              r="20"
              fill="#60A5FA"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5 }}
            />

            {/* Decision branches */}
            {[
              // First level
              { from: [300, 120], to: [200, 200], active: true },
              { from: [300, 120], to: [400, 200], active: true },
              // Second level - left branch
              { from: [200, 220], to: [150, 300], active: true },
              { from: [200, 220], to: [250, 300], active: false },
              // Second level - right branch
              { from: [400, 220], to: [350, 300], active: false },
              { from: [400, 220], to: [450, 300], active: true },
              // Third level
              { from: [150, 320], to: [130, 400], active: true },
              { from: [150, 320], to: [170, 400], active: false },
              { from: [450, 320], to: [430, 400], active: false },
              { from: [450, 320], to: [470, 400], active: true },
            ].map((branch, i) => (
              <motion.line
                key={`branch-${i}`}
                x1={branch.from[0]}
                y1={branch.from[1]}
                x2={branch.to[0]}
                y2={branch.to[1]}
                stroke={branch.active ? "#34D399" : "#60A5FA"}
                strokeWidth={branch.active ? "3" : "2"}
                opacity={branch.active ? 0.8 : 0.3}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            ))}

            {/* Decision nodes */}
            {[
              { x: 200, y: 200, active: true },
              { x: 400, y: 200, active: true },
              { x: 150, y: 300, active: true },
              { x: 250, y: 300, active: false },
              { x: 350, y: 300, active: false },
              { x: 450, y: 300, active: true },
              { x: 130, y: 400, active: true },
              { x: 170, y: 400, active: false },
              { x: 430, y: 400, active: false },
              { x: 470, y: 400, active: true },
            ].map((node, i) => (
              <motion.circle
                key={`decision-${i}`}
                cx={node.x}
                cy={node.y}
                r={node.active ? "12" : "8"}
                fill={node.active ? "#34D399" : "#60A5FA"}
                opacity={node.active ? 1 : 0.4}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: node.active ? 1 : 0.4,
                  scale: node.active ? [0, 1.2, 1] : 1
                }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              />
            ))}

            {/* Central insight node at bottom */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <circle cx="300" cy="450" r="35" fill="url(#glowGrad)" opacity="0.6" />
              <circle cx="300" cy="450" r="20" fill="#34D399" />
              <motion.circle
                cx="300"
                cy="450"
                r="20"
                fill="none"
                stroke="#34D399"
                strokeWidth="2"
                animate={{ r: [20, 30], opacity: [0.8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.g>
          </g>
        )}

        {/* Stage 6: Generation - Outputs materialize */}
        {stage === 5 && (
          <g>
            {/* Central source */}
            <motion.circle
              cx="300"
              cy="250"
              r="30"
              fill="#34D399"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            />

            {/* Document output - top left */}
            <motion.g
              initial={{ opacity: 0, x: 300, y: 250 }}
              animate={{ opacity: 1, x: 150, y: 150 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <rect x="-25" y="-35" width="50" height="70" rx="4" fill="#60A5FA" opacity="0.8" />
              <line x1="-15" y1="-20" x2="15" y2="-20" stroke="white" strokeWidth="2" />
              <line x1="-15" y1="-5" x2="15" y2="-5" stroke="white" strokeWidth="2" />
              <line x1="-15" y1="10" x2="15" y2="10" stroke="white" strokeWidth="2" />
              <motion.circle
                cx="0"
                cy="0"
                r="40"
                fill="none"
                stroke="#34D399"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: [0.8, 0] }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.g>

            {/* Database update - top right */}
            <motion.g
              initial={{ opacity: 0, x: 300, y: 250 }}
              animate={{ opacity: 1, x: 450, y: 150 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <ellipse cx="0" cy="-20" rx="30" ry="10" fill="#A78BFA" opacity="0.8" />
              <rect x="-30" y="-20" width="60" height="30" fill="#A78BFA" opacity="0.8" />
              <ellipse cx="0" cy="10" rx="30" ry="10" fill="#A78BFA" opacity="0.8" />
              <motion.path
                d="M -10 -5 L -5 0 L 5 -10"
                stroke="#34D399"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
            </motion.g>

            {/* Report generation - bottom */}
            <motion.g
              initial={{ opacity: 0, x: 300, y: 250 }}
              animate={{ opacity: 1, x: 300, y: 380 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <rect x="-35" y="-30" width="70" height="60" rx="4" fill="#34D399" opacity="0.2" />
              <rect x="-35" y="-30" width="70" height="60" rx="4" fill="none" stroke="#34D399" strokeWidth="2" />
              {[0, 1, 2, 3].map((i) => (
                <motion.line
                  key={`report-line-${i}`}
                  x1="-25"
                  y1={-15 + i * 12}
                  x2="25"
                  y2={-15 + i * 12}
                  stroke="#34D399"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
                />
              ))}
            </motion.g>

            {/* Connection lines */}
            {[
              [300, 250, 150, 150],
              [300, 250, 450, 150],
              [300, 250, 300, 380]
            ].map((line, i) => (
              <motion.line
                key={`gen-line-${i}`}
                x1={line[0]}
                y1={line[1]}
                x2={line[2]}
                y2={line[3]}
                stroke="#34D399"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              />
            ))}
          </g>
        )}
      </svg>

      {/* Stage Labels */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <motion.p 
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-white/70 text-sm font-medium"
        >
          {[
            "Ingesting documents...",
            "Extracting knowledge...",
            "Deep analysis & connections...",
            "Researching context...",
            "Reasoning & decision making...",
            "Generating outputs..."
          ][stage]}
        </motion.p>
      </div>
    </div>
  );
}
