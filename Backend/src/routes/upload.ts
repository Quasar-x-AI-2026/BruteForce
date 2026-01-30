
import { Router, Request, Response } from "express"
import multer from "multer"
import crypto from "crypto"
import { callImageAI } from "../services/aiClient"
import { createJob, completeJob, failJob } from "../services/jobStre"

const router = Router()
const upload = multer()

router.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    const user = JSON.parse(req.cookies.user)
    const jobId = crypto.randomUUID()

    createJob(jobId, user.id)

    // 🔹 Respond immediately
    res.json({ jobId })

    // 🔹 Background processing
    ;(async () => {
      try {
        const processedImage = await callImageAI(
          req.file!.buffer,
          req.file!.originalname
        )

        const base64 = processedImage.toString("base64")

        completeJob(jobId, {
          enhancedImageUrl: `data:image/png;base64,${base64}`,
          title: null,
          description: null,
          price: null
        })

      } catch (err) {
        console.error("AI job failed:", err)
        failJob(jobId)
      }
    })()
  }
)

export default router
