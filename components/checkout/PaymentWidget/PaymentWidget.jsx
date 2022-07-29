import s from "./PaymentWidget.module.css";
import { FacebookIcon } from "@components/ui/Icon";

const PaymentWidget = ({ onClick }) => {
  /* Shipping Address 
  Only available with checkout set to true - 
  This means that the provider does offer checkout functionality. */
  return (
    <div onClick={onClick} className={s.root}>
      <div className="flex flex-1 items-center">
        <FacebookIcon className="w-5 flex" />
        <span className="ml-5 text-sm text-center font-medium">
          Add Payment Method
        </span>
        {/* <span>VISA #### #### #### 2345</span> */}
      </div>
      <div>
        <FacebookIcon />
      </div>
    </div>
  );
};

export default PaymentWidget;
