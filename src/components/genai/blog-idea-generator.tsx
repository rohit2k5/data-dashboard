'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestBlogTopicIdeas, type SuggestBlogTopicIdeasOutput } from '@/ai/flows/suggest-blog-topic-ideas';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Loader2, Sparkles, Pencil, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const FormSchema = z.object({
  expertise: z.string().min(3, { message: 'Expertise must be at least 3 characters.' }),
  interests: z.string().min(3, { message: 'Interests must be at least 3 characters.' }),
  style: z.string({ required_error: 'Please select a writing style.' }),
});

export function BlogIdeaGenerator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SuggestBlogTopicIdeasOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      expertise: 'data analysis',
      interests: 'data visualization, predictive modeling',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const ideas = await suggestBlogTopicIdeas(data);
      setResult(ideas);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to generate ideas. Please try again.',
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
              Blog Idea Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="expertise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area of Expertise</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., data analysis" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specific Interests</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., data visualization" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Writing Style</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="beginner-friendly">Beginner-Friendly</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-6">
            <Button type="submit" disabled={loading} className="w-full md:w-auto self-center">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Ideas...
                </>
              ) : (
                'Generate Ideas'
              )}
            </Button>

            {(loading || result) && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="bg-secondary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BookOpen className="h-5 w-5" />
                      Topic Ideas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ) : (
                      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                        {result?.topicIdeas.map((idea, i) => <li key={i}>{idea}</li>)}
                      </ul>
                    )}
                  </CardContent>
                </Card>
                 <Card className="bg-secondary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Pencil className="h-5 w-5" />
                      Title Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-4/5" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ) : (
                       <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                        {result?.titleSuggestions.map((title, i) => <li key={i}>{title}</li>)}
                      </ul>
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
