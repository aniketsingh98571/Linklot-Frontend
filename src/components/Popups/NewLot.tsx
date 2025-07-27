import { useState } from "react";
import { createLot, updateLot } from "../../lib/services/Lots";
import { useMutation } from "@tanstack/react-query";
import { Lot } from "../../lib/services/Lots/types";
import { toast, ToastContainer } from "react-toastify";
import { FREE_VERSION_LOTS_LIMIT } from "../../constant";

const COLORS = [
  "#4ADE80", // green-400
  "#F472B6", // pink-400
  "#FACC15", // yellow-400
  "#FB923C", // orange-400
  "#C084FC", // purple-400
  "#60A5FA", // blue-400
  "#67E8F9", // cyan-300
  "#E5E7EB", // gray-200
];
type NewLotProps = {
  isNew: boolean;
  closeLot: () => void;
  lotDetailsOpen?: Lot;
  lots: Lot[];
};

const NewLot = ({ isNew, closeLot, lotDetailsOpen, lots }: NewLotProps) => {
  const [name, setName] = useState(lotDetailsOpen?.name);
  const [color, setColor] = useState(lotDetailsOpen?.color);
  const { mutate: createLotMutation, isPending: isCreatingLot } = useMutation({
    mutationFn: createLot,
  });

  const { mutate: updateLotMutation, isPending: isUpdatingLot } = useMutation({
    mutationFn: updateLot,
  });

  const handleSave = async () => {
    console.log(lotDetailsOpen, "lotDetailsOpen");
    if (isNew) {
      console.log(lots, "lots");
      if (lots.length === FREE_VERSION_LOTS_LIMIT) {
        toast.error(
          `You can only have ${FREE_VERSION_LOTS_LIMIT} lots in free version`
        );
        return;
      }
      createLotMutation({ name: name || "", color: color || "#000" });
    } else {
      updateLotMutation({
        id: lotDetailsOpen?.id,
        name: name || "",
        color: color || "#000",
      });
    }
  };

  const isLoading = isCreatingLot || isUpdatingLot;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative border border-linklot-border-gray">
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded text-linklot-hashtags-text !text-2xl material-symbols-filled">
              folder
            </span>
            <span className="font-medium text-sm text-linklot-tags-text">
              {isNew ? "New Lot" : "Edit Lot"}
            </span>
          </div>
          <span
            className="material-symbols-rounded text-linklot-text-black !text-3xl material-symbols-filled cursor-pointer"
            onClick={closeLot}
          >
            close
          </span>
        </div>
        {/* Name Input */}
        <input
          className="w-full border bg-linklot-input-background-light border-gray-300 text-sm rounded px-3 py-1.5 mb-4 outline-none"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* Color Selection */}
        <div className="mb-6 flex items-center gap-4">
          <span className=" text-linklot-card-button-text text-sm">Color</span>
          <div className="inline-flex space-x-3">
            {COLORS.map((c, idx) => (
              <button
                key={c}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  color === c ? "border-black" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
                aria-label={`Select color ${idx + 1}`}
                type="button"
              ></button>
            ))}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 rounded bg-linklot-background-white border border-linklot-border-gray cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            onClick={closeLot}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            type="button"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            Save
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default NewLot;
