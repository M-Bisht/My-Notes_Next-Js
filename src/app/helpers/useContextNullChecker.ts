import { useContext } from "react";
import { Context } from "../context/Context";

// Checking context data null or not
export default function useContextNullChecker() {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("Context is not provided");
  } else {
    return context;
  }
}
