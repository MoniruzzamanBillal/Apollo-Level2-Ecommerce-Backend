"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_validation_1 = require("./order.validation");
const order_service_1 = require("./order.service");
// ! creating order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const parsedData = order_validation_1.orderValidationSchema.parse(data);
        const result = yield order_service_1.orderServices.createOrderInDB(parsedData);
        const resultObj = result.toObject();
        const _a = resultObj, { _id, __v } = _a, dataWithoutId = __rest(_a, ["_id", "__v"]);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: dataWithoutId,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
// ! getting all orders from DB
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.query.email;
        const result = yield order_service_1.orderServices.getAllProduct(userEmail);
        const resultObjWithoutId = result.map((res) => {
            const result = res.toObject();
            const _a = result, { _id, __v } = _a, dataWithoutId = __rest(_a, ["_id", "__v"]);
            return dataWithoutId;
        });
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully for user email!",
            data: resultObjWithoutId,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.orderController = {
    getAllOrder,
    createOrder,
};
