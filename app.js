const connectBtn = document.getElementById('connectBtn');
const disconnectBtn = document.getElementById('disconnectBtn');
const addressEl = document.getElementById('address');
const statusEl = document.getElementById('status');

const TESTNET_PASSPHRASE = 'Test SDF Network ; September 2015';

function setStatus(message) {
  statusEl.textContent = message;
}

function setConnectedState(address) {
  addressEl.textContent = address;
  disconnectBtn.disabled = false;
}

function setDisconnectedState() {
  addressEl.textContent = '-';
  disconnectBtn.disabled = true;
}

async function connectWallet() {
  try {
    if (!window.freighterApi) {
      setStatus('Freighter bulunamadı. Uzantıyı yükleyin.');
      return;
    }

    setStatus('Bağlantı isteği gönderiliyor...');

    const net = await window.freighterApi.getNetworkDetails();
    if (net.networkPassphrase !== TESTNET_PASSPHRASE) {
      setStatus('Lütfen Freighter ağını Testnet olarak değiştirin.');
      return;
    }

    const { address, error } = await window.freighterApi.requestAccess();
    if (error) {
      setStatus(`Bağlantı hatası: ${error}`);
      return;
    }

    setConnectedState(address);
    setStatus('Cüzdan başarıyla bağlandı.');
  } catch (err) {
    setStatus(`Beklenmeyen hata: ${err.message}`);
  }
}

function disconnectWallet() {
  setDisconnectedState();
  setStatus('Bağlantı yerel olarak temizlendi.');
}

connectBtn.addEventListener('click', connectWallet);
disconnectBtn.addEventListener('click', disconnectWallet);
