import { STATIC_IMAGE_MAP } from '../src/utils/imageMap';

const urlToKeys = new Map<string, string[]>();

for (const [key, url] of Object.entries(STATIC_IMAGE_MAP)) {
  if (!urlToKeys.has(url)) {
    urlToKeys.set(url, []);
  }
  urlToKeys.get(url)!.push(key);
}

console.log('Total keys in STATIC_IMAGE_MAP:', Object.keys(STATIC_IMAGE_MAP).length);
console.log('Total unique URLs in STATIC_IMAGE_MAP:', urlToKeys.size);

const duplicates: { url: string; keys: string[] }[] = [];
for (const [url, keys] of urlToKeys.entries()) {
  const norm = new Set(keys.map(k => k.replace(/[^a-z0-9]/g, '')));
  if (norm.size > 1) {
    duplicates.push({ url, keys });
  }
}

console.log(`Duplicates across distinct words: ${duplicates.length}`);
duplicates.forEach(d => {
  console.log(`URL: ${d.url.slice(0, 80)}...`);
  console.log(`  Keys: ${d.keys.join(', ')}`);
});
