import type React from "react";
import { QrCode } from "lucide-react";

interface EventTicketProps {
  title: string;
  price: string;
  date: string;
  id: number;
  qr: string;
}

const FinalTicketCard: React.FC<EventTicketProps> = ({
  title,
  price,
  date,
  id,
  qr,
}) => {
  return (
    <div
      style={{
        width: "600px",
        height: "300px",
        background: "linear-gradient(135deg, #6366f1, #3b82f6)",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        display: "flex",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        color: "white",
      }}
    >
      <div
        style={{
          flex: "1",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "16px",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: "20px",
              marginBottom: "8px",
            }}
          >
            Price: ${price}
          </p>
          <p
            style={{
              fontSize: "16px",
              marginBottom: "8px",
            }}
          >
            Date: {date}
          </p>
          <p
            style={{
              fontSize: "14px",
              opacity: "0.8",
            }}
          >
            Ticket ID: {id}
          </p>
        </div>
        <div
          style={{
            fontSize: "12px",
            opacity: "0.7",
          }}
        >
          This ticket is non-transferable and non-refundable.
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "-30px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "white",
          }}
        ></div>
      </div>
      <div
        style={{
          width: "220px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "-30px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #3b82f6)",
          }}
        ></div>

        <img
          src={qr || "/placeholder.svg"}
          alt="QR Code"
          width={200}
          height={300}
        />

        <p
          style={{
            marginTop: "16px",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          Scan to verify
        </p>
      </div>
    </div>
  );
};

export default FinalTicketCard;
