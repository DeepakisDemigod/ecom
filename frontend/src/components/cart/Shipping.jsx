import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction.js";
import MetaData from "../layout/MetaData.jsx";
import { Country, State } from "country-state-city";
import {
  UserOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import {
  Input,
  Button,
  Form,
  Typography,
  message,
  Select,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps.jsx";

const { Title } = Typography;
const { Option } = Select;

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [pinCode, setPincode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const shippingSubmit = () => {
    if (phoneNo.length !== 10) {
      message.error("Phone number should be 10 digits");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    message.success("Shipping Details Saved");
    navigate("/order/confirm");
  };

  return (
    <div style={{ padding: "20px" }}>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0} />
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Shipping Details
      </Title>

      <Form layout="vertical" onFinish={shippingSubmit}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item label="Address" required>
              <Input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                prefix={<EnvironmentOutlined />}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="City" required>
              <Input
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                prefix={<UserOutlined />}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Pin Code" required>
              <Input
                type="number"
                placeholder="Pin Code"
                value={pinCode}
                onChange={(e) => setPincode(e.target.value)}
                prefix={<FlagOutlined />}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Phone Number" required>
              <Input
                type="number"
                placeholder="Phone Number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                prefix={<PhoneOutlined />}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Country" required>
              <Select
                placeholder="Select Country"
                value={country}
                onChange={(value) => setCountry(value)}
                showSearch
              >
                {Country.getAllCountries().map((item) => (
                  <Option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {country && (
            <Col xs={24} md={12}>
              <Form.Item label="State" required>
                <Select
                  placeholder="Select State"
                  value={state}
                  onChange={(value) => setState(value)}
                  showSearch
                >
                  {State.getStatesOfCountry(country).map((item) => (
                    <Option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}

          <Col xs={24} style={{ textAlign: "center" }}>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={!state}>
                Continue
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Shipping;
