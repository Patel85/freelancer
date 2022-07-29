import React from "react";
import { Input, Text, List, Button } from "@components/ui";
import SingleForm from "@components/layouts/SingleForm";

let PersonalInfoForm = () => {
  return (
    <SingleForm
      heading="Personal Information"
      onSubmit={console.log("submitted")}
    >
      <Text>Use a permanent address where you can receive mail.</Text>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <Input
            label="First Name"
            type="text"
            name="first-name"
            id="first-name"
            autoComplete="given-name"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <Input
            label="Last Name"
            type="text"
            name="last-name"
            id="last-name"
            autoComplete="family-name"
          />
        </div>
      </div>

      <Input
        label="Email Address"
        type="text"
        name="email-address"
        id="email-address"
        autoComplete="email"
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />

      <List
        label="Country / Region"
        id="country"
        name="country"
        autoComplete="country"
        value="INDIA"
        items={["INDIA", "COUNTRY0", "COUNTRY1", "COUNTRY2"]}
        onChange={(e) => console.log(e)}
      />

      <Input
        label="Street address"
        type="text"
        name="street-address"
        id="street-address"
        autoComplete="street-address"
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />

      <Input
        label="City"
        type="text"
        name="city"
        id="city"
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />

      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <Input
            label="State / Province"
            type="text"
            name="state"
            id="state"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <Input
            label="ZIP / Postal"
            type="text"
            name="postal-code"
            id="postal-code"
            autoComplete="postal-code"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      <Button type="submit" variant="primary" className="w-full mt-8">
        Create Account
      </Button>
    </SingleForm>
  );
};

export default PersonalInfoForm;
