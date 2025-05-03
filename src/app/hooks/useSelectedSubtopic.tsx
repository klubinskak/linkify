import { Link, LinkModel, TopicData } from "@/models/link";
import { useEffect, useState } from "react";

function useSelectedSubtopic(topic: string, subtopic: string) {
  const [links, setLinks] = useState<LinkModel[] | null>(null);
  
  // Normalize the topic for file path - handle spaces and convert to kebab-case
  const normalizedTopic = topic
    .toLowerCase()
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/%20/g, '-')     // Replace %20 with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove any other special characters
    .replace(/-+/g, '-');     // Replace multiple hyphens with single hyphen
  
  // Normalize the subtopic for comparison
  const normalizedSubtopic = decodeURIComponent(subtopic)
    .toLowerCase()
    .replace(/%20/g, ' ');

  useEffect(() => {
    const fetchSelectedSubtopicLinks = async () => {
      try {
        const topicData: TopicData = await import(`../../../data/${normalizedTopic}.json`)
          .then((module) => module.default);

        const currentSubtopicLinks = topicData.subtopics.find(
          (st) => st.name.toLowerCase() === normalizedSubtopic
        )?.links;

        // Transform Link[] to LinkModel[]
        const transformedLinks = currentSubtopicLinks?.map((link: Link) => ({
          ...link,
          image: "" // Add default empty image property
        })) || null;

        setLinks(transformedLinks);
        
      } catch (err) {
        console.error("Error fetching links:", err);
        setLinks(null); // Set links to null on error
      }
    };

    if (topic && subtopic) {
      fetchSelectedSubtopicLinks();
    }
  }, [topic, subtopic, normalizedTopic, normalizedSubtopic]);

  return { links };
}

export default useSelectedSubtopic;
