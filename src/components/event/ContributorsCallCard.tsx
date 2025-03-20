import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, FileText, UserCircle } from "lucide-react";
import type { ContributorsCallSelectType } from "@/db/schema/contributors";
import { CallResponseForm } from "@/components/event/CallResponseForm";
import { Button } from "@/components/ui/button";

interface Props {
  call: ContributorsCallSelectType;
  isPublicList?: boolean;
}

export default function ContributorsCallCard({
  call,
  isPublicList = false,
}: Props) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <UserPlus className="h-6 w-6 text-primary" />
          {call.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Call for Contributors
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-2">
          <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
          <p className="text-sm">{call.description}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-muted-foreground" />
            <Badge variant="secondary">{call.role}</Badge>
          </div>
          {isPublicList && <CallResponseForm callId={call.id} />}
        </div>
      </CardContent>
      {!isPublicList && (
        <CardFooter>
          <a href={`/contributor-calls/${call.id}`} className="w-full">
            <Button className="w-full" variant="secondary">
              View Response
            </Button>
          </a>
        </CardFooter>
      )}
    </Card>
  );
}
