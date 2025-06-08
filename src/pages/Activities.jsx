import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Button,
  Typography,
  Input,
  Space,
  Tag,
  Drawer,
  Descriptions,
  Form,
  Input as FormInput,
  Select,
  Modal,
  Radio,
} from 'antd';
import { useState } from 'react';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const initialTasks = [
  {
    key: '1',
    title: 'Kiểm tra API thanh toán',
    priority: 'Cao',
    description: 'Kiểm tra lỗi API thanh toán phát sinh hôm qua',
  },
  {
    key: '2',
    title: 'Cập nhật tài liệu',
    priority: 'Thấp',
    description: 'Cập nhật tài liệu hướng dẫn sử dụng',
  },
  {
    key: '3',
    title: 'Tối ưu hóa hiệu suất',
    priority: 'Trung bình',
    description: 'Cải thiện hiệu suất cơ sở dữ liệu',
  },
  {
    key: '4',
    title: 'Hoàn thành UI đăng nhập',
    priority: 'Trung bình',
    description: 'Hoàn thành giao diện đăng nhập mới',
  },
];

const columns = [
  {
    title: 'Tiêu đề',
    dataIndex: 'title',
    key: 'title',
    width: '20%',
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    width: '50%',
  },
  {
    title: 'Mức độ ưu tiên',
    dataIndex: 'priority',
    key: 'priority',
    render: (priority) => (
      <Tag color={priority === 'Cao' ? 'red' : priority === 'Trung bình' ? 'yellow' : 'green'}>
        {priority}
      </Tag>
    ),
    filters: [
      { text: 'Cao', value: 'Cao' },
      { text: 'Trung bình', value: 'Trung bình' },
      { text: 'Thấp', value: 'Thấp' },
    ],
    onFilter: (value, record) => record.priority === value,
  },
];

const Dashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [form] = Form.useForm();

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
        <div className="avatar-info">
          <Title level={5}>Hệ thống bảo trì</Title>
          <p>Hệ thống bảo trì dự kiến: 02/06/2025, 2AM-4AM</p>
        </div>
      ),
      type: <Button type="primary" className="tag-primary">INFO</Button>,
      action: (
        <div className="ant-employed">
          <a href="#pablo">View</a>
        </div>
      ),
    },
    {
      key: '2',
      message: (
        <div className="avatar-info">
          <Title level={5}>Lỗi API</Title>
          <p>Lỗi API phát hiện ở module thanh toán</p>
        </div>
      ),
      type: <Button className="tag-badge">ERROR</Button>,
      action: (
        <div className="ant-employed">
          <a href="#pablo">View</a>
        </div>
      ),
    },
    {
      key: '3',
      message: (
        <div className="avatar-info">
          <Title level={5}>Cập nhật phiên bản</Title>
          <p>Cập nhật phiên bản mới v2.1.3</p>
        </div>
      ),
      type: <Button type="primary" className="tag-primary">SUCCESS</Button>,
      action: (
        <div className="ant-employed">
          <a href="#pablo">View</a>
        </div>
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

  const handleFilterChange = (e) => {
    setFilterPriority(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleRowClick = (record) => {
    setSelectedTask(record);
    setDrawerVisible(true);
    setIsEditing(false);
    setIsAdding(false);
    form.setFieldsValue(record);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedTask(null);
    setIsEditing(false);
    setIsAdding(false);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setIsAdding(false);
    form.setFieldsValue(record);
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setIsEditing(false);
    setSelectedTask(null);
    setDrawerVisible(true);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (isAdding) {
        const newTask = {
          key: (tasks.length + 1).toString(),
          ...values,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
      } else {
        setTasks((prevTasks) =>
          prevTasks.map((item) =>
            item.key === selectedTask.key ? { ...item, ...values } : item
          )
        );
        setSelectedTask({ ...selectedTask, ...values });
      }
      setIsEditing(false);
      setIsAdding(false);
      setDrawerVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((item) => item.key !== selectedTask.key)
    );
    setDeleteModalVisible(false);
    setDrawerVisible(false);
    setSelectedTask(null);
  };

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesPriority =
      filterPriority === 'all' || task.priority === filterPriority;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Row gutter={[24, 24]} className="mb-8">
        <Col span={12}>
          <Card
            title={<Title level={4} className="text-gray-800">Tóm tắt tình hình</Title>}
            className="shadow-lg rounded-lg bg-white"
            style={{ border: '1px solid #e8e8e8' }}
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
            className="shadow-lg rounded-lg bg-white"
            style={{ border: '1px solid #e8e8e8' }}
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
      <Row gutter={[24, 24]} style={{ paddingTop: '15px' }}>
        <Col xs={24} xl={24}>
          <Card
            className="criclebox tablespace mb-24 shadow-lg rounded-lg bg-white"
            title="Nhiệm vụ"
            style={{ border: '1px solid #e8e8e8' }}
            extra={
              <Space>
                <Button type="primary" onClick={handleAddNew}>
                  Thêm
                </Button>
                <Radio.Group onChange={handleFilterChange} defaultValue="all">
                  <Radio.Button value="all">Tất cả</Radio.Button>
                  <Radio.Button value="Cao">Cao</Radio.Button>
                  <Radio.Button value="Trung bình">Trung bình</Radio.Button>
                  <Radio.Button value="Thấp">Thấp</Radio.Button>
                </Radio.Group>
                <Input
                  placeholder="Tìm kiếm nhiệm vụ"
                  prefix={<SearchOutlined />}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ width: 200 }}
                />
              </Space>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={filteredTasks}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: filteredTasks.length,
                  onChange: handlePaginationChange,
                  showSizeChanger: true,
                  pageSizeOptions: ['5', '10', '20'],
                }}
                className="ant-border-space"
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                })}
              />
            </div>
          </Card>
        </Col>
      </Row>
      <Drawer
        title={isAdding ? 'Thêm nhiệm vụ mới' : isEditing ? 'Chỉnh sửa nhiệm vụ' : (selectedTask?.title || 'Chi tiết nhiệm vụ')}
        placement="right"
        onClose={handleCloseDrawer}
        open={drawerVisible}
        width={400}
      >
        {selectedTask && !isEditing && !isAdding && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Tiêu đề">{selectedTask.title}</Descriptions.Item>
              <Descriptions.Item label="Mô tả">{selectedTask.description}</Descriptions.Item>
              <Descriptions.Item label="Mức độ ưu tiên">
                <Tag color={selectedTask.priority === 'Cao' ? 'red' : selectedTask.priority === 'Trung bình' ? 'yellow' : 'green'}>
                  {selectedTask.priority}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              onClick={() => handleEdit(selectedTask)}
              style={{ marginBottom: '8px' }}
            >
              Chỉnh sửa
            </Button>
            <Button
              type="primary"
              danger
              onClick={showDeleteModal}
            >
              Xóa
            </Button>
          </div>
        )}
        {(isEditing || isAdding) && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            initialValues={isAdding ? {} : selectedTask}
          >
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
            >
              <FormInput.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              name="priority"
              label="Mức độ ưu tiên"
              rules={[{ required: true, message: 'Vui lòng chọn mức độ ưu tiên!' }]}
            >
              <Select>
                <Option value="Cao">Cao</Option>
                <Option value="Trung bình">Trung bình</Option>
                <Option value="Thấp">Thấp</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Button onClick={handleCloseDrawer}>Hủy</Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Drawer>
      <Modal
        title="Xác nhận xóa"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
        okType="danger"
      >
        <p>
          Bạn có chắc chắn muốn xóa nhiệm vụ "{selectedTask?.title}" không?
        </p>
      </Modal>
    </div>
  );
};

export default Dashboard;