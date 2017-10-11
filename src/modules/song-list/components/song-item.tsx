import * as React from "react";
import { Link } from "react-router-dom";
import { SongListItem } from "../types";

interface SongItemProps {
  song: SongListItem;
}

export const SongItem = ({ song }: SongItemProps) => {
  return (
    <Link
      className="song-list-item"
      to={`/songs/${song.id}`}
      style={{ color: song.color }}
    >
      {song.group} - {song.title}
    </Link>
  );
};
