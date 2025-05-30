import { Card, Row, Col, Statistic, Table, Button, Avatar, Typography, Tag, List } from 'antd';
import 'antd/dist/reset.css';

const { Title, Text } = Typography;

const Dashboard = () => {

  const summaryData = {
    systemStatus: 'Ổn định',
    uptime: '99.9%',
    tasksCompleted: 45,
    tasksInProgress: 12,
  };

  const notifications = [
    {
      key: '1',
      message: (
        <>
          <Avatar.Group>
            <div className="avatar-info">
              <Title level={5}>Hệ thống bảo trì</Title>
              <p>Hệ thống bảo trì dự kiến: 02/06/2025, 2AM-4AM</p>
            </div>
          </Avatar.Group>
        </>
      ),
      type: (
        <>
          <Button type="primary" className="tag-primary">INFO</Button>
        </>
      ),
      action: (
        <>
          <div className="ant-employed">
            <a href="#pablo">View</a>
          </div>
        </>
      ),
    },
    {
      key: '2',
      message: (
        <>
          <Avatar.Group>
            <div className="avatar-info">
              <Title level={5}>Lỗi API</Title>
              <p>Lỗi API phát hiện ở module thanh toán</p>
            </div>
          </Avatar.Group>
        </>
      ),
      type: (
        <>
          <Button className="tag-badge">ERROR</Button>
        </>
      ),
      action: (
        <>
          <div className="ant-employed">
            <a href="#pablo">View</a>
          </div>
        </>
      ),
    },
    {
      key: '3',
      message: (
        <>
          <Avatar.Group>
            <div className="avatar-info">
              <Title level={5}>Cập nhật phiên bản</Title>
              <p>Cập nhật phiên bản mới v2.1.3</p>
            </div>
          </Avatar.Group>
        </>
      ),
      type: (
        <>
          <Button type="primary" className="tag-primary">SUCCESS</Button>
        </>
      ),
      action: (
        <>
          <div className="ant-employed">
            <a href="#pablo">View</a>
          </div>
        </>
      ),
    },
  ];

  const notificationColumns = [
    {
      title: 'THÔNG BÁO',
      dataIndex: 'message',
      key: 'message',
      width: '60%',
    },
    {
      title: 'LOẠI',
      dataIndex: 'type',
      key: 'type',
      width: '20%',
    },
    {
      title: 'HÀNH ĐỘNG',
      dataIndex: 'action',
      key: 'action',
      width: '20%',
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Cao':
        return 'red';
      case 'Trung bình':
        return 'yellow';
      case 'Thấp':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Row gutter={[24, 24]} className="mb-8">
        <Col span={12}>
          <Card
            title={<Title level={4} className="text-gray-800">Tóm tắt tình hình</Title>}
            className="shadow-lg rounded-lg bg-white"
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title={<Text strong>Trạng thái hệ thống</Text>}
                  value={summaryData.systemStatus}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title={<Text strong>Thời gian hoạt động</Text>}
                  value={summaryData.uptime}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title={<Text strong>Nhiệm vụ hoàn thành</Text>}
                  value={summaryData.tasksCompleted}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title={<Text strong>Nhiệm vụ đang thực hiện</Text>}
                  value={summaryData.tasksInProgress}
                  valueStyle={{ color: '#fa8c16' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={<Title level={4} className="text-gray-800">Thông báo quan trọng</Title>}
            className="criclebox tablespace mb-24"
          >
            <div className="table-responsive">
              <Table
                columns={notificationColumns}
                dataSource={notifications}
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;