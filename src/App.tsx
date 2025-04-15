import Router from '@/routes.tsx'
import { Modal } from '@/components/modal/Modal';

function App() {
  return (
    <div>
      {/* 예: 공통 레이아웃 넣기 */}
      {/* <Header /> */}
      <Modal />
      <Router />
    </div>
  );
}

export default App;