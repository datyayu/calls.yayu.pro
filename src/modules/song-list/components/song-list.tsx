import * as React from "react";
import { SongListItem } from "../types";
import { SongItem } from "./song-item";

interface SongListProps {
  songs: SongListItem[];
}

export const SongList = ({ songs }: SongListProps) => {
  return (
    <div className="song-list">
      {songs.map(song => <SongItem key={song.id} song={song} />)}
    </div>
  );
};
