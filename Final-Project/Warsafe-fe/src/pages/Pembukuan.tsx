import { ChevronLeft, TrendingDown, TrendingUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import instance from "@/instance";
import { useEffect, useState } from "react";

interface Item {
  id: number;
  pemasukan: number;
  pengeluaran: number;
  tipe: boolean;
  keterangan: string;
  createdAt: string;
}

const Pembukuan = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Item[]>([]);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [total, setTotal] = useState<number>();
  const [keterangan, setKeterangan] = useState("");

  useEffect(() => {
    getDataManajemen();
  }, []);

  const getDataManajemen = async () => {
    const userId = localStorage.getItem("userId");
    const response = await instance.get(`/manajemen/${userId}`);
    setData(response.data);
    calculateTotals(response.data);
  };

  const calculateTotals = (data: Item[]) => {
    let pemasukan = 0;
    let pengeluaran = 0;
    data.forEach((item) => {
      if (item.tipe) {
        pemasukan += item.pemasukan;
      } else {
        pengeluaran += item.pengeluaran;
      }
    });
    setTotalPemasukan(pemasukan);
    setTotalPengeluaran(pengeluaran);
  };

  const handlePemasukan = async () => {
    const userId = localStorage.getItem("userId");
    setLoading(true);
    await instance.post(`/manajemen/${userId}`, {
      pemasukan: total,
      keterangan,
      tipe: true,
    });
    getDataManajemen();
    setTotal(0);
    setKeterangan("");
    window.location.reload(); // Hindari reload halaman untuk pengalaman pengguna yang lebih baik
  };

  const handlePengeluaran = async () => {
    const userId = localStorage.getItem("userId");
    setLoading(true);
    await instance.post(`/manajemen/${userId}`, {
      pengeluaran: total,
      keterangan,
      tipe: false,
    });
    getDataManajemen();
    setTotal(0);
    setKeterangan("");
    window.location.reload(); // Hindari reload halaman untuk pengalaman pengguna yang lebih baik
  };

  return (
    <div className="p-3">
      <div className="my-5 flex items-center gap-2">
        <Link to="/home">
          <ChevronLeft className="px-1 py-2 bg-secondary border-2 border-primary w-12 h-12 rounded-full text-primary" />
        </Link>
        <p className="text-3xl text-primary font-semibold">Pembukuan</p>
      </div>
      <div>
        <div className="bg-secondary border-2 border-primary rounded-md">
          <div>
            <h1 className="text-xl text-primary font-semibold my-2 px-3">
              Keterangan
            </h1>
          </div>
          <hr className="border border-primary " />
          <div id="hasil" className="flex justify-between">
            <Dialog>
              <DialogTrigger className="flex gap-3 items-center p-3 text-primary border-r-2 w-1/2 border-primary">
                <TrendingUp className="text-green-500" />
                Pemasukan
              </DialogTrigger>
              <DialogContent className="m-3 mx-auto w-3/4 rounded-md">
                <DialogHeader className="text-primary">
                  <DialogTitle>Masukkan Pemasukan</DialogTitle>
                  <label className="text-left text-xs">Jumlah</label>
                  <input
                    type="number"
                    className="border-2 border-primary rounded-md p-3 focus-visible:outline-primary w-full"
                    placeholder="Masukkan Pemasukan"
                    value={total}
                    onChange={(e) => setTotal(Number(e.target.value))}
                  />
                  <label className="text-left text-xs">Keterangan</label>
                  <input
                    type="text"
                    className="border-2 border-primary rounded-md p-3 focus-visible:outline-primary w-full"
                    placeholder="Keterangan"
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                  />
                </DialogHeader>
                <DialogDescription className="w-full">
                  <Button
                    className="w-full"
                    onClick={handlePemasukan}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Simpan"}
                  </Button>
                </DialogDescription>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger className="flex gap-3 items-center p-3 text-primary w-1/2">
                <TrendingDown className="text-red-500" />
                Pengeluaran
              </DialogTrigger>
              <DialogContent className="m-3 mx-auto w-3/4 rounded-md">
                <DialogHeader className="text-primary">
                  <DialogTitle>Masukkan Pengeluaran</DialogTitle>
                  <label className="text-left text-xs">Jumlah</label>
                  <input
                    type="number"
                    className="border-2 border-primary rounded-md p-3 focus-visible:outline-primary w-full"
                    placeholder="Masukkan Pengeluaran"
                    value={total}
                    onChange={(e) => setTotal(Number(e.target.value))}
                  />
                  <label className="text-left text-xs">Keterangan</label>
                  <input
                    type="text"
                    className="border-2 border-primary rounded-md p-3 focus-visible:outline-primary w-full"
                    placeholder="Keterangan"
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                  />
                </DialogHeader>
                <DialogDescription className="w-full">
                  <Button
                    className="w-full"
                    onClick={handlePengeluaran}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Simpan"}
                  </Button>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div
          id="hasil"
          className="bg-secondary border-2 border-primary rounded-md p-3 text-primary"
        >
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Total Pemasukan</p>
            <p>IDR {new Intl.NumberFormat("id-ID").format(totalPemasukan)}</p>
          </div>
          <hr className="border border-primary my-2" />
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Total Pengeluaran</p>
            <p>IDR {new Intl.NumberFormat("id-ID").format(totalPengeluaran)}</p>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-primary text-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Jenis
              </th>
              <th scope="col" className="px-6 py-3">
                Keterangan
              </th>
              <th scope="col" className="px-6 py-3">
                Jumlah
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: Item) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={item.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                >
                  {item.tipe ? "Pemasukan" : "Pengeluaran"}
                </th>
                <td className="px-6 py-4">{item.keterangan}</td>
                <td className="px-6 py-4">
                  IDR{" "}
                  {new Intl.NumberFormat("id-ID").format(
                    item.tipe ? item.pemasukan : item.pengeluaran
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pembukuan;
