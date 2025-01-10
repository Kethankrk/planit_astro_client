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
import type { Orders } from "razorpay/dist/types/orders";
import { useRazorpay, type RazorpayOrderOptions } from "react-razorpay";
import type { TicketSelectType } from "@/db/schema/event";

interface Props {
  user: User | null;
  ticket: TicketSelectType;
}

export function TicketBuyForm({ user, ticket }: Props) {
  const { toast } = useToast();
  const { Razorpay, error, isLoading } = useRazorpay();
  const form = useForm<z.infer<typeof TicketResponseSchema>>({
    resolver: zodResolver(TicketResponseSchema),
    defaultValues: {
      name: user?.username,
      email: user?.email,
      ticketId: ticket.id,
    },
  });

  async function onSubmit(data: z.infer<typeof TicketResponseSchema>) {
    try {
      const orderOptions: Orders.RazorpayOrderCreateRequestBody = {
        amount: Number(ticket.price) * 100,
        currency: "INR",
      };
      const createOrderRes = await postHelper(
        "/api/ticket/order",
        orderOptions
      );

      if (!createOrderRes.ok) {
        throw new Error("Failed to create order");
      }

      const order = (await createOrderRes.json()) as Orders.RazorpayOrder;
      const options: RazorpayOrderOptions = {
        key: import.meta.env.RAZORPAY_API_KEY,
        amount: Number(order.amount),
        currency: "INR",
        name: "PlanIt Event Management",
        description: "Test Mode",
        order_id: order.id,
        theme: {
          color: "#5f63b8",
        },
        handler: async (response) => {
          const res = await postHelper("/api/ticket/buy", data);
          if (res.ok) {
            toast({
              title: "Ticket purchased successfully",
              description:
                "You can now download your ticket from ticket section",
            });
            await new Promise((resolve) => setTimeout(resolve, 2000));
            window.location.href = "/";
          } else if (res.status == 400) {
            toast(toastBadRequest);
          } else if (res.status == 500) {
            toast(toastServerError);
          }
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
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
