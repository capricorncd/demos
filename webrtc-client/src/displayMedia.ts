/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-06-06 20:29
 */
export async function initDisplayMedia(exec = false): Promise<MediaStream | null> {
  if (!exec) return null
  // @ts-ignore
  const dm: MediaStream = await navigator.mediaDevices.getDisplayMedia()
  console.log('getDisplayMedia', dm)
  return dm
}
