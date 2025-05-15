import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ExamplePrompt } from "@/types/index";
import { ExamplePrompt as ExamplePromptComponent } from "@/components/ExamplePrompt";
import { Skeleton } from "@/components/ui/skeleton";

export default function Examples() {
  const { data: examples, isLoading } = useQuery<ExamplePrompt[]>({
    queryKey: ["/api/examples"],
  });

  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
        Example Prompts
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Browse through these examples to see how our prompt enhancer works with different languages, tones, and roles.
      </p>
      
      <div className="space-y-6">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-6 space-y-3">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))
        ) : examples && examples.length > 0 ? (
          // Render example prompts
          examples.map((example) => (
            <ExamplePromptComponent key={example.id} example={example} />
          ))
        ) : (
          // No examples found
          <div className="text-center py-10">
            <p className="text-muted-foreground">No example prompts available.</p>
          </div>
        )}
      </div>
    </div>
  );
}