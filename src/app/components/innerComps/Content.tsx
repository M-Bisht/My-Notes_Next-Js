import type { CssDisplay, NoteValue } from "@/app/helpers/Types";
import useContextNullChecker from "@/app/helpers/useContextNullChecker";
import { usePathname } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";

// Types
type ContentParams = {
  cName: string;
  useNoteValue: NoteValue;
  setNoteValue: Dispatch<SetStateAction<NoteValue>>;
  newDisplay?: CssDisplay;
};

export default function Content({
  cName,
  useNoteValue,
  setNoteValue,
  newDisplay,
}: ContentParams) {
  // Fetching data from context
  const { setHeight } = useContextNullChecker();

  // Textarea ref
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  // Add content in setNoteData state
  const addContent = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setNoteValue((pre) => {
      return { ...pre, content: e.target.value };
    });

  // This code is to increase height of Textarea
  useEffect(() => {
    const currentVal = contentRef.current as HTMLElement;
    currentVal.style.height = "auto";
    const textAreaHeight = currentVal.clientHeight;
    const textAreaScrollHeight = currentVal.scrollHeight;
    setHeight(textAreaScrollHeight);
    if (
      useNoteValue.content?.length !== 0 &&
      textAreaScrollHeight > textAreaHeight
    ) {
      currentVal.style.height = textAreaScrollHeight + 1 + "px";
      currentVal.style.maxHeight = "480px";
    }
  }, [useNoteValue.content]);

  // Fetching path
  const urlPath = usePathname();
  const isTrash = urlPath === "/trash";

  return (
    <textarea
      ref={contentRef}
      className={`${cName} content`}
      placeholder="Enter your content"
      onChange={addContent}
      value={useNoteValue.content}
      style={newDisplay}
      readOnly={isTrash ? true : false}
    ></textarea>
  );
}
