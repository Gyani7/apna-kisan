import { Button } from "@/components/ui/button";

export function ReelsPlayer() {
    // Mock data
    const reel = {
        src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        user: "KisanTech",
        caption: "Tips for a bountiful harvest! #farming #tips"
    }

  return (
    <div className="relative h-[80vh] bg-black rounded-lg">
      {/* Video player would go here */}
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <p className="font-bold">@{reel.user}</p>
        <p>{reel.caption}</p>
      </div>
    </div>
  );
}
