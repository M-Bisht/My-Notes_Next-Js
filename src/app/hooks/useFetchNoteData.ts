"use client";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useContextNullChecker from "../helpers/useContextNullChecker";

export default function useFetchNoteData() {
  const { setNoteData, setLoading } = useContextNullChecker();

  // Fetching notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/user/note");
      const data = res.data.userNotes.notes;
      setLoading(false);
      setNoteData(data);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);
}
