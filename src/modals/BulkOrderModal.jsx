import energy from "../assets/greenEnergy.svg"
import { Button } from "../components/ui/button"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function BulkOrderModal({ onClose, listing }){
    const [value, setValue] = useState(1);
    const [payment, setPayment] = useState("")
    const [location, setLocation] = useState("")
    const [totalAmount, setTotalAmount] = useState(listing.price)

    const increment = () => setValue(v => v + 1);
    const decrement = () => setValue(v => (v > 1 ? v - 1 : 1));

    const handleChange = (e) => {
        const val = Number(e.target.value);
        if (!isNaN(val)) {
            setValue(val);
        }
    };

    useEffect(() => {
        setTotalAmount(listing.price * value)
    }, [value, listing.price])
    
    return (
         <div className="fixed top-0 left-0 w-screen h-screen bg-black/40 z-9999 backdrop-blur-sm flex items-center justify-center " onClick={onClose}>
            <div className="flex w-[420px] min-h-[440px] flex-col bg-white rounded-[10px] py-7 px-6" onClick={(e) => e.stopPropagation()}>
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
                        <h1 className=" text-xl ">{listing.name}</h1>
                        <h1 className="text-xl text-[#35408E]">₱{listing.price || 0}.00</h1>
                    </div>
                    <div className="flex items-center justify-between border border-[#E5E7EB] w-24 h-8 rounded-[10px] overflow-hidden">
                        <button onClick={decrement} className="ml-2.5 w-7">-</button>
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => {handleChange}}
                            className="w-12 text-center border-none p-0 no-spin"
                        />
                        <button onClick={increment} className="mr-2.5 w-7">+</button>
                        
                    </div>
                </div>
                <hr className="border-t border-[#D9D9D9] my-3"/>
                <div>
                    <div className="flex gap-x-32 font-bold text-[#6B7280] mb-1.5">
                        <h1>Payment</h1>
                        <h1>Location</h1>
                    </div>
                    <div className="flex gap-4">
                        <Input 
                            className="border-[#E5E7EB] bg-neutral-100"
                            value={payment}
                            onChange={(e) => setPayment(e.target.value)}
                        />
                        <Input 
                            className="border-[#E5E7EB] bg-neutral-100" 
                            value={location}    
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex my-6 justify-between">
                    <h1 className="text-[16px] font-bold text-[#6B7280]">Total Amount</h1>
                    <h1 className="text-2xl text-[#35408E] font-bold">₱{totalAmount}.00</h1>
                </div>
                <Button className="bg-green-600 text-white text-sm font-bold">Confirm Order</Button>
            </div> 
        </div>
    )
}