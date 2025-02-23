// import { FinalTicketCard } from "@/components/ticket/FinalTicketCard";
import puppeteer from "puppeteer";

export const generatePNGorPDF = async (
  ticketId: number,
  type: "png" | "pdf"
): Promise<void> => {
  const url = `http://localhost:4321/ticket/verify/${ticketId}?type=${
    type == "png" ? "nft" : "pdf"
  }`;
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.waitForSelector("#ticket");
  const element = await page.$("#ticket");
  if (type == "png") {
    await element?.screenshot({
      path: `./public/ticket/ticket-${ticketId}.png`,
    });
  } else {
    await page.pdf({
      path: `./public/ticket/ticket-${ticketId}.pdf`,
      format: "A4",
    });
  }
  await browser.close();
};
