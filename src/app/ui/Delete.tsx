import axios from "axios";
import toast from "react-hot-toast";
import useContextNullChecker from "../helpers/useContextNullChecker";
import updatePath from "../hooks/updatePath";
import { IconButton } from "../helpers/Types";
import { usePathname } from "next/navigation";

export default function Delete({ apiPath, setDisplay }: IconButton) {
  // Fetching data from context
  const {
    noteData,
    setNoteData,
    trashNoteData,
    setTrashNoteData,
    setFullNoteValue,
    path,
    setPath,
  } = useContextNullChecker();

  // Fetching path
  const urlPath = usePathname();
  const isTrash = urlPath === "/trash";

  // Delete note function
  const deleteNote = async () => {
    try {
      !isTrash &&
        noteData &&
        setNoteData(noteData.filter((e) => e._id !== path));
      isTrash &&
        trashNoteData &&
        setTrashNoteData(trashNoteData.filter((e) => e._id !== path));
      setDisplay();
      updatePath(setPath);
      axios.delete(apiPath);
      setFullNoteValue({ title: "", content: "" });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <span className="material-symbols-outlined delete" onClick={deleteNote}>
      delete
    </span>
  );
}
