import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
import { ListStudents, ListPersonal } from "../../services/https/index";
import { PersonalInterface } from "../../interfaces/Personal";
import { StudentInterface } from "../../interfaces/Student";
import { Space, Table, Button, Col, Row, Divider, message, Card } from "antd";

interface CombinedData extends PersonalInterface, StudentInterface {} // Combining both interfaces

function Personal() {
  const navigate = useNavigate();
  const [data, setData] = useState<CombinedData[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const getData = async () => {
    try {
      const [personalRes, studentRes] = await Promise.all([
        ListPersonal(),
        ListStudents(),
      ]);

      if (personalRes.status === 200 && studentRes.status === 200) {
        // Combine data from both responses
        const combinedData = personalRes.data.map((personal: PersonalInterface, index: number) => ({
          ...personal,
          ...studentRes.data[index], // Assuming both lists are in the same order
        }));

        setData(combinedData);
      } else {
        messageApi.open({
          type: "error",
          content: "Error fetching data",
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Failed to fetch data",
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns: ColumnsType<CombinedData> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "ข้อมูลนักศึกษา",
      key: "student_info",
      render: (record) => (
        <>
          <div className="card" style={{ marginTop: 10, padding: 0 }}>
            <Card
              style={{ color: "#001d66" }}
              type="inner"
              title={<span style={{ color: "#061178" }}>1. ข้อมูลส่วนตัวนักศึกษา</span>}
            >
              <table className="info-table">
                <tbody>
                  <tr>
                    <td style={{ backgroundColor: "#f0f0f0" }}>ชื่อเล่น</td>
                    <td>{record.nickname}</td>
                    <td style={{ backgroundColor: "#f0f0f0" }}>วัน/เดือน/ปีเกิด</td>
                    <td>{record.birthday}</td>
                  </tr>
                  <tr>
                    <td>รหัสประประชาชน</td>
                    <td>{record.citizen_id}</td>
                    <td>หมายเลขโทรศัพท์มือถือ</td>
                    <td>{record.phone}</td>
                  </tr>
                  <tr>
                    <td style={{ backgroundColor: "#f0f0f0" }}>สัญชาติ</td>
                    <td>{record.nationality}</td>
                    <td style={{ backgroundColor: "#f0f0f0" }}>เชื้อชาติ</td>
                    <td>{record.race}</td>
                  </tr>
                  <tr>
                    <td>ศาสนา</td>
                    <td>{record.religion}</td>
                    <td>กรุ๊ปเลือด</td>
                    <td>{record.blood_group}</td>
                  </tr>
                  <tr>
                    <td style={{ backgroundColor: "#f0f0f0" }}>โรคประจำตัว (ถ้ามี)</td>
                    <td colSpan={3}>{record.student_id}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>
        </>
      ),
      colSpan: 6, // Combine columns
    },
    /*
    {
      title: "",
      render: (record) => (
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          onClick={() => navigate(`/personal/edit/${record.ID}`)}
        >
          แก้ไขข้อมูล
        </Button>
      ),
      
      colSpan: 0,
    },
    */
  ];

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>ข้อมูลนักศึกษา</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            <Link to="/personal/create">
              <Button type="primary" icon={<EditOutlined />}>
                เปลี่ยนแปลงข้อมูล
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <Divider />

      <div style={{ marginTop: -10 }}>
        <Table
          rowKey="ID"
          columns={columns}
          dataSource={data}
          style={{ width: "100%", overflow: "scroll" }}
          pagination={false}
        />
      </div>
    </>
  );
}

export default Personal;
