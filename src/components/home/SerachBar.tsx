import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Card, CardDescription, CardFooter, CardTitle } from "../ui/card";

interface EventIndexType {
  id: number;
  title: string;
  description: string;
  location: string;
  banner: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState<EventIndexType[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setEvents([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchEvents(query);
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const fetchEvents = async (searchQuery: string) => {
    try {
      const response = await fetch("/api/search/event", {
        method: "POST",
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      setEvents(data || []);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="flex gap-2 relative flex-col md:flex-row px-10 md:px-2">
      <Input
        type="text"
        placeholder="Search events..."
        className="flex-grow"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit" onClick={() => fetchEvents(query)}>
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
      {events.length > 0 && (
        <Card className="absolute top-12 left-0 w-full backdrop-blur-lg bg-background/10 grid grid-cols-1 gap-1 p-2 z-10">
          {events.map((event) => (
            <a href={`/event/${event.id}`} key={event.id}>
              <Card className="p-4 flex justify-between cursor-pointer hover:bg-accent transition-all">
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="truncate max-w-[200px] md:max-w-md">
                    {event.description}
                  </CardDescription>
                </div>
                <p className="font-medium text-sm text-muted-foreground">
                  {event.location}
                </p>
              </Card>
            </a>
          ))}
        </Card>
      )}
    </div>
  );
}
