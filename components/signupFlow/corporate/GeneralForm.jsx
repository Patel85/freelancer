import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { PATH } from "@components/Path";
// import { ProffesionList } from "@redux/actions";
import cookieCutter from "cookie-cutter";
import SingleForm from "@components/layouts/SingleForm";
import { Input, List, Button, TextArea } from "@components/ui";

const CorporateForm = (props) => {
  const [formData, setFormData] = useState({
    email: props.formData.email,
    mobile: props.formData.mobile,
    password: props.formData.password,
    name: "",
    age: "",
    photo: "",
    resumefile: "",
    proffesion: "",
    linkedin: "",
    facebook: "",
    tellme: "",
    city: "",
    country: "",
  });

  const [proffesiondata, setproffesiondata] = useState(["Student", "Teacher"]);
  const [loader, setLoader] = useState(false);
  useEffect(async () => {
    // const lsit = [ProffesionList()];
    let lsit = []
    lsit
      .then((res) => {
        console.log("res", res.data);
        setproffesiondata(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangePhoto = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleChangeFile = (e) => {
    let a = e.target.files[0];
    var form = new FormData();
    console.log(form.append("asd", a));
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  // const onsubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };

  const onsubmit = (e) => {
    e.preventDefault();
    loaderset(true);
    // console.log('data',formData);
    let form_data = new FormData();
    form_data.append("email", formData.email);
    form_data.append("username", formData.name);
    form_data.append("mobile", formData.mobile);
    form_data.append("age", formData.age);
    form_data.append("photo", formData.photo);
    form_data.append("resumefile", formData.resumefile);
    form_data.append("proffesion", formData.proffesion);
    form_data.append("linkedin", formData.linkedin);
    form_data.append("facebook", formData.facebook);
    form_data.append("tellme", formData.tellme);
    form_data.append("city", formData.city);
    form_data.append("country", formData.country);
    form_data.append("password", formData.password);

    const csrfToken = cookieCutter.get("csrftoken");
    const config = {
      headers: {
        // "Content-Type" : "application/json",
        "X-CSRFToken": csrfToken,
        "content-type": "multipart/form-data",
      },
    };
    let url = `${PATH}/business/add-business-account/`;
    // Axios.post(url, form_data, config)
    //   .then((res) => {
    //     console.log("ress", res.data);
    //     if (res.data.status == true) {
    //       Modal.success({
    //         content: res.data.message,
    //         onOk() {
    //           Router.push(`/signin`);
    //         },
    //       });
    //     }
    //     if (res.data.status == false) {
    //       Modal.success({
    //         content: res.data.message,
    //         onOk() {
    //           window.location.reload();
    //         },
    //       });
    //     }
    //     setFormData({
    //       email: "",
    //       name: "",
    //       age: "",
    //       photo: "",
    //       resumefile: "",
    //       proffesion: "",
    //       linkedin: "",
    //       facebook: "",
    //       tellme: "",
    //       city: "",
    //       country: "",
    //       password: "",
    //     });

    //     // Modal.success({
    //     //   content: res.data.message,
    //     // });

    //     loaderset(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     loaderset(false);
    //   });
  };

  const loaderset = (loader) => {
    setLoader(loader);
  };

  return (
      <section>
        <Head>
          <title>Expert - Statsout</title>
          <link rel="icon" href="/favicon.svg" />
        </Head>

        <SingleForm heading="Sign Up" onSubmit={onsubmit}>
          <ToastContainer />
          <Input
            label="Name"
            type="text"
            name="name"
            value={formData.about}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <List
            label="Choose Your Profession"
            name="profession"
            value={proffesiondata[0]}
            items={proffesiondata}
            onChange={handleChange}
          />

          <Input
            label="Photo"
            type="file"
            name="photo"
            onChange={handleChangePhoto}
            id="inputGroupFile01"
          />

          <Input
            label="Choose File"
            type="file"
            name="resumefile"
            onChange={handleChangeFile}
            id="inputGroupFile01"
          />

          <Input
            label="LinkedIn Id"
            type="text"
            placeholder="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="linkedIn"
            name="linkedin"
          />

          <Input
            label="Facebook Id"
            type="text"
            placeholder="facebook"
            value={formData.facebook}
            onChange={handleChange}
            placeholder="facebook"
            name="facebook"
          />

          <TextArea
            label="Tellme about your self"
            type="tellme"
            name="tellme"
            placeholder="Tellme about your self"
            value={formData.tellMe}
            onChange={handleChange}
          />

          <Input
            label="Whats your city"
            type="city"
            className="form-control col-sm-15"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />

          <List
            label="Whats your country"
            name="country"
            value={"India"}
            items={["India", "Country0", "Country1", "Country2"]}
            onChange={handleChange}
          />

          <Button type="submit" variant="primary" className="w-full mt-8">
            Create Account
          </Button>
        </SingleForm>
      </section>
  );
};

export default CorporateForm;

