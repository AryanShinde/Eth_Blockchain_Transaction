import { createContext } from 'react';
import { ethers } from 'ethers';
export const TransactionContext = createContext();
import { contractABI, contractAddress } from '../utils/constants';
import { useEffect } from 'react';

const { ethereum } = window;
const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);

  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
};

const TransactionProvider = ({ children }) => {
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        return alert('Please install metamask');
      }
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      console.log(accounts);
    } catch (e) {}
  };

  const connectWallet = async () => {
    if (!ethereum) {
      return alert('Please install metamask');
    }
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet }}>
      {children}
    </TransactionContext.Provider>
  );
};
export default TransactionProvider;
