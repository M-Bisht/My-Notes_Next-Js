import axios from "axios";
import toast from "react-hot-toast";
import { IconButton } from "../helpers/Types";
import useContextNullChecker from "../helpers/useContextNullChecker";
import updatePath from "../hooks/updatePath";

type IsPin = {
  isPin: boolean;
};

export default function Pin({
  apiPath,
  setDisplay,
  isPin,
}: IconButton & IsPin) {
  // Fetching data from context
  const { noteData, setPath, setFullNoteValue, path } = useContextNullChecker();

  // Pin and Unpin note function
  const pinNote = async () => {
    try {
      const findData =noteData && noteData.find((e) => e._id === path);
      findData!.isPinned = !findData!.isPinned;
      setDisplay();
      updatePath(setPath);
      axios.patch(apiPath);
      setFullNoteValue({ title: "", content: "" });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <span
      className={`material-symbols-outlined  ${!isPin ? "pin" : "unpin"}`}
      onClick={pinNote}
    >
      push_pin
    </span>
  );
}
