import { IWithChildren } from "../../../types";
import { Login } from ".";
import { useAppSelector } from "../../../lib/redux/Hooks";
import { useState, useEffect } from "react";
import { IUser, UserType } from "@/features/user/models";
import { Navigate } from "react-router-dom";
import { Service } from "@/services";
import { RedirectUser } from "@/pages/routers/RedirectUser";

export interface RequiredAuthProps extends IWithChildren {}

export interface RequiredAuthProps extends IWithChildren {}

export const RequiredAuth = ({ children }: RequiredAuthProps) => {
  const { data: user } = useAppSelector((state) => state.user);
  if (user) {
    if (user.typeUser === "CanBo" || user.typeUser == "Admin") {
      return children;
    } else if (user.typeUser === "CongDan") {
      return <Navigate to={Service.primaryRoutes.portaldvc.home} />;
    }
    // return <Navigate to={Service.primaryRoutes.portaldvc.home}/>
  }

  return <RedirectUser />;
};
