import calculateTotalLinks from "@/lib/calculateLinks";
import Slider from "./components/ui/slider";
import { Slide1 } from "./components/ui/slides/slide1";
import CardsGrid from "./components/layout/cards-grid";
import Notification from "./components/layout/notification";

export default async function Home() {
  const totalLinks = calculateTotalLinks();
  const slides = [
    { component: <Slide1 image={"/slide1-bg.png"} /> },
    // { component: <Slide2 image={"/slide-bg-1.png"} /> },
  ];

  return (
    <div className="h-auto flex flex-col pt-3">
      <Notification />

      <Slider slides={slides} />

      {/* Scrollable Content */}
      <div className="flex-1 p-2 overflow-auto">
        <CardsGrid totalLinks={totalLinks}/>

        {/* <CategorySection category={"Artificial intelligence"} items={['ietm 1']}/>
        <CategorySection category={"Artificial intelligence"} items={['ietm 1']}/>
        <CategorySection category={"Artificial intelligence"} items={['ietm 1']}/> */}
      </div>
    </div>
  );
}
