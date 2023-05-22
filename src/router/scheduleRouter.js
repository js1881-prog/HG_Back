const express = require("express");
const scheduleController = require("../schedule/scheduleController");
const scheduleRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Schedules
 *   description: API for managing schedules
 */

/**
 * @swagger
 * /api/v1/schedules:
 *   post:
 *     summary: Create a new schedule
 *     tags: [Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               title:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *             example:
 *               userId: "12345"
 *               title: "Meeting"
 *               startDate: "2023-05-23T10:00:00Z"
 *               endDate: "2023-05-23T12:00:00Z"
 *     responses:
 *       200:
 *         description: Successfully created the schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 schedule:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     title:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                   example:
 *                     userId: "12345"
 *                     title: "Meeting"
 *                     startDate: "2023-05-23T10:00:00Z"
 *                     endDate: "2023-05-23T12:00:00Z"
 *   get:
 *     summary: Get all schedules
 *     tags: [Schedules]
 *     responses:
 *       200:
 *         description: Successfully retrieved the schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   title:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                   endDate:
 *                     type: string
 *                     format: date-time
 *                 example:
 *                   - userId: "12345"
 *                     title: "Meeting"
 *                     startDate: "2023-05-23T10:00:00Z"
 *                     endDate: "2023-05-23T12:00:00Z"
 *                   - userId: "67890"
 *                     title: "Appointment"
 *                     startDate: "2023-05-24T14:00:00Z"
 *                     endDate: "2023-05-24T15:00:00Z"
 */
scheduleRouter.post("/", scheduleController.createSchedule);
scheduleRouter.get("/all", scheduleController.getAllSchedules);

/**
 * @swagger
 * /api/v1/schedules/{scheduleId}:
 *   put:
 *     summary: Update a schedule
 *     tags: [Schedules]
 *     parameters:
 *       - name: scheduleId
 *         in: path
 *         description: ID of the schedule to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *             example:
 *               title: "Updated Meeting"
 *               startDate: "2023-05-23T14:00:00Z"
 *               endDate: "2023-05-23T16:00:00Z"
 *     responses:
 *       200:
 *         description: Successfully updated the schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 schedule:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     title:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                   example:
 *                     userId: "12345"
 *                     title: "Updated Meeting"
 *                     startDate: "2023-05-23T14:00:00Z"
 *                     endDate: "2023-05-23T16:00:00Z"
 *
 *   get:
 *     summary: Get a specific schedule
 *     tags: [Schedules]
 *     parameters:
 *       - name: scheduleId
 *         in: path
 *         description: ID of the schedule to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *               example:
 *                 userId: "12345"
 *                 title: "Meeting"
 *                 startDate: "2023-05-23T10:00:00Z"
 *                 endDate: "2023-05-23T12:00:00Z"
 *   delete:
 *     summary: Delete a schedule
 *     tags: [Schedules]
 *     parameters:
 *       - name: scheduleId
 *         in: path
 *         description: ID of the schedule to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Schedule deleted successfully"
 */
scheduleRouter.put("/:scheduleId", scheduleController.updateSchedule);
scheduleRouter.get("/:scheduleId", scheduleController.getSchedule);
scheduleRouter.delete("/:scheduleId", scheduleController.deleteSchedule);

module.exports = scheduleRouter;
