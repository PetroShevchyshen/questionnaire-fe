import { ISelector } from "../contracts/ISelector";

export const sortFields: ISelector[] = [
  { label: "Quiz name", value: "title" },
  { label: "Complete count", value: "count" },
];

export const sortOrders: ISelector[] = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];
