import { Space, Button, Col, Row, Divider, Form, Input, Card, message, DatePicker, InputNumber, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { PersonalInterface } from "../../../interfaces/Personal";
import { CreatePersonal } from "../../../services/https";
import { useNavigate, Link } from "react-router-dom";

function PersonalCreate() {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const onFinish = async (values: PersonalInterface) => {
		try {
			const res = await CreatePersonal(values);
			if (res.status === 201) {
					messageApi.open({
						type: "success",
						content: "บันทึกข้อมูลสำเร็จ",
						//content: res.data.message,
					});
					setTimeout(() => navigate("/personal"), 2000);
			} else {
					messageApi.open({
						type: "error",
						content: "เกิดข้อผิดพลาด",
						//content: res.data.error,
					});
			}
		} catch (error) {
				messageApi.open({
					type: "error",
					content: "An unexpected error occurred.",
				});
		}
	};
	return (
	<div>
		{contextHolder}
			<h2 style={{color: '#1f1f1f'}}>เปลี่ยนแปลงข้อมูลส่วนตัว</h2>
			<Card>
				<Form 
					labelCol={{ span: 10 }}
					name="basic"
					layout="horizontal"
					onFinish={onFinish}
					autoComplete="off"
					style={{ maxWidth: 1000 }}
				>
					<h4 style={{ marginTop: -10, marginBottom: -10,color: '#061178' }}>1. ข้อมูลส่วนตัวนักศึกษา</h4>
					<Divider/>
						<Row gutter={[16, 0]}>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="ชื่อเล่น"
									/*{['address', 'house_no']}*/
									name="nickname"
									rules={[{ required: true, message: "กรุณากรอกชื่อเล่น" }]}
								> 
								<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="รหัสบัตรประชาชน"
									name="citizen_id"
									rules={[{ required: true, message: "กรุณากรอกรหัสบัตรประชาชน" },
													{pattern: /^[0-9]{13}$/, message: "กรุณากรอกรหัสบัตรประชาชนที่ถูกต้อง (13 หลัก)" }]}
									>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="หมายเลขโทรศัพท์มือถือ"
									name="phone"
									rules={[{ required: true, message: "กรุณากรอกหมายเลขโทรศัพท์มือถือ" },
												{pattern: /^[0-9]{10}$/, message: "กรุณากรอกหมายเลขโทรศัพท์มือถือ (10 หลัก)" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="สัญชาติ"
									name="nationality"
									rules={[{ required: true, message: "กรุณากรอกสัญชาติ" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="เชื้อชาติ"
									name="race"
									rules={[{ required: true, message: "กรุณากรอกเชื้อชาติ" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="ศาสนา"
									name="religion"
									rules={[{ required: true, message: "กรุณากรอกศาสนา" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="กลุ่มเลือด"
									name="blood_group"
									rules={[{ required: true, message: "กรุณากรอกกลุ่มเลือด" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
										label="โรคประจำตัว(ถ้ามี)"
										name="UD"
								>
									<Input />
								</Form.Item>
							</Col>
					<Divider />
				
							
						</Row>
							<Row justify="end">
								<Col style={{ marginTop: "40px" }}>
									<Form.Item>
										<Space>
											<Button
												type="primary"
												htmlType="submit"
												icon={<EditOutlined />}
												style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
												>
												อัปเดตข้อมูล
											</Button>
												<Link to="/personal">
													<Button htmlType="button" style={{ marginRight: "0px" }}>
														ปิด
													</Button>
												</Link>
										</Space>
									</Form.Item>
								</Col>
							</Row>
						</Form>
				</Card>
  	</div>
  );
}

export default PersonalCreate;