import './data-table.css'

export const DataTable = (props) => {
    const {datasource, columns} = props;
    return (
        <table className='DataTable' data-testid="DataTable">
            <thead>
                <DataTableHeader columns={columns} />
            </thead>
            <tbody>
                <DataTableData datasource={datasource} columns={columns} />
            </tbody>
        </table>
    )
}

const DataTableHeader = (props) => {
    const {columns} = props;
    return (
        <tr>
            {columns.map(column => <th key={column.key}>{column.label}</th>)}
        </tr>
    )
}
const DataTableData = (props) => {
    const {datasource, columns} = props;
    return (
        <>{datasource.map(source => <DataTableRow key={source.id} source={source} columns={columns} />)}</>
    )
}
const DataTableRow = (props) => {
    const {source, columns} = props;
    return (<tr>{
        columns.map(column => <td data-testid="DataTableData" key={`${source.id}_${column.key}`}>{column.Component ? <column.Component key={source.id} source={source} value={source[column.key]} /> : source[column.key].toString()}</td>)
    }</tr>)
}