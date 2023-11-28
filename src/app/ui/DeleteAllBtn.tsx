"use client";
import React from "react";
import useContextNullChecker from "../helpers/useContextNullChecker";
import axios from "axios";

export default function DeleteAllBtn() {
  // Getting data
  const { trashNoteData, setTrashNoteData } = useContextNullChecker();

  // Delete note function
  const deleteAll = async () => {
    try {
      setTrashNoteData((pre) => (pre = []));
      axios.delete("/api/user/note/delete-all");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={deleteAll}
      disabled={!trashNoteData || trashNoteData?.length < 1}
    >
      Delete all
    </button>
  );
}
