import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, TrendingUp, Brain, Zap } from "lucide-react";

export default function Home() {
  const [phase, setPhase] = useState<"loading" | "synthesis" | "complete">("loading");
  const [llmProgress, setLlmProgress] = useState({
    chatgpt: 0,
    gemini: 0,
    manus: 0,
  });

  // Simulate LLM synthesis progress
  useEffect(() => {
    if (phase !== "synthesis") return;

    const interval = setInterval(() => {
      setLlmProgress((prev) => {
        const updated = {
          chatgpt: Math.min(prev.chatgpt + Math.random() * 15, 100),
          gemini: Math.min(prev.gemini + Math.random() * 12, 100),
          manus: Math.min(prev.manus + Math.random() * 18, 100),
        };

        if (
          updated.chatgpt >= 100 &&
          updated.gemini >= 100 &&
          updated.manus >= 100
        ) {
          setPhase("complete");
          clearInterval(interval);
        }

        return updated;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [phase]);

  // Auto-start synthesis after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("synthesis");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-blue-500/20 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  M&A Evaluation Engine
                </h1>
                <p className="text-slate-400 mt-1">
                  Nexus AI Acquisition Analysis
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-green-500/50 text-green-400 bg-green-500/10"
              >
                Live Analysis
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Context Profile */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-slate-200">
              Extracted Intent Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Strategic Goal",
                  value: "Rapid Integration",
                  progress: 85,
                },
                {
                  label: "Risk Tolerance",
                  value: "Moderate",
                  progress: 70,
                },
                {
                  label: "Hard Constraint",
                  value: "6-Month Deadline",
                  progress: 100,
                },
                {
                  label: "Primary Fear",
                  value: "Cultural Friction",
                  progress: 90,
                },
              ].map((item, idx) => (
                <Card
                  key={idx}
                  className="bg-slate-800/50 border-blue-500/20 p-4 hover:border-blue-500/40 transition-colors"
                >
                  <p className="text-xs text-slate-400 mb-2">{item.label}</p>
                  <p className="text-sm font-semibold text-blue-300 mb-3">
                    {item.value}
                  </p>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Multi-LLM Synthesis */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-slate-200">
              Multi-LLM Synthesis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "ChatGPT",
                  icon: Brain,
                  color: "from-green-500 to-emerald-600",
                  progress: llmProgress.chatgpt,
                },
                {
                  name: "Gemini",
                  icon: Zap,
                  color: "from-blue-500 to-cyan-600",
                  progress: llmProgress.gemini,
                },
                {
                  name: "Manus",
                  icon: TrendingUp,
                  color: "from-purple-500 to-pink-600",
                  progress: llmProgress.manus,
                },
              ].map((llm, idx) => {
                const Icon = llm.icon;
                return (
                  <Card
                    key={idx}
                    className="bg-slate-800/50 border-blue-500/20 p-6 hover:border-blue-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-br ${llm.color}`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-slate-100">
                          {llm.name}
                        </span>
                      </div>
                      <span className="text-sm text-slate-400">
                        {Math.round(llm.progress)}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-700/50 rounded-full h-2 mb-4">
                      <div
                        className={`bg-gradient-to-r ${llm.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${llm.progress}%` }}
                      />
                    </div>

                    {llm.progress === 100 && (
                      <div className="text-xs text-green-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Analysis Complete
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Reasoning Transparency Layer */}
          {phase === "complete" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-semibold text-slate-200">
                Reasoning Transparency Layer
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Included Signals */}
                <Card className="bg-slate-800/50 border-green-500/20 p-6">
                  <h3 className="font-semibold text-green-400 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Included Signals
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Integration timeline heavily prioritized",
                      "6-month deadline locked as constraint",
                      "Cultural friction identified as risk vector",
                      "Executive communication style applied",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-slate-300 flex gap-2"
                      >
                        <span className="text-green-400 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Uncertainty Zones */}
                <Card className="bg-slate-800/50 border-yellow-500/20 p-6">
                  <h3 className="font-semibold text-yellow-400 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Uncertainty Zones
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Expert disagreement on tech debt assessment",
                      "Market growth projections show variance",
                      "Regulatory assumptions need validation",
                      "Integration cost estimates differ by 15%",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-slate-300 flex gap-2"
                      >
                        <span className="text-yellow-400 mt-1">⚠</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Synthesis Governance */}
              <Card className="bg-gradient-to-r from-slate-800/50 to-slate-800/30 border-blue-500/20 p-6">
                <h3 className="font-semibold text-blue-400 mb-6">
                  Synthesis Governance Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Consensus Strength",
                      value: "MODERATE",
                      color: "text-yellow-400",
                    },
                    {
                      label: "Evidence Density",
                      value: "HIGH",
                      color: "text-green-400",
                    },
                    {
                      label: "Intent Alignment",
                      value: "STRONG",
                      color: "text-green-400",
                    },
                    {
                      label: "Hallucination Risk",
                      value: "LOW",
                      color: "text-green-400",
                    },
                  ].map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-xs text-slate-400 mb-2">
                        {metric.label}
                      </p>
                      <p className={`text-lg font-bold ${metric.color}`}>
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Final Recommendation */}
              <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30 p-6">
                <h3 className="font-semibold text-cyan-400 mb-3">
                  Synthesis Recommendation
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Based on the extracted intent profile and multi-LLM analysis,
                  the acquisition presents a <strong>MODERATE-HIGH</strong> risk
                  profile. The 6-month integration deadline is achievable but
                  requires aggressive cultural alignment strategies. Key
                  recommendation: Establish a dedicated integration PMO within
                  the first 30 days and prioritize executive team alignment
                  before technical integration begins.
                </p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
