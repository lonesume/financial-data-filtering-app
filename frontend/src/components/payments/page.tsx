import { useEffect, useState } from "react";
import { Statement, columns } from "./columns";
import { DataTable } from "./data-table";

const BASE_URL = "/api/fetch-data/";

export default function DemoPage() {
  const [data, setData] = useState([] as Statement[]);
  const [minRevenue, setMinRevenue] = useState("");
  const [maxRevenue, setMaxRevenue] = useState("");
  const [minNetIncome, setMinNetIncome] = useState("");
  const [maxNetIncome, setMaxNetIncome] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");

  const [url, setUrl] = useState(BASE_URL);

  function filterData() {
    const obj: Record<string, string> = {};
    if (minRevenue) {
      obj.minRevenue = minRevenue;
    }
    if (maxRevenue) {
      obj.maxRevenue = maxRevenue;
    }
    if (minNetIncome) {
      obj.minNetIncome = minNetIncome;
    }
    if (maxNetIncome) {
      obj.maxNetIncome = maxNetIncome;
    }
    if (minYear) {
      obj.minYear = minYear;
    }
    if (maxYear) {
      obj.maxYear = maxYear;
    }
    const params = new URLSearchParams(obj);
    const queryString = params.toString();
    console.log(`HEYY THIS is :${queryString}`);
    const newUrl = `${BASE_URL}?${queryString}`;

    fetch(newUrl)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
      });

    return newUrl;
  }

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
      });
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-10">
      <div>
        <input
          type="number"
          placeholder="Minimum Revenue"
          className="mt-10"
          value={minRevenue}
          onChange={(e) => {
            setMinRevenue(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Maximum Revenue"
          className="mt-10"
          value={maxRevenue}
          onChange={(e) => {
            setMaxRevenue(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Minimum Net Income"
          className="mt-10"
          value={minNetIncome}
          onChange={(e) => {
            setMinNetIncome(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Maximum Net Income"
          className="mt-10"
          value={maxNetIncome}
          onChange={(e) => {
            setMaxNetIncome(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Minimum Year"
          className="mt-10"
          value={minYear}
          onChange={(e) => {
            setMinYear(e.target.value);
          }}
        />

        <input
          type="number"
          placeholder="Maximum Year"
          className="mt-10"
          value={maxYear}
          onChange={(e) => {
            setMaxYear(e.target.value);
          }}
        />

        <button
          type="button"
          onClick={() => {
            filterData();
          }}
        >
          Filter Data{" "}
        </button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
