import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails } from "../../actions/productAction.js";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Carousel,
  Card,
  Typography,
  Rate,
  Input,
  Button,
  Space,
  Divider,
  Row,
  Col,
  message,
  Image,
} from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  CommentOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ReviewCard from "./ReviewCard.jsx";
import Loader from "../layout/Loader/Loader.jsx";
import MetaData from "../layout/MetaData.jsx";

const { Title, Text } = Typography;

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [readMore, setReadMore] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  // Toggle Description Read More or Show Less
  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const handleQuantityChange = (value) => {
    if (value <= product.Stock && value >= 1) {
      setQuantity(value);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.Stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    message.success({
      content: "Item Added to Cart",
    });
  };

  useEffect(() => {
    if (error) {
      messageApi.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, messageApi]);

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(product?.price || 0);

  if (loading) return <Loader />;
  if (!product) return null;

  return (
    <>
      {contextHolder}
      <MetaData title={`${product.name} | Ecommerce`} />
      <div style={{ padding: "24px", background: "white", color: "black" }}>
        <Card>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <div
                style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}
              >
                <Image.PreviewGroup>
                  <Carousel autoplay>
                    {product.images &&
                      product.images.map((item, i) => (
                        <div key={item.url}>
                          <Image
                            src={item.url}
                            alt={`${i} slide`}
                            style={{
                              width: "100%",
                              height: "auto",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      ))}
                  </Carousel>
                </Image.PreviewGroup>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                <Title level={3}>{product.name}</Title>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Product ID: {product._id}
                </Text>
                <Space>
                  <Rate
                    allowHalf
                    disabled
                    defaultValue={product.ratings}
                    style={{ fontSize: "14px" }}
                  />
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    ({product.ratings}/5) • {product.numOfReviews}{" "}
                    {product.numOfReviews <= 1 ? "review" : "reviews"}
                  </Text>
                </Space>
                <Title level={4} style={{ margin: "8px 0" }}>
                  {formattedPrice}
                </Title>
                <Text
                  style={{
                    fontSize: "14px",
                    color: product.Stock < 1 ? "#ff4d4f" : "#1777ff",
                  }}
                >
                  {product.Stock < 1 ? "Out of Stock" : "In Stock"}
                </Text>
                <Space size="large" style={{ marginTop: "16px" }}>
                  <Space.Compact>
                    <Button
                      onClick={decreaseQuantity}
                      icon={<MinusOutlined />}
                    />
                    <Input
                      style={{ width: "50px", textAlign: "center" }}
                      value={quantity}
                    />
                    <Button
                      onClick={increaseQuantity}
                      icon={<PlusOutlined />}
                    />
                  </Space.Compact>
                  <Button
                    onClick={addCartHandler}
                    type="primary"
                    style={{ borderColor: "royalblue" }}
                  >
                    Add to Cart
                  </Button>
                </Space>
                <Divider />
                <Title level={5}>Game Description</Title>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {readMore
                    ? product.description.slice(0, 190)
                    : product.description}
                  <span onClick={toggleReadMore} style={{ color: "royalblue" }}>
                    {readMore ? "...read more" : "...show less"}
                  </span>
                </Text>
                <Button
                  icon={<CommentOutlined />}
                  type="primary"
                  style={{
                    borderColor: "#1777ff",
                    width: "100%",
                  }}
                >
                  Submit Review
                </Button>
              </Space>
            </Col>
          </Row>
          <Divider />
          <Title level={4}>
            Reviews <Text type="secondary">({product.numOfReviews})</Text>
          </Title>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))
          ) : (
            <Text type="secondary" style={{ fontSize: "14px" }}>
              No Reviews yet
            </Text>
          )}
        </Card>
      </div>
    </>
  );
};

export default ProductDetails;
