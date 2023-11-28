import type { NoteValue } from "@/app/helpers/Types";
import generateId from "@/app/helpers/generateId";
import useContextNullChecker from "@/app/helpers/useContextNullChecker";
import updatePath from "@/app/hooks/updatePath";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

// types
type SaveNoteParams = {
  comp: string;
  useNoteValue: NoteValue;
  setNoteValue: Dispatch<SetStateAction<NoteValue>>;
  updateDisplay: () => void;
};

export default function SaveNote({
  comp,
  useNoteValue,
  setNoteValue,
  updateDisplay,
}: SaveNoteParams) {
  // Fetching data from context
  const { noteData, setNoteData, path, setPath } = useContextNullChecker();

  // To check which components calls
  const addNote = comp === "addNote";
  const editNote = comp === "editNote";

  // Save note data in db
  const saveNoteData = async () => {
    const { title, content } = useNoteValue; // Data from props
    const newId = generateId(); // Generate new id

    // New note data
    const newNoteData = {
      title: title as string,
      content: content as string,
      _id: newId,
      isPinned: false,
      lastUpdate: new Date(),
    };

    try {
      // If field is empty return error
      if (!title || !content) {
        return toast.error("Please provide all fields");
      }

      updateDisplay();

      // Create note
      if (addNote) {
        setNoteData((pre) => [...pre!, newNoteData]);
        axios.post("/api/user/note/create", newNoteData);
      }

      // Edit note
      if (editNote) {
        // Find note and update it's data
        const findNote = noteData!.find((e) => e._id === path);
        findNote!.title = title;
        findNote!.content = content;
        updatePath(setPath);
        axios.patch("/api/user/note/edit/" + path, useNoteValue);
      }

      setNoteValue({ title: "", content: "" });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <span className="save" onClick={saveNoteData}>
      Save
    </span>
  );
}
