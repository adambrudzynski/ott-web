import useAxios from "axios-hooks";
import React, { useEffect } from "react";

const Tile = ({ entity }) => {
  const cover = entity.Images.find((image) => image.ImageTypeCode === "FRAME");
  return (
    <div className="flex md:flex-col md:w-64 m-2 rounded bg-gray-700 hover:shadow hover:bg-gray-600 transform hover:scale-105 transition duration-500 ease-in-out">
      <>
        {cover ? (
          <img
            src={cover.Url}
            alt={entity.Title}
            className="flex-shrink-0 w-64 h-36 rounded object-cover"
          />
        ) : (
          <div className="flex-shrink-0 w-64 h-36 rounded">PLACEHOLDER</div>
        )}
      </>
      <p className="m-2">{entity.Title}</p>
    </div>
  );
};

const List = ({ data, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <>
      <h2 className="text-3xl mx-4">List 1</h2>
      <div className="flex flex-col md:flex-row md:flex-wrap w-full px-2">
        {data &&
          data.Entities.map((entity) => (
            <Tile entity={entity} key={entity.Id} />
          ))}
      </div>
    </>
  );
};

const Home = () => {
  const [{ data, loading, error }, execute] = useAxios(
    {
      url: "/Media/GetMediaList",
      method: "POST",
    },
    { manual: true }
  );

  useEffect(() => {
    console.log(data);
    execute({
      data: {
        MediaListId: 3,
        IncludeCategories: false,
        IncludeImages: true,
        IncludeMedia: false,
        PageNumber: 1,
        PageSize: 15,
      },
    });
  }, []);

  return <List data={data} loading={loading} error={error} />;
};

export default Home;
