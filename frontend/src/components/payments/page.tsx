import { useEffect, useState } from "react";
import { Payment, Statement, columns } from "./columns";
import { DataTable } from "./data-table";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // Add more rows as needed
//   ];
// }

export default function DemoPage() {
  const oldData: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed5",
      amount: 100,
      status: "pending",
      email: "lebron@goat.com",
    },
    // Add more rows as needed
  ];
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
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
