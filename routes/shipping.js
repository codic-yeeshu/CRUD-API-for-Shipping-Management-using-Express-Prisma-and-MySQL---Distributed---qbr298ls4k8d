const { Router } = require("express");
const authenticate = require("../middleware/authenticate");
const { prisma } = require("../db/config");

const router = Router();
`Create a Shipping Record: POST /api/shipping/create
Cancel a Shipping Record: PUT /api/shipping/cancel
Retrieve Shipping Records: GET /api/shipping/get`;
router.use(authenticate);

router.post("/create", async (req, res) => {
  try {
    const { userId, productId, count } = req.body;

    if (!userId || !productId || !count)
      return res.status(404).json({
        error: "All fields required",
      });

    const newShipping = prisma.shipping.create({
      data: {
        userId,
        productId,
        count,
      },
    });
    return res.status(201).json(newShipping);
  } catch (err) {
    console.error(`Error occurred in file: shipping, function: post -`, err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router.put("/cancel", async (req, res) => {
  try {
    const { shippingId } = req.body;
    if (!shippingId)
      return res.status(404).json({
        error: "Missing shippingId",
      });

    const shipping = await prisma.shipping.findUnique({
      where: { id: parseInt(shippingId, 10) },
    });

    if (!shipping)
      return res.status(404).json({
        error: "Missing shippingId",
      });

    const updatedShipping = await prisma.shipping.update({
      where: { id: shippingId },
      data: {
        status: "cancelled",
      },
    });
    return res.status(200).json(updatedShipping);
  } catch (err) {
    console.error(`Error occurred in file: shipping, function: put -`, err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/get", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      const allShipping = await prisma.shipping.findMany();
      return res.status(200).json(allShipping);
    }

    const userShipping = await prisma.shipping.findMany({
      where: { userId: parseInt(userId, 10) },
    });
    return res.status(200).json(userShipping);
  } catch (err) {
    console.error(`Error occurred in file: shipping, function: get -`, err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
