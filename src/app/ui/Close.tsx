import { Dispatch, SetStateAction } from "react";
import { NoteValue } from "../helpers/Types";
import useContextNullChecker from "../helpers/useContextNullChecker";
import updatePath from "../hooks/updatePath";

type Close = {
  setDisplay: () => void;
  emptyData: Dispatch<SetStateAction<NoteValue>>;
  changePath?: boolean;
};

export default function Close({
  setDisplay,
  emptyData,
  changePath = false,
}: Close) {
  // Fetching data from context
  const { setPath, setHeight } = useContextNullChecker();

  // Close note function
  const closeNote = () => {
    setDisplay();
    changePath && updatePath(setPath);
    emptyData({ title: "", content: "" });
    setHeight(0);
  };
  return (
    <span className="material-symbols-outlined cross" onClick={closeNote}>
      close
    </span>
  );
}
