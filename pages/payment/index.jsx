import React from "react";
import { Input, Text, List, Button } from "@components/ui";
import SingleForm from "@components/layouts/SingleForm";

function Payment() {
  return (
    <SingleForm
      heading="Payment"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Text className="mb-8">
        Use a permanent address where you can receive mail.
      </Text>
      <Input
        label="Name on card"
        type="text"
        name="cc-name"
        id="cc-name"
        autoComplete="given-name"
      />

      <Input
        label="Email"
        type="email"
        name="cc-email"
        id="cc-email"
        autoComplete="given-email"
      />

      <List
        label="Country / Region"
        id="country"
        name="country"
        autoComplete="country"
        value="INDIA"
        items={["INDIA", "COUNTRY0", "COUNTRY1", "COUNTRY2"]}
        onChange={(value) => console.log(value)}
      />

      <Input
        label="Card Number"
        type="text"
        name="cardnumber"
        inputMode="numeric"
        placeholder="1234 1234 1234 1234"
        value=""
      />

      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <Input
            label="Expiration Date"
            autoComplete="cc-exp"
            type="text"
            name="exp-date"
            inputMode="numeric"
            placeholder="MM / YY"
            value=""
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <Input
            label="CVC"
            type="text"
            name="cvc"
            inputMode="numeric"
            placeholder="CVC"
            value=""
          />
        </div>
      </div>

      <Button type="submit" variant="primary" className="w-full mt-8">
        Pay
      </Button>
    </SingleForm>
  );
}

export default Payment;
