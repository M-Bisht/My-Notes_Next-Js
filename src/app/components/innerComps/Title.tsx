import type { NoteValue } from "@/app/helpers/Types";
import { usePathname } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type TitleParams = {
  cName: string;
  useNoteValue: NoteValue;
  setNoteValue: Dispatch<SetStateAction<NoteValue>>;
};

export default function Title({ cName, useNoteValue, setNoteValue }: TitleParams) {
  // Add Title in setNoteData state
  const addTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setNoteValue((pre) => {
      return { ...pre, title: e.target.value };
    });

  // Fetching path
  const urlPath = usePathname();
  const isTrash = urlPath === "/trash";

  return (
    <input
      type="text"
      placeholder="Enter your title"
      className={`${cName} title`}
      onChange={addTitle}
      value={useNoteValue.title}
      readOnly={isTrash ? true : false}
    />
  );
}
