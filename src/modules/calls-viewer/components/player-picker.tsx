import * as React from "react";
import { GenericPlayer } from "./generic-player";
import { Colors } from "./colors";

import { PlayerType, Song } from "../types";

type TabTypes = "audio" | "video" | "colors";

interface PlayerPickerProps {
  onTimeUpdate: (time: number) => void;
  song: Song;
}

interface PlayerPickerState {
  selectedPlayer: PlayerType;
  selectedTab: TabTypes;
}

export class PlayerPicker extends React.Component<
  PlayerPickerProps,
  PlayerPickerState
> {
  public state: PlayerPickerState = {
    selectedPlayer: "video",
    selectedTab: "audio"
  };

  setSelectedPlayer = (selectedPlayer: "audio" | "video") => {
    if (selectedPlayer === this.state.selectedPlayer) {
      this.setState({ selectedTab: selectedPlayer });
      return;
    }

    this.setState({ selectedPlayer, selectedTab: selectedPlayer });
  };

  setSelectedTab = (selectedTab: TabTypes) => {
    if (selectedTab !== "colors" || selectedTab === this.state.selectedTab) {
      return;
    }

    this.setState({ selectedTab });
  };

  setAudioAsPlayer = () => {
    this.setSelectedPlayer("audio");
  };

  setColorsAsActiveTab = () => {
    this.setState({ selectedTab: "colors" });
  };

  setVideoAsPlayer = () => {
    this.setSelectedPlayer("video");
  };

  onTimeUpdate = (time: number, source: PlayerType) => {
    this.props.onTimeUpdate(time);

    if (source !== this.state.selectedPlayer) {
      this.setState({ selectedPlayer: source });
    }
  };

  render() {
    const { selectedTab, selectedPlayer } = this.state;
    const { song } = this.props;
    const audioActiveClass = selectedTab === "audio" ? "active" : "";
    const videoActiveClass = selectedTab === "video" ? "active" : "";
    const colorsActiveClass = selectedTab === "colors" ? "active" : "";
    const playerSizeClass =
      selectedTab === "video" ? "video-size" : "audio-size";

    return (
      <div className={`player-picker ${playerSizeClass}`}>
        <div className="player-picker__tabs">
          <div
            className={`player-picker__tab ${audioActiveClass}`}
            onClick={this.setAudioAsPlayer}
          >
            Audio
          </div>

          {song.videoFiles.length > 0 && (
            <div
              className={`player-picker__tab ${videoActiveClass}`}
              onClick={this.setVideoAsPlayer}
            >
              Video
            </div>
          )}

          <div
            className={`player-picker__tab ${colorsActiveClass}`}
            onClick={this.setColorsAsActiveTab}
          >
            Colors
          </div>
        </div>

        <div className="player-picker__player">
          <GenericPlayer
            id="audio"
            onTimeUpdate={this.onTimeUpdate}
            sources={song.audioFiles}
            display={selectedTab === "audio"}
            allowPlay={selectedPlayer === "audio"}
            component={<audio x-webkit-airplay="deny" />}
          />

          {song.videoFiles.length > 0 && (
            <GenericPlayer
              id="video"
              onTimeUpdate={this.onTimeUpdate}
              sources={song.videoFiles}
              display={selectedTab === "video"}
              allowPlay={selectedPlayer === "video"}
              component={<video />}
            />
          )}

          <Colors
            display={selectedTab === "colors"}
            image={song.kb.image}
            colors={song.kb.colors}
          />
        </div>
      </div>
    );
  }
}
