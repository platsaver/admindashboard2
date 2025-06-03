import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

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
`;

export default class CalendarComponent extends Component {
  render() {
    return (
      <>
        <style>{globalStyles}</style>
        <div className="layout-content">
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
            initialDate="2024-10-12"
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
            ]}
          />
        </div>
      </>
    );
  }
}