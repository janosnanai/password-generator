import type { ChangeEvent, FormEvent } from "react";

import { useState, useEffect } from "react";
import { customAlphabet } from "nanoid";
import zxcvbn from "zxcvbn";

const PASSWORD_STRENGTH = [
  "very weak",
  "weak",
  "medium",
  "strong",
  "very strong",
];

const LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!#$%&()*+,-./:;<=>?@[]^_{|}~";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(1);
  const [lowercase, setLowercase] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [strength, setStrength] = useState(0);

  function copyHandler() {
    navigator.clipboard.writeText(password);
  }

  function rangeChangeHandler(update: number) {
    setPasswordLength(update);
  }

  function lowercaseChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setLowercase(event.target.checked);
  }

  function uppercaseChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setUppercase(event.target.checked);
  }

  function numbersChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setNumbers(event.target.checked);
  }

  function symbolsChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setSymbols(event.target.checked);
  }

  function submitHandler(event: FormEvent) {
    event.preventDefault();
    let alphabet = "";
    if (lowercase) alphabet += LOWERCASE_LETTERS;
    if (uppercase) alphabet += UPPERCASE_LETTERS;
    if (numbers) alphabet += NUMBERS;
    if (symbols) alphabet += SYMBOLS;

    const passwordUpdate = customAlphabet(alphabet, passwordLength)();
    const strengthUpdate = Number(zxcvbn(passwordUpdate).score);

    console.log(strengthUpdate);

    setPassword(passwordUpdate);
    setStrength(strengthUpdate);
  }

  return (
    <div className="w-screen h-screen relative bg-gradient-to-t from-custom-bg-gray-dark to-custom-bg-gray-light">
      <div className="w-[400px] h-max absolute inset-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="select-none mb-5 text-xl capitalize text-center text-custom-text-gray-dark font-bold">
          password generator
        </h1>
        <div className="h-16 px-5 mb-5 flex justify-between items-center bg-custom-gray-light">
          <p
            className={`text-xl ${
              password
                ? "text-custom-text-gray-light-1"
                : "select-none text-custom-text-gray-dark"
            }`}
          >
            {password || "P4$5W0rD!"}
          </p>
          <button
            onClick={copyHandler}
            disabled={!password}
            className="transition enabled:text-custom-green disabled:text-custom-text-gray-dark hover:enabled:text-custom-text-gray-light-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
              />
            </svg>
          </button>
        </div>

        <div className="px-5 py-5 bg-custom-gray-light">
          <form onSubmit={submitHandler}>
            <div>
              <RangeElement
                title="character length"
                min={1}
                max={21}
                value={passwordLength}
                onChange={rangeChangeHandler}
              />
            </div>
            <div className="mb-5">
              <CheckboxElement
                title="include uppercase letters"
                id="uppercase"
                checked={uppercase}
                onChange={uppercaseChangeHandler}
              />
              <CheckboxElement
                title="include lowercase letters"
                id="lowercase"
                checked={lowercase}
                onChange={lowercaseChangeHandler}
              />
              <CheckboxElement
                title="include numbers"
                id="numbers"
                checked={numbers}
                onChange={numbersChangeHandler}
              />
              <CheckboxElement
                title="include symbols"
                id="symbols"
                checked={symbols}
                onChange={symbolsChangeHandler}
              />
            </div>
            <div className="h-14 flex justify-between items-center px-6 mb-5 bg-custom-gray-dark">
              <p className="select-none text-custom-text-gray-dark text-sm font-semibold uppercase">
                strength
              </p>
              <div className="flex items-center gap-3">
                <p className="uppercase text-custom-text-gray-light-2">
                  {password && PASSWORD_STRENGTH[strength]}
                </p>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-6 w-2.5 border-2 ${
                        strength < i
                          ? "border-custom-text-gray-light-2"
                          : "border-custom-yellow bg-custom-yellow"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={!(lowercase || uppercase || numbers || symbols)}
              className="h-14 group w-full px-7 flex justify-center items-center gap-5 border-2 border-custom-green bg-custom-green hover:enabled:bg-custom-gray-light text-custom-gray-light hover:enabled:text-custom-green uppercase transition"
            >
              <span>generate</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 transition group-hover:group-enabled:translate-x-3"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

function CheckboxElement({
  title,
  id,
  checked,
  onChange,
}: {
  title: string;
  id: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mb-2">
      <input
        type="checkbox"
        {...{ id, checked, onChange }}
        className="mr-5 h-4 w-4 cursor-pointer border-2 border-custom-text-gray-light-2 hover:border-custom-green text-custom-green bg-transparent outline-none focus:ring-0 focus:ring-offset-white/50"
      />
      <label
        htmlFor={id}
        className="select-none text-custom-text-gray-light-2 capitalize"
      >
        {title}
      </label>
    </div>
  );
}

function RangeElement({
  title,
  min,
  max,
  value,
  onChange,
}: {
  title: string;
  min: number;
  max: number;
  value: number;
  onChange: (update: number) => void;
}) {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const container = document.getElementById("range-container");
    if (!container) return;
    const width = container.getBoundingClientRect().width || 0;
    setPosition(Math.round(((value - 1) / (max - min)) * (width - 16) + 8));
  }, [value]);

  function clickHandler(event: React.MouseEvent) {
    const container = document.getElementById("range-container");
    if (!container) return;
    const width = container.getBoundingClientRect().width || 0;
    const startX = container.getBoundingClientRect().left || 0;
    const update = Math.ceil(((event.clientX - startX) / width) * max);
    onChange(update);
  }

  function _pointerMoveHandler(event: PointerEvent) {
    const container = document.getElementById("range-container");
    if (!container) return;
    const width = container.getBoundingClientRect().width || 0;
    const startX = container.getBoundingClientRect().left || 0;
    let update = Math.ceil(((event.clientX - startX) / width) * max);
    if (update < min) update = min;
    if (update > max) update = max;
    onChange(update);
  }

  function _pointerUpHandler() {
    const container = document.getElementById("range-container");
    if (!container) return;
    container.removeEventListener("pointermove", _pointerMoveHandler);
    container.removeEventListener("pointerleave", _mouseLeaveHandler);
  }

  function _mouseLeaveHandler() {
    const container = document.getElementById("range-container");
    if (!container) return;
    container.removeEventListener("pointermove", _pointerMoveHandler);
    container.removeEventListener("pointerup", _pointerUpHandler);
  }

  function dragHandler() {
    const container = document.getElementById("range-container");
    if (!container) return;
    container.addEventListener("pointermove", _pointerMoveHandler);

    container.addEventListener("pointerup", _pointerUpHandler, { once: true });

    container.addEventListener("pointerleave", _mouseLeaveHandler, {
      once: true,
    });
  }

  return (
    <div>
      <div className="flex justify-between">
        <p className="select-none capitalize text-custom-text-gray-light-2">
          {title}
        </p>
        <span className="select-none block text-custom-green font-mono text-2xl">
          {value}
        </span>
      </div>
      <div id="range-container" className="relative py-5 mb-2">
        {/* range active section */}
        <div
          onClick={clickHandler}
          style={{ width: position + "px" }}
          className="absolute left-0 h-2 bg-custom-green rounded-sm transition"
        />
        {/* range thumb */}
        <div
          style={{ left: position + "px" }}
          onPointerDown={dragHandler}
          className="select-none absolute top-6 -translate-x-1/2 -translate-y-1/2 h-5 w-5 border-2 border-custom-text-gray-light-1 hover:border-custom-green bg-custom-text-gray-light-1 hover:bg-custom-gray-dark shadow hover:shadow-lg cursor-pointer rounded-full transition"
        />
        {/* whole range */}
        <div
          onClick={clickHandler}
          className="w-full h-2 bg-custom-gray-dark rounded-sm"
        />
      </div>
    </div>
  );
}
