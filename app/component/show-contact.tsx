import { Player } from "@lottiefiles/react-lottie-player";
import { Modal } from "./modal";
import { useEffect, useRef } from "react";
import Link from "next/link";

const ShowContactModal = (props: { toggle: () => void; show: boolean }) => {
  const { toggle, show } = props;

  const playerRef = useRef<Player>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      playerRef?.current?.pause();
    }, 2000);

    return () => clearTimeout(timer);
  }, [toggle]);

  return (
    <Modal {...{ toggle, show }}>
      <div className="flex relative flex-col items-center justify-center py-16 px-20">
        <svg
          className="cursor-pointer w-5 h-5 absolute top-5 right-5"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 50 50"
          onClick={() => toggle()}
        >
          <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
        </svg>
        <div className="h-[140px]">
          <Player
            src="https://lottie.host/930b358b-0b31-435f-aaa3-88ca57db05a4/sQ3L7s390v.json"
            className="w-[140px]"
            autoplay
            ref={playerRef}
          />
        </div>

        {/* <img
          src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/confirm-icon.png"
          alt=""
          className="w-[100px] h-[100px] object-contain mb-5"
        /> */}
        <div className=" flex flex-col text-center justify-center items-center gap-4">
          <h1 className="text-[32px] leading-10 text-black font-medium">
            Your message has been sent successfully!
          </h1>
          <p className="text-[15px] font-medium text-[#9CA3AF]">
            Please
            <Link
              href="/"
              className=" underline underline-offset-2 cursor-pointer px-1"
            >
              click here
            </Link>
            to return to the Home page.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ShowContactModal;
