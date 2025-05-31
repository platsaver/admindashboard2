import { Card, Row, Col, Statistic, Table, Button, Avatar, Typography, Tag } from 'antd';
import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, useDroppable } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const SortableTask = ({ id, title, description, priority, getPriorityColor }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '8px',
    background: '#fff',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e8e8e8',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Text strong>{title}</Text>
          <p style={{ color: '#8c8c8c', margin: '4px 0' }}>{description}</p>
          <Tag color={getPriorityColor(priority)}>{priority}</Tag>
        </div>
        <div>
          <Button type="text" icon={<EditOutlined />} style={{ color: '#1890ff' }} />
          <Button type="text" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }} />
        </div>
      </div>
    </div>
  );
};

const DroppableColumn = ({ id, children, isOver }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: '400px',
        padding: '8px',
        borderRadius: '4px',
        transition: 'background-color 0.2s ease',
      }}
    >
      {children}
    </div>
  );
};

const Dashboard = () => {
  const [tasks, setTasks] = useState({
    'todo': [
      { id: '1', title: 'Kiểm tra API thanh toán', priority: 'Cao', description: 'Kiểm tra lỗi API thanh toán phát sinh hôm qua' },
      { id: '2', title: 'Cập nhật tài liệu', priority: 'Thấp', description: 'Cập nhật tài liệu hướng dẫn sử dụng' },
    ],
    'in-progress': [
      { id: '3', title: 'Tối ưu hóa hiệu suất', priority: 'Trung bình', description: 'Cải thiện hiệu suất cơ sở dữ liệu' },
    ],
    'done': [
      { id: '4', title: 'Hoàn thành UI đăng nhập', priority: 'Trung bình', description: 'Hoàn thành giao diện đăng nhập mới' },
    ],
  });

  const [activeId, setActiveId] = useState(null);

  const summaryData = {
    systemStatus: 'Ổn định',
    uptime: '99.9%',
    tasksCompleted: 45,
    tasksInProgress: 12,
  };

  const notifications = [
    {
      key: '1',
      message: (
        <>
          <Avatar.Group>
            <div className="avatar-info">
              <Title level={5}>Hệ thống bảo trì</Title>
              <p>Hệ thống bảo trì dự kiến: 02/06/2025, 2AM-4AM</p>
            </div>
          </Avatar.Group>
        </>
      ),
      type: (
        <>
          <Button type="primary" className="tag-primary">INFO</Button>
        </>
      ),
      action: (
        <>
          <div className="ant-employed">
            <a href="#pablo">View</a>
          </div>
        </>
      ),
    },
    {
      key: '2',
      message: (
        <>
          <Avatar.Group>
            <div className="avatar-info">
              <Title level={5}>Lỗi API</Title>
              <p>Lỗi API phát hiện ở module thanh toán</p>
            </div>
          </Avatar.Group>
        </>
      ),
      type: (
        <>
          <Button className="tag-badge">ERROR</Button>
        </>
      ),
      action: (
        <>
          <div className="ant-employed">
            <a href="#pablo">View</a>
          </div>
        </>
      ),
    },
    {
      key: '3',
      message: (
        <>
          <Avatar.Group>
            <div className="avatar-info">
              <Title level={5}>Cập nhật phiên bản</Title>
              <p>Cập nhật phiên bản mới v2.1.3</p>
            </div>
          </Avatar.Group>
        </>
      ),
      type: (
        <>
          <Button type="primary" className="tag-primary">SUCCESS</Button>
        </>
      ),
      action: (
        <>
          <div className="ant-employed">
            <a href="#pablo">View</a>
          </div>
        </>
      ),
    },
  ];

  const notificationColumns = [
    {
      title: 'THÔNG BÁO',
      dataIndex: 'message',
      key: 'message',
      width: '60%',
    },
    {
      title: 'LOẠI',
      dataIndex: 'type',
      key: 'type',
      width: '20%',
    },
    {
      title: 'HÀNH ĐỘNG',
      dataIndex: 'action',
      key: 'action',
      width: '20%',
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Cao':
        return 'red';
      case 'Trung bình':
        return 'yellow';
      case 'Thấp':
        return 'green';
      default:
        return 'gray';
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const sourceId = active.id;
    const overId = over.id;

    const sourceColumnId = Object.keys(tasks).find((key) =>
      tasks[key].some((task) => task.id === sourceId)
    );
    const destinationColumnId = Object.keys(tasks).includes(overId)
      ? overId
      : Object.keys(tasks).find((key) =>
          tasks[key].some((task) => task.id === overId)
        );

    if (!sourceColumnId || !destinationColumnId) return;

    if (sourceColumnId === destinationColumnId) {
      const column = [...tasks[sourceColumnId]];
      const sourceIndex = column.findIndex((task) => task.id === sourceId);
      const destinationIndex = column.findIndex((task) => task.id === overId);

      if (sourceIndex !== destinationIndex) {
        const [movedTask] = column.splice(sourceIndex, 1);
        column.splice(destinationIndex, 0, movedTask);

        setTasks({
          ...tasks,
          [sourceColumnId]: column,
        });
      }
    } else {
      const sourceColumn = [...tasks[sourceColumnId]];
      const destinationColumn = [...tasks[destinationColumnId]];
      const sourceIndex = sourceColumn.findIndex((task) => task.id === sourceId);
      const [movedTask] = sourceColumn.splice(sourceIndex, 1);

      const destinationIndex = destinationColumn.findIndex((task) => task.id === overId);
      if (destinationIndex === -1) {
        destinationColumn.push(movedTask);
      } else {
        destinationColumn.splice(destinationIndex, 0, movedTask);
      }

      setTasks({
        ...tasks,
        [sourceColumnId]: sourceColumn,
        [destinationColumnId]: destinationColumn,
      });
    }
  };

  const columns = {
    'todo': { name: 'Cần làm', color: '#1890ff' },
    'in-progress': { name: 'Đang thực hiện', color: '#fa8c16' },
    'done': { name: 'Hoàn thành', color: '#52c41a' },
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Row gutter={[24, 24]} className="mb-8">
        <Col span={12}>
          <Card
            title={<Title level={4} className="text-gray-800">Tóm tắt tình hình</Title>}
            className="shadow-lg rounded-lg bg-white"
            style={{ border: '1px solid #e8e8e8' }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title={<Text strong>Trạng thái hệ thống</Text>}
                  value={summaryData.systemStatus}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title={<Text strong>Thời gian hoạt động</Text>}
                  value={summaryData.uptime}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title={<Text strong>Nhiệm vụ hoàn thành</Text>}
                  value={summaryData.tasksCompleted}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title={<Text strong>Nhiệm vụ đang thực hiện</Text>}
                  value={summaryData.tasksInProgress}
                  valueStyle={{ color: '#fa8c16' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={<Title level={4} className="text-gray-800">Thông báo quan trọng</Title>}
            className="shadow-lg rounded-lg bg-white"
            style={{ border: '1px solid #e8e8e8' }}
          >
            <div className="table-responsive">
              <Table
                columns={notificationColumns}
                dataSource={notifications}
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>
      <div style={{paddingTop: '32px', paddingBottom: '32px'}}>
        <Card
        title={<Title level={4} className="text-gray-800">Bảng Kanban Nhiệm vụ</Title>}
        className="shadow-lg rounded-lg bg-white"
        style={{ border: '1px solid #e8e8e8' }}
        >
          <DndContext 
            sensors={sensors} 
            collisionDetection={closestCenter} 
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <Row gutter={[16, 16]}>
              {Object.entries(tasks).map(([columnId, taskList]) => (
                <Col span={8} key={columnId}>
                  <Card
                    title={
                      <Title level={5} style={{ color: columns[columnId].color, margin: 0 }}>
                        {columns[columnId].name} ({taskList.length})
                      </Title>
                    }
                    className="shadow-md"
                    style={{
                      background: '#fafafa',
                      border: '1px solid #e8e8e8',
                      borderRadius: '8px',
                    }}
                  >
                    <SortableContext items={taskList.map(task => task.id)} strategy={verticalListSortingStrategy}>
                      <DroppableColumn id={columnId} isOver={activeId && activeId !== columnId}>
                        {taskList.map((task) => (
                          <SortableTask
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            priority={task.priority}
                            getPriorityColor={getPriorityColor}
                          />
                        ))}
                      </DroppableColumn>
                    </SortableContext>
                  </Card>
                </Col>
              ))}
            </Row>
          </DndContext>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;