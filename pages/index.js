import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Encrypt from "../components/Encrypt";
import Decrypt from "../components/Decrypt";

const crypto = require("crypto");
const secretIV = "somesalt"; // initialization vector
const algorithm = "aes-128-cbc"; // encryption algorithm

const iv = crypto
  .createHash("sha512")
  .update(secretIV, "utf-8")
  .digest("hex")
  .substring(0, 16);

// function decryptPassword (encryptedMessage, algorithm, secret, iv) {
//   const buff = Buffer.from(encryptedMessage, 'base64'); // get base64 string
//   encryptedMessage = buff.toString('utf-8'); // convert to string
//   var decipher = crypto.createDecipheriv(algorithm, secret, iv);
//   var decryptedData = decipher.update(encryptedMessage, 'base64', 'utf-8');
//   decryptedData += decipher.final("utf-8");

//   return decryptedData
// }

// var decryptedMessage = decryptPassword("cGlWWXMzbDVRU2RyV1hqcmQxM1BtQT09", algorithm, key, iv);
// console.log("Decrypted Message:" + decryptedMessage )

export default function Home() {
  const [isActive, setActive] = useState(true);

  return (
    <>
      {/* <h1>mochu i wuv you</h1> */}

      <button onClick={() => setActive(true)}>Encrypt</button>
      <button onClick={() => setActive(false)}>Decrypt</button>
      {isActive ? (
        <Encrypt algorithm={algorithm} iv={iv} />
      ) : (
        <Decrypt algorithm={algorithm} iv={iv} />
      )}
    </>
  );
}
