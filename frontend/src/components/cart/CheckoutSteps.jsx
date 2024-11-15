import React from "react";
import { Steps } from "antd";

const CheckoutSteps = ({ activeStep }) => {
  return (
    <div className="steps-container">
      <Steps
        direction="horizontal"
        size="small"
        current={activeStep}
        items={[
          {
            title: "Shipping Details",
          },
          {
            title: "Confirm Order",
          },
          {
            title: "Payment",
          },
        ]}
      />
    </div>
  );
};

export default CheckoutSteps;
