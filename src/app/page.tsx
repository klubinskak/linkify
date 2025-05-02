import calculateTotalLinks from "@/lib/calculateLinks";
import { HomeClient } from "./components/layout/home-client";

export default async function Home() {
  const totalLinks = calculateTotalLinks();
  return <HomeClient totalLinks={totalLinks} />;
}
