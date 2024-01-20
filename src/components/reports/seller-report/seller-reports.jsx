import React, { useContext, useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import convert_to_persian from "../../functions/convert-to-persian";
import split_in_three from "../../functions/spilit_in_three";
import { DataContext } from "../../context/DataContext";
const SellersReport = () => {
  const { accounting_payments } = useContext(DataContext);
  const make_data = () => {
    const datas = [];
    const sellers = [];
    accounting_payments.forEach((payment) => {
      if (
        !sellers.includes(payment.seller_name) &&
        payment.seller_name !== "-" &&
        payment.seller_name !== "سایت"
      ) {
        sellers.push(payment.seller_name);
      }
    });
    sellers.forEach((s) => {
      const seller_payments = accounting_payments.filter(
        (p) => p.seller_name === s && p.is_payed && p.manager_confirmation
      );
      let sum = 0;
      let selled_products = 0;
      seller_payments.forEach((p) => {
        sum += p.payment_amount;
        selled_products += p.products_ids.length;
      });
      const data = {
        name: s,
        amount: sum / 1000000,
        product_counts: selled_products,
        persian_amount: split_in_three(convert_to_persian(sum)),
      };
      datas.push(data);
    });
    return datas;
  };
  const pay_datas = accounting_payments ? make_data() : false;
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">
            {`${label} : ${payload[0].payload.persian_amount}`} تومان
          </p>
          <span className="sold-prods">
            محصول فروخته شده :{" "}
            {convert_to_persian(payload[0].payload.product_counts)}
          </span>
        </div>
      );
    }

    return null;
  };
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart width={600} height={300} data={pay_datas}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis dataKey="amount" />
          <Bar dataKey="amount" barSize={20} fill="#57298A" />
          <Tooltip content={CustomTooltip} fill="#fff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SellersReport;
