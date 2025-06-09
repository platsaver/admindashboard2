import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Typography,
  Drawer,
  Descriptions,
  Space,
  Form,
  Input as FormInput,
  Modal,
  Pagination
} from "antd";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const { Title } = Typography;

const initialPartnerData = [
  {
    key: "1",
    name: "TechCorp Hanoi",
    contact: "contact@techcorp.vn",
    location: "Hanoi",
    coordinates: [21.0285, 105.8542],
  },
  {
    key: "2",
    name: "GreenSolutions HCMC",
    contact: "info@greensolutions.vn",
    location: "Ho Chi Minh City",
    coordinates: [10.7769, 106.7009],
  },
  {
    key: "3",
    name: "BlueWave Danang",
    contact: "support@bluewave.vn",
    location: "Da Nang",
    coordinates: [16.0544, 108.2022],
  },
];

const columns = [
  {
    title: "Tên đối tác",
    dataIndex: "name",
    key: "name",
    width: "35%",
    render: (text) => (
      <div className="avatar-info">
        <Title level={5}>{text}</Title>
      </div>
    ),
  },
  {
    title: "Email",
    dataIndex: "contact",
    key: "contact",
    width: "35%",
  },
  {
    title: "Địa chỉ",
    dataIndex: "location",
    key: "location",
    width: "30%",
  },
];

