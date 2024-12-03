import { useSelector } from "react-redux";
import { RootState } from "../types";

export const useUserName = () =>
    useSelector((state:RootState) => state.user.userName)

export const useUserGroup = () =>
    useSelector((state:RootState) => state.user.userGroup)

