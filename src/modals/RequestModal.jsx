import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import information from "../assets/information.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { useCreateOffer } from "@/hooks/useOfferApi";

const RequestModal = forwardRef((listing, ref) => {
  const dialogRef = useRef();
  const data = listing.listing;
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const createOfferMutation = useCreateOffer();

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current.showModal(),
    close: () => dialogRef.current.close(),
  }));

  const handleOffer = () => {
    setError("");

    if (!location.trim() || !message.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    createOfferMutation.mutate(
      {
        listingId: data._id,
        meetupLocation: location,
        buyerNote: message,
      },
      {
        onSuccess: () => {
          dialogRef.current.close();
        },
        onError: (error) => {
          const status = error?.response?.status;
          if (status === 403) {
            setError("You cannot send an offer to your own product.");
          } else if (status === 409) {
            setError("You already submitted your offer .");
          } else {
            setError("Something went wrong. Please try again.");
          }
        },
      }
    );
  };
  return (
    <dialog
      className="w-[420px] max-h-[90vh] fixed inset-0 m-auto rounded-xl overflow-hidden px-6 py-4 bg-white shadow-lg"
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          dialogRef.current.close();
        }
      }}
      onCancel={(e) => {
        e.preventDefault();
        dialogRef.current.close();
      }}
      onClose={() => {
        setMessage("");
        setLocation("");
        setError("");
      }}
    >
      <div className="w-full font-semibold text-xl my-2">
        <h2>Request Item</h2>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[380px] h-fit bg-blue-50 rounded-lg p-3 flex gap-2 ">
          <img src={information} alt="information" className="w-4.5 h-4.5 " />
          <div className="text-xs text-blue-800">
            <span className="font-bold">Single Stock Item: </span>
            You are sending a request to
            <span className="font-bold"> {data?.seller?.name}</span>. If they
            accept your request, you will be notified to proceed with the
            meetup.
          </div>
        </div>
      </div>

      <div className="my-4 flex flex-col font-bold gap-3">
        <div>
          <h1 className="text-xs text-neutral-500">ITEM</h1>
          <h1 className="text-[16px] ">{data?.name}</h1>
        </div>

        <div>
          <h1 className="text-xs text-neutral-500">
            PREFFERED MEETUP LOCATION
          </h1>
          <Input
            className="border-neutral-200 bg-neutral-50 focus-visible:border-blue-400 focus-visible:ring-0 placeholder:font-normal placeholder:text-xs"
            value={location}
            placeholder="e.g., The Garden (NU Manila)"
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <h1 className="text-xs text-neutral-500">MESSAGE TO SELLER</h1>

          <InputGroup className="border-neutral-200 bg-neutral-50 focus-within:border-blue-500 focus-within:ring-0">
            <InputGroupTextarea
              className="h-24 placeholder:font-normal placeholder:text-xs focus-visible:ring-0"
              placeholder="e.g., I can meet anytime after 1pm"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </InputGroup>
        </div>

        {error && (
          <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
            {error}
          </div>
        )}

        <Button
          variant="default"
          className="bg-[#35408E] hover:bg-[#2d3678] text-sm text-white font-bold rounded-[10px]"
          onClick={handleOffer}
        >
          Send Request
        </Button>
      </div>
    </dialog>
  );
});

export default RequestModal;
