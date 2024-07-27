import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, TrendingDown, TrendingUp } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "@/hook/authSlice";
import { AppDispatch } from "@/store";
import instance from "@/instance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getLineChartData = async () => {
  const userId = localStorage.getItem("userId");
  const response = await instance.get(`/chart/${userId}`);
  const dataPelanggan = response.data;
  console.log("🚀 ~ getLineChartData ~ dataPelanggan:", dataPelanggan);

  const labels: string[] = [];
  const data: number[] = [];

  // Menentukan tanggal hari Senin minggu ini
  const today = new Date();
  const dayOfWeek = today.getDay();
  const mondayOffset = (dayOfWeek + 6) % 7; // Offset hari untuk mendapatkan Senin
  const mondayDate = new Date(today);
  mondayDate.setDate(today.getDate() - mondayOffset);

  // Mengisi label dan data dari Senin hingga Minggu
  for (let i = 0; i < 7; i++) {
    const date = new Date(mondayDate);
    date.setDate(mondayDate.getDate() + i);
    const day = date.toLocaleDateString("id-ID", { weekday: "long" });
    labels.push(day);
    data.push(
      dataPelanggan.filter(
        (item: any) => item.tanggal === date.toISOString().split("T")[0]
      ).length
    );
  }

  return {
    labels,
    datasets: [
      {
        label: "Data Pelanggan",
        data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
};

const Home = () => {
  const [lineChartData, setLineChartData] = useState<any>(null);
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLineChartData();
      setLineChartData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-3">
      <div
        id="nav"
        className="px-5 bg-secondary p-3 border border-primary rounded-md flex items-center justify-between"
      >
        <div>
          <Link to="/menu">
            <Menu className="w-10 h-10 text-primary" />
          </Link>
        </div>
        <div className="flex flex-wrap-reverse  text-right gap-2 items-center">
          <div className="text-primary font-medium">
            <p className="text-xl">Profile</p>
            <p>{user?.name}</p>
          </div>
          <div>
            <Link to="/profile">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
      <div
        id="map"
        className=" p-2 bg-secondary border border-primary rounded-md mt-3"
      >
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
      <div id="chart" className="mb-3">
        {lineChartData ? (
          <Line data={lineChartData} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
      <div
        id="hasil"
        className="bg-secondary border-2 border-primary rounded-md"
      >
        <div className="flex gap-3 items-center p-3 text-primary">
          <TrendingUp className="text-green-500" />
          <p>IDR {new Intl.NumberFormat("id-ID").format(100000)}</p>
        </div>
        <hr className="border border-primary" />
        <div className="flex gap-3 items-center p-3 text-primary">
          <TrendingDown className="text-red-500" />
          <p>IDR {new Intl.NumberFormat("id-ID").format(1000000)}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
