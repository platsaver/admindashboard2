import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Row, Col, Drawer, Button, Form, Input, Select, DatePicker, Modal, Space } from "antd";
import { Phone, Coffee, Users, Zap, ShoppingBag, Calendar, Gift, TrendingUp, Star } from "lucide-react";
import moment from "moment";

const { Option } = Select;

const globalStyles = `
  .fc-event.bg-critical {
    background-color: #dc3545 !important;
    border-color: #dc3545 !important;
    color: #fff !important;
  }
  .fc-event.bg-important {
    background-color: #007bff !important;
    border-color: #007bff !important;
    color: #fff !important;
  }
  .fc-event.bg-less-important {
    background-color: #28a745 !important;
    border-color: #28a745 !important;
    color: #fff !important;
  }
  .fc-event.text-dark {
    color: #343a40 !important;
  }
  .fc .fc-toolbar.fc-header-toolbar {
    padding: 0;
  }
  .fc .fc-toolbar-title {
    margin: 0;
    padding: 10px 0 0 10px;
  }
  .fc .fc-toolbar-chunk:last-child {
    padding: 10px 10px 0 0;
  }
  .fc .fc-button {
    background-color: #fff !important;
    color: #000 !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
    border: none !important;
    border-radius: 4px !important;
  }
  .fc .fc-button:hover {
    background-color: #f0f0f0 !important;
  }
  .fc .fc-button:active {
    background-color: #e0e0e0 !important;
  }
  .fc-daygrid-day-events {
    max-height: none;
    overflow: visible;
  }
  .fc-event-main {
    font-size: 12px;
  }
  /* Fix hover issues */
  .fc-day-today {
    background-color: rgba(255, 220, 40, 0.15) !important;
  }
  .fc-daygrid-day:hover {
    background-color: rgba(0, 123, 255, 0.1) !important;
    cursor: pointer;
  }
  .fc-daygrid-day-frame {
    position: relative;
    min-height: 100px;
  }
`;

export default class CalendarComponent extends Component {
  formRef = React.createRef();

  state = {
    events: [
      {
        id: "1",
        title: "Team Meeting",
        start: moment().add(1, 'day').hour(10).minute(0).format(),
        end: moment().add(1, 'day').hour(11).minute(0).format(),
        importance: "important",
        notes: "Discuss project updates",
        icon: Zap,
        iconColor: "#007bff",
      },
      {
        id: "2",
        title: "Coffee Break",
        start: moment().add(2, 'days').hour(14).minute(0).format(),
        end: moment().add(2, 'days').hour(14).minute(30).format(),
        importance: "less-important",
        notes: "Quick team catch-up",
        icon: Zap,
        iconColor: "#28a745",
      },
      {
        id: "3",
        title: "Client Call",
        start: moment().add(3, 'days').hour(16).minute(0).format(),
        end: moment().add(3, 'days').hour(17).minute(0).format(),
        importance: "critical",
        notes: "Review contract",
        icon: Zap,
        iconColor: "#dc3545",
      },
      {
        id: "4",
        title: "Project Deadline",
        start: moment().add(5, 'days').hour(23).minute(59).format(),
        end: moment().add(5, 'days').hour(23).minute(59).format(),
        importance: "critical",
        notes: "Submit final report",
        icon: Zap,
        iconColor: "#dc3545",
      },
    ],
    drawerVisible: false,
    selectedDate: null,
    selectedEvents: [],
    editEvent: null,
    formVisible: false,
    deleteConfirmVisible: false,
    eventToDelete: null,
    currentDate: moment().format('YYYY-MM-DD'),
  };

  componentDidMount() {
    // Update current date every minute to keep it fresh
    this.dateInterval = setInterval(() => {
      this.setState({ currentDate: moment().format('YYYY-MM-DD') });
    }, 60000);
  }

  componentWillUnmount() {
    if (this.dateInterval) {
      clearInterval(this.dateInterval);
    }
  }

  handleDateClick = (info) => {
    const selectedDate = moment(info.dateStr).format("YYYY-MM-DD");
    const selectedEvents = this.state.events.filter((event) =>
      moment(event.start).isSame(selectedDate, "day") ||
      (moment(event.start).isBefore(selectedDate, "day") && moment(event.end).isAfter(selectedDate, "day"))
    );
    this.setState({
      drawerVisible: true,
      selectedDate,
      selectedEvents,
    });
  };

  closeDrawer = () => {
    this.setState({
      drawerVisible: false,
      selectedDate: null,
      selectedEvents: [],
      editEvent: null,
      formVisible: false,
      deleteConfirmVisible: false,
      eventToDelete: null,
    });
  };

  openAddForm = () => {
    this.setState({ formVisible: true, editEvent: null });
  };

