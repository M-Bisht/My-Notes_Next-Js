"use client";
import { useState } from "react";
import type { NoteData, NoteValue, ReactNode } from "../helpers/Types";
import { Context } from "./Context";

export default function Provider({ children }: ReactNode) {
  // Note data
  const [noteData, setNoteData] = useState<NoteData[] | null>(null);

  // Trash note data
  const [trashNoteData, setTrashNoteData] = useState<NoteData[] | null>(null);

  // State for note data value
  const [noteValue, setNoteValue] = useState<NoteValue>({
    title: "",
    content: "",
  });

  // State for full note data value
  const [fullNoteValue, setFullNoteValue] = useState<NoteValue>({
    title: "",
    content: "",
  });

  // State for path
  const [path, setPath] = useState<string | null>(null);

  // State for content textarea height
  const [height, setHeight] = useState<number>(0);

  // State for search bar search value
  const [searchValue, setSearchValue] = useState<string>("");

  // State for loader
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{
        noteData,
        setNoteData,

        trashNoteData,
        setTrashNoteData,

        noteValue,
        setNoteValue,

        fullNoteValue,
        setFullNoteValue,

        path,
        setPath,

        height,
        setHeight,

        searchValue,
        setSearchValue,

        loading,
        setLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
}
