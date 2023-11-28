import axios from "axios";
import toast from "react-hot-toast";
import { IconButton } from "../helpers/Types";
import useContextNullChecker from "../helpers/useContextNullChecker";
import updatePath from "../hooks/updatePath";

export default function Restore({ apiPath, setDisplay }: IconButton) {
  // Fetching data from context
  const {
    noteData,
    setNoteData,
    trashNoteData,
    setTrashNoteData,
    path,
    setPath,
    setFullNoteValue,
  } = useContextNullChecker();

  // Delete note function
  const restoreNote = async () => {
    try {
      const findData =
        trashNoteData && trashNoteData.find((e) => e._id === path);

      trashNoteData &&
        setTrashNoteData(trashNoteData.filter((e) => e._id !== path));

      noteData && setNoteData((pre) => [...pre!, findData!]);

      axios.delete(`/api/user/note/trash/${apiPath}?mode=restore`);
      setDisplay();
      updatePath(setPath);
      setFullNoteValue({ title: "", content: "" });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <span className="material-symbols-outlined restore" onClick={restoreNote}>
      restore_from_trash
    </span>
  );
}
