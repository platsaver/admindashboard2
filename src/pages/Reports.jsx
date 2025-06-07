import React, { useEffect, useRef } from 'react';
import { Row, Col, Card, Statistic, Table, Avatar, Typography, Tag } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  ShopOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { Chart as ChartJS, registerables } from 'chart.js';

// Đăng ký tất cả các thành phần Chart.js cần thiết
ChartJS.register(...registerables);

const { Title, Text } = Typography;

const CarbonDashboard = () => {
  const lineChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const bubbleChartRef = useRef(null);
  const mixedChartRef = useRef(null);

  // Khởi tạo các biểu đồ
  useEffect(() => {
    let lineChart = null;
    let doughnutChart = null;
    let bubbleChart = null;
    let mixedChart = null;

    // Line Chart - Lượt truy cập
    if (lineChartRef.current) {
      lineChart = new ChartJS(lineChartRef.current, {
        type: 'line',
        data: {
          labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
          datasets: [
            {
              label: 'Lượt truy cập',
              data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
              borderColor: '#5B8DEF',
              backgroundColor: 'rgba(91, 141, 239, 0.1)',
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#5B8DEF',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }

    // Doughnut Chart - Tỷ lệ chuyển đổi
    if (doughnutChartRef.current) {
      doughnutChart = new ChartJS(doughnutChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Chuyển đổi', 'Không chuyển đổi'],
          datasets: [
            {
              data: [25, 75],
              backgroundColor: ['#52C41A', '#F5F5F5'],
              borderWidth: 0,
              cutout: '70%',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    }

    // Bubble Chart - Số lượng tín chỉ mua/bán
    if (bubbleChartRef.current) {
      bubbleChart = new ChartJS(bubbleChartRef.current, {
        type: 'bubble',
        data: {
          datasets: [
            {
              label: 'Mua tín chỉ',
              data: [
                { x: 20, y: 30, r: 15 },
                { x: 40, y: 10, r: 10 },
                { x: 60, y: 50, r: 20 },
                { x: 80, y: 40, r: 12 },
                { x: 100, y: 20, r: 8 },
              ],
              backgroundColor: 'rgba(82, 196, 26, 0.6)',
              borderColor: '#52C41A',
            },
            {
              label: 'Bán tín chỉ',
              data: [
                { x: 25, y: 25, r: 12 },
                { x: 45, y: 35, r: 18 },
                { x: 65, y: 15, r: 8 },
                { x: 85, y: 45, r: 14 },
                { x: 95, y: 35, r: 10 },
              ],
              backgroundColor: 'rgba(255, 107, 129, 0.6)',
              borderColor: '#FF6B81',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Thời gian (ngày)',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Số lượng giao dịch',
              },
            },
          },
        },
      });
    }

    // Mixed Chart - Giá tín chỉ carbon
    if (mixedChartRef.current) {
      mixedChart = new ChartJS(mixedChartRef.current, {
        type: 'bar',
        data: {
          labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
          datasets: [
            {
              type: 'line',
              label: 'Giá trung bình',
              data: [45, 50, 48, 52, 55, 53],
              borderColor: '#FF6B81',
              backgroundColor: 'transparent',
              tension: 0.4,
              yAxisID: 'y1',
            },
            {
              type: 'bar',
              label: 'Khối lượng giao dịch',
              data: [120, 190, 300, 500, 200, 300],
              backgroundColor: 'rgba(91, 141, 239, 0.8)',
              yAxisID: 'y',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Khối lượng',
              },
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'Giá ($)',
              },
              grid: {
                drawOnChartArea: false,
              },
            },
          },
        },
      });
    }

    // Cleanup
    return () => {
      lineChart?.destroy();
      doughnutChart?.destroy();
      bubbleChart?.destroy();
      mixedChart?.destroy();
    };
  }, []);

  // Dữ liệu cho bảng giao dịch
  const transactionColumns = [
    {
      title: 'NGƯỜI GIAO DỊCH',
      dataIndex: 'trader',
      key: 'trader',
      width: '35%',
    },
    {
      title: 'LOẠI',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'SỐ LƯỢNG',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'GIÁ',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'TRẠNG THÁI',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const transactionData = [
    {
      key: '1',
      trader: (
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#87d068' }}
          />
          <div className="avatar-info">
            <Title level={5}>Nguyễn Văn An</Title>
            <Text>Cá nhân</Text>
          </div>
        </Avatar.Group>
      ),
      type: <Tag color="green">MUA</Tag>,
      amount: <Text strong>500 tín chỉ</Text>,
      price: <Text strong>$25,000</Text>,
      status: <Tag color="success">Hoàn thành</Tag>,
    },
    {
      key: '2',
      trader: (
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            icon={<ShopOutlined />}
            style={{ backgroundColor: '#1890ff' }}
          />
          <div className="avatar-info">
            <Title level={5}>Công ty ABC</Title>
            <Text>Doanh nghiệp</Text>
          </div>
        </Avatar.Group>
      ),
      type: <Tag color="red">BÁN</Tag>,
      amount: <Text strong>1,200 tín chỉ</Text>,
      price: <Text strong>$60,000</Text>,
      status: <Tag color="processing">Đang xử lý</Tag>,
    },
    {
      key: '3',
      trader: (
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            icon={<BankOutlined />}
            style={{ backgroundColor: '#722ed1' }}
          />
          <div className="avatar-info">
            <Title level={5}>Tổ chức Xanh</Title>
            <Text>Tổ chức</Text>
          </div>
        </Avatar.Group>
      ),
      type: <Tag color="green">MUA</Tag>,
      amount: <Text strong>800 tín chỉ</Text>,
      price: <Text strong>$40,000</Text>,
      status: <Tag color="success">Hoàn thành</Tag>,
    },
    {
      key: '4',
      trader: (
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#f56a00' }}
          />
          <div className="avatar-info">
            <Title level={5}>Trần Thị Bình</Title>
            <Text>Cá nhân</Text>
          </div>
        </Avatar.Group>
      ),
      type: <Tag color="red">BÁN</Tag>,
      amount: <Text strong>300 tín chỉ</Text>,
      price: <Text strong>$15,000</Text>,
      status: <Tag color="error">Đã hủy</Tag>,
    },
  ];

  return (
    <div className="carbon-dashboard">
      <Row gutter={[24, 24]}>
        {/* Thống kê tổng quan */}
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng lượt truy cập"
              value={45289}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
            <Text type="secondary">+12% so với tháng trước</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tỷ lệ chuyển đổi"
              value={25.3}
              precision={1}
              valueStyle={{ color: '#52c41a' }}
              suffix="%"
            />
            <Text type="secondary">+5% so với tháng trước</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Thời gian TB trên trang"
              value={342}
              precision={0}
              valueStyle={{ color: '#1890ff' }}
              suffix="s"
            />
            <Text type="secondary">+23s so với tháng trước</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Giá tín chỉ hiện tại"
              value={53.2}
              precision={1}
              valueStyle={{ color: '#cf1322' }}
              prefix="$"
              suffix="/tín chỉ"
            />
            <Text type="secondary">-2% so với hôm qua</Text>
          </Card>
        </Col>

        {/* Biểu đồ lượt truy cập */}
        <Col xs={24} lg={12}>
          <Card title="Lượt truy cập theo tuần">
            <div style={{ height: 300 }}>
              <canvas ref={lineChartRef} />
            </div>
          </Card>
        </Col>

        {/* Biểu đồ tỷ lệ chuyển đổi */}
        <Col xs={24} lg={12}>
          <Card title="Tỷ lệ chuyển đổi">
            <div style={{ height: 300 }}>
              <canvas ref={doughnutChartRef} />
            </div>
            <div className="text-center mt-4">
              <Title level={3}>25%</Title>
              <Text type="secondary">Tỷ lệ chuyển đổi trung bình</Text>
            </div>
          </Card>
        </Col>

        {/* Biểu đồ bubble - Giao dịch tín chỉ */}
        <Col xs={24} lg={12}>
          <Card title="Giao dịch tín chỉ theo thời gian">
            <div style={{ height: 350 }}>
              <canvas ref={bubbleChartRef} />
            </div>
          </Card>
        </Col>

        {/* Biểu đồ mixed - Giá tín chỉ */}
        <Col xs={24} lg={12}>
          <Card title="Xu hướng giá và khối lượng">
            <div style={{ height: 350 }}>
              <canvas ref={mixedChartRef} />
            </div>
          </Card>
        </Col>

        {/* Bảng giao dịch */}
        <Col xs={24}>
          <Card title="Giao dịch tín chỉ carbon gần đây">
            <Table
              columns={transactionColumns}
              dataSource={transactionData}
              pagination={false}
              className="ant-border-space"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CarbonDashboard;