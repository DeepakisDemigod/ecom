import { useEffect, useState } from "react";
import { ShoppingOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Skeleton, Row, Col, Alert, Typography } from "antd";
import { clearErrors, getProduct } from "../../actions/productAction";

const { Meta } = Card;
const { Title, Paragraph } = Typography;

const ProductCard = ({ product }) => (
  <Card
    hoverable
    cover={
      <img
        alt={product.name}
        src={product.images[0].url || "/api/placeholder/300/200"}
        style={{ height: "150px", objectFit: "cover" }}
      />
    }
    style={{ height: "100%" }}
  >
    <Meta
      title={<Typography.Text ellipsis>{product.name}</Typography.Text>}
      description={
        <Typography.Text type="secondary">₹{product.price}</Typography.Text>
      }
    />
    <Link to={`/product/${product._id}`}>
      <Button type="link" block className="mt-2">
        View Details
      </Button>
    </Link>
  </Card>
);

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { loading, error, products } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  const handleShopNowClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/products");
    }, 1500);
  };
  const handleSignInClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          backgroundImage: "url('./bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "50px 20px",
          marginBottom: 32,
          opacity: 0.99,
        }}
      >
        <Title
          level={2}
          style={{ color: "#fff", textAlign: "left", fontWeight: "bold" }}
        >
          welcome back in game
        </Title>
        {isAuthenticated ? (
          <div>
            <Paragraph style={{ color: "#fff" }}>
              games made <span style={{ color: "cyan" }}>affordable</span> to
              everyone. Shop now for exclusive deals on your favorite games.
            </Paragraph>
            <Button
              type="primary"
              icon={<ShoppingOutlined />}
              onClick={handleShopNowClick}
              loading={isLoading}
            >
              {isLoading ? "Loading..." : "Shop Now"}
            </Button>
          </div>
        ) : (
          <div>
            <Paragraph style={{ color: "#fff" }}>
              Login or Register to start shopping.{" "}
            </Paragraph>
            <Button
              type="primary"
              icon={<LockOutlined />}
              onClick={handleSignInClick}
              loading={isLoading}
            >
              {isLoading ? "Loading..." : "Register or Login to Get Started"}
            </Button>
          </div>
        )}
      </div>

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {/*    <Title
        level={3}
        style={{ marginBottom: 16 }}
      >
        Featured Products
      </Title>

      <Row
        className='mx-4'
        gutter={[16, 16]}
      >
        {loading
          ? [...Array(4)].map((_, index) => (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={6}
                key={index}
              >
                <Card style={{ width: '100%', height: '100%' }}>
                  <Skeleton
                    loading={true}
                    active
                    avatar
                  >
                    <Meta
                      title='Loading...'
                      description='Please wait...'
                    />
                  </Skeleton>
                </Card>
              </Col>
            ))
          : products?.map(product => (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={6}
                key={product._id}
              >
                <ProductCard product={product} />
              </Col>
            ))}
      </Row>  */}
    </div>
  );
};

export default Home;
