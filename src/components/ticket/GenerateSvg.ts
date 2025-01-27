import FinalTicketCard from "@/components/ticket/FinalTicketCard";
import fs, { readFileSync } from "fs";
import path from "path";
import React from "react";
import satori from "satori";

interface TicketProps {
  title: string;
  price: string;
  date: string;
  id: number;
}

export const generateSvg = async (ticketData: TicketProps): Promise<void> => {
  const fontFilePath = `${process.cwd()}/public/Poppins-Regular.ttf`;

  const fontFile = readFileSync(fontFilePath);

  const qrLink = `http://localhost:4321/api/ticket/generate-qr?id=${ticketData.id}`;

  const svg = await satori(
    React.createElement(FinalTicketCard, {
      ...ticketData,
      qr: qrLink,
    }),
    {
      width: 600,
      height: 300,
      fonts: [
        {
          name: "Poppins",
          data: fontFile,
        },
      ],
    }
  );

  const outputPath = path.resolve("public/ticket-svg");
  const filePath = path.join(outputPath, `ticket-${ticketData.id}.svg`);
  fs.writeFileSync(filePath, svg, "utf8");
};
