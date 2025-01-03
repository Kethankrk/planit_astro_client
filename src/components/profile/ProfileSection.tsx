import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Edit2,
  Calendar,
  Award,
  User,
} from "lucide-react";
import { profileFormSchema } from "@/lib/form-schema";
import type { User as AuthUser } from "lucia";

interface Props {
  userData: AuthUser;
}

export default function ProfileSection({ userData }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: userData.username,
    email: userData.email,
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    eventsManaged: 42,
    memberSince: "January 2020",
  });

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: user,
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      form.reset(user);
    }
  };

  const onSubmit = (values: z.infer<typeof profileFormSchema>) => {
    setUser({ ...user, ...values });
    setIsEditing(false);
    // Here you would typically send the updated user data to your backend
    console.log(values);
  };

  return (
    <div className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 rounded-t-lg">
        <CardTitle className="text-2xl font-bold">Profile</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleEdit}
          className="text-white hover:bg-white/20"
        >
          <Edit2 className="h-5 w-5" />
          <span className="sr-only">Edit profile</span>
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
          <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
            <AvatarImage
              src="/placeholder.svg?height=128&width=128"
              alt={user.name}
            />
            <AvatarFallback className="text-3xl">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <Badge variant="secondary" className="text-sm">
                <Calendar className="h-3 w-3 mr-1" />
                Member since {user.memberSince}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <Award className="h-3 w-3 mr-1" />
                {user.eventsManaged} Events Managed
              </Badge>
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2 text-sm font-medium text-gray-600">
                      <User className="h-4 w-4" />
                      <span>Name</span>
                    </FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input {...field} />
                      ) : (
                        <p className="text-lg font-medium">{field.value}</p>
                      )}
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
                    <FormLabel className="flex items-center space-x-2 text-sm font-medium text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input {...field} type="email" />
                      ) : (
                        <p className="text-lg">{field.value}</p>
                      )}
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
                    <FormLabel className="flex items-center space-x-2 text-sm font-medium text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>Phone</span>
                    </FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input {...field} type="tel" />
                      ) : (
                        <p className="text-lg">{field.value}</p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="flex items-center space-x-2 text-sm font-medium text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>Address</span>
                    </FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Textarea {...field} />
                      ) : (
                        <p className="text-lg">{field.value}</p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isEditing && (
              <CardFooter className="flex justify-end space-x-2 px-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            )}
          </form>
        </Form>
      </CardContent>
    </div>
  );
}
