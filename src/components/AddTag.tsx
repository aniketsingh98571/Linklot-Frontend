import React, { useState } from "react";

interface AddTagProps {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  className?: string;
}

const AddTag: React.FC<AddTagProps> = ({
  tags,
  onAdd,
  onRemove,
  className = "",
}) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleAddClick = () => setShowInput(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue("");
      setShowInput(false);
    } else if (e.key === "Escape") {
      handleCloseInput();
    }
  };

  const handleCloseInput = () => {
    setInputValue("");
    setShowInput(false);
  };

  return (
    <div className={`flex items-center gap-2 mt-2 ${className}`}>
      {showInput ? (
        <div className="flex items-center gap-1">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Enter tag name..."
            className="w-[110px] px-2 py-1 text-sm border border-linklot-border-gray rounded-md outline-none focus:border-linklot-background-black"
            autoFocus
          />
          <button
            onClick={handleCloseInput}
            className="px-2 py-1 text-sm text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
          >
            <span className="material-symbols-rounded !text-sm">close</span>
          </button>
        </div>
      ) : (
        <div
          className="flex bg-linklot-input-background-light items-center gap-1 justify-center cursor-pointer rounded-xl w-[110px] p-1 border border-linklot-border-gray"
          onClick={handleAddClick}
        >
          <span className="material-symbols-rounded !text-xl material-symbols-filled text-linklot-hashtags-text">
            add
          </span>
          <p className="text-linklot-hashtags-text text-sm">Add Tag</p>
        </div>
      )}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto">
          {tags.map((tag) => (
            <div
              key={tag}
              className="bg-linklot-hashtags-background  rounded-xl px-2 py-1 border border-linklot-border-gray flex items-center gap-1"
            >
              <p className="text-linklot-hashtags-text text-xs">#{tag}</p>
              <button
                onClick={() => onRemove(tag)}
                className="text-linklot-hashtags-text hover:text-red-500"
              >
                <span className="material-symbols-rounded !text-xs">close</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddTag;
