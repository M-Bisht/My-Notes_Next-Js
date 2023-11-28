import { NoteData } from "../helpers/Types";
import useContextNullChecker from "../helpers/useContextNullChecker";
export default function ShowNotes() {
  // Fetching data from context
  const { noteData, setPath, searchValue } = useContextNullChecker();

  // Filtering pin and unpin data
  const pinNotes = noteData?.filter((e) => e.isPinned === true);
  const unpinNotes = noteData?.filter((e) => e.isPinned === false);
  const hasPinNotes = pinNotes && pinNotes.length > 0;

  // Function to add data in div after all filteration
  function addData(noteType: NoteData[]) {
    const myNotes = noteType
      .filter((e) => filterData(e))
      .map((e) => mapData(e));

    if (noteData && myNotes.length < 1) {
      return <p className="noDataFound">No data found</p>;
    } else {
      return myNotes;
    }
  }

  // Filter data
  function filterData(e: NoteData) {
    return (
      e.content.toLowerCase().includes(searchValue.toLowerCase()) ||
      e.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  // Map data
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
        {/* <div className="noteHover"></div> */}
      </div>
    );
  }

  return (
    <div className="showNotesContainer">
      {/* Pin data */}
      {hasPinNotes && (
        <div className="pinned noteDataDiv">
          <h3>Pinned</h3>
          <div>{addData(pinNotes)}</div>
        </div>
      )}

      {/* Unpin data */}
      <div
        className="notPinned noteDataDiv"
        style={
          // Adding margin if there is any pinned data
          { marginTop: hasPinNotes ? "6rem" : "" }
        }
      >
        {/* Adding heading if there is any pinned data */}
        {hasPinNotes && <h3>Others</h3>}
        <div>{unpinNotes && addData(unpinNotes)}</div>
      </div>
    </div>
  );
}
