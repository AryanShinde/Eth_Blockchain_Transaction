import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const Header = () => {
  const value = useContext(TransactionContext);
  return (
    <div className="bg-sky-400 h-10 flex items-center justify-center w-100">
      <h1>heloo header</h1>
    </div>
  );
};

export default Header;
