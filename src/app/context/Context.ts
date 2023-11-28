import { createContext } from "react";
import type { ContextType } from "../helpers/Types";

export const Context = createContext<ContextType | null>(null);
