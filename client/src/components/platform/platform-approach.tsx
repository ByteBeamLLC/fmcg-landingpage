import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Search, Map, Rocket, RefreshCw, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const phases = [
  {
    id: "discovery",
    number: 1,
    title: "Discovery",
    shortTitle: "Discovery",
    description:
      "We work closely with your team to understand your process deeply - the inputs, the decisions, the edge cases, and the outputs. We map the entire workflow and identify automation opportunities.",
    icon: Search,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    features: [
      "Process mapping and documentation",
      "Stakeholder interviews with your experts",
      "Edge case identification",
      "Integration points assessment",
    ],
  },
  {
    id: "build",
    number: 2,
    title: "Build & Test",
    shortTitle: "Build & Test",
    description:
      "We create a phased roadmap for developing your custom AI agent. This includes milestones for testing, validation, and iterative improvements based on real data and feedback from your team.",
    icon: Map,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
    features: [
      "Development milestones and timelines",
      "Test cases based on real scenarios",
      "Expert validation checkpoints",
      "Performance benchmarks and success criteria",
    ],
  },
  {
    id: "deploy",
    number: 3,
    title: "Deploy",
    shortTitle: "Deploy",
    description:
      "Once tested and validated, the AI agent goes live - integrating with your systems, processing documents, and delivering outputs. It runs continuously in the background, learning and improving over time.",
    icon: Rocket,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
    features: [
      "Seamless integration with existing systems",
      "Background processing - no manual triggers needed",
      "Real-time monitoring and alerts",
      "Audit trails and compliance logging",
    ],
  },
  {
    id: "improve",
    number: 4,
    title: "Improve",
    shortTitle: "Improve",
    description:
      "Your business evolves, and so does the agent. We monitor performance, handle edge cases, and update the agent as your processes change or regulations shift.",
    icon: RefreshCw,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
    features: [
      "Performance monitoring and optimization",
      "Regular model updates and improvements",
      "New feature additions as needs evolve",
      "Regulatory updates and compliance maintenance",
    ],
  },
];

export default function PlatformApproach() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [activeTab, setActiveTab] = useState("discovery");

  return (
    <section id="how-we-work" className="section-padding bg-muted">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How We Work With You</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From understanding your process to building a production-ready AI agent that runs continuously.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
            data-testid="workflow-stepper"
          >
            {/* Horizontal Stepper Navigation */}
            <div className="mb-12">
              <div className="relative">
                {/* Connecting Line - Desktop */}
                <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-border" style={{ width: 'calc(100% - 6rem)', marginLeft: '3rem' }}></div>
                
                <TabsList className="w-full bg-transparent h-auto p-0 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {phases.map((phase, index) => {
                    const isActive = activeTab === phase.id;
                    const Icon = phase.icon;
                    
                    return (
                      <TabsTrigger
                        key={phase.id}
                        value={phase.id}
                        className="relative flex-col h-auto py-4 px-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent hover:bg-card/50 transition-all rounded-xl group"
                        data-testid={`step-tab-${phase.id}`}
                      >
                        {/* Step Circle */}
                        <div className="relative z-10 mb-3">
                          <motion.div
                            className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all ${
                              isActive 
                                ? `${phase.iconBg} ring-4 ring-primary/20` 
                                : 'bg-card border-2 border-border group-hover:border-primary/50'
                            }`}
                            animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon 
                              className={`w-7 h-7 md:w-9 md:h-9 transition-colors ${
                                isActive ? phase.iconColor : 'text-muted-foreground group-hover:text-primary'
                              }`}
                            />
                          </motion.div>
                          
                          {/* Step Number Badge */}
                          <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                          }`}>
                            {phase.number}
                          </div>
                        </div>

                        {/* Step Title */}
                        <div className={`text-sm md:text-base font-semibold transition-colors text-center ${
                          isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                        }`}>
                          {phase.shortTitle}
                        </div>

                        {/* Arrow Indicator for Mobile */}
                        {index < phases.length - 1 && (
                          <ArrowRight className="md:hidden absolute -right-2 top-8 w-4 h-4 text-muted-foreground" />
                        )}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>
            </div>

            {/* Tab Content */}
            {phases.map((phase) => {
              const isActivePhase = activeTab === phase.id;
              
              return (
                <TabsContent 
                  key={phase.id} 
                  value={phase.id} 
                  className="mt-0"
                  data-testid={`step-content-${phase.id}`}
                >
                  <AnimatePresence mode="wait">
                    {isActivePhase && (
                      <motion.div
                        key={phase.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-card border-2 border-border rounded-2xl p-6 md:p-10"
                      >
                        <div className="flex flex-col md:flex-row gap-8">
                          {/* Icon and Number */}
                          <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0 flex-shrink-0">
                            <div className={`w-16 h-16 md:w-20 md:h-20 ${phase.iconBg} rounded-2xl flex items-center justify-center md:mb-4`}>
                              <phase.icon className={`${phase.iconColor} w-8 h-8 md:w-10 md:h-10`} />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-primary">
                              {/* {phase.number} */}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-grow">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">{phase.title}</h3>
                            <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                              {phase.description}
                            </p>

                            {/* Features Grid */}
                            <div className="grid md:grid-cols-2 gap-3">
                              {phase.features.map((feature, fIndex) => (
                                <motion.div
                                  key={fIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.1 + fIndex * 0.05 }}
                                  className="flex items-start gap-2"
                                  data-testid={`feature-${phase.id}-${fIndex}`}
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                  <span className="text-foreground text-sm md:text-base">{feature}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TabsContent>
              );
            })}
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-muted-foreground">
            <span className="font-semibold text-foreground">Not a product off the shelf.</span> Each AI agent is custom-built for your specific workflow.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
