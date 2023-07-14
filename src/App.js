import logo from './logo.svg';
import './App.css';
import { UserTransactionsDataTable } from './components/data-tables/user-transactions-data-table';
import { ProductsProvider } from './api/providers/products-provider';
import { UserProvider } from './api/providers/user-provider';
import { UserSelect } from './components/user-select/user-select';
import { TransactionInfo } from './components/transaction-info/transaction-info';

function App() {
  return (
    <div className="App" data-testid="App">
      <UserProvider>
        <ProductsProvider>
          <UserSelect />
          <div className='UserTransactions'>
            <UserTransactionsDataTable />
            <TransactionInfo />
          </div>
        </ProductsProvider>
      </UserProvider>
    </div>
  );
}

export default App;