function PartnersDashboard() {
  const [isClient, setIsClient] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [addPartnerDrawerVisible, setAddPartnerDrawerVisible] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isEditingPartner, setIsEditingPartner] = useState(false);
  const [deletePartnerModalVisible, setDeletePartnerModalVisible] = useState(false);
  const [data, setData] = useState(initialPartnerData);
  const [searchText, setSearchText] = useState("");
  const [partnerForm] = Form.useForm();
  const [addPartnerForm] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1); 
  };

  const handleRowClick = (record) => {
    setSelectedPartner(record);
    setDrawerVisible(true);
    setIsEditingPartner(false);
    partnerForm.setFieldsValue(record);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedPartner(null);
    setIsEditingPartner(false);
    partnerForm.resetFields();
  };

  const handleAddPartnerDrawer = () => {
    setAddPartnerDrawerVisible(true);
    addPartnerForm.resetFields();
  };

  const handleCloseAddPartnerDrawer = () => {
    setAddPartnerDrawerVisible(false);
    addPartnerForm.resetFields();
  };

  const handleEditPartner = () => {
    setIsEditingPartner(true);
    partnerForm.setFieldsValue(selectedPartner);
  };

  const handleSavePartner = () => {
    partnerForm.validateFields().then((values) => {
      setData((prevData) =>
        prevData.map((item) =>
          item.key === selectedPartner.key ? { ...item, ...values } : item
        )
      );
      setSelectedPartner((prev) => ({ ...prev, ...values }));
      setIsEditingPartner(false);
      setDrawerVisible(false);
      partnerForm.resetFields();
    }).catch((error) => {
      console.log("Validation failed:", error);
    });
  };

  const handleAddPartner = () => {
    addPartnerForm.validateFields().then((values) => {
      const newPartner = {
        ...values,
        key: Date.now().toString(),
        coordinates: [21.0285, 105.8542],
      };
      setData((prevData) => [...prevData, newPartner]);
      setAddPartnerDrawerVisible(false);
      addPartnerForm.resetFields();
      setCurrentPage(1);
    }).catch((error) => {
      console.log("Validation failed:", error);
    });
  };

  const handleDeletePartner = () => {
    setData((prevData) =>
      prevData.filter((item) => item.key !== selectedPartner.key)
    );
    setDeletePartnerModalVisible(false);
    setDrawerVisible(false);
    setSelectedPartner(null);
    setCurrentPage(1);
  };

  const showDeletePartnerModal = () => {
    setDeletePartnerModalVisible(true);
  };

  const filteredData = data.filter((partner) => {
    const query = searchText.toLowerCase();
    return (
      partner.name.toLowerCase().includes(query) ||
      partner.contact.toLowerCase().includes(query) ||
      partner.location.toLowerCase().includes(query)
    );
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  }

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs={24} xl={12}>
          <Card
            className="criclebox tablespace mb-24"
            title="Các đối tác"
            extra={
              <Space>
                <FormInput
                  placeholder="Tìm kiếm đối tác..."
                  prefix={<SearchOutlined />}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ width: 200 }}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddPartnerDrawer}
                >
                  Thêm đối tác
                </Button>
              </Space>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={paginatedData} // Use paginated data
                pagination={false} // Disable built-in pagination
                className="ant-border-space"
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                })}
              />
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredData.length}
                onChange={handlePageChange}
                showSizeChanger
                pageSizeOptions={["10", "20", "50"]}
                style={{ marginTop: 16, textAlign: "right", paddingBottom: 10, paddingRight: 10 }}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card className="criclebox mb-24" title="Partner Locations">
            <div style={{ height: "500px" }}>
              {isClient ? (
                <MapContainer
                  center={[16.0471, 108.2062]}
                  zoom={6}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {filteredData.map((partner) => (
                    <Marker key={partner.key} position={partner.coordinates}>
                      <Popup>
                        <b>{partner.name}</b>
                        <br />
                        {partner.location}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              ) : (
                <div>Loading map...</div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
      <Drawer
        title={isEditingPartner ? "Chỉnh sửa đối tác" : selectedPartner?.name || "Chi tiết đối tác"}
        placement="right"
        onClose={handleCloseDrawer}
        open={drawerVisible}
        width={400}
      >
        {selectedPartner && !isEditingPartner && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Partner Name">{selectedPartner.name}</Descriptions.Item>
              <Descriptions.Item label="Contact">{selectedPartner.contact}</Descriptions.Item>
              <Descriptions.Item label="Location">{selectedPartner.location}</Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              onClick={handleEditPartner}
              style={{ marginBottom: "8px" }}
            >
              Chỉnh sửa
            </Button>
            <Button type="primary" danger onClick={showDeletePartnerModal}>
              Xóa
            </Button>
          </div>
        )}
        {isEditingPartner && (
          <Form
            form={partnerForm}
            layout="vertical"
            onFinish={handleSavePartner}
            initialValues={selectedPartner}
          >
            <Form.Item
              name="name"
              label="Partner Name"
              rules={[{ required: true, message: "Vui lòng nhập tên đối tác!" }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="contact"
              label="Contact"
              rules={[{ required: true, message: "Vui lòng nhập liên hệ!" }]}
            >
              <FormInput />
            </Form.Item>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Vui lòng nhập địa điểm!" }]}
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
      <Drawer
        title="Thêm đối tác mới"
        placement="right"
        onClose={handleCloseAddPartnerDrawer}
        open={addPartnerDrawerVisible}
        width={400}
      >
        <Form
          form={addPartnerForm}
          layout="vertical"
          onFinish={handleAddPartner}
        >
          <Form.Item
            name="name"
            label="Partner Name"
            rules={[{ required: true, message: "Vui lòng nhập tên đối tác!" }]}
          >
            <FormInput />
          </Form.Item>
          <Form.Item
            name="contact"
            label="Contact"
            rules={[{ required: true, message: "Vui lòng nhập liên hệ!" }]}
          >
            <FormInput />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Vui lòng nhập địa điểm!" }]}
          >
            <FormInput />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Button onClick={handleCloseAddPartnerDrawer}>Hủy</Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
      <Modal
        title="Xác nhận xóa đối tác"
        open={deletePartnerModalVisible}
        onOk={handleDeletePartner}
        onCancel={() => setDeletePartnerModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
        okType="danger"
      >
        <p>Bạn có chắc chắn muốn xóa đối tác "{selectedPartner?.name}" không?</p>
      </Modal>
    </div>
  );
}

export default PartnersDashboard;