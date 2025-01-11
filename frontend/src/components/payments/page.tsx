import { useEffect, useState } from "react";
import { Statement, columns } from "./columns";
import { DataTable } from "./data-table";

export default function DemoPage() {
  const [data, setData] = useState([] as Statement[]);

  const URL = "/api/fetch-data";
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
      });
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
