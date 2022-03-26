import { useContext } from "react";
import { CollapseDrawerContext } from "../store/contexts/CollapseDrawerContext";

const useCollapseDrawer = () => useContext(CollapseDrawerContext);

export default useCollapseDrawer;
