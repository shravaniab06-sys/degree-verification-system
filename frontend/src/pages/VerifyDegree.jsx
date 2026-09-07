import { useState } from "react";

import {
  Search,
  ShieldCheck,
  XCircle,
  FileText,
  Copy,
  ExternalLink
} from "lucide-react";

import { verifyDegree } from "../services/blockchainService";


function VerifyDegree() {

  const [degreeHash, setDegreeHash] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [copied, setCopied] = useState(false);


  async function handleVerify(event) {

    event.preventDefault();

    setError("");
    setResult(null);

    if (!degreeHash.trim()) {
      setError("Please enter a degree hash.");
      return;
    }

    try {

      setLoading(true);

      const data = await verifyDegree(
        degreeHash.trim()
      );

      setResult(data);

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Unable to verify degree."
      );

    } finally {

      setLoading(false);

    }

  }


  async function copyHash() {

    try {

      await navigator.clipboard.writeText(
        degreeHash
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);

    } catch (err) {

      console.error(err);

    }

  }


  return (

    <div className="page verify-page">

      {/* HEADER */}

      <div className="page-header">

        <div className="page-header-icon">
          <Search size={25} />
        </div>

        <h1>
          Verify Degree
        </h1>

        <p>
          Check whether a degree exists on the
          blockchain and verify its authenticity.
        </p>

      </div>


      {/* SEARCH CARD */}

      <div className="verify-card">

        <div className="verify-card-title">

          <div className="verify-title-icon">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h2>
              Blockchain Verification
            </h2>

            <p>
              Enter the unique degree hash to
              verify the credential.
            </p>
          </div>

        </div>


        <form onSubmit={handleVerify}>

          <div className="verify-input-section">

            <label>
              Degree Hash
            </label>

            <div className="verify-input-wrapper">

              <input
                type="text"
                value={degreeHash}
                onChange={(e) =>
                  setDegreeHash(e.target.value)
                }
                placeholder="Enter degree hash..."
              />

              {degreeHash && (

                <button
                  type="button"
                  className="input-copy-button"
                  onClick={copyHash}
                  title="Copy hash"
                >
                  <Copy size={16} />
                </button>

              )}

            </div>

            {copied && (
              <span className="copied-message">
                Hash copied!
              </span>
            )}

          </div>


          <button
            type="submit"
            className="verify-button"
            disabled={loading}
          >

            {loading ? (

              <>
                <span className="spinner"></span>
                Checking Blockchain...
              </>

            ) : (

              <>
                <Search size={18} />
                Verify Degree
              </>

            )}

          </button>

        </form>


        {/* ERROR */}

        {error && (

          <div className="error-box">
            {error}
          </div>

        )}


        {/* VERIFIED */}

        {result && result.exists && (

          <div className="verification-result verified">

            <div className="verification-status">

              <div className="verification-status-icon">
                <ShieldCheck size={27} />
              </div>

              <div>

                <h2>
                  Degree Verified
                </h2>

                <p>
                  This credential exists on the
                  Ethereum blockchain.
                </p>

              </div>

            </div>


            <div className="verified-badge">
              <ShieldCheck size={15} />
              Authentic Blockchain Record
            </div>


            <div className="degree-details">

              <div className="detail-item">

                <span>
                  Student ID
                </span>

                <strong>
                  {result.studentId}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Student Name
                </span>

                <strong>
                  {result.studentName}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Degree Title
                </span>

                <strong>
                  {result.degreeTitle}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Issued On
                </span>

                <strong>
                  {new Date(
                    Number(result.issuedAt) * 1000
                  ).toLocaleString()}
                </strong>

              </div>

            </div>


            <div className="result-row">

              <span className="result-label">
                Degree Hash
              </span>

              <div className="result-value">

                <span>
                  {degreeHash}
                </span>

                <button
                  type="button"
                  className="copy-button"
                  onClick={copyHash}
                >
                  <Copy size={14} />
                </button>

              </div>

            </div>


            {result.ipfsCid && (

              <div className="result-links">

                <a
                  className="result-link"
                  href={`https://ipfs.io/ipfs/${result.ipfsCid}`}
                  target="_blank"
                  rel="noreferrer"
                >

                  <FileText size={15} />

                  View Certificate

                  <ExternalLink size={13} />

                </a>

              </div>

            )}

          </div>

        )}


        {/* NOT VERIFIED */}

        {result && !result.exists && (

          <div className="verification-result not-verified">

            <div className="verification-status">

              <div className="verification-status-icon">
                <XCircle size={27} />
              </div>

              <div>

                <h2>
                  Degree Not Verified
                </h2>

                <p>
                  No matching degree record was found
                  on the blockchain.
                </p>

              </div>

            </div>

            <div className="not-found-message">
              Please check the degree hash and try again.
            </div>

          </div>

        )}

      </div>

    </div>

  );

}


export default VerifyDegree;