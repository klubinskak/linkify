import LinksGrid from ".";

export async function generateStaticParams() {
  // Fetch or define the list of topics
  const indexData: IndexModel []= await import(
    `../../../../../data/index.json`
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


export default async function Page({ params }: { params: Promise<{ topic: string, subtopic: string }> }) {
  const topic = (await params).topic;
  const subtopic = (await params).subtopic;

  return <LinksGrid params={{
    topic: topic,
    subtopic: subtopic,
  }} />
}



