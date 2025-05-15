import { useQuery } from "@tanstack/react-query";
import { getExamplePrompts } from "@/lib/enhancerService";
import { PromptEnhancer } from "@/components/PromptEnhancer";
import { ExamplePrompt } from "@/types";
import { Languages } from "lucide-react";

export default function Home() {
  // Fetch example prompts
  const { data: examples, isLoading, error } = useQuery({
    queryKey: ["/api/examples"],
    queryFn: getExamplePrompts,
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-500 text-white rounded-lg p-2">
                <Languages className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-heading font-bold text-gray-800">Prompt Enhancer</h1>
            </div>
            <p className="text-gray-500 mt-2 md:mt-0 text-sm md:text-base">
              Elevate your prompts from any major Indian language
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          // Loading state
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          // Error state
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            <p>Failed to load example prompts. Please refresh the page.</p>
          </div>
        ) : (
          // Render PromptEnhancer with examples
          <PromptEnhancer examples={examples || []} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            Prompt Enhancer for Indian Languages - Elevate your AI interactions
          </p>
        </div>
      </footer>
    </div>
  );
}
