/**
 * Script for fixing the offset in a quick way.
 * This exists because I usually first code the lyrics
 * using the CD version of the songs instead of the live
 * version, just because is easier to notice patterns/breaks
 * without the audience/live noise.
 *
 * Should only be ran as a devtool when required, and has
 * no place in the build process.
 *
 * USAGE:
 *   node ./parse-songs.js [OFFSET] [FILE]
 *
 * EXAMPLE
 *   node ./parse-songs.js 5 ../songs/aqours-aojan.json
 *
 * NOTE: This asumes that both versions will have the same timings,
 * so be aware of extra breaks and extended live versions as they will
 * need to be fixed manually.
 */
const path = require("path");
const fs = require("fs-extra");

const OFFSET = parseInt(process.argv[2], 10); // in seconds
const FILENAME = process.argv[3];
const SONGS_DIR = path.resolve(__dirname, "..", "songs");

const song = fs.readJSONSync(FILENAME);
const newPath = path.resolve(SONGS_DIR, `${song.id}.offset.json`);

// Log the current file
console.log(`[OFFSET SCRIPT] PARSING ${song.title} - ${song.group}`);

song.title = song.title + " (offset)";
song.id = song.id + "-offset";

// Update lyrics format
song.lyrics = song.lyrics.map(word => {
  if (word.length === 0) return word;

  word[1] = word[1] + OFFSET;
  return word;
});

// Write to songs dir
fs.writeJSONSync(newPath, song, { encoding: "utf-8", spaces: 4 });

console.log("[OFFSET SCRIPT] DONE");
