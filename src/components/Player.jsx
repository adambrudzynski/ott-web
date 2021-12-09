import useAxios from "axios-hooks";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import ReactPlayer from "react-player";
import { UserContext } from "../contexts/Auth.jsx";

const Player = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [{ data, loading, error }, execute] = useAxios(
    {
      url: "/Media/GetMediaPlayInfo",
      method: "POST",
    },
    { manual: true }
  );

  useEffect(() => {
    const StreamType = user?.UserName !== "Anonymous" ? "MAIN" : "TRIAL";
    execute({
      data: {
        MediaId: parseInt(id),
        StreamType,
      },
    });
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error?.response?.status === 403 && user?.UserName !== "Anonymous")
    return (
      <p>You do not have a necessary subscription to view this content. </p>
    );
  if (error) return <p>Error!</p>;

  return (
    <div className="px-4">
      <h2 className="text-3xl">{data?.Title}</h2>
      <p className="text-gray-300">{data?.Description}</p>
      {data?.ContentUrl ? (
        <ReactPlayer controls={true} playing={true} url={data?.ContentUrl} />
      ) : (
        <p>Content is not avaible.</p>
      )}
    </div>
  );
};

export default Player;
