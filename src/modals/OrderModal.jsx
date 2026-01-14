import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useCreateOrder } from "@/hooks/useOrderApi";
import energy from "../assets/greenEnergy.svg";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BulkOrderModal = forwardRef(({ listing, onClose }, ref) => {
  const dialogRef = useRef();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [payment, setPayment] = useState("");
  const [location, setLocation] = useState("");
  const [totalAmount, setTotalAmount] = useState(listing.price);
  const [error, setError] = useState("");

  const createOrderMutation = useCreateOrder();

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  const increment = () => setValue((v) => v + 1);
  const decrement = () => setValue((v) => (v > 1 ? v - 1 : 1));
  const handleChange = (e) => {
    const val = Number(e.target.value);
    if (!isNaN(val)) setValue(val);
  };

  const resetStates = () => {
    setValue(1);
    setPayment("");
    setLocation("");
    setTotalAmount(listing.price);
    setError("");
  };

  useEffect(() => {
    setTotalAmount(listing.price * value);
  }, [value, listing.price]);

  const handleOrder = () => {
    setError("");

    if (!location.trim() || !payment.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (listing.stocks < value) {
      setError(`Not enough stocks. Only ${listing.stocks} left.`);
      return;
    }

    createOrderMutation.mutate(
      {
        listingId: listing._id,
        quantity: value,
        meetupLocation: location,
        paymentMethod: payment,
      },
      {
        onSuccess: () => setOpen(false),
        onError: (error) => {
          const status = error?.response?.status;
          if (status === 403) {
            setError("You cannot buy your own item.");
          } else {
            setError("Something went wrong. Please try again.");
          }
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          resetStates();
          onClose?.();
        }
      }}
    >
      <DialogContent className="flex-col gap-2 w-[420px] max-h-[90vh] bg-white rounded-[10px] px-6 py-7 overflow-visible">
        <DialogHeader className="p-0 m-0">
          <DialogTitle className="text-2xl font-bold">Place Order</DialogTitle>
        </DialogHeader>

        <div className="w-full h-20 bg-[#F0FDF4] my-2 rounded-lg p-2 flex">
          <img className="w-3 h-7 mx-1.5" src={energy} alt="Green Energy" />
          <p className="text-[13px] text-green-800">
            <span className="font-bold">Instant Reservation:</span> Clicking
            confirm will immediately reserve stocks for you. Please ensure you
            show up to the meetup.
          </p>
        </div>

        <div className="flex justify-between font-bold text-[#6B7280] mt-3">
          <span>Item</span>
          <span>Quantity</span>
        </div>

        <div className="flex justify-between py-2.5 font-black">
          <div>
            <h1 className="text-xl">{listing.name}</h1>
            <h1 className="text-xl text-[#35408E]">₱{listing.price}.00</h1>
          </div>

          <div className="flex items-center justify-between border border-[#E5E7EB] w-24 h-8 rounded-[10px] overflow-hidden">
            <button onClick={decrement} className="ml-2.5 w-7">
              -
            </button>
            <input
              type="number"
              value={value}
              onChange={handleChange}
              className="w-12 text-center focus:outline-none border-none p-0 no-spin"
            />
            <button onClick={increment} className="mr-2.5 w-7">
              +
            </button>
          </div>
        </div>

        <hr className="border-t border-[#D9D9D9] my-3" />

        <div className="flex gap-x-32 font-bold text-[#6B7280] mb-1.5">
          <h1>Payment</h1> <h1>Location</h1>
        </div>
        <div className="flex gap-4">
          <Select value={payment} onValueChange={setPayment}>
            <SelectTrigger className="w-full border-neutral-200 bg-neutral-100">
              <SelectValue placeholder="Payment" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-100">
              <SelectGroup>
                <SelectItem value="GCash">GCash</SelectItem>
                <SelectItem value="Cash on Meetup">Cash on Meetup</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            className="border-neutral-200 bg-neutral-100"
            value={location}
            placeholder="Meetup location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="flex justify-between my-6">
          <span className="font-bold text-[#6B7280]">Total</span>
          <span className="text-2xl font-bold text-[#35408E]">
            ₱{totalAmount}.00
          </span>
        </div>

        {error && (
          <div className="text-xs text-red-600 bg-red-50 p-2 mb-1.5 rounded-md">
            {error}
          </div>
        )}

        <Button
          className="w-full bg-green-600 rounded-[10px] 4focus:bg-green-800 text-white text-sm font-bold"
          onClick={handleOrder}
        >
          Confirm Order
        </Button>
      </DialogContent>
    </Dialog>
  );
});

export default BulkOrderModal;
