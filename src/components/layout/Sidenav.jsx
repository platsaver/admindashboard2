import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { SafetyCertificateOutlined, BarChartOutlined, 
  CalendarOutlined, SolutionOutlined,
  PlayCircleOutlined, TeamOutlined } from "@ant-design/icons";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];
  const partners = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7ZM10 11C7.79086 11 6 12.7909 6 15C6 15.5523 6.44772 16 7 16H13C13.5523 16 14 15.5523 14 15C14 12.7909 12.2091 11 10 11Z"
        fill={color}
      ></path>
    </svg>,
  ];

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Carbon Dashboard</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/partners">
            <span
              className="icon"
              style={{
                background: page === "partners" ? color : "",
              }}
            >
              {partners}
            </span>
            <span className="label">Đối tác</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/personnel">
            <span
              className="icon"
              style={{
                background: page === "personnel" ? color : "",
              }}
            >
              <TeamOutlined />
            </span>
            <span className="label">Nhân sự</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/standards">
            <span
              className="icon"
              style={{
                background: page === "standards" ? color : "",
              }}
            >
              <SafetyCertificateOutlined />
            </span>
            <span className="label">Tiêu chuẩn</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/metrics">
            <span
              className="icon"
              style={{
                background: page === "metrics" ? color : "",
              }}
            >
              <BarChartOutlined />
            </span>
            <span className="label">Chỉ số</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="5">
          <NavLink to="/activities">
            <span
              className="icon"
              style={{
                background: page === "activities" ? color : "",
              }}
            >
              <PlayCircleOutlined />
            </span>
            <span className="label">Hoạt động</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/reports">
            <span
              className="icon"
              style={{
                background: page === "reports" ? color : "",
              }}
            >
              <SolutionOutlined />
            </span>
            <span className="label">Báo cáo</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/events">
            <span
              className="icon"
              style={{
                background: page === "events" ? color : "",
              }}
            >
              <CalendarOutlined />
            </span>
            <span className="label">Sự kiện</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;