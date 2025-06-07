import {
  Row,
  Col,
  Card,
  Table,
  Select,
  DatePicker,
  Button,
  Space,
  Progress,
  Typography,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const columns = [
  {
    title: "CHỈ SỐ",
    dataIndex: "name",
    key: "name",
    width: "30%",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "NHÓM",
    dataIndex: "group",
    key: "group",
    filters: [
      { text: "Chất lượng", value: "Chất lượng" },
      { text: "Tốc độ", value: "Tốc độ" },
      { text: "Hiệu suất", value: "Hiệu suất" },
    ],
    onFilter: (value, record) => record.group === value,
  },
  {
    title: "GIÁ TRỊ",
    dataIndex: "value",
    key: "value",
    sorter: (a, b) => a.value - b.value,
  },
  {
    title: "TIÊU CHUẨN",
    dataIndex: "target",
    key: "target",
  },
];

const data = [
  {
    key: "1",
    name: "Tỷ lệ lỗi sản phẩm",
    group: "Chất lượng",
    value: 2.5,
    target: 3.0,
  },
  {
    key: "2",
    name: "Thời gian giao hàng",
    group: "Tốc độ",
    value: 4.2,
    target: 5.0,
  },
  {
    key: "3",
    name: "Hiệu suất máy móc",
    group: "Hiệu suất",
    value: 85,
    target: 90,
  },
  {
    key: "4",
    name: "Tỷ lệ hoàn thành đơn hàng",
    group: "Hiệu suất",
    value: 95,
    target: 98,
  },
];

const trendData = [
  { date: "2025-01", value: 2.8 },
  { date: "2025-02", value: 2.6 },
  { date: "2025-03", value: 2.5 },
  { date: "2025-04", value: 2.4 },
  { date: "2025-05", value: 2.3 },
];

const pieData = [
  { name: "Chất lượng", value: 40 },
  { name: "Tốc độ", value: 30 },
  { name: "Hiệu suất", value: 30 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

function Metrics() {
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [dateRange, setDateRange] = useState([
    moment().subtract(30, "days"),
    moment(),
  ]);

  const handleGroupChange = (value) => {
    setSelectedGroup(value);
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const filteredData = data.filter(
    (item) => selectedGroup === "all" || item.group === selectedGroup
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Metrics");
    XLSX.writeFile(workbook, "metrics_report.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Báo cáo Bộ Chỉ Số", 10, 10);
    doc.autoTable({
      head: [["Chỉ số", "Nhóm", "Giá trị", "Tiêu chuẩn"]],
      body: filteredData.map((item) => [
        item.name,
        item.group,
        item.value,
        item.target,
      ]),
    });
    doc.save("metrics_report.pdf");
  };

  // ApexCharts Pie Chart configuration
  const pieChartOptions = {
    chart: {
      type: "pie",
      height: 200,
    },
    labels: pieData.map((item) => item.name),
    colors: COLORS,
    legend: {
      position: "right",
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      enabled: true,
    },
  };

  const pieChartSeries = pieData.map((item) => item.value);

  // ApexCharts Line Chart configuration
  const lineChartOptions = {
    chart: {
      type: "line",
      height: 300,
    },
    series: [
      {
        name: "Tỷ lệ lỗi sản phẩm",
        data: trendData.map((item) => item.value),
      },
    ],
    xaxis: {
      categories: trendData.map((item) => item.date),
    },
    stroke: {
      curve: "smooth",
      colors: ["#8884d8"],
    },
    tooltip: {
      enabled: true,
    },
    legend: {
      position: "top",
    },
  };

  return (
    <div className="metrics">
      <Row gutter={[24, 24]}>
        {/* Bảng chỉ số - 1/2 */}
        <Col xs={24} md={12}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            extra={
              <Space>
                <Select
                  defaultValue="all"
                  style={{ width: 120 }}
                  onChange={handleGroupChange}
                  options={[
                    { value: "all", label: "Tất cả" },
                    { value: "Chất lượng", label: "Chất lượng" },
                    { value: "Tốc độ", label: "Tốc độ" },
                    { value: "Hiệu suất", label: "Hiệu suất" },
                  ]}
                />
                <RangePicker
                  defaultValue={dateRange}
                  onChange={handleDateChange}
                />
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={exportToExcel}
                >
                  Excel
                </Button>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={exportToPDF}
                >
                  PDF
                </Button>
              </Space>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={filteredData}
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>

        {/* Biểu đồ trực quan - 1/4 */}
        <Col xs={24} md={6}>
          <Card className="criclebox mb-24" title="Phân bố Chỉ Số">
            <div id="chart">
              <ReactApexChart
                className="chart-visitor"
                options={pieChartOptions}
                series={pieChartSeries}
                type="pie"
                height={200}
              />
            </div>
          </Card>
        </Col>

        {/* Mức độ hoàn thành - 1/4 */}
        <Col xs={24} md={6}>
          <Card className="criclebox mb-24" title="Mức Độ Hoàn Thành">
            {filteredData.map((item) => (
              <div key={item.key} style={{ marginBottom: 16 }}>
                <Title level={5}>{item.name}</Title>
                <Progress
                  percent={((item.value / item.target) * 100).toFixed(0)}
                  status={item.value >= item.target ? "success" : "normal"}
                />
              </div>
            ))}
          </Card>
        </Col>

        {/* Xu hướng - 2/3 */}
        <Col xs={24} md={16}>
          <Card className="criclebox mb-24" title="Xu Hướng">
            <div id="chart">
              <ReactApexChart
                className="chart-visitor"
                options={lineChartOptions}
                series={lineChartOptions.series}
                type="line"
                height={300}
              />
            </div>
            <div className="chart-vistior">
              <Paragraph className="lastweek">
                Tỷ lệ lỗi sản phẩm giảm <span className="bnb2">-10%</span> so với tháng trước
              </Paragraph>
            </div>
          </Card>
        </Col>

        {/* Dự báo - 1/3 */}
        <Col xs={24} md={8}>
          <Card className="criclebox mb-24" title="Dự Báo">
            <Paragraph>
              Xu hướng giảm nhẹ trong chỉ số "Tỷ lệ lỗi sản phẩm" dự kiến tiếp tục
              trong 3 tháng tới. Cần tăng cường kiểm soát chất lượng.
            </Paragraph>
            <Paragraph>
              Hiệu suất máy móc dự kiến đạt 88% vào tháng 6/2025 nếu duy trì bảo trì
              định kỳ.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Metrics;