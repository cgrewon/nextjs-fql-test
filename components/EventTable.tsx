import React from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { EventType } from "../types/EventType";
import LinearProgress from "@mui/material/LinearProgress";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { useEvent } from "../context/EventContext";
import { ValueFormatterParams } from "ag-grid-community";

export default function EventTable() {
  const gridRef = React.useRef(null);
  const { data, loading, error } = useEvent();

  if (loading) {
    return <LinearProgress color="success" />;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const events: EventType[] = data
    ? ((data as any).events.map((event: EventType) => ({
        ...event,
        id: parseInt(event.id),
      })) as EventType[])
    : [];

  const formatDate = (params: ValueFormatterParams) =>{
    return new Date(params.value).toLocaleDateString() ;
  }
  return (
    <div className="table-container mt-3">
      
      <div className="row mt-3">
        <div
          className="ag-theme-alpine "
          style={{ height: "calc(100vh - 250px)", width: "100%" }}
        >
          <AgGridReact ref={gridRef} rowData={events} rowSelection="multiple">
            <AgGridColumn
              field="id"
              width={100}
              sortable={true}
              filter={true}
              checkboxSelection={true}
            ></AgGridColumn>
            <AgGridColumn
              field="title"
              width={500}
              sortable={true}
              filter={true}
            ></AgGridColumn>
            <AgGridColumn
              field="value"
              width={100}
              sortable={true}
              filter={true}
            ></AgGridColumn>
            <AgGridColumn
              field="created_at"
              width={150}
              sortable={true}
              filter={true}
              valueFormatter={formatDate}
            ></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </div>
  );
}
