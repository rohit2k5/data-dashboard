'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestProjectDescriptions, type SuggestProjectDescriptionsOutput } from '@/ai/flows/suggest-project-descriptions';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Loader2, Sparkles, Lightbulb, PencilRuler } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';

const FormSchema = z.object({
  projectName: z.string().min(3, { message: 'Project name must be at least 3 characters.' }),
  existingDescription: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  projectDetails: z.string().min(10, { message: 'Details must be at least 10 characters.' }),
});

export function ProjectDescriptionSuggester() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SuggestProjectDescriptionsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectName: '',
      existingDescription: '',
      projectDetails: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const suggestions = await suggestProjectDescriptions(data);
      setResult(suggestions);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to get suggestions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto max-w-4xl shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2 text-2xl">
              <Sparkles className="h-6 w-6 text-primary" />
              Project Description Suggester
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Retail Sales Forecasting" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="existingDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Existing Description</FormLabel>
                    <FormControl>
                      <Input placeholder="A short summary of your project" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="projectDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Technologies used, key findings, etc."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Suggestions...
                </>
              ) : (
                'Get Suggestions'
              )}
            </Button>

            {(loading || result) && (
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="bg-secondary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <PencilRuler className="h-5 w-5" />
                      Suggested Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">{result?.suggestedDescription}</p>
                    )}
                  </CardContent>
                </Card>
                <Card className="bg-secondary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Lightbulb className="h-5 w-5" />
                      Improvement Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                       <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">{result?.improvementSuggestions}</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
