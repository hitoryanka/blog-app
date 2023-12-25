import { IAuthUser } from "./types";

export function getUserId() {
  return location.pathname.includes("users")
    ? location.pathname.split("/").at(-1)
    : undefined;
}

export function isUserPage() {
  return location.pathname.split("/").at(-1) === "users";
}

export function isAuthorized() {
  // TODO rewrite to RTK - make it redundant
  return localStorage.getItem("currentUser") !== null;
}

export function getCUrrentUser(): IAuthUser | null {
  const user = localStorage.getItem("currentUser");

  if (user === null) {
    return user;
  }

  return JSON.parse(user);
}

export function getUsers(): IAuthUser[] {
  const users = localStorage.getItem("users");

  if (users === null) {
    return [];
  }

  return JSON.parse(users);
}
