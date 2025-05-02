import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full border-b border-linklot-border-gray bg-linklot-background-white p-2">
      <div className="app-container">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-4 w-3/5">
            <img src={logo} alt="logo" />
            <div className="flex gap-2 items-center w-11/12 border border-linklot-border-gray rounded-md p-2 bg-linklot-input-background-light">
              <span className="material-symbols-rounded !text-xl text-linklot-icon-color">
                search
              </span>

              <input
                type="text"
                placeholder="Search by URL, title, or tags..."
                className="w-full outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 justify-end w-2/6">
            <span className="material-symbols-rounded  text-linklot-icon-color">
              settings
            </span>
            <div className="flex items-center gap-2">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
