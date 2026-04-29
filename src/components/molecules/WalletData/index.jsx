import React from "react";
import { useAccount, useIsMounted } from "../../../hooks";
import { ConnectButton } from "../../atoms/ConnectButton";
import styles from "./style.module.css";

export function WalletData() {
  const mounted = useIsMounted();
  const account = useAccount();

  return (
    <>
      {mounted && account?.isConnected ? (
        <div className={styles.displayData}>
          <div className={styles.card}>{account.displayName}</div>
          <button onClick={account.disconnect}>Disconnect</button>
        </div>
      ) : (
        <ConnectButton label="Connect Wallet" />
      )}
    </>
  );
}
