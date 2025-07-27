import { useState } from "react";
import NewLot from "./NewLot";
import { Content } from "../../types";
import AddTag from "../AddTag";
import AddToLot from "../AddToLot";
import { Lot } from "../../lib/services/Lots/types";

const EditLink = ({
  content,
  close,
  lots,
}: {
  content: Content;
  lots: Lot[];
  close: () => void;
}) => {
  const [newLotOpen, setNewLotOpen] = useState(false);
  const [selectedLots, setSelectedLots] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>(
    content.hashtags.map((tag) => tag.name)
  );

  const handleLotToggle = (lotId: string) => {
    setSelectedLots((prev) =>
      prev.includes(lotId)
        ? prev.filter((id) => id !== lotId)
        : [...prev, lotId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {newLotOpen && (
        <NewLot
          lots={lots}
          isNew={true}
          closeLot={() => setNewLotOpen(false)}
        />
      )}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative border border-linklot-border-gray">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded text-linklot-hashtags-text !text-2xl material-symbols-filled">
              folder
            </span>
            <span className="font-medium text-sm text-linklot-tags-text">
              Edit Link
            </span>
          </div>
          <span
            className="material-symbols-rounded text-linklot-text-black !text-3xl material-symbols-filled cursor-pointer"
            onClick={close}
          >
            close
          </span>
        </div>
        <div>
          <div className="flex gap-2 items-center w-11/12 border border-linklot-border-gray rounded-md p-2 bg-linklot-input-background-light">
            <input
              type="text"
              value={content.link}
              className="w-full outline-none text-sm"
              disabled
            />
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2 overflow-x-auto">
              <AddTag
                tags={hashtags}
                onAdd={(tag) => setHashtags([...hashtags, tag])}
                onRemove={(tag) =>
                  setHashtags(hashtags.filter((t) => t !== tag))
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-8 mt-1 mb-4">
            {/* <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => {
                setNewLotOpen(true);
                // close();
              }}
            >
              <span className="material-symbols-rounded !text-ls text-linklot-hashtags-text">
                add
              </span>
              <span className="text-linklot-hashtags-text text-sm">
                New Lot
              </span>
            </div> */}
            <div className="w-[20%]">
              <AddToLot
                lots={lots}
                selectedLots={selectedLots}
                onLotToggle={handleLotToggle}
              />
            </div>

            <div className="flex items-center gap-1 w-[70%] overflow-x-auto">
              {/* <div className="flex w-[70%] items-center gap-2 overflow-x-auto"> */}
              {content.tags.map((tag) => (
                <div className="flex items-center gap-1 cursor-pointer rounded-md transition-colors group/tag hover:bg-linklot-tags-hover px-2 py-1">
                  <button className="flex items-center gap-1 cursor-pointer bg-transparent">
                    <span
                      className="material-symbols-rounded !text-xl material-symbols-filled"
                      style={{ color: tag.color }}
                    >
                      folder
                    </span>
                    <span className="text-linklot-hashtags-text text-sm">
                      {tag.name}
                    </span>
                  </button>
                  <button
                    className="flex items-center p-1 rounded-full cursor-pointer opacity-0 group-hover/tag:opacity-100 transition-opacity"
                    // onClick={(e) => handleTagMenuOpen(tag.id, e)}
                    type="button"
                  >
                    <span className="material-symbols-rounded !text-xl text-linklot-hashtags-text">
                      close
                    </span>
                  </button>
                </div>
              ))}
            </div>
            {/* </div> */}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 rounded bg-linklot-background-white border border-linklot-border-gray cursor-pointer"
            type="button"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 cursor-pointer"
            type="button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLink;
