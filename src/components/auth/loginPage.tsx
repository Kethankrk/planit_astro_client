import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "../ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be atleast 8 char in length",
  }),
});

export function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.status == 200) {
        window.location.href = "/";
        return;
      } else if (response.status == 400) {
        toast({
          title: "Authentication Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      } else if (response.status == 500) {
        toast({
          title: "Something went wrong",
          description: "unkown server error",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    } catch (error: unknown) {
      setIsSubmitting(false);
      toast({
        title: "Something went wrong",
        description: "unkown error",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="p-10 w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center pb-10">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="*********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              LOGIN
            </Button>
          </form>
          <p className="text-sm font-light mt-5">
            new to planit?{" "}
            <a
              href="/auth/signup"
              className="text-blue-400 hover:underline transition-all"
            >
              create an account
            </a>
          </p>
        </Form>
      </Card>
    </div>
  );
}
