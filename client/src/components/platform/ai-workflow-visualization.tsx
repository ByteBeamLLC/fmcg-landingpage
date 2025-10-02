import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function AIWorkflowVisualization() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const stages = [
      { duration: 2500, next: 1 },  // Ingestion
      { duration: 2500, next: 2 },  // Extraction
      { duration: 3000, next: 3 },  // Deep Analysis
      { duration: 2500, next: 4 },  // Research
      { duration: 2500, next: 5 },  // Reasoning
      { duration: 2500, next: 0 },  // Generation
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

        <AnimatePresence mode="wait">
          {/* Stage 0: Document Ingestion */}
          {stage === 0 && (
            <motion.g
              key="ingestion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Documents floating in */}
              {[0, 1, 2].map((i) => (
                <motion.g
                  key={`doc-${i}`}
                  initial={{ opacity: 0, y: 400, x: 150 + i * 150 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0], 
                    y: [400, 250, 250, 250],
                    x: [150 + i * 150, 300, 300, 300]
                  }}
                  transition={{ duration: 2, ease: "easeOut", times: [0, 0.3, 0.7, 1] }}
                >
                  <rect
                    x={-15}
                    y={-20}
                    width="30"
                    height="40"
                    rx="3"
                    fill="url(#particleGrad)"
                    opacity="0.7"
                  />
                  <line x1="-8" y1="-10" x2="8" y2="-10" stroke="white" strokeWidth="1.5" opacity="0.5" />
                  <line x1="-8" y1="0" x2="8" y2="0" stroke="white" strokeWidth="1.5" opacity="0.5" />
                  <line x1="-8" y1="10" x2="8" y2="10" stroke="white" strokeWidth="1.5" opacity="0.5" />
                </motion.g>
              ))}
              
              {/* Central collection point */}
              <motion.circle
                cx="300"
                cy="250"
                r="60"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1 }}
              />

              {/* Particles appearing */}
              {[...Array(15)].map((_, i) => {
                const angle = (i / 15) * Math.PI * 2;
                const radius = 50;
                return (
                  <motion.circle
                    key={`particle-in-${i}`}
                    cx={300 + Math.cos(angle) * radius}
                    cy={250 + Math.sin(angle) * radius}
                    r="3"
                    fill="#60A5FA"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + i * 0.05 }}
                  />
                );
              })}
            </motion.g>
          )}

          {/* Stage 1: Extraction - Organizing into clusters */}
          {stage === 1 && (
            <motion.g
              key="extraction"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Text cluster - top left */}
              <g>
                <motion.circle
                  cx="180"
                  cy="180"
                  r="50"
                  fill="#60A5FA"
                  opacity="0.1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
                {[...Array(8)].map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const radius = 35;
                  return (
                    <motion.circle
                      key={`text-${i}`}
                      cx={180 + Math.cos(angle) * radius}
                      cy={180 + Math.sin(angle) * radius}
                      r="4"
                      fill="#60A5FA"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    />
                  );
                })}
                {/* Label */}
                <text x="180" y="260" textAnchor="middle" fill="white" fontSize="12" opacity="0.6">
                  Text
                </text>
              </g>

              {/* Data cluster - top right */}
              <g>
                <motion.circle
                  cx="420"
                  cy="180"
                  r="50"
                  fill="#A78BFA"
                  opacity="0.1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
                {[...Array(8)].map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const radius = 35;
                  return (
                    <motion.rect
                      key={`data-${i}`}
                      x={420 + Math.cos(angle) * radius - 3}
                      y={180 + Math.sin(angle) * radius - 3}
                      width="6"
                      height="6"
                      rx="1"
                      fill="#A78BFA"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                    />
                  );
                })}
                {/* Label */}
                <text x="420" y="260" textAnchor="middle" fill="white" fontSize="12" opacity="0.6">
                  Data
                </text>
              </g>

              {/* Images cluster - bottom center */}
              <g>
                <motion.circle
                  cx="300"
                  cy="360"
                  r="45"
                  fill="#34D399"
                  opacity="0.1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
                {[...Array(6)].map((_, i) => {
                  const angle = (i / 6) * Math.PI * 2;
                  const radius = 30;
                  return (
                    <motion.circle
                      key={`image-${i}`}
                      cx={300 + Math.cos(angle) * radius}
                      cy={360 + Math.sin(angle) * radius}
                      r="5"
                      fill="#34D399"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.1 + i * 0.1 }}
                    />
                  );
                })}
                {/* Label */}
                <text x="300" y="420" textAnchor="middle" fill="white" fontSize="12" opacity="0.6">
                  Images
                </text>
              </g>
            </motion.g>
          )}

          {/* Stage 2: Deep Analysis - Neural connections */}
          {stage === 2 && (
            <motion.g
              key="analysis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Network nodes */}
              {[
                { x: 150, y: 120, size: 15 }, { x: 280, y: 100, size: 20 }, { x: 420, y: 130, size: 15 },
                { x: 200, y: 250, size: 18 }, { x: 300, y: 250, size: 25 }, { x: 400, y: 250, size: 18 },
                { x: 220, y: 380, size: 15 }, { x: 380, y: 380, size: 15 }
              ].map((node, i) => (
                <g key={`node-${i}`}>
                  {/* Glow */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size * 2.5}
                    fill="url(#glowGrad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  />
                  {/* Node */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size}
                    fill="url(#particleGrad)"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0.8, 1],
                      scale: [0, 1.2, 1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.15,
                      repeat: Infinity,
                      repeatDelay: 1,
                      repeatType: "mirror"
                    }}
                  />
                </g>
              ))}

              {/* Connections between nodes */}
              {[
                [150, 120, 280, 100], [280, 100, 420, 130],
                [150, 120, 200, 250], [280, 100, 300, 250], [420, 130, 400, 250],
                [200, 250, 300, 250], [300, 250, 400, 250],
                [200, 250, 220, 380], [300, 250, 220, 380], [300, 250, 380, 380], [400, 250, 380, 380]
              ].map((line, i) => (
                <motion.line
                  key={`conn-${i}`}
                  x1={line[0]}
                  y1={line[1]}
                  x2={line[2]}
                  y2={line[3]}
                  stroke="#34D399"
                  strokeWidth="2"
                  opacity="0.4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeInOut" }}
                />
              ))}
            </motion.g>
          )}

          {/* Stage 3: Research - Data streaming from sources */}
          {stage === 3 && (
            <motion.g
              key="research"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Central processing hub */}
              <motion.circle
                cx="300"
                cy="250"
                r="50"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="3"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.7, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.circle
                cx="300"
                cy="250"
                r="20"
                fill="url(#particleGrad)"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Web source - top */}
              <g>
                <motion.circle 
                  cx="300" 
                  cy="80" 
                  r="40" 
                  fill="#A78BFA" 
                  opacity="0.2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.circle 
                  cx="300" 
                  cy="80" 
                  r="20" 
                  fill="#A78BFA" 
                  opacity="0.5"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.5, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <text x="300" y="88" textAnchor="middle" fill="white" fontSize="20">🌐</text>
                <text x="300" y="140" textAnchor="middle" fill="white" fontSize="11" opacity="0.6">Web</text>
              </g>

              {/* Knowledge base - bottom */}
              <g>
                <motion.circle 
                  cx="300" 
                  cy="420" 
                  r="40" 
                  fill="#34D399" 
                  opacity="0.2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <motion.circle 
                  cx="300" 
                  cy="420" 
                  r="20" 
                  fill="#34D399" 
                  opacity="0.5"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.5, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <text x="300" y="428" textAnchor="middle" fill="white" fontSize="20">📚</text>
                <text x="300" y="465" textAnchor="middle" fill="white" fontSize="11" opacity="0.6">Knowledge Base</text>
              </g>

              {/* Data streams from web */}
              {[...Array(4)].map((_, i) => (
                <motion.line
                  key={`web-stream-${i}`}
                  x1="300"
                  y1="120"
                  x2="300"
                  y2="200"
                  stroke="#A78BFA"
                  strokeWidth="2"
                  strokeDasharray="8,8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1],
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{ 
                    duration: 1.2,
                    delay: 0.5 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}

              {/* Data streams from knowledge base */}
              {[...Array(4)].map((_, i) => (
                <motion.line
                  key={`kb-stream-${i}`}
                  x1="300"
                  y1="380"
                  x2="300"
                  y2="300"
                  stroke="#34D399"
                  strokeWidth="2"
                  strokeDasharray="8,8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1],
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{ 
                    duration: 1.2,
                    delay: 0.8 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.g>
          )}

          {/* Stage 4: Reasoning - Decision tree */}
          {stage === 4 && (
            <motion.g
              key="reasoning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Root decision */}
              <motion.circle
                cx="300"
                cy="80"
                r="25"
                fill="#60A5FA"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.2, 1] }}
                transition={{ duration: 0.6 }}
              />

              {/* Decision paths */}
              {[
                { from: [300, 105], to: [200, 200], active: true, delay: 0.2 },
                { from: [300, 105], to: [400, 200], active: true, delay: 0.2 },
                { from: [200, 225], to: [150, 320], active: true, delay: 0.5 },
                { from: [200, 225], to: [250, 320], active: false, delay: 0.5 },
                { from: [400, 225], to: [350, 320], active: false, delay: 0.5 },
                { from: [400, 225], to: [450, 320], active: true, delay: 0.5 },
              ].map((branch, i) => (
                <motion.line
                  key={`branch-${i}`}
                  x1={branch.from[0]}
                  y1={branch.from[1]}
                  x2={branch.to[0]}
                  y2={branch.to[1]}
                  stroke={branch.active ? "#34D399" : "#60A5FA"}
                  strokeWidth={branch.active ? "4" : "2"}
                  opacity={branch.active ? 0.9 : 0.3}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: branch.delay }}
                />
              ))}

              {/* Decision nodes */}
              {[
                { x: 200, y: 200, active: true, delay: 0.4 },
                { x: 400, y: 200, active: true, delay: 0.4 },
                { x: 150, y: 320, active: true, delay: 0.7 },
                { x: 250, y: 320, active: false, delay: 0.7 },
                { x: 350, y: 320, active: false, delay: 0.7 },
                { x: 450, y: 320, active: true, delay: 0.7 },
              ].map((node, i) => (
                <motion.circle
                  key={`decision-${i}`}
                  cx={node.x}
                  cy={node.y}
                  r={node.active ? "18" : "12"}
                  fill={node.active ? "#34D399" : "#60A5FA"}
                  opacity={node.active ? 1 : 0.4}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: node.active ? 1 : 0.4,
                    scale: node.active ? [0, 1.3, 1] : 1
                  }}
                  transition={{ duration: 0.5, delay: node.delay }}
                />
              ))}

              {/* Central insight */}
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <circle cx="300" cy="420" r="45" fill="url(#glowGrad)" opacity="0.6" />
                <circle cx="300" cy="420" r="30" fill="#34D399" />
                {/* Pulsing ring effect */}
                <motion.circle
                  cx="300"
                  cy="420"
                  r="30"
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="3"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ transformOrigin: "300px 420px" }}
                />
                <text x="300" y="428" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">✓</text>
              </motion.g>
            </motion.g>
          )}

          {/* Stage 5: Generation - Outputs materialize */}
          {stage === 5 && (
            <motion.g
              key="generation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Central source */}
              <motion.circle
                cx="300"
                cy="250"
                r="35"
                fill="#34D399"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ duration: 0.6 }}
              />

              {/* Document output - top left */}
              <motion.g
                initial={{ opacity: 0, x: 300, y: 250 }}
                animate={{ opacity: 1, x: 150, y: 150 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <rect x="-30" y="-40" width="60" height="80" rx="6" fill="#60A5FA" opacity="0.9" />
                <line x1="-20" y1="-20" x2="20" y2="-20" stroke="white" strokeWidth="2" />
                <line x1="-20" y1="-5" x2="20" y2="-5" stroke="white" strokeWidth="2" />
                <line x1="-20" y1="10" x2="20" y2="10" stroke="white" strokeWidth="2" />
                <line x1="-20" y1="25" x2="10" y2="25" stroke="white" strokeWidth="2" />
                <motion.circle
                  cx="0"
                  cy="0"
                  r="50"
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: [0.8, 0] }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
                <text x="0" y="70" textAnchor="middle" fill="white" fontSize="11" opacity="0.7">Report</text>
              </motion.g>

              {/* Database update - top right */}
              <motion.g
                initial={{ opacity: 0, x: 300, y: 250 }}
                animate={{ opacity: 1, x: 450, y: 150 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <ellipse cx="0" cy="-25" rx="35" ry="12" fill="#A78BFA" opacity="0.9" />
                <rect x="-35" y="-25" width="70" height="35" fill="#A78BFA" opacity="0.9" />
                <ellipse cx="0" cy="10" rx="35" ry="12" fill="#A78BFA" opacity="0.9" />
                <motion.path
                  d="M -12 -8 L -6 -2 L 8 -16"
                  stroke="#34D399"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                />
                <text x="0" y="42" textAnchor="middle" fill="white" fontSize="11" opacity="0.7">Database</text>
              </motion.g>

              {/* Email notification - bottom */}
              <motion.g
                initial={{ opacity: 0, x: 300, y: 250 }}
                animate={{ opacity: 1, x: 300, y: 390 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <rect x="-35" y="-25" width="70" height="50" rx="6" fill="#34D399" opacity="0.3" />
                <rect x="-35" y="-25" width="70" height="50" rx="6" fill="none" stroke="#34D399" strokeWidth="2" />
                <motion.path
                  d="M -35 -25 L 0 0 L 35 -25"
                  stroke="#34D399"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                />
                <text x="0" y="48" textAnchor="middle" fill="white" fontSize="11" opacity="0.7">Notification</text>
              </motion.g>

              {/* Connection lines */}
              {[
                { to: [150, 150], delay: 0.3 },
                { to: [450, 150], delay: 0.5 },
                { to: [300, 390], delay: 0.7 }
              ].map((line, i) => (
                <motion.line
                  key={`gen-line-${i}`}
                  x1="300"
                  y1="250"
                  x2={line.to[0]}
                  y2={line.to[1]}
                  stroke="#34D399"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 0.5, delay: line.delay }}
                />
              ))}
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Stage Labels - Always visible */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <AnimatePresence mode="wait">
          <motion.p 
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-white/80 text-sm font-medium px-4 py-2 bg-black/20 rounded-full backdrop-blur-sm"
          >
            {[
              "Ingesting documents",
              "Extracting knowledge",
              "Deep analysis & connections",
              "Researching context",
              "Reasoning & decision making",
              "Generating outputs"
            ][stage]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
