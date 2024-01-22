import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const App = () => {
  const [name, setName] = useState("Harsh");
  const [otherName, setOtherName] = useState("");
  const [nameAdded, setNameAdded] = useState(true);
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
        "https://meme.harshkeshri.com/" + res.data.insertedId["$oid"]
      );
    } catch (e) {
      console.log(e);
    }
  };
  console.log(referenceLink);

  return (
    <div className="bg-background w-screen h-screen text-white flex justify-center flex-col items-center gap-20">
      <h2 className="text-8xl font-bold">Prank with Friends</h2>
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
        <div>
          {/* Share the Link{" "} */}
          <p
            className="bg-gray-600 px-3 py-2"
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

export default App;
