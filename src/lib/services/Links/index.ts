import { get, post } from "../../service";
import { Link } from "./types";

export const createLink = async (link: Link) => {
  try {
    // // Fetch favicon and convert to base64
    // const faviconUrl = `https://favicone.com/${link.url}?json`;
    // const faviconResponse = await fetch(faviconUrl);
    // const faviconBlob = await faviconResponse.blob();
    // const faviconBase64 = await new Promise<string>((resolve) => {
    //   const reader = new FileReader();
    //   reader.onloadend = () => resolve(reader.result as string);
    //   reader.readAsDataURL(faviconBlob);
    // });

    // // Fetch thumbnail and convert to base64
    // const thumbnailUrl = `https://api.screenshotmachine.com?key=a76adc&url=${link.url}&dimension=1024x768`;
    // const thumbnailResponse = await fetch(thumbnailUrl);
    // const thumbnailBlob = await thumbnailResponse.blob();
    // const thumbnailBase64 = await new Promise<string>((resolve) => {
    //   const reader = new FileReader();
    //   reader.onloadend = () => resolve(reader.result as string);
    //   reader.readAsDataURL(thumbnailBlob);
    // });

    // console.log("Favicon base64:", faviconBase64.substring(0, 100) + "...");
    // console.log("Thumbnail base64:", thumbnailBase64.substring(0, 100) + "...");

    // Add the base64 data to the link object
    const linkWithImages = {
      ...link,
      // icon: faviconBase64,
      // Thumbnail: thumbnailBase64,
    };

    const response = await post({
      url: "/generatebookmark",
      data: linkWithImages,
    });
    return response;
  } catch (error) {
    console.log("its error");
    console.log("Error fetching favicon or thumbnail:", error);
    // Continue with the original link data if image fetching fails
    // const response = await post({ url: "/generatebookmark", data: link });
    // return response;
  }
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
