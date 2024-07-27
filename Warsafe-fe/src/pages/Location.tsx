import { ChevronLeft } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";

const Location = () => {
  return (
    <div className="p-3">
      <div className="my-5 flex items-center gap-2">
        <Link to="/home">
          <ChevronLeft className="px-1 py-2 bg-secondary border-2 border-primary w-12 h-12 rounded-full text-primary" />
        </Link>
        <p className="text-3xl text-primary font-semibold">Location</p>
      </div>
      <div className="p-2 bg-secondary border border-primary rounded-md mt-3">
        <MapContainer
          zoomControl={false}
          center={[-7.69618321290254, 111.51704013619161]}
          zoom={15}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution="s"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[-7.69618321290254, 111.51704013619161]}>
            <Popup>SMK</Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="bg-secondary">
        <div className="py-5 px-2">
          <hr className="border-2 border-primary w-1/4 shadow-lg mx-auto mb-2 rounded-full" />
          <h1 className="text-center text-secondary bg-primary px-5 font-bold w-1/2 rounded-full">
            Grobakku
          </h1>
          <div className="flex gap-2 items-center mt-3">
            {/* <h1 className="text-md text-primary flex items-center gap-2 mt-2">
              <MapPin className="w-5 h-5" />
              <span>2.1 Km</span>
            </h1> */}
            {/* <h1 className="text-md text-primary flex items-center gap-2 mt-2">
              <Clock className="w-5 h-5" />
              <span>7 M</span>
            </h1> */}
          </div>

          <hr className="border border-primary my-1" />
          <div className="text-primary">
            <h1 className="font-semibold">Alamat</h1>
            <p className="text-sm ">Jl. Raya Ngelandung</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
