const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const { URL } = require('url');

const readUrlsFromFile = async (filename) => {
  try {
    const content = await fs.readFile(filename, 'utf-8');
    return content.split(/\r?\n/);
  } catch (error) {
    console.error(`Error reading file: ${filename}`, error);
    process.exit(1);
  }
};

const fetchAndSavePage = async (url) => {
  try {
    const response = await axios.get(url);
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    const filename = path.join(__dirname, `${hostname}.txt`);
    await fs.writeFile(filename, response.data);
    console.log(`Saved content from ${url} to ${filename}`);
  } catch (error) {
    console.error(`Error fetching or saving content from ${url}`, error);
  }
};

const main = async () => {
  if (process.argv.length !== 3) {
    console.log('Usage: node urls.js FILENAME');
    process.exit(1);
  }

  const filename = process.argv[2];
  const urls = await readUrlsFromFile(filename);

  for (const url of urls) {
    await fetchAndSavePage(url);
  }
};

main();
