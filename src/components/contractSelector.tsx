import { useSelectedContract } from "../contexts/StateProvider";
import { PositionAndStatsComponentParams } from "../utils/types";
import {
  CONTRACT_LIST,
} from "../utils/constants";

const ContractSelectorComponent = () => {
  const { selectedContract, changeSelectedContract } = useSelectedContract()

  return (
    <div className="mt-1 w-full text-white max-w-5xl border-2 border-gray-300/10 rounded-xl">
        <div className="flex">
        {CONTRACT_LIST.map((item) => 
          <div 
          className={`rounded-sm py-2 px-4 cursor-pointer border hover:border-gray-600 ${selectedContract?.name == item.name ? 'border-gray-400 hover:border-gray-400' : 'border-gray-800'} `}
          onClick={() => {
            changeSelectedContract(item.name, item.whirlpoolKey, item.pythFeed, item.pythExponent)
          }}
          key={item.whirlpoolKey.toString()}>
            <div>
            {item.uiName}</div>
            </div>
          )}
        </div>
          
        </div> 
  );
};

export default ContractSelectorComponent;
