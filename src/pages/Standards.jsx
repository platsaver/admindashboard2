import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Input,
  Space,
  Tag,
  Drawer,
  Button,
  Descriptions,
  Form,
  Input as FormInput,
  Select,
  Modal,
} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Option } = Select;

const columns = [
  {
    title: "Tên tiêu chuẩn",
    dataIndex: "name",
    key: "name",
    width: "15%",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Phân loại",
    dataIndex: "category",
    key: "category",
    filters: [
      { text: "Products", value: "Sản phẩm" },
      { text: "Procedure", value: "Quy trình" },
      { text: "Safety", value: "An toàn" },
    ],
    onFilter: (value, record) => record.category === value,
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    width: "30%",
  },
  {
    title: "Mức độ chấp hành",
    dataIndex: "complianceLevel",
    key: "complianceLevel",
    render: (level) => (
      <Tag color={level === "Nâng cao" ? "blue" : "green"}>{level}</Tag>
    ),
  },
];

const initialData = [
  {
    key: "1",
    name: "ISO 9001",
    category: "Quy trình",
    description: "Tiêu chuẩn quản lý chất lượng quốc tế cho hệ thống quản lý chất lượng.",
    complianceLevel: "Nâng cao",
    guidelines: "Áp dụng quy trình PDCA, tài liệu hóa quy trình.",
    documents: "https://www.iso.org/iso-9001-quality-management.html",
  },
  {
    key: "2",
    name: "ISO 14001",
    category: "An toàn",
    description: "Tiêu chuẩn quản lý môi trường để giảm thiểu tác động môi trường.",
    complianceLevel: "Cơ bản",
    guidelines: "Đánh giá tác động môi trường, thiết lập KPI môi trường.",
    documents: "https://www.iso.org/iso-14001-environmental-management.html",
  },
  {
    key: "3",
    name: "TQM",
    category: "Quy trình",
    description: "Quản lý chất lượng toàn diện, tập trung vào cải tiến liên tục.",
    complianceLevel: "Nâng cao",
    guidelines: "Sử dụng công cụ 7 QC, đào tạo nhân viên.",
    documents: "https://example.com/tqm-guidelines.pdf",
  },
  {
    key: "4",
    name: "HACCP",
    category: "Sản phẩm",
    description: "Hệ thống phân tích mối nguy và kiểm soát điểm tới hạn cho an toàn thực phẩm.",
    complianceLevel: "Cơ bản",
    guidelines: "Xác định CCPs, giám sát quy trình sản xuất.",
    documents: "https://example.com/haccp-guidelines.pdf",
  },
];

function Standards() {
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState(null);
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleRowClick = (record) => {
    console.log("Row clicked with record:", record);
    console.log("Record keys:", Object.keys(record));
    console.log("Record name:", record.name);
    setSelectedStandard(record);
    setDrawerVisible(true);
    setIsEditing(false);
    setIsAdding(false);
    form.setFieldsValue(record);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedStandard(null);
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
    setSelectedStandard(null);
    setDrawerVisible(true);
    form.resetFields(); 
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (isAdding) {
        const newStandard = {
          key: (data.length + 1).toString(),
          ...values,
        };
        setData((prevData) => [...prevData, newStandard]);
      } else {
        setData((prevData) =>
          prevData.map((item) =>
            item.key === selectedStandard.key ? { ...item, ...values } : item
          )
        );
        setSelectedStandard({ ...selectedStandard, ...values });
      }
      setIsEditing(false);
      setIsAdding(false);
      setDrawerVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = () => {
    console.log("Confirming delete for:", selectedStandard.name);
    setData((prevData) => {
      const newData = prevData.filter((item) => item.key !== selectedStandard.key);
      console.log("New data after delete:", newData);
      return newData;
    });
    setDeleteModalVisible(false);
    setDrawerVisible(false);
    setSelectedStandard(null);
  };

  const showDeleteModal = () => {
    console.log("Showing delete modal for:", selectedStandard);
    setDeleteModalVisible(true);
  };

  const filteredData = data.filter((item) => {
    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs={24} xl={24}>
          <Card
            className="criclebox tablespace mb-24"
            title="Bộ Tiêu Chuẩn"
            extra={
              <Space>
                <Button
                  type="primary"
                  onClick={handleAddNew}
                >
                  Thêm
                </Button>
                <Radio.Group
                  onChange={handleFilterChange}
                  defaultValue="all"
                >
                  <Radio.Button value="all">Tất cả</Radio.Button>
                  <Radio.Button value="Sản phẩm">Sản phẩm</Radio.Button>
                  <Radio.Button value="Quy trình">Quy trình</Radio.Button>
                  <Radio.Button value="An toàn">An toàn</Radio.Button>
                </Radio.Group>
                <Input
                  placeholder="Tìm kiếm tiêu chuẩn"
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
                dataSource={filteredData}
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: filteredData.length,
                  onChange: handlePaginationChange,
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20"],
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
        title={isAdding ? "Thêm tiêu chuẩn mới" : isEditing ? "Chỉnh sửa tiêu chuẩn" : (selectedStandard?.name || "Chi tiết tiêu chuẩn")}
        placement="right"
        onClose={handleCloseDrawer}
        open={drawerVisible}
        width={400}
      >
        {selectedStandard && !isEditing && !isAdding && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Tên tiêu chuẩn">
                {selectedStandard.name}
              </Descriptions.Item>
              <Descriptions.Item label="Danh mục">
                {selectedStandard.category}
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả">
                {selectedStandard.description}
              </Descriptions.Item>
              <Descriptions.Item label="Mức độ tuân thủ">
                <Tag color={selectedStandard.complianceLevel === "Nâng cao" ? "blue" : "green"}>
                  {selectedStandard.complianceLevel}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Hướng dẫn">
                {selectedStandard.guidelines}
              </Descriptions.Item>
              <Descriptions.Item label="Tài liệu">
                <a href={selectedStandard.documents} target="_blank" rel="noopener noreferrer">
                  Xem tài liệu
                </a>
              </Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              onClick={() => handleEdit(selectedStandard)}
              style={{ marginBottom: "8px" }}
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
            initialValues={isAdding ? {} : selectedStandard}
          >
            <Form.Item
              name="name"
              label="Tên tiêu chuẩn"
              rules={[{ required: true, message: "Vui lòng nhập tên tiêu chuẩn!" }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="category"
              label="Danh mục"
              rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
            >
              <Select>
                <Option value="Sản phẩm">Sản phẩm</Option>
                <Option value="Quy trình">Quy trình</Option>
                <Option value="An toàn">An toàn</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
            >
              <FormInput.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="complianceLevel"
              label="Mức độ tuân thủ"
              rules={[{ required: true, message: "Vui lòng chọn mức độ tuân thủ!" }]}
            >
              <Select>
                <Option value="Cơ bản">Cơ bản</Option>
                <Option value="Nâng cao">Nâng cao</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="guidelines"
              label="Hướng dẫn"
              rules={[{ required: true, message: "Vui lòng nhập hướng dẫn!" }]}
            >
              <FormInput.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="documents"
              label="Tài liệu"
              rules={[{ required: true, message: "Vui lòng nhập liên kết tài liệu!" }]}
            >
              <FormInput />
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
          Bạn có chắc chắn muốn xóa tiêu chuẩn "{selectedStandard?.name}" không?
        </p>
      </Modal>
    </div>
  );
}

export default Standards;