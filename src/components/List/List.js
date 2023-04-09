import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import { DatePicker } from "antd";
import { fetchAllPost } from "../../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
const List = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.reducer.data);
  const isLoading = useSelector((state) => state.reducer.isLoading);
  const [date1, setDate1] = useState(0);
  const [date2, setDate2] = useState(0);

  const onChange1 = (date, dateString) => {
    setDate1(date);
  };

  const onChange2 = (date, dateString) => {
    setDate2(date);
  };

  const loadData = () => {
    dispatch(fetchAllPost());
  };

  //Убрал принудительную загрузки при рендере, чтобы показать, что диапазон дат скрыт при отсутствии данных
  useEffect(() => {
    // dispatch(fetchAllPost());
  }, [users]);

  const renderUser = (item) => {
    let dateNow = new Date(item.date);
    let startDate1 = Date.parse(date1);
    let endDate = Date.parse(date2);

    console.log("curent---<", item.date);
    console.log("start---<", startDate1);
    console.log("end---<", endDate);

    if (startDate1 == 946674000000 || endDate == 946674000000) {
      return (
        <div
          className="list_itemuser"
          style={{ backgroundColor: item.color }}
          key={item.id}
        >
          <h3>{item.title}</h3>
          <p> {item.body}</p>
          <p>{dateNow.toDateString()}</p>
        </div>
      );
    } else if (item.date >= startDate1 && item.date < endDate) {
      return (
        <div
          className="list_itemuser"
          style={{ backgroundColor: item.color }}
          key={item.id}
        >
          <h3>{item.title}</h3>
          <p> {item.body}</p>
          <p>{dateNow.toDateString()}</p>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="list_container">
        {users.length !== 0 ? (
          <div className="list_data">
            <DatePicker
              onChange={onChange1}
              defaultValue={dayjs("00:00:00", "HH:mm:ss")}
            />

            <DatePicker
              onChange={onChange2}
              defaultValue={dayjs("23:59:59", "HH:mm:ss")}
            />
          </div>
        ) : (
          <>
            <p> "ничего не найдено или загрузите принудительно"</p>
            <button onClick={loadData}>Load users</button>
          </>
        )}

        {isLoading ? (
          <Spin />
        ) : (
          users.map((item) => {
            return renderUser(item);
          })
        )}
      </div>
    </div>
  );
};

export default List;
