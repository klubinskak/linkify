import { LinkModel, TopicData } from "@/models/link";
import { useEffect, useState } from "react";

function useSelectedSubtopic(topic: string, subtopic: string) {
  const [links, setLinks] = useState<LinkModel[] | null>(null);
  
  // Normalize the topic for file path
  const normalizedTopic = topic.toLowerCase().replace(/%20/g, '-');
  
  // Normalize the subtopic for comparison
  const normalizedSubtopic = subtopic.toLowerCase().replace(/%20/g, ' ');

  useEffect(() => {
    const fetchSelectedSubtopicLinks = async () => {
      try {
        const topicData: TopicData = await import(`../../../data/${normalizedTopic}.json`)
          .then((module) => module.default);

        const currentSubtopicLinks = topicData.subtopics.find(
          (st) => st.name.toLowerCase() === normalizedSubtopic
        )?.links;

        setLinks(currentSubtopicLinks || null);
        
      } catch (err) {
        console.error("Error fetching links:", err);
      }
    };

    if (topic && subtopic) {
      fetchSelectedSubtopicLinks();
    }
  }, [topic, subtopic, normalizedTopic, normalizedSubtopic]);

  return { links };
}

export default useSelectedSubtopic;
