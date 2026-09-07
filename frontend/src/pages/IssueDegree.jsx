import {
  useState
} from "react";

import {
  ShieldCheck
} from "lucide-react";

import {
  Upload,
  CheckCircle,
  Copy,
  ExternalLink,
  FileText,
  GraduationCap
} from "lucide-react";

import {
  uploadDegreePDF
} from "../services/backendService";

import {
  issueDegree
} from "../services/blockchainService";

function IssueDegree() {

  const [studentId, setStudentId] =
    useState("");

  const [studentName, setStudentName] =
    useState("");

  const [degreeTitle, setDegreeTitle] =
    useState("");

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const [degreeHash, setDegreeHash] =
    useState("");

  const [ipfsCid, setIpfsCid] =
    useState("");

  const [transactionHash, setTransactionHash] =
    useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");
    setSuccess(false);

    if (
      !studentId ||
      !studentName ||
      !degreeTitle ||
      !file
    ) {
      setError(
        "Please fill all fields and upload the PDF."
      );

      return;
    }

    if (
      file.type !==
      "application/pdf"
    ) {
      setError(
        "Only PDF files are allowed."
      );

      return;
    }

    try {

      setLoading(true);

      const backendResult =
        await uploadDegreePDF({
          studentId,
          studentName,
          degreeTitle,
          file
        });

      const generatedHash =
        backendResult.degreeHash;

      const generatedCid =
        backendResult.ipfsCid;

      if (!generatedHash) {
        throw new Error(
          "Backend did not return degreeHash."
        );
      }

      if (!generatedCid) {
        throw new Error(
          "Backend did not return ipfsCid."
        );
      }

      setDegreeHash(
        generatedHash
      );

      setIpfsCid(
        generatedCid
      );

      const blockchainResult =
        await issueDegree(
          studentId,
          studentName,
          degreeTitle,
          generatedHash,
          generatedCid
        );

      setTransactionHash(
        blockchainResult.transactionHash
      );

      setSuccess(true);

    } catch (err) {

      console.error(err);

      if (
        err.code ===
        "ACTION_REJECTED"
      ) {
        setError(
          "Transaction was rejected in MetaMask."
        );
      } else if (
        err.code ===
        "INSUFFICIENT_FUNDS"
      ) {
        setError(
          "Insufficient Sepolia ETH."
        );
      } else {
        setError(
          err.message ||
            "Failed to issue degree."
        );
      }

    } finally {
      setLoading(false);
    }
  }

  function copyHash() {
    navigator.clipboard.writeText(
      degreeHash
    );
  }

  return (
    <div className="page">

      <div className="page-heading">

        <div className="title-icon">
          <GraduationCap />
        </div>

        <div>
          <h1>
            Issue Degree
          </h1>

          <p>
            Upload a certificate and
            permanently record its
            verification data.
          </p>
        </div>

      </div>

      <div className="form-card">

        <form
          onSubmit={handleSubmit}
        >

          <div className="form-grid">

            <div className="form-group">

              <label>
                Student ID
              </label>

              <input
                type="text"
                placeholder="e.g. ST002"
                value={studentId}
                onChange={(e) =>
                  setStudentId(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>
                Student Name
              </label>

              <input
                type="text"
                placeholder="Enter student name"
                value={studentName}
                onChange={(e) =>
                  setStudentName(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          <div className="form-group">

            <label>
              Degree Title
            </label>

            <input
              type="text"
              placeholder="e.g. B.Sc. Information Technology"
              value={degreeTitle}
              onChange={(e) =>
                setDegreeTitle(
                  e.target.value
                )
              }
            />

          </div>

          <div className="form-group">

            <label>
              Certificate PDF
            </label>

            <label className="file-upload">

              <Upload size={30} />

              <span>
                {file
                  ? file.name
                  : "Click to upload certificate PDF"}
              </span>

              <small>
                PDF files only
              </small>

              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) =>
                  setFile(
                    e.target.files[0]
                  )
                }
              />

            </label>

          </div>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >

            {loading ? (
              "Processing..."
            ) : (
              <>
                <CheckCircle size={18} />
                Issue Degree
              </>
            )}

          </button>

        </form>

      </div>

      {success && (

        <div className="success-card">

          <div className="success-icon">
            <CheckCircle size={38} />
          </div>

          <h2>
            Degree Issued Successfully
          </h2>

          <p>
            The degree has been recorded
            on the blockchain.
          </p>

          <div className="result-row">

            <span>
              Degree Hash
            </span>

            <div className="hash-box">

              <code>
                {degreeHash}
              </code>

              <button
                onClick={copyHash}
                title="Copy hash"
              >
                <Copy size={16} />
              </button>

            </div>

          </div>

          <div className="result-row">

            <span>
              IPFS CID
            </span>

            <code>
              {ipfsCid}
            </code>

          </div>

          <div className="result-row">

            <span>
              Transaction
            </span>

            <a
              href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Etherscan
              <ExternalLink size={15} />
            </a>

          </div>

          <a
            className="certificate-button"
            href={`https://ipfs.io/ipfs/${ipfsCid}`}
            target="_blank"
            rel="noreferrer"
          >
            <FileText size={17} />
            View Certificate
          </a>

        </div>

      )}

    </div>
  );
}

export default IssueDegree;