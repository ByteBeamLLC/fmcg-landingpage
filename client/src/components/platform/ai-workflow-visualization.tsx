import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FileText, Database, Globe, Brain, FileCheck, Zap, Type, BarChart3, Image, Table2, Hash, MapPin, Lightbulb, X, Check } from "lucide-react";

export default function AIWorkflowVisualization() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const stages = [
      { duration: 4500 },  // Document Ingestion
      { duration: 4500 },  // Extraction
      { duration: 5000 },  // Deep Analysis
      { duration: 4500 },  // Research
      { duration: 4500 },  // Reasoning
      { duration: 4500 },  // Generation
    ];

    const timer = setTimeout(() => {
      setStage((prev) => (prev + 1) % 6);
    }, stages[stage].duration);

    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-950/40 to-purple-950/40 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden">
      {/* Remove mode="wait" to allow overlapping animations for smooth cross-fade */}
      <AnimatePresence>
        {/* Stage 0: Document Ingestion */}
        {stage === 0 && (
          <motion.div
            key="ingestion"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Documents flowing in */}
              {[
                { i: 0, color: "from-blue-400 to-blue-500" },
                { i: 1, color: "from-purple-400 to-purple-500" },
                { i: 2, color: "from-cyan-400 to-cyan-500" }
              ].map(({ i, color }) => (
                <motion.div
                  key={`doc-${i}`}
                  className="absolute flex items-center justify-center"
                  initial={{ 
                    opacity: 0, 
                    y: 100, 
                    x: -150 + i * 150,
                    scale: 0.8 
                  }}
                  animate={{ 
                    opacity: [0, 1, 1, 0.3], 
                    y: [100, 0, 0, 0],
                    x: [-150 + i * 150, 0, 0, 0],
                    scale: [0.8, 1, 1, 0.7]
                  }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.8 } }}
                  transition={{ 
                    duration: 3,
                    times: [0, 0.4, 0.7, 1],
                    delay: i * 0.3,
                    ease: "easeOut"
                  }}
                >
                  <div className={`w-16 h-20 bg-gradient-to-br ${color} rounded-lg shadow-lg flex items-center justify-center`}>
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              ))}

              {/* Central collection point - transitions to extraction */}
              <motion.div
                className="w-32 h-32 rounded-full border-4 border-dashed border-blue-400/40 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                exit={{ scale: 1.5, opacity: 0, transition: { duration: 0.8 } }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Database className="w-12 h-12 text-blue-400" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Stage 1: Extraction */}
        {stage === 1 && (
          <motion.div
            key="extraction"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Central document emerges from Stage 0 */}
              <motion.div
                className="absolute"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.3, opacity: 0, transition: { duration: 0.8 } }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-24 h-32 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg shadow-lg flex items-center justify-center">
                  <FileText className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              {/* Data extraction - pieces flying out */}
              {[
                { Icon: Type, label: "Text", angle: 0, bgColor: "bg-gradient-to-br from-blue-400 to-blue-500" },
                { Icon: BarChart3, label: "Data", angle: 60, bgColor: "bg-gradient-to-br from-purple-400 to-purple-500" },
                { Icon: Image, label: "Images", angle: 120, bgColor: "bg-gradient-to-br from-green-400 to-green-500" },
                { Icon: Table2, label: "Tables", angle: 180, bgColor: "bg-gradient-to-br from-cyan-400 to-cyan-500" },
                { Icon: Hash, label: "Numbers", angle: 240, bgColor: "bg-gradient-to-br from-indigo-400 to-indigo-500" },
                { Icon: MapPin, label: "Key Points", angle: 300, bgColor: "bg-gradient-to-br from-pink-400 to-pink-500" },
              ].map((item, i) => {
                const ItemIcon = item.Icon;
                const radius = 140;
                const x = Math.cos((item.angle * Math.PI) / 180) * radius;
                const y = Math.sin((item.angle * Math.PI) / 180) * radius;
                
                return (
                  <motion.div
                    key={`extract-${i}`}
                    className="absolute"
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{ 
                      x, 
                      y, 
                      opacity: 1, 
                      scale: 1 
                    }}
                    exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.8 } }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.8 + i * 0.15,
                      ease: "easeOut"
                    }}
                  >
                    <div className={`w-16 h-16 ${item.bgColor} rounded-lg shadow-lg flex flex-col items-center justify-center text-white`}>
                      <ItemIcon className="w-6 h-6" />
                      <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Extraction lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500">
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const radius = 140;
                  const x = 300 + Math.cos((angle * Math.PI) / 180) * radius;
                  const y = 250 + Math.sin((angle * Math.PI) / 180) * radius;
                  return (
                    <motion.line
                      key={`line-${i}`}
                      x1="300"
                      y1="250"
                      x2={x}
                      y2={y}
                      stroke="#60A5FA"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      exit={{ opacity: 0, transition: { duration: 0.8 } }}
                      transition={{ duration: 0.8, delay: 0.8 + i * 0.15 }}
                    />
                  );
                })}
              </svg>
            </div>
          </motion.div>
        )}

        {/* Stage 2: Deep Analysis */}
        {stage === 2 && (
          <motion.div
            key="analysis"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-full">
              {/* Brain center - emerges from extracted data */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.8 } }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center relative">
                  <Brain className="w-12 h-12 text-white" />
                  {/* Pulsing rings */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={`pulse-${i}`}
                      className="absolute inset-0 border-4 border-purple-400 rounded-full"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.8 } }}
                      transition={{
                        duration: 2,
                        delay: i * 0.7,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Data nodes */}
              {[
                { x: 100, y: 80, label: "Context" },
                { x: 380, y: 80, label: "Patterns" },
                { x: 80, y: 320, label: "Insights" },
                { x: 400, y: 320, label: "Relations" },
              ].map((node, i) => (
                <motion.div
                  key={`node-${i}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: node.x, top: node.y }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.3, opacity: 0, transition: { duration: 0.8 } }}
                  transition={{ duration: 0.6, delay: 1 + i * 0.3 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg shadow-lg flex items-center justify-center">
                    <div className="text-center">
                      <Zap className="w-6 h-6 text-white mx-auto" />
                      <p className="text-white text-[10px] mt-1 font-medium">{node.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500">
                {[
                  [100, 80, 300, 250],
                  [380, 80, 300, 250],
                  [80, 320, 300, 250],
                  [400, 320, 300, 250],
                ].map((line, i) => (
                  <motion.line
                    key={`connect-${i}`}
                    x1={line[0]}
                    y1={line[1]}
                    x2={line[2]}
                    y2={line[3]}
                    stroke="#A78BFA"
                    strokeWidth="3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    exit={{ opacity: 0, transition: { duration: 0.8 } }}
                    transition={{ duration: 1, delay: 1.5 + i * 0.2 }}
                  />
                ))}
              </svg>
            </div>
          </motion.div>
        )}

        {/* Stage 3: Research */}
        {stage === 3 && (
          <motion.div
            key="research"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Central brain continues from Stage 2 */}
              <motion.div
                className="absolute"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.8 } }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full shadow-lg flex items-center justify-center">
                  <Brain className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              {/* Web source - top */}
              <motion.div
                className="absolute top-20 left-1/2 -translate-x-1/2"
                initial={{ y: -50, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -30, opacity: 0, transition: { duration: 0.8 } }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="w-28 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-white p-3">
                  <Globe className="w-10 h-10 mb-1" />
                  <p className="text-xs font-bold">Web Research</p>
                </div>
              </motion.div>

              {/* Internal Knowledge - bottom */}
              <motion.div
                className="absolute bottom-20 left-1/2 -translate-x-1/2"
                initial={{ y: 50, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 30, opacity: 0, transition: { duration: 0.8 } }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="w-28 h-24 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-lg shadow-lg flex flex-col items-center justify-center text-white p-3">
                  <Database className="w-10 h-10 mb-1" />
                  <p className="text-xs font-bold">Knowledge Base</p>
                </div>
              </motion.div>

              {/* Data streams */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500">
                {/* From web */}
                {[...Array(3)].map((_, i) => (
                  <motion.line
                    key={`web-${i}`}
                    x1="300"
                    y1="140"
                    x2="300"
                    y2="230"
                    stroke="#34D399"
                    strokeWidth="3"
                    strokeDasharray="8,8"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: [0, 1],
                      opacity: [0, 0.8, 0]
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.8 } }}
                    transition={{ 
                      duration: 1.5,
                      delay: 1.2 + i * 0.4,
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  />
                ))}
                {/* From knowledge base */}
                {[...Array(3)].map((_, i) => (
                  <motion.line
                    key={`kb-${i}`}
                    x1="300"
                    y1="360"
                    x2="300"
                    y2="270"
                    stroke="#22D3EE"
                    strokeWidth="3"
                    strokeDasharray="8,8"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: [0, 1],
                      opacity: [0, 0.8, 0]
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.8 } }}
                    transition={{ 
                      duration: 1.5,
                      delay: 1.5 + i * 0.4,
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  />
                ))}
              </svg>
            </div>
          </motion.div>
        )}

        {/* Stage 4: Reasoning */}
        {stage === 4 && (
          <motion.div
            key="reasoning"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {/* Decision brain from Stage 3 */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0.8, y: -20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.5, y: -50, opacity: 0, transition: { duration: 0.8 } }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center">
                  <Lightbulb className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              {/* Options */}
              <div className="flex gap-8 items-center">
                {[
                  { label: "Option A", active: false, Icon: X, bgColor: "bg-gradient-to-br from-gray-400 to-gray-500" },
                  { label: "Option B", active: true, Icon: Check, bgColor: "bg-gradient-to-br from-green-400 to-green-500" },
                  { label: "Option C", active: false, Icon: X, bgColor: "bg-gradient-to-br from-gray-400 to-gray-500" },
                ].map((option, i) => {
                  const OptionIcon = option.Icon;
                  return (
                    <motion.div
                      key={`option-${i}`}
                      className={`w-28 h-28 rounded-lg shadow-lg flex flex-col items-center justify-center ${option.bgColor}`}
                      initial={{ y: 50, opacity: 0, scale: 0.8 }}
                      animate={{ 
                        y: 0, 
                        opacity: option.active ? 1 : 0.4, 
                        scale: option.active ? 1.1 : 0.9
                      }}
                      exit={{ y: 30, opacity: 0, transition: { duration: 0.8 } }}
                      transition={{ duration: 0.8, delay: 1 + i * 0.3 }}
                    >
                      <OptionIcon className="w-12 h-12 text-white mb-2" />
                      <p className="text-white text-sm font-bold">{option.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Best path indicator */}
              <motion.div
                className="mt-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 15, opacity: 0, transition: { duration: 0.8 } }}
                transition={{ duration: 0.6, delay: 2.5 }}
              >
                <div className="bg-green-500/20 border-2 border-green-400 rounded-full px-6 py-3">
                  <p className="text-green-300 font-bold text-sm">Best Solution Selected</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Stage 5: Generation */}
        {stage === 5 && (
          <motion.div
            key="generation"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Central generator - builds from Stage 4 decision */}
              <motion.div
                className="absolute"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.8 } }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg flex items-center justify-center relative">
                  <Zap className="w-12 h-12 text-white" />
                  {/* Energy pulses */}
                  {[0, 1].map((i) => (
                    <motion.div
                      key={`energy-${i}`}
                      className="absolute inset-0 border-4 border-green-400 rounded-full"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.8 } }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.75,
                        repeat: Infinity
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Outputs generating */}
              {[
                { icon: FileCheck, label: "Report", x: 100, y: 180, bgColor: "bg-gradient-to-br from-blue-400 to-blue-500", delay: 1 },
                { icon: Database, label: "Database", x: 400, y: 180, bgColor: "bg-gradient-to-br from-purple-400 to-purple-500", delay: 1.3 },
                { icon: FileText, label: "Document", x: 250, y: 340, bgColor: "bg-gradient-to-br from-green-400 to-green-500", delay: 1.6 },
              ].map((output, i) => {
                const Icon = output.icon;
                return (
                  <motion.div
                    key={`output-${i}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: output.x, top: output.y }}
                    initial={{ scale: 0, opacity: 0, x: 300 - output.x, y: 250 - output.y }}
                    animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                    exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.8 } }}
                    transition={{ duration: 1, delay: output.delay, ease: "easeOut" }}
                  >
                    <div className={`w-24 h-24 ${output.bgColor} rounded-lg shadow-lg flex flex-col items-center justify-center text-white`}>
                      <Icon className="w-10 h-10 mb-1" />
                      <p className="text-xs font-bold">{output.label}</p>
                      {/* Checkmark */}
                      <motion.div
                        className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0, opacity: 0, transition: { duration: 0.8 } }}
                        transition={{ duration: 0.3, delay: output.delay + 0.8 }}
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Generation lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500">
                {[
                  [300, 250, 100, 180],
                  [300, 250, 400, 180],
                  [300, 250, 250, 340],
                ].map((line, i) => (
                  <motion.line
                    key={`gen-line-${i}`}
                    x1={line[0]}
                    y1={line[1]}
                    x2={line[2]}
                    y2={line[3]}
                    stroke="#34D399"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    exit={{ opacity: 0, transition: { duration: 0.8 } }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.2 }}
                  />
                ))}
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage Labels - also with overlapping cross-fade */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <AnimatePresence>
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
            className="bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-6 py-3"
          >
            <p className="text-white font-semibold text-sm flex items-center gap-2">
              {stage === 0 && <><FileText className="w-4 h-4" /> Ingesting Documents</>}
              {stage === 1 && <><Database className="w-4 h-4" /> Extracting Knowledge</>}
              {stage === 2 && <><Brain className="w-4 h-4" /> Deep Analysis</>}
              {stage === 3 && <><Globe className="w-4 h-4" /> Researching Context</>}
              {stage === 4 && <><Lightbulb className="w-4 h-4" /> Reasoning & Deciding</>}
              {stage === 5 && <><Zap className="w-4 h-4" /> Generating Outputs</>}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
