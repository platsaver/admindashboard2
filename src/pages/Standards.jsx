import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Input,
  Space,
  Tag,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";


const columns = [
  {
    title: "Standards name",
    dataIndex: "name",
    key: "name",
    width: "15%",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Category",
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
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: "30%",
  },
  {
    title: "Compliance level",
    dataIndex: "complianceLevel",
    key: "complianceLevel",
    render: (level) => (
      <Tag color={level === "Nâng cao" ? "blue" : "green"}>{level}</Tag>
    ),
  },
  {
    title: "Guidelines",
    dataIndex: "guidelines",
    key: "guidelines",
  },
  {
    title: "Documents",
    dataIndex: "documents",
    key: "documents",
    render: (docs) => (
      <a href={docs} target="_blank" rel="noopener noreferrer">
        Xem tài liệu
      </a>
    ),
  },
];

const data = [
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

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredData = data.filter((item) => {
    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs={24} xl={24}>
          <Card
            className="criclebox tablespace mb-24"
            title="Bộ Tiêu Chuẩn"
            extra={
              <Space>
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
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Standards;