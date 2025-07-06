import { get, post } from "../../service";
import { Lot } from "./types";

export const getLots = async (): Promise<Lot[]> => {
  const response = await get({ url: "/fetchlots" });
  return response;
};

export const createLot = async (lot: Lot) => {
  const response = await post({ url: "/createlot", data: lot });
  return response;
};

export const updateLot = async (lot: Lot) => {
  const response = await post({ url: "/editlot", data: lot });
  return response;
};
