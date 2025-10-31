export const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://react-booklist-production.up.railway.app"
    : "http://localhost:4000";