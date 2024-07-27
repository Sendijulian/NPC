import { ChevronLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import instance from "@/instance";
import { useEffect, useState } from "react";

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
const Grafik = () => {
  const [lineChartData, setLineChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLineChartData();
      setLineChartData(data);
    };

    fetchData();
  }, []);
  return (
    <div className="p-3">
      <div className="my-5 flex items-center gap-2">
        <Link to="/home">
          <ChevronLeft className="px-1 py-2 bg-secondary border-2 border-primary w-12 h-12 rounded-full text-primary" />
        </Link>
        <p className="text-3xl text-primary font-semibold">Grafik Pelanggan</p>
      </div>
      <div id="chart" className="mb-3">
        {lineChartData ? (
          <Line data={lineChartData} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
      <div>
        <h1 className="text-3xl text-primary font-semibold">Asisten WarSafe</h1>
        <div className="h-64 overflow-y-auto pt-5">
          <ul className="space-y-5">
            <li className="max-w-lg ms-auto flex justify-end gap-x-2 sm:gap-x-4">
              <div className="grow text-end space-y-3">
                <div className="inline-block bg-primary rounded-2xl p-4 shadow-sm">
                  <p className="text-sm text-white">Tes</p>
                </div>
              </div>
            </li>
            <li className="max-w-lg flex gap-x-2 sm:gap-x-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
                <h2 className="font-medium text-gray-800">Hallo</h2>
              </div>
            </li>
            <li className="max-w-lg ms-auto flex justify-end gap-x-2 sm:gap-x-4">
              <div className="grow text-end space-y-3">
                <div className="inline-block bg-primary rounded-2xl p-4 shadow-sm">
                  <p className="text-sm text-white">Tes</p>
                </div>
              </div>
            </li>
            <li className="max-w-lg flex gap-x-2 sm:gap-x-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
                <h2 className="font-medium text-gray-800">Hallo</h2>
              </div>
            </li>
            <li className="max-w-lg ms-auto flex justify-end gap-x-2 sm:gap-x-4">
              <div className="grow text-end space-y-3">
                <div className="inline-block bg-primary rounded-2xl p-4 shadow-sm">
                  <p className="text-sm text-white">Tes</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="mt-5 relative">
          <input
            type="text"
            className="w-full border-2 border-primary rounded-md text-sm px-3 py-2 focus-visible:outline-primary"
            placeholder="Ketik sesuatu..."
          />
          <Button
            className="absolute -right-1 top-1 hover:bg-transparent"
            variant={"ghost"}
          >
            <Send className="text-primary " />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Grafik;
