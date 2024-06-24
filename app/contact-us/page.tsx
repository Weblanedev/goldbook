"use client"

import { useEffect, useState } from "react";
import { useModals } from "../component/useModal";
import ShowContactModal from "../component/show-contact";

const Contact = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  // State to manage the disabled state of the button
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // State to manage form field values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkFormValidity = () => {
      if (name && email && phone && subject && message) {
        setIsButtonDisabled(false); // Enable the button if all fields are filled
      } else {
        setIsButtonDisabled(true); // Disable the button if any field is empty
      }
    };

    checkFormValidity(); // Check form validity on component mount
  }, [name, email, phone, subject, message]);

  // Event handlers to update form field values and check validity
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  const showContact = useModals(["showContact"]);

  function toggleShowContactModal() {
    showContact.toggleModal("showContact");
  }

  return (
    <div className="w-full h-full flex flex-col pt-[66px] md:pt-[0px]">
      <section className="relative h-[250px] md:h-[300px]">
        <div className="flex flex-col gap-2 items-center justify-center h-full w-full">
          <h1 className="font-medium md:font-semibold text-[50px] sm:text-[40px] md:text-[50px] md:text-left leading-snug md:leading-[62px] text-center text-orange-950">
            Contact Us
          </h1>
          <p>Find the best way to get help and connect with Goldbook</p>
        </div>
      </section>

      <section className="relative p-10 md:px-[80px] md:pt-[0px] md:mb-[100px] flex flex-col md:flex-row gap-10 items-start w-full justify-between">
        <div className="w-full flex gap-8 flex-col items-center justify-center lg:border-r pr-10">
          <div className="flex flex-col gap-2.5 text-[#181616] items-center justify-center md:w-[720px]">
            <h4 className="text-base font-medium">GET IN TOUCH</h4>
            <h2 className="text-[35px] font-medium">Schedule Meeting</h2>
            <p className="text-[16px] text-black leading-[28.8px] font-normal w-full text-center">
              We live to provide innovative solutions to problems like yours.
              Let's talk.
            </p>
          </div>

          <div className="w-full md:w-[720px]">
            <form
              className="mx-auto w-full flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col w-full gap-5 md:flex-row">
                <input
                  type="text"
                  className="border border-gray-300 text-gray-900 text-[15px] block w-full rounded-md p-[15px]"
                  placeholder="Your Name"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
                <input
                  type="email"
                  className="border border-gray-300 text-gray-900 text-[15px] block w-full rounded-md p-[15px]"
                  placeholder="Your Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-5 md:flex-row">
                <input
                  type="text"
                  className="border border-gray-300 text-gray-900 text-[15px] block w-full rounded-md p-[15px]"
                  placeholder="Phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />
                <input
                  type="text"
                  className="border border-gray-300 text-gray-900 text-[15px] block w-full rounded-md p-[15px]"
                  placeholder="Subject"
                  value={subject}
                  onChange={handleSubjectChange}
                  required
                />
              </div>

              <textarea
                id="message"
                rows={7}
                className="block p-[15px] w-full text-sm text-gray-900 border rounded-md border-gray-300"
                placeholder="Your Message"
                value={message}
                onChange={handleMessageChange}
                required
              ></textarea>

              <button
                type="submit"
                className="text-base font-medium text-white bg-rose-400 rounded-md px-7 md:px-12 py-[15px] hover:bg-rose-600 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-400"
                onClick={toggleShowContactModal}
                disabled={isButtonDisabled}
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-10 items-start justify-center w-[100%]">
          <div className="flex flex-col gap-2.5 text-[#181616] items-center justify-center my-[34px]">
            <h2 className="text-[30px] font-medium">Contact Details</h2>
          </div>
          <div className="flex gap-5 items-center justify-center">
            <div className='pt-[0px] w-[35px] h-[35px] relative'>
              <img src='/images/phone.png' className='rounded-[12px]' alt=""></img>
            </div>
            <a className="text-[20px] leading-[24px] font-medium text-rose-500" href="tel:+2349139348118">
              +234 913-934-8118
            </a>
          </div>
          <div className="flex gap-5 items-start justify-center">
            <div className='pt-[24px] w-[35px] h-[35px] relative'>
              <img src='/images/location.png' className='rounded-[12px]' alt=""></img>
            </div>
            <h4 className="text-[20px] leading-[24px] font-medium text-rose-500">
            2 Dynamic Estate Off Orchid Road Lekki Phase 2.</h4>
          </div>
          <div className="flex gap-5 items-start justify-center">
            <img src={"/images/mail.png"} alt="" className="w-6 pt-1" />
            <div className="flex flex-col items-start justify-center gap-3">
              <a className="text-[20px] leading-[24px] font-medium text-rose-500" href="mailto:info@goldbook.ng">
                info@goldbook.ng
              </a>
            </div>
          </div>
          <div className="flex gap-5 items-start justify-center">
            <img src={"/images/location.png"} alt="" className="w-6 pt-1" />
            <div className="flex flex-col items-start justify-center gap-3">
              <h4 className="text-[20px] leading-[24px] font-medium text-rose-500">
                MON - FRI : 9am - 5pm
              </h4>
            </div>
          </div>
        </div>
      </section>

      <ShowContactModal
        show={showContact.modals.showContact.show}
        toggle={toggleShowContactModal}
      />
    </div>
  );
};

export default Contact;