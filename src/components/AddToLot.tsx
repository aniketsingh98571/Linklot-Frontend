import React, { useState, useRef, useEffect } from "react";
import { Lot } from "../lib/services/Lots/types";
import NewLot from "./Popups/NewLot";

interface AddToLotProps {
  lots: Lot[];
  selectedLots: string[];
  onLotToggle: (lotId: string) => void;
  className?: string;
}

const AddToLot: React.FC<AddToLotProps> = ({
  lots,
  selectedLots,
  onLotToggle,
  className = "",
}) => {
  const [lotDropdownOpen, setLotDropdownOpen] = useState(false);
  const lotDropdownRef = useRef<HTMLDivElement>(null);
  const [newLotOpen, setNewLotOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        lotDropdownRef.current &&
        !lotDropdownRef.current.contains(event.target as Node)
      ) {
        setLotDropdownOpen(false);
      }
    }
    if (lotDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [lotDropdownOpen]);

  const handleAddToLotClick = () => {
    // onAddToLot();
    setLotDropdownOpen(false);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {newLotOpen && (
        <NewLot closeLot={() => setNewLotOpen(false)} isNew={true} />
      )}
      <div className="relative w-[28%]">
        <div
          className="flex items-center gap-2 cursor-pointer w-full"
          onClick={() => setLotDropdownOpen(!lotDropdownOpen)}
        >
          <span className="material-symbols-rounded !text-xl material-symbols-filled text-linklot-hashtags-text">
            folder
          </span>
          <p className="text-linklot-hashtags-text text-sm">Add to Lot</p>
        </div>

        {lotDropdownOpen && (
          <div
            ref={lotDropdownRef}
            className="absolute top-full left-0 mt-2 w-64 bg-linklot-background-white border border-linklot-border-gray rounded-md shadow-lg z-10 max-h-48 overflow-y-auto"
          >
            <div className="p-2">
              <p className="text-linklot-text-title text-sm font-semibold mb-2">
                Select Lots
              </p>
              {lots.length > 0 ? (
                <>
                  {lots.map((lot) => (
                    <div
                      key={lot.id}
                      className="flex items-center gap-2 p-2 hover:bg-linklot-input-background-light rounded cursor-pointer"
                      onClick={() => onLotToggle(lot.id?.toString() || "")}
                    >
                      <div
                        className={`w-4 h-4 border border-linklot-border-gray rounded flex items-center justify-center ${
                          selectedLots.includes(lot.id?.toString() || "")
                            ? "bg-linklot-background-black border-linklot-background-black"
                            : ""
                        }`}
                      >
                        {selectedLots.includes(lot.id?.toString() || "") && (
                          <span className="material-symbols-rounded !text-xs text-linklot-text-white">
                            check
                          </span>
                        )}
                      </div>
                      <span className="text-linklot-text-title text-sm">
                        {lot.name}
                      </span>
                    </div>
                  ))}
                  {selectedLots.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-linklot-border-gray">
                      <button
                        className="w-full bg-linklot-background-black text-linklot-text-white rounded-md px-3 py-2 text-sm"
                        onClick={handleAddToLotClick}
                      >
                        Add to {selectedLots.length} Lot
                        {selectedLots.length > 1 ? "s" : ""}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-linklot-text-subtitle text-sm mb-3">
                    No lots available
                  </p>
                  <button
                    className="bg-linklot-background-black text-linklot-text-white rounded-md px-4 py-2 text-sm"
                    onClick={() => setNewLotOpen(true)}
                  >
                    Create Lot
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Display selected lots to the right of Add to Lot button */}
      {selectedLots.length > 0 && (
        <div className="flex items-center gap-2 w-[65%] overflow-x-auto">
          {selectedLots.map((lotId) => {
            const lot = lots.find((l) => l.id?.toString() === lotId);
            return lot ? (
              <div
                key={lotId}
                className="bg-linklot-hashtags-background flex items-center gap-2 rounded-xl p-1 border border-linklot-border-gray flex items-center gap-1"
              >
                <span className="material-symbols-rounded !text-xs material-symbols-filled text-linklot-hashtags-text">
                  folder
                </span>
                <p className="text-linklot-hashtags-text text-xs">{lot.name}</p>
                <button
                  onClick={() => onLotToggle(lotId)}
                  className="ml-1 text-linklot-hashtags-text hover:text-red-500"
                >
                  <span className="material-symbols-rounded !text-xs">
                    close
                  </span>
                </button>
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};

export default AddToLot;
