import { useState, useEffect } from "react";
import { X, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductHuntBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user came from Product Hunt or has PH UTM params
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer.toLowerCase();

    const isFromProductHunt =
      urlParams.get("ref") === "producthunt" ||
      urlParams.get("utm_source") === "producthunt" ||
      referrer.includes("producthunt.com");

    // Check if banner was previously dismissed this session
    const wasDismissed = sessionStorage.getItem("ph-banner-dismissed") === "true";

    if (isFromProductHunt && !wasDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    sessionStorage.setItem("ph-banner-dismissed", "true");
  };

  const handleClaim = () => {
    window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call?utm_source=producthunt&utm_campaign=launch", "_blank");
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 shadow-lg">
      <div className="container-custom flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-full p-2">
            <Rocket className="w-5 h-5" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="font-bold">Product Hunt Exclusive!</span>
            <span className="text-white/90 text-sm sm:text-base">
              Free white-glove onboarding for the first 50 users
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleClaim}
            size="sm"
            className="bg-white text-orange-600 hover:bg-white/90 font-semibold whitespace-nowrap"
          >
            Claim Offer
          </Button>
          <button
            onClick={handleDismiss}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
