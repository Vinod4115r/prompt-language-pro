import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExamplePrompt as ExamplePromptType } from "@/types/index";
import { Separator } from "@/components/ui/separator";

interface ExamplePromptProps {
  example: ExamplePromptType;
}

/**
 * Component to display an example prompt
 */
export function ExamplePrompt({ example }: ExamplePromptProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
            {example.language}
          </Badge>
          {example.tone && (
            <Badge variant="outline">
              {example.tone}
            </Badge>
          )}
          {example.role && (
            <Badge variant="secondary">
              {example.role}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <CardTitle className="text-sm text-muted-foreground mb-2">Original Prompt</CardTitle>
            <p className="text-sm">{example.originalText}</p>
          </div>
          <div className="relative">
            <div className="md:absolute md:inset-0 md:border-l md:pl-6 md:ml-0 ml-6 md:pb-0 pb-6 border-l">
              <CardTitle className="text-sm text-muted-foreground mb-2">Enhanced Prompt</CardTitle>
              <p className="text-sm">{example.enhancedText}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
