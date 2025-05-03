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
    description: string;
    url: string;
    image: string;
    imageSource: string;
    tags?: string[];
    error?: string;

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
  image?: string;
  imageSource?: string;
}
