"use client";
import useFetchNoteData from "./hooks/useFetchNoteData";
import Header from "./components/Header";
import AddNote from "./components/AddNote";
import ShowNotes from "./components/ShowNotes";
import ShowFullNote from "./components/ShowFullNote";
import "./styles/home.css";
import Loader from "./helpers/Loader";
import useContextNullChecker from "./helpers/useContextNullChecker";

export default function HomePage() {
  const { loading } = useContextNullChecker();
  useFetchNoteData();
  return (
    <div className="homePage">
      <Header />
      <AddNote />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ShowNotes />
          <ShowFullNote />
        </>
      )}
    </div>
  );
}
