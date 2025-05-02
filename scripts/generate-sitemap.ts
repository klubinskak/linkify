import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';
import indexData from '../data/index.json';

async function generateSitemap() {
  try {
    // Create a stream to write to
    const stream = new SitemapStream({ hostname: 'https://linkify.ovh' });
    
    // Add static pages
    stream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
    stream.write({ url: '/about', changefreq: 'monthly', priority: 0.8 });

    // Add all categories and their subtopics
    indexData.forEach((category) => {
      // Format the category URL (convert spaces to hyphens and lowercase)
      const categoryUrl = category.title.toLowerCase().replace(/ /g, '-');
      
      // Add the category page
      stream.write({
        url: `/${categoryUrl}`,
        changefreq: 'weekly',
        priority: 0.8,
      });

      // Add all subtopics for this category
      category.subtitles.forEach((subtitle) => {
        // Format the subtitle URL (convert spaces to hyphens and lowercase)
        const subtitleUrl = subtitle.toLowerCase().replace(/ /g, '-');
        
        stream.write({
          url: `/${categoryUrl}/${subtitleUrl}`,
          changefreq: 'weekly',
          priority: 0.7,
        });
      });
    });

    // End the stream
    stream.end();

    // Generate sitemap and save to file
    const data = await streamToPromise(Readable.from(stream.pipe(stream)));
    createWriteStream('public/sitemap.xml').write(data.toString());

  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap(); 