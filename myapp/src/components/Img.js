import React from "react";
import getconfirm from '../img/getconfirm.webp';
import authorized from '../img/authorized.webp';
import travel from '../img/travel.png';
import freecancel from '../img/freecancel.avif';
import instantrefund from '../img/instantrefund.webp';
import feevia from '../img/feevia.webp';
import customer from '../img/customer.webp';
export default function Imge() {
  return (
    <>
      <div className="image-container">
        <img className="getconfirmimg" src={getconfirm} alt="get logo" />
      </div>
      <p className="w">
        Why Choose Ixigo ?
      </p>

      <div className="scroll-container">
        <div className="image-wrapper">
          <img src={authorized} alt="Image 1" className="scroll-image" />
          <img src={travel} alt="Image 2" className="scroll-image" />
          <img src={freecancel} alt="Image 3" className="scroll-image" />
          <img src={instantrefund} alt="Image 4" className="scroll-image" />
          <img src={feevia} alt="Image 5" className="scroll-image" />
          <img src={customer} alt="Image 5" className="scroll-image" />
        </div>
      </div>

      

     

    </>
  );

}
