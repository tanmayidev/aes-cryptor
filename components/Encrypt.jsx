const crypto = require("crypto");
import { useState } from "react";

// const secretIV = 'somesalt'; // initialization vector
// const algorithm = "aes-128-cbc"; // encryption algorithm

// const iv = crypto.createHash('sha512').update(secretIV, "utf-8").digest("hex").substring(0, 16);

function encryptPassword(plainText, algorithm, secret, iv) {
  let cipher = crypto.createCipheriv(algorithm, secret, iv); // encrypt using aes-256-cbc
  let encryptedData = cipher.update(plainText, "utf-8", "base64"); // convert to base64
  encryptedData += cipher.final("base64");
  encryptedData = Buffer.from(encryptedData).toString("base64");
  return encryptedData;
}

export default function Encrypt(props) {
  const { algorithm, iv } = props;
  const [opText, setOpText] = useState("");

  async function submitHandler(event) {
    event.preventDefault();
    const password = event.target[0].value;

    // using secretKey input
    const key = crypto
      .createHash("sha512")
      .update(password, "utf-8")
      .digest("hex")
      .substring(0, 16);

    const inputText = event.target[1].value;

    const result = encryptPassword(inputText, algorithm, key, iv);
    //console.log(`Result ${result}`);
    setOpText(result);
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <label>
          Enter Secret Key:
          <input type="text" name="password" />
        </label>
        <br />
        <label>
          Enter Text to be Encrypted:
          <input type="text" name="test" />
        </label>
        <br />

        <button type="submit">Encrypt</button>
        <button type="submit">Reset</button>
        <br />

        <label htmlFor="displayValue">
          Output:
          <input type="text" name="output" value={opText} />
        </label>
      </form>
      <h1>{opText}</h1>
    </>
  );
}
