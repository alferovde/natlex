import React, { useEffect, useState } from "react";
import { fetchAllPost, editUser, deleteUser } from "../../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Modal, Select } from "antd";
const Settings = () => {
  const users = useSelector((state) => state.reducer.data);
  const [currentUser, setCurrentUser] = useState({});
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (data) => {
    setIsModalOpen(true);
    setCurrentUser({
      ...data,
      date: new Date(data.date).toString(),
    });
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);

    setCurrentUser({ ...currentUser, color: value });
  };

  const handleOk = () => {
    setIsModalOpen(false);
    let newDate = new Date(currentUser.date).getTime();

    dispatch(editUser({ ...currentUser, date: newDate }));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteUserHandler = (item) => {
    dispatch(deleteUser(item.id));
  };

  useEffect(() => {}, [users]);

  const renderUser = (item) => {
    let dateNow = new Date(item.date);

    return (
      <div
        className="list_itemuser"
        style={{ backgroundColor: item.color }}
        key={item.id}
      >
        <h3>{item.title}</h3>
        <p> {item.body}</p>
        <p>{dateNow.toDateString()}</p>
        <Button type="primary" onClick={() => showModal(item)}>
          Редактировать
        </Button>
        <Button type="primary" danger onClick={() => deleteUserHandler(item)}>
          Удалить
        </Button>
      </div>
    );
  };

  return (
    <div>
      <h1>Настройки</h1>
      {users.map((item) => {
        return renderUser(item);
      })}
      <Modal
        title={`user ID - ${currentUser.id}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Input">
            <Input
              value={currentUser.title}
              onChange={(e) => {
                setCurrentUser({ ...currentUser, title: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item label="TextArea">
            <TextArea
              rows={4}
              value={currentUser.body}
              onChange={(e) => {
                setCurrentUser({ ...currentUser, body: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="TextArea">
            <Select
              defaultValue="white"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "red", label: "red" },
                { value: "blue", label: "blue" },
                { value: "green", label: "green" },
                { value: "white", label: "white" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Settings;
