import './App.css'
import viteLogo from '/vite.svg'

function App() {
  return (
    <>
      <div className="flex w-[500px] justify-between">
        <div>User</div>
        <div className="flex">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <p>
            <span className="text-red-400">Bạn</span> bè
          </p>
        </div>
        <div>Chat</div>
      </div>
    </>
  )
}

export default App
