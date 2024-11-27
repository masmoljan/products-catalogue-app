import './App.css';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';

function App() {

  return (
    <div className='min-h-dvh min-w-full bg-stone-50'>
      <Navigation />
      <Dashboard />
    </div>
  );
}

export default App;
