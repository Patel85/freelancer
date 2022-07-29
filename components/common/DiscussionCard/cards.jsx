import {  FaStar } from "react-icons/fa";
import { PATH, ImagePATH } from "@constants/Path";

var imageurl = ImagePATH;

import { Card, Text, NavButton } from "@components/ui";

const Cards = (props) => {
  // @TODO map state to Card

  // const [proffesiondata, setproffesiondata] = useState([]);

  // useEffect(async () => {
  //   const list = ProffesionList();
  //   list
  //     .then((res) => {
  //       console.log("res", res.data);
  //       setproffesiondata(res.data);
  //     })
  //     .catch((e) => console.log(e));
  // }, []);

  let generateCard = ({
    photo = null,
    image = {
      src: "/img/freelancer-circle.svg",
      alt: "expert's Pic",
    },
    username = "Username",
    profession = "Profession",
    text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, repellat. Maxime enim provident, ut, ipsam numquam,laborum natus inventore fugit possimus!",
    rating = 5,
  }) => (
    <Card className="p-4 px-8">
      <div className="grid grid-cols-3">
        <img
          src={photo ? `${imageurl}/photo` : image.src}
          alt={image?.alt ? image.alt : "Image"}
          className="mx-auto self-center"
        />
        <div className="col-span-2">
          <Text
            variant="text"
            className="text-lg text-primary hover:text-primary-1"
          >
            {username}
          </Text>

          {/* @TODO REMOVE THIS LINE WHEN PROFESSION IS SELECT */}

          {/* {proffesiondata
            .filter((res1) => res1.id == props.res.proffesion)
            .map((datalist) => (
              <Text key="datalist.name">{datalist.name}</Text>
            ))}
              <Text key="datalist.name">{profession}</Text> */}

          <Text>{profession}</Text>

          <div className="flex mt-2">
            {[...Array(rating)].map((e) => {
              return (
                <FaStar className="mr-1" color="orange" size={14}></FaStar>
              );
            })}
          </div>
        </div>
        <div className="col-span-3 my-4">
          <Text variant="text">
            <span className="font-medium">About us: &nbsp;</span>
            {text}
          </Text>
        </div>
        <hr className="col-span-3 mb-2" />
        <div className="col-span-3 grid gap-4 grid-cols-2">
          <NavButton
            variant="primary"
            className="hover:bg-gray-50 hover:text-white"
          >
            Chat
          </NavButton>
          <NavButton
            variant="primary"
            className="hover:bg-gray-50 hover:text-white"
          >
            Message
          </NavButton>
        </div>
      </div>
    </Card>
  );

  return <>{generateCard(props)}</>;
};

export default Cards;
