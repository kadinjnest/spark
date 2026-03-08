import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const apiKey = process.env.RUNWAY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "RUNWAY_API_KEY is not set" }, { status: 500 });
  }

  const res = await fetch(
    `https://api.dev.runwayml.com/v1/tasks/${params.taskId}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "X-Runway-Version": "2024-11-06",
      },
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error("Runway status error:", res.status, errText);
    return NextResponse.json({ error: `Runway error ${res.status}` }, { status: 502 });
  }

  const task = await res.json();
  console.log(`Runway task ${params.taskId} status:`, task.status);

  if (task.status === "SUCCEEDED" && task.output?.[0]) {
    return NextResponse.json({ status: "SUCCEEDED", videoUrl: task.output[0] as string });
  }
  if (task.status === "FAILED") {
    return NextResponse.json({
      status: "FAILED",
      error: `Runway task failed: ${JSON.stringify(task.failure ?? task.error ?? task)}`,
    });
  }

  return NextResponse.json({ status: task.status });
}
