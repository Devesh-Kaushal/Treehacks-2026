"use client";

import { useAuth } from "@/lib/auth-context";
import { HeroSection } from "@/components/hero-section";
import { PersonalizationWizard } from "@/components/personalization-wizard";
import { ActionPlan } from "@/components/action-plan";
import { FeedbackLoop } from "@/components/feedback-loop";
import { LiveDashboard } from "@/components/live-dashboard";
import Link from "next/link"; // For the mocked login button in Hero

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null; // Or a loading spinner

  if (user) {
    return <LiveDashboard />;
  }

  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* Temporary Nav for creating account */}
      <div className="fixed top-6 right-6 z-50">
        <Link
          href="/signup"
          className="px-6 py-3 bg-white text-forest-900 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          Create Account
        </Link>
      </div>

      <PersonalizationWizard />

      <ActionPlan />

      <FeedbackLoop />

      {/* Footer / Community */}
      <section className="py-20 px-6 bg-forest-900 text-white border-t border-forest-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Why It Matters</h2>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
            California faces an urgent task. We need to bridge the gap between technical data
            and human connection. Your participation shapes the future of our safety.
          </p>
          <div className="mt-12 text-sm text-forest-400">
            © 2026 Resonant CWPP Prototype. Built for TreeHacks.
          </div>
        </div>
      </section>
    </main>
  );
}
