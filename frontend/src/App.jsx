import { useEffect, useState } from "react";

import { ShieldCheck } from "lucide-react";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import VerifyDegree from "./pages/VerifyDegree";
import IssueDegree from "./pages/IssueDegree";
import IssuedDegrees from "./pages/IssuedDegrees";

import {
  connectWallet,
  getNetwork
} from "./services/blockchainService";

import "./App.css";


function App() {

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [account, setAccount] =
    useState("");

  const [network, setNetwork] =
    useState("");


  // =========================
  // CONNECT WALLET
  // =========================

  async function handleConnect() {

    try {

      const wallet =
        await connectWallet();

      setAccount(wallet);

      const networkData =
        await getNetwork();

      if (
        networkData.chainId === "11155111"
      ) {

        setNetwork("Sepolia");

      } else {

        setNetwork(
          networkData.name
        );

      }

    } catch (error) {

      console.error(error);

      alert(
        error.message ||
        "Failed to connect wallet."
      );

    }

  }


  // =========================
  // METAMASK EVENTS
  // =========================

  useEffect(() => {

    if (!window.ethereum) {
      return;
    }


    const handleAccountsChanged =
      (accounts) => {

        if (accounts.length > 0) {

          setAccount(accounts[0]);

        } else {

          setAccount("");

        }

      };


    const handleChainChanged =
      () => {

        window.location.reload();

      };


    window.ethereum.on(
      "accountsChanged",
      handleAccountsChanged
    );


    window.ethereum.on(
      "chainChanged",
      handleChainChanged
    );


    return () => {

      window.ethereum.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );

      window.ethereum.removeListener(
        "chainChanged",
        handleChainChanged
      );

    };

  }, []);


  // =========================
  // PAGE ROUTING
  // =========================

  function renderPage() {

    switch (activeTab) {

      case "verify":

        return (
          <VerifyDegree />
        );


      case "issue":

        return (
          <IssueDegree />
        );


      case "issued":

        return (
          <IssuedDegrees />
        );


      case "dashboard":

      default:

        return (
          <Dashboard
            setActiveTab={setActiveTab}
          />
        );

    }

  }


  // =========================
  // MAIN UI
  // =========================

  return (

    <div className="app">

      <Navbar
        account={account}
        onConnect={handleConnect}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        network={network}
      />


      <main>

        {renderPage()}

      </main>


      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-brand">

          <ShieldCheck size={18} />

          <span>
            DegreeVerify
          </span>

        </div>


        <span>
          Decentralized Academic Credential
          Verification
        </span>


        <span className="footer-network">
          Ethereum Sepolia • IPFS
        </span>

      </footer>

    </div>

  );

}


export default App;