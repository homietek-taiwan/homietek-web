import fs from 'fs';

const zh = JSON.parse(fs.readFileSync('./src/dictionaries/zh-TW.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('./src/dictionaries/en.json', 'utf8'));
const ja = JSON.parse(fs.readFileSync('./src/dictionaries/ja.json', 'utf8'));

zh.about.coreValues.items[0].image = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80";
zh.about.coreValues.items[1].image = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80";

function copyImages(source, target) {
  if (!source || typeof source !== 'object') return;
  
  if (Array.isArray(source)) {
    source.forEach((item, index) => {
      if (target && target[index]) {
        copyImages(item, target[index]);
      }
    });
  } else {
    for (const key in source) {
      if (key === 'image' && typeof source[key] === 'string') {
        target[key] = source[key];
      } else if (typeof source[key] === 'object') {
        if (target[key]) copyImages(source[key], target[key]);
      }
    }
  }
}

copyImages(zh, en);
copyImages(zh, ja);

fs.writeFileSync('./src/dictionaries/zh-TW.json', JSON.stringify(zh, null, 2));
fs.writeFileSync('./src/dictionaries/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('./src/dictionaries/ja.json', JSON.stringify(ja, null, 2));
console.log("Images fixed");
