import Router from '@/routes.tsx'
import { Modal } from '@/components/modal/Modal';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      {/* 예: 공통 레이아웃 넣기 */}
      {/* <Header /> */}
      <Modal />
      <Router />
      <Toaster/>
    </div>
  );
}

export default App;