"use client";
import Header from "../components/Header";
import ShowFullNote from "../components/ShowFullNote";
import ShowTrashNotes from "../components/ShowTrashNotes";
import Loader from "../helpers/Loader";
import useContextNullChecker from "../helpers/useContextNullChecker";
import useTrashNoteData from "../hooks/useTrashNoteData";
import DeleteAllBtn from "../ui/DeleteAllBtn";

export default function RecycleBin() {
  const { loading } = useContextNullChecker();
  useTrashNoteData();
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Warning div */}
      <div className="recycleBinWarning">
        <span>Notes in the Recycle Bin are deleted after 28 days.</span>
        <DeleteAllBtn />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Notes div */}
          <ShowTrashNotes />

          {/* Full note */}
          <ShowFullNote />
        </>
      )}
    </div>
  );
}
