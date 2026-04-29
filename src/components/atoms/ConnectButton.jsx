import React, { useState } from "react";
import { useAccount } from "../../hooks";

export function ConnectButton({ label = "Connect Wallet" }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const account = useAccount();

  async function onConnect() {
    setError("");
    setLoading(true);
    try {
      await account.connect();
    } catch (err) {
      setError(err.message || "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={onConnect} disabled={loading}>
        {loading ? "Connecting..." : label}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
