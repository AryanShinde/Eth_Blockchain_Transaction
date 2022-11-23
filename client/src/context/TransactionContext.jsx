import { createContext, useState } from 'react';
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
  return transactionContract;
};

const TransactionProvider = ({ children }) => {
  const [currAccount, setCurrAccount] = useState('');
  const [formData, setformData] = useState({});
  const [transactionCount, setTransactionCount] = useState(0);
  const [allTransaction, setAllTransaction] = useState([]);
  useEffect(() => {
    checkIfWalletIsConnected();
    getAllTransactions();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        return alert('Please install metamask');
      }
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      setCurrAccount(accounts[0]);

      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(parseInt(transactionCount));
    } catch (e) {}
  };

  const connectWallet = async () => {
    if (!ethereum) {
      return alert('Please install metamask');
    }
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    setCurrAccount(accounts[0]);
  };

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const getAllTransactions = async () => {
    const transactionContract = getEthereumContract();
    const allTransaction = await transactionContract.getAllTransactions();
    const parsedAllTransaction = allTransaction.map((transaction) => {
      return {
        from: transaction.from,
        to: transaction.receiver,
        amount: parseInt(transaction.amount._hex) / 10 ** 18,
        keyword: transaction.keyword,
        message: transaction.message,
      };
    });
    setAllTransaction(parsedAllTransaction);
    console.log(parsedAllTransaction);
  };

  const sendTransactionHandler = async () => {
    const { ToAddress, amount, keyword, message } = formData;
    const transactionContract = getEthereumContract();
    const parsedAmount = ethers.utils.parseEther(amount);
    console.log(formData, parsedAmount, currAccount);
    await ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: currAccount,
          to: ToAddress,
          gas: '0x5208',
          value: parsedAmount._hex,
        },
      ],
    });
    const transactionHash = await transactionContract.addToBlockchain(
      ToAddress,
      parsedAmount,
      message,
      keyword
    );
    console.log(transactionHash);
    console.log(`loading-${transactionHash.hash}`);
    await transactionHash.wait();
    console.log(`success-${transactionHash.hash}`);

    const transactionCount = await transactionContract.getTransactionCount();
    setTransactionCount(parseInt(transactionCount));
    getAllTransactions();
    console.log(`transaction count - ${transactionCount}`);
  };
  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currAccount,
        formData,
        handleChange,
        sendTransactionHandler,
        allTransaction,
        transactionCount,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
export default TransactionProvider;
