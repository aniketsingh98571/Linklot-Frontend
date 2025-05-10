const DeleteLink = ({ close }: { close: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative border border-linklot-border-gray">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded text-linklot-hashtags-text !text-2xl material-symbols-filled">
              folder
            </span>
            <span className="font-medium text-sm text-linklot-tags-text">
              Delete Link
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
          <p className="font-light text-linklot-text-subtitle">
            Once deleted, the link will be permanently removed and cannot be
            retrieved.
          </p>
        </div>

        {/* Buttons */}
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
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLink;
