export interface IconData {
  name: string;
  size: string;
  color: string;
}

export  interface IconModel {
    name: string;
    size: string;
    color: string;
}

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
  subtitles: string[];
  source: string;
  icon: IconData;
}

export interface Subtopic {
    name: string;
    links: Link[];
}
  
export interface TopicData {
    topic: string;
    subtopics: Subtopic[];
}
export interface Link {
  title: string;
  url: string;
  tags?: string[];
  description?: string;
}
