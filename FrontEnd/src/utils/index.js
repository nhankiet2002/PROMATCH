export const onTriggerSignOut = () => {
  const SIGN_OUT_ID = "sign-out-link";
  document.getElementById(SIGN_OUT_ID)?.click();
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateSlug = (text) => {
  if (!text) return "";

  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD") // Separate base letters from accents (e.g., "é" becomes "e" + "´")
    .replace(/[\u0300-\u036f]/g, "") // Remove the accent marks
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars (except hyphens)
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};
