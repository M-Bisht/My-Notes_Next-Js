"use client";
import { NoteData } from "../helpers/Types";
import useContextNullChecker from "../helpers/useContextNullChecker";
import "../styles/home.css";
import "../styles/recycleBin.css";

export default function ShowTrashNotes() {
  // Fetching data from context
  const { trashNoteData, setPath, searchValue } = useContextNullChecker();

  // Filter notes
  function filterData(e: NoteData) {
    return (
      e.content.toLowerCase().includes(searchValue.toLowerCase()) ||
      e.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  // Map notes
  function mapData(e: NoteData) {
    return (
      <div
        className="showNoteDiv noteWrapper"
        key={e._id}
        onClick={() => {
          // Adding path in setPath state
          let newPath = "?id=" + e._id;
          window.history.pushState(null, "", newPath);
          newPath = newPath.slice(4, newPath.length);
          setPath(newPath);
        }}
      >
        <h2>{e.title}</h2>
        <p>
          {/* Slicing data */}
          {e.content.slice(0, 300)}
          {e.content.length > 300 && <span>...</span>}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="showNotesContainer noteDataDiv">
        {trashNoteData && trashNoteData.length < 1 && (
          <p className="noDataFound binNoDataFound ">No data found</p>
        )}
        <div>
          {trashNoteData &&
            trashNoteData.filter((e) => filterData(e)).map((e) => mapData(e))}
        </div>
      </div>
    </>
  );
}
