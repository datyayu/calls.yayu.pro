import { Lyric } from "./Lyric";
import { MediaPlayerSource } from "./MediaPlayerSource";

export type Song = {
  id: string;
  title: string;
  group: string;
  groupId: string;
  color: string;
  kb: {
    image: string;
    colors: Array<string>;
  };

  audioFiles: Array<MediaPlayerSource>;
  videoFiles: Array<MediaPlayerSource>;

  lyrics: Array<Lyric>;
};
