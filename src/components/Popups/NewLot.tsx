import { useState } from "react";
import { Tags as TagsType } from "../../types";
import { post } from "../../lib/service";

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
  lotDetailsOpen?: TagsType;
};

const NewLot = ({ isNew, closeLot, lotDetailsOpen }: NewLotProps) => {
  const [name, setName] = useState(lotDetailsOpen?.name);
  const [color, setColor] = useState(lotDetailsOpen?.color);

  const handleSave = async () => {
    console.log(name, color, "name, color");
    const response = await post({
      url: "/createlot",
      data: {
        Lot: name,
        color: color,
      },
    });
    console.log(response, "response");
  };

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
            className="px-4 py-2 rounded bg-linklot-background-white border border-linklot-border-gray cursor-pointer"
            type="button"
            onClick={closeLot}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 cursor-pointer"
            type="button"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewLot;
