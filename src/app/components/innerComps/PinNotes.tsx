import type { NoteData } from "@/app/helpers/Types";
import useContextNullChecker from "@/app/helpers/useContextNullChecker";

export default function PinNotes({ data }: { data: NoteData[] }) {
  // Fetching data from context
  const { setPath } = useContextNullChecker();

  // Map data
  const mapData = (e: NoteData) => {
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
  };

  return (
    <div className="pinned">
      <h3>Pinned</h3>
      <div>{data.map((e) => mapData(e))}</div>
    </div>
  );
}
