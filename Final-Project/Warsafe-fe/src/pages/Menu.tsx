import {
  BarChart4,
  BookMarked,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div className="p-3">
      <div className="my-5 flex items-center gap-2">
        <Link to="/home">
          <ChevronLeft className="px-1 py-2 bg-secondary border-2 border-primary w-12 h-12 rounded-full text-primary" />
        </Link>
        <p className="text-3xl text-primary font-semibold">Menu</p>
      </div>
      <div className="bg-secondary w-full p-3 rounded-md border border-primary">
        <Link to={"/location"}>
          <div className="flex justify-between py-2">
            <div className="flex items-center gap-2 text-primary">
              <MapPin className=" w-7 h-7 " />
              <p className="text-xl font-semibold">Location</p>
            </div>
            <div>
              <ChevronRight className="w-7 h-7 text-primary" />
            </div>
          </div>
        </Link>
        <hr className="my-3  border border-primary" />
        <Link to={"/grafik"}>
          <div className="flex justify-between py-2">
            <div className="flex items-center gap-2 text-primary">
              <BarChart4 className=" w-7 h-7 " />
              <p className="text-xl font-semibold">Grafik Pelanggan</p>
            </div>
            <div>
              <ChevronRight className="w-7 h-7 text-primary" />
            </div>
          </div>
        </Link>
        <hr className="my-3 border border-primary text-primary bg-primary" />
        <Link to={"/pembukuan"}>
          <div className="flex justify-between py-2">
            <div className="flex items-center gap-2 text-primary">
              <BookMarked className=" w-7 h-7 " />
              <p className="text-xl font-semibold">Pembukuan</p>
            </div>
            <div>
              <ChevronRight className="w-7 h-7 text-primary" />
            </div>
          </div>
        </Link>
        <hr className="my-3 border border-primary text-primary bg-primary" />
        <Link to={"/komunitas"}>
          <div className="flex justify-between py-2">
            <div className="flex items-center gap-2 text-primary">
              <Users className=" w-7 h-7 " />
              <p className="text-xl font-semibold">Komunitas</p>
            </div>
            <div>
              <ChevronRight className="w-7 h-7 text-primary" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
