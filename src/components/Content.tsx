import { useState, useRef, useEffect } from "react";
import EditLink from "./Popups/EditLink";
import DeleteLink from "./Popups/DeleteLink";
import AddToLot from "./AddToLot";
import { LinklotData, Content as ContentType } from "../types";
import AddTag from "./AddTag";

const Content = ({ data }: { data: LinklotData }) => {
  const [link, setLink] = useState("");
  const [editLinkOpen, setEditLinkOpen] = useState(false);
  const [deleteLinkOpen, setDeleteLinkOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLots, setSelectedLots] = useState<string[]>([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagInputValue, setTagInputValue] = useState("");
  const [contentTags, setContentTags] = useState<string[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<ContentType>();
  const [mainTags, setMainTags] = useState<string[]>([]);

  // Mock lots data - you can replace this with actual data from props or API
  const lots = [
    { id: "1", name: "Work Projects" },
    { id: "2", name: "Personal Links" },
    { id: "3", name: "Research" },
    { id: "4", name: "Bookmarks" },
    { id: "5", name: "Inspiration" },
  ];

  const handleCreateLot = () => {
    console.log("Create new lot");
    // Add your create lot logic here
  };

  const handleAddLink = () => {
    console.log(link);
  };

  const handleLotToggle = (lotId: string) => {
    setSelectedLots((prev) =>
      prev.includes(lotId)
        ? prev.filter((id) => id !== lotId)
        : [...prev, lotId]
    );
  };

  const handleAddToLot = () => {
    console.log("Selected lots:", selectedLots);
    // Don't clear selectedLots here - we want to keep them for display
  };

  const handleAddTagClick = () => {
    setShowTagInput(true);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInputValue(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInputValue.trim()) {
      setContentTags((prev) => [...prev, tagInputValue.trim()]);
      setTagInputValue("");
      setShowTagInput(false);
    } else if (e.key === "Escape") {
      setTagInputValue("");
      setShowTagInput(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setContentTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleRemoveMainTag = (tagToRemove: string) =>
    setMainTags((prev) => prev.filter((tag) => tag !== tagToRemove));

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
      {editLinkOpen && content && (
        <EditLink content={content} close={() => setEditLinkOpen(false)} />
      )}
      {deleteLinkOpen && content && (
        <DeleteLink content={content} close={() => setDeleteLinkOpen(false)} />
      )}
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
        <AddToLot
          lots={lots}
          selectedLots={selectedLots}
          onLotToggle={handleLotToggle}
          onAddToLot={handleAddToLot}
          onCreateLot={handleCreateLot}
        />
        <hr className="my-4 border-t border-linklot-border-gray" />
        <div className="flex items-center gap-2 mt-2">
          <AddTag
            tags={mainTags}
            onAdd={(tag) => setMainTags((prev) => [...prev, tag])}
            onRemove={handleRemoveMainTag}
          />
        </div>
      </div>
      {data.content.map((content) => (
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
                      setContent(content);
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
                      setContent(content);
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
                  {content.link}
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
                  src={content.thumbnail}
                  alt=""
                  className="w-full h-[200px] object-cover rounded-md"
                />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-[50px] h-[50px]">
                  <img
                    src={content.image}
                    alt=""
                    className="w-full h-full object-cover rounded-md object-cover"
                  />
                </div>
                <p className="text-linklot-text-title text-base font-semibold">
                  {content.title}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-linklot-text-subtitle font-normal text-sm">
                  {content.description}
                </p>
              </div>
            </div>
            <div>
              <div>
                <div className="flex items-center gap-3 overflow-x-auto">
                  {content.tags.map((tag) => (
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span
                        className="material-symbols-rounded !text-xl material-symbols-filled"
                        style={{ color: tag.color }}
                      >
                        folder
                      </span>
                      <span className="text-linklot-hashtags-text text-sm">
                        {tag.name}
                      </span>
                    </div>
                  ))}
                </div>
                <hr className="my-2 border-t border-linklot-border-gray" />
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-[25%]">
                      <div
                        className={`flex bg-linklot-input-background-light items-center gap-1 justify-center cursor-pointer rounded-xl w-[110px] p-1 border border-linklot-border-gray`}
                        onClick={() => {
                          setContent(content);
                          setMenuOpen(false);
                          setEditLinkOpen(true);
                        }}
                      >
                        <span className="material-symbols-rounded !text-xl material-symbols-filled text-linklot-hashtags-text">
                          add
                        </span>
                        <p className="text-linklot-hashtags-text text-sm">
                          Add Tag
                        </p>
                      </div>
                    </div>
                    <div className="w-[70%] flex items-center gap-2 overflow-x-auto">
                      {/* Display existing hashtags */}
                      {content.hashtags.map((hashtag) => (
                        <div className="bg-linklot-hashtags-background flex items-center gap-2 rounded-xl p-1 border border-linklot-border-gray flex items-center gap-1">
                          <p className="text-linklot-hashtags-text text-xs">
                            #{hashtag.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;
