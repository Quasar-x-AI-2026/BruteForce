type JobStatus = "processing" | "done" | "error"

type JobResult = {
  enhancedImageUrl: string
  title: string | null
  description: string | null
  price: string | null
}

type Job = {
  jobId: string
  userId: string
  status: JobStatus
  result?: JobResult
}

const jobs = new Map<string, Job>()

export function createJob(jobId: string, userId: string) {
  jobs.set(jobId, {
    jobId,
    userId,
    status: "processing"
  })
}

export function completeJob(
  jobId: string,
  result: JobResult
) {
  const job = jobs.get(jobId)
  if (!job) return

  job.status = "done"
  job.result = result
}

export function failJob(jobId: string) {
  const job = jobs.get(jobId)
  if (!job) return

  job.status = "error"
}

export function getJob(jobId: string) {
  return jobs.get(jobId)
}
