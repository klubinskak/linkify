import Breadcrumbs from "@/app/components/layout/breadcrumbs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TopicData } from "@/models/link";
import Link from "next/link";

export async function generateStaticParams() {
  // Fetch or define the list of topics
  const indexData: IndexModel []= await import(
    `../../../../data/index.json`
  ).then((module) => module.default);

  // Map topics to params
  return indexData.map((item) => ({
    topic: item.title, 
  }));
}

interface IndexModel {
  title: string;
  subtitles: string[];
  source: string;
}

export default async function Page({ params }: { params: Promise<{ topic: string }> }) {
  const topic = (await params).topic;
  
  // Normalize the topic for file path
  const normalizedTopic = topic.toLowerCase().replace(/%20/g, '-');

  const topicData: TopicData = await import(
    `../../../../data/${normalizedTopic}.json`
  ).then((module) => module.default);

  return (
    <div className="h-[screen] p-4 md:p-0 overflow-auto flex flex-col">
      <Breadcrumbs items={[{ label: topicData.topic, href: `/${topic}` }]}/>
      <div className="flex-1 h-full">
        <h1 className="text-xl mt-4 mb-3">{topicData.topic}</h1>
        <div className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4 gap-x-4 p-3">
          {topicData.subtopics.map((st) => (
            <Link
              href={`/${topic}/${st.name.replace(/ /g, '%20')}`}
              key={st.name}
            >
              <Card className="w-full h-24">
                <CardHeader>
                  <CardTitle className="text-center">{st.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
