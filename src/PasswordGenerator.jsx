import { useState, useCallback, useEffect, useRef } from "react";
export default function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_+[]{}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed]);

  return (
    <div>
      <div className="p-4 my-8 mx-auto text-orange-500 bg-gray-700 max-w-md  rounded-lg w-full">
        <h1 className="font-bold text-3xl text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded-lg my-4 overflow-hidden">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            ref={passwordRef}
            readOnly
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-700 text-white px-3 py-1 shrink-0 outline-none hover:bg-blue-800"
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              id="number"
              type="checkbox"
              checked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="number">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              id="character"
              type="checkbox"
              checked={characterAllowed}
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="character">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}
