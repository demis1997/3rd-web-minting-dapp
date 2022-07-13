import enstrangled from "./logo.png";
import thirdwebLogo from "./thirdweb-logo.png";
import previewGIF from "./preview.gif";
import { useClaimedNFTSupply, useContractMetadata, useNFTDrop, useUnclaimedNFTSupply, useAddress, useMetamask } from "@thirdweb-dev/react";


const contractAddress = '0xfA242FFf7490ADa6cde6a8B3e686435982b4507D'
function App() {
  const contract = useNFTDrop(contractAddress);
  const {data:amountMinted} = useClaimedNFTSupply(contract);
  const {data:notMinted} = useUnclaimedNFTSupply(contract);
  const address = useAddress();
  const connectWallet = useMetamask();
  const {data: contractMetadata} = useContractMetadata(contractAddress)
  const buy = async () => {
    try {await contract?.claim(1);}
  catch (error){}
    
  }
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col p-6 md:p-12">
      <header className="flex flex-col items-center justify-center p-6 md:p-12">
        <img className="h-12 md:h-14" src={enstrangled} />
        <p>Minting Page</p>
      </header>
      <main className="grid gap-6 rounded-md bg-black/20 p-6 md:grid-cols-2 md:p-12">
        <div className="flex flex-col items-center justify-center space-y-6">
          <h1 className="text-2xl font-bold text-secondary">
            {contractMetadata?.name}
          </h1>
          <p className="text-center leading-relaxed">
           Enstrangled in Asia is a minting applicating for an NFT that provides users Access to Mathematical lectures.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex w-full max-w-sm flex-col space-y-4">
            <div className="aspect-square w-full overflow-hidden rounded-md">
              <img className="aspect-square object-cover" src={previewGIF} />
            </div>

            <div className="flex max-w-sm justify-between">
              <p>Total Minted</p>
              <p>{amountMinted?.toNumber()} / {(amountMinted?.toNumber() || 0)+ (notMinted?.toNumber() || 0)}</p>
            </div>

            <div className="flex justify-center">
            {!address && (<button className="rounded-full bg-primary px-6 py-2 text-white hover:bg-opacity-75" onClick={connectWallet}>
                Connect 
              </button>)}
              {address && (<button className="rounded-full bg-primary px-6 py-2 text-white hover:bg-opacity-75" onClick={buy}>
                Buy
              </button>)}
          
            </div>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center space-x-2 p-6">
        <p className="text-sm">Powered by</p>
        <img className="h-4 md:h-4" src={thirdwebLogo} />
      </footer>
    </div>
  );
}

export default App;
