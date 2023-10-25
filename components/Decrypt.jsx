const crypto = require("crypto");
import { useState } from "react";

// const secretIV = 'somesalt'; // initialization vector
// const algorithm = "aes-128-cbc"; // encryption algorithm

// const iv = crypto.createHash('sha512').update(secretIV, "utf-8").digest("hex").substring(0, 16);

function decryptPassword(encryptedMessage, algorithm, secret, iv) {
  const buff = Buffer.from(encryptedMessage, "base64"); // get base64 string
  encryptedMessage = buff.toString("utf-8"); // convert to string
  var decipher = crypto.createDecipheriv(algorithm, secret, iv);
  var decryptedData = decipher.update(encryptedMessage, "base64", "utf-8");
  decryptedData += decipher.final("utf-8");

  return decryptedData;
}

export default function Decrypt(props) {
  const { algorithm, iv } = props;
  const [decryptedText, setDecryptedText] = useState("");

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

    const result = decryptPassword(inputText, algorithm, key, iv);
    //console.log(`Result ${result}`);
    setDecryptedText(result);
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <label>
          Enter Secret Key Used for Encryption:
          <input type="text" name="password" />
        </label>
        <br />
        <label>
          Enter Text to be Decrypted:
          <input type="text" name="test" />
        </label>
        <br />

        <button type="submit">Decrypt</button>
        <button type="submit">Reset</button>
        <br />

        <label htmlFor="displayValue">
          Output:
          <input type="text" name="output" value={decryptedText} />
        </label>
      </form>
      <h1>{decryptedText}</h1>
    </>
  );
}
