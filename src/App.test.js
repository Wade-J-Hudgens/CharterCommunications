import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { DataTable } from './components/data-table/data-table';

test ("App Renders", () => {
  render (<App />)
  expect(screen.getByTestId('App')).toBeInTheDocument()
})

test ("Transaction Info Renders", () => {
  render (<App />)
  expect(screen.getByTestId('TransactionInfo')).toBeInTheDocument()
})

test ("Data Table Renders", () => {
  render (<App />)
  expect(screen.getByTestId('DataTable')).toBeInTheDocument()
})

test ("Data Table Renders Columns Correctly", () => {
  render(<DataTable datasource={[]} columns={[
    {
      key: 'test1',
      label: 'Test1'
    },
    {
      key: 'test2',
      label: 'Test2'
    }
  ]} />)

  expect (screen.getByText('Test1')).toBeInTheDocument()
  expect (screen.getByText('Test2')).toBeInTheDocument()
})

test ("Data Table Renders Data Correctly", () => {
  render(<DataTable datasource={[
    {
      'test1': '4',
      'test2': '5'
    },
    {
      'test1': '6',
      'test2': '7'
    }
  ]} columns={[
    {
      key: 'test1',
      label: 'Test1'
    },
    {
      key: 'test2',
      label: 'Test2'
    }
  ]} />)

  expect (screen.getByText('4')).toBeInTheDocument()
  expect (screen.getByText('5')).toBeInTheDocument()
  expect (screen.getByText('6')).toBeInTheDocument()
  expect (screen.getByText('7')).toBeInTheDocument()
})