/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/08/09 20:02:43 (GMT+0900)
 */
import { Space, Alert, Statistic } from 'antd';
import { useBlockchain } from './context';

export function Head() {
  const store = useBlockchain();

  if (!store) return null;

  return (
    <Space
      direction="vertical"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Space size="large">
        <Statistic
          title="Transactions that are not on the chain"
          value={store.transactions.length}
        />
        <Statistic
          title="Transactions that have been on the chain"
          value={store.blocks.length}
        />
      </Space>
      <Alert
        message={`Transaction is ${store.isValid ? 'normal' : 'abnormal'}`}
        type={store.isValid ? 'success' : 'error'}
        showIcon
      />
    </Space>
  );
}
