import { ImageResponse } from "next/og";

export const alt = "Arko — Visual workflow and software architecture design tool";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        <div
            style={{
                alignItems: "center",
                background: "#087BF5",
                color: "#FFFFFF",
                display: "flex",
                height: "100%",
                justifyContent: "center",
                width: "100%",
            }}
        >
            <div
                style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    padding: "80px",
                    textAlign: "center",
                }}
            >
                <div style={{ display: "flex", fontSize: 96, fontWeight: 700 }}>Arko</div>
                <div
                    style={{
                        display: "flex",
                        fontSize: 34,
                        marginTop: 28,
                        opacity: 0.9,
                    }}
                >
                    Create workflows and software architecture visually
                </div>
            </div>
        </div>,
        size,
    );
}
