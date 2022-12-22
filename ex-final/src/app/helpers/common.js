export const AuthWith = (item, approveId, userId) => {
  const checkAuthWith =
    item.userId === userId ||
    (item.userId !== userId && approveId === true) ||
    (item.userId !== userId && item.status === "Request Change") ||
    (item.userId !== userId && item.status === "Rejected")
      ? "display-none"
      : "display-block";

  return checkAuthWith;
};
export const AuthEdit = (item, userId) => {
  const id = (typeof(item.userId) === typeof('')) ? item.userId : item.userId._id;
  const checkAuthEdit =
    (id === userId && item.status === "Requested") ||
    (id === userId && item.status === "Request Change")
      ? "display-block"
      : "display-none";
  return checkAuthEdit;
};
export const AuthEditDetail = (item, userId) => {
  const checkAuthEdit =
    (item.userId === userId && item.status === "Requested") ||
    (item.userId === userId && item.status === "Request Change")
      ? "display-block"
      : "display-none";
  return checkAuthEdit;
};
export const AuthWithRevert = (item, canceledId, userId) => {
  const checkAuthWithRevert =
    // (item.userId !== userId && canceledId === true) ||
    (item.status === 'Approved') ||
    (item.status === 'Rejected') ||
    (item.status === 'Reverted')
      ? "display-none"
      : "display-block";

  return checkAuthWithRevert;
};
export const AuthRevert = (item, userId) => {
  const checkAuthRevert =
    item.userId === userId &&
    (item.status === "Approved" || item.status === "Requested")
      ? "display-block"
      : "display-none";
  return checkAuthRevert;
};