  openEditForm = (event) => {
    this.setState({ formVisible: true, editEvent: event });
  };

  handleFormSubmit = (values) => {
    const { events, editEvent, selectedDate } = this.state;
    const newEvent = {
      id: editEvent ? editEvent.id : `${Date.now()}`,
      title: values.title,
      start: values.start.format(),
      end: values.end.format(),
      importance: values.importance,
      notes: values.notes || "",
      icon: this.getIconForImportance(values.importance),
      iconColor: this.getColorForImportance(values.importance),
    };

    if (editEvent) {
      const updatedEvents = events.map((event) =>
        event.id === editEvent.id ? newEvent : event
      );
      this.setState(
        { events: updatedEvents, formVisible: false, editEvent: null },
        () => {
          const selectedEvents = updatedEvents.filter(
            (event) =>
              moment(event.start).isSame(selectedDate, "day") ||
              (moment(event.start).isBefore(selectedDate, "day") && moment(event.end).isAfter(selectedDate, "day"))
          );
          this.setState({ selectedEvents });
        }
      );
    } else {
      const updatedEvents = [...events, newEvent];
      this.setState(
        { events: updatedEvents, formVisible: false, editEvent: null },
        () => {
          const selectedEvents = updatedEvents.filter(
            (event) =>
              moment(event.start).isSame(selectedDate, "day") ||
              (moment(event.start).isBefore(selectedDate, "day") && moment(event.end).isAfter(selectedDate, "day"))
          );
          this.setState({ selectedEvents });
        }
      );
    }
  };

  confirmDelete = (event) => {
    this.setState({ deleteConfirmVisible: true, eventToDelete: event });
  };

  handleDelete = () => {
    const { events, eventToDelete, selectedDate } = this.state;
    const updatedEvents = events.filter((event) => event.id !== eventToDelete.id);
    this.setState(
      {
        events: updatedEvents,
        deleteConfirmVisible: false,
        eventToDelete: null,
      },
      () => {
        const selectedEvents = updatedEvents.filter(
          (event) =>
            moment(event.start).isSame(selectedDate, "day") ||
            (moment(event.start).isBefore(selectedDate, "day") && moment(event.end).isAfter(selectedDate, "day"))
        );
        this.setState({ selectedEvents });
      }
    );
  };

  getIconForImportance = (importance) => {
    switch (importance) {
      case "critical":
        return Zap;
      case "important":
        return Zap;
      case "less-important":
        return Zap;
      default:
        return Zap;
    }
  };

  getColorForImportance = (importance) => {
    switch (importance) {
      case "critical":
        return "#dc3545";
      case "important":
        return "#007bff";
      case "less-important":
        return "#28a745";
      default:
        return "#6c757d";
    }
  };

