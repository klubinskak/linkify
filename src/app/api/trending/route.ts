import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface TrendingTool {
  title: string;
  topic: string;
  subtopic: string;
  description: string;
  url: string;
}

interface SubtopicData {
  name: string;
  links: Array<{
    title: string;
    url: string;
    description?: string;
  }>;
}

interface CategoryData {
  subtopics: SubtopicData[];
}

interface IndexData {
  title: string;
  source: string;
  subtitles: string[];
}

export async function GET() {
  try {
    // Read the index data from the public directory
    const indexData: IndexData[] = JSON.parse(
      await fs.readFile(path.join(process.cwd(), 'public/data/index.json'), 'utf8')
    );

    // Get all tools from different categories
    const allTools: TrendingTool[] = [];
    
    for (const category of indexData) {
      try {
        // Read the category data from the public directory
        const categoryData: CategoryData = JSON.parse(
          await fs.readFile(path.join(process.cwd(), `public/data/${category.source}`), 'utf8')
        );

        if (!categoryData.subtopics || !Array.isArray(categoryData.subtopics)) {
          console.error(`Invalid data structure for category ${category.title}`);
          continue;
        }

        // Get tools from each subtopic with proper type checking
        categoryData.subtopics.forEach((subtopic: SubtopicData) => {
          if (!subtopic.links || !Array.isArray(subtopic.links)) {
            console.error(`Invalid subtopic structure in ${category.title}/${subtopic.name}`);
            return;
          }

          subtopic.links.forEach((link) => {
            if (!link.title || !link.url) {
              console.error(`Invalid link structure in ${category.title}/${subtopic.name}`);
              return;
            }

            allTools.push({
              title: link.title,
              topic: category.source.replace('.json', ''),
              subtopic: subtopic.name.toLowerCase(),
              description: link.description || `A curated ${category.title.toLowerCase()} resource for ${subtopic.name.toLowerCase()}`,
              url: link.url
            });
          });
        });
      } catch (categoryError) {
        console.error(`Error processing category ${category.title}:`, categoryError);
        continue; // Skip failed category but continue with others
      }
    }

    if (allTools.length === 0) {
      return NextResponse.json(
        { error: 'No tools available' },
        { status: 404 }
      );
    }

    // Randomly select 3 tools (or less if fewer tools available)
    const numberOfTools = Math.min(3, allTools.length);
    const trendingTools = allTools
      .sort(() => Math.random() - 0.5)
      .slice(0, numberOfTools);

    return NextResponse.json({ 
      tools: trendingTools,
      total: trendingTools.length
    });
  } catch (error) {
    console.error('Error in trending API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending tools' },
      { status: 500 }
    );
  }
} 