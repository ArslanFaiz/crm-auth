"use client";

import { useState } from "react";
import axios from "axios";

export default function Avatar() {
  const [text, setText] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    setLoading(true);
    setVideoUrl("");

    try {
      const res = await axios.post("/api/generate", { text });
      setVideoUrl(res.data.videoUrl);
    } catch (err) {
      console.error(err);
      alert("Error generating video");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        🗣️ Talking Avatar Video Generator
      </h1>

      <div className="w-full max-w-3xl bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-700">
        {/* Input Section */}
        <textarea
          rows={4}
          placeholder="Type what you want the avatar to say..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 text-base rounded-xl bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none mb-4"
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !text}
          className={`w-full py-3 rounded-xl text-lg font-semibold transition-all ${
            loading || !text
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating...
            </div>
          ) : (
            "🎬 Generate Video"
          )}
        </button>

        {/* Video Section */}
        <div className="mt-8 flex flex-col items-center">
          {loading && (
            <div className="flex flex-col items-center text-gray-400">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="animate-pulse">Please wait... generating video</p>
            </div>
          )}

          {!loading && videoUrl && (
            <div className="flex flex-col items-center w-full">
              <video
                src={videoUrl}
                controls
                autoPlay
                className="rounded-2xl shadow-lg w-full max-w-md border border-gray-700"
              />
              <a
                href={videoUrl}
                download="avatar-video.mp4"
                className="mt-4 bg-green-600 hover:bg-green-700 transition-all py-2 px-6 rounded-xl text-lg font-medium text-white"
              >
                ⬇️ Download Video
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <p className="text-gray-500 mt-10 text-sm">
        Made with ❤️ using Next.js + TailwindCSS + D-ID API
      </p>
    </div>
  );
}
