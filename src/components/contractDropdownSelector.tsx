import { PublicKey } from "@solana/web3.js";
import { useState, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import {
  getAllContractInfos,
  useSelectedContract,
} from "../contexts/StateProvider";

const ContractDropDownSelectorComponent = () => {
  const { selectedContract, changeSelectedContract } = useSelectedContract();
  const allContractInfo = getAllContractInfos();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownSwitchRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // handle auto closing of dropdown, if clicked outside the componenet
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !dropdownSwitchRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("click", handleClickOutside);

    // Unbind the event listener on cleanup
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative items-center">
      <div>
        <button
          type="button"
          className="flex justify-center w-full rounded-xl border-2 border-gray-400/40 shadow-sm px-4 py-2 bg-black text-sm  text-slate-300 hover:border-gray-400/70"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleMenu}
          ref={dropdownSwitchRef}
        >
            <div className="flex gap-1">

          Asset: <div className="text-lime-200">
            {selectedContract?.extraInfo.market_name}
            </div>
            </div>
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 9.586l3.293-3.293a1 1 0 011.414 1.414l-4 4A1 1 0 0110 12z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

        {isOpen && (
        <div className={`fixed inset-0 mt-20 bg-black bg-opacity-10 z-40 backdrop-blur-sm`}>
            </div>
        )}
      {isOpen && (
        <div
          className="origin-top-right py-2 absolute mt-3 right-0 w-48 rounded-xl bg-black border-2 border-gray-400/70 z-50 overflow-hidden"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
          ref={dropdownRef}
        >
          <div className="" role="none">
            {allContractInfo.map((item: any) => (
              <Item key={item.name}
              onClick={() => {
                changeSelectedContract(item.name, new PublicKey(item.whirlpool_key), new PublicKey(item.pyth_feed_key), item.pyth_exponent, item)
                toggleMenu()
              }}
              >{item.ui_name}</Item>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Item = tw.div`
  px-4 py-2 text-sm text-slate-300 hover:text-lime-200 cursor-pointer
`;

export default ContractDropDownSelectorComponent;
