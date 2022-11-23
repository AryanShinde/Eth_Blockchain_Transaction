const SendTransaction = ({
  handleChange,
  formData,
  sendTransactionHandler,
}) => {
  const handleSubmit = () => {
    sendTransactionHandler();
  };
  return (
    <div className="bg-[#23395d] md:w-3/12 sm:w-full  h-auto p-5 drop-shadow-2xl flex flex-col [&>*]:m-2 [&>*]:rounded-sm [&>*]:p-2 [&>*]:w-100 rounded-lg mt-10">
      <input
        name="ToAddress"
        type="text"
        placeholder="Reciever Account address"
        onChange={handleChange}
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        onChange={handleChange}
      />
      <input
        name="keyword"
        type="text"
        placeholder="keyword"
        onChange={handleChange}
      />
      <input
        name="message"
        type="text"
        placeholder="message"
        onChange={handleChange}
      />
      <hr />

      <button
        onClick={handleSubmit}
        className="text-white border-2 hover:bg-white hover:text-black ease-in-out duration-300"
      >
        Send now
      </button>
    </div>
  );
};

export default SendTransaction;
