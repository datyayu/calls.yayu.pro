import * as React from "react";
import { Lyric } from "../types";

const LYRICS_LINE_HEIGHT = 19;

interface LyricsProps {
  lyrics: Lyric[];
  currentTime: number;
}

interface LyricsState {
  currentLine: number;
}

export class Lyrics extends React.Component<LyricsProps, LyricsState> {
  state: LyricsState = {
    currentLine: 0
  };

  containerRef: HTMLDivElement | null = null;

  componentDidUpdate() {
    const ref = this.containerRef;
    const currentLine = this.getCurrentLineNumber();
    const lineChanged = this.state.currentLine !== currentLine;

    if (lineChanged && ref) {
      ref.scrollTop = currentLine * LYRICS_LINE_HEIGHT;
      this.setState({ currentLine });
    }
  }

  getCurrentLineNumber() {
    const { lyrics, currentTime } = this.props;
    let lines = 0;

    for (let word of lyrics) {
      if (word.isLineBreak) {
        lines += 2;
      } else if (word.time > currentTime) {
        break;
      }
    }

    return lines;
  }

  setContainerRef = (ref: HTMLDivElement | null) => {
    this.containerRef = ref;
  };

  renderWord = (word: Lyric, index: number) => {
    const { currentTime } = this.props;

    if (word.isLineBreak) {
      return (
        <span key={index}>
          <br />
          <br />
        </span>
      );
    }

    const mustBeHighlighted = currentTime > word.time;

    if (word.isCall && word.color) {
      const filter = mustBeHighlighted ? "saturate(2)" : "opacity(40%)";

      return (
        <span style={{ color: word.color, filter }} key={index}>
          {`${word.text} `}
        </span>
      );
    }

    if (word.isCall) {
      const callColor = mustBeHighlighted ? "red" : "#f39191";

      return (
        <span style={{ color: callColor }} key={index}>
          {`${word.text} `}
        </span>
      );
    }

    const color = mustBeHighlighted ? "blue" : "black";

    return <span key={index} style={{ color }}>{`${word.text} `}</span>;
  };

  render() {
    const { lyrics } = this.props;
    const songLines = lyrics.map(this.renderWord);

    return (
      <div className="lyrics" ref={this.setContainerRef}>
        {songLines}
      </div>
    );
  }
}
