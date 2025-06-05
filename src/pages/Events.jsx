import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Row, Col } from "antd";
import { Phone, Coffee, Users, Zap, ShoppingBag, Calendar, Gift, TrendingUp, Star } from "lucide-react";

// Define the CSS styles globally
const globalStyles = `
  .fc-event.bg-primary {
    background-color: #007bff !important;
    border-color: #007bff !important;
  }
  .fc-event.bg-danger {
    background-color: #dc3545 !important;
    border-color: #dc3545 !important;
  }
  .fc-event.bg-warning {
    background-color: #ffc107 !important;
    border-color: #ffc107 !important;
    color: #343a40 !important; /* Ensure text-dark works */
  }
  .fc-event.bg-success {
    background-color: #28a745 !important;
    border-color: #28a745 !important;
  }
  .fc-event.text-dark {
    color: #343a40 !important;
  }

  /* Custom styles for header */
  .fc .fc-toolbar.fc-header-toolbar {
    padding: 0; /* Remove previous padding */
  }

  .fc .fc-toolbar-title {
    margin: 0; /* Reset default margin */
    padding: 10px 0 0 10px; /* 10px padding on top and left */
  }

  .fc .fc-toolbar-chunk:last-child {
    padding: 10px 10px 0 0; /* 10px padding on top and right */
  }

  .fc .fc-button {
    background-color: #fff !important; /* White background for buttons */
    color: #000 !important; /* Ensure text is visible (black for contrast) */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important; /* Shadow effect */
    border: none !important; /* Remove default border */
    border-radius: 4px !important; /* Slight rounding for buttons */
  }

  .fc .fc-button:hover {
    background-color: #f0f0f0 !important; /* Light hover effect */
  }

  .fc .fc-button:active {
    background-color: #e0e0e0 !important; /* Slightly darker on click */
  }
`;

