import Head from "next/head";
import { Text, Card, NavButton, Carousel } from "@components/ui";

let Layouts = [
  {
    primaryLayout: true,
    title: "Oh yeah, it's that good. ",
    subTitle: "See for yourself.",
    subText:
      "Donec ullamcorper nulla non metus auctor fringilla. Vestibulumm id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.",
    image: {
      src: "/img/selectplan.png",
      alt: "Generic placeholder image",
    },
  },
  {
    primaryLayout: false,
    title: "First featurette heading. ",
    subTitle: "It'll blow your mind.",
    subText:
      "Donec ullamcorper nulla non metus auctor fringilla. Vestibulumm id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.",
    image: {
      src: "/img/selectplan.png",
      alt: "Generic placeholder image",
    },
  },
  {
    primaryLayout: true,
    title: "And lastly, this one. ",
    subTitle: "Checkmate.",
    subText:
      "Donec ullamcorper nulla non metus auctor fringilla. Vestibulumm id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.",
    image: {
      src: "/img/selectplan.png",
      alt: "Generic placeholder image",
    },
  },
  {
    primaryLayout: false,
    title: "Oh yeah, it's that good. ",
    subTitle: "See for yourself.",
    subText:
      "Donec ullamcorper nulla non metus auctor fringilla. Vestibulumm id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.",
    image: {
      src: "/img/selectplan.png",
      alt: "Generic placeholder image",
    },
  },
];

export default function Home() {
  let genCard = () => (
    <Card className="flex flex-col items-center px-2 py-4 text-center">
      <img
        src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
        alt="Generic placeholder image"
        width="140"
        height="140"
        className="pb-2"
      />
      <Text variant="cardHeading">Heading</Text>
      <Text className="px-2">
        Donec sed odio dui. Etiam porta sem malesuad euismod.
      </Text>
      <NavButton variant="secondary">View details &raquo;</NavButton>
    </Card>
  );

  let genBanner = () => (
    <div className="my-4 px-6 grid gap-4 grid-cols-2">
      <div className="-mr-4 flex flex-col items-start justify-around">
        <Text variant="text" className="text-4xl font-semibold">
          Build your next project faster with SB UI Kit Pro
        </Text>
        <Text>
          Welcome to SB UI Kit Pro, a toolkit for building beautiful webb
          interfaces, created by the development team at Start Bootstrap.
        </Text>
        <NavButton variant="primary" link="#explore" className="my-4">
          Explore Pages
        </NavButton>
      </div>
      <img src="/img/landingpage1.png" />
    </div>
  );

  return (
    <div className="w-full">
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="w-full bg-gray-50 flex justify-center items-center"
        style={{ height: "80vh" }}
      >
        <Carousel className="max-w-7xl">
          {genBanner()}
          {genBanner()}
          {genBanner()}
        </Carousel>
      </div>

      <section>
        <div role="main" className="max-w-7xl mx-auto mt-12">
          {/* <div className="mt-20 px-6 grid gap-4 grid-cols-4">
            {genCard()}
            {genCard()}
            {genCard()}
            {genCard()}
          </div> */}

          {Layouts.map((lay, index) => (
            <div key={index} className="my-24 px-6 grid gap-4 grid-cols-12">
              <div
                className={`-mr-4 flex flex-col items-start justify-center col-span-6 ${
                  lay.primaryLayout && "col-start-2"
                }`}
              >
                <Text variant="text" className="text-4xl font-semibold">
                  {lay.title}
                  <span className="text-gray-300">{lay.subTitle}</span>
                </Text>
                <Text>{lay.subText}</Text>
                {lay.button && (
                  <NavButton
                    variant={lay.button.primary ? "primary" : "flat"}
                    link={lay.button.link}
                    className="my-4"
                  >
                    {lay.button.name}
                  </NavButton>
                )}
              </div>
              <img
                src={lay.image.src}
                className={`col-span-4 ${
                  !lay.primaryLayout && "col-start-2 row-start-1"
                }`}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}