import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getGrafik = async (req, res) => {
  try {
    const response = await prisma.grafik.findMany({
      where: { userId: req.userId },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createGrafik = async (req, res) => {
  const { pelanggan } = req.body;
  try {
    await prisma.grafik.create({
      data: {
        pelanggan,
        User: {
          connect: {
            id: req.userId,
          },
        },
      },
    });
    res.status(200).json({ msg: "Grafik created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Run this function once a day with a pelanggan value of 0
export const runDailyGrafik = async () => {
  const today = new Date().toISOString().slice(0, 10);
  const grafik = await prisma.grafik.findFirst({
    where: { createdAt: today },
  });
  if (!grafik) {
    await prisma.grafik.create({
      data: {
        pelanggan: 0,
        User: {
          connect: {
            id: req.userId,
          },
        },
      },
    });
  }
};

export const updateGrafik = async (req, res) => {
  const { pelanggan } = req.body;
  try {
    const grafik = await prisma.grafik.findFirst({
      where: { id: req.params.id },
    });
    if (!grafik) return res.status(404).json({ msg: "Grafik not found" });

    const tanggal = new Date().toISOString().slice(0, 10);
    const setTanggal = grafik.pelanggan.reduce((acc, val, i) => {
      const date = new Date(grafik.createdAt).toISOString().slice(0, 10);
      if (date === tanggal) {
        acc[date] = (acc[date] || 0) + val;
      }
      return acc;
    }, {});

    await prisma.grafik.update({
      where: { id: req.params.id },
      data: {
        pelanggan: setTanggal,
        User: {
          connect: {
            id: req.userId,
          },
        },
      },
    });

    res.status(200).json({ msg: "Grafik updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
