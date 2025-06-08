import {
  Card,
  Row,
  Col,
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

const { Title } = Typography;
const { Option } = Select;

const initialPersonnel = [
  {
    key: '1',
    name: 'Nguyen Van A',
    role: 'Manager',
    email: 'nguyen.a@techcorp.vn',
    status: 'Active',
    partner: 'TechCorp Hanoi',
  },
  {
    key: '2',
    name: 'Tran Thi B',
    role: 'Developer',
    email: 'tran.b@techcorp.vn',
    status: 'Active',
    partner: 'TechCorp Hanoi',
  },
  {
    key: '3',
    name: 'Le Minh C',
    role: 'Consultant',
    email: 'le.c@greensolutions.vn',
    status: 'Active',
    partner: 'GreenSolutions HCMC',
  },
  {
    key: '4',
    name: 'Pham D',
    role: 'Analyst',
    email: 'pham.d@greensolutions.vn',
    status: 'Inactive',
    partner: 'GreenSolutions HCMC',
  },
  {
    key: '5',
    name: 'Hoang E',
    role: 'Logistics Manager',
    email: 'hoang.e@bluewave.vn',
    status: 'Active',
    partner: 'BlueWave Danang',
  },
];

const columns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    width: '20%',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    key: 'role',
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: '25%',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'Active' ? 'green' : 'red'}>
        {status}
      </Tag>
    ),
    filters: [
      { text: 'Active', value: 'Active' },
      { text: 'Inactive', value: 'Inactive' },
    ],
    onFilter: (value, record) => record.status === value,
  },
  {
    title: 'Đối tác',
    dataIndex: 'partner',
    key: 'partner',
    width: '20%',
    filters: [
      { text: 'TechCorp Hanoi', value: 'TechCorp Hanoi' },
      { text: 'GreenSolutions HCMC', value: 'GreenSolutions HCMC' },
      { text: 'BlueWave Danang', value: 'BlueWave Danang' },
    ],
    onFilter: (value, record) => record.partner === value,
  },
];

const PersonnelList = () => {
  const [personnelData, setPersonnelData] = useState(initialPersonnel);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleRowClick = (record) => {
    setSelectedPersonnel(record);
    setDrawerVisible(true);
    setIsEditing(false);
    setIsAdding(false);
    form.setFieldsValue(record);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedPersonnel(null);
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
    setSelectedPersonnel(null);
    setDrawerVisible(true);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (isAdding) {
        const newPersonnel = {
          key: (personnelData.length + 1).toString(),
          ...values,
        };
        setPersonnelData((prevData) => [...prevData, newPersonnel]);
      } else {
        setPersonnelData((prevData) =>
          prevData.map((item) =>
            item.key === selectedPersonnel.key ? { ...item, ...values } : item
          )
        );
        setSelectedPersonnel({ ...selectedPersonnel, ...values });
      }
      setIsEditing(false);
      setIsAdding(false);
      setDrawerVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = () => {
    setPersonnelData((prevData) =>
      prevData.filter((item) => item.key !== selectedPersonnel.key)
    );
    setDeleteModalVisible(false);
    setDrawerVisible(false);
    setSelectedPersonnel(null);
  };

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const filteredPersonnel = personnelData.filter((person) => {
    const matchesStatus =
      filterStatus === 'all' || person.status === filterStatus;
    const matchesSearch = person.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Row gutter={[24, 24]}>
        <Col xs={24} xl={24}>
          <Card
            className="criclebox tablespace mb-24 shadow-lg rounded-lg bg-white"
            title="Danh sách Nhân sự"
            style={{ border: '1px solid #e8e8e8' }}
            extra={
              <Space>
                <Button type="primary" onClick={handleAddNew}>
                  Thêm
                </Button>
                <Radio.Group onChange={handleFilterChange} defaultValue="all">
                  <Radio.Button value="all">Tất cả</Radio.Button>
                  <Radio.Button value="Active">Active</Radio.Button>
                  <Radio.Button value="Inactive">Inactive</Radio.Button>
                </Radio.Group>
                <Input
                  placeholder="Tìm kiếm nhân sự"
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
                dataSource={filteredPersonnel}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: filteredPersonnel.length,
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
        title={isAdding ? 'Thêm nhân sự mới' : isEditing ? 'Chỉnh sửa nhân sự' : (selectedPersonnel?.name || 'Chi tiết nhân sự')}
        placement="right"
        onClose={handleCloseDrawer}
        open={drawerVisible}
        width={400}
      >
        {selectedPersonnel && !isEditing && !isAdding && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Tên">{selectedPersonnel.name}</Descriptions.Item>
              <Descriptions.Item label="Vai trò">{selectedPersonnel.role}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedPersonnel.email}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color={selectedPersonnel.status === 'Active' ? 'yellow' : 'red'}>
                  {selectedPersonnel.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Đối tác">{selectedPersonnel.partner}</Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              onClick={() => handleEdit(selectedPersonnel)}
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
            initialValues={isAdding ? {} : selectedPersonnel}
          >
            <Form.Item
              name="name"
              label="Tên"
              rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="role"
              label="Vai trò"
              rules={[{ required: true, message: 'Vui lòng nhập vai trò!' }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
            >
              <Select>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="partner"
              label="Đối tác"
              rules={[{ required: true, message: 'Vui lòng chọn đối tác!' }]}
            >
              <Select>
                <Option value="TechCorp Hanoi">TechCorp Hanoi</Option>
                <Option value="GreenSolutions HCMC">GreenSolutions HCMC</Option>
                <Option value="BlueWave Danang">BlueWave Danang</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Button onClick={handleCloseDrawer}>
                  Hủy
                </Button>
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
          Bạn có chắc chắn muốn xóa nhân sự "{selectedPersonnel?.name}" không?
        </p>
      </Modal>
    </div>
  );
};

export default PersonnelList;