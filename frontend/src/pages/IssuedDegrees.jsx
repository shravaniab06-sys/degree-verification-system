import { useEffect, useState } from "react";

import {
  History,
  Search,
  ShieldCheck,
  FileText,
  ExternalLink,
  Copy,
  RefreshCw,
  GraduationCap
} from "lucide-react";

import { getIssuedDegrees } from "../services/blockchainService";


function IssuedDegrees() {

  const [degrees, setDegrees] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [copied, setCopied] = useState("");


  async function loadDegrees() {

    try {

      setLoading(true);
      setError("");

      const data = await getIssuedDegrees();

      setDegrees(data);

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Unable to load issued degrees."
      );

    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {

    loadDegrees();

  }, []);


  async function copyHash(hash) {

    try {

      await navigator.clipboard.writeText(hash);

      setCopied(hash);

      setTimeout(() => {
        setCopied("");
      }, 1500);

    } catch (err) {

      console.error(err);

    }

  }


  const filteredDegrees =
    degrees.filter((degree) => {

      const text =
        `${degree.studentId}
        ${degree.studentName}
        ${degree.degreeTitle}
        ${degree.degreeHash}`.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );

    });


  return (

    <div className="page records-page">

      {/* HEADER */}

      <div className="page-header">

        <div className="page-header-icon">
          <History size={25} />
        </div>

        <h1>
          Issued Records
        </h1>

        <p>
          Browse academic credentials permanently
          recorded on the blockchain.
        </p>

      </div>


      {/* TOP CARD */}

      <div className="records-toolbar">

        <div className="records-heading">

          <div className="records-heading-icon">
            <GraduationCap size={20} />
          </div>

          <div>

            <h2>
              Blockchain Records
            </h2>

            <p>
              {degrees.length} credential
              {degrees.length !== 1 ? "s" : ""}
              {" "}recorded
            </p>

          </div>

        </div>


        <button
          className="refresh-button"
          onClick={loadDegrees}
          disabled={loading}
        >

          <RefreshCw
            size={16}
            className={
              loading
                ? "refresh-spin"
                : ""
            }
          />

          Refresh

        </button>

      </div>


      {/* SEARCH */}

      <div className="records-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search by student ID, name, degree or hash..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/* ERROR */}

      {error && (

        <div className="error-box records-error">

          <strong>
            Unable to load records
          </strong>

          <span>
            {error}
          </span>

        </div>

      )}


      {/* LOADING */}

      {loading && (

        <div className="records-loading">

          <span className="spinner"></span>

          <p>
            Loading blockchain records...
          </p>

        </div>

      )}


      {/* EMPTY */}

      {!loading &&
       !error &&
       filteredDegrees.length === 0 && (

        <div className="records-empty">

          <div className="empty-icon">
            <History size={28} />
          </div>

          <h3>
            No Records Found
          </h3>

          <p>
            {search
              ? "No degree matches your search."
              : "No degrees have been issued yet."}
          </p>

        </div>

      )}


      {/* RECORDS */}

      {!loading &&
       filteredDegrees.length > 0 && (

        <div className="records-grid">

          {filteredDegrees
            .slice()
            .reverse()
            .map((degree, index) => (

            <div
              className="record-card"
              key={
                `${degree.degreeHash}-${index}`
              }
            >

              {/* CARD HEADER */}

              <div className="record-card-header">

                <div className="record-degree-icon">

                  <GraduationCap size={21} />

                </div>


                <div className="record-card-title">

                  <h3>
                    {degree.degreeTitle}
                  </h3>

                  <span>
                    Student ID: {degree.studentId}
                  </span>

                </div>


                <div className="verified-pill">

                  <ShieldCheck size={13} />

                  Verified

                </div>

              </div>


              {/* STUDENT */}

              <div className="record-student">

                <span className="record-label">
                  Student
                </span>

                <strong>
                  {degree.studentName}
                </strong>

              </div>


              {/* DETAILS */}

              <div className="record-details">

                <div>

                  <span>
                    Issued
                  </span>

                  <strong>
                    {new Date(
                      Number(degree.issuedAt) * 1000
                    ).toLocaleDateString()}
                  </strong>

                </div>


                <div>

                  <span>
                    Network
                  </span>

                  <strong>
                    Ethereum Sepolia
                  </strong>

                </div>

              </div>


              {/* HASH */}

              <div className="record-hash">

                <span>
                  Degree Hash
                </span>

                <div className="hash-content">

                  <code>
                    {degree.degreeHash}
                  </code>

                  <button
                    type="button"
                    className="copy-button"
                    onClick={() =>
                      copyHash(
                        degree.degreeHash
                      )
                    }
                    title="Copy hash"
                  >

                    <Copy size={14} />

                  </button>

                </div>

                {copied === degree.degreeHash && (

                  <small>
                    Copied!
                  </small>

                )}

              </div>


              {/* ACTIONS */}

              <div className="record-actions">

                {degree.ipfsCid && (

                  <a
                    href={
                      `https://ipfs.io/ipfs/${degree.ipfsCid}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="record-action primary"
                  >

                    <FileText size={15} />

                    Certificate

                    <ExternalLink size={12} />

                  </a>

                )}


                {degree.transactionHash && (

                  <a
                    href={
                      `https://sepolia.etherscan.io/tx/${degree.transactionHash}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="record-action"
                  >

                    <ExternalLink size={15} />

                    Transaction

                  </a>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}


export default IssuedDegrees;