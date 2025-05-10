import { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.svg";
import EditLink from "./Popups/EditLink";
import DeleteLink from "./Popups/DeleteLink";

const Content = () => {
  const [link, setLink] = useState("");
  const [editLinkOpen, setEditLinkOpen] = useState(false);
  const [deleteLinkOpen, setDeleteLinkOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleAddLink = () => {
    console.log(link);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="pt-6 flex items-stretch gap-4 h-[500px]">
      {editLinkOpen && <EditLink close={() => setEditLinkOpen(false)} />}
      {deleteLinkOpen && <DeleteLink close={() => setDeleteLinkOpen(false)} />}
      <div className="bg-linklot-background-white rounded-lg p-4 w-1/3 border border-linklot-border-gray h-full">
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
      <div className="bg-linklot-background-white rounded-lg p-4 w-1/3 border border-linklot-border-gray h-full">
        <div className="flex items-center justify-between mb-4">
          <div
            className="relative flex flex-col items-center gap-1 cursor-pointer"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <div className="w-1 h-1 bg-linklot-background-black rounded-full"></div>
            <div className="w-1 h-1 bg-linklot-background-black rounded-full"></div>
            <div className="w-1 h-1 bg-linklot-background-black rounded-full"></div>
            {menuOpen && (
              <div
                ref={menuRef}
                className="absolute left-6 top-0 w-32 bg-linklot-background-white border border-linklot-border-gray rounded-md shadow-lg z-10"
              >
                <button
                  className="flex cursor-pointer text-linklot-text-title text-sm items-center gap-2 w-full px-4 py-1 hover:bg-linklot-background-black hover:text-linklot-text-white rounded-t-md"
                  onClick={() => {
                    setMenuOpen(false);
                    setEditLinkOpen(true);
                  }}
                >
                  <span className="material-symbols-rounded !text-base">
                    edit
                  </span>
                  Edit
                </button>
                <button
                  className="flex cursor-pointer items-center gap-2 w-full px-4 py-1 text-red-500 hover:bg-linklot-background-black/10 rounded-b-md"
                  onClick={() => {
                    setMenuOpen(false);
                    setDeleteLinkOpen(true);
                  }}
                >
                  <span className="material-symbols-rounded !text-base">
                    delete
                  </span>
                  Delete
                </button>
              </div>
            )}
          </div>
          <div className="w-9/12">
            <div className="w-full border border-linklot-border-gray rounded-md p-2 bg-linklot-input-background-light">
              <p className="text-center text-linklot-icon-color">
                www.google.com
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="material-symbols-rounded !text-2xl text-linklot-icon-color">
              open_in_new
            </span>
          </div>
        </div>
        <div>
          <div>
            <div className="mb-4">
              <img
                src="https://picsum.photos/seed/picsum/1200/630"
                alt=""
                className="w-full h-[200px] object-cover rounded-md"
              />
            </div>
            <div className="flex items-center gap-1">
              <img src={logo} alt="" />
              <p className="text-linklot-text-title text-base font-semibold">
                Linklot
              </p>
            </div>
            <div className="mb-4">
              <p className="text-linklot-text-subtitle font-normal text-sm">
                Linklot is a platform for creating and managing links.
              </p>
            </div>
          </div>
          <div>
            <div>
              <div>
                <div className="flex items-center gap-1 cursor-pointer">
                  <span
                    className="material-symbols-rounded !text-xl material-symbols-filled"
                    style={{ color: "red" }}
                  >
                    folder
                  </span>
                  <span className="text-linklot-hashtags-text text-sm">
                    Dev Tools
                  </span>
                </div>
              </div>
              <hr className="my-4 border-t border-linklot-border-gray" />
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex bg-linklot-input-background-light items-center gap-1 justify-center cursor-pointer rounded-xl px-2 py-1 border border-linklot-border-gray">
                    <span className="material-symbols-rounded !text-xs material-symbols-filled text-linklot-hashtags-text">
                      add
                    </span>
                    <p className="text-linklot-hashtags-text text-xs">
                      Add Tag
                    </p>
                  </div>
                  <div>
                    <div className="bg-linklot-hashtags-background inline-block rounded-xl px-2 py-1 border border-linklot-border-gray">
                      <p className="text-linklot-hashtags-text text-xs">#ai</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
