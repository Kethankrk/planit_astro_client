import { useState } from "react";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "../ui/card";
import { actions } from "astro:actions";
import { useToast } from "@/hooks/use-toast";

interface ContributorResponseCardProps {
  contributor: {
    name: string;
    email: string;
    bio: string;
    avatarUrl?: string;
    id: number;
    isApproved: boolean | null;
  };
}

export function ContributorResponseCard({
  contributor,
}: ContributorResponseCardProps) {
  const { toast } = useToast();
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">(
    contributor.isApproved == null
      ? "pending"
      : contributor.isApproved
      ? "approved"
      : "rejected"
  );
  const { name, email, bio, avatarUrl, id } = contributor;
  const truncatedBio = bio.length > 120 ? `${bio.substring(0, 120)}...` : bio;

  const handleApprove = async () => {
    setStatus("approved");

    await actions.approveContributor({ id, email });

    toast({
      title: `Approved contributor ${name}`,
    });
  };

  const handleReject = async () => {
    setStatus("rejected");

    await actions.rejectContributor({ id, email });

    toast({
      title: `Rejected contributor ${name}`,
    });
  };

  return (
    <Card className="flex flex-col p-4">
      <div className="flex items-center justify-between flex-col gap-10 md:flex-row md:gap-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status !== "pending" ? (
            <Badge variant={status === "approved" ? "default" : "destructive"}>
              {status === "approved" ? "Approved" : "Rejected"}
            </Badge>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={handleReject}>
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button size="sm" onClick={handleApprove}>
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="mt-2 pl-13">
        <div className="flex items-start">
          <div className="ml-13 w-full">
            <p className="mt-5">Bio</p>
            <div className="text-sm text-muted-foreground">
              {isBioExpanded ? bio : truncatedBio}
              {bio.length > 120 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-1 h-6 p-0"
                  onClick={() => setIsBioExpanded(!isBioExpanded)}
                >
                  {isBioExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  <span className="ml-1 text-xs">
                    {isBioExpanded ? "Show less" : "Read more"}
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
