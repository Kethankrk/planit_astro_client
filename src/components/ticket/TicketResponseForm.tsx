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
import { useToast } from "@/hooks/use-toast";
import { TicketResponseSchema } from "@/lib/form-schema";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "../ui/card";
import type { User } from "lucia";
import {
  postHelper,
  toastBadRequest,
  toastServerError,
  toastUnknownError,
} from "@/lib/utils";

interface Props {
  user: User | null;
  ticketId: number;
}

export function TicketBuyForm({ user, ticketId }: Props) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof TicketResponseSchema>>({
    resolver: zodResolver(TicketResponseSchema),
    defaultValues: {
      name: user?.username,
      email: user?.email,
      ticketId: ticketId,
    },
  });

  async function onSubmit(data: z.infer<typeof TicketResponseSchema>) {
    try {
      const response = await postHelper("/api/ticket/buy", data);
      if (response.ok) {
        toast({
          title: "Ticket purchased successfully",
          description: "You can now download your ticket from ticket section",
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        window.location.href = "/";
      } else if (response.status == 400) {
        toast(toastBadRequest);
      } else if (response.status == 500) {
        toast(toastServerError);
      }
    } catch (error) {
      toast(toastUnknownError);
    }
  }

  return (
    <Card className="p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your address"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            BUY
          </Button>
        </form>
      </Form>
    </Card>
  );
}
