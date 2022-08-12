/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/07 23:02:43 (GMT+0900)
 */
import { UserOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Auth';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || '/';

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;

    auth.signIn(username, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <Input.Group compact style={{ width: '300px', maxWidth: '100%' }}>
          <Input
            placeholder="Please enter any string"
            name="username"
            prefix={<UserOutlined />}
            defaultValue="capricorncd"
            style={{ width: 'calc(100% - 80px)' }}
          />
          <Button type="primary" htmlType="submit" style={{ width: '80px' }}>
            Login
          </Button>
        </Input.Group>
      </form>
    </div>
  );
}
