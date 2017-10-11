import * as React from "react";
import { fetchSongList } from "../../../api/songs";
import { SongListItem } from "../types";
import { Loading } from "../../shared";
import { SongList } from "../components";

interface SongListContainerState {
  isFetching: boolean;
  hasError: boolean;
  songList: SongListItem[];
}

export class SongListContainer extends React.Component<
  {},
  SongListContainerState
> {
  componentWillMount() {
    this.getSongList();
  }

  getSongList = async () => {
    this.setState({ isFetching: true, hasError: false });

    try {
      const songList = await fetchSongList();
      this.setState({ songList, isFetching: false });
    } catch (e) {
      this.setState({ isFetching: false, hasError: true });
    }
  };

  render() {
    const { isFetching, hasError, songList } = this.state;

    if (isFetching) {
      return <Loading />;
    }

    if (hasError) {
      return <h1>Error getting the song list</h1>;
    }

    return (
      <div>
        <h1 style={{ textAlign: "center" }}> Song list </h1>
        <SongList songs={songList} />
      </div>
    );
  }
}