export default class CalendarComponent extends Component {
  render() {
    const cutoffDate = "2024-12-10"; // Events from December 10, 2024 onwards
    const upcomingEvents = [
      {
        title: "Call with Dave",
        start: "2024-10-18",
        end: "2024-10-18",
        classNames: ["bg-danger"],
        icon: Phone,
        iconColor: "#dc3545",
      },
      {
        title: "Lunch meeting",
        start: "2024-10-21",
        end: "2024-10-22",
        classNames: ["bg-warning", "text-dark"],
        icon: Coffee,
        iconColor: "#ffc107",
      },
      {
        title: "All day conference",
        start: "2024-10-29",
        end: "2024-10-29",
        classNames: ["bg-success"],
        icon: Users,
        iconColor: "#28a745",
      },
      {
        title: "Meeting with Mary",
        start: "2024-11-01",
        end: "2024-11-01",
        classNames: ["bg-primary"],
        icon: Users,
        iconColor: "#007bff",
      },
      {
        title: "Winter Hackaton",
        start: "2024-11-03",
        end: "2024-11-03",
        classNames: ["bg-danger"],
        icon: Zap,
        iconColor: "#dc3545",
      },
      {
        title: "Digital event",
        start: "2024-11-07",
        end: "2024-11-09",
        classNames: ["bg-warning", "text-dark"],
        icon: Star,
        iconColor: "#ffc107",
      },
      {
        title: "Marketing event",
        start: "2024-11-10",
        end: "2024-11-10",
        classNames: ["bg-primary"],
        icon: TrendingUp,
        iconColor: "#007bff",
      },
      {
        title: "Dinner with Family",
        start: "2024-11-19",
        end: "2024-11-19",
        classNames: ["bg-danger"],
        icon: Coffee,
        iconColor: "#dc3545",
      },
      {
        title: "Black Friday",
        start: "2024-11-23",
        end: "2024-11-23",
        classNames: ["bg-primary"],
        icon: ShoppingBag,
        iconColor: "#007bff",
      },
      {
        title: "Cyber Week",
        start: "2024-12-02",
        end: "2024-12-02",
        classNames: ["bg-warning", "text-dark"],
        icon: ShoppingBag,
        iconColor: "#ffc107",
      },
      {
        title: "Digital event",
        start: "2024-10-12",
        end: "2024-10-13",
        classNames: ["bg-warning", "text-dark"],
        icon: Star,
        iconColor: "#ffc107",
      },
      {
        title: "Holiday Planning",
        start: "2024-12-15",
        end: "2024-12-15",
        classNames: ["bg-success"],
        icon: Calendar,
        iconColor: "#28a745",
      },
      {
        title: "Year End Review",
        start: "2024-12-20",
        end: "2024-12-20",
        classNames: ["bg-primary"],
        icon: TrendingUp,
        iconColor: "#007bff",
      },
      {
        title: "Christmas Party",
        start: "2024-12-24",
        end: "2024-12-24",
        classNames: ["bg-danger"],
        icon: Gift,
        iconColor: "#dc3545",
      },
      {
        title: "New Year Planning",
        start: "2024-12-30",
        end: "2024-12-30",
        classNames: ["bg-warning", "text-dark"],
        icon: Calendar,
        iconColor: "#ffc107",
      },
    ].filter(event => new Date(event.start) >= new Date(cutoffDate));

    return (
      <>
        <style>{globalStyles}</style>
        <div className="layout-content">
          <Row gutter={[24, 24]}>
            <Col span={16}>
              <div style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", overflow: "hidden" }}>
                <FullCalendar
                  contentHeight="auto"
                  height={400}
                  header={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                  }}
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  weekends={true}
                  selectable={true}
                  editable={true}
                  initialDate="2024-12-10"
                  events={[
                    {
                      title: "Call with Dave",
                      start: "2024-10-18",
                      end: "2024-10-18",
                      classNames: ["bg-danger"],
                    },
                    {
                      title: "Lunch meeting",
                      start: "2024-10-21",
                      end: "2024-10-22",
                      classNames: ["bg-warning", "text-dark"],
                    },
                    {
                      title: "All day conference",
                      start: "2024-10-29",
                      end: "2024-10-29",
                      classNames: ["bg-success"],
                    },
                    {
                      title: "Meeting with Mary",
                      start: "2024-11-01",
                      end: "2024-11-01",
                      classNames: ["bg-primary"],
                    },
                    {
                      title: "Winter Hackaton",
                      start: "2024-11-03",
                      end: "2024-11-03",
                      classNames: ["bg-danger"],
                    },
                    {
                      title: "Digital event",
                      start: "2024-11-07",
                      end: "2024-11-09",
                      classNames: ["bg-warning", "text-dark"],
                    },
                    {
                      title: "Marketing event",
                      start: "2024-11-10",
                      end: "2024-11-10",
                      classNames: ["bg-primary"],
                    },
                    {
                      title: "Dinner with Family",
                      start: "2024-11-19",
                      end: "2024-11-19",
                      classNames: ["bg-danger"],
                    },
                    {
                      title: "Black Friday",
                      start: "2024-11-23",
                      end: "2024-11-23",
                      classNames: ["bg-primary"],
                    },
                    {
                      title: "Cyber Week",
                      start: "2024-12-02",
                      end: "2024-12-02",
                      classNames: ["bg-warning", "text-dark"],
                    },
                    {
                      title: "Digital event",
                      start: "2024-10-12",
                      end: "2024-10-13",
                      classNames: ["bg-warning", "text-dark"],
                    },
                    {
                      title: "Holiday Planning",
                      start: "2024-12-15",
                      end: "2024-12-15",
                      classNames: ["bg-success"],
                    },
                    {
                      title: "Year End Review",
                      start: "2024-12-20",
                      end: "2024-12-20",
                      classNames: ["bg-primary"],
                    },
                    {
                      title: "Christmas Party",
                      start: "2024-12-24",
                      end: "2024-12-24",
                      classNames: ["bg-danger"],
                    },
                    {
                      title: "New Year Planning",
                      start: "2024-12-30",
                      end: "2024-12-30",
                      classNames: ["bg-warning", "text-dark"],
                    },
                  ]}
                />
              </div>
            </Col>
            <Col span={8}>
              <div style={{ borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", height: "400px", overflowY: "auto", padding: "16px", background: "#f8f9fa" }}>
                <h3>Next Events (from Dec 10, 2024)</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {upcomingEvents.map((event, index) => {
                    const IconComponent = event.icon;
                    return (
                      <li key={index} style={{ padding: "12px 0", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ 
                          backgroundColor: event.iconColor, 
                          borderRadius: "6px", 
                          padding: "8px", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          minWidth: "32px",
                          height: "32px"
                        }}>
                          <IconComponent size={16} color="white" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: "500", marginBottom: "2px" }}>
                            {event.title}
                          </div>
                          <div style={{ fontSize: "12px", color: "#666" }}>
                            {new Date(event.start).toLocaleDateString('en-US', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}