import { useState, useEffect } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { Input, Button, List } from "@components/ui";
import SingleForm from "@components/layouts/SingleForm";
import { createUser } from "@redux/actions";

const CorporateForm = (props) => {
  const [formData, setFormData] = useState({
    ...props.formData,
    name: "",
    profession: { name: "Student", value: 0 },
    country: { name: "India", value: 0 },
    email: props.formData.email || "",
    mobile: props.formData.mobile || "",
    password: props.formData.password,
  });

  const [fieldError, setFieldError] = useState({
    name: [],
    mobile: [],
    country: "",
    profession: "",
    members: "",
  });

  const handleChange = (e) => {
    let value;
    if (
      e.target.name === "members" ||
      e.target.name === "profession" ||
      e.target.name === "country"
    ) {
      value = e.selected;
    } else {
      value = e.target.value;
    }
    value = setFormData({ ...formData, [e.target.name]: value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();

    const { name, mobile, country, profession, members } = formData;

    setFieldError({
      name: [],
      mobile: [],
      country: "",
      profession: "",
      members: "",
    });

    //@TODO move validation to Input Field itshelf
    if (!name) {
      setFieldError((prev) => {
        return { ...prev, name: ["Name is require"] };
      });
    }

    if (name && name.length < 5) {
      setFieldError((prev) => {
        prev.name.push("Atleast 5 character require");
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

    if (!members) {
      setFieldError((prev) => {
        return {
          ...prev,
          members: "Members size must be selected",
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
        isIndividual: false,
        mobile: formData.mobile,
        country: formData.country.country,
        password: formData.password,
        profession: formData.profession,
      };

      let isSuccesful = await props.createUser(user);
      if (isSuccesful)
        Router.replace({
          pathname: "/signupFlow/DesktopAndroid/",
          query: { email: formData.email },
        });
    }

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

  useEffect(() => {
    if (!props.isUserCreated) return;
    Router.push({
      pathname: "/pricing",
      query: { type: "team" },
    });
  }, [props.isUserCreated]);

  return (
    <SingleForm
      footer={props.footer}
      heading="Set up your profile"
      onSubmit={onsubmit}
    >
      <Input
        label="Organisation"
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
        label="Choose Your Profession"
        name="profession"
        title="Select profession"
        items={props.profession.corporate}
        onChange={handleChange}
        errors={fieldError.profession}
        error={fieldHasError("profession")}
      />

      <List
        label="Members"
        name="members"
        title="Select size of organisation"
        items={props.members.map((len) => {
          return { ...len, name: len.members };
        })}
        onChange={handleChange}
        errors={fieldError.members}
        error={fieldHasError("members")}
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

export default connect(mapStateToProps, { createUser })(CorporateForm);
