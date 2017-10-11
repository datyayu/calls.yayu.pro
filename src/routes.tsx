import * as React from "react";
import { Switch, Route, Redirect } from "react-router";
import { CallsViewerModule, SongListModule } from "./modules";

const CallsViewer = CallsViewerModule.MainContainer;
const SongList = SongListModule.MainContainer;

export const routes = (
  <Switch>
    <Route path="/songs/:songId" component={CallsViewer} />
    <Route path="/songs" component={SongList} />
    <Redirect from="/" to="/songs" />
  </Switch>
);
