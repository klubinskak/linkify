import LinksGrid from ".";
import { promises as fs } from 'fs';
import path from 'path';

export async function generateStaticParams() {
  // Read the index data from the public directory
  const indexData: IndexModel[] = JSON.parse(
    await fs.readFile(path.join(process.cwd(), 'public/data/index.json'), 'utf8')
  );

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



