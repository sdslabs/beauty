"use client";
import { useEffect } from "react";
import useStore from "@/lib/store/useStore";
import api from "@/lib/api/config";
import Image from "next/image";
import Link from "next/link";
import { configureService } from "@/lib/api/services/configure";
import moment from "moment-timezone";
import Navbar from "@/lib/components/NavBar";
import Footer from "@/lib/components/Footer";

export default function Home() {
  const { name, about, startingTime, endingTime, prizes, setConfig } = useStore();

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await configureService.getConfigs();
        console.log("response", response);
        setConfig({
          name: response.data.name,
          about: response.data.about,
          startingTime: response.data.starting_time,
          endingTime: response.data.ending_time,
          prizes: response.data.prizes,
          logoUrl: response.data.logo_url,
        });
      } catch (error) {
        console.error("Failed to fetch config:", error);
      }
    }

    fetchConfig();
  }, [setConfig]);

  const formatDate = (dateString: string) => {
    const parsedDate = moment(dateString, "HH:mm:ss [UTC:] Z, Do MMMM YYYY, dddd");
  
    if (!parsedDate.isValid()) {
      return "Invalid Date";
    }
  
    return parsedDate.format("dddd, MMMM Do YYYY, hh:mm:ss A z");
  };
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-8">
            <h1 className="text-5xl font-bold leading-tight">
              Be a part of <br />
              <span className="text-blue-600">{name || "Loading..."}</span>
            </h1>
            <p className="text-xl text-gray-600">{about || "Loading..."}</p>
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium text-gray-600">Starting Time</h2>
                <p className="text-xl font-semibold text-gray-800">
                  {startingTime ? formatDate(startingTime) : "Loading..."}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-600">Ending Time</h2>
                <p className="text-xl font-semibold text-gray-800">
                  {endingTime ? formatDate(endingTime) : "Loading..."}
                </p>
              </div>
            </div>
            <Link
              href="/register"
              className="inline-block px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Register Now
            </Link>
          </div>
          <div className="flex-1">
            <Image
              src="/assets/landing1.svg"
              alt="Landing illustration"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      <Footer/>
    </main>
  );
}
