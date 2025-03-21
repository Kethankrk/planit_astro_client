import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TicketSchema } from "@/lib/form-schema";
import { patchHelper, postHelper } from "@/lib/utils";
import type { TicketSelectType } from "@/db/schema/event";

interface props {
  eventId: string;
  buttonText: string;
  ticketData?: TicketSelectType;
  editMode?: boolean;
}

export function CreateTicketOption({
  eventId,
  buttonText,
  ticketData,
  editMode = false,
}: props) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof TicketSchema>>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
      title: ticketData?.title,
      price: editMode ? Number(ticketData!.price) : undefined,
      limit: editMode ? Number(ticketData!.limit) : undefined,
      perks: ticketData?.perks ?? "",
    },
  });

  async function createOrUpdateTicket(
    data: z.infer<typeof TicketSchema>
  ): Promise<Response> {
    if (editMode) {
      return await patchHelper(`/api/ticket?ticket_id=${ticketData!.id}`, data);
    }
    return await postHelper(`/api/ticket?event_id=${eventId}`, data);
  }

  async function onSubmit(data: z.infer<typeof TicketSchema>): Promise<void> {
    try {
      const response = await createOrUpdateTicket(data);
      if (response.ok) {
        window.location.reload();
      } else if (response.status == 400) {
        toast({
          title: "Bad request",
          description: "Invalid data provided",
          variant: "destructive",
        });
      } else if (response.status == 500) {
        toast({
          title: "Unkown server error",
          description: "Something went wrong in our side",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Ticket</AlertDialogTitle>
          <AlertDialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ticket title" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the title of your ticket.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter ticket price"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? Number(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Optional: Enter the price of the ticket.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Limit</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter ticket limit"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? Number(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Optional: Enter the maximum number of tickets available.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="perks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Perks</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter ticket perks"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Optional: Describe any perks included with this ticket.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-5">
                  <AlertDialogCancel className="w-full">
                    Cancel
                  </AlertDialogCancel>
                  <Button type="submit" className="w-full">
                    {editMode ? "Update Ticket" : "Create Ticket"}
                  </Button>
                </div>
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
