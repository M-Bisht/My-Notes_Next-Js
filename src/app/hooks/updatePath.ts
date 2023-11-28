import { Dispatch, SetStateAction } from "react";

export default function updatePath(
  setPathContext: Dispatch<SetStateAction<string | null>>
) {
  // Fetching path
  const urlPath = window.location.pathname;
  const isTrash = urlPath === "/trash";

  const newPath = isTrash ? "/trash" : "/";
  window.history.pushState(null, "", newPath);
  setPathContext(null);
}
