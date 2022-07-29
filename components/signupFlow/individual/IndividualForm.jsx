import { useState, useEffect } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { Input, Button, List } from "@components/ui";
import SingleForm from "@components/layouts/SingleForm";
import { createUser } from "@redux/actions";
import { TailSpin } from "react-loader-spinner";
import Loader from "@components/ui/Loader/Loader";

const IndividualForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: props.formData.name || "",
    profession: props.formData.profession || "",
    country: props.formData.country || "",
    email: props.formData.email || "",
    mobile: props.formData.mobile || "",
    password: props.formData.password || "",
  });

  const [fieldError, setFieldError] = useState({
    name: [],
    mobile: [],
    country: "",
    profession: "",
  });

  useEffect(() => {
    if (!props.isUserCreated) return;

    Router.push({
      pathname: "/pricing",
      query: { type: "individual" },
    });
  }, [props.isUserCreated]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();

    const { name, mobile, country, profession } = formData;

    setFieldError({
      name: [],
      mobile: [],
      country: "",
      profession: "",
    });

    //@TODO move validation to Input Field itshelf
    if (!name) {
      setFieldError((prev) => {
        setLoading();
        return { ...prev, name: ["Name is required"] };
      });
    }

    if (name && name.length < 5) {
      setFieldError((prev) => {
        prev.name.push("Atleast 5 characters required");
        return { ...prev };
      });
    }

    if (!mobile && mobile.length > 15) {
      setFieldError((prev) => {
        return {
          ...prev,
          mobile: ["Mobile is required and max character is 15"],
        };
      });
    }

    var tenDigit = /(?=.*?[0-9]{10})/;
    if (!tenDigit.test(mobile)) {
      setFieldError((prev) => {
        prev.mobile.push("10 digit number are applicable");
        return {
          ...prev,
        };
      });
    }

    if (!country?.country) {
      setFieldError((prev) => {
        return {
          ...prev,
          country: "Country must be selected",
        };
      });
    }

    if (!profession) {
      setFieldError((prev) => {
        return {
          ...prev,
          profession: "Profession must be selected",
        };
      });
    }

    if (
      name &&
      name.length > 4 &&
      tenDigit.test(mobile) &&
      profession &&
      country?.country
    ) {
      let user = {
        name: formData.name,
        members: formData.members,
        email: formData.email,
        isIndividual: true,
        mobile: formData.mobile,
        country: formData.country.country,
        password: formData.password,
        profession: formData.profession,
      };

      setLoading(true);
      let isSuccesful = await props.createUser(user);
      //setIsLoading(false);
      if (isSuccesful) {
        setLoading(false);
        Router.replace({
          pathname: "/confirm",
          query: { email: formData.email },
        });
      }
    }
    // setLoading(false);

    return false;
  };

  //@TODO move this logic to utils file
  const fieldHasError = (field) => {
    if (Array.isArray(fieldError[field]) && fieldError[field].length > 0) {
      return true;
    }

    if (
      (typeof fieldError[field] === "string" ||
        fieldError[field] instanceof String) &&
      !!fieldError[field]
    ) {
      return true;
    }

    return false;
  };

  return (
    <>
      {/* <TailSpin color="#52acf9" className="loader" /> */}
      {loading ? <Loader /> : null}

      <SingleForm
        footer={props.footer}
        heading="Set up your profile"
        onSubmit={onsubmit}
      >
        <Input
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
          errors={fieldError.name}
          error={fieldHasError("name")}
        />

        <Input
          label="Mobile Number"
          type="tel"
          name="mobile"
          pattern="[0-9]{10}"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="989XXXX989"
          required
          errors={fieldError.mobile}
          error={fieldHasError("mobile")}
        />

        <List
          label="Choose your profession"
          name="profession"
          title="Select profession"
          items={props.profession.individual}
          onChange={handleChange}
          errors={fieldError.profession}
          error={fieldHasError("profession")}
        />

        <List
          label="Country"
          name="country"
          title="Select country"
          items={props.countries.map((c) => {
            return { ...c, name: c.country };
          })}
          onChange={handleChange}
          errors={fieldError.country}
          error={fieldHasError("country")}
        />

        <Button type="submit" variant="primary" className="w-full mt-8">
          Create Account
        </Button>
      </SingleForm>
    </>
  );
};

const mapStateToProps = (state) => ({
  profession: state.Global.profession,
  members: state.Global.members,
  countries: state.Global.countries,
  isAuthenticated: state.Auth.isAuthenticated,
  isLoading: state.Auth.isLoading,
  isUserCreated: state.Auth.isUserCreated,
});
export default connect(mapStateToProps, { createUser })(IndividualForm);
