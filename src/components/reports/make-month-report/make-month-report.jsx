import React, { useState, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import LittleLoading from "../../reusable/little-loading";
import find_month from "../../functions/find-month";
import split_in_three from "../../functions/spilit_in_three";
import convert_to_persian from "../../functions/convert-to-persian";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
const MakeMonthReport = () => {
  const { accounting_payments } = useContext(DataContext);
  const [selected_months, set_selected_months] = useState([]);
  const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  const make_data = (e) => {
    const null_obj = {
      name: "  ",
      amount: 0,
    };
    // const reports = [null_obj];
    const reports = [];
    const payed = accounting_payments.filter(
      (p) => p.is_payed && p.paying_datetime && p.manager_confirmation
    );
    payed.forEach((p) => {
      const pay_date = new Date(p.paying_datetime).toLocaleDateString("fa-ir");
      const month_num = parseInt(p2e(pay_date.split("/")[1]));
      const month_name = find_month(month_num);
      const month_year_name = `${month_name} ${pay_date.split("/")[0]}`;
      const in_reports = reports.find((r) => r.name === month_year_name);
      if (in_reports) {
        in_reports.amount += p.payment_amount;
      } else {
        const obj = {
          name: month_year_name,
          amount: p.payment_amount,
        };
        reports.push(obj);
      }
    });
    // reports.push(null_obj);
    return reports;
  };
  const data = accounting_payments ? make_data() : [];
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">
            {`${label} : ${split_in_three(
              convert_to_persian(payload[0].payload.amount)
            )}`}{" "}
            تومان
          </p>
        </div>
      );
    }
    return null;
  };
  const CustomTooltip2 = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">
            {`${label} : ${payload[0].payload.persian_amount}`} تومان
          </p>
        </div>
      );
    }
    return null;
  };
  const handle_selected_months = (month) => {
    let old_selcted_months = [...selected_months];
    if (!old_selcted_months.includes(month)) {
      old_selcted_months.push(month);
    } else {
      const index = old_selcted_months.indexOf(month);
      old_selcted_months.splice(index, 1);
    }
    set_selected_months(old_selcted_months);
  };
  const make_seller_data = () => {
    const datas = [];
    const sellers = [];
    const new_accounting_data = [];
    accounting_payments.forEach((payment) => {
      if (!sellers.includes(payment.seller_name)) {
        sellers.push(payment.seller_name);
      }
      const pay_date = new Date(payment.paying_datetime).toLocaleDateString(
        "fa-ir"
      );
      const month_num = parseInt(p2e(pay_date.split("/")[1]));
      const month_name = find_month(month_num);
      const month_year_name = `${month_name} ${pay_date.split("/")[0]}`;
      const new_payment_obj = { ...payment, month_year_name: month_year_name };
      new_accounting_data.push(new_payment_obj);
    });
    sellers.forEach((s) => {
      const seller_payments = new_accounting_data.filter(
        (p) =>
          p.seller_name === s &&
          p.is_payed &&
          p.manager_confirmation &&
          selected_months.includes(p.month_year_name)
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
  const seller_datas =
    data && accounting_payments && selected_months.length !== 0
      ? make_seller_data()
      : [];
  return (
    <div className="get-full-detialed-month-report">
      <h2 className="section-title">گزارش ماهانه</h2>
      <div className="select-month-box-wrapper">
        <h3 className="month-box-title">ماه های فروش را انتخاب کنید : </h3>
        <div className="all-months-options">
          {data ? (
            data.map((d, i) => (
              <button
                key={i++}
                className={
                  selected_months.includes(d.name)
                    ? "month-option active"
                    : "month-option"
                }
                onClick={() => {
                  handle_selected_months(d.name);
                }}
              >
                {d.name}
              </button>
            ))
          ) : (
            <LittleLoading />
          )}
        </div>
      </div>
      {seller_datas.length !== 0 ? (
        <div className="all-reporst-digrams">
          <div className="sell-amount-diagram">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  width={600}
                  height={300}
                  data={data.filter((d) => selected_months.includes(d.name))}
                >
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis dataKey="amount" />
                  <Bar dataKey="amount" barSize={20} fill="#57298A" />
                  <Tooltip content={CustomTooltip} fill="#fff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="sellerr-amount-diagram">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart width={600} height={300} data={seller_datas}>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis dataKey="amount" />
                <Bar dataKey="amount" barSize={20} fill="#57298A" />
                <Tooltip content={CustomTooltip2} fill="#fff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MakeMonthReport;
