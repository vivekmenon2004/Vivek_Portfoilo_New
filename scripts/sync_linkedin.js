/**
 * Automated LinkedIn Sync Script for Portfolio Website
 * Connected to SociableKIT Feed (Embed ID: 25720456)
 * 
 * Features:
 * 1. Automatically fetches all 17+ LinkedIn posts from Vivek Menon's profile.
 * 2. Automatically downloads remote images into `assets/images/linkedin/` for permanent self-hosting.
 * 3. Updates `assets/data/linkedin_posts.json` with clean titles, descriptions, dates, and engagement stats.
 * 4. Runs automatically via GitHub Actions (.github/workflows/linkedin_sync.yml) daily.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const DATA_FILE = path.join(__dirname, '..', 'assets', 'data', 'linkedin_posts.json');
const IMAGES_DIR = path.join(__dirname, '..', 'assets', 'images', 'linkedin');
const DEFAULT_FEED_URL = 'https://data.accentapi.com/feed/25720456.json';
const FEED_URL = process.env.LINKEDIN_FEED_URL || DEFAULT_FEED_URL;

// Ensure destination directories exist
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

function downloadImage(url, destPath) {
  return new Promise((resolve) => {
    if (!url || !url.startsWith('http')) return resolve(url);
    const client = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, destPath).then(resolve);
      }
      if (res.statusCode !== 200) {
        fs.unlink(destPath, () => {});
        return resolve(null);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(destPath);
      });
    }).on('error', () => {
      fs.unlink(destPath, () => {});
      resolve(null);
    });
  });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function cleanText(html) {
  if (!html) return '';
  return html
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

const LOCAL_FALLBACK_IMAGES = {
  '7511385542631030786': 'assets/images/MarianGrid.png',
  '7468642557292507136': 'assets/images/linkedin/post_393419321.jpg',
  '7455265229078429696': 'assets/images/linkedin/post_393419322.jpg',
  '7440770033393438721': 'assets/images/linkedin/post_393419323.jpg',
  '7436725318192852992': 'assets/images/linkedin/post_393419324.jpg',
  '7432083343674007552': 'assets/images/linkedin/post_393419325.jpg'
};

async function syncAllPosts() {
  console.log('🔄 Fetching all LinkedIn posts from SociableKIT feed...');
  const json = await fetchJson(FEED_URL);
  const rawPosts = json.posts || [];
  console.log(`📥 Total posts received from feed: ${rawPosts.length}`);

  const formattedPosts = [];

  for (let i = 0; i < rawPosts.length; i++) {
    const p = rawPosts[i];
    const postId = p.id || `post_${i}`;
    const cleanContent = cleanText(p.description_raw || p.description);
    const lines = cleanContent.split('\n').filter(l => l.trim().length > 0 && !l.trim().startsWith('#'));
    let title = lines[0] || 'LinkedIn Post';
    if (title.length > 60) {
      title = title.substring(0, 57) + '...';
    }

    const remoteImg = p.thumbnail_url || p.thumbnail_sk_img || p.thumbnail || (p.images && p.images[0]) || (p.images_sk_img && p.images_sk_img[0]);
    let localImg = null;

    if (remoteImg) {
      const fileName = `post_${postId}.jpg`;
      const localPath = path.join(IMAGES_DIR, fileName);
      if (!fs.existsSync(localPath) || fs.statSync(localPath).size === 0) {
        console.log(`⬇️ Downloading media for post ${i + 1}/${rawPosts.length}: ${postId}`);
        const downloaded = await downloadImage(remoteImg, localPath);
        if (downloaded) localImg = `assets/images/linkedin/${fileName}`;
      } else {
        localImg = `assets/images/linkedin/${fileName}`;
      }
    }

    if (!localImg && LOCAL_FALLBACK_IMAGES[postId]) {
      localImg = LOCAL_FALLBACK_IMAGES[postId];
    }

    const dateObj = new Date(p.post_date_time || p.post_date || p.date_time || Date.now());
    const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const likes = parseInt(p.likes_count || '0', 10);
    const comments = parseInt(p.comments_count || '0', 10);
    const reactionsCount = likes + comments;

    const postUrl = p.post_url && p.post_url.startsWith('http') 
      ? p.post_url 
      : `https://www.linkedin.com/feed/update/urn:li:activity:${postId}`;

    formattedPosts.push({
      id: postId,
      title: title,
      text: cleanContent.slice(0, 220) + (cleanContent.length > 220 ? '...' : ''),
      imageUrl: localImg,
      postUrl: postUrl,
      date: dateStr,
      badge: i === 0 ? `${dateStr} • Latest` : dateStr,
      reactions: reactionsCount > 0 ? `${reactionsCount} reactions` : 'LinkedIn Activity',
      reactionIcons: '👍 🚀',
      authorName: 'Vivek Menon',
      authorAvatar: 'assets/images/vivekm.png',
      authorRole: '@vivek-menon-',
      timestamp: dateObj.toISOString()
    });
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(formattedPosts, null, 2), 'utf8');
  console.log(`✅ Successfully synced all ${formattedPosts.length} posts to assets/data/linkedin_posts.json!`);
}

syncAllPosts().catch(err => {
  console.error('❌ LinkedIn sync error:', err.message);
});
