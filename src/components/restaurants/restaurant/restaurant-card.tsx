import ClearIcon from "@mui/icons-material/Clear";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

type Props = {
  orderNumber: string;
  description: string;
};
export default function RestaurantCard(props: Props) {
  return (
    <div className="my-2 w-full flex bg-white overflow-hidden rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-violet-50/50 hover:shadow-indigo-500/50 relative">
      <h4 className=" m-2 text-base text-xl py-2 pl-4 font-normal tracking-tight">
        <b>{props.orderNumber}</b>
        {" " + props.description}
      </h4>
      <div className="flex justify-end items-center space-x-2 ml-auto pl-1">
        <button className="btn btn-link btn-rounded text-gray-500 hover:text-green-500 h-min flex items-center">
          <CheckOutlinedIcon
            fontSize="small"
            className="group-hover:text-white mr-2"
          />
        </button>
        <button className="btn btn-link btn-rounded text-gray-500 hover:text-amber-500 h-min flex items-center">
          <ClearIcon fontSize="small" className="group-hover:text-white mr-2" />
        </button>
      </div>
    </div>
  );
}
