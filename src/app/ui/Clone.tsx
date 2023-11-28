import axios from "axios";
import toast from "react-hot-toast";
import type { IconButton } from "../helpers/Types";
import useContextNullChecker from "../helpers/useContextNullChecker";
import updatePath from "../hooks/updatePath";
import generateId from "../helpers/generateId";

export default function Clone({ apiPath, setDisplay }: IconButton) {
  // Fetching data from context
  const { noteData, setNoteData, setFullNoteValue, setPath, path } =
    useContextNullChecker();

  // Delete note function
  const cloneNote = async () => {
    const randomId = generateId();
    try {
      const findData = noteData && noteData.find((e) => e._id === path);
      if (findData) {
        let clonedData = { ...findData };
        clonedData._id = randomId;
        setNoteData((pre) => [...pre!, clonedData]);
      }

      setDisplay();
      updatePath(setPath);

      axios.get(`${apiPath}&newid=${randomId}`);
      setFullNoteValue({ title: "", content: "" });
    } catch (error) {
      setNoteData(noteData!.filter((e) => e._id !== randomId));
      toast.error("Something went wrong");
    }
  };

  return (
    <span className="material-symbols-outlined clone" onClick={cloneNote}>
      content_copy
    </span>
  );
}
