/**
 * Script for converting easy-to-edit song files
 * into a suitable format for the app.
 *
 * Should be run on each build, as this generates the
 * files the app will use as a json API.
 */

const fs = require("fs-extra");
const path = require("path");

const SONGS_DIR = path.resolve(__dirname, "..", "songs");
const OUTPUT_DIR = path.resolve(__dirname, "..", "public", "songs");
const DB_LIST_PATH = path.resolve(__dirname, "..", "public", "songs.json");

// START
console.log("[BUILD SCRIPT] STARTED SONG PARSING");

// Clean output dir
fs.mkdirpSync(OUTPUT_DIR);
fs.emptyDirSync(OUTPUT_DIR);

// Iterate for each song file
const songFiles = fs.readdirSync(SONGS_DIR);

const songList = [];

songFiles.forEach(filename => {
  // Read file
  const filePath = path.resolve(SONGS_DIR, filename);
  const song = fs.readJSONSync(filePath);

  // Log the current file
  console.log(`[BUILD SCRIPT] PARSING ${song.title} - ${song.group}`);

  // Update lyrics format
  song.lyrics = song.lyrics.map(word => {
    return {
      text: word[0],
      time: word[1],
      isCall: word[2] || false,
      color: word[3] || false,
      isLineBreak: word.length === 0
    };
  });

  // Write to public dir
  const newPath = path.resolve(OUTPUT_DIR, `${song.id}.json`);
  fs.writeJSONSync(newPath, song, { encoding: "utf-8", spaces: 4 });

  // Store in the songlist
  songList.push({
    id: song.id,
    title: song.title,
    group: song.group,
    color: song.color
  });
});

// Write song list to a json file
fs.writeJSONSync(DB_LIST_PATH, songList, { encoding: "utf-8", spaces: 4 });
console.log(`[BUILD SCRIPT] FINISHED PARSING SONGS`);
