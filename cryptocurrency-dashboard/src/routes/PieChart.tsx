import ApexChart from "react-apexcharts";
import "../styles/piechart.css";

function PieChart() {
  const pieChart: any = {
    series: [44, 55, 13, 33],
    chart: {
      width: 380,
      type: "donut",
    },

    breakpoint: 480,
    options: {
      chart: {
        width: 200,
      },
      legend: {
        show: true,
      },
      labels: ["PLA", "SAND", "XRP", "ADA"],
    },
    legend: {
      position: "right",
      offsetY: 0,
      height: 230,
    },
  };

  return (
    <div className="piechart">
      <ApexChart type="donut" height={300} {...pieChart} />
    </div>
  );
}

export default PieChart;
