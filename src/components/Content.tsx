import { useState } from "react";

const Content = () => {
  const [link, setLink] = useState("");

  const handleAddLink = () => {
    console.log(link);
  };

  return (
    <div className="pt-6">
      <div className="bg-linklot-background-white rounded-lg p-4 w-1/3 border border-linklot-border-gray">
        <div className="flex items-center gap-2 pb-16">
          <div className="w-2 h-2 bg-[#FE8463] rounded-full"></div>
          <div className="w-2 h-2 bg-[#F9C557] rounded-full"></div>
          <div className="w-2 h-2 bg-[#02B99A] rounded-full"></div>
        </div>
        <div>
          <p className="text-linklot-text-title text-base font-bold mb-2">
            Quickly Save a Link
          </p>
          <p className="text-linklot-text-subtitle text-sm mb-4">
            Paste a link, and we'll instantly fetch its title, preview, and
            details for you—quick like magic!.
          </p>
        </div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 border border-linklot-border-gray rounded-md p-2 w-3/4">
            <span className="material-symbols-rounded !text-xl text-linklot-hashtags-text">
              link
            </span>
            <input
              type="text"
              placeholder="Enter URL here"
              className="w-full outline-none"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <button
            className="bg-linklot-background-black text-linklot-text-white rounded-md px-2 py-2.5 w-1/5"
            onClick={handleAddLink}
          >
            Add Link
          </button>
        </div>
        <div>
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-rounded !text-xl material-symbols-filled text-linklot-hashtags-text">
              folder
            </span>
            <p className="text-linklot-hashtags-text text-sm">Add to Lot</p>
          </div>
        </div>
        <hr className="my-4 border-t border-linklot-border-gray" />
        <div className="flex bg-linklot-input-background-light items-center gap-1 justify-center cursor-pointer rounded-xl w-[110px] p-1 border border-linklot-border-gray">
          <span className="material-symbols-rounded !text-xl material-symbols-filled text-linklot-hashtags-text">
            add
          </span>
          <p className="text-linklot-hashtags-text text-sm">Add Tag</p>
        </div>
      </div>
    </div>
  );
};

export default Content;
