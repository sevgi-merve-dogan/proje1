import { useEffect, useState } from "react";

const TESTNET_PASSPHRASE = "Test SDF Network ; September 2015";

export function useIsMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export function useAccount() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("stellar_wallet_address");
    if (saved) {
      setAccount({ address: saved, displayName: shortenAddress(saved) });
    }
  }, []);

  async function connect() {
    if (!window.freighterApi) {
      throw new Error("Freighter extension not found");
    }

    const networkDetails = await window.freighterApi.getNetworkDetails();
    if (networkDetails.networkPassphrase !== TESTNET_PASSPHRASE) {
      throw new Error("Please switch Freighter to Testnet");
    }

    const { address, error } = await window.freighterApi.requestAccess();
    if (error) {
      throw new Error(error);
    }

    window.localStorage.setItem("stellar_wallet_address", address);
    setAccount({ address, displayName: shortenAddress(address) });
  }

  function disconnect() {
    window.localStorage.removeItem("stellar_wallet_address");
    setAccount(null);
  }

  return {
    ...account,
    connect,
    disconnect,
    isConnected: Boolean(account),
  };
}

function shortenAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
