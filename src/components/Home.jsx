import useAxios from "axios-hooks";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Error from "./Common/Error.jsx";

const Tile = ({ entity }) => {
  const cover = entity.Images.find((image) => image.ImageTypeCode === "FRAME");
  return (
    <Link to={"/" + entity.Id}>
      <div className="flex md:flex-col md:w-64 m-2 rounded bg-gray-700 hover:shadow hover:bg-gray-600 transform hover:scale-105 transition duration-500 ease-in-out">
        <>
          {cover ? (
            <img
              src={cover.Url}
              alt={entity.Title}
              className="flex-shrink-0 w-64 h-36 rounded object-cover"
            />
          ) : (
            <div className="flex-shrink-0  w-64 h-36 rounded bg-gray-500 text-gray-400 text-center">
              Preview not avaible
            </div>
          )}
        </>
        <p className="m-2">{entity.Title}</p>
      </div>
    </Link>
  );
};

const Loader = ({ number }) => {
  let elements = [];
  for (let i = 0; i < number; i++) {
    elements.push(
      <div
        key={i}
        className="flex md:flex-col md:w-64 m-2 rounded bg-gray-800 animate-pulse"
      >
        <div className="flex-shrink-0 w-64 h-36 rounded"></div>
        <p className="m-2 text-gray-600 rounded">Loading...</p>
      </div>
    );
  }
  return <>{elements} </>;
};

const List = ({ title, mediaListId }) => {
  const [{ data, loading, error }, execute] = useAxios(
    {
      url: "/Media/GetMediaList",
      method: "POST",
    },
    { manual: true }
  );

  useEffect(() => {
    execute({
      data: {
        MediaListId: mediaListId,
        IncludeCategories: false,
        IncludeImages: true,
        IncludeMedia: false,
        PageNumber: 1,
        PageSize: 15,
      },
    });
  }, []);

  if (error) return <Error />;
  return (
    <>
      <h2 className="text-3xl mx-4">{title}</h2>
      <div className="flex flex-col md:flex-row md:flex-wrap w-full px-2">
        {loading && <Loader number={15} />}
        {data &&
          data.Entities.map((entity) => (
            <Tile entity={entity} key={entity.Id} />
          ))}
      </div>
    </>
  );
};

const Home = () => {
  return (
    <>
      <List title={"List 3"} mediaListId={3} />
      <List title={"List 4"} mediaListId={4} />
    </>
  );
};

export default Home;
