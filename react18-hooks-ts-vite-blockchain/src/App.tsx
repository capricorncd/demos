/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/07 23:02:43 (GMT+0900)
 */
import { HomeOutlined } from '@ant-design/icons';
import { Button, PageHeader, Layout as AntLayout } from 'antd';
import { useState } from 'react';
import {
  Routes,
  Route,
  Outlet,
  useNavigate,
  Link,
} from 'react-router-dom';
import { AuthProvider, AuthStatus, RequireAuth } from './components/Auth';
import { Blockchain } from './components/Blockchain';
import { LoginPage } from './components/Login';

const { Content, Footer } = AntLayout;

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Blockchain" element={<Blockchain />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function ProtectedPage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>Protected Page</h2>

      <Button onClick={() => setCount((count) => count + 1)}>
        count is: {count}
      </Button>
    </>
  );
}

function Layout() {
  const navigate = useNavigate();

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <PageHeader
        ghost={false}
        title="React18 Hooks Typescript Vite"
        subTitle="Ant Design"
        extra={[
          // 不用Link，AuthProvider的数据会丢失
          // AuthProvider status will be lost when don't use Link
          <Link key="protected" to="/protected">
            <Button>Protected Page</Button>
          </Link>,
          <Link key="blockchain" to="/blockchain">
            <Button type="primary">Blockchain</Button>
          </Link>,
        ]}
        backIcon={<HomeOutlined />}
        onBack={() => navigate('/')}
      ></PageHeader>
      <Content style={{ padding: '24px' }}>
        <AuthStatus />
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ©2022 Created by{' '}
        <Button
          type="link"
          href="https://github.com/capricorncd"
          target="_blank"
          style={{ padding: 0 }}
        >
          Capricorncd
        </Button>
        .
      </Footer>
    </AntLayout>
  );
}

function Home() {
  return (
    <main>
      <h2>Welcome to the homepage!</h2>
      <p style={{ textAlign: 'center' }}>
        <img
          src="https://source.unsplash.com/random"
          className="App-logo"
          alt="logo"
          style={{ maxWidth: '100%' }}
        />
      </p>
    </main>
  );
}

export default App;
