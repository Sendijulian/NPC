import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getManajemen = async (req, res) => {
  try {
    // Ambil semua entri berdasarkan userId
    const response = await prisma.manajemen.findMany({
      where: { userId: req.params.id },
      orderBy: { createdAt: "desc" }, // Urutkan berdasarkan createdAt, terbaru di atas
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createManajemen = async (req, res) => {
  const { pengeluaran = 0, pemasukan = 0, keterangan, tipe } = req.body;

  try {
    const response = await prisma.manajemen.create({
      data: {
        pengeluaran,
        pemasukan,
        keterangan,
        tipe,
        User: {
          connect: {
            id: req.params.id,
          },
        },
      },
    });
    res.status(200).json({ msg: "Manajemen created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
