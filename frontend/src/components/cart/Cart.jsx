import React, { useMemo } from "react";
import {
  Card,
  Button,
  InputNumber,
  Typography,
  Space,
  Divider,
  Row,
  Col,
  Layout,
  Empty,
} from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CartItemCard from "./CartItemCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../actions/cartAction.js";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Content } = Layout;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  // Calculate total price
  const grossTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const handleCheckout = () => {
    navigate("/login?redirect=/shipping");
  };

  if (!cartItems?.length) {
    return (
      <Layout>
        <Content style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
          <Card>
            <Empty
              description="Your cart is empty"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <a href="/products">
                <Button type="primary">Go Shopping</Button>
              </a>
            </Empty>
          </Card>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Content style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
        <Card>
          <Title level={2} style={{ marginBottom: 24, textAlign: "center" }}>
            <Space>
              <ShoppingCartOutlined />
              Shopping Cart ({cartItems.length} items)
            </Space>
          </Title>

          {/* Header for Desktop */}
          <Row
            style={{
              fontWeight: 600,
              marginBottom: 16,
              display: "none",
              md: "flex",
              alignItems: "center",
            }}
            gutter={[16, 16]}
          >
            <Col span={12}>Product</Col>
            <Col span={6}>Quantity</Col>
            <Col span={6} style={{ textAlign: "right" }}>
              Subtotal
            </Col>
          </Row>

          <Divider />

          {/* Cart Items */}
          {cartItems.map((item) => (
            <div key={item.product} style={{ marginBottom: 24 }}>
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} md={12}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                </Col>

                <Col xs={24} md={6}>
                  <Space>
                    <Button
                      icon={<MinusOutlined />}
                      shape="circle"
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                      disabled={item.quantity <= 1}
                    />
                    <InputNumber
                      min={1}
                      max={99}
                      value={item.quantity}
                      readOnly
                      style={{ width: 60 }}
                    />
                    <Button
                      icon={<PlusOutlined />}
                      shape="circle"
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                      disabled={item.quantity >= 99}
                    />
                    <Button
                      icon={<DeleteOutlined />}
                      type="text"
                      danger
                      onClick={() => deleteCartItems(item.product)}
                    />
                  </Space>
                </Col>

                <Col xs={24} md={6} style={{ textAlign: "right" }}>
                  <Text strong style={{ fontSize: 16 }}>
                    ₹ {item.price * item.quantity}
                  </Text>
                </Col>
              </Row>
            </div>
          ))}

          <Divider />

          {/* Cart Summary */}
          <Row justify="end">
            <Col xs={24} md={8}>
              <Card style={{ backgroundColor: "#f5f5f5" }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Row justify="space-between" align="middle">
                    <Text strong>Gross Total:</Text>
                    <Text strong style={{ fontSize: 20 }}>
                      ₹ {grossTotal}
                    </Text>
                  </Row>
                  <Button
                    type="primary"
                    size="large"
                    block
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default Cart;
