import express, { Router } from "express";

import produkCtrl from "./controllers/produk.js";
import vendorCtrl from "./controllers/vendor.js";
import userCtrl from "./controllers/user.js";
import kendaaraanKeluarCtrl from "./controllers/kendaraan_keluar.js";
import kendaaraanMasukCtrl from "./controllers/kendaraan_masuk.js";
import timbanganMasukCtrl from "./controllers/kendaraan_masuk.js";
import timbanganKeluarCtrl from "./controllers/timbangan_keluar.js";
const router = Router();

//user
router.use("/user", userCtrl);

router.use("/produk", produkCtrl);
router.use("/vendor", vendorCtrl);
router.use("/kendaraan_keluar", kendaaraanKeluarCtrl);
router.use("/kendaraan_masuk", kendaaraanMasukCtrl);
router.use("/timbangan_masuk", timbanganMasukCtrl);
router.use("/timbangan_keluar", timbanganKeluarCtrl);

export default router;
