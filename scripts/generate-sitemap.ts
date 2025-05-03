const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { Readable } = require('stream');
const indexData = require('../data/index.json');

async function generateSitemap() {
  try {
    const links = [];
    
    // Add static pages
    links.push({ url: '/', changefreq: 'daily', priority: 1.0 });
    links.push({ url: '/about', changefreq: 'monthly', priority: 0.8 });

    // Add all categories and their subtopics
    indexData.forEach((category: { title: string; subtitles: string[] }) => {
      // Format the category URL (convert spaces to hyphens and lowercase)
      const categoryUrl = category.title.toLowerCase().replace(/ /g, '-');
      
      // Add the category page
      links.push({
        url: `/${categoryUrl}`,
        changefreq: 'weekly',
        priority: 0.8,
      });

      // Add all subtopics for this category
      category.subtitles.forEach((subtitle: string) => {
        // Format the subtitle URL (convert spaces to hyphens and lowercase)
        const subtitleUrl = subtitle.toLowerCase().replace(/ /g, '-');
        
        links.push({
          url: `/${categoryUrl}/${subtitleUrl}`,
          changefreq: 'weekly',
          priority: 0.7,
        });
      });
    });

    // Create sitemap
    const stream = new SitemapStream({ hostname: 'https://linkify.ovh' });
    
    // Write our links to the stream
    links.forEach(link => stream.write(link));
    stream.end();

    // Generate the XML
    const data = await streamToPromise(stream);
    
    // Write the sitemap to file
    createWriteStream('public/sitemap.xml').write(data.toString());
    console.log('Sitemap generated successfully!');

  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap(); 