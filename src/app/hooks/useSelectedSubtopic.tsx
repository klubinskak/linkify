import { LinkModel, TopicData } from "@/models/link";
import { useEffect, useState } from "react";

function useSelectedSubtopic(topic: string, subtopic: string) {
  const [links, setLinks] = useState<LinkModel[] | null>(null);
  if(topic.includes('%20')) {
    topic = topic.replace('%20', '-')
  };
  if(subtopic.includes('%20')) {
    subtopic = subtopic.replace('%20', ' ')
  };

  useEffect(() => {
    const fetchSelectedSubtopicLinks = async () => {
      try {
        const topicData: TopicData = await import(`../../../data/${topic}`)
          .then((module) => module.default);


        const currentSubtopicLinks = topicData.subtopics.find(
          (st) => st.name.toLowerCase() === subtopic.toLowerCase()
        )?.links;

        setLinks(currentSubtopicLinks || null);
        
      } catch (err) {
        console.error("Error fetching links:", err);
      }
    };

    if (topic && subtopic) {
      fetchSelectedSubtopicLinks();
    }
  }, [topic, subtopic, links]); // Ensure links are correctly set only when needed

  return { links };
}

export default useSelectedSubtopic;