  render() {
    const { currentDate } = this.state;
    // Filter events from current moment onwards
    const upcomingEvents = this.state.events
      .filter((event) => moment(event.start).isAfter(moment()))
      .sort((a, b) => moment(a.start).diff(moment(b.start)));

    const formattedEvents = this.state.events.map((event) => ({
      ...event,
      classNames: [`bg-${event.importance}`],
      display: 'auto',
    }));

    return (
      <>
        <style>{globalStyles}</style>
        <div className="layout-content" style={{ padding: "24px" }}>
          <Row gutter={[24, 24]}>
            <Col span={16}>
              <div style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", overflow: "hidden" }}>
                <FullCalendar
                  contentHeight="auto"
                  height={400}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                  }}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  weekends={true}
                  selectable={true}
                  editable={true}
                  events={formattedEvents}
                  dateClick={this.handleDateClick}
                  displayEventTime={true}
                  displayEventEnd={true}
                  eventDisplay="block"
                  dayMaxEvents={false}
                  moreLinkClick="popover"
                  eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    meridiem: 'short'
                  }}
                  fixedWeekCount={false}
                  showNonCurrentDates={false}
                />
              </div>
            </Col>
            <Col span={8}>
              <div
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  height: "400px",
                  overflowY: "auto",
                  padding: "16px",
                  background: "#f8f9fa",
                }}
              >
                <h3>Upcoming Events</h3>
                <div style={{ fontSize: "12px", color: "#666", marginBottom: "16px" }}>
                  From {moment().format("MMM DD, YYYY")} onwards
                </div>
                {upcomingEvents.length > 0 ? (
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {upcomingEvents.map((event, index) => {
                      const IconComponent = event.icon;
                      const timeFromNow = moment(event.start).fromNow();
                      const isToday = moment(event.start).isSame(moment(), 'day');
                      const isTomorrow = moment(event.start).isSame(moment().add(1, 'day'), 'day');
                      
                      let dateLabel = moment(event.start).format("MMM DD, YYYY");
                      if (isToday) dateLabel = "Today";
                      else if (isTomorrow) dateLabel = "Tomorrow";
                      
                      return (
                        <li
                          key={index}
                          style={{
                            padding: "12px 0",
                            borderBottom: "1px solid #eee",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: event.iconColor,
                              borderRadius: "6px",
                              padding: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minWidth: "32px",
                              height: "32px",
                            }}
                          >
                            <IconComponent size={16} color="white" />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: "500", marginBottom: "2px" }}>{event.title}</div>
                            <div style={{ fontSize: "12px", color: "#666" }}>
                              {dateLabel} • {moment(event.start).format("HH:mm")}
                            </div>
                            <div style={{ fontSize: "11px", color: "#999" }}>
                              {timeFromNow}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div style={{ textAlign: "center", color: "#666", padding: "20px" }}>
                    No upcoming events
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>

        {/* Drawer for displaying events on selected date */}
        <Drawer
          title={`Events on ${this.state.selectedDate || ""}`}
          placement="right"
          onClose={this.closeDrawer}
          open={this.state.drawerVisible}
          width={400}
        >
          <Button type="primary" onClick={this.openAddForm} style={{ marginBottom: 16 }}>
            Add Event
          </Button>
          
          {this.state.selectedEvents.length > 0 ? (
            <div>
              {this.state.selectedEvents.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div
                    key={index}
                    style={{
                      padding: "12px",
                      marginBottom: "12px",
                      borderRadius: "8px",
                      border: "1px solid #e8e8e8",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <div
                        style={{
                          backgroundColor: event.iconColor,
                          borderRadius: "6px",
                          padding: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconComponent size={14} color="white" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "500" }}>{event.title}</div>
                        <div style={{ fontSize: "12px", color: "#666" }}>
                          {moment(event.start).format("MMM DD, YYYY HH:mm")} - {moment(event.end).format("HH:mm")}
                        </div>
                      </div>
                    </div>
                    
                    {event.notes && (
                      <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
                        {event.notes}
                      </div>
                    )}
                    
                    <Space>
                      <Button size="small" onClick={() => this.openEditForm(event)}>
                        Edit
                      </Button>
                      <Button size="small" danger onClick={() => this.confirmDelete(event)}>
                        Delete
                      </Button>
                    </Space>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "#666", padding: "20px" }}>
              No events on this date
            </div>
          )}
        </Drawer>

        {/* Modal for Add/Edit Event */}
        <Modal
          title={this.state.editEvent ? "Edit Event" : "Add Event"}
          open={this.state.formVisible}
          onCancel={() => this.setState({ formVisible: false, editEvent: null })}
          footer={null}
          width={500}
        >
          <Form
            ref={this.formRef}
            layout="vertical"
            onFinish={this.handleFormSubmit}
            initialValues={
              this.state.editEvent
                ? {
                    title: this.state.editEvent.title,
                    start: moment(this.state.editEvent.start),
                    end: moment(this.state.editEvent.end),
                    importance: this.state.editEvent.importance,
                    notes: this.state.editEvent.notes,
                  }
                : {
                    start: this.state.selectedDate ? moment(this.state.selectedDate).hour(9) : moment().hour(9),
                    end: this.state.selectedDate ? moment(this.state.selectedDate).hour(10) : moment().hour(10),
                    importance: "important",
                  }
            }
          >
            <Form.Item
              name="title"
              label="Event Title"
              rules={[{ required: true, message: "Please enter event title" }]}
            >
              <Input placeholder="Enter event title" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="start"
                  label="Start Time"
                  rules={[{ required: true, message: "Please select start time" }]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    placeholder="Select start time"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="end"
                  label="End Time"
                  rules={[{ required: true, message: "Please select end time" }]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    placeholder="Select end time"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="importance"
              label="Importance"
              rules={[{ required: true, message: "Please select importance level" }]}
            >
              <Select placeholder="Select importance level">
                <Option value="critical">Critical</Option>
                <Option value="important">Important</Option>
                <Option value="less-important">Less Important</Option>
              </Select>
            </Form.Item>

            <Form.Item name="notes" label="Notes">
              <Input.TextArea placeholder="Add notes (optional)" rows={3} />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button onClick={() => this.setState({ formVisible: false, editEvent: null })}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  {this.state.editEvent ? "Update Event" : "Add Event"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Confirmation Modal for Delete */}
        <Modal
          title="Xác nhận xóa"
          open={this.state.deleteConfirmVisible}
          onOk={this.handleDelete}
          onCancel={() => this.setState({ deleteConfirmVisible: false, eventToDelete: null })}
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <p>
            Bạn có chắc chắn muốn xóa sự kiện "{this.state.eventToDelete?.title}"?
          </p>
        </Modal>
      </>
    );
  }
}