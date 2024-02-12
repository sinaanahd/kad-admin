import React, { useState, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import LittleLoading from "../../reusable/little-loading";
import convert_to_persian from "../../functions/convert-to-persian";
import split_in_three from "../../functions/spilit_in_three";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";
const ProdSaleDiagram = () => {
  const { accounting_payments, kelasses } = useContext(DataContext);
  const make_prod_based_digram = () => {
    const dates = [];
    const all_data = [];
    const paid_confirmed_payments = accounting_payments.filter(
      (p) =>
        p.paying_datetime &&
        p.is_payed &&
        p.manager_confirmation &&
        check_date(p.paying_datetime)
    );
    paid_confirmed_payments.forEach((p) => {
      const date = new Date(p.paying_datetime).toLocaleDateString("fa-ir");
      if (!dates.includes(date)) {
        const obj = {
          products: p.products_ids,
          sell_amount: Math.ceil(p.payment_amount),
          date: date,
        };
        dates.push(date);
        all_data.push(obj);
      } else {
        const data = all_data.find((d) => d.date === date);
        data.products = fill_prod_ids(data.products, p.products_ids);
        data.sell_amount += Math.ceil(p.payment_amount);
      }
    });
    all_data.forEach((item) => {
      item.products = fill_kelasses(item.products);
    });
    return all_data.reverse();
  };
  const check_date = (date) => {
    const base_date = 1707264080000;
    const entry_date_time_stamp = new Date(date).getTime();
    return base_date <= entry_date_time_stamp;
  };
  const fill_prod_ids = (base_arr, to_add) => {
    const final_arr = base_arr;
    const filtered_to_add = to_add.filter((id) => !base_arr.includes(id));
    filtered_to_add.forEach((id) => {
      base_arr.push(id);
    });
    return final_arr;
  };
  const fill_kelasses = (arr) => {
    const found_kelasses = kelasses.filter((k) => arr.includes(k.kelas_id));
    return found_kelasses;
  };
  const data =
    kelasses && accounting_payments ? make_prod_based_digram() : false;
  return (
    <div className="chart-container">
      <div className="sales-date-wrapper">
        {data ? (
          data.map((d, i) => (
            <div className="date-sale-wrapper" key={i++}>
              <span className="date-wrapper">
                <span className="date-label">تاریخ روز :</span>
                <span className="date-content">{d.date}</span>
              </span>
              <span className="prods-wrapper">
                {d.products.map((p) => (
                  <span key={p.kelas_id} className="prod-wrapper">
                    {p.kelas_title_and_ostad_name}
                  </span>
                ))}
              </span>
              <span className="day-sell-amount">
                <span className="date-label">فروش روز :</span>
                <span className="date-content">
                  {split_in_three(convert_to_persian(d.sell_amount))} تومان
                </span>
              </span>
            </div>
          ))
        ) : (
          <LittleLoading />
        )}
      </div>

      {/* <ResponsiveContainer width="100%" height={400}>
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis dataKey="amount" />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#57298A"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="unconfirmed_amount"
            stroke="#56298a2b"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer> */}
    </div>
  );
};

export default ProdSaleDiagram;
