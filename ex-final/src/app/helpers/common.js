export const AuthWith = (item, approveId,userId) => {
  
  const checkAuthWith =
    item.userId === userId ||
    (item.userId !== userId && approveId === true) ||
    (item.userId !== userId && item.status === "Request Change") ||
    (item.userId !== userId && item.status === "Rejected")
      ? "display-none"
      : "display-block";

  return checkAuthWith;
};
export const AuthEdit = (item,userId) => {
  const checkAuthEdit =
    (item.userId === userId && item.status === "Requested") ||
    (item.userId === userId && item.status === "Request Change")
      ? "display-block"
      : "display-none";
  return checkAuthEdit;
};
