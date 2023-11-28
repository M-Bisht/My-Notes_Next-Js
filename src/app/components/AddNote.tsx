import { useState } from "react";
import type { CssDisplay } from "../helpers/Types";
import useContextNullChecker from "../helpers/useContextNullChecker";
import useToolsDivShadow from "../hooks/useToolsDivShadow";
import Close from "../ui/Close";
import Content from "./innerComps/Content";
import SaveNote from "./innerComps/SaveNote";
import Title from "./innerComps/Title";

export default function AddNote() {
  // useState for change display
  const [display, setDisplay] = useState<CssDisplay>({ display: "none" });

  // Tools div shadow
  const divShadow = useToolsDivShadow();

  // Fetching data from context
  const { noteValue, setNoteValue } = useContextNullChecker();

  // Show display
  const showDisplay = () => {
    display.display.length === 4 && setDisplay({ display: "" });
  };

  // Hide display
  const hideDisplay = () => {
    setDisplay({ display: "none" });
  };

  return (
    <>
      <div className="addNoteContainer">
        <div className="addNoteDiv noteWrapper" onClick={showDisplay}>
          {/* Title input */}
          <Title
            cName="addNoteTitle"
            useNoteValue={noteValue}
            setNoteValue={setNoteValue}
          />

          {/* Content texarea */}
          <Content
            cName="addNoteContent"
            useNoteValue={noteValue}
            setNoteValue={setNoteValue}
            newDisplay={display}
          />

          {/* Tools div */}
          <div
            className="addNoteToolsDiv toolsDiv"
            style={{ display: display.display, boxShadow: divShadow.boxShadow }}
          >
            {/* Save note */}
            <SaveNote
              comp="addNote"
              useNoteValue={noteValue}
              setNoteValue={setNoteValue}
              updateDisplay={hideDisplay}
            />

            {/* Close note */}
            <Close setDisplay={hideDisplay} emptyData={setNoteValue} />
          </div>
        </div>
      </div>
    </>
  );
}
