import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import SendTransaction from './SendTransaction';

const MainBody = () => {
  const {
    connectWallet,
    currAccount,
    handleChange,
    formData,
    sendTransactionHandler,
    transactionCount,
    allTransaction,
  } = useContext(TransactionContext);
  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col items-center  pt-4">
      {!currAccount ? (
        <button
          className="border-none p-5 bg-blue-200 rounded-lg hover:rounded-md"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : (
        <h1> Your account id: {currAccount}</h1>
      )}
      <SendTransaction
        handleChange={handleChange}
        formData={formData}
        sendTransactionHandler={sendTransactionHandler}
      />

      <h1 className="mt-2">Transaction count: {transactionCount}</h1>
      <div className="flex w-10/12 h-auto flex-wrap justify-center items-center">
        {allTransaction.map((transaction) => {
          return (
            <div className="w-auto h-auto m-2 p-4 flex flex-col bg-[#73C2FB] drop-shadow-xl rounded-lg">
              <h1>Receiver: {transaction.to}</h1>
              <h1>amounr: {transaction.amount}</h1>
              <h1>keyword: {transaction.keyword}</h1>
              <h1>message :{transaction.message}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainBody;
