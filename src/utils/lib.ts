export function getUserId() {
  return location.pathname.includes("users")
    ? location.pathname.split("/").at(-1)
    : undefined;
}

export function isUserPage() {
  return location.pathname.split("/").at(-1) === "users";
}
