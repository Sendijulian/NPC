import logo from "@/assets/img/logo.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <div className="flex justify-center items-center w-full flex-col px-5">
      <div className="pt-10">
        <img src={logo} alt="" />
      </div>
      <div className="flex justify-center items-center my-7">
        <p className="text-4xl text-center w-2/3 font-ibm text-primary">
          Selamat datang di WARSAFE
        </p>
      </div>
      <div className="flex flex-col gap-5 w-2/3">
        <Button className="font-bold">
          <Link to="/login" className="w-full">
            Login
          </Link>
        </Button>
        <Button
          variant={"secondary"}
          className="border-2 border-primary font-bold text-primary"
        >
          <Link to="/register" className="w-full">
            Daftar
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
