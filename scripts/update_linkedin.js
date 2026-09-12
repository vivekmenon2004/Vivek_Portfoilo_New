/**
 * Automated LinkedIn Sync Script for Portfolio Website
 * Usage: node scripts/update_linkedin.js [RSS_OR_API_URL]
 *
 * This script fetches LinkedIn posts (via RSS feed, RSS2JSON, or Third-Party API)
 * and updates `assets/data/linkedin_posts.json` automatically with post titles,
 * descriptions, images, and links.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_FILE = path.join(__dirname, '..', 'assets', 'data', 'linkedin_posts.json');

// Default target RSS or API endpoint (can be passed via environment variable LINKEDIN_FEED_URL)
const FEED_URL = process.env.LINKEDIN_FEED_URL || process.argv[2];

function fetchFeed(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Invalid JSON received from feed: ' + e.message));
        }
      });
    }).on('error', reject);
  });
}

async function syncLinkedInFeed() {
  console.log('🔄 Starting LinkedIn post synchronization...');

  if (!FEED_URL) {
    console.log('ℹ️ No LINKEDIN_FEED_URL specified.');
    console.log('💡 To auto-sync live LinkedIn posts via RSS2JSON / Curator / SociableKIT:');
    console.log('   Set env variable LINKEDIN_FEED_URL or run: node scripts/update_linkedin.js <YOUR_FEED_URL>');
    return;
  }

  try {
    const rawData = await fetchFeed(FEED_URL);
    const items = rawData.items || rawData.posts || [];

    if (!items.length) {
      console.log('⚠️ No items found in feed response.');
      return;
    }

    // Read existing JSON
    let existingPosts = [];
    if (fs.existsSync(DATA_FILE)) {
      existingPosts = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }

    const updatedPosts = items.map((item, index) => {
      // Extract image URL from enclosure, thumbnail, or content HTML
      let imageUrl = item.thumbnail || item.enclosure?.link || item.image;
      if (!imageUrl && item.content) {
        const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/i);
        if (imgMatch) imageUrl = imgMatch[1];
      }

      return {
        id: `linkedin-auto-${item.guid || index}`,
        title: item.title || 'LinkedIn Post',
        text: (item.description || item.content || '').replace(/<[^>]*>/g, '').trim().slice(0, 220) + '...',
        imageUrl: imageUrl || 'assets/images/vivekm.png',
        date: new Date(item.pubDate || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        timestamp: new Date(item.pubDate || Date.now()).toISOString().split('T')[0],
        reactions: 'LinkedIn Activity',
        reactionIcons: '👍 🚀',
        postUrl: item.link || 'https://www.linkedin.com/in/vivek-menon-/',
        badge: index === 0 ? 'Latest Post' : 'LinkedIn'
      };
    });

    fs.writeFileSync(DATA_FILE, JSON.stringify(updatedPosts, null, 2), 'utf8');
    console.log(`✅ Successfully updated ${updatedPosts.length} posts in assets/data/linkedin_posts.json!`);

  } catch (err) {
    console.error('❌ Failed to sync LinkedIn feed:', err.message);
  }
}

syncLinkedInFeed();
