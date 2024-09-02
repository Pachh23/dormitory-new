import { EditOutlined,DeleteOutlined,PlusOutlined } from "@ant-design/icons";
import { Link ,useNavigate} from "react-router-dom";
//import { Button, Col, Divider, Row, Space, Card } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
import { ListStudents, DeleteStudentsById } from "../../services/https/index";
import { StudentInterface } from "../../interfaces/Student";
import { Space, Table, Button, Col, Row, Divider, message,Card } from "antd";
import dayjs from "dayjs";

function Personal() {
  // ข้อมูลสำหรับตาราง
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const myId = localStorage.getItem("id");
  // ถ้ามีนักเรียนมากกว่า 1 คน คุณสามารถเลือกคนแรกเพื่อแสดงข้อมูลได้
  //const student = students[1] || {}; // เลือกนักเรียนคนแรก หรือเป็นอ็อบเจกต์ว่างถ้าไม่มีข้อมูล
    // ตรวจสอบว่ามีนักเรียนอย่างน้อยหนึ่งคน
    const columns: ColumnsType<StudentInterface> = [
      {
        title: "",
        render: (record) => (
          <>
            {myId == record?.ID ? (
              <></>
            ) : (
              <Button
                type="dashed"
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteStudentsById(record.ID)}
              ></Button>
            )}
          </>
        ),
      },
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
            <div className="card"style={{ marginTop: 10, padding: 0 }}>
        <Card style={{color: '#001d66'}} type="inner"  title={<span style={{ color: '#061178' }}>1. ข้อมูลส่วนตัวนักศึกษา</span>} >
          <table className="info-table ">
            <tbody>
              <tr>
              <td style={{ backgroundColor: '#f0f0f0' }}>ชื่อ</td>
                <td>{record.first_name}</td>
                <td style={{ backgroundColor: '#f0f0f0' }}>นามสกุล</td>
                <td>{record.last_name}</td>
              </tr>
              <tr>
                <td>รหัสประชาชน</td>
                <td></td>
                <td>สำนักวิชา</td>
                <td>{record.major}</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f0f0f0' }}>รหัสนักศึกษา</td>
                <td>{record.student_id}</td>
                <td style={{ backgroundColor: '#f0f0f0' }}>วันเกิด</td>
                <td>{" "}{dayjs(record.birthday).format("DD MMM YYYY")}</td>
              </tr>
              <tr>
                <td>ชั้นปี</td>
                <td>{record.year}</td>
                <td>เพศ</td>
                <td>{record?.gender?.gender}</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#f0f0f0' }}>โรคประจำตัว (ถ้ามี)</td>
                <td colSpan={3}></td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>    
          </>
        ),
        colSpan: 6, // Combine the next columns into this one
      },
      {
        title: "",
        render: (record) => (
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => navigate(`/student/edit/${record.ID}`)}
          >
            แก้ไขข้อมูล
          </Button>
        ),
        colSpan: 0, // Skipped since it's combined into the previous column
      },
    ];
  const deleteStudentsById = async (id: string) => {
    let res = await DeleteStudentsById(id);
    if (res.status == 200) {
      messageApi.open({
        type: "success",
        content: res.data.message,
      });
      await getStudents();
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };
    const getStudents = async () => {
      let res = await ListStudents();
      if (res.status == 200) {
        setStudents(res.data);
      } else {
        setStudents([]);
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }
    };
  
    useEffect(() => {
      getStudents();
    }, []);

    return (
      <>
        {contextHolder}
        <Row>
          <Col span={12}>
            <h2>ข้อมูลนักศึกษา</h2>
          </Col>
          <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
            <Space>
              <Link to="/student/create">
                <Button type="primary" icon={<PlusOutlined />}>
                  สร้างข้อมูล
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
            dataSource={students}
            style={{ width: "100%", overflow: "scroll"  }}
            pagination={false}
        />
        </div>
      </>
    );
  }

export default Personal;
