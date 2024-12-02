import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  //@ts-expect-error: Unused variable warning
  const [essentialCookies, setEssentialCookies] = useState(true);
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [marketingCookies, setMarketingCookies] = useState(true);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    Cookies.set(
      "cookieConsent",
      JSON.stringify({
        essential: true,
        analytics: true,
        marketing: true,
      }),
      { expires: 365 }
    );
    setIsVisible(false);
    console.log("Accept All");
  };

  const handleReject = () => {
    Cookies.set(
      "cookiesConsent",
      JSON.stringify({
        essential: false,
        analytics: false,
        marketing: false,
      }),
      { expires: 365 }
    );
    setIsVisible(false);
    console.log("Reject");
  };

  const handleCustomize = () => {
    setShowCustomize(true);
    console.log("Customize");
  };

  const handleSaveCustomize = () => {
    Cookies.set(
      "cookieConsent",
      JSON.stringify({
        essential: essentialCookies,
        analytics: analyticsCookies,
        marketing: marketingCookies,
      }),
      { expires: 365 }
    );
    setIsVisible(false);
    setShowCustomize(false);
    console.log("Save");
  };

  if (!isVisible) return null;

  return (
    <div className="z-50 max-w-max fixed bottom-4 right-4 bg-slateGray text-white py-6 px-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-4">
      {!showCustomize ? (
        <>
          <div className="flex flex-col p-4 items-center md:items-start text-center md:text-left">
            <p className="text-lg font-bold mb-2 tracking-wide">
              We Travel with Cookies!
            </p>
            <p className="max-w-md text-gray-100">
              Adventure Planner uses cookies to make your trip planning smooth
              and fun. Whether it's helping you find the best flights or saving
              your favorite destinations, our cookies keep things running
              perfectly. No need to worry, they won’t take up any luggage
              space—just a bit in your browser!
            </p>
          </div>
          <div className="inline-flex flex-col gap-2.5 px-4 mx-auto">
            <button
              onClick={handleAcceptAll}
              className="shadow-sm shadow-black hover:shadow-inner hover:shadow-black min-w-full bg-cloudBlue hover:bg-opacity-90 text-black px-4 py-2 rounded-md"
            >
              <strong className="block font-semibold mb-2 tracking-wide">
                Accept All Cookies
              </strong>
              <p className="text-sm">Ready for the adventure!</p>
            </button>
            <button
              onClick={handleCustomize}
              className="shadow-sm shadow-black hover:shadow-inner hover:shadow-black min-w-full bg-cloudGray hover:bg-opacity-90 text-black px-4 py-2 rounded-md"
            >
              <p className="block font-semibold mb-2 tracking-wide">
                Customize Settings
              </p>
              <p className="text-sm">Choose what we pack for your journey.</p>
            </button>
            <button
              onClick={handleReject}
              className="shadow-sm shadow-black hover:shadow-inner hover:shadow-black min-w-full bg-cloudPink hover:bg-opacity-90 text-black px-4 py-2 rounded-md"
            >
              <strong className="block font-semibold mb-2 tracking-wide">
                Reject
              </strong>
              <p className="text-sm">No cookies for now, thanks!</p>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <p className="text-center">
              Choose your cookie preferences for your journey!
            </p>
            <label>
              <input type="checkbox" checked={essentialCookies} disabled />{" "}
              Essential Cookies (Required)
            </label>
            <label>
              <input
                type="checkbox"
                checked={analyticsCookies}
                onChange={(e) => setAnalyticsCookies(e.target.checked)}
                className="mr-2"
              />{" "}
              Analytics Cookies (Track your trip progress)
            </label>
            <label>
              <input
                type="checkbox"
                checked={marketingCookies}
                onChange={(e) => setMarketingCookies(e.target.checked)}
                className="mr-2"
              />{" "}
              Marketing Cookies (Personalize offers)
            </label>
          </div>
          <button
            onClick={handleSaveCustomize}
            className="hover:shadow-inner hover:shadow-black shadow-sm shadow-black bg-white hover:bg-opacity-90 text-black px-6 py-2 rounded-md"
          >
            Save Preferences
          </button>
        </>
      )}
    </div>
  );
};

export default CookieConsent;
