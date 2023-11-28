import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { CssDisplay } from "../helpers/Types";
import useContextNullChecker from "../helpers/useContextNullChecker";
import updatePath from "../hooks/updatePath";
import useToolsDivShadow from "../hooks/useToolsDivShadow";
import Delete from "../ui/Delete";
import Pin from "../ui/Pin";
import Content from "./innerComps/Content";
import SaveNote from "./innerComps/SaveNote";
import Title from "./innerComps/Title";
import Close from "../ui/Close";
import Clone from "../ui/Clone";
import { usePathname } from "next/navigation";
import Restore from "../ui/Restore";

export default function ShowFullNote() {
  // useState for change display
  const [display, setDisplay] = useState<CssDisplay>({ display: "none" });

  // Fetching post is pinned true or false
  const [pin, setPin] = useState<boolean>(false);

  // Fetching note update time
  const [noteTime, setNoteTime] = useState<Date>(new Date());

  // Tools div shadow
  const divShadow = useToolsDivShadow();

  // Fetching data from context
  const {
    noteData,
    trashNoteData,
    path,
    setPath,
    fullNoteValue,
    setFullNoteValue,
  } = useContextNullChecker();

  // Fetching path
  const urlPath = usePathname();
  const isTrash = urlPath === "/trash";

  // Fetching note data using id
  const fetchNoteData = async () => {
    try {
      const newData = (isTrash ? trashNoteData! : noteData!).find(
        (e) => e._id == path
      );

      setFullNoteValue((pre) => {
        return { ...pre, title: newData!.title, content: newData!.content };
      });

      setPin(newData!.isPinned);
      setDisplay({ display: "" });
      setNoteTime(newData!.lastUpdate);
    } catch (error) {
      toast.error("Something went wrong");
      setDisplay({ display: "" });
    }
  };

  // Close note
  const closeNote = () => {
    setDisplay({ display: "none" });
    updatePath(setPath);
    setFullNoteValue({ title: "", content: "" });
  };

  // Hide full note
  const hideDisplay = () => {
    setDisplay({ display: "none" });
  };

  // Re-render data on path change
  useEffect(() => {
    path && fetchNoteData();
  }, [path]);

  return (
    <>
      {path && (
        <>
          <div
            className="showFullNoteBg"
            style={display}
            onClick={closeNote}
          ></div>
          <div className="showFullNote noteWrapper" style={display}>
            {/* Title */}
            <Title
              cName="showNoteTitle"
              useNoteValue={fullNoteValue}
              setNoteValue={setFullNoteValue}
            />

            {/* Content */}
            <Content
              cName="showNoteContent"
              useNoteValue={fullNoteValue}
              setNoteValue={setFullNoteValue}
            />
            <div className="showNoteToolsDiv toolsDiv" style={divShadow}>
              <div className="showTimeDiv">
                <span>{new Date(noteTime).toLocaleDateString()}</span>
              </div>
              <div>
                {/* Save note icon */}
                {!isTrash && (
                  <SaveNote
                    comp="editNote"
                    useNoteValue={fullNoteValue}
                    setNoteValue={setFullNoteValue}
                    updateDisplay={hideDisplay}
                  />
                )}

                {/* Pin icon */}
                {!isTrash && (
                  <Pin
                    apiPath={"/api/user/note/pin/" + path}
                    setDisplay={hideDisplay}
                    isPin={pin}
                  />
                )}

                {/* Pin icon */}
                {!isTrash && (
                  <Clone
                    apiPath={"/api/user/note/clone/" + path + "?mode=clone"}
                    setDisplay={hideDisplay}
                  />
                )}

                {/* Restore icon */}
                {isTrash && <Restore apiPath={path} setDisplay={hideDisplay} />}

                {/* Delete icon */}
                <Delete
                  apiPath={
                    isTrash
                      ? `/api/user/note/trash/${path}?mode=delete`
                      : `/api/user/note/delete/${path}`
                  }
                  setDisplay={hideDisplay}
                />

                {/* Close icon */}
                <Close
                  setDisplay={hideDisplay}
                  emptyData={setFullNoteValue}
                  changePath={true}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
