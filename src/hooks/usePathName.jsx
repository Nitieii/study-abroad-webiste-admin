import React from "react";
import { HANDLE_GET_PATHNAME } from "../store/pathNameSlice";
import { useDispatch, useSelector } from "react-redux";

function usePathName() {
  const dispatch = useDispatch();
  const { pathName } = useSelector((state) => state.pathName);

  const handleGetPathName = (path) => {
    dispatch(HANDLE_GET_PATHNAME(path));
  } 

  return {handleGetPathName,pathName}
}

export default usePathName;
