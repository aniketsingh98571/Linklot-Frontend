import { get, post } from "../../service";
import { Link } from "./types";

export const createLink = async (link: Link) => {
  const response = await post({ url: "/generatebookmark", data: link });
  return response;
};

export const getLinks = async ({
  search,
  lot,
}: {
  search: string;
  lot: string;
}) => {
  const response = await get({
    url: "/getbookmarksviasearch",
    params: { description: search, Lot: lot },
  });
  return response;
};
