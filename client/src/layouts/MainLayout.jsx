import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
const MainLayout = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <div>
        <Outlet className="w-screen flex-1 p-5 overflow-y-auto" />
      </div>
    </div>
  );
};
export default MainLayout;
