import { NextRequest, NextResponse } from "next/server";

// Allow up to 5 minutes for video generation polling
export const maxDuration = 300;

const NARRATIVES = [
  `The salt air hits you before anything else — that specific mix of brine and warmth that only belongs to one place, one stretch of time. You close your eyes and you're there again: the sun hanging low and golden, painting everything in amber and rose. Someone's laughing just off to your left, the kind of laugh that rolls out easy, unhurried, like it has nowhere else to be.\n\nThe water was perfect that day. Not too cold, not too calm — just alive enough to remind you it had a personality of its own. You remember floating on your back, ears just below the surface, the world going quiet except for the deep, rhythmic pulse of the sea. Above you, the sky was the most impossible blue.\n\nThese are the moments that don't ask to be remembered. They just are — woven into who you are now, into the way you still tilt your face toward the sun without thinking, into why certain songs stop you cold. This memory isn't behind you. It's still happening, somewhere. You're still there. You always will be.`,

  `Long before the rest of the world was awake, the beach belonged to you. The sand was still cool from the night before, pressing soft and familiar under your feet as you walked to the water's edge. The horizon was doing that thing it does just before sunrise — layering itself in colors that have no names, gradients that shift before you can memorize them.\n\nYou didn't plan to stay as long as you did. But then the light started to change. First just a blush along the eastern edge, then something warmer, more insistent — and suddenly the whole ocean was lit from underneath, every wave a translucent jade-green as the sun climbed free of the water.\n\nYou've tried to describe this moment to people. You've never quite gotten it right. But you carry it with you — that quiet certainty you felt watching the day begin, that sense of being exactly where you were supposed to be, in exactly the right moment, fully awake and alive and grateful.`,

  `There's a particular quality to light in the late afternoon that doesn't belong to any other time of day. It came through in slanted gold bars that afternoon, and everything it touched — the faces, the old wooden table, the condensation on cold glasses — looked like something from a painting you'd want to live inside.\n\nYou were all together. That's what you remember most: the noise of it, the warmth, the way everyone kept talking at once and somehow it made sense, somehow you could hear every thread. There was food that had been made with care. There was music from somewhere. There was that easy, unhurried feeling of a day with nowhere to be.\n\nYou didn't know, then, how rare that was. You didn't think to memorize it. But some part of you must have, because here it is — all of it — still vivid, still warm, still exactly as good as it was.`,

  `The photograph doesn't capture the sound. That's always the thing photographs miss. The creak of old wood underfoot. The far-off sound of someone's radio. The way your own breathing slowed down as you stepped into that light.\n\nBut you remember the sound. You remember the whole texture of it — the warmth of the afternoon, how time seemed to move differently there, how the ordinary felt somehow sacred. You were happy in a way that didn't announce itself, didn't demand to be noticed. It was just there, quiet and solid, like good weather you don't remark on until it's gone.\n\nThis is the thing about favorite memories: they're never really about the event. They're about the feeling underneath — the sense of being held, of belonging, of something being exactly right. You had that. You had it completely. And no amount of time changes what it meant.`,
];

function pickNarrative(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return NARRATIVES[hash % NARRATIVES.length];
}

async function generateVideoFromImage(
  imageBase64: string,
  title: string
): Promise<string | null> {
  const apiKey = process.env.RUNWAY_API_KEY;
  if (!apiKey) return null;

  try {
    const prompt = `${title}. A cinematic memory coming alive — gentle, natural movement, people moving naturally, soft atmospheric animation, warm and nostalgic feeling.`;

    // Strip data URI prefix if present (e.g. "data:image/jpeg;base64,...")
    const base64Data = imageBase64.includes(",")
      ? imageBase64.split(",")[1]
      : imageBase64;

    const startRes = await fetch(
      "https://api.dev.runwayml.com/v1/image_to_video",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "X-Runway-Version": "2024-11-06",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gen3a_turbo",
          promptImage: `data:image/jpeg;base64,${base64Data}`,
          promptText: prompt,
          duration: 5,
          ratio: "1280:768",
        }),
      }
    );

    if (!startRes.ok) {
      console.error("Runway start failed:", await startRes.text());
      return null;
    }

    const { id: taskId } = await startRes.json();

    // Poll every 5 seconds, up to 3 minutes
    for (let i = 0; i < 36; i++) {
      await new Promise((r) => setTimeout(r, 5000));

      const pollRes = await fetch(
        `https://api.dev.runwayml.com/v1/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "X-Runway-Version": "2024-11-06",
          },
        }
      );

      if (!pollRes.ok) continue;

      const task = await pollRes.json();

      if (task.status === "SUCCEEDED" && task.output?.[0]) {
        return task.output[0] as string;
      }
      if (task.status === "FAILED") {
        console.error("Runway task failed:", task);
        return null;
      }
    }
  } catch (err) {
    console.error("Video generation error:", err);
  }

  return null;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const title = (body.title as string) || "A Beautiful Memory";
  const description = (body.description as string) || title;
  const imageBase64 = body.imageBase64 as string | undefined;

  const narrative = pickNarrative(title + description);

  // Attempt video generation if an image was provided
  let videoUrl: string | undefined;
  if (imageBase64) {
    const generated = await generateVideoFromImage(imageBase64, title);
    videoUrl = generated ?? undefined;
  }

  // Fallback minimum delay when no video generation runs (text-only memories)
  if (!imageBase64) {
    await new Promise((r) => setTimeout(r, 3200));
  }

  return NextResponse.json({
    id: crypto.randomUUID(),
    title,
    narrative,
    videoUrl,
    createdAt: new Date().toISOString(),
  });
}
