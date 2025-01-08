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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { CallforContributorsFormSchema } from "@/lib/form-schema";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ValidRoles } from "@/lib/roles";
import { postHelper, toastUnknownError } from "@/lib/utils";

export function CallforContributorsForm({
  buttonText,
  eventId,
}: {
  buttonText: string;
  eventId: string;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CallforContributorsFormSchema>>({
    resolver: zodResolver(CallforContributorsFormSchema),
  });

  async function onSubmit(data: z.infer<typeof CallforContributorsFormSchema>) {
    try {
      const response = await postHelper(
        `/api/contributor/create?event_id=${eventId}`,
        data
      );
      if (response.ok) {
        window.location.reload();
      } else {
        toast(toastUnknownError);
      }
    } catch (error) {}
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter call title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Give a short and meaningful title
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter call description"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe thier purpose and requirements.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(ValidRoles).map((role) => (
                            <SelectItem
                              value={
                                ValidRoles[role as keyof typeof ValidRoles]
                              }
                            >
                              {ValidRoles[role as keyof typeof ValidRoles]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Role of the contributors.
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
                    Create Call
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
