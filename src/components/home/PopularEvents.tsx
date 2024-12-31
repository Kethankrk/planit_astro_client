import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TechEventCard from "./EventCardVertical";

export default function PopularEvents() {
  return (
    <Carousel className="w-full max-w-[90%]">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <TechEventCard
                imageUrl="https://imgs.search.brave.com/GBfrkb5MHR3hUZCDr0opbzno2A8rqbi31is96H-gSp0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODcy/MDE5NTE0L3Bob3Rv/L2xlYXJuaW5nLWFi/b3V0LWRuYS1waGVu/b3R5cGluZy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9RGt2/QlBTWW10UDBXTDNB/RlRENHBzbE9aM1py/YUdKRnJEWXJnWGFR/MHRSWT0"
                location="Kozhikode"
                startDate="Jan 10"
                startingPrice={1000}
                title="Tech fest kunnamkulam"
                key={index}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
