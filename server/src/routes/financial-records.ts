import express, { Request, Response } from "express";
import { Document } from "mongoose";
import FinancialRecordModel from "../schema/financialRecord";

// Define interfaces for type safety
interface FinancialRecord {
  userId: string;
  // Add other fields based on your schema
}

interface FinancialRecordDocument extends FinancialRecord, Document {}

const router = express.Router();

// Type-safe request handlers
router.get(
  "/getAllByUserID/:userId",
  async (
    req: Request<{ userId: string }, any, any, any>,
    res: Response
  ): Promise<void> => {
    try {
      const { userId } = req.params;
      const records = await FinancialRecordModel.find({ userId });

      if (!records.length) {
        res.status(404).json({
          success: false,
          message: "No records found for the user.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: records,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error retrieving financial records",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }
);

router.post(
  "/",
  async (
    req: Request<any, any, FinancialRecord, any>,
    res: Response
  ): Promise<void> => {
    try {
      const newRecord = new FinancialRecordModel(req.body);
      const savedRecord = await newRecord.save();

      res.status(201).json({
        success: true,
        data: savedRecord,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error creating financial record",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }
);

router.put(
  "/:id",
  async (
    req: Request<{ id: string }, any, Partial<FinancialRecord>, any>,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedRecord = await FinancialRecordModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedRecord) {
        res.status(404).json({
          success: false,
          message: "Financial record not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: updatedRecord,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error updating financial record",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }
);

router.delete(
  "/:id",
  async (
    req: Request<{ id: string }, any, any, any>,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedRecord = await FinancialRecordModel.findByIdAndDelete(id);

      if (!deletedRecord) {
        res.status(404).json({
          success: false,
          message: "Financial record not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: deletedRecord,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error deleting financial record",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }
);

export default router;