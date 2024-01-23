import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [link, setLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    const onLoad = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}get-user/${
            location.pathname.split("/")[1]
          }`
        );

        setName(res.data.name);
        setOtherName(res.data.otherName);
        setLink(res.data.memeLink);
      } catch (e) {
        console.log(e);
      }
    };
    onLoad();
  }, [location.pathname]);

  return (
    <div className="bg-background w-screen h-screen text-white flex justify-center flex-col items-center gap-20 overflow-auto">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-4xl font-semibold">{otherName}</h2>
        <img src={link} alt="Meme" className="w-[90vw] max-w-[40rem]" />
        <p className="self-end">Done By {name}</p>
      </div>
    </div>
  );
};

export default Home;
