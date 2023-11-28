"use client";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useContextNullChecker from "../helpers/useContextNullChecker";

export default function useTrashNoteData() {
  const { setTrashNoteData, setLoading } = useContextNullChecker();

  // Fetching notes
  const fetchTrashNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/user/note");
      const data = res.data.userNotes.trashNotes;
      setLoading(false);
      setTrashNoteData(data);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchTrashNotes();
  }, []);
}
