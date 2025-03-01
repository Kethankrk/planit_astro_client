import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/sonner";
import { CallforContributorsResponseFormSchema } from "@/lib/form-schema";
import { Textarea } from "@/components/ui/textarea";
import { postHelper } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  callId: number;
}

export function CallResponseForm({ callId }: Props) {
  const form = useForm<z.infer<typeof CallforContributorsResponseFormSchema>>({
    resolver: zodResolver(CallforContributorsResponseFormSchema),
    defaultValues: {
      callId,
    },
  });

  async function onSubmit(
    data: z.infer<typeof CallforContributorsResponseFormSchema>
  ) {
    try {
      const response = postHelper("/api/contributor/apply", data);
      toast.promise(response, {
        loading: "Sending data...",
        success: (_) => "Successfuly submited",
        error: (_) => "Something went wrong",
        onAutoClose: () => window.location.reload(),
      });
    } catch (error) {
      toast.error("Unkown error");
    }
  }

  return (
    <AlertDialog>
      <Toaster richColors toastOptions={{ duration: 1000 }} />
      <AlertDialogTrigger asChild>
        <Button>Apply</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Call for contributors</AlertDialogTitle>
          <AlertDialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us more about you"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This details will be evaludated.
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
                    Submit
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
