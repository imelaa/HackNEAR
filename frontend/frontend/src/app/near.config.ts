
import { WalletSelector } from "@near-wallet-selector/core";
import { set}
import { setupWalletSelector } from "@near-wallet-selector/core";

export const nearConfig = async ()=>{
    const selector =await setupWalletSelector({
        network: 'testnet',

    });


}
