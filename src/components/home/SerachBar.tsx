import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [events, setEvents] = useState("");
  const search = useRef(null);

  const handleSearch = () => {
    // e.preventDefault();
    console.log("Searching for:", search);
  };

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Search events..."
        ref={search}
        className="flex-grow"
      />
      <Button type="submit">
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
    </div>
  );
}
