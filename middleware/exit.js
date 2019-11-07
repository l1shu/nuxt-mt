export default async ({ redirect, $axios }) => {
  let { data } = await $axios.get('/users/exit')
  if (data.ret == 0) {
    location.href = '/'
  }
}