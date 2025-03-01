import { TopicData } from '@/models/link';
import fs from 'fs';
import path from 'path';


// Utility function to calculate total links in all JSON files
const calculateTotalLinks = (): number => {
  const directoryPath = path.join(process.cwd(), 'data'); 

  let totalLinks = 0;

  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
      if (path.extname(file) === '.json' && file !== 'index.json') {
      const filePath = path.join(directoryPath, file);

      const data: TopicData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      const fileLinks = data.subtopics.reduce((total, subtopic) => {
        return total + subtopic.links.length;
      }, 0);

      totalLinks += fileLinks;
    }
  });

  return totalLinks;
};

export default calculateTotalLinks;
