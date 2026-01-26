import { useState } from "react";

type PersonaMode = "pro" | "casual";

export const PERSONA_EVENT = "persona_change";

export function usePersona() {
  const [mode, setMode] = useState<PersonaMode>(() => {
    return (localStorage.getItem("persona_mode") as PersonaMode) || "pro";
  });

  const setPersona = (newMode: PersonaMode) => {
    setMode(newMode);
    localStorage.setItem("persona_mode", newMode);
    window.dispatchEvent(new Event(PERSONA_EVENT));
  };

  return { mode, setPersona };
}
