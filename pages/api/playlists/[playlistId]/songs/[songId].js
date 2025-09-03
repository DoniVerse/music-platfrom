import prisma from '../../../../../lib/prisma'
import { requireAuth, handleApiError } from '../../../../../lib/auth-utils'

/**
 * DELETE /api/playlists/[playlistId]/songs/[songId]
 * Remove a song from a playlist. Requires ownership.
 */
async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' })
  }

  try {
    const { playlistId, songId } = req.query

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(playlistId) || !uuidRegex.test(songId)) {
      return res.status(400).json({ error: 'Invalid ID format', code: 'VALIDATION_ERROR' })
    }

    // Ensure playlist exists and belongs to current user
    const playlist = await prisma.playlist.findUnique({ where: { id: playlistId } })
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found', code: 'NOT_FOUND' })
    }
    if (playlist.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden', code: 'FORBIDDEN' })
    }

    // Find the playlist-song entry
    const entry = await prisma.playlistSong.findFirst({
      where: { playlist_id: playlistId, song_id: songId },
    })

    if (!entry) {
      return res.status(404).json({ error: 'Song not in playlist', code: 'NOT_FOUND' })
    }

    await prisma.playlistSong.delete({ where: { id: entry.id } })

    return res.status(200).json({ message: 'Song removed from playlist' })
  } catch (error) {
    return handleApiError(res, error, 'Failed to remove song from playlist')
  }
}

export default requireAuth(handler)
