import { useState, useRef, useEffect } from "react";
import NewLot from "./Popups/NewLot";
import DeleteLot from "./Popups/DeleteLot";
import { Tags as TagsType } from "../types";
import { Lot } from "../lib/services/Lots/types";

const sortOptions = ["Recent", "Oldest", "Alphabetical"];

// Utility function to convert hex color to light shade
const getLightShade = (hexColor: string, opacity: number = 0.5): string => {
  // Remove # if present
  const hex = hexColor.replace("#", "");

  console.log(hexColor, "color");

  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Return rgba with opacity
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

type TagsProps = {
  lots: Lot[];
  isLoading: boolean;
  selectedLot: string;
  setSelectedLot: (lot: string) => void;
};

const TagsSkeleton = () => {
  return (
    <div className="pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-wrap">
          {/* All Links button skeleton */}
          <div className="flex items-center gap-1 py-1 px-2 rounded-md bg-gray-200 animate-pulse">
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
          </div>

          {/* Tags skeleton */}
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex items-center gap-1 px-2 py-1">
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* New Lot button skeleton */}
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Sort dropdown skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="flex items-center gap-1 py-0.5 px-2 rounded-md border border-gray-300 bg-gray-200 animate-pulse">
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Tags = ({ isLoading, lots, selectedLot, setSelectedLot }: TagsProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [newLotOpen, setNewLotOpen] = useState({
    open: false,
    isNew: true,
  });
  const [deleteLotOpen, setDeleteLotOpen] = useState(false);
  const [lotDetailsOpen, setLotDetailsOpen] = useState<TagsType>();
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [tagMenuOpen, setTagMenuOpen] = useState<{
    id: number | null;
    anchor: HTMLElement | null;
  }>({ id: null, anchor: null });
  const tagMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tagMenuRef.current &&
        !tagMenuRef.current.contains(event.target as Node) &&
        tagMenuOpen.id !== null
      ) {
        setTagMenuOpen({ id: null, anchor: null });
      }
    }
    if (tagMenuOpen.id !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tagMenuOpen]);

  const handleLotOpen = () => {
    setLotDetailsOpen(undefined);
    setNewLotOpen({
      open: !newLotOpen.open,
      isNew: true,
    });
  };

  const handleTagMenuOpen = (
    id: number,
    event: React.MouseEvent<HTMLElement>
  ) => {
    setTagMenuOpen({ id, anchor: event.currentTarget });
  };
  const handleTagMenuClose = () => {
    setTagMenuOpen({ id: null, anchor: null });
  };

  const handleLotSelect = (lotName: string) => {
    setSelectedLot(lotName);
  };

  console.log(selectedLot, "selected lot");
  return (
    <div className="pt-6">
      {newLotOpen.open && (
        <NewLot
          isNew={newLotOpen.isNew}
          closeLot={() => setNewLotOpen({ open: false, isNew: true })}
          lotDetailsOpen={lotDetailsOpen}
          lots={lots}
        />
      )}
      {deleteLotOpen && (
        <DeleteLot
          lotDetailsOpen={lotDetailsOpen}
          closeLot={() => setDeleteLotOpen(false)}
        />
      )}
      {isLoading ? (
        <TagsSkeleton />
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-wrap">
            <button
              className={`cursor-pointer flex items-center gap-1 py-1 px-2 rounded-md transition-colors ${
                selectedLot === "all"
                  ? "bg-linklot-background-black text-linklot-text-white"
                  : "bg-transparent text-linklot-hashtags-text hover:bg-linklot-tags-hover"
              }`}
              onClick={() => handleLotSelect("all")}
            >
              <span
                className={`material-symbols-rounded !text-xl ${
                  selectedLot === "all"
                    ? "text-linklot-text-white"
                    : "text-linklot-hashtags-text"
                }`}
              >
                language
              </span>
              <span
                className={
                  selectedLot === "all"
                    ? "text-linklot-text-white"
                    : "text-linklot-hashtags-text"
                }
              >
                All Links
              </span>
            </button>
            <div className="flex items-center gap-4">
              {lots.map((tag: Lot) => (
                <div key={tag.id} className="relative group">
                  <div
                    className={`flex items-center gap-1 cursor-pointer rounded-md transition-colors group/tag px-2 py-1 ${
                      selectedLot === tag.name
                        ? ""
                        : "hover:bg-linklot-tags-hover"
                    }`}
                    style={{
                      backgroundColor:
                        selectedLot === tag.name
                          ? getLightShade(tag.color || "#000")
                          : "transparent",
                    }}
                    onClick={() => handleLotSelect(tag.name)}
                  >
                    <button className="flex items-center gap-1 cursor-pointer bg-transparent">
                      <span
                        className="material-symbols-rounded !text-xl material-symbols-filled"
                        style={{ color: tag.color || "#000" }}
                      >
                        folder
                      </span>
                      <span className="text-linklot-hashtags-text text-sm">
                        {tag.name}
                      </span>
                    </button>
                    <button
                      className="flex items-center p-1 rounded-full cursor-pointer opacity-0 group-hover/tag:opacity-100 transition-opacity"
                      onClick={(e) => handleTagMenuOpen(tag?.id || 0, e)}
                      type="button"
                    >
                      <span className="material-symbols-rounded !text-xl text-linklot-hashtags-text">
                        more_vert
                      </span>
                    </button>
                  </div>
                  {/* Popup for Edit/Delete */}
                  {tagMenuOpen.id === tag?.id && (
                    <div
                      ref={tagMenuRef}
                      className="absolute z-20 right-0 mt-2 w-32 bg-linklot-background-white border border-linklot-border-gray rounded-md shadow-lg"
                    >
                      <button
                        className="flex cursor-pointer text-linklot-text-title text-sm items-center gap-2 w-full px-4 py-1 hover:bg-linklot-background-black hover:text-linklot-text-white rounded-t-md"
                        onClick={() => {
                          setLotDetailsOpen(tag as TagsType);
                          // handle edit logic here
                          setNewLotOpen({
                            open: true,
                            isNew: false,
                          });
                          handleTagMenuClose();
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
                          setLotDetailsOpen(tag as TagsType);
                          // handle delete logic here
                          setDeleteLotOpen(true);
                          handleTagMenuClose();
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
              ))}
            </div>
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={handleLotOpen}
            >
              <span className="material-symbols-rounded !text-ls text-linklot-hashtags-text">
                add
              </span>
              <span className="text-linklot-hashtags-text text-sm">
                New Lot
              </span>
            </div>
          </div>
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center gap-2">
              <span className="text-linklot-hashtags-text text-ls">Sort</span>
              <button
                type="button"
                className="cursor-pointer flex items-center gap-1 bg-linklot-background-white py-0.5 px-2 rounded-md border border-linklot-border-gray"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <span>{selectedOption}</span>
                <div className="flex flex-col">
                  <span className="material-symbols-rounded !text-lg rotate-180 ">
                    expand_more
                  </span>
                  <span className="material-symbols-rounded !text-lg mt-[-18px]">
                    expand_more
                  </span>
                </div>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-32 bg-linklot-background-white border border-linklot-border-gray rounded-md shadow-lg z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      className={`w-full text-left px-4 py-2 hover:bg-linklot-background-black hover:text-linklot-text-white rounded-md ${
                        selectedOption === option ? "font-bold" : ""
                      }`}
                      onClick={() => {
                        setSelectedOption(option);
                        setDropdownOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tags;
