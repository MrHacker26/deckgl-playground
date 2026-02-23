import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div>
        <h1>Deck.gl Playground</h1>
      </div>
      <Outlet />
    </React.Fragment>
  );
}
