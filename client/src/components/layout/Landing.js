import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Space, Typography } from "antd";

const { Title } = Typography;

const Landing = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div>
      <Typography>
        <Row style={{ marginTop: "40px" }}>
          <Col span={8}></Col>
          <Col span={8}>  <Title style={{textAlignLast : "center"}}>Computer Security</Title></Col>
        </Row>
      
        <Row style={{ marginTop: "40px" }}>
          <Col span={8}></Col>
          <Col span={8}>
            <Space direction="vertical" style={{ display: "flex" }}>
              <Button type="primary" block>
                <Link
                  to="/register"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                >
                  Register
                </Link>
              </Button>
              <Button type="primary" block>
                <Link
                  to="/login"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                >
                  Log In
                </Link>
              </Button>
            </Space>
          </Col>
          {/* <Col span={8}></Col> */}
        </Row>
      </Typography>
    </div>
  );
};

export default Landing;
