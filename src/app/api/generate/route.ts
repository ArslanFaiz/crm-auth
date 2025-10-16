import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const apiKey = process.env.DID_API_KEY;
    if (!apiKey) {
      console.error(" Missing DID_API_KEY");
      return NextResponse.json({ error: "Missing DID_API_KEY" }, { status: 500 });
    }

    const encodedKey = Buffer.from(`${apiKey}:`).toString("base64");

    console.log("🎬 Creating D-ID talk...");
    const createRes = await axios.post(
      "https://api.d-id.com/talks",
      {
        script: {
          type: "text",
          input: text,
          provider: { type: "microsoft", voice_id: "en-US-JennyNeural" },
        },
        source_url: "https://create-images-results.d-id.com/DefaultPresenters/Noelle_f/image.png",
      },
      {
        headers: {
          Authorization: `Basic ${encodedKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const talkId = createRes.data.id;
    console.log("Talk created:", talkId);
    let videoUrl = "";
    for (let i = 0; i < 20; i++) {
      const statusRes = await axios.get(`https://api.d-id.com/talks/${talkId}`, {
        headers: { Authorization: `Basic ${encodedKey}` },
      });

      const status = statusRes.data.status;
      console.log(`⏳ Status ${i + 1}:`, status);

      if (status === "done" && statusRes.data.result_url) {
        videoUrl = statusRes.data.result_url;
        console.log(" Video ready:", videoUrl);
        break;
      } else if (status === "error") {
        console.error(" D-ID error:", statusRes.data);
        return NextResponse.json(
          { error: "Video generation failed", details: statusRes.data },
          { status: 500 }
        );
      }

      await new Promise((r) => setTimeout(r, 3000));
    }

    if (!videoUrl) {
      return NextResponse.json({ error: "Timeout waiting for video" }, { status: 504 });
    }
    return NextResponse.json({ videoUrl });
  } catch (error: unknown) {
    const err = error as { response?: { data: unknown }; message: string };
    console.error("Server Error:", err.response?.data || err.message);
    return NextResponse.json(
      { error: "Video generation failed", details: err.response?.data || err.message },
      { status: 500 }
    );
  }
}
