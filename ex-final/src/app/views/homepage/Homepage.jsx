import React from "react";
import { redirect } from "react-router-dom";
import hasJWT from "../../utils/hasJWT";

export default function Homepage() {
  if (hasJWT() === false) {
    redirect("/login");
  }

  return <div>Homepage</div>;
}
