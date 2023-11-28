import { Dispatch, SetStateAction } from "react";

export type ReactNode = {
  children: React.ReactNode;
};

export type ContextType = {
  noteData: NoteData[] | null;
  setNoteData: Dispatch<SetStateAction<NoteData[]| null>>;

  trashNoteData: NoteData[]| null;
  setTrashNoteData: Dispatch<SetStateAction<NoteData[]| null>>;

  noteValue: NoteValue;
  setNoteValue: Dispatch<SetStateAction<NoteValue>>;

  fullNoteValue: NoteValue;
  setFullNoteValue: Dispatch<SetStateAction<NoteValue>>;

  path: string | null;
  setPath: Dispatch<SetStateAction<string | null>>;

  height: number;
  setHeight: Dispatch<SetStateAction<number>>;

  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;

  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export type NoteValue = {
  title?: string;
  content?: string;
};

export type CssDisplay = {
  display: string;
};

export type NoteData = {
  _id: string;
  title: string;
  content: string;
  isPinned: boolean;
  lastUpdate: Date;
};

export type IconButton = {
  apiPath: string;
  setDisplay: () => void;
};
