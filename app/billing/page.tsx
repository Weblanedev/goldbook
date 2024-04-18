"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import { useModals } from "../component/useModal"
import ShowOrderModal from "../component/show-order";
// import { Book } from "./utils";


const Billing = () => {
  const [selectedItem, setSelectedItem] = useState({
    name: "",
    price: "",
    image: ""
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  function add100Dollars(input: string): string {
    // Extracting the numerical part of the input string
    const numericalPart = parseFloat(input?.replace(/[^\d.]/g, ""));

    // Adding 100 to the numerical part
    const result = numericalPart + 5;

    // Formatting the result back to the original format
    const formattedResult = result.toFixed(2);
    const output = `$${formattedResult}`;

    return output;
  }

  useEffect(() => {
    if(typeof localStorage !== 'undefined') {
      const itemtobebought: any = localStorage.getItem("item")
      setSelectedItem(JSON.parse(itemtobebought))
    } 
  }, [])

  // State to manage the disabled state of the button
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // State to manage form field values
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  useEffect(() => {
    // Function to check if all form fields are filled
    const checkFormValidity = () => {
      if (cardHolderName && cardNumber && expireDate && cardCVC) {
        setIsButtonDisabled(false); // Enable the button if all fields are filled
      } else {
        setIsButtonDisabled(true); // Disable the button if any field is empty
      }
    };

    checkFormValidity();
  }, [cardHolderName, cardNumber, expireDate, cardCVC]);

  // Event handlers to update form field values and check validity
  const handleCardHolderNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCardHolderName(e.target.value);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
  };

  const handleExpireDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpireDate(e.target.value);
  };

  const handleCardCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardCVC(e.target.value);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    toggleShowInvoiceModal();
  };

  const showInvoice = useModals(["showInvoice"]);

  function toggleShowInvoiceModal() {
    showInvoice.toggleModal("showInvoice");
  }

  return (
    <div className="w-full h-full flex flex-col pt-[66px] md:pt-[0px]">
      <section className="relative h-[250px] md:h-[300px]">
        <div className="flex flex-col gap-2 items-center justify-center h-full w-full">
          <h1 className="font-medium md:font-semibold text-[50px] sm:text-[40px] md:text-[50px] md:text-left leading-snug md:leading-[62px] text-center text-blue-950">
            Order Details
          </h1>
          <p>Find the best way to get help and connect with Splashtop</p>
        </div>
      </section>

      <section className="relative p-10 md:px-[130px] md:pb-[130px] flex flex-col lg:flex-row gap-8 items-center lg:items-start w-full justify-center">
        <div className="flex flex-col gap-8 items-start w-full justify-center lg:pr-8 lg:border-r">
          <div className="flex flex-col gap-2.5 text-[#181616] items-start justify-center lg:w-[720px]">
            <h2 className="text-[32px] font-medium">Billing details</h2>
          </div>

          <div className="w-full lg:w-[720px]">
            <form className="mx-auto w-full flex flex-col gap-5">
              <div className="flex flex-col w-full gap-5 md:flex-row">
                <input
                  type="text"
                  className="border border-gray-300 text-gray-900 text-[15px] block w-full p-[15px] rounded-md"
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  className="border border-gray-300 text-gray-900 text-[15px] block w-full p-[15px] rounded-md"
                  placeholder="Last Name"
                  required
                />
              </div>

              <input
                type="text"
                className="border border-gray-300 text-gray-900 text-[15px] block w-full p-[15px] rounded-md"
                placeholder="Phone"
                required
              />

              <input
                type="email"
                className="border border-gray-300 text-gray-900 text-[15px] block w-full p-[15px] rounded-md"
                placeholder="Email Address"
                required
              />
            </form>

            <div className="flex flex-col gap-5 mt-10 text-[#181616] items-start justify-center lg:w-[720px]">
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

        <div className="flex flex-col gap-[15px] items-start w-full justify-center">
          <h4 className="font-bold text-blue-500 leading-[28px]">
            YOUR ORDER
          </h4>

          <div className="flex mt-[-5px] flex-col items-center justify-center w-full">
            <div className="flex items-center justify-between py-[15px] w-full border-b">
              <h4 className="text-[#707070] font-medium text-[13px]">
                PRODUCT
              </h4>
              <h4 className="text-[#707070] font-medium text-[13px]">
                SUBTOTAL
              </h4>
            </div>
            <div className="flex items-center justify-between py-[15px] w-full border-b">
              <h4 className="text-[#161616] font-medium text-[16px] leading-5 upperc ase w-[350px]">
                {selectedItem?.name}
              </h4>
              <h4 className="text-[#161616] font-medium text-[16px]">
                ${selectedItem?.price}
              </h4>
            </div>
            <div className="flex items-center justify-between py-[15px] w-full border-b">
              <h4 className="text-[#707070] uppercase font-medium text-[13px]">
                Processing Fee
              </h4>
              <h4 className="text-[#161616] font-medium text-[16px]">
                $5.00
              </h4>
            </div>
            <div className="flex items-center justify-between py-[15px] w-full border-b">
              <h4 className="text-[#707070] font-medium text-[13px]">TOTAL</h4>
              <h4 className="text-[#a20401] font-medium text-[16px]">
                {add100Dollars(selectedItem?.price)}
              </h4>
            </div>
          </div>

          <form>
            <div className="flex flex-wrap gap-3 w-full">
              <label className="relative w-full flex flex-col">
                <span className="font-bold mb-3">Card holder{"'"}s name</span>
                <input
                  className="rounded-md peer pl-12 pr-2 py-2 border-2 text-[18px] border-gray-200 placeholder-gray-300"
                  type="text"
                  name="card_holders_name"
                  placeholder="JOHN DOE"
                  required
                  value={cardHolderName}
                  onChange={handleCardHolderNameChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-[12px] text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </label>

              <label className="relative w-full flex flex-col">
                <span className="font-bold mb-3">Card number</span>
                <input
                  className="rounded-md text-[18px] peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                  type="text"
                  name="card_number"
                  required
                  placeholder="0000 0000 0000"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-[12px] text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </label>

              <div className="w-full flex gap-5 flex-col lg:flex-row">
                <label className="relative w-full lg:flex-1 flex flex-col">
                  <span className="font-bold mb-3">Expire date</span>
                  <input
                    className="rounded-md text-[18px] peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                    type="text"
                    name="expire_date"
                    required
                    placeholder="MM/YY"
                    value={expireDate}
                    onChange={handleExpireDateChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-[12px] text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </label>

                <label className="relative w-full lg:flex-1 flex flex-col">
                  <span className="font-bold flex items-center gap-3 mb-3">
                    CVC/CVV
                    <span className="relative group">
                      <span className="hidden group-hover:flex justify-center items-center px-2 py-1 text-xs absolute -right-2 transform translate-x-full -translate-y-[12px] w-max top-1/2 bg-black text-white">
                        The 3 digit number on the back of your card
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </span>
                  <input
                    className="rounded-md text-[18px] peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                    type="text"
                    name="card_cvc"
                    required
                    placeholder="&bull;&bull;&bull;"
                    value={cardCVC}
                    onChange={handleCardCVCChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-[12px] text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </label>
              </div>
            </div>

            <p className="text-[#707070] mt-[20px] font-normal text-[13px]">
              Note: Fee charged is decided by the specific type service, and
              based on service demand. It may be lesser or higher.
            </p>

            <h4 className="font-bold text-[#a20401] mt-[20px] leading-[28px]">
              PAYMENT METHODS
            </h4>

            <div className="w-full flex flex-col gap-2 items-start">
              <img
                src="https://help.zazzle.com/hc/article_attachments/360010513393"
                alt=""
                className="w-full"
              />
              <p className="text-[#707070] font-normal text-[13px]">
                Make payment using your debit, credit card & bank account
              </p>
            </div>

            <p className="text-[#161616] font-normal text-[16px] text-left">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our{" "}
              <Link
                href="/"
              >
                privacy policy.
              </Link>
            </p>

            <button
              type="submit"
              disabled={isButtonDisabled}
              onClick={handleSubmit}
              className={`group gap-[8px] mt-[30px] w-[100%] text-center text-[16px] sm:text-[24px] rounded-lg font-body bg-white text-blue-500 ${!isButtonDisabled && 'hover:bg-blue-500 hover:text-white'} px-[30px] sm:px-[97px] py-[15px] sm:py-[21px] border border-blue-500 transition-one`}>
              Place Order
            </button>
          </form>
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