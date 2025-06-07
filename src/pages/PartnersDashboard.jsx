import { Row, Col, Card, Radio, Table, Button, Typography, Drawer, Descriptions, Space } from "antd";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const { Title } = Typography;

const partnerData = [
  {
    key: "1",
    name: "TechCorp Hanoi",
    industry: "Technology",
    contact: "contact@techcorp.vn",
    location: "Hanoi",
    coordinates: [21.0285, 105.8542],
    personnel: [
      { name: "Nguyen Van A", role: "Manager", email: "nguyen.a@techcorp.vn", status: "Active" },
      { name: "Tran Thi B", role: "Developer", email: "tran.b@techcorp.vn", status: "Active" },
    ],
  },
  {
    key: "2",
    name: "GreenSolutions HCMC",
    industry: "Environment",
    contact: "info@greensolutions.vn",
    location: "Ho Chi Minh City",
    coordinates: [10.7769, 106.7009],
    personnel: [
      { name: "Le Minh C", role: "Consultant", email: "le.c@greensolutions.vn", status: "Active" },
      { name: "Pham D", role: "Analyst", email: "pham.d@greensolutions.vn", status: "Inactive" },
    ],
  },
  {
    key: "3",
    name: "BlueWave Danang",
    industry: "Logistics",
    contact: "support@bluewave.vn",
    location: "Da Nang",
    coordinates: [16.0544, 108.2022],
    personnel: [
      { name: "Hoang E", role: "Logistics Manager", email: "hoang.e@bluewave.vn", status: "Active" },
    ],
  },
];

const columns = [
  {
    title: "PARTNER",
    dataIndex: "name",
    key: "name",
    width: "30%",
    render: (text) => (
      <div className="avatar-info">
        <Title level={5}>{text}</Title>
      </div>
    ),
  },
  {
    title: "INDUSTRY",
    dataIndex: "industry",
    key: "industry",
    width: "20%",
  },
  {
    title: "CONTACT",
    dataIndex: "contact",
    key: "contact",
    width: "25%",
  },
  {
    title: "LOCATION",
    dataIndex: "location",
    key: "location",
    width: "20%",
  },
];

const personnelColumns = [
  { title: "Name", dataIndex: "name", key: "name", width: 150 },
  { title: "Role", dataIndex: "role", key: "role", width: 150 },
  { title: "Email", dataIndex: "email", key: "email", width: 200 },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (status) => (
      <Button type={status === "Active" ? "primary" : "default"} className="tag-primary">
        {status}
      </Button>
    ),
  },
];

const expandedRowRender = (record) => (
  <Table
    columns={personnelColumns}
    dataSource={record.personnel}
    pagination={false}
    size="small"
    scroll={{ x: 620 }}
  />
);

function PartnersDashboard() {
  const [filter, setFilter] = useState("all");
  const [isClient, setIsClient] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [personnelDrawerVisible, setPersonnelDrawerVisible] = useState(false); // Thêm trạng thái cho Drawer nhân sự
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [selectedPersonnel, setSelectedPersonnel] = useState(null); // Thêm trạng thái cho nhân sự được chọn

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleRowClick = (record) => {
    setSelectedPartner(record);
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedPartner(null);
  };

  const handlePersonnelDetail = (partner) => {
    setSelectedPartner(partner); // Đảm bảo giữ thông tin đối tác
    setPersonnelDrawerVisible(true);
  };

  const handleClosePersonnelDrawer = () => {
    setPersonnelDrawerVisible(false);
    setSelectedPersonnel(null);
  };

  const handleEdit = (record) => {
    console.log("Edit partner:", record);
  };

  const handleDelete = (record) => {
    console.log("Delete partner:", record);
  };

  const handleEditPersonnel = (personnel) => {
    console.log("Edit personnel:", personnel);
  };

  const handleDeletePersonnel = (personnel) => {
    console.log("Delete personnel:", personnel);
    if (selectedPartner) {
      const updatedPersonnel = selectedPartner.personnel.filter(p => p.name !== personnel.name);
      setSelectedPartner({ ...selectedPartner, personnel: updatedPersonnel });
    }
  };

  const handleAddPersonnel = () => {
    console.log("Add new personnel for:", selectedPartner?.name);
    // Logic để thêm nhân sự mới (ví dụ: mở form nhập liệu)
    const newPersonnel = { name: "New Person", role: "New Role", email: "new@person.com", status: "Active" };
    if (selectedPartner) {
      setSelectedPartner({ ...selectedPartner, personnel: [...selectedPartner.personnel, newPersonnel] });
    }
  };

  const filteredData = partnerData.filter((partner) => {
    if (filter === "all") return true;
    return partner.industry.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs={24} xl={12}>
          <Card
            className="criclebox tablespace mb-24"
            title="Danh sách đối tác"
            extra={
              <Radio.Group onChange={onFilterChange} defaultValue="all">
                <Radio.Button value="all">All</Radio.Button>
                <Radio.Button value="technology">Technology</Radio.Button>
                <Radio.Button value="environment">Environment</Radio.Button>
                <Radio.Button value="logistics">Logistics</Radio.Button>
              </Radio.Group>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={filteredData}
                expandable={{ expandedRowRender }}
                pagination={false}
                className="ant-border-space"
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                })}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card
            className="criclebox mb-24"
            title="Partner Locations"
          >
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
                  {partnerData.map((partner) => (
                    <Marker key={partner.key} position={partner.coordinates}>
                      <Popup>
                        <b>{partner.name}</b>
                        <br />
                        {partner.location}
                        <br />
                        Industry: {partner.industry}
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
        title={selectedPartner?.name || "Partner Details"}
        placement="right"
        onClose={handleCloseDrawer}
        open={drawerVisible}
        width={400}
      >
        {selectedPartner && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Partner Name">
                {selectedPartner.name}
              </Descriptions.Item>
              <Descriptions.Item label="Industry">
                {selectedPartner.industry}
              </Descriptions.Item>
              <Descriptions.Item label="Contact">
                {selectedPartner.contact}
              </Descriptions.Item>
              <Descriptions.Item label="Location">
                {selectedPartner.location}
              </Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              onClick={() => handlePersonnelDetail(selectedPartner)}
              style={{ marginBottom: "8px" }}
            >
              Chi tiết Nhân sự
            </Button>
            <Button
              type="primary"
              onClick={() => handleEdit(selectedPartner)}
              style={{ marginBottom: "8px" }}
            >
              Chỉnh sửa
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleDelete(selectedPartner)}
            >
              Xóa
            </Button>
          </div>
        )}
      </Drawer>
      <Drawer
        title={`${selectedPartner?.name || "Personnel Details"} - Nhân sự`}
        placement="right"
        onClose={handleClosePersonnelDrawer}
        open={personnelDrawerVisible}
        width={700}
        style={{ overflow: "auto" }}
      >
        {selectedPartner && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Table
              columns={personnelColumns}
              dataSource={selectedPartner.personnel}
              pagination={false}
              size="small"
              scroll={{ x: 620, y: 300 }}
              onRow={(record) => ({
                onClick: () => setSelectedPersonnel(record),
              })}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleEditPersonnel(selectedPersonnel)}
                disabled={!selectedPersonnel}
              >
                Chỉnh sửa
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => handleDeletePersonnel(selectedPersonnel)}
                disabled={!selectedPersonnel}
              >
                Xóa
              </Button>
              <Button
                type="primary"
                onClick={handleAddPersonnel}
              >
                Thêm
              </Button>
            </Space>
          </div>
        )}
      </Drawer>
    </div>
  );
}

export default PartnersDashboard;