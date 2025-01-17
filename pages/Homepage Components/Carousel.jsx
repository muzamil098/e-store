import React from "react";
import Image from "next/image";
import styles from "../../styles/shared.module.css";
function Carousel() {
  return (
    <div className={`flex justify-center items-center p-4  mt-[5rem]`}>
      <div
        className={`carousel carousel-end rounded-box shadow-md ${styles.carousel} `}
      >
        <div className="carousel-item w-full max-w-64">
          <Image
            src="https://images.unsplash.com/photo-1695527081756-6e15ed27c6a3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Drink"
            height={300}
            width={300}
          />
        </div>
        <div className="carousel-item w-full max-w-64">
          <Image
            src="https://images.unsplash.com/photo-1695527081884-06f9dffe919a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Drink"
            height={300}
            width={300}
          />
        </div>
        <div className="carousel-item w-full max-w-64">
          <Image
            src="https://images.unsplash.com/photo-1695527081937-6fa99f623c47?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Drink"
            height={300}
            width={300}
          />
        </div>
        <div className="carousel-item w-full max-w-64">
          <Image
            src="https://images.unsplash.com/photo-1695527082185-f9d347a3c824?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Drink"
            height={300}
            width={300}
          />
        </div>
        <div className="carousel-item w-full max-w-64">
          <Image
            src="https://images.unsplash.com/photo-1695527081846-51ba500d9040?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Drink"
            height={300}
            width={300}
          />
        </div>
        <div className="carousel-item w-full max-w-64">
          <Image
            src="https://images.unsplash.com/photo-1695527081926-91936cdbc54e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Drink"
            height={300}
            width={300}
          />
        </div>
        <div className="carousel-item w-full max-w-64">
          <Image
            src="https://images.unsplash.com/photo-1695527081793-91a2d4b5b103?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Drink"
            height={300}
            width={300}
          />
        </div>
      </div>
    </div>
  );
}

export default Carousel;
