import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getChartData = async (req, res) => {
  try {
    const response = await prisma.chartData.findMany({
      where: { userId: req.params.id },
      select: {
        pelanggan: true,
        date: true,
      },
      orderBy: { date: "desc" },
    });

    // Format tanggal menjadi YYYY-MM-DD
    const formattedResponse = response.map((item) => ({
      pelanggan: item.pelanggan,
      tanggal: item.date.toISOString().split("T")[0], // Format tanggal
    }));

    res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createChartData = async (req, res) => {
  try {
    const { pelanggan = 1 } = req.body;
    await prisma.chartData.create({
      data: { pelanggan, User: { connect: { id: req.params.id } } },
    });
    res.status(201).json({ msg: "Data created successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
