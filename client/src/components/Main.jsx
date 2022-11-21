import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const MainBody = () => {
  const data = useContext(TransactionContext);
  console.log(data);
  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col items-center  pt-4">
      <button
        className="border-none p-5 bg-blue-200 rounded-lg hover:rounded-md"
        onClick={data.connectWallet}
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default MainBody;
