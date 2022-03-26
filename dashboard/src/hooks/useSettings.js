import { useContext } from "react";
import { SettingsContext } from "../store/contexts/SettingsContext";

const useSettings = () => useContext(SettingsContext);

export default useSettings;
