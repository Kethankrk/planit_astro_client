import { Mail, MapPin } from "lucide-react";

interface TicketProps {
  title: string;
  email: string;
  date: string;
  location: string;
  id: string;
  price: number;
  qr: string;
  type?: "nft" | "pdf";
}

export const FinalTicketCard = ({
  title,
  email,
  date,
  location,
  id,
  price,
  qr,
  type = "pdf",
}: TicketProps) => {
  return (
    <div
      className={`bg-white shadow-2xl rounded-xl overflow-hidden w-full mx-auto border border-foreground flex flex-col ${
        type === "nft" ? "max-w-[400px] h-[400px] aspect-square" : "max-w-4xl"
      }`}
      id="ticket"
    >
      <div
        className={`flex ${
          type === "nft" ? "flex-col" : "flex-col md:flex-row"
        }`}
      >
        <div
          className={`bg-background p-6 relative flex flex-col ${
            type === "nft" ? "justify-center items-center" : "w-2/3"
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-wave-pattern"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-wave-pattern transform rotate-180"></div>

          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-white">{title}</h2>
            <p className="text-sm mt-2">{date}</p>
            <div className="flex justify-center items-center mt-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-xs">{location}</span>
            </div>
          </div>

          <div className="mt-auto text-center">
            <p className="text-xs">Ticket Holder</p>
            <div className="flex justify-center items-center text-white">
              <Mail className="w-4 h-4 mr-1" />
              <span className="text-xs">{email}</span>
            </div>
          </div>
        </div>

        <div
          className={`bg-foreground p-6 flex flex-col justify-center items-center ${
            type === "nft" ? "w-full" : "w-1/3"
          }`}
        >
          <img src={qr} alt="qr code" className="w-24 h-24 object-contain" />
          <p className="text-center text-red-600 font-semibold mt-2">
            Scan for Entry
          </p>

          <div className="text-center mt-4">
            <p className="text-red-600 text-sm font-bold">Price</p>
            <p className="text-xl font-extrabold text-red-700">
              ${price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
