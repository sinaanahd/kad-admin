import React, { useContext, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";
import find_month from "../../functions/find-month";
import convert_to_persian from "../../functions/convert-to-persian";
import split_in_three from "../../functions/spilit_in_three";
import { DataContext } from "../../context/DataContext";
const MonthlyDiagram = () => {
  const { accounting_payments } = useContext(DataContext);
  const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  const make_data = (e) => {
    const null_obj = {
      name: "  ",
      amount: 0,
      unconfirmed_amount: 0,
    };
    const reports = [null_obj];
    // const payed = accounting_payments.filter(
    //   (p) => p.is_payed && p.paying_datetime && p.manager_confirmation
    // );
    const all_kind = accounting_payments.filter(
      (p) => p.is_payed && p.paying_datetime
    );
    all_kind.forEach((p) => {
      const pay_date = new Date(p.paying_datetime).toLocaleDateString("fa-ir");
      const month_num = parseInt(p2e(pay_date.split("/")[1]));
      const month_name = find_month(month_num);
      const month_year_name = `${month_name} ${pay_date.split("/")[0]}`;
      const in_reports = reports.find((r) => r.name === month_year_name);
      if (p.manager_confirmation) {
        if (in_reports) {
          in_reports.amount += p.payment_amount;
          in_reports.unconfirmed_amount += p.payment_amount;
        } else {
          const obj = {
            name: month_year_name,
            amount: p.payment_amount,
            unconfirmed_amount: p.payment_amount,
          };
          reports.push(obj);
        }
      } else {
        if (in_reports) {
          // in_reports.amount += p.payment_amount;
          in_reports.unconfirmed_amount += p.payment_amount;
        } else {
          const obj = {
            name: month_year_name,
            amount: 0,
            unconfirmed_amount: p.payment_amount,
          };
          reports.push(obj);
        }
      }
    });
    reports.push(null_obj);
    return reports.reverse();
  };
  const data = accounting_payments ? make_data() : [];
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">
            {`تایید شده - ${label} : ${split_in_three(
              convert_to_persian(payload[0].payload.amount)
            )}`}{" "}
            تومان
          </p>
          <p className="label">
            {`تمام فروش  - ${label} : ${split_in_three(
              convert_to_persian(payload[0].payload.unconfirmed_amount)
            )}`}{" "}
            تومان
          </p>
        </div>
      );
    }

    return null;
  };
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
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
          <Tooltip fill="#fff" content={CustomTooltip} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyDiagram;
