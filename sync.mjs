import fs from 'fs';

const zh = JSON.parse(fs.readFileSync('./src/dictionaries/zh-TW.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('./src/dictionaries/en.json', 'utf8'));
const ja = JSON.parse(fs.readFileSync('./src/dictionaries/ja.json', 'utf8'));

function syncObj(target, source) {
  for (const key in source) {
    if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      syncObj(target[key], source[key]);
    } else if (Array.isArray(source[key])) {
      if (!target[key]) target[key] = [];
      source[key].forEach((item, i) => {
        if (typeof item === 'object') {
          if (!target[key][i]) target[key][i] = {};
          syncObj(target[key][i], item);
        } else {
          if (target[key].length <= i) target[key][i] = item;
        }
      });
    } else {
      if (target[key] === undefined) target[key] = source[key];
    }
  }
}

syncObj(en, zh);
syncObj(ja, zh);

fs.writeFileSync('./src/dictionaries/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('./src/dictionaries/ja.json', JSON.stringify(ja, null, 2));
console.log("Sync complete");
