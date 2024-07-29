import ctx from "@/store"

export default (key) => {
  if (!key) return
  key = key.toLowerCase()
  const res = ctx.getters["locale/get"](key)
  return res ? res : key
}
