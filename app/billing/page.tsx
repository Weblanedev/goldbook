"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useModals } from "../component/useModal";
import ShowOrderModal from "../component/show-order";
import { useRouter } from "next/navigation";

const Billing = () => {
  const [selectedItem, setSelectedItem] = useState({
    name: "",
    formattedTotalAmount: "",
    image: ""
  });
  const router = useRouter()
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  
  const [cardProfile, setCardProfile] = useState({
    firstName: "",
    phone: "",
    lastName: "",
    email: "",
  });


  // Load the Korapay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCardProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardProfile({
      ...cardProfile,
      [name]: value
    });
  };

  function add100Dollars(input: string): string {
    const numericalPart = parseFloat(input?.replace(/[^\d.]/g, ""));
    const result = numericalPart + 100; // Adding $100
    return result.toFixed(2);
  }

  function numberWithCommas(number: any) {
    if (!number) return number;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const formattedAmount = add100Dollars(selectedItem?.formattedTotalAmount);

  function payKorapay() {
    if ((window as any).Korapay) {
      (window as any).Korapay.initialize({
        key: process.env.NEXT_PUBLIC_KORA_CHECKOUT_PUBLIC_KEY,
        reference: "",
        amount: parseFloat(formattedAmount),
        currency: "NGN",
        customer: {
          name: cardProfile.firstName,
          email: cardProfile.email
        },
        notification_url: "https://example.com/webhook" ,

        onClose: () => {
          router.push('/')
        }
      });

   
    } else {
      console.error("Korapay script not loaded");
    }
   
  }

  // Form validity check
  useEffect(() => {
    const isFilledForm = cardProfile.email && cardProfile.firstName;
    setIsButtonDisabled(!isFilledForm);
  }, [cardProfile]);

  // Load item from localStorage
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const itemToBeBought: any = localStorage.getItem("item");
      setSelectedItem(JSON.parse(itemToBeBought));
    }
  }, []);


  const showInvoice = useModals(["showInvoice"]);

  function toggleShowInvoiceModal() {
    showInvoice.toggleModal("showInvoice");
  }

  return (
    <div className="w-full h-full flex flex-col pt-[66px] md:pt-[0px]">
      <section className="relative h-[250px] md:h-[300px]">
        <div className="flex flex-col gap-2 items-center justify-center h-full w-full">
          <h1 className="font-medium md:font-semibold text-[50px] sm:text-[40px] md:text-[50px] md:text-left leading-snug md:leading-[62px] text-center text-rose-950">
            Order Details
          </h1>
          <p>Find the best way to get help and connect with Goldbook</p>
        </div>
      </section>

      <section className="relative p-10 md:px-[130px] md:pb-[20px] flex flex-col lg:flex-row gap-8 items-center lg:items-start w-full justify-center">
        <div className="flex flex-col gap-8 items-start w-full justify-center mb-20 lg:pr-8 lg:border-r">
          <div className="flex flex-col gap-2.5 text-[#181616] items-start justify-center lg:w-[500px]">
            <h2 className="text-[32px] font-medium">Billing details</h2>
          </div>

          <div className="w-full lg:w-[500px]">
            <form className="mx-auto w-full flex flex-col gap-5">
              <div className="flex flex-col w-full gap-5 md:flex-row">
                <input
                  type="text"
                  value={cardProfile.firstName}
                  required
                  name = "firstName"
                  onChange={handleCardProfile}
                  className="border border-gray-300 text-gray-900 text-[15px] block w-full p-[15px] rounded-md"
                  placeholder="First Name"
                />
              </div>
              <input
                type="tel"
                value={cardProfile.phone}
                name = "phone"
                onChange={handleCardProfile}
                className="border border-gray-300 text-gray-900 text-[15px] block w-full p-[15px] rounded-md"
                placeholder="Phone"
              />
              <input
                type="text"
                value={cardProfile.lastName}
                name = "lastName"
                onChange={handleCardProfile}
                className="border border-gray-300 text-gray-900 text-[15px] block w-full p-[15px] rounded-md"
                placeholder="Last Name"
              />
              <input
                type="email"
                value={cardProfile.email}
                name = "email"
                onChange={handleCardProfile}
                className="border border-gray-300 text-gray-900 text-[15px] block w-full p-[15px] rounded-md"
                placeholder="Email Address"
                required
              />
            </form>

            <div className="flex flex-col gap-5 mt-10 text-[#181616] items-start justify-center lg:w-[500px]">
              <h2 className="text-[32px] font-medium">Additional Details</h2>

              <textarea
                id="message"
                rows={7}
                className="block p-[15px] w-full text-sm text-gray-900 border border-gray-300 rounded-md"
                placeholder="Your Message"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[15px] items-start w-full justify-center" onClick={payKorapay} >
          <h4 className="font-bold text-black leading-[28px]">
            YOUR ORDER
          </h4>

          <div className="flex mt-[-5px] flex-col items-center justify-center w-full">
            <div className="flex items-center justify-between py-[15px] w-full border-b">
              <h4 className="text-[#707070] font-medium text-[13px]">
                PRODUCT
              </h4>
            </div>
            <div className="flex items-center justify-between py-[15px] w-full border-b">
              <h4 className="text-[#161616] font-medium text-[16px] leading-5 upperc ase w-[350px]">
                {selectedItem?.name}
              </h4>
              <h4 className="text-[#161616] font-medium text-[16px]">
                ₦{selectedItem?.formattedTotalAmount}
              </h4>
            </div>
            <div className="flex items-center justify-between py-[15px] w-full border-b">
              <h4 className="text-[#707070] font-medium text-[13px]">TOTAL</h4>
              <h4 className="text-[#a20401] font-medium text-[16px]">
                ₦{numberWithCommas(add100Dollars(selectedItem?.formattedTotalAmount))}
              </h4>
            </div>
          </div>
          <div className="w-[90%] sm:w-[500px] mx-auto pb-[50px] sm:pb-[100px]">
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`group gap-[8px] mt-[30px] w-[100%] text-center text-[16px] sm:text-[24px] rounded-lg font-body bg-white text-rose-500 ${!isButtonDisabled && 'hover:bg-rose-500 hover:text-white'} px-[30px] sm:px-[97px] py-[15px] sm:py-[21px] border border-rose-500 transition-one`}>
              Complete Order
            </button>
          </div>
        </div>
      </section>
      <ShowOrderModal
        show={showInvoice?.modals?.showInvoice.show}
        toggle={toggleShowInvoiceModal}
      />
    </div>
  );
};

export default Billing;


