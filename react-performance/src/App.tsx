/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/07 23:02:43 (GMT+0900)
 */
import { Routes, Route, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AuthProvider } from './components/Auth';
import { Demo1 } from './components/Demo1';
import { Demo2 } from './components/Demo2';
import { Demo3 } from './components/Demo3';
import { Demo4 } from './components/Demo4';
import { Demo5 } from './components/Demo5';
import { Demo6 } from './components/Demo6';
import { Demo7 } from './components/Demo7';
import { Demo8 } from './components/Demo8';
import appImg from './app.png';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/demo1" element={<Demo1 />} />
          <Route path="/demo2" element={<Demo2 />} />
          <Route path="/demo3" element={<Demo3 />} />
          <Route path="/demo4" element={<Demo4 />} />
          <Route path="/demo5" element={<Demo5 />} />
          <Route path="/demo6" element={<Demo6 />} />
          <Route path="/demo7" element={<Demo7 />} />
          <Route path="/demo8" element={<Demo8 />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function isCurrent(t: string, s: string): string {
  return t === s ? 'is-current-link' : '';
}

const paths = {
  Home: '/',
  Demo1: '/demo1',
  Demo2: '/demo2',
  Demo3: '/demo3',
  Demo4: '/demo4',
  Demo5: '/demo5',
  Demo6: '/demo6',
  Demo7: '/demo7',
  Demo8: '/demo8',
};

const links = Object.keys(paths).map((key) => {
  return {
    name: key,
    path: paths[key as keyof typeof paths],
  };
});

function Header() {
  const location = useLocation();
  // console.log(location);

  return (
    <section>
      {links.map((item) => (
        <Link
          to={item.path}
          key={item.path}
          className={isCurrent(item.path, location.pathname)}
        >
          {item.name}
        </Link>
      ))}
      /
      <a
        href="https://github.com/capricorncd/demos/tree/main/react-performance"
        target="_blank"
      >Github</a>
    </section>
  );
}

function Home() {
  return (
    <>
      <h1>Home</h1>
      <p>React performance optimization demo.</p>
      <p><img src={appImg} style={{ maxWidth: '100%' }} /></p>
    </>
  );
}

export default App;
