import React, { useEffect, useRef, useState, useCallback } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const generatePassword = useCallback(() => {
    let generatedPassword = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (includeNumbers) characters += "0123456789";
    if (includeSymbols) characters += "{}%#@$!^&*()^~";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters.charAt(randomIndex);
    }

    setPassword(generatedPassword);
  }, [length, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [length, includeNumbers, includeSymbols, generatePassword]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-300 to-blue-600">
      <div className="w-full max-w-lg mx-auto shadow-2xl rounded-lg px-8 py-6 bg-gray-800 text-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Password Generator
        </h1>

        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            value={password}
            className="w-full px-4 py-2 bg-gray-900 rounded-md text-gray-200 outline-none"
            placeholder="Generated password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className="ml-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500 transition"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
          <div className="w-full">
            <label className="block mb-2 text-sm">
              Password Length: {length}
            </label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="w-full cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={includeSymbols}
              id="symbols"
              onChange={() => setIncludeSymbols(!includeSymbols)}
              className="cursor-pointer"
            />
            <label htmlFor="symbols" className="ml-2 text-sm">
              Include Symbols
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={includeNumbers}
              id="numbers"
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="cursor-pointer"
            />
            <label htmlFor="numbers" className="ml-2 text-sm">
              Include Numbers
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PasswordGenerator;
