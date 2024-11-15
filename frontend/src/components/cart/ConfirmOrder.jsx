import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Row, Col, Typography, Divider, Space } from "antd";
import { CheckCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import CheckoutSteps from "../cart/CheckoutSteps.jsx";
import MetaData from "../layout/MetaData";

const { Title, Text } = Typography;

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  return (
    <div style={{ padding: "20px" }}>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <Card>
        <Title level={4}>{user.name}'s Order Confirmation</Title>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Card type="inner" title="Shipping Info" bordered>
            <Text>
              <b>Name:</b> {user.name}
            </Text>
            <br />
            <Text>
              <b>Phone:</b> {shippingInfo.phoneNo}
            </Text>
            <br />
            <Text>
              <b>Address:</b> {address}
            </Text>
          </Card>

          <Card type="inner" title="Your Cart Items" bordered>
            {cartItems &&
              cartItems.map((item) => (
                <Row
                  key={item.product}
                  gutter={16}
                  align="middle"
                  style={{ marginBottom: "10px" }}
                >
                  <Col span={4}>
                    <img
                      src={item.image}
                      alt={item.product}
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col span={14}>
                    <Link to={`/product/${item.product}`}>
                      <Text>{item.name}</Text>
                    </Link>
                  </Col>
                  <Col span={6}>
                    <Text>
                      {item.quantity} x Rs. {item.price} ={" "}
                      <b>Rs. {item.price * item.quantity}</b>
                    </Text>
                  </Col>
                </Row>
              ))}
          </Card>

          <Card type="inner" title="Order Summary" bordered>
            <Row justify="space-between">
              <Col>
                <Text>Subtotal</Text>
              </Col>
              <Col>
                <Text>Rs. {subtotal}</Text>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <Text>Shipping Charges</Text>
              </Col>
              <Col>
                <Text>Rs. {shippingCharges}</Text>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <Text>GST (18%)</Text>
              </Col>
              <Col>
                <Text>Rs. {tax.toFixed(2)}</Text>
              </Col>
            </Row>
            <Divider />
            <Row justify="space-between">
              <Col>
                <Text strong>Total</Text>
              </Col>
              <Col>
                <Text strong>Rs. {totalPrice.toFixed(2)}</Text>
              </Col>
            </Row>
          </Card>
        </Space>
      </Card>
    </div>
  );
};

export default ConfirmOrder;
