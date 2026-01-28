import Paste from "../models/Paste.js";
import { nanoid } from "nanoid";

/**
 * Create a new paste
 * POST /api/pastes
 */
export const createPaste = async (req, res) => {
  try {
    const { content, expireInMinutes, maxViews } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    let expiresAt = null;
    if (expireInMinutes) {
      expiresAt = new Date(Date.now() + expireInMinutes * 60 * 1000);
    }

    const paste = await Paste.create({
      content,
      shortId: nanoid(6),
      expiresAt,
      maxViews: maxViews || null,
    });

    res.status(201).json({
  url: `${process.env.BASE_URL}/#/p/${paste.shortId}`,
});

  } catch (error) {
    res.status(500).json({ error: "Failed to create paste" });
  }
};

/**
 * Get paste by ID
 * GET /api/pastes/:id
 */
export const getPaste = async (req, res) => {
  try {
    const { id } = req.params;

    const paste = await Paste.findOne({ shortId: id });

    if (!paste) {
      return res.status(404).json({ error: "Paste not found or expired" });
    }

    // Time expiry check
    if (paste.expiresAt && paste.expiresAt < new Date()) {
      return res.status(404).json({ error: "Paste not found or expired" });
    }

    // View count expiry check
    if (paste.maxViews && paste.viewCount >= paste.maxViews) {
      return res.status(404).json({ error: "Paste not found or expired" });
    }

    paste.viewCount += 1;
    await paste.save();

    res.json({
      content: paste.content,
      views: paste.viewCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch paste" });
  }
};
