import Image from "next/image";
import Link from "next/link";

interface Slide1Props {
  image: string;
}

export function Slide1({ image }: Slide1Props) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={image}
        alt="Slide 1"
        width={1200}
        height={1200}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative text-white p-4 flex  items-center h-full">
        <div className="ml-4">
          <h3 className="text-sm lg:text-lg font-bold font-panchang w-4/6">
          Unlock the Web’s Best Resources in One Place.
          </h3>
          <p className="text-[11px] mt-2 text-gray-400">Start exploring now!</p>
          <Link href="/podcasts/tech">
            <button className="mt-12 cursor-pointer group relative bg-[#f8f9fa] hover:bg-zinc-300 text-black text-xs text-sm py-2 rounded-md transition-all duration-200 ease-in-out w-36 h-9">
              <div className="relative flex items-center justify-center gap-2">
                <span className="relative inline-block overflow-hidden">
                  <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                    Get Started
                  </span>
                  <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                    Right Now
                  </span>
                </span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45"
                  viewBox="0 0 24 24"
                >
                  <circle fill="currentColor" r={11} cy={12} cx={12} />
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={2}
                    stroke="white"
                    d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
                  />
                </svg>
              </div>
            </button>
          </Link>
          <span className="absolute top-0 right-5 mt-3 bg-[#FF4401] px-4 py-2 w-50 rounded-md text-white text-xs font-excon border border-1 cursor-default">
            Best resources
          </span>
        </div>
      </div>
    </div>
  );
}
