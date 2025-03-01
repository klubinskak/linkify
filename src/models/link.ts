export interface LinkModel {
    title: string;
    url: string;
    image: string;
    tags?: string[];

    metadata?: MetadataModel;
}

export interface MetadataModel {
    title: string;
    description: string;
    image: string;
    url: string;
}

export interface LinksData {
  title: string;
  source: string;
  subtitles: string[];
}

export interface Subtopic {
    name: string;
    links: { title: string; url: string, image: string }[];
}
  
export interface TopicData {
    topic: string;
    subtopics: Subtopic[];
}