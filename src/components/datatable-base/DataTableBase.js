import DataTable from 'react-data-table-component';
function DataTableBase(props) {
    return <DataTable
        columns={props.columns}
        data={props.data}
        pagination={true}
        pointerOnHover={true}
        highlightOnHover={true}
        responsive={true}
        fixedHeader={true}
        fixedHeaderScrollHeight={'65vh'}
    />
}

export default DataTableBase