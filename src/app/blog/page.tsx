import { BlogIdeaGenerator } from "@/components/genai/blog-idea-generator";
import { Separator } from "@/components/ui/separator";
import { blogPosts } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <section id="ai-generator" className="mb-16">
                 <div className="text-center mb-8">
                    <h1 className="font-headline text-4xl font-bold text-primary">AI Blog Idea Generator</h1>
                    <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
                        Stuck on what to write next? Let AI generate some topic ideas for you.
                    </p>
                </div>
                <BlogIdeaGenerator />
            </section>

            <Separator className="my-16" />

            <section id="blog-posts">
                 <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl font-bold text-primary">Articles & Posts</h2>
                    <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
                       A few thoughts on data, technology, and everything in between.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((post) => {
                         const postImage = PlaceHolderImages.find((p) => p.id === post.imageId);
                         return (
                            <Card key={post.id} className="flex h-full flex-col overflow-hidden transition-all hover:shadow-xl">
                                {postImage && (
                                    <div className="relative h-48 w-full">
                                        <Image
                                        src={postImage.imageUrl}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={postImage.imageHint}
                                        />
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
                                    <CardDescription>{post.description}</CardDescription>
                                </CardHeader>
                                <CardFooter className="mt-auto flex justify-between text-sm text-muted-foreground">
                                    <span>By {post.author}</span>
                                    <span>{new Date(post.date).toLocaleDateString()}</span>
                                </CardFooter>
                            </Card>
                         )
                    })}
                </div>
            </section>
        </div>
    )
}
