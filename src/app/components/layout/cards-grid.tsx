"use client";

import { HyperText } from "@/components/ui/hyper-text";
import { LinkModel } from "@/models/link";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import axios, { AxiosError, AxiosResponse } from "axios";
import { NotificationContext } from "@/app/context/notificationsContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface CardsGridProps {
  totalLinks: number;
}

const CardsGrid: React.FC<CardsGridProps> = ({ totalLinks }) => {
  const [linkWithMetadata, setLinkWithMetadata] = useState<LinkModel | null>(
    null
  );
  const [email, setEmail] = useState("");
  const [loading, setIsLoading] = useState(false);
  const { addNotification } = useContext(NotificationContext);

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const link = "https://knowt.com";
        const response = await fetch(`/api/metadata?url=${link}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setLinkWithMetadata(data.urlWithMetadata);
      } catch (err) {
        console.error("Error fetching metadata:", err);
      }
    }

    fetchMetadata();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .put("/api/newsletter", {
        email: email,
      })
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          addNotification({
            message: "You subscribed successfully to Newsletter, thank you!",
            title: "Subscribed successfully",
            type: "success",
          });
        } else {
          console.error(res);
        }
      })
      .catch((err: AxiosError) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[0.75fr_0.5fr_1.25fr] gap-6 py-6 p-4">
      {/* First Card */}
      <Link href={linkWithMetadata?.url || ""} passHref target="_blank">
        <div className="opacity-70 hover:opacity-100 relative group w-full border border-white/10 dark:border-gray-700 flex justify-center items-center flex-col rounded-2xl h-64 md:h-52 bg-gradient-to-br from-gray-500/5 via-transparent to-transparent p-4 backdrop-blur-sm transition-all shadow-lg">
          {linkWithMetadata && (
            <>
              <img
                src="/grid white 1.png"
                alt="grid"
                className="absolute inset-0 w-full h-full object-cover opacity-35 rounded-2xl"
              />
              <div className="relative w-full h-full">
                <img
                  src={linkWithMetadata.image}
                  alt={linkWithMetadata.title}
                  className="p-3 rounded rounded-[30px] absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-4 left-3  bg-yellow-500 text-white rounded-full px-3 py-1 text-xs font-bold flex items-center justify-center shadow-md">
                <span className="mr-2">🥇</span> This Month Winner
              </div>
              <div className="relative z-10 text-center mt-5">
                <h3 className="text-sm font-medium font-excon">
                  {linkWithMetadata?.title || "Website Name"}
                </h3>
              </div>
            </>
          )}
        </div>
      </Link>

      {/* Second Card */}
      <div className="opacity-70 hover:opacity-100 relative group w-full border border-white/10 flex justify-center items-center flex-col rounded-2xl h-64 md:h-52 bg-gradient-to-br from-gray-500/5 via-transparent to-transparent p-4 backdrop-blur-sm transition-all shadow-lg max-w-40 max-h-40">
        <img
          src="/grid white 1.png"
          alt="grid"
          className="absolute inset-0 w-full h-full object-cover opacity-35 rounded-2xl"
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 transition-opacity" />
        <HyperText
          className="text-5xl font-panchang font-bold z-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-count-up"
          text={(Math.floor(totalLinks / 10) * 10).toString() + "+"}
          />
        <div className="flex gap-2 mt-2">
          <h3 className="text-sm font-medium font-excon">
            links & still counting
          </h3>
        </div>
      </div>

      {/* Third Card */}
      <div className="opacity-70 hover:opacity-100 relative group w-full border border-white/10 flex justify-center items-center flex-col rounded-2xl h-64 md:h-52 bg-gradient-to-br from-gray-500/5 via-transparent to-transparent p-4 backdrop-blur-sm transition-all shadow-lg hover:shadow-xl md:col-span-2 lg:col-span-1">
        <img
          src="/grid white 1.png"
          alt="grid"
          className="absolute inset-0 w-full h-full object-cover opacity-35 rounded-2xl"
        />
        <div className="flex flex-col z-10 text-center w-full">
          <h3 className="text-xl font-medium font-panchang px-8">
            Join Our Newsletter
          </h3>
          <p className="text-xs font-medium text-gray-400 mt-2">
            Stay updated with the latest updates.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex mt-4 gap-2 w-full mt-2 text-center justify-center items-center"
          >
            <Input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />

            <button
              type="submit"
              className="py-2 w-24 h-10 p-2 flex justify-center items-center text-center rounded-md text-white text-sm border border-1 hover:bg-gray-300 hover:bg-opacity-10 cursor-pointer"
            >
              {loading ?  <AiOutlineLoading3Quarters className="animate-spin text-2xl text-white" /> : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardsGrid;
