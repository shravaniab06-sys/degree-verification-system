import {
  Wallet,
  LayoutDashboard,
  Search,
  GraduationCap,
  History,
  ShieldCheck
} from "lucide-react";

function Navbar({
  account,
  onConnect,
  activeTab,
  setActiveTab,
  network
}) {
  const shortAddress = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : "Connect Wallet";

  return (
    <nav className="navbar">

      <div className="logo-section">

        <div className="logo-icon">
          <ShieldCheck size={23} />
        </div>

        <div>
          <div className="logo">
            Degree<span>Verify</span>
          </div>

          <div className="logo-subtitle">
            Blockchain Credentials
          </div>
        </div>

      </div>

      <div className="nav-links">

        <button
          className={
            activeTab === "dashboard"
              ? "nav-item active"
              : "nav-item"
          }
          onClick={() =>
            setActiveTab("dashboard")
          }
        >
          <LayoutDashboard size={17} />
          Dashboard
        </button>

        <button
          className={
            activeTab === "verify"
              ? "nav-item active"
              : "nav-item"
          }
          onClick={() =>
            setActiveTab("verify")
          }
        >
          <Search size={17} />
          Verify
        </button>

        <button
          className={
            activeTab === "issue"
              ? "nav-item active"
              : "nav-item"
          }
          onClick={() =>
            setActiveTab("issue")
          }
        >
          <GraduationCap size={17} />
          Issue
        </button>

        <button
          className={
            activeTab === "issued"
              ? "nav-item active"
              : "nav-item"
          }
          onClick={() =>
            setActiveTab("issued")
          }
        >
          <History size={17} />
          Records
        </button>

      </div>

      <div className="navbar-right">

        {network && (
          <div className="network-badge">

            <span className="online-dot"></span>

            <span>
              {network}
            </span>

          </div>
        )}

        <button
          className="wallet-button"
          onClick={onConnect}
        >
          <Wallet size={17} />

          <span>
            {shortAddress}
          </span>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;