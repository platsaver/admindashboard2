import { Row, Col, Card, Radio, Table, Button, Typography } from "antd";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";

// Fix Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const { Title } = Typography;

// Sample partner data
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
  {
    title: "ACTION",
    key: "action",
    render: () => <Link to="#">View Details</Link>,
  },
];

const expandedRowRender = (record) => {
  const personnelColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Button type={status === "Active" ? "primary" : "default"} className="tag-primary">
          {status}
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={personnelColumns}
      dataSource={record.personnel}
      pagination={false}
      size="small"
    />
  );
};

function PartnersDashboard() {
  const [filter, setFilter] = useState("all");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure map renders only on client
  }, []);

  const onFilterChange = (e) => {
    setFilter(e.target.value);
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
            title="Partners Overview"
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
    </div>
  );
}

export default PartnersDashboard;