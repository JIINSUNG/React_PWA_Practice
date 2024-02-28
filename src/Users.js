import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
export default function Users() {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("online");

  // 페이지 접속시 jsonplaceholder에서 데이터를 가져와서 localStorage에 저장 후
  // 유저 정보를 표시해주는 페이지
  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((response) => {
        response.json().then((result) => {
          console.log("result", result);
          setData(result);
          localStorage.setItem("users", JSON.stringify(result));
        });
      })
      // jsonplaceholder에서 데이터를 가져오지 못할 경우 (인터넷 끊김 등)
      // 상태를 offline 모드로 변경 후 localStorage에 저장된 데이터를 사용
      .catch((error) => {
        setMode("offline");
        let collection = localStorage.getItem("users");
        setData(JSON.parse(collection));
      });
  }, []);

  return (
    <div>
      {mode === "offline" ? <div>오프라인 모드입니다</div> : null}
      <h1>Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address.street}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
