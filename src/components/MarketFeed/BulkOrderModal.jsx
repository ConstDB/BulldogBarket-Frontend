import energy from "../../assets/greenEnergy.svg"

export default function BulkOrderModal({ onClose, listing}){
    return (
         <div className="fixed top-0 left-0 w-screen h-screen bg-black/40 z-9999 backdrop-blur-sm flex items-center justify-center ">
            <div className="flex w-[420px] h-[440px] flex-col bg-white rounded-[10px] py-7 px-6">
                <h2 className="text-2xl font-bold">Place Order</h2> 
                <div className="w-[360px] h-20 bg-[#F0FDF4] m-1 rounded-lg p-2 flex">
                    <img className="w-3 h-7 mx-1.5" 
                        src={energy} alt="Green Energy" />
                    <h2 className="text-[13px] text-[#166534] ">
                        <span className="font-bold">Instant Reservation: </span> 
                        <span> Clicking confirm will immediately reserve stocks for you. Please ensure you show up to the meetup. </span>
                    </h2>
                </div>
                <div className="flex justify-between text-[#6B7280] font-bold text-[16px] mt-3">
                    <h1>Item</h1>
                    <h1>Quantity</h1>
                </div>
                <div className="flex justify-between py-2.5 font-black">
                    <div>
                        <h1 className=" text-[16px] ">{listing.name}</h1>
                        <h1 className="text-[18px] text-[#35408E]">₱{listing.price || 0}.00</h1>
                    </div>
                    <div className="flex w-[100px] h-[50px] border-[#E5E7EB] border relative rounded-[10px] justify-center items-center">
                        <input type="number" className="w-[90px] focus:outline-none" />
                    </div>

                </div>
                <hr className="border-t border-[#D9D9D9] my-3"/>
                <button onClick={onClose}>Close</button>
            </div> 
        </div>
    )
}