import { getAllContractInfos, useSelectedContract } from "../contexts/StateProvider";
import { PublicKey } from "@solana/web3.js";

const ContractSelectorComponent = () => {
  const { selectedContract, changeSelectedContract } = useSelectedContract()
  const allContractInfo = getAllContractInfos();
  return (
    <div className="mt-1 w-full text-white border-2 border-gray-300/10 rounded-xl">
        <div className="flex">
        {allContractInfo.map((item: any) => 
          <div 
          className={`rounded-sm py-2 px-4 cursor-pointer border hover:border-gray-600 ${selectedContract?.name == item.name ? 'border-gray-400 hover:border-gray-400' : 'border-gray-800'} `}
          onClick={() => {
            changeSelectedContract(item.name, new PublicKey(item.whirlpool_key), new PublicKey(item.pyth_feed_key), item.pyth_exponent, item)
          }}
          key={item.name}>
            <div>
            {item.market_name}</div>
            </div>
          )}
        </div>
    </div> 
  );
};

export default ContractSelectorComponent;
