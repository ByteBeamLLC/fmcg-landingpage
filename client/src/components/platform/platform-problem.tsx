import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Clock, 
  Users, 
  Database, 
  AlertTriangle, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  Zap
} from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Repetitive Yet Complex",
    metric: "15-20 hrs/week",
    metricLabel: "per expert",
    visual: "workflow-loop"
  },
  {
    icon: Users,
    title: "Not Built for Simple Automation",
    metric: "82%",
    metricLabel: "need reasoning",
    visual: "comparison"
  },
  {
    icon: Database,
    title: "Siloed Systems & Manual Handoffs",
    metric: "5-8",
    metricLabel: "manual steps",
    visual: "flow-diagram"
  },
  {
    icon: AlertTriangle,
    title: "Scaling Means Hiring",
    metric: "3-6 months",
    metricLabel: "to train",
    visual: "growth-chart"
  },
];

function WorkflowLoopVisual() {
  return (
    <div className="relative h-32 flex items-center justify-center overflow-hidden">
      <div className="flex items-center gap-3">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              x: [-20, 0, 0, 20]
            }}
            transition={{
              duration: 3,
              delay: i * 0.6,
              repeat: Infinity,
              repeatDelay: 0.6
            }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-12 bg-muted border-2 border-border rounded flex items-center justify-center">
              <FileText size={20} className="text-muted-foreground" />
            </div>
            {i < 3 && <ArrowRight size={16} className="text-muted-foreground/40" />}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="absolute right-2 top-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <Clock size={24} className="text-muted-foreground/20" />
      </motion.div>
    </div>
  );
}

function ComparisonVisual() {
  return (
    <div className="grid grid-cols-2 gap-4 h-32">
      <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 flex flex-col items-center justify-center">
        <XCircle className="text-destructive mb-2" size={24} />
        <div className="text-xs text-center text-muted-foreground font-medium">Simple RPA</div>
        <div className="text-xs text-center text-muted-foreground/60 mt-1">Basic Scripts</div>
      </div>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex flex-col items-center justify-center">
        <CheckCircle2 className="text-primary mb-2" size={24} />
        <div className="text-xs text-center text-foreground font-medium">AI Agent</div>
        <div className="text-xs text-center text-muted-foreground/60 mt-1">Deep Reasoning</div>
      </div>
    </div>
  );
}

function FlowDiagramVisual() {
  return (
    <div className="relative h-32 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-6 relative">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                delay: i * 0.4,
                repeat: Infinity,
                repeatDelay: 1.2
              }}
              className="w-14 h-14 bg-muted border-2 border-border rounded-lg flex items-center justify-center"
            >
              <Database size={20} className="text-muted-foreground" />
            </motion.div>
            {i < 2 && (
              <motion.div
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${(i + 1) * 33.33 - 8}%` }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{
                  duration: 2,
                  delay: i * 0.4,
                  repeat: Infinity,
                  repeatDelay: 1.2
                }}
              >
                <ArrowRight size={16} className="text-destructive" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-destructive font-medium flex items-center gap-1">
        <AlertTriangle size={12} />
        Manual Handoffs
      </div>
    </div>
  );
}

function GrowthChartVisual() {
  return (
    <div className="relative h-32 flex items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground mb-1">Traditional</div>
        <div className="flex items-end gap-1 h-16">
          {[30, 45, 60].map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 1, delay: i * 0.3 }}
              className="w-6 bg-muted border border-border rounded-t"
            />
          ))}
        </div>
        <div className="text-xs text-muted-foreground/60 flex items-center gap-1">
          <Users size={12} />
          Linear
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-foreground mb-1">AI Agent</div>
        <div className="flex items-end gap-1 h-16">
          {[100, 100, 100].map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-6 bg-primary/20 border border-primary rounded-t"
            />
          ))}
        </div>
        <div className="text-xs text-primary font-medium flex items-center gap-1">
          <Zap size={12} />
          Instant
        </div>
      </div>
    </div>
  );
}

function ProblemVisual({ type }: { type: string }) {
  switch (type) {
    case "workflow-loop":
      return <WorkflowLoopVisual />;
    case "comparison":
      return <ComparisonVisual />;
    case "flow-diagram":
      return <FlowDiagramVisual />;
    case "growth-chart":
      return <GrowthChartVisual />;
    default:
      return null;
  }
}

export default function PlatformProblem() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="problem" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Knowledge Work Challenge</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your team has expertise. Your processes are proven. But scaling them manually is holding you back.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-card border-2 border-border rounded-xl p-8 hover:border-primary/30 transition-colors group"
              data-testid={`problem-card-${index}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <problem.icon className="text-primary" size={28} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground" data-testid={`metric-${index}`}>
                    {problem.metric}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    {problem.metricLabel}
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-6">{problem.title}</h3>
              
              <ProblemVisual type={problem.visual} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center bg-primary/5 border-2 border-primary/20 rounded-xl p-8"
        >
          <p className="text-xl font-semibold text-foreground mb-2">
            This is where custom AI agents come in.
          </p>
          <p className="text-lg text-muted-foreground">
            We build AI that understands your specific process, integrates with your systems, and runs continuously in the background.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
