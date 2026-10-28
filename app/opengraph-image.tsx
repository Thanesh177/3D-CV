import { ImageResponse } from "next/og";

export const alt = "Thanesh Nagarajan — Cloud Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px", background: "#f6f5f1", color: "#24272a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 5 }}>
        <span>THANESH NAGARAJAN</span><span>PORTFOLIO / 2026</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 92, lineHeight: .86, letterSpacing: -7 }}>HI, I’M THANESH.</div>
        <div style={{ fontSize: 92, lineHeight: .86, letterSpacing: -7, color: "#3f63e9" }}>CLOUD ENGINEER.</div>
      </div>
      <div style={{ fontSize: 22, color: "#5c625f" }}>AWS architecture · Infrastructure automation · Cloud security</div>
    </div>,
    size,
  );
}
