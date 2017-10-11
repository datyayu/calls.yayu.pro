import * as React from "react";
import { MediaPlayerSource, PlayerType } from "../types";

const PLAYER_UPDATE_INTERVAL = 100;
const PLAYER_UPDATE_MAX_OFFSET = PLAYER_UPDATE_INTERVAL / 1000;

interface GenericPlayerProps {
  id: PlayerType;
  sources: Array<MediaPlayerSource>;
  display: boolean;
  allowPlay: boolean;
  component: React.ReactElement<any>;
  onTimeUpdate: (time: number, player: PlayerType) => void;
}

interface GenericPlayerState {
  isPlaying: boolean;
  canPlay: boolean;
  currentTime: number;
  tick?: number;
  display: boolean;
}

export class GenericPlayer extends React.Component<
  GenericPlayerProps,
  GenericPlayerState
> {
  public state: GenericPlayerState = {
    isPlaying: false,
    canPlay: false,
    currentTime: 0,
    tick: undefined,
    display: false
  };

  private playerRef: HTMLMediaElement;

  componentWillReceiveProps(nextProps: GenericPlayerProps) {
    const { tick } = this.state;
    const currentProps = this.props;

    // Reset the internal time if the player source has changed
    if (currentProps.sources[0]) {
      const currentPropsSource = currentProps.sources[0].url;
      const nextPropsSource = nextProps.sources[0] && nextProps.sources[0].url;

      if (currentPropsSource !== nextPropsSource && tick) {
        window.clearInterval(tick);
      }
    }

    // Should stop playing if it's not the active player
    if (currentProps.allowPlay && !nextProps.allowPlay && this.playerRef) {
      this.playerRef.pause();

      if (tick) {
        window.clearInterval(tick);
      }
    }
  }

  setPlayerRef = (ref?: HTMLMediaElement) => {
    if (ref) {
      this.playerRef = ref;
    }
  }

  onEnded = (event: Event) => {
    const { tick } = this.state;

    if (!tick) {
      return;
    }

    this.setState({ currentTime: 0, isPlaying: false });
    window.clearInterval(tick);
  }

  onInternalTimeUpdate = (event: Event) => {
    const { currentTime, isPlaying } = this.state;
    const player = event.target as HTMLAudioElement;

    if (!isPlaying) {
      return;
    }

    const playerTime = player.currentTime;

    if (
      currentTime > playerTime + PLAYER_UPDATE_MAX_OFFSET ||
      currentTime < playerTime - PLAYER_UPDATE_MAX_OFFSET
    ) {
      this.setState({ currentTime: playerTime });
    }
  }

  onPause = () => {
    const { tick } = this.state;

    if (tick) {
      window.clearInterval(tick);
    }

    this.setState({ isPlaying: false });
  }

  onPlaying = () => {
    const tick = window.setInterval(this.onUpdate, PLAYER_UPDATE_INTERVAL);
    this.setState({ tick, isPlaying: true });
  }

  onUpdate = () => {
    const { currentTime } = this.state;
    const { onTimeUpdate, id } = this.props;

    const updatedTime = currentTime + PLAYER_UPDATE_MAX_OFFSET;

    this.setState({ currentTime: updatedTime });

    if (onTimeUpdate) {
      onTimeUpdate(currentTime, id);
    }
  }

  onWaiting = () => {
    this.onPause();
  }

  render() {
    const { sources, display, id, component } = this.props;
    const cssClasses = display
      ? `player ${id}-player active`
      : `player ${id}-player`;

    const playerChildren = sources.map((source, index) => (
      <source key={index} src={source.url} type={source.format} />
    ));

    const PlayerComponent = React.cloneElement(
      component,
      {
        className: cssClasses,
        controls: true,
        onTimeUpdate: this.onInternalTimeUpdate,
        onPause: this.onPause,
        onEnded: this.onEnded,
        onWaiting: this.onWaiting,
        onPlaying: this.onPlaying,
        ref: this.setPlayerRef
      },
      playerChildren
    );

    return PlayerComponent;
  }
}
