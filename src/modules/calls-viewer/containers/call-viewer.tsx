import * as React from "react";
import { match } from "react-router";
import { fetchSong } from "../../../api/songs";
import { Loading } from "../../../modules/shared/components";
import { Song, PlayerType } from "../types";
import { PlayerPicker, Lyrics } from "../components";

interface CallsViewerProps {
  match: match<{ songId: string }>;
}

interface CallsViewerState {
  isFetching: boolean;
  error?: string;
  song?: Song;
  currentTime: number;
  currentPlayer: PlayerType;
}

export class CallsViewer extends React.Component<
  CallsViewerProps,
  CallsViewerState
> {
  public state: CallsViewerState = {
    isFetching: false,
    currentTime: 0,
    currentPlayer: "audio"
  };

  componentWillMount(): void {
    const { songId } = this.props.match.params;

    this.fetchInitialSong(songId);
  }

  async fetchInitialSong(songId: string): Promise<void> {
    try {
      this.setState({ isFetching: true, error: undefined, song: undefined });
      const song = await fetchSong(songId);
      this.setState({ song, isFetching: false });
    } catch (error) {
      this.setState({ error, isFetching: false });
    }
  }

  updateCurrentTime = (time: number) => {
    this.setState({ currentTime: time });
  };

  render() {
    const { song, isFetching, currentTime } = this.state;

    if (isFetching) {
      return <Loading />;
    }

    if (!song) {
      return <h2 style={{ textAlign: "center" }}>Song not found</h2>;
    }

    return (
      <div className="call-viewer">
        <div className="call-viewer-info">
          <h1 className="call-viewer-title" style={{ color: song.color }}>
            {song.title}
          </h1>
          <h2 className="call-viewer-artist"> by {song.group} </h2>

          <PlayerPicker song={song} onTimeUpdate={this.updateCurrentTime} />
        </div>

        <div className="call-viewer-lyrics">
          <Lyrics lyrics={song.lyrics} currentTime={currentTime} />
        </div>
      </div>
    );
  }
}
