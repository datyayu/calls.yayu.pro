import { Song } from "../modules/calls-viewer/types";
import { SongListItem } from "../modules/song-list/types";

export async function fetchSong(songId: string): Promise<Song> {
  const response: Response = await fetch(`/songs/${songId}.json`);
  const song: Song = await response.json();

  return song;
}

export async function fetchSongList(): Promise<SongListItem[]> {
  const response: Response = await fetch("/songs.json");
  const songList: SongListItem[] = await response.json();

  return songList;
}
