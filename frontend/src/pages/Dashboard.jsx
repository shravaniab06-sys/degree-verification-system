import { useEffect, useState } from "react";

import {
  GraduationCap,
  ShieldCheck,
  Database,
  FileCheck,
  RefreshCw,
  ArrowRight,
  Activity,
  Lock,
  Globe
} from "lucide-react";

import {
  getIssuedDegrees
} from "../services/blockchainService";

function Dashboard({ setActiveTab }) {

  const [degrees, setDegrees] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function loadDegrees() {

    try {

      setLoading(true);
      setError("");

      const data =
        await getIssuedDegrees();

      setDegrees(data);

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Unable to load blockchain records."
      );

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    loadDegrees();
  }, []);

  const ipfsCount =
    degrees.filter(
      degree => degree.ipfsCid
    ).length;

  return (
    <div className="page">

      {/* HERO */}

      <section className="dashboard-hero">

        <div className="hero-content">

          <div className="status-label">
            <span></span>
            BLOCKCHAIN VERIFICATION ACTIVE
          </div>

          <h1>
            Verify Academic
            <br />

            <span>
              Credentials Securely.
            </span>
          </h1>

          <p>
            A decentralized platform for issuing,
            storing and verifying academic
            certificates using blockchain and IPFS.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={() =>
                setActiveTab("verify")
              }
            >
              <ShieldCheck size={18} />
              Verify Certificate
              <ArrowRight size={17} />
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                setActiveTab("issue")
              }
            >
              <GraduationCap size={18} />
              Issue Degree
            </button>

          </div>

        </div>

        <div className="hero-visual">

          <div className="orb"></div>

          <div className="floating-card">

            <ShieldCheck size={42} />

            <strong>
              Verified
            </strong>

            <span>
              Blockchain Secured
            </span>

          </div>

        </div>

      </section>


      {/* STATISTICS */}

      <div className="section-title">
        <div>
          <h2>
            Platform Overview
          </h2>

          <p>
            Live information from the blockchain
          </p>
        </div>

        <button
          className="icon-refresh"
          onClick={loadDegrees}
          title="Refresh"
        >
          <RefreshCw size={18} />
        </button>

      </div>


      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-top">
            <div className="stat-icon purple">
              <GraduationCap />
            </div>

            <span className="stat-live">
              LIVE
            </span>
          </div>

          <span className="stat-label">
            Total Degrees
          </span>

          <h2>
            {loading
              ? "..."
              : degrees.length}
          </h2>

          <p>
            Registered credentials
          </p>

        </div>


        <div className="stat-card">

          <div className="stat-top">
            <div className="stat-icon blue">
              <ShieldCheck />
            </div>

            <span className="stat-live">
              SECURE
            </span>
          </div>

          <span className="stat-label">
            Verified Records
          </span>

          <h2>
            {loading
              ? "..."
              : degrees.length}
          </h2>

          <p>
            Blockchain records
          </p>

        </div>


        <div className="stat-card">

          <div className="stat-top">
            <div className="stat-icon green">
              <FileCheck />
            </div>

            <span className="stat-live">
              IPFS
            </span>
          </div>

          <span className="stat-label">
            Certificates
          </span>

          <h2>
            {loading
              ? "..."
              : ipfsCount}
          </h2>

          <p>
            Decentralized documents
          </p>

        </div>


        <div className="stat-card">

          <div className="stat-top">
            <div className="stat-icon orange">
              <Globe />
            </div>

            <span className="stat-live">
              TESTNET
            </span>
          </div>

          <span className="stat-label">
            Network
          </span>

          <h2>
            Sepolia
          </h2>

          <p>
            Ethereum test network
          </p>

        </div>

      </div>


      {/* SECURITY FEATURES */}

      <div className="section-title">
        <div>
          <h2>
            How DegreeVerify Works
          </h2>

          <p>
            Three layers of decentralized security
          </p>
        </div>
      </div>


      <div className="feature-grid">

        <div className="feature-card">

          <div className="feature-number">
            01
          </div>

          <div className="feature-icon">
            <FileCheck />
          </div>

          <h3>
            Certificate Storage
          </h3>

          <p>
            Certificates are stored using
            decentralized IPFS storage.
          </p>

        </div>


        <div className="feature-card">

          <div className="feature-number">
            02
          </div>

          <div className="feature-icon">
            <Lock />
          </div>

          <h3>
            Blockchain Record
          </h3>

          <p>
            A unique document hash is
            permanently recorded on Ethereum.
          </p>

        </div>


        <div className="feature-card">

          <div className="feature-number">
            03
          </div>

          <div className="feature-icon">
            <ShieldCheck />
          </div>

          <h3>
            Instant Verification
          </h3>

          <p>
            Anyone can verify whether the
            credential exists on-chain.
          </p>

        </div>

      </div>


      {/* RECENT ACTIVITY */}

      <div className="section-title recent-heading">

        <div>
          <h2>
            Recent Activity
          </h2>

          <p>
            Latest certificates added to the system
          </p>
        </div>

        <button
          className="text-button"
          onClick={() =>
            setActiveTab("issued")
          }
        >
          View all
          <ArrowRight size={15} />
        </button>

      </div>


      {error && (
        <div className="error-box">
          {error}
        </div>
      )}


      {loading ? (

        <div className="loading-card">
          <RefreshCw className="spin" />
          Loading blockchain records...
        </div>

      ) : degrees.length === 0 ? (

        <div className="empty-state">
          <Activity size={35} />
          <h3>
            No activity yet
          </h3>

          <p>
            Issued degrees will appear here.
          </p>
        </div>

      ) : (

        <div className="activity-list">

          {degrees
            .slice(-5)
            .reverse()
            .map((degree, index) => (

              <div
                className="activity-card"
                key={index}
              >

                <div className="activity-icon">
                  <GraduationCap size={20} />
                </div>

                <div className="activity-info">

                  <strong>
                    {degree.studentName}
                  </strong>

                  <span>
                    {degree.degreeTitle}
                  </span>

                </div>

                <div className="activity-id">
                  {degree.studentId}
                </div>

                <div className="verified-pill">
                  <ShieldCheck size={14} />
                  Verified
                </div>

              </div>

            ))}

        </div>

      )}

    </div>
  );
}

export default Dashboard;