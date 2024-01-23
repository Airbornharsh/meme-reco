import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [name, setName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [nameAdded, setNameAdded] = useState(false);
  const [referenceLink, setReferenceLink] = useState("");

  const addLink = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}create-user`,
        {
          name,
          otherName,
        }
      );

      setReferenceLink(
        // "https://meme.harshkeshri.com/" + res.data.insertedId["$oid"]
        "http://localhost:5173/" + res.data.insertedId["$oid"]
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-background w-screen h-screen text-white flex justify-center flex-col items-center gap-20 overflow-auto">
      <h2 className="text-8xl font-bold">Meme with Friends</h2>
      {!nameAdded && (
        <div className="flex gap-5 justify-center items-center">
          <input
            className="bg-black text-[#EAF6FF] px-3 py-2"
            value={name}
            onChange={(e) => {
              if (e.target.value.length < 20) setName(e.target.value);
            }}
          />
          <button
            className="bg-gray-600 px-3 py-2 rounded-lg"
            onClick={() => {
              if (name.length < 2) {
                alert("Name should be atleast 2 characters");
                return;
              }
              setNameAdded(true);
            }}
          >
            Add Your name
          </button>
          <p>{`(Your Friend can see your Name)`}</p>
        </div>
      )}
      {nameAdded && !referenceLink && (
        <div className="flex gap-5 justify-center items-center">
          <input
            className="bg-black text-[#EAF6FF] px-3 py-2"
            value={otherName}
            onChange={(e) => {
              if (e.target.value.length < 20) setOtherName(e.target.value);
            }}
          />
          <button
            className="bg-gray-600 px-3 py-2 rounded-lg"
            onClick={() => {
              if (otherName.length < 2) {
                alert("Name should be atleast 2 characters");
                return;
              }
              addLink();
            }}
          >
            Add Friend name
          </button>
        </div>
      )}
      {referenceLink && (
        <div className="flex gap-2 flex-col">
          <p
            className="bg-gray-600 flex justify-center items-center px-3 py-2 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(referenceLink);
              alert("Link Copied");
            }}
          >
            Copy Link
          </p>
          <p
            className="bg-gray-600 px-3 py-2 flex justify-center items-center cursor-pointer"
            onClick={() => {
              window.open(
                `whatsapp://send?text=${encodeURIComponent(`${referenceLink}`)}`
              );
            }}
          >
            Share on WhatsApp
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
